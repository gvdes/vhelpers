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
              <div class="text-h6 text-center">Actas ADM</div>
              <div class="text-h4 text-center">{{ summary.actas }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Sanciones</div>
              <div class="text-h4 text-center">{{ summary.sanciones }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center text-bold">Faltas</div>
              <div class="text-h4 text-center">{{ summary.faltas }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Retardos</div>
              <div class="text-h4 text-center">{{ (summary.retardos) }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <q-table title="Detalle por Sucursal" :rows="filteredData" :columns="columns" row-key="id" flat bordered />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, onActivated } from 'vue';
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
const report = ref([])
onActivated(() => { $store.setTitle('Diciplina Administrativa y Control Interno') })
const summary = computed(() => {

  const actas = filteredData.value.reduce((a, b) => a + (Number(b.ACTAS) || 0), 0)
  const sanciones = filteredData.value.reduce((a, b) => a + (Number(b.SANCIONES) || 0), 0)
  const retardos = filteredData.value.reduce((a, b) => a + (b.RETARDOS || 0), 0)
  const faltas = filteredData.value.reduce((a, b) => a + (b.FALTAS || 0), 0)

  return {
    actas,
    sanciones,
    retardos,
    faltas
  }
})
const columns = ref([
  { name: 'sucursal', label: 'Sucursal', field: r => r.SUCURSAL, sortable: true, align: 'left' },
  { name: 'faltas', label: 'Faltas', field: r => r.FALTAS, sortable: true, align: 'left' },
  { name: 'retardos', label: 'Retardos', field: r => r.RETARDOS, sortable: true, align: 'left' },
  { name: 'actas', label: 'Actas', field: r => r.ACTAS, sortable: true, align: 'left' },
  { name: 'sanciones', label: 'Sanciones', field: r => r.SANCIONES, sortable: true, align: 'left' },
])



const init = async () => {
  // $q.loading.show({ message:'Obteniendo Reporte' })
  loading.value = true
  const resp = await operationApi.statusAdm($store.params)
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
init();
watch(
  () => $store.params._month,
  async () => {
    await init()
  },
  { immediate: true }
)
</script>
