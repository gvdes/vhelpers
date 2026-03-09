<template>
  <q-page>
    <q-toolbar class="justify-between" v-if="cycleStore.showBtns">
      <q-space />
      <div class="row items-center">
        <q-btn color="primary" icon="event" flat>
          <q-menu>
            <q-card class="my-card">
              <q-card-section>
                <div>
                  <div class="q-pb-sm text-center">
                  </div>
                  <q-date v-model="dateranges" range minimal />
                </div>
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn flat label="Obtener" color="positive" @click="buscas" />
              </q-card-actions>
            </q-card>
          </q-menu>
        </q-btn>
        <q-btn color="primary" icon="add_shopping_cart" dense flat>
          <q-menu>
            <div class="q-pa-md">Productos Sin Conteo</div>
            <q-separator />
            <q-card-section>
              <q-select v-model="dateProducts.sections" :options="cycleStore.sections" label="Seccion" filled
                option-label="name" multiple use-chips dense />
              <div>
                <div class="q-pb-sm text-center">
                </div>
                <q-date v-model="dateProducts.date" range minimal />
              </div>
            </q-card-section>
            <q-card-actions vertical align="center">
              <q-btn flat label="Obtener" color="positive" @click="productCyclecount"
                :disable="!dateProducts.sections.length || !hasDate" />
            </q-card-actions>
          </q-menu>
        </q-btn>
        <q-separator spaced inset vertical dark />
        <q-btn color="primary" icon="add" outline @click="newCyclecount.state = !newCyclecount.state" />
      </div>
    </q-toolbar>

    <q-dialog v-model="newCyclecount.state" persistent :maximized="maximizedToggle" transition-show="slide-up"
      transition-hide="slide-down">
      <q-card>
        <q-bar>
          <div class="text-center text-h6">Nuevo Inventario</div>
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" @click="reset">
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <InvCreate :config="newCyclecount" @create="createCyclecount" />
      </q-card>

    </q-dialog>
    <router-view />
  </q-page>
</template>

<script setup>
import InvViewer from 'src/components/Inventory/Viewer.vue'
import { useWarehouse } from 'src/stores/warehousStore';
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import dayjs from 'dayjs';
import UserToolbar from 'src/components/UserToolbar.vue';
import CDB from 'src/API/cicsdb';
import { useVDBStore } from 'src/stores/VDB';
import InvCreate from 'src/components/Inventory/Create.vue'
import { cyclecountStore } from 'stores/cyclecountStore';
import { $sktCounters } from 'boot/socket';
import reportExc from "src/Excel/reports.js";
const VDB = useVDBStore();
const folio = ref("");
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const cycleStore = cyclecountStore()
const warehousStore = useWarehouse()
warehousStore.setTitle(`Inventarios Ciclicos `);
warehousStore.setshowReportLocations(false);
warehousStore.setshowReportMinMax(false);
warehousStore.setshowOptions(false);
cycleStore.setshowBtns(true)

const maximizedToggle = ref(true);
const hasDate = computed(() => {
  const d = dateProducts.value.date
  if (!d) return false
  if (typeof d === 'string') return d.length > 0
  return d.from && d.to
})


const init = async () => {
  $q.loading.show({ message: "Cargado vista..." });
  let fecha = dayjs(new Date()).format("YYYY/MM/DD")
  dateranges.value = { from: fecha, to: fecha }
  let data = {
    _warehouse: $route.params.wid,
    date: dateranges.value
  }
  console.log(data)
  const resp = await CDB.index(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    cycleStore.setCyclecount(resp.inventories)
    cycleStore.setUsers(resp.colab)
    cycleStore.setSections(resp.secciones)
    cycleStore.setLocations(resp.locations)
    $q.loading.hide();
  }
}
const createCyclecount = async () => {
  console.log(newCyclecount.value)
  $q.loading.show({ message: 'Creando Ciclicos' })
  const resp = await CDB.addCyclecount(newCyclecount.value)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    if (resp.success) {
      resp.data.forEach(e => cycleStore.addCyclecount(e.counter));
      $q.loading.hide()
      reset()
    }
  }
}

