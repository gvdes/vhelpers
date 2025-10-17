<template>
  <q-page>
    <div class="bg-cyan-10 text-white">
      <q-toolbar>
        <q-toolbar-title>
          Pedido {{ $route.params.chk }} <span class="text--3" v-if="order">- {{ order.requisition.from.alias
            }}</span>
        </q-toolbar-title>
        <div class="text-bold text-h6">Diferencias : {{ diff }}</div>
        <div v-if="order?.invoice_received" class="text-white">
          <div>{{ order.requisition.from._type == 1 ? 'Traspaso' : 'Entrada' }}</div>
          <div class="text-bold">{{ order.invoice_received }}</div>
        </div>

      </q-toolbar>
      <q-separator />
      <div class="q-px-md q-py-sm">
        <div class="col text-white row justify-between ">
          <div>Productos: <b>{{ productsdb.length }}</b></div>
          <div>Piezas: <b>{{ totalpieces }}</b> </div>
        </div>
        <div class="row items-center justify-between q-pt-sm" v-if="ostate && ostate.id >= 5">
          <div><span class="text--2">Contados:</span> <b>{{ counteds.length }}</b></div>
          <div><span class="text--2">Por contar:</span> <b>{{ uncounteds.length }}</b></div>
        </div>
      </div>
    </div>
    <q-table row-key="id" :rows="basket" :columns="table.columns" :pagination="table.pagination" :filter="table.filter"
      :visible-columns="viewcols" @row-click="rowClicked">
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

        <q-card-section class="row justify-around items-center bg-grey-2">
          <div v-for="stock in wndCounter.item.stocks" :key="stock.id" class="text-center">
            <div class="text-h6">{{ stock.pivot.gen }}</div>
            <div class="text--2">{{ stock.alias }}</div>
          </div>
        </q-card-section>

        <q-form @submit.prevent="setReceivedProduct">
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

              <div class="text-center col text-orange-10">
                <div>Salida</div>
                {{ wndCounter.item.pivot.toDelivered }}
                <div class="text-bold">{{ wndCounter.item.pivot.toDelivered }} {{ wndCounter.item.pivot._supply_by
                  == 3 ?
                  `Caja${wndCounter.item.pivot.amount != 1 ? 's' : ''}` : wndCounter.item.pivot._supply_by == 2 ?
                    `Docena${wndCounter.item.pivot.amount != 1 ? 's' : ''}` :
                    `Pieza${wndCounter.item.pivot.amount != 1 ? 's' : ''}` }} <small>({{
                    (wndCounter.item.pivot._supply_by == 3 ?
                      (wndCounter.item.pivot.toDelivered * wndCounter.item.pivot.ipack) :
                      wndCounter.item.pivot.toDelivered) }}
                    pzs)</small></div>
              </div>

              <div class="text-center col">
                <div>PxC</div>
                <div class="text-bold">{{ wndCounter.item.pivot.ipack }}</div>
              </div>

              <div class="text-center col">
                <div>Conteo</div>
                <q-input dense borderless v-model="wndCounter.form.count" type="number" min="0"
                  input-class="text-h6 text-center" ref="iptcounter" />
              </div>

              <div class="text-center col">
                <div>Piezas</div>
                <div class="text-bold">{{ wndCounter.item.pivot._supply_by == 3 ?
                  (wndCounter.form.count * wndCounter.form.ipack) : wndCounter.item.pivot._supply_by == 2 ?
                    (wndCounter.form.count * 12) : wndCounter.form.count }}</div>
              </div>
            </div>
          </q-card-section>

          <q-btn color="indigo" type="submit" square icon="done" no-caps class="q-mt-md q-py-md full-width" />
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="wndNextState.state">
      <q-card>
        <q-card-section class="row items-start">
          <q-avatar icon="warning" color="orange-14" text-color="white" />
          <div class="q-ml-md">
            <div class="text-h6">Quieres finalizar la revision?</div>
            <div>EL pedido ya no podra editarse y se emitira una entrada...</div>
            <div class="text-bold text-center text-h6">Diferencias: {{ diff }}</div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup no-caps />
          <q-btn flat label="Si" color="primary" @click="tryGenEntry" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-footer bordered class="bg-indigo-10 text-dark q-pa-sm row" elevated v-if="enabledEditor">
      <q-input color="white" v-model="finder" type="text" class="col"
        input-class="text-white text-h6 text-center text-uppercase" autofocus dense @keypress.enter="searchToSet"
        ref="iptfinder">
        <template v-slot:prepend>
          <q-icon name="fas fa-barcode" color="white" />
        </template>
        <template v-slot:append>
          <q-btn flat icon="fas fa-eraser" color="white" dense @click="finder = ''" :disabled="!finder.length" />
        </template>
      </q-input>
      <q-btn color="white" text-color="indigo-10" label="Finalizar" icon="done" @click="wndNextState.state = true"
        v-if="counteds.length > 0" no-caps />
    </q-footer>
    <q-footer v-if="ostate && ostate.id != 9" bordered class="bg-orange-9 text-white">
      <div class="q-pa-md text-bold text-uppercase text-center">{{ ostate.name }}</div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import RestockApi from 'src/API/RestockApi.js';
