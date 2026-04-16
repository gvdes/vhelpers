<template>
  <q-page padding>
    <div v-if="loading"><q-inner-loading :showing="loading" label="Generando Reporte...">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading></div>
    <div v-else>
      <q-card class="q-mb-md">
        <q-card-section class="row items-center q-col-gutter-md">

          <div class="col">
            <div class="text-subtitle1 text-weight-bold">Global</div>

            <q-linear-progress :value="percent(global.current_total, global.last_total)" rounded color="positive"
              class="q-mt-sm" />

            <div class="text-caption q-mt-sm">
              {{ money(global.current_total) }} /
              {{ money(global.last_total) }}
              ({{ percentText(global.current_total, global.last_total) }}%)
            </div>
          </div>

          <div class="col">
            <div class="text-subtitle1 text-weight-bold">Tickets</div>

            <q-linear-progress :value="percent(global.tickets, global.last_tickets)" rounded color="primary"
              class="q-mt-sm" />

            <div class="text-caption q-mt-sm">
              {{ global.tickets }} /
              {{ global.last_tickets }}
              ({{ percentText(global.tickets, global.last_tickets) }}%)
            </div>
          </div>

          <div class="col-auto text-center">

            <div class="text-h5 text-weight-bold" :class="global.growth < 0 ? 'text-negative' : 'text-positive'">
              {{ global.growth.toFixed(1) }}%
            </div>

            <q-icon :name="global.growth < 0 ? 'arrow_downward' : 'arrow_upward'" size="lg"
              :color="global.growth < 0 ? 'negative' : 'positive'" />

          </div>

        </q-card-section>
      </q-card>
      <q-list bordered separator>

        <q-item v-for="store in filteredData" :key="store.store">

          <q-item-section>

            <q-item-label class="text-weight-bold">
              {{ store.store }}
            </q-item-label>

            <q-linear-progress :value="percent(store.current_total, store.last_total)" rounded color="positive"
              class="q-mt-sm" />

            <div class="text-caption q-mt-sm">
              {{ money(store.current_total) }} /
              {{ money(store.last_total) }}
              ({{ percentText(store.current_total, store.last_total) }}%)
            </div>

          </q-item-section>


          <q-item-section>

            <q-item-label class="text-weight-bold">
              Tickets
            </q-item-label>

            <q-linear-progress :value="percent(store.tickets, store.last_tickets)" rounded color="primary"
              class="q-mt-sm" />

            <div class="text-caption q-mt-sm">
              {{ store.tickets }} /
              {{ store.last_tickets }}
              ({{ percentText(store.tickets, store.last_tickets) }}%)
            </div>

          </q-item-section>


          <q-item-section side class="text-center">

            <div class="text-h6" :class="store.growth < 0 ? 'text-negative' : 'text-positive'">
              {{ store.growth.toFixed(1) }}%
            </div>

            <q-icon :name="store.growth < 0 ? 'arrow_downward' : 'arrow_upward'"
              :color="store.growth < 0 ? 'negative' : 'positive'" />

          </q-item-section>

        </q-item>

      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, onActivated  } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import 'dayjs/locale/es'
import { useVDBStore } from 'stores/VDB';
import { useQuasar } from 'quasar';
import { useOperationStore } from 'stores/OperationStore';
import UserToolbar from "src/components/UserToolbar.vue";
import operationApi from 'src/API/operationApi';
const $route = useRoute();
const $router = useRouter();
const $q = useQuasar();
const VDB = useVDBStore()
const $store = useOperationStore();
onActivated(() => {$store.setTitle('Resultados Comerciales Globales')})

const report = ref([])
const loading = ref(true)


const init = async () => {
  // $q.loading.show({ message: 'Obteniendo Reporte' })
  loading.value = true
  console.log($store.tab)
  console.log($store.params)
  const resp = await operationApi.getSalesMonth($store.params)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    loading.value = false
    report.value = resp
    // $q.loading.hide()
  }
}
const zoneStores = computed(() => {
  if ($store.tab === 'all') return null
  return new Set(
    $store.zones
      .find(z => z.id === $store.tab)
      .stores.map(z => z.id_viz)
  )
})

const filteredData = computed(() => {
  if ($store.tab === 'all') return report.value

  return report.value.filter(r =>
    zoneStores.value.has(r.id_store)
  )
})
const percent = (current, last) => {
  if (!last) return 0
  return Math.min(current / last, 1)
}

const percentText = (current, last) => {
  if (!last) return 0
  return ((current / last) * 100).toFixed(1)
}
const money = (value) =>
  '$' + (value || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })

const global = computed(() => {

  const current_total = filteredData.value.reduce((sum, s) => sum + Number(s.current_total), 0)
  const last_total = filteredData.value.reduce((sum, s) => sum + Number(s.last_total), 0)

  const tickets = filteredData.value.reduce((sum, s) => sum + Number(s.tickets), 0)
  const last_tickets = filteredData.value.reduce((sum, s) => sum + Number(s.last_tickets), 0)

  const growth = last_total > 0
    ? ((current_total - last_total) / last_total) * 100
    : 100
  return {
    current_total,
    last_total,
    tickets,
    last_tickets,
    growth,
    ticket_avg_current: tickets > 0 ? current_total / tickets : 0,
    ticket_avg_last: last_tickets > 0 ? last_total / last_tickets : 0
  }
})
init()
watch(
  () => $store.params._month,
  async () => {
    await init()
  },
  { immediate: true }
)
</script>
