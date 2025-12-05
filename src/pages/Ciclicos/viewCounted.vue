<template>
  <q-page padding>
    <q-card flat bordered class="q-pa-md row">
      <div class="col">
        <div class="text-h5 text-primary">{{ cyclecount?.notes || 'Inventario Cíclico' }}</div>
        <div class="text-caption text-grey">
          ID: {{ cyclecount?.id }} • Creado: {{ dayjs(cyclecount?.created_at).format('YYYY-MM-DD H:mm:ss') }}
        </div>
      </div>
      <div>
        <q-circular-progress show-value font-size="12px" :value="progress" size="45px" :thickness="0.22" color="teal"
          track-color="grey-3" class="q-ma-md">
          {{ progress }}%
        </q-circular-progress>
      </div>
    </q-card>

    <q-card bordered>
      <q-card-section>
        <div class="text-h6">Productos</div>
      </q-card-section>
      <q-table :rows="cyclecount?.products || []" :columns="columns" row-key="id" dense flat bordered
        @row-click="updateTabelProduct" :pagination="pagination" />
    </q-card>
    <q-footer v-if="cyclecount?._status == 2" class="row q-ml-sm q-mr-sm"
      :class="isBlack ? 'bg-grey-10 text-white' : 'bg-grey-4 text-dark'">
      <q-select class="col" v-model="filter" :options="opts" filled option-label="code" use-input fill-input
        hide-selected input-debounce="0" @filter="filterFn" @input-value="setModel" dense
        @update:model-value="updateProduct">
      </q-select>
      <q-btn v-if="validProduct?.length > 0" size="sm" icon="send" @click="confirm = !confirm" />
    </q-footer>

    <q-footer v-if="cyclecount?._status > 2" class=" q-ml-sm q-mr-sm">
      <q-btn v-if="validProduct?.length > 0" size="sm" label="Salir" @click="$router.push('/ciclicos/counted')"
        class="full-width" />
    </q-footer>

    <q-dialog v-model="countProduct.state" persistent position="bottom">
      <q-card>
        <q-card-section>
          <div class="row justify-between">
            <div class="text-left">
              <div class="text--3">CCO: {{ countProduct.val.name }}</div>
              <div class="text-h6">{{ countProduct.val.code }}</div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>{{ countProduct.val.description }}</q-card-section>
        <q-form @submit.prevent="setDeliveryProduct">
          <q-card-section>
            <div class="row">
              <div class="text-center col">
                <div>Conteo</div>
                <q-input dense borderless v-model="countProduct.val.pivot.stock_acc" type="number" min="0"
                  input-class="text-h6 text-center" ref="iptcounter" autofocus />
              </div>
              <div class="text-center col">
                <div>PXC</div>
                <div class="text-center text-bold text-h6">{{ countProduct.val.pieces }}</div>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn flat icon="close" color="negative" @click="cancelCounting" />
            <q-btn color="positive" type="submit" square icon="done_all" flat />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm">Estas Seguro de terminar ?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="No" color="negative" v-close-popup />
          <q-btn flat label="Si" color="positive" @click="nextep" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
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
cycleStore.settitle(`Ciclico ${$route.params.cid}`)
cycleStore.setshowBtns(false)
const cyclecount = ref(null);
const lockedProducts = ref({});
const filter = ref(null)
const pagination = ref({ rowsPerPage: 20 })
const opts = ref([]);
const confirm = ref(false)
const columns = [
  { name: "code", label: "code", field: "code", align: "left", classes: r => cycleStore.lockedProducts[r.id] ? colorBlocket() : '' },
  // { name: "description", label: "Descripcion", field: "description", align: "left", classes: r => cycleStore.lockedProducts[r.id] ? colorBlocket() : '' },
  { name: "ubicacion", label: "Ubicacion", field: r => r.locations?.map(e => e.path).join('/'), align: "left", classes: r => cycleStore.lockedProducts[r.id] ? colorBlocket() : '' },
  { name: "conteo", label: "Stock", field: row => row.pivot?.stock_acc || 0, align: "right", classes: r => cycleStore.lockedProducts[r.id] ? colorBlocket() : '' }
];
const countProduct = ref({
  state: false,
  val: null
})

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  let data = {
    cyclecount: $route.params.cid,
    _rol: VDB.session.credentials._rol,
    id: VDB.session.credentials.staff.id_va
  }
  console.log(data)
  const resp = await CDB.getCyclecount(data)
  if (resp.fail) {
    if (resp.fail.status == 403 || resp.fail.status == 404) {
      $q.notify({ message: `${resp.fail.response.data.message}`, type: 'negative', position: 'top' })
      $router.push('/ciclicos/counted')
    } else {
      console.log(resp)
    }
  } else {
    cyclecount.value = resp
    console.log(resp)
    $q.loading.hide()
    $sktCounters.emit('joinat', { user: cycleStore.socket_user.profile, room: `COUNTER${$route.params.cid}` })
  }
}


