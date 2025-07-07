<template>
  <q-card class="full-width">
    <q-card-section class="row justify-between">
      <div>
        <div class="text-overline text-grey-7">Sucursal</div>
        <div class="text-h6">{{ head.from.alias }}</div>
      </div>
      <div class="q-px-lg text-center">
        <div class="text-overline text-grey-7">Folio</div>
        <div class="text-h6">{{ head.id }}</div>
      </div>
      <div class="text-right">
        <div class="text-overline text-grey-7">Agente</div>
        <div class="text-h6">{{ head.created_by.nick }}</div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="row justify-between">
      <div class="text-center col">
        <div class="text-overline text-grey-7">Fecha</div>
        <div class="text-h6">{{ dayjs(head.updated_at).format("YYYY-MM-DD") }}</div>
      </div>
      <div v-if="head.notes" class="text-center col">
        <div class="text-overline text-grey-7 col">Notas</div>
        <div class="text-h6">{{ head.notes }}</div>
      </div>

      <div class="col row">
        <q-btn size="md" class="col" color="primary" icon="print" flat dense v-if="cstate && cstate.id >= 2">
          <q-menu class="bg-grey-1 text-indigo-10" style="min-width:250px;">
            <PrinterSelect @selected="printForSupply" :partition="false" />
          </q-menu>
        </q-btn>
        <q-separator spaced inset vertical dark />
        <div class="col" v-if="cstate && cstate.id == 2">
          <q-btn size="12px" class="full-width"  color="positive" icon="start" dense label="Iniciar" @click="selsupply" flat    />
          <q-separator spaced inset vertical dark />
          <q-btn size="12px" class="full-width"  color="negative" icon="close" dense label="Cancelar" @click="removePed" flat  />
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <template v-if="loading">
      <q-card-section class="text-center">
        <q-spinner-dots size="50px" color="purple" />
      </q-card-section>
    </template>
    <template v-else>
      <q-separator />
      <q-tabs v-model="tab" class="text-pink-5" dense no-caps>
        <q-tab name="log" label="Log" />
        <q-tab name="basket" label="Productos" />
        <q-tab name="supliers" label="Surtidores" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="log">
          <q-list>
            <q-item v-for="l in log" :key="l.id">
              <q-item-section avatar> {{ l.id }} </q-item-section>
              <q-item-section>{{ l.name }}</q-item-section>
              <q-item-section>{{ l.pivot.details.responsable }}</q-item-section>
              <q-item-section>de {{ dayjs(l.pivot.created_at).format("h:mm a") }} a {{
                dayjs(l.pivot.updated_at).format("h:mm a") }}</q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="basket">
          <template v-if="basket.length">
            <q-table row-key="id" flat :rows="basket" :columns="table.columns" :pagination="table.pagination"
              :filter="table.filter" :visible-columns="viewcols">
              <template v-slot:top>
                <div class="full-width row items-center">
                  <div class="col text-dark">
                    <span class="text-h6"> <q-btn color="pink-5" icon="sync" @click="init" round dense flat />
                      Productos: {{ basket.length }}</span>, <span class="text-bold">Piezas: {{ totalpieces }}</span>
                  </div>
                  <q-input dense v-model="table.filter" placeholder="Buscar" input-class="text-uppercase"
                    color="pink-5">
                    <template v-slot:append><q-icon name="search" /></template>
                  </q-input>
                  <q-separator spaced inset vertical dark />
                  <q-btn color="secondary" icon="fas fa-eye" no-caps flat>
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
          </template>
          <template v-else>
            <div class="text-center q-pa-lg text-h6 text-grey-7">Nada por aqui</div>
          </template>
        </q-tab-panel>

        <q-tab-panel name="supliers">
          <q-table :rows="partition" row-key="id" dense flat bordered grid hide-header>
            <template v-slot:item="props">
              <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
                <q-card flat bordered>
                  <q-card-section class="text-center">
                    Surtidor
                    <br>
                    <strong>{{ props.row._suplier }}</strong>
                    <q-separator spaced inset vertical dark />
                    <q-icon name="print" color="pink" size="sm" @click="partitionPrint(props.row)">
                      <q-menu class="bg-grey-1 text-indigo-10" style="min-width:250px;">
                        <PrinterSelect @selectedPartition="printForPartition" :partition="true" />
                      </q-menu>
                    </q-icon>
                    <br>
                    <div class="text-overline text-grey-7"> <q-badge color="primary" text-color="white"
                        :label="props.row.status.name" /></div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section class="flex justify-between">
                    <div v-if="head.from._type != 1">
                      <div>Salida</div>
                      <div>Entrada</div>
                    </div>
                    <div v-else>
                      <div>Traspaso</div>
                    </div>
                    <div>Herramientas</div>

                  </q-card-section>
                  <q-separator />
                  <q-card-section class="flex justify-between">
                    <div v-if="head.from._type != 1">
                      <div>{{ props.row.invoice }}</div>
                      <div>{{ props.row.invoice_received }}</div>
                    </div>
                    <div v-else>
                      <div>{{ props.row.invoice }}</div>
                    </div>

                    <div class="row">
                      <div class="col" v-if="props.row._status >= 6"> <q-btn color="pink" icon="list"
                          @click="createPDF(props.row)" flat /></div>
                    </div>

                  </q-card-section>
                </q-card>
              </div>
            </template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-card>


  <q-dialog v-model="viewSupply.state" persistent>
    <q-card style="width: 400px;">
      <q-card-section class="row items-center">
        <q-select dense v-model="supply.val" :options="supply.filter" label="SELECCIONA SURTIDOR"
          :option-label="i => i.staff.complete_name" filled multiple counter max-values="10"
          hint="Maximo 10 colaboradores" style="width: 100%" @filter="filterFn" input-debounce="0" use-input
          use-chips />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Continuar" color="primary" @click="startSupply" :disable="supply.val.length == 0" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="delsur" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="negative" text-color="white" />
        <div class="q-ml-sm text-bold">Estas a punto de cancelar el pedido </div>
        <div class="q-ml-sm text-bold"> {{ head.id }}</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat label="Cancel" color="positive" v-close-popup />
        <q-btn flat label="Confirmar" color="negative" @click="remove" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup>
