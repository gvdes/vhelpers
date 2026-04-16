<template>
  <q-page padding>
    <div v-if="loading"><q-inner-loading :showing="loading" label="Generando Reporte...">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading></div>
    <div v-else>
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Personal Activo</div>
              <div class="text-h4 text-center">{{ summary.activo }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Bajas</div>
              <div class="text-h4 text-center">{{ summary.bajas }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center text-bold">Plantilla Sugerida</div>
              <div class="text-h4 text-center">{{ summary.sugerido }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Rotacion</div>
              <div class="text-h4 text-center">{{ (summary.rotacion * 100).toFixed(2) }}%</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Cobertura</div>
              <div class="text-h4 text-center"
                :class="(summary.cobertura * 100) == 100 ? 'text-positive' : 'text-negative'">{{ (summary.cobertura *
                  100).toFixed(2) }}%</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-table title="Detalle por Sucursal" :rows="filteredData" :columns="columns" row-key="id" flat bordered />
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
onActivated(() => {$store.setTitle('Gestion de Personas y Liderazgo')})

const report = ref([])
const loading = ref(true)
const summary = computed(() => {

  const activo = filteredData.value.reduce((a, b) => a + (b.plantilla || 0), 0)
  const bajas = filteredData.value.reduce((a, b) => a + (b.bajas || 0), 0)
  const sugerido = filteredData.value.reduce((a, b) => a + (b.template?.template || 0), 0)

  const cobertura = activo > 0 ? activo / sugerido : 0
  const rotacion = activo > 0 ? bajas / activo : 0

  return {
    activo,
    bajas,
    sugerido,
    rotacion,
    cobertura
  }
})

const columns = ref([
  { name: 'sucursal', label: 'Sucursal', field: r => r.name, sortable: true, align: 'left' },
  { name: 'active', label: 'Activo', field: r => r.plantilla, sortable: true, align: 'left' },
  { name: 'inactive', label: 'Bajas', field: r => r.bajas, sortable: true, align: 'left' },
  { name: 'suggestion', label: 'Sugerido', field: r => r.template?.template, sortable: true, align: 'left' },
  { name: 'rotation', label: 'Rotacion', field: r => (r.bajas / r.plantilla * 100).toFixed(2), sortable: true, align: 'left', format: v => v + '%' },
  { name: 'cobertura', label: 'Cobertura', field: r => (r.plantilla / r.template?.template * 100).toFixed(2), sortable: true, align: 'left', format: v => v + '%' },
])



const init = async () => {
  // $q.loading.show({ message: 'Obteniendo Reporte' })
  loading.value = true
  const resp = await operationApi.getStatusPerson($store.params)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    report.value = resp
    loading.value = false
  }
  // $q.loading.hide()
}
const zoneStores = computed(() => {
  if ($store.tab === 'all') return null
  return new Set(
    $store.zones
      .find(z => z.id === $store.tab)
      .stores.map(z => z.id_eva)
  )
})

const filteredData = computed(() => {
  if ($store.tab === 'all') return report.value

  return report.value.filter(r =>
    zoneStores.value.has(r.id)
  )
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
