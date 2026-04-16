<template>

  <q-page padding>
    <div v-if="loading"><q-inner-loading :showing="loading" label="Generando Reporte...">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading></div>
    <div v-else>
      <div class="row q-mb-md">
        <q-card class="col">
          <q-card-section>
            <div class="text-h6 text-center">Productos Contados</div>
            <div class="text-h5 text-center">{{ totals.products }}</div>
            <div>
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-center">Correctos</q-item-label>
                    <q-item-label class="text-center">{{ totals.correct }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-center">Incorrectos</q-item-label>
                    <q-item-label class="text-center">{{ totals.incorrect }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
        <q-separator spaced inset vertical />
        <q-card class="col">
          <q-card-section>
            <div class="text-h6 text-center">Exactitud</div>
            <div class="text-h4 text-center" :class="`text-${colorAccuracy(totals.accuracy)}`">{{ totals.accuracy }}%
            </div>
          </q-card-section>
        </q-card>
        <q-separator spaced inset vertical />

        <q-card class="col">
          <q-card-section>
            <div class="text-h6 text-center text-bold">Diferencia</div>
            <div class="text-h4 text-center" :class="`text-${colorAccuracy(totals.diff)}`">{{ totals.diff
            }}%</div>
          </q-card-section>
        </q-card>
      </div>
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">
            Exactitud por Almacén
          </div>
          <div v-for="wh in warehouses" :key="wh.id" class="row items-center q-mb-sm">
            <div class="col-2 text-weight-bold">
              {{ wh.id }}
            </div>
            <div class="col">
              <q-linear-progress :value="wh.accuracy / 100" size="20px" :color="colorAccuracy(wh.accuracy)" />
            </div>
            <div class="col-1 text-right">
              {{ wh.accuracy }}%
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-table title="Detalle por Sucursal" :rows="tableRows" :columns="columns" row-key="id" flat bordered   @row-click="onRowClick" :row-class="row => row.store === selectedStore ? 'bg-blue-1' : ''" />
    </div>
  </q-page>
</template>
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, onActivated } from 'vue';
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
const $store = useOperationStore()
onActivated(() => { $store.setTitle('Control de Inventarios y Perdidas') })
const selectedStore = ref(null)
const loading = ref(true)
const report = ref([])
const totals = computed(() => {
  let products = 0
  let accuracy = 0
  let precision = 0
  let correct = 0
  let incorrect = 0
  let count = 0
  let diff = 0
  filteredData.value.forEach(store => {
    store.cyclecounts.forEach(cc => {
      products += cc.products
      accuracy += cc.accuracy
      diff += cc.diff
      precision += cc.precision
      correct += cc.correctos
      incorrect += cc.incorrect
      count++
    })
  })
  return {
    products,
    correct,
    incorrect,
    accuracy: count ? (accuracy / count).toFixed(2) : 0,
    diff: count ? (diff / count).toFixed(2) : 0
  }

})
const warehouses = computed(() => {
  const map = {}
  filteredData.value.forEach(store => {
    store.cyclecounts.forEach(cc => {
      if (!map[cc.id]) {
        map[cc.id] = {
          id: cc.id,
          accuracy: 0,
          count: 0
        }
      }
      map[cc.id].accuracy += cc.accuracy
      map[cc.id].count++
    })
  })
  return Object.values(map).map(w => ({
    id: w.id,
    accuracy: (w.accuracy / w.count).toFixed(2)
  }))

})
const columns = [
  { name: 'store', label: 'Sucursal', field: 'store', align: 'left', sortable: true },

  { name: 'gen_products', label: 'GEN Productos', field: 'gen_products', sortable: true },
  { name: 'gen_accuracy', label: 'GEN Exactitud', field: 'gen_accuracy', format: v => v + '%', sortable: true },
  // { name: 'gen_precision', label: 'GEN Precisión', field: 'gen_precision', format: v => v + '%', sortable: true },

  { name: 'exh_products', label: 'EXH Productos', field: 'exh_products', sortable: true },
  { name: 'exh_accuracy', label: 'EXH Exactitud', field: 'exh_accuracy', format: v => v + '%', sortable: true },
  // { name: 'exh_precision', label: 'EXH Precisión', field: 'exh_precision', format: v => v + '%', sortable: true },

  { name: 'global_accuracy', label: 'Exactitud Global', field: 'global_accuracy', format: v => v + '%', sortable: true },
  // { name: 'global_precision', label: 'Precisión Global', field: 'global_precision', format: v => v + '%', sortable: true }

]


const tableRows = computed(() => {

  return filteredData.value.map(store => {

    const gen = store.cyclecounts.find(c => c.id === 'GEN') || {}
    const exh = store.cyclecounts.find(c => c.id === 'EXH') || {}

    const genProducts = gen.products || 0
    const exhProducts = exh.products || 0

    const genAccuracy = gen.accuracy || 0
    const exhAccuracy = exh.accuracy || 0

    const genPrecision = gen.precision || 0
    const exhPrecision = exh.precision || 0

    const totalProducts = genProducts + exhProducts

    const globalAccuracy = totalProducts
      ? ((genAccuracy * genProducts) + (exhAccuracy * exhProducts)) / totalProducts
      : 0

    const globalPrecision = totalProducts
      ? ((genPrecision * genProducts) + (exhPrecision * exhProducts)) / totalProducts
      : 0

    return {

      store: store.name,

      gen_products: genProducts,
      gen_accuracy: genAccuracy,
      // gen_precision: genPrecision,

      exh_products: exhProducts,
      exh_accuracy: exhAccuracy,
      // exh_precision: exhPrecision,

      global_accuracy: globalAccuracy.toFixed(2),
      // global_precision: globalPrecision.toFixed(2)

    }

  })

})
const colorAccuracy = (value) => {
  if (value >= 90) return 'green'
  if (value >= 80) return 'orange'
  return 'red'
}
const onRowClick = (evt, row) => {

  if (selectedStore.value === row.store) {
    selectedStore.value = null
  } else {
    selectedStore.value = row.store
  }

}
// const colorAccuracy = (value) => {
//   if (value >= 90) return 'green'
//   if (value >= 80) return 'orange'
//   return 'red'
// }

const init = async () => {
  loading.value = true
  // $q.loading.show({ message: 'Obteniendo Reporte' })
  const resp = await operationApi.getStatusInventory($store.params)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    report.value = resp
    loading.value = false;
  }
  // $q.loading.hide()
}
const zoneStores = computed(() => {
  if ($store.tab === 'all') return null
  return new Set(
    $store.zones
      .find(z => z.id === $store.tab)
      .stores.map(z => z.id_viz)
  )
})

// const filteredData = computed(() => {
//   if ($store.tab === 'all') return report.value

//   return report.value.filter(r =>
//     zoneStores.value.has(r.id)
//   )
// })

const filteredData = computed(() => {

  let data = report.value

  if ($store.tab !== 'all') {
    data = data.filter(r =>
      zoneStores.value.has(r.id)
    )
  }

  if (selectedStore.value) {
    data = data.filter(r => r.name === selectedStore.value)
  }

  return data

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
