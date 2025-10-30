<template>
  <!-- <q-layout view="hHh Lpr fFf">  -->

  <!-- <q-page-container> -->
  <q-page>
    <div bordered class="bg-cyan-10 text-white">
      <q-toolbar>
        <!-- <q-btn flat round dense icon="arrow_back" @click="$router.replace('/distribute/checkout');" /> -->
        <q-toolbar-title>
          Pedido {{ $route.params.chk }}
        </q-toolbar-title>
        <div class="text-bold">Origen : </div>{{ order.requisition?.to.name }}
        <q-space />
        <q-btn color="white" icon="sync" @click="init" round dense flat />
      </q-toolbar>
      <q-separator />
      <div class="q-px-md q-py-sm">
        <div class="col row justify-between ">
          <div class="text-bold">Surtidor :</div> {{ order?._suplier }}
          <q-space />
          <div class="text-bold">Notas :</div> {{ order.requisition?.notes }}
          <q-space />
          <div class="text-bold">Destino :</div> {{ order.requisition?.from.name }}
          <q-space />
          <div class="text-bold">Pedido :</div> {{ order._requisition }}
        </div>
        <q-separator spaced inset vertical dark />
        <div class="col row justify-between ">
          <div>Productos: <b>{{ productsdb.length }}</b></div>
          <div>Piezas: <b>{{ totalpieces }}</b> </div>
        </div>
        <div class="row items-center justify-between q-pt-sm" v-if="ostate && ostate.id >= 3">
          <div><span class="text--2">Agotados:</span> <b>{{ soldout.length }}</b></div>
          <div><span class="text--2">Con stock:</span> <b>{{ wstock.length }}</b></div>
          <div><span class="text--2">Por revisar:</span> <b>{{ uncounteds.length }}</b></div>
          <div><span class="text--2">Revisados:</span> <b>{{ counteds.length }}</b></div>
          <div><span class="text--2">Cajas Contadas:</span> <b>{{counteds.reduce((acc, val) => acc +
            (val.pivot._supply_by == 3 ? val.pivot.toDelivered : 1), 0)}}</b></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="text-h6">Productos sin revisar</div>
        <q-table row-key="id" flat :rows="basket" :columns="table.columns" :pagination="table.pagination"
          :filter="table.filter" :visible-columns="viewcols" @row-click="rowClicked">
          <template v-slot:top>
            <div class="full-width row items-center justify-between">
              <q-input dense v-model="table.filter" placeholder="Buscar" input-class="text-uppercase" color="pink-5">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-btn color="secondary" icon="fas fa-eye" flat no-caps>
                <q-menu style="min-width: 200px">
                  <q-list>
                    <q-item tag="label" v-ripple v-for="(col, idx) in table.columns" :key="idx">
                      <q-item-section>
                        <q-item-label>{{ col.label }}</q-item-label>
                        <q-item-label caption>{{ col.coldesc }}</q-item-label>
                      </q-item-section>
                      <q-item-section side top>
                        <q-toggle color="pink-5" v-model="viewcols" :val="col.name" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </template>
        </q-table>
      </div>
      <q-separator vertical />
      <div class="col">
        <div class="text-h6">Productos revisados</div>
        <q-table row-key="id" flat :rows="basketCheck" :columns="table.columns" :pagination="table.pagination"
          :filter="table.filter" :visible-columns="viewcols" @row-click="rowClicked">
          <template v-slot:top>
            <div class="full-width row items-center justify-between">
              <q-input dense v-model="table.filter" placeholder="Buscar" input-class="text-uppercase" color="pink-5">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-btn color="secondary" flat icon="fas fa-eye" no-caps>
                <q-menu style="min-width: 200px">
                  <q-list>
                    <q-item tag="label" v-ripple v-for="(col, idx) in table.columns" :key="idx">
                      <q-item-section>
                        <q-item-label>{{ col.label }}</q-item-label>
                        <q-item-label caption>{{ col.coldesc }}</q-item-label>
                      </q-item-section>
                      <q-item-section side top>
                        <q-toggle color="pink-5" v-model="viewcols" :val="col.name" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </template>
        </q-table>
      </div>
    </div>

    <q-dialog v-model="wndCounter.state" position="bottom" @hide="iptfinder.focus()">
      <q-card v-if="wndCounter.item">
        <q-card-section class="bg-grey-3">
          <div class="row justify-between">
            <div class="text-left">
              <div class="text--3">ID: {{ wndCounter.item.id }}</div>
              <div class="text-h6">{{ wndCounter.item.code }}</div>
            </div>
            <div class="text-right">
              <div class="text-bold">{{ wndCounter.item.name }}</div>
              <div class="text--2">{{ wndCounter.item.barcode }}</div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>{{ wndCounter.item.description }}</q-card-section>

        <q-card-section class="row justify-around items-center">
          <div class="text-center">
            <div class="text-h6">{{ wndCounter.item.pieces }}</div>
            <div class="text--2">PxC</div>
          </div>
          <div v-for="stock in wndCounter.item.stocks" :key="stock.id" class="text-center">
            <div class="text-h6">{{ stock.pivot.gen }}</div>
            <div class="text--2">{{ stock.alias }}</div>
          </div>
        </q-card-section>

        <q-form @submit.prevent="setDeliveryProduct">
          <q-card-section>
            <div class="row items-start justify-between">
              <div class="text-center col text-primary">
                <div>Solicitud</div>
                <div class="text-bold">{{ wndCounter.item.pivot.amount }} {{ wndCounter.item.pivot._supply_by == 3 ?
                  `Caja${wndCounter.item.pivot.amount != 1 ? 's' : ''}` : wndCounter.item.pivot._supply_by == 2 ?
                    `Docena${wndCounter.item.pivot.amount != 1 ? 's' : ''}` :
                    `Pieza${wndCounter.item.pivot.amount != 1 ? 's' : ''}` }}
                </div>
              </div>

              <div class="text-center col">
                <div>Conteo</div>
                <q-input dense borderless v-model="wndCounter.form.count" type="number" min="0"
                  input-class="text-h6 text-center" ref="iptcounter" />
              </div>

              <div class="text-center col">
                <div>PxC</div>
                <q-input dense borderless v-model="wndCounter.form.ipack" type="number"
                  input-class="text-h6 text-center" />
              </div>

              <div class="text-center col">
                <div>Piezas</div>
                <div class="text-bold">{{ wndCounter.item.pivot._supply_by == 3 ?
                  (wndCounter.form.count * wndCounter.form.ipack) : wndCounter.item.pivot._supply_by == 2 ?
                    (wndCounter.form.count * 12) : wndCounter.form.count }}</div>
              </div>
            </div>
          </q-card-section>

          <q-btn color="green-5" type="submit" square icon="done_all" no-caps class="q-mt-md q-py-md full-width" />
        </q-form>
      </q-card>
    </q-dialog>

    <!-- ESTA VENTANA PARA TERMINAR EL CHECKOUT -->

    <q-dialog v-model="wndNextState.state">
      <q-card>
        <q-card-section class="row items-start">
          <q-avatar icon="warning" color="orange-14" text-color="white" />

          <div class="q-ml-md">
            <div class="text-h6 text-bold">Deseas terminar la revision?</div>

          </div>
        </q-card-section>
        <q-card-section class="text-subtitle1 text-bold">
          <div>EL pedido ya no podra editarse y se emitira la salida correspondiente</div>
          <div>en factusol</div>
        </q-card-section>
        <!-- <q-card-section>
        <q-select v-model="warehouseSel.val" :options="warehouseSel.opts" label="Almacen Destino" filled />
        </q-card-section> -->
        <q-card-actions align="right">
          <q-btn flat label="Canclear" color="negative" rounded v-close-popup no-caps />
          <q-btn flat label="Emitir Factura" color="positive" rounded @click="nextState" :disable="lockbutton" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="adminErrRequest.state" persistent>
      <q-card class="bg-red text-white">
        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm">{{ adminErrRequest.code }}</span>
        </q-card-section>
        <q-card-section>
          <span class="q-ml-sm">{{ adminErrRequest.text }}</span>
        </q-card-section>
      </q-card>
    </q-dialog>


  </q-page>

  <q-footer bordered class="bg-cyan-10 text-dark q-pa-sm row" elevated v-if="enabledEditor">
    <q-input color="white" v-model="finder" type="text" class="col"
      input-class="text-white text-h6 text-center text-uppercase" autofocus dense @keypress.enter="searchToSet"
      ref="iptfinder">
      <template v-slot:prepend>
        <q-icon name="fas fa-barcode" color="white" />
      </template>
      <template v-slot:append>
        <q-btn flat icon="fas fa-delete-left" color="white" @click="finder = ''" :disabled="!finder.length" />
      </template>
    </q-input>
    <q-btn color="white" text-color="cyan-9" label="Terminar" icon="done" @click="wndNextState.state = true"
      v-if="counteds.length > 0" no-caps :disable="lockbutton" />
  </q-footer>
  <q-footer v-if="order && order._status != 5" bordered class="bg-orange-9 text-white">
    <div class="q-pa-md text-bold text-uppercase text-center">{{ order.status?.name }}</div>
  </q-footer>
  <!-- </q-page-container> -->

  <!-- </q-layout> -->