import { ref, computed, onBeforeMount, nextTick } from 'vue';
import RestockApi from 'src/API/RestockApi.js';
import InvoicePdf from 'src/Pdf/Invoices/invoices.js';
// import AssitApi from 'src/api/AssistApi.js';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { useQuasar } from 'quasar';
import QRCode from 'qrcode';
import PrinterSelect from 'src/components/Restock/PrinterSelect.vue';
import { useRestockStore } from 'stores/Restock';
import { $sktRestock } from 'src/boot/socket';
// import genPdf from 'src/api/pdfCreate.js';

const $q = useQuasar();
const $restockStore = useRestockStore();
const $route = useRoute();

const $props = defineProps({
  head: { type: Object, default: {} }
});

const supply = ref({
  opts: [],
  val: [],
  filter: []
})
const chof = ref({
  opts: null,
  val: null,
  filter: null
})

const part = ref(null);
const selSupply = ref(null)


const $emit = defineEmits(['loaded', 'loading', 'fresh', 'chofiAssigned']);

const head = ref($props.head);
const order = ref(null);
const loading = ref(true);
const log = ref([]);
const tab = ref("supliers");
const cstate = ref(null);
const basket = ref([]);
const startingStep = ref(false);
const wndGenInvoice = ref({ state: false });
const wndQRCode = ref({ state: false, key: null });
const partition = ref(null);
const delsur = ref(false)
const viewSupply = ref({
  state: false
});
const invoice = ref(null);
const viewcols = ref([]);
const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: 'id', align: "left", coldesc: "Identificador del producto (MySQL)" },
    { name: 'code', label: 'Codigo', field: 'code', align: "left", coldesc: "Codigo principal del producto" },
    { name: 'assocs', label: 'Asociados', field: row => row.variants.length ? row.variants.map(p => p.barcode).join(', ') : null, align: "left", coldesc: "Codigos relacionados al codigo principal" },
    { name: 'bcode', label: 'Codigo de Barras', field: 'barcode', align: "center", coldesc: "Codigo de barras principal" },
    { name: 'locs', label: 'Ubicacion', field: row => row.locations.length ? row.locations.map(l => l.path).join(", ") : '--', align: "left", coldesc: "Ubicaciones en almacen general" },
    { name: 'stocks', label: 'Stock (pzs)', field: row => row.stocks.reduce((am, s) => am + (s.pivot.stock), 0), sortable: true, classes: row => row.stocks.reduce((am, s) => am + (s.pivot.stock), 0) <= 0 ? 'text-red text-bold' : 'text-bold text-primary', align: 'center', coldesc: "Stock total en almacenes GENERALES (CEDIS+PAN)" },
    { name: 'ipack', label: 'PxC', field: row => typeof row.pivot.ipack == "number" ? row.pivot.ipack : row.pieces, align: "center", coldesc: "Unidades x Embalaje" },
    { name: 'request', label: 'Solicitud', field: row => row.pivot.amount, align: "center", coldesc: "Embalaje solicitado" },
    { name: 'uspply', label: 'Unidad', field: row => row.units.id == 3 ? 'Cajas' : 'Piezas', align: 'left', coldesc: "Unidad de embalaje del producto" },
    { name: 'delivery', label: 'Salida (conteo)', field: row => row.pivot.toDelivered, align: 'center', coldesc: "Embalaje surtido", sortable: true },
    {
      name: 'reqinpzs',
      label: 'Piezas',
      field: row => row.pivot._supply_by == 3 ?
        ((typeof row.pivot.ipack == "number" ? row.pivot.ipack : row.pieces) * (typeof row.pivot.ipack == "number" ? row.pivot.toDelivered : row.pivot.amount)) :
        (typeof row.pivot.ipack == "number" ? row.pivot.toDelivered : row.pivot.amount),
      align: 'center',
      coldesc: "Unidades totales en embalaje"
    },
    { name: 'checkout', label: 'Checkout', 'field': row => row.pivot.checkout ? 'OK' : '---', align: "center", classes: row => row.pivot.checkout ? 'text-positive text-bold' : 'text-red', sortable: true, coldesc: "Revision del Administrador" },
    { name: 'received', label: 'Entrada (conteo)', field: row => row.pivot.toReceived, align: "center", coldesc: "Embalaje recibido" },
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