const buscas = async () => {
  // console.log($user.session);
  $q.loading.show({ message: "Obteniendo Datos..." });
  let data = {
    _warehouse: $route.params.wid,
    date: dateranges.value
  }
  const resp = await CDB.index(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    cycleStore.setCyclecount(resp.inventories)
    cycleStore.setUsers(resp.colab)
    cycleStore.setSections(resp.secciones)
    cycleStore.setLocations(resp.locations)
    $q.loading.hide();
  }

}

const productCyclecount = async () => {
  $q.loading.show({ message: "Obteniendo Datos..." });
  let data = {
    _warehouse:$route.params.wid ,
    params: dateProducts.value
  }
  console.log(data);
  const resp = await CDB.productCyclecount(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    let key = '';
    const f = dateProducts.value.date

    if (typeof f === 'string') {
      key = `PSC_${f.replaceAll('/', '_')}`
    } else {
      key = `PSC_${f.from.replaceAll('/', '_')}_a_${f.to.replaceAll('/', '-')}`
    }
    let impor = {
      key: key,
      value: resp
    }
    reportExc.conStockSinContar(impor)
    $q.loading.hide();
  }
}


const newCyclecount = ref({
  state: false,
  type: {
    val: { id: 2, label: 'Ciego' },
    opts: [
      { id: 1, label: 'Normal' },
      { id: 2, label: 'Ciego' },
    ]
  },
  option: {
    val: null,
    opts: [
      { id: 1, label: 'Ubicacion' },
      { id: 2, label: 'Sin Ubicacion' },
      { id: 3, label: 'Producto' },
      { id: 4, label: 'Importacion' },
    ]
  },
  notes: null,
  _warehouse: $route.params.wid,
  // resexh: [],
  resgen: [],
  section: null,
  products: []
})

const dateranges = ref({ from: null, to: null });
const dateProducts = ref({
  sections: [],
  date: { from: null, to: null }
});

const reset = () => {
  newCyclecount.value = {
    state: false,
    type: {
      val: { id: 2, label: 'Ciego' },
      opts: [
        { id: 1, label: 'Normal' },
        { id: 2, label: 'Ciego' },
      ]
    },
    option: {
      val: null,
      opts: [
        { id: 1, label: 'Ubicacion' },
        { id: 2, label: 'Sin Ubicacion' },
        { id: 3, label: 'Producto' },
        { id: 4, label: 'Importacion' },
      ]
    },
    notes: null,
    _warehouse: $route.params.wid,
    // resexh: [],
    resgen: [],
    section: null,
    products: []
  }
}


const joined = socket => {
  console.log(socket)
  $q.notify({ message: `El usuario ${socket.credentials.nick} Se Unio :)`, type: 'positive', position: 'top' })
}
const counting = data => {
  console.log(data)
  cycleStore.lock(data.product.id, data)
}

const cancelcounting = data => {
  console.log(data)
  cycleStore.unlock(data.product.id)
}

const countingconfirmed = data => {
  console.log(data)
  cycleStore.updateLockedProduct(data.product)
}
const endingCounting = data => {
  cycleStore.updateCyclecounts(data.counter)
  $q.notify({ message: `Termino el conteo ${data.user.credentials.nick}` })
  $router.push(`/warehouse/${$route.params.wid}/ciclicos/counted`);
}

onMounted(() => {
  init()

  $sktCounters.on("connect", () => {
    if (VDB.session) {
      $sktCounters.emit("index", VDB.session)
    }
  })
  $sktCounters.connect()

  watch(
    () => VDB.session,
    val => {
      if (val && $sktCounters.connected) {
        $sktCounters.emit("index", val)
      }
    },
    { immediate: true }
  )

  $sktCounters.on('joined', joined)
  $sktCounters.on('counting', counting)
  $sktCounters.on('cancelcounting', cancelcounting)
  $sktCounters.on('countingconfirmed', countingconfirmed)
  $sktCounters.on('endingCounting', endingCounting)

})

onBeforeUnmount(() => {
  $sktCounters.off('joined', joined)
  $sktCounters.off('counting', counting)
  $sktCounters.off('cancelcounting', cancelcounting)
  $sktCounters.off('countingconfirmed', countingconfirmed)
  $sktCounters.off('endingCounting', endingCounting)

})

init();

</script>