</template>

<script setup>
import { ref, onMounted, computed, nextTick, onUnmounted } from 'vue';
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router';
import InvoicePdf from 'src/Pdf/Invoices/invoices.js';
// import { ipAssist } from "boot/axios.js"
import dayjs from 'dayjs';
import RestockApi from 'src/API/RestockApi.js';
import invApi from 'src/API/invoicesApi.js';
import { useVDBStore } from 'stores/VDB';
// import pdf from 'src/api/pdfCreate.js';
import { $sktRestock } from 'boot/socket';
import { useRestockStore } from 'stores/Restock';
// import AssitApi from 'src/API/AssistApi.js';
import { useQuasar } from 'quasar';

const $route = useRoute();
const $router = useRouter();
const $q = useQuasar();
const $restockStore = useRestockStore();
const VDB = useVDBStore()
const warehouseSel = ref({
  val: 'GEN',
  opts: [
    'GEN', 'EMP'
  ]
})

// const user_socket = usrSkt;

$sktRestock.on("blockButton", () => {
  $q.notify({ message: 'Se esta generando otra salida', type: 'positive', position: 'top' })
  wndNextState.value.state = false
  lockbutton.value = true;
});

$sktRestock.on("unblockButton", () => {
  $q.notify({ message: 'Se termino de generar la otra salida', type: 'negative', position: 'top' })
  lockbutton.value = false;
});
const lockbutton = ref(false)
const partition = ref(null);
const viewcols = ref(["code", "assocs", "ipack", "request", "uspply", "delivery", "reqinpzs", "checkout", "stocks"]);
const productsdb = ref([]);
const finder = ref("");
const iptcounter = ref(null);
const iptfinder = ref(null);
const ostate = ref(null);
const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: 'id', align: "left", coldesc: "Identificador del producto (MySQL)" },
    { name: 'code', label: 'Codigo', field: 'code', align: "left", coldesc: "Codigo principal del producto" },
    { name: 'assocs', label: 'Asociados', field: row => row.variants.length ? row.variants.map(p => p.barcode).join(', ') : null, align: "left", coldesc: "Codigos relacionados al codigo principal" },
    { name: 'bcode', label: 'Codigo de Barras', field: 'barcode', align: "center", coldesc: "Codigo de barras principal" },
    { name: 'locs', label: 'Ubicacion', field: row => row.locations.length ? row.locations.map(l => l.path).join(", ") : '--', align: "left", coldesc: "Ubicaciones en almacen general" },
    { name: 'ipack', label: 'PxC', field: row => typeof row.pivot.ipack == "number" ? row.pivot.ipack : row.pieces, align: "center", coldesc: "Unidades x Embalaje" },
    { name: 'request', label: 'Solicitud', field: row => row.pivot.amount, align: "center", coldesc: "Embalaje solicitado" },
    { name: 'uspply', label: 'Unidad', field: row => row.pivot._supply_by == 3 ? 'Cajas' : row.pivot._supply_by == 2 ? 'Docenas' : 'Piezas', align: 'left', coldesc: "Unidad de embalaje del producto" },
    { name: 'delivery', label: 'Conteo', field: row => row.pivot.toDelivered, align: 'center', coldesc: "Embalaje surtido", sortable: true },
    {
      name: 'reqinpzs',
      label: 'Piezas',
      field: row => row.pivot._supply_by == 3 ?
        ((typeof row.pivot.ipack == "number" ? row.pivot.ipack : row.pieces) * (typeof row.pivot.ipack == "number" ? row.pivot.toDelivered : row.pivot.amount)) : (typeof row.pivot.ipack == "number" ? row.pivot.toDelivered : row.pivot.amount),
      align: 'center',
      coldesc: "Unidades totales en embalaje"
    },
    { name: 'checkout', label: 'Checkout', 'field': row => row.pivot.checkout ? "OK" : null, classes: row => row.pivot.checkout ? "text-positive text-bold" : "", align: "center", coldesc: "Revision del Administrador" },
    { name: 'descr', label: 'Descripcion', field: 'description', align: "left" },
    { name: 'section', label: 'Seccion', field: 'section', align: "left" },
    { name: 'family', label: 'Familia', field: 'family', align: "left" },
    { name: 'category', label: 'Categoria', field: 'category', align: "left" },
    { name: 'stocks', label: 'Stock (pzs)', field: row => row.stocks.reduce((am, s) => am + (s.pivot.stock), 0), sortable: true, classes: row => row.stocks.reduce((am, s) => am + (s.pivot.stock), 0) <= 0 ? 'text-red text-bold' : 'text-bold text-primary', align: 'center', coldesc: "Stock total en almacenes GENERALES (CEDIS+PAN)" },
  ],
  filter: '',
  pagination: {
    sortBy: 'locs',
    descending: false,
    rowsPerPage: 10
  }
});
const wndCounter = ref({
  state: false,
  item: null,
  form: { count: 0, ipack: null, setting: false }
});
const supply = ref({
  val: null,
  opts: null
})
const order = ref([])