const totalpieces = computed(() => basket.value.reduce((am, p) => (am + (p.pivot._supply_by == 3 ? (p.pivot.amount * p.pieces) : p.pivot.amount)), 0));
const showBtnNextState = computed(() => cstate.value && (cstate.value.id == 2 || cstate.value.id == 6));
const logstate = computed(() => log.value.find(l => l.id == cstate.value.id).pivot);
const enableInvoice = computed(() => partition.value.map(e => e._status).includes(6))


const init = async () => {
  $emit("loading"); // blockea la venta modal del padre que contiene eeste componente
  console.log(head.value.id)
  loading.value = true;
  let response = await RestockApi.order(head.value.id)
  console.log(response.data);
  basket.value = response.data.products;
  log.value = response.data.log.map(l => { l.pivot.details = JSON.parse(l.pivot.details); return l; });
  partition.value = response.data.partition
  cstate.value = response.data.status;
  order.value = response.data
  // wndQRCode.value.key = response.data.entry_key;
  invoice.value = response.data.invoice;
  // if (cstate.value.id == 2) {
  //   console.log(order.value.to.id);
  //   let supp = await RestockApi.getSupply(order.value.to.id);
  //   console.log(supp);
  supply.value.opts = $restockStore.users
  // }
  loading.value = false;
  $emit("loaded"); // desblockea la venta modal del padre que contiene eeste componente
}

