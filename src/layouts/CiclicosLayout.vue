<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="bg-grey-3 text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <q-toolbar class="justify-between">
        <div><span class="text-grey">Helpers</span> <q-icon name="navigate_next" color="primary" /> <span
            class="text-h6">{{ cycleStore.title }}</span></div>
        <div class="row items-center" v-if="cycleStore.showBtns">
          <q-btn color="primary" icon="event" flat>
            <q-menu>
              <q-card class="my-card">
                <q-card-section>
                  <div>
                    <div class="q-pb-sm text-center">
                    </div>
                    <q-date v-model="obtranges" range minimal />
                  </div>
                </q-card-section>
                <q-card-actions vertical align="center">
                  <q-btn flat label="Obtener" color="positive" @click="buscas" />
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>
          <q-btn color="primary" icon="search" dense flat>
            <q-menu>
              <div class="q-pa-md">Buscar Inventario</div>
              <q-separator />
              <q-form dense @submit="search" class="q-gutter-md q-pa-md">
                <q-input v-model="folio" type="number" label="Folio" autofocus />
                <div class="text-right" v-if="cansearch">
                  <q-btn type="submit" color="primary" icon="search" />
                </div>
              </q-form>
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
    </q-page-container>

  </q-layout>
</template>

<script setup>
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
const folio = ref("");
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const VDB = useVDBStore();
const cycleStore = cyclecountStore()
const wndViewer = ref({ state: false, data: null });
const viewdate = ref(null);

const inventoriesdb = ref([]);
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
    ]
  },
  notes: null,
  resexh: [],
  resgen: [],
  section: null,
  products: []
})
const maximizedToggle = ref(true);

const dateranges = ref({ from: null, to: null });


const cansearch = computed(() => (folio.value && folio.value.length));
const search = () => {
  console.log("searching folio");
  wndViewer.value.folio = folio.value;
  wndViewer.value.state = true;
}

const init = async () => {
  // console.log($user.session);
  $q.loading.show({ message: "Cargado vista..." });
  let fecha = dayjs(new Date()).format("YYYY/MM/DD")
  dateranges.value = { from: fecha, to: fecha }
  let data = {
    store: VDB.session.store.id_viz,
    suc: VDB.session.store.id,
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
      ]
    },
    notes: null,
    resexh: [],
    resgen: [],
    section: null,
    products: []
  }
}

const createCyclecount = async () => {
  console.log(newCyclecount.value)
  $q.loading.show({ message: 'Creando Ciclicos' })
  newCyclecount.value._account = VDB.session.credentials.staff.id_va
  newCyclecount.value._workpoint = VDB.session.store.id_viz
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

const buscas = () => {

}


const joined = socket => {
  console.log(socket)
  $q.notify({ message: `El usuario ${socket.me.names} Se Unio :)`, type: 'positive', position: 'top' })
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
  $q.notify({message:`Termino el conteo ${data.user.me.names}`})
  $router.push('/ciclicos/counted');
}

onMounted(() => {
  init()

  $sktCounters.on("connect", () => {
    if (cycleStore.socket_user) {
      $sktCounters.emit("index", cycleStore.socket_user.profile)
    }
  })
  $sktCounters.connect()

  watch(
    () => cycleStore.socket_user.profile,
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