const adminErrRequest = ref({ state: false, code: null, text: null });
const wndNextState = ref({ state: false });
const basketsupply = computed(() => productsdb.value)
const enabledEditor = computed(() => order.value ? order.value._status == 5 : false);
const totalpieces = computed(() => basketsupply.value.reduce((am, p) => (am + (p.pivot._supply_by == 3 ? (p.pivot.amount * p.pieces) : p.pivot.amount)), 0));
const uncounteds = computed(() => basketsupply.value.filter(p => !p.pivot.checkout));
const counteds = computed(() => basketsupply.value.filter(p => p.pivot.checkout));
const soldout = computed(() => counteds.value.filter(p => p.pivot.toDelivered == 0));
const wstock = computed(() => counteds.value.filter(p => p.pivot.toDelivered > 0));
const basket = computed(() => {
  let target = finder.value.toUpperCase().trim();
  return target.length ? uncounteds.value.filter(p => (p.code.match(target) || (p.barcode && p.barcode.match(target)) || p.variants.some(e => e.barcode.toUpperCase().includes(target)))) : uncounteds.value;
});
const basketCheck = computed(() => {
  let target = finder.value.toUpperCase().trim();
  return target.length ? counteds.value.filter(p => (p.code.match(target) || (p.barcode && p.barcode.match(target)) || p.variants.some(e => e.barcode.toUpperCase().includes(target)))) : counteds.value;
});


