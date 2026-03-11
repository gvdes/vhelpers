<template>
  <q-page padding>
    <div v-if="loading"><q-inner-loading :showing="loading" label="Generando Reporte...">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading></div>
    <div v-else>
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Aperturas</div>
              <div class="text-h4 text-center">{{ summary.aperturas }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Cierres Incorrectos</div>
              <div class="text-h4 text-center" :class="summary.cierres == 0 ? 'text-positive' : 'text-negative'">{{
                summary.cierres }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Eficiencia</div>
              <div class="text-h4 text-center" :class="summary.eficiencia == 100 ? 'text-positive' : 'text-negative'">{{
                summary.eficiencia }}%</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Impacto Caja</div>
              <div class="text-h4 text-center" :class="summary.impacto < 600 ? 'text-positive' : 'text-negative'">${{
                summary.impacto }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-card>
        <q-table title="Detalle por sucursal" :rows="filteredData" :columns="columns" row-key="id"
          :row-class="rowClass" />
      </q-card>
    </div>


  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, onActivated  } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import 'dayjs/locale/es'
import { useVDBStore } from 'stores/VDB';
import { Loading, useQuasar } from 'quasar';
import { useOperationStore } from 'stores/OperationStore';
import UserToolbar from "src/components/UserToolbar.vue";
import operationApi from 'src/API/operationApi';
const $route = useRoute();
const $router = useRouter();
const $q = useQuasar();
const VDB = useVDBStore()
const $store = useOperationStore()
const loading = ref(true)
onActivated(() => {$store.setTitle('Eficiencia Operativa y Estandarizacion')})


const report = ref([])

const columns = [
  { name: 'store', label: 'Sucursal', field: 'name', align: 'left' },
  { name: 'aperturas', label: 'Aperturas', field: 'cashers_count', align: 'center' },
  { name: 'cierres', label: 'Cierres Incorrectos', field: 'opens_count', align: 'center' },
  { name: 'eficiencia', label: 'Eficiencia %', field: 'eficiencia', align: 'center' },
  { name: 'descuadre', label: 'Descuadre', field: 'descuadre', align: 'right' }
]

const summary = computed(() => {

  const aperturas = filteredData.value.reduce((a, b) => a + (b.cashers_count || 0), 0)
  const cierres = filteredData.value.reduce((a, b) => a + (b.opens_count || 0), 0)
  const impacto = filteredData.value.reduce((a, b) => a + (b.descuadre || 0), 0)

  const eficiencia = aperturas > 0
    ? ((1 - (cierres / aperturas)) * 100).toFixed(1)
    : 0

  return {
    aperturas,
    cierres,
    eficiencia,
    impacto: impacto.toFixed(2)
  }
})

const rowClass = (row) => {

  if (row.descuadre < -600) return "bg-red-2"

  if (row.opens_count > 0) return "bg-orange-2"

  return ""
}

const init = async () => {
  // $q.loading.show({ message:'Obteniendo Reporte' })
  loading.value = true
  const resp = await operationApi.getCashStatus($store.params)
  if (resp.fail) {
    console.log(resp)
  } else {

    console.log(resp)
    report.value = resp.map(s => {
      const eficiencia = s.cashers_count > 0
        ? ((1 - (s.opens_count / s.cashers_count)) * 100).toFixed(1)
        : 100
      return {
        ...s,
        eficiencia
      }
    })
    loading.value = false
  }
  // $q.loading.hide()
}
const zoneStores = computed(() => {
  if ($store.tab === 'all') return null
  return new Set(
    $store.zones
      .find(z => z.id === $store.tab)
      .stores.map(z => z.id)
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