import invApi from 'src/API/invoicesApi.js';
import { $sktRestock } from 'boot/socket';
import { useRestockStore } from 'stores/Restock';
// import OrderCheckinComp from 'src/components/Restock/OrderCheckin.vue';
import { useVDBStore } from 'stores/VDB';
const VDB = useVDBStore()
const $q = useQuasar();
const $restockStore = useRestockStore();
const $route = useRoute();
const $router = useRouter();
const order = ref(null);

const wndNextState = ref({ state: false });
const finder = ref("");
const iptfinder = ref(null);
const iptcounter = ref(null);
const viewcols = ref(["code", "request", "ipack", "uspply", "delivery", "checkout", "received", "reqinpzs"]);
const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: 'id', align: "left", coldesc: "Identificador del producto (MySQL)" },
    { name: 'code', label: 'Codigo', field: 'code', align: "left", coldesc: "Codigo principal del producto", },
    { name: 'assocs', label: 'Asociados', field: row => row.variants.length ? row.variants.map(p => p.barcode).join(', ') : null, align: "left", coldesc: "Codigos relacionados al codigo principal" },
    { name: 'bcode', label: 'Codigo de Barras', field: 'barcode', align: "center", coldesc: "Codigo de barras principal" },
    // { name:'locs', label:'Ubicacion', field: row => row.locations.length ? row.locations.map( l => l.path ).join(", ") :'--', align:"left", coldesc:"Ubicaciones en almacen general" },
    { name: 'ipack', label: 'PxC', field: row => typeof row.pivot.ipack == "number" ? row.pivot.ipack : row.pieces, align: "center", coldesc: "Unidades x Embalaje" },
    { name: 'request', label: 'Solicitud', field: row => row.pivot.amount, align: "center", coldesc: "Embalaje solicitado" },
    { name: 'uspply', label: 'Unidad', field: row => row.pivot._supply_by == 3 ? 'Cajas' : row.pivot._supply_by == 2 ? 'Docenas' : 'Piezas', align: 'left', coldesc: "Unidad de embalaje del producto" },
    { name: 'delivery', label: 'Salida', field: row => row.pivot.toDelivered, align: 'center', coldesc: "Embalaje surtido", sortable: true },
    {
      name: 'reqinpzs',
      label: 'Piezas',
      field: row => row.pivot._supply_by == 3 ?
        ((typeof row.pivot.ipack == "number" ? row.pivot.ipack : row.pieces) * (typeof row.pivot.ipack == "number" ? row.pivot.toDelivered : row.pivot.amount)) : (typeof row.pivot.ipack == "number" ? row.pivot.toDelivered : row.pivot.amount),
      align: 'center',
      coldesc: "Unidades totales en embalaje"
    },
    { name: 'checkout', label: 'Checkout', 'field': row => row.pivot.checkout ? "OK" : null, classes: row => row.pivot.checkout ? "text-positive text-bold" : "", align: "center", coldesc: "Revision del Administrador", sortable: true },
    { name: 'received', label: 'Conteo', field: row => row.pivot.toReceived, align: 'center', coldesc: "Embalaje recepcion" },
    { name: 'descr', label: 'Descripcion', field: 'description', align: "left" },
    { name: 'section', label: 'Seccion', field: 'section', align: "left" },
    { name: 'family', label: 'Familia', field: 'family', align: "left" },
    { name: 'category', label: 'Categoria', field: 'category', align: "left" },
  ],
  filter: '',
  pagination: {
    sortBy: 'locs',
    descending: false,
    rowsPerPage: 20
  }
});
const wndCounter = ref({
  state: false,
  item: null,
  form: { count: 0, ipack: null, setting: false }
});