const init = async () => {
  $restockStore.setShowLYT(false)
  $q.loading.show({ message: "Cargando..." });
  // console.log("Iniciando...");
  // console.log($restockStore.partitions.find(e => e.id == $route.params.chk));
  const response = await RestockApi.partition($route.params.chk);
  console.log(response);
  if (response.status == 200) {
    productsdb.value = response.data.order.products;
    ostate.value = response.data.order.status;
    order.value = response.data.order
    // console.log(order.value);
    $q.loading.hide();
  } else { displayErrRequest(response); }
}


const rowClicked = (a, row, b) => enabledEditor.value ? openEditor(row) : null;

const openEditor = (item) => {
  console.log(item);
  wndCounter.value.item = item;
  wndCounter.value.form.count = typeof item.pivot.toDelivered == "number" ? item.pivot.toDelivered : 0;
  wndCounter.value.form.ipack = typeof item.pivot.ipack == "number" ? item.pivot.ipack : item.pieces;
  wndCounter.value.state = true;

  nextTick(() => {
    iptcounter.value.focus();
    iptcounter.value.select();
  });
}

const searchToSet = () => {
  let target = finder.value.toUpperCase().trim();
  if (target.length) {
    let item = basket.value.length == 1 ? basket.value[0] : basket.value.find(p => (p.code == target || p.barcode == target || p.variants.some(e => e.barcode.toUpperCase().includes(target))));
    if (item) { openEditor(item); } else {
      $q.notify({
        message: `Sin coincidencias para <b>${target}</b>`,
        color: "pink-5", position: "center", html: true
      });
    }
  }
}

const setDeliveryProduct = async () => {
  const toDelivery = parseInt(wndCounter.value.form.count);
  const ipack = parseInt(wndCounter.value.form.ipack);
  const data = {
    "order": $route.params.chk,
    "product": wndCounter.value.item.id,
    "delivery": toDelivery,
    "ipack": ipack,
    "checkout": true
  }
  console.log(data)
  const response = await RestockApi.setDeliveryProduct(data);
  console.log(response);

  if (response.status == 200) {
    console.log(response.data);
    let idx = productsdb.value.findIndex(p => p.id == wndCounter.value.item.id);
    productsdb.value[idx].pivot.toDelivered = toDelivery;
    productsdb.value[idx].pivot.ipack = ipack;
    productsdb.value[idx].pivot.checkout = 1;
    wndCounter.value.state = false;
    finder.value = "";
    $q.notify({ color: "positive", icon: "done", position: "right", message: "" });
  } else { alert(`Error ${response.status}: ${response.data}`); }
}

