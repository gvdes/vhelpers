<template>
  <q-page padding>
    <!-- LOADING -->
    <q-inner-loading :showing="loading" label="Generando Reporte...">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <div v-if="!loading">

      <!-- ===== RESUMEN ===== -->
      <div class="row q-col-gutter-md q-mb-md">

        <div class="col">
          <q-card>
            <q-card-section class="text-center">
              <div class="text-h6">Encuestas</div>
              <div class="text-h4">{{ summary.total }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col">
          <q-card>
            <q-card-section class="text-center">
              <div class="text-h6">Satisfacción</div>
              <div class="text-h4">{{ summary.average }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-center">Recomendación</div>

              <div class="row">
                <div class="col text-center">
                  <div>Si</div>
                  <div class="text-h5 text-positive">
                    {{ summary.recomendacionSiPct }}%
                  </div>
                </div>

                <div class="col text-center">
                  <div>No</div>
                  <div class="text-h5 text-negative">
                    {{ summary.recomendacionNoPct }}%
                  </div>
                </div>
              </div>

            </q-card-section>
          </q-card>
        </div>

      </div>

      <!-- ===== TABLA ===== -->
      <q-table
        title="Detalle por Sucursal"
        :rows="report"
        :columns="columns"
        row-key="id"
        flat
        bordered
      />

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

/*
|--------------------------------------------------------------------------
| SUMMARY GLOBAL
|--------------------------------------------------------------------------
*/
const summary = computed(() => {

  const total = report.value.reduce((a, b) => a + b.total, 0)

  if (!total) {
    return {
      total: 0,
      average: 0,
      recomendacionSiPct: 0,
      recomendacionNoPct: 0
    }
  }

  const totalWeighted = report.value.reduce((acc, s) => {
    return acc + (s.average * s.total)
  }, 0)

  const average = totalWeighted / total

  const totalSi = report.value.reduce((a, b) => {
    return a + (b.recommend_si * b.total / 100)
  }, 0)

  const recomendacionSiPct = (totalSi / total) * 100
  const recomendacionNoPct = 100 - recomendacionSiPct

  return {
    total,
    average: average.toFixed(1),
    recomendacionSiPct: recomendacionSiPct.toFixed(1),
    recomendacionNoPct: recomendacionNoPct.toFixed(1)
  }
})

/*
|--------------------------------------------------------------------------
| TABLA
|--------------------------------------------------------------------------
*/
const columns = [
  { name: 'name', label: 'Sucursal', field: 'name', align: 'left', sortable: true },
  { name: 'total', label: 'Encuestas', field: 'total', align: 'center', sortable: true },
  { name: 'average', label: 'Promedio ⭐', field: 'average', align: 'center', sortable: true },
  {
    name: 'recommend',
    label: '% Recomendación',
    field: row => row.recommend_si + '%',
    align: 'center',
    sortable: true
  }
]

/*
|--------------------------------------------------------------------------
| INIT
|--------------------------------------------------------------------------
*/
const init = async () => {
  loading.value = true

  try {
    const resp = await operationApi.getSatisfactionClient($store.params)

    if (!resp.fail) {
      report.value = resp
    }

  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(init)

watch(
  () => $store.params._month,
  async () => {
    await init()
  }
)
</script>