const filterFn = (val, update, abort) => {
  update(() => {
    const needle = val.toUpperCase()
    opts.value = cyclecount.value.products.filter(product => {
      const variantsMatch = product.variants?.some(variant =>
        variant?.barcode.toUpperCase().indexOf(needle) > -1
      );
      const productMatch =
        product.code.toUpperCase().indexOf(needle) > -1 ||
        product.barcode.toUpperCase().indexOf(needle) > -1 ||
        product.name.toUpperCase().indexOf(needle) > -1;
      return variantsMatch || productMatch;
    });
    // console.log(opts.value)
  });
}

const isBlack = computed(() => $q.dark.isActive)
const validProduct = computed(() => cyclecount.value?.products?.filter(b => b.pivot.stock_acc > 0))
const progress = computed(() => {
  const items = cyclecount.value?.products || []
  if (items.length === 0) return 0

  const counted = items.filter(p => Number(p.pivot.stock_acc) > 0).length

  return Math.round((counted / items.length) * 100)
})



const setDeliveryProduct = async () => {
  $q.loading.show({ message: 'Registrando Contreo' })
  let data = {
    _user: VDB.session.credentials.staff.id_va,
    _inventory: $route.params.cid,
    _product: countProduct.value.val.id,
    stock: countProduct.value.val.pivot.stock_acc,
  }
  const resp = await CDB.saveValue(data)
  if (resp.fail) {
    console.log(resp);
  } else {
    let socketData = {
      by: cycleStore.socket_user.profile,
      product: countProduct.value.val,
      room: `COUNTER${$route.params.cid}`,
      settings: 'config'
    }
    $sktCounters.emit('countingconfirmed', socketData)
    countProduct.value = {
      state: false,
      val: null
    }
    $q.loading.hide();
  }
}

const cancelCounting = () => {
  let socketData = {
    by: cycleStore.socket_user.profile,
    product: countProduct.value.val,
    room: `COUNTER${$route.params.cid}`
  }
  $sktCounters.emit('cancelcounting', socketData)
  // cycleStore.lockedProducts[countProduct.value.val.id]
  countProduct.value = {
    state: false,
    val: null
  }
}


const updateProduct = (a) => {
  if (cycleStore.lockedProducts[a.id]) {
    $q.notify({
      type: 'warning',
      message: 'Este producto está siendo contado por otro usuario.'
    })
    filter.value = null;
    return
  }

  if (cyclecount.value._status == 2) {
    countProduct.value.state = true;
    countProduct.value.val = a
    filter.value = null;
    let socketData = {
      by: cycleStore.socket_user.profile,
      product: a,
      room: `COUNTER${$route.params.cid}`
    }
    $sktCounters.emit('counting', socketData)
  }

}
const updateTabelProduct = (b, a) => {
  //  console.log(a)
  if (cycleStore.lockedProducts[a.id]) {
    $q.notify({
      type: 'warning',
      message: 'Este producto está siendo contado por otro usuario.'
    })
    filter.value = null;
    return
  }

  if (cyclecount.value._status == 2) {
    countProduct.value.state = true;
    countProduct.value.val = a
    filter.value = null;
    let socketData = {
      by: cycleStore.socket_user.profile,
      product: a,
      room: `COUNTER${$route.params.cid}`
    }
    $sktCounters.emit('counting', socketData)
  }

}
const setModel = (val) => {
  filter.value = val
  console.log(filter.value)
}
const colorBlocket = () => {
  return isBlack.value ? 'bg-red' : 'bg-red'
}

const nextep = async () => {
  $q.loading.show({ message: 'Terminando Conteo' })
  let data = {
    _inventory: $route.params.cid,
    workpoint: VDB.session.credentials._rol,
    user: VDB.session.credentials.staff.id_va
  }
  const resp = await CDB.nextStep(data)
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp)
    let socketData = {
      by: cycleStore.socket_user.profile,
      counter: resp.inventario,
      room: `COUNTER${$route.params.cid}`
    }
    $sktCounters.emit('endingCounting', socketData)
    $q.loading.hide()
  }
}
init();
watch(
  () => cycleStore.currentLockedProduct,
  (update) => {
    if (!update) return
    const index = cyclecount.value.products.findIndex(p => p.id === update.id)
    if (index !== -1) {
      cyclecount.value.products[index] = { ...cyclecount.value.products[index], ...update }
    }
  }
)
</script>