const selsupply = () => {
  viewSupply.value.state = true;
}

const removePed = () => {
  delsur.value = true
}

const startSupply = async () => {
  $q.loading.show({ message: 'Cambiando Estado' })
  console.log("Iniciando surtido");
  $emit("loading"); // blockea la venta modal del padre que contiene eeste componente
  startingStep.value = true;
  let newState = 3;
  let data = { id: head.value.id, state: newState };
  const response = await RestockApi.nextState(data);
  if (response.status == 200) {
    startingStep.value = false;
    $q.notify({ message: `Surtido iniciado para el pedido  ${head.value.id}`, icon: "done", position: "center", color: "teal" });
    let dat = {
      supplyer: supply.value.val,
      pedido: head.value.id,
      status: newState,
      _workpoint_to: head.value.to.id,
      _workpoint_from: head.value.from.id,
    }
    console.log(dat)
    let savesupply = await RestockApi.SaveSupply(dat);
    console.log(savesupply)
    if (savesupply.fail) {
      console.log(savesupply)
      alert(`Error ${savesupply.status}: ${savesupply.data} 2`);
    } else {
      savesupply.forEach(e => {
        $sktRestock.emit('partitionCreate', e)
      });
      $q.loading.hide()
      init();
      $emit("fresh", order.value);
      viewSupply.value.state = false;
    }
  } else {
    console.log(response)
    alert(`Error ${response.status}: ${response.data} 1`);
  }

  $emit("loaded"); // desblockea la venta modal del padre que contiene eeste componente
}

const tryGenInvoice = async () => {
  console.log("Generando factura");
  $q.loading.show({ message: "Cambiando, espera..." });
  let dat = {
    chofi: chof.value.val,
    supplyer: selSupply.value._suplier_id,
    pedido: head.value.id,
    status: 7
  }
  let savesupply = await AssitApi.SaveChofi(dat);
  console.log("%cDELIVERY ASSIGNED", "color:white; background:#b71540; font-size:1.3em;");
  console.log(savesupply);

  if (savesupply.status == 200) {
    let data = { id: head.value.id, state: 7, suply: selSupply.value._suplier_id }
    console.log(data);
    let resp = await AssitApi.nextState(data);
    console.log("%cState Changed on Assist", "color:white; background:#0a3d62; font-size:1.2em;");
    console.log(resp)
    if (resp.data.partitionsEnd > order.value._status) {
      console.log("%cTodas las particiones se han finalizado", "color:white; background:#eb2f06; font-size:1.3em;");
      let nes = { id: head.value.id, state: resp.data.partitionsEnd };
      console.log(nes)
      const nxt = await RestockApi.nextState(nes);
      console.log("%cState Changed on RestockAPI", "color:white; background:#079992; font-size:1.3em;");
      console.log(nxt);
    }

    $emit("chofiAssigned", data.id);

    if (resp.status == 200) {
      init();
      let id = resp.data.partition.id
      let inx = partition.value.findIndex(e => e.id == id)
      partition.value[inx]._status = resp.data.partition._status
      partition.value[inx].invoice = resp.data.partition.invoice
    }

    $q.notify({
      message: `Pedido en ruta`,
      position: "center", icon: "done", timeout: 5000, color: "positive"
    });
    wndGenInvoice.value.state = false
  } else { alert(`Error ${savesupply.status}: ${savesupply.data}`); }

  $q.loading.hide();
}

const genQRKey = async (data) => {
  // let url = `http://192.168.10.189:2200/#/checkin/${head.value.id}?key=${data}`;
  let url = `http://192.168.10.207:1308/#/checkin/${head.value.id}?key=${data}`;

  wndQRCode.value.state = true;
  nextTick(() => QRCode.toCanvas(document.getElementById('qrcode'), url));
}