const nextState = async () => {
  $sktRestock.emit("blockButton", order.value);
  $q.loading.show({ message: "Terminando, espera..." });
  console.log(order.value.requisition._workpoint_from)
  wndNextState.value.state = false;
  // let data = { id: $route.params.chk, state: 6, suply: order.value._suplier_id }
  let data = {
    partition: $route.params.chk,
    verified: VDB.session.credentials.staff.id,
    warehouse: order.value._warehouse,
    state: 6
  }
  console.log(data);
  console.log("... por acasito");
  let resp = await RestockApi.SaveVerified(data)
  console.log(resp)
  if (resp.status == 200) {
    if (resp.data.partitionsEnd > resp.data.partition.requisition._status) {
      let nes = { id: resp.data.partition._requisition, state: resp.data.partitionsEnd };
      const nxt = await RestockApi.nextState(nes);
      $sktRestock.emit("order_refresh", { order: nxt.data });
      console.log(nxt.data);
    }
    order.value._status = resp.data.partition._status
    order.value.status.name = resp.data.partition.status.name
    const response = await RestockApi.partitionFresh(resp.data.partition.id);
    if (response.status == 200) {
      $sktRestock.emit("orderpartition_refresh", { order: response.data.order })
      if (order.value.requisition.from._type != 1) {
        // InvoicePdf.invoiceFormat(response.data.order)
        await createInvoiceFS(response.data.order)
        InvoicePdf.invoiceFormat(response.data.order)
      } else {
        // InvoicePdf.transferFormat(response.data.order)
        await createTransferFS(response.data.order)
        InvoicePdf.transferFormat(response.data.order)
      }
    } else { alert(`Error ${response.status}: ${response.data}`) };
  } else { console.log(resp) }
  // $q.loading.hide();
  $sktRestock.emit("unblockButton", order.value.requisition);
}


const createInvoiceFS = async (partition) => {
  $q.loading.show({ message: 'Realizando Salida' });
  const resp = await invApi.addInvoiceFS(partition);
  console.log(resp);
  if (resp.fail) {
    console.log(resp)
    if (resp.fail.status == 503) {
      $q.notify({ message: 'No hubo conexion a cedis, Intentarlo mas tarde', type: 'negative', position: 'bottom' });
      $router.push('/distribute/checkout')
      $q.loading.hide();
    } else {
      console.log(resp);
      alert(resp)
    }
  } else {
    $q.notify({ message: `Salida Creada ${resp.invoice}`, type: 'positive', position: 'bottom' })
    $sktRestock.emit("orderpartition_refresh", { order: resp })
    $router.push('/distribute/checkout')
    $q.loading.hide();
  }
}

const createTransferFS = async (partition) => {
  $q.loading.show({ message: 'Realizando Salida' });
  const resp = await invApi.addTransferFS(partition);
  if (resp.fail) {
    if (resp.fail.status == 503) {
      $q.notify({ message: 'No hubo conexion a cedis, Intentarlo mas tarde', type: 'negative', position: 'bottom' });
      $router.push('/distribute/checkout')
      $q.loading.hide();
    } else {
      console.log(resp);
      alert(resp)
    }
  } else {
    $q.notify({ message: `Traspaso Creado ${resp.invoice}`, type: 'positive', position: 'bottom' })
    $sktRestock.emit("orderpartition_refresh", { order: resp })
    $router.push('/distribute/checkout')
    $q.loading.hide();
  }
}

const lockPartition = async () => {
  const resp = await RestockApi.lockPartition($route.params.chk)
  console.log(resp);
   $sktRestock.emit('ChangeStatus', { id: $route.params.chk, status: 1 })
}


const unlockPartition = async () => {
  const resp = await RestockApi.unlockPartition(order.value.id)
  console.log(resp);
   $sktRestock.emit('ChangeStatus', { id: $route.params.chk, status: 0 })
}
init();


onMounted(() => {
  lockPartition()
  const handleUnload = () => {
    const url = `http://192.168.10.189:1920/assist/public/api/restock/partitions/${$route.params.chk}/unlock`
    // const url = `http://192.168.10.160:1920/Assist/public/api/restock/partitions/${order.value.id}/unlock`

    navigator.sendBeacon(url)
  }
  window.addEventListener('beforeunload', handleUnload)
  window._handleUnload = handleUnload
})

onBeforeRouteLeave(async (to, from, next) => {
  await unlockPartition()
  window.removeEventListener('beforeunload', window._handleUnload)
  next()
})

onUnmounted(async () => {
  await unlockPartition()
  window.removeEventListener('beforeunload', window._handleUnload)
})



</script>
