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
              <div class="text-h6 text-center">Encuentas</div>
              <div class="text-h4 text-center">{{ summary.total }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Servicio</div>
              <div class="text-h4 text-center">{{ summary.service }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center text-bold">Agilidad</div>
              <div class="text-h4 text-center">{{ summary.agilidad }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Información</div>
              <div class="text-h4 text-center">{{ summary.info }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="">
            <q-card-section>
              <div class="text-h6 text-center">Recomendacion</div>
              <div class="row">
                <div class="col">
                  <div class="text-center">Si</div>
                  <q-separator spaced inset vertical dark />
                  <div class="text-center text-h5"
                    :class="summary.recomendacionSiPct > 0 ? 'text-positive' : 'text-negative'">{{
                      summary.recomendacionSiPct }}%</div>
                </div>
                <div class="col">
                  <div class="text-center">No</div>
                  <q-separator spaced inset vertical dark />
                  <div class="text-center text-h5"
                    :class="summary.recomendacionNoPct != 0 ? 'text-negative' : 'text-positive'">{{
                      summary.recomendacionNoPct }}%</div>
                </div>
              </div>
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
const report = ref([]);
onActivated(() => { $store.setTitle('Experiencia de cliente y marca') })

const summary = computed(() => {

  const total = allQuiz.value.length

  if (!total) {
    return {
      quiz: 0,
      service: 0,
      agilidad: 0,
      info: 0,
      recomendacionSi: 0,
      recomendacionNo: 0
    }
  }

  const service =
    allQuiz.value.reduce((a, b) => a + Number(b.second || 0), 0) / total

  const agilidad =
    allQuiz.value.reduce((a, b) => a + Number(b.third || 0), 0) / total

  const info =
    allQuiz.value.reduce((a, b) => a + Number(b.fourth || 0), 0) / total

  const recomendacionSi =
    allQuiz.value.filter(q => q.fifth == 'Si').length

  const recomendacionNo =
    allQuiz.value.filter(q => q.fifth == 'No').length

  const recomendacionSiPct =
    (recomendacionSi / total) * 100

  const recomendacionNoPct =
    (recomendacionNo / total) * 100

  return {
    total,
    service: service.toFixed(1),
    agilidad: agilidad.toFixed(1),
    info: info.toFixed(1),
    recomendacionSiPct: recomendacionSiPct.toFixed(1),
    recomendacionNoPct: recomendacionNoPct.toFixed(1)
  }

})
const columns = ref([
  { name: 'sucursal', label: 'Sucursal', field: r => r.name, align: 'left', sortable: true },
  { name: 'encuestas', label: 'Encuestas', field: r => r.quiz?.length || 0, align: 'center', sortable: true },
  { name: 'servicio', label: 'Servicio ⭐', field: r => avg(r.quiz, 'second').toFixed(1), align: 'center', sortable: true },
  { name: 'agilidad', label: 'Agilidad ⭐', field: r => avg(r.quiz, 'third').toFixed(1), align: 'center', sortable: true },
  { name: 'info', label: 'Información ⭐', field: r => avg(r.quiz, 'fourth').toFixed(1), align: 'center', sortable: true },
  {
    name: 'general',
    label: 'Promedio ⭐',
    field: r => {
      if (!r.quiz?.length) return '0.0'
      const servicio = avg(r.quiz, 'second')
      const agilidad = avg(r.quiz, 'third')
      const info = avg(r.quiz, 'fourth')

      return ((servicio + agilidad + info) / 3).toFixed(1)
    },
    align: 'center',
    sortable: true

  }
])
const avg = (arr = [], field) => {
  if (!arr.length) return 0
  return arr.reduce((a, b) => a + Number(b[field] || 0), 0) / arr.length
}

const allQuiz = computed(() =>
  filteredData.value.flatMap(s => s.quiz)
)
const init = async () => {
  loading.value = true
  const resp = await operationApi.getSatisfactionClient($store.params)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    report.value = resp
    loading.value = false
  }
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