const productsdb = computed(() => order.value ? order.value.products.filter(e => e.pivot.checkout == 1) : []);
const ostate = computed(() => order.value ? order.value.status : null);
const enabledEditor = computed(() => ostate.value ? ostate.value.id == 9 : false);
const uncounteds = computed(() => productsdb.value.filter(p => typeof p.pivot.toReceived != "number"));
const counteds = computed(() => productsdb.value.filter(p => typeof p.pivot.toReceived == "number"));


const basket = computed(() => {
  let target = finder.value.toUpperCase().trim();
  return target.length ? productsdb.value.filter(p => (p.code.match(target) || (p.barcode && p.barcode.match(target)) || p.variants.some(e => e.barcode.toUpperCase().includes(target)))) : productsdb.value;
});
const totalpieces = computed(() => basket.value.reduce((am, p) => (am + (p.pivot._supply_by == 3 ? (p.pivot.amount * p.pieces) : p.pivot.amount)), 0));
const diff = computed(() => productsdb.value.reduce((am, p) => am + Number(p.pivot.toReceived !== p.pivot.toDelivered), 0))

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Informacion' });
  $restockStore.setShowLYT(false)
  const resp = await RestockApi.partitionFresh($route.params.chk)
  console.log(resp.data.order)
  if (resp.status == 200) {
    if (resp.data.order.requisition.from.id == VDB.session.store.id_viz) {
      if (resp.data.order._status == 9) {
        $q.loading.hide();
        order.value = resp.data.order
      } else if (resp.data.order._status > 9) {
        $q.loading.hide();
        order.value = resp.data.order
      } else if (resp.data.order._status == 7 || resp.data.order._status == 8) {
        await changeStatus();
      } else if (resp.data.order._status < 7) {
        order.value = resp.data.order
        $q.loading.hide();
      }
    } else {
      $router.push('/distribute/checkin')
      $q.notify({ message: 'No perteneces a la sucursal', type: 'negative', position: 'center' })
      $q.loading.hide();
    }
  } else {
    alert(`Error ${resp.status}: ${resp.response.data} `);
  }
}

const changeStatus = async () => {
  let data = {
    partition: $route.params.chk,
    verified: VDB.session.credentials.staff.id,
    state: 9,
    key: $route.query.key
  }
  console.log(data);
  let savesupply = await RestockApi.saveCheck(data);
  console.log(savesupply)
  if (savesupply.status == 200) {
    let inx = $restockStore.partitions.findIndex(e => e.id == savesupply.data.partition.id);
    if (inx >= 0) {
      $restockStore.partitions.splice(inx, 1, savesupply.data.partition)
      if (savesupply.data.partitionsEnd > savesupply.data.partition.requisition._status) {
        let nes = { id: savesupply.data.partition._requisition, state: savesupply.data.partitionsEnd };
        const nxt = await RestockApi.nextState(nes);
        $sktRestock.emit("order_refresh", { order: nxt.data });
        console.log(nxt.data);
      }
      $sktRestock.emit("orderpartition_refresh", { order: savesupply.data.partition })
    }
    $q.loading.hide();
    order.value = savesupply.data.partition
    $q.loading.hide();
  } else {
    if (savesupply.status == 401) {
      alert(savesupply.response.data.message);
      console.log(savesupply.response.data.message);
      $q.loading.hide();
    } else {
      alert(`Error ${savesupply.status}: ${savesupply.response.data} `);
    }
  }
}