const printKey = async (data) => {
  $q.loading.show({ message: "..." });
  console.log(data);
  const response = await RestockApi.printKey({ ip: data.ip, port: data._port, order: head.value.id });
  if (response.status == 200) {
    let resp = response.data;
    $q.loading.hide();
    $q.notify({ message: "Impresion correcta", icon: "done", color: "positive", position: "top" });
  } else { console.error(response); alert(`Error ${response.status}: ${response.data}`); }
}

const printForSupply = async data => {
  $q.loading.show({ message: "..." });
  console.log(data);
  const response = await RestockApi.printForSupply({ ip: data.ip, port: data._port, order: head.value.id });
  console.log(response);
  if (response.status == 200) {
    let resp = response.data;
    if (resp) {
      $q.notify({ message: "Impresion correcta", icon: "done", color: "positive", position: "top" });
    } else {
      $q.notify({ message: `Sin conexion a <b>${data.name} <small>(${data.ip})</small></b>`, icon: "fas fa-bug", color: "negative", position: "center", html: true, timeout: 4000 });
    }
    $q.loading.hide();
  } else { console.error(response); alert(`Error ${response.status}: ${response.data}`); }
}

const printForPartition = async data => {
  $q.loading.show({ message: "..." });
  console.log(data.ip);
  console.log(part.value)
  const resp = await RestockApi.printForPartition({ ip: data.ip, port: data._port, _partition: part.value, _workpoint_to: head.value._workpoint_to });
  console.log(resp);
  if (resp.status == 200) {
    let responding = resp.data;
    if (responding) {
      $q.notify({ message: "Impresion correcta", icon: "done", color: "positive", position: "top" });
    } else {
      $q.notify({ message: `Sin conexion a <b>${data.name} <small>(${data.ip})</small></b>`, icon: "fas fa-bug", color: "negative", position: "center", html: true, timeout: 4000 });
    }
    $q.loading.hide();
  } else { console.error(resp); alert(`Error ${resp.status}: ${resp.data}`); }
}

const genvoice = async (row) => {
  selSupply.value = row
  wndGenInvoice.value.state = true
  let ch = await AssitApi.getSupply(order.value.to.id);
  console.log(ch);
  chof.value.opts = ch
}

const filterFn = (val, update, abort) => {
  update(() => {
    if (val === '') {
      supply.value.filter = supply.value.opts
    } else {
      const needle = val.toLowerCase()
      supply.value.filter = supply.value.opts.filter(v => v.complete_name.toLowerCase().indexOf(needle) > -1)
    }

  })
}

const filterCH = (val, update, abort) => {
  update(() => {
    if (val === '') {
      chof.value.filter = chof.value.opts
    } else {
      const needle = val.toLowerCase()
      chof.value.filter = chof.value.opts.filter(v => v.complete_name.toLowerCase().indexOf(needle) > -1)
    }

  })
}

const remove = async () => {
  console.log("Eliminando Pedido");
  $emit("loading"); // blockea la venta modal del padre que contiene eeste componente
  let newState = 100;
  let data = { id: head.value.id, state: newState };
  const response = await RestockApi.nextState(data);
  if (response.status == 200) {
    delsur.value = false;
    $q.notify({ message: `Surtido Cancelado para el pedido  ${head.value.id}`, icon: "close", position: "center", color: "negative" });
    // init();
    $emit("fresh", order.value, true);
  } else { alert(`Error ${response.status}: ${response.data} 1`); }

  $emit("loaded"); // desblockea la venta modal del padre que contiene eeste componente
}
const partitionPrint = (row) => {
  console.log(row.id)
  part.value = row.id
}

const createPDF = async (row) => {
  console.log(row)
  const response = await RestockApi.partitionFresh(row.id);
  console.log(response);
  if (response.status == 200) {
    if (response.data.order.requisition.from._type != 1) {
      InvoicePdf.invoiceFormat(response.data.order)
    } else {
      InvoicePdf.transferFormat(response.data.order)
    }
  }
}


onBeforeMount(() => viewcols.value = table.value.columns.map(c => c.name));
init();
</script>