const openEditor = (item) => {
  console.log(item);
  wndCounter.value.item = item;
  wndCounter.value.form.count = typeof item.pivot.toReceived == "number" ? item.pivot.toReceived : 0;
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

const setReceivedProduct = async () => {
  const toReceived = parseInt(wndCounter.value.form.count);
  const ipack = parseInt(wndCounter.value.form.ipack);

  const data = {
    // "order":$route.params.oid,
    "order": wndCounter.value.item.pivot._partition,
    "product": wndCounter.value.item.id,
    "received": toReceived,
    "ipack": ipack,
    "checkout": false
  }
  console.log(data);

  const response = await RestockApi.setReceiveProduct(data);
  console.log(response);

  if (response.status == 200) {
    let idx = productsdb.value.findIndex(p => p.id == wndCounter.value.item.id);
    productsdb.value[idx].pivot.toReceived = toReceived;
    productsdb.value[idx].pivot.ipack = ipack;
    wndCounter.value.state = false;
    finder.value = "";

    $q.notify({ color: "positive", icon: "done", position: "right", message: "" });

  } else { alert(`Error ${response.status}: ${response.data}`); }
}

const tryGenEntry = async () => {
  // $sktRestock.emit("blockButton", order.value);
  $q.loading.show({ message: "Terminando, espera..." });
  console.log(order.value.requisition._workpoint_from)
  wndNextState.value.state = false;
  let data = { id: $route.params.chk, state: 10, suply: order.value._suplier_id }
  console.log(data);
  console.log("... por acasito");
  let resp = await RestockApi.nextStatePartition(data)
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
      console.log(response.data)
      $sktRestock.emit("orderpartition_refresh", { order: response.data.order })
      let message = await diff.value > 0 ? RestockApi.sendMessageDiff(response.data.order) : '';
      if (order.value._warehouse == 'GEN') {
        let freshTransit = await RestockApi.refresTransit({ id: response.data.order.id });
        console.log(freshTransit)
      }
      console.log(message);
      if (order.value.requisition.from._type != 1) {
        // InvoicePdf.invoiceFormat(response.data.order)
        await createEntryFS(response.data.order)
      } else {
        // InvoicePdf.transferFormat(response.data.order)
        await createTransferFS(response.data.order)
      }
    } else { alert(`Error ${response.status}: ${response.data}`) };
  } else { console.log(resp) }
  $q.loading.hide();
  // $sktRestock.emit("unblockButton", order.value.requisition);
}

const createEntryFS = async (partition) => {
  $q.loading.show({ message: 'Realizando Salida' });
  const resp = await invApi.addEntryFS(partition);
  console.log(resp)
  if (resp.fail) {
    if (resp.fail.status == 503) {
      $q.notify({ message: 'No hubo conexion a cedis, Intentarlo mas tarde', type: 'negative', position: 'bottom' });
      $router.push('/distribute/checkin')
      // $q.loading.hide();
    } else {
      console.log(resp);
    }
  } else {
    $q.notify({ message: `Entrada Creada ${resp.invoice_received}`, type: 'positive', position: 'bottom' })
    // const para = await RestockApi.partitionFresh($route.params.chk)
    $sktRestock.emit("orderpartition_refresh", { order: resp })
    $router.push('/distribute/checkin')
    $q.loading.hide();
  }
}

const createTransferFS = async (partition) => {
  $q.loading.show({ message: 'Realizando Salida' });
  const resp = await invApi.endTransferFS(partition);
  if (resp.fail) {
    if (resp.fail.status == 503) {
      $q.notify({ message: 'No hubo conexion a cedis, Intentarlo mas tarde', type: 'negative', position: 'bottom' });
      $router.push('/distribute/checkout')
      // $q.loading.hide();
    } else {
      console.log(resp);
    }
  } else {
    $q.notify({ message: `Traspaso Creado ${resp.invoice_received}`, type: 'positive', position: 'bottom' })
    // const para = await RestockApi.partitionFresh($route.params.chk)
    $sktRestock.emit("orderpartition_refresh", { order: resp })
    $router.push('/distribute/checkout')
    $q.loading.hide();
  }
}

const rowClicked = (a, row, b) => enabledEditor.value ? openEditor(row) : null;

onMounted(async () => {
  if (window.layoutReady) {
    await init(); // si ya estaba listo
  } else {
    window.addEventListener('layout-ready', async () => {
      await init(); // si apenas va a estar listo
    }, { once: true });
  }
});
</script>
