<template>
  <q-page padding v-if="invoice">
    <q-toolbar class="bg-primary text-white">

      <q-btn flat round dense icon="arrow_back " @click="$router.push('/distribute/invoice')" />
      <!-- <q-btn flat round dense icon="assignment_ind" /> -->
      <q-toolbar-title class="row">
        <div class="col">Origen : {{ invoice.to.name }}</div>
        <div class="col">Destino : {{ invoice.from.name }}</div>
        <div class="col text-right">{{ invoice.created_by.nick }}</div>
      </q-toolbar-title>
      <q-btn flat round dense icon="download" class="q-mr-xs" />
      <q-btn flat round dense icon="upload" />
    </q-toolbar>
    <q-separator spaced inset vertical dark />

    <q-table v-if="products.length > 0" :rows="products" hide-bottom :columns="table.columns"
      :pagination="table.pagination" @row-click="mosEditProduct" />

    <q-footer reveal elevated bordered>
      <q-separator spaced inset vertical dark />
      <div class="row q-ml-sm">
        <q-card class="col">
          <ProductAutocomplete :checkState="false" @input="add" with_prices_Invoice with_stock @agregar="agregar"
            with_locations />
        </q-card>
        <q-separator spaced inset vertical dark />
        <div>
          <q-btn flat icon="send" @click="sendInvoice" v-if="products.length > 0" />
        </div>
      </div>
      <q-separator spaced inset vertical dark />
    </q-footer>
  </q-page>

  <q-dialog v-model="product.state" position="bottom">
    <q-card v-if="product.val">
      <q-card-section class="bg-grey-3">
        <div class="row justify-between">
          <div class="text-left">
            <div class="text--3">ID: {{ product.val.id }}</div>
            <div class="text-h6">{{ product.val.code }}</div>
          </div>
          <div class="text-right">
            <div class="text-bold">{{ product.val.name }}</div>
            <div class="text--2">{{ product.val.barcode }}</div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>{{ product.val.description }}</q-card-section>
      <q-card-section class="row justify-around items-center">
        <div class="text-center">
          <div class="text-h6">{{ product.val.pieces }}</div>
          <div class="text--2">PxC</div>
        </div>
        <div v-for="stock in product.val.stocks" :key="stock.id" class="text-center">
          <div class="text-h6">{{ stock.pivot.gen }}</div>
          <div class="text--2">{{ stock.alias }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row items-start justify-between">
          <div class="text-center col text-primary">
            <q-select v-model="unitMeasure.val" :options="unitMeasure.opts" label="Unidad Medida" filled dense />
          </div>
          <div class="text-center col">
            <div>Conteo</div>
            <q-input dense borderless v-model="product.val.pivot.toDelivered" type="number" min="0"
              input-class="text-h6 text-center" ref="iptcounter" />
          </div>
          <div class="text-center col">
            <div>PxC</div>
            <q-input dense borderless v-model="product.val.pivot.ipack" type="number" input-class="text-h6 text-center"
              :disable="unitMeasure.val.id != 3" />
          </div>
          <div class="text-center col">
            <div>Piezas</div>
            <div class="text-bold">{{ units }}</div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn flat icon="close" @click="reset" />
        <q-space />
        <q-btn flat icon="add" color="positive" v-if="!product.edit" @click="addProduct" />
        <q-btn flat icon="delete" color="negative" v-if="product.edit" @click="deleteProduct" />
        <q-btn flat icon="edit" color="warning" v-if="product.edit" @click="editProduct" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import InvoicePdf from 'src/Pdf/Invoices/invoices.js';
import CashApi from "src/API/cashApi";
import { exportFile, useQuasar, date } from 'quasar';
import dayjs from 'dayjs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { $sktRestock } from 'boot/socket';
import { computed, ref } from 'vue';
import invApi from 'src/API/invoicesApi.js';
import Checkout from './checkout.vue';
import Invoice from './invoice.vue';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const invoice = ref(null);
const products = ref([]);
const unitMeasure = ref({
  val: { id: 1, label: 'Pieza' },
  opts: [
    { id: 1, label: 'Pieza' },
    { id: 2, label: 'Docena' },
    { id: 3, label: 'Caja' },
  ]
})
const product = ref({
  state: false,
  val: null,
  edit: false
})
const pivot = ref({
  'toDelivered': 1,
  '_supply_by': 1,
  'units': 1,
  'cost': 0,
  'total': 0,
  'comments': "",
  'stock': 0,
  'ipack': 0
})

const table = ref({
  pagination: { rowsPerPage: 0 },
  columns: [
    { name: 'code', label: 'CODIGO', field: r => r.code, align: 'left' },
    { name: 'description', label: 'DESCRIPCION', field: r => r.description, align: 'left' },
    { name: 'amount_delivered', label: 'CANTIDAD', field: r => r.pivot.units, align: 'center' },
  ]
})


const units = computed(() => unitMeasure.value.val?.id == 3 ?
  (product.value.val.pivot.toDelivered * product.value.val.pivot.ipack) : unitMeasure.value.val?.id == 2 ?
    (product.value.val.pivot.toDelivered * 12) : product.value.val.pivot.toDelivered)

const init = async () => {
  $q.loading.show({ message: 'Obeteniendo Datos' });
  const resp = await invApi.getInvoice($route.params.inv);
  if (resp.fail) {
    if (resp.fail.status == 401) {
      $router.push('/distribute/invoice')
      $q.notify({ message: 'La factura ya se realizo', type: 'negative', position: 'center' });
      $q.loading.hide();

    } else if (resp.fail.status = 404) {
      $router.push('/distribute/invoice')
      $q.notify({ message: 'No existe la Factura', type: 'negative', position: 'center' });
      $q.loading.hide();
    } else {
      console.log(resp)
    }

  } else {
    console.log(resp);
    invoice.value = resp;
    products.value = resp.products
    $q.loading.hide();
  }
}

const add = (opt) => {
  console.log(opt)
  let inx = products.value.findIndex(e => e.id == opt.id)
  console.log(inx);
  if (inx >= 0) {
    product.value.val = products.value[inx]
    console.log(product.value.val)
    unitMeasure.value.val = unitMeasure.value.opts.find(e => e.id == product.value.val.pivot._supply_by)
    console.log(unitMeasure.value)
    product.value.state = true
    product.value.edit = true
  } else {
    product.value.val = opt
    product.value.val.pivot = pivot.value;
    product.value.val.pivot.ipack = opt.pieces
    product.value.state = true
  }
}

const agregar = (ops) => {
  console.log(ops)
  let inx = products.value.findIndex(e => e.id == ops.id)
  console.log(inx);
  if (inx >= 0) {
    product.value.val = products.value[inx]
    console.log(product.value.val)
    unitMeasure.value.val = unitMeasure.value.opts.find(e => e.id == product.value.val.pivot._supply_by)
    console.log(unitMeasure.value)
    product.value.state = true
    product.value.edit = true
  } else {
    product.value.val = ops
    product.value.val.pivot = pivot.value;
    product.value.val.pivot.ipack = ops.pieces
    product.value.state = true
  }
}

const sendInvoice = async () => {
  $q.loading.show({ message: 'Creando Factura' })
  console.log(invoice.value)
  const resp = await invApi.changestate(invoice.value);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $sktRestock.emit('order_refresh',  {order: resp.requisitiion} )
    $sktRestock.emit('orderpartition_refresh',  {order:resp.partition} )
    InvoicePdf.invoiceFormat(resp.partition)
    createFS(resp.partition)
  }
}

const createFS = async (partition) => {
  const resp = await invApi.addInvoiceFS(partition);
  if (resp.fail) {
    if (resp.fail.status == 503) {
      $q.notify({ message: 'No hubo conexion a cedis, Intentarlo mas tarde', type: 'negative', position: 'bottom' });
      $router.push('/distribute/invoice')
      $q.loading.hide();

    } else {
      console.log(resp);
    }
  } else {
    $q.notify({ message: `Salida Creada ${resp}`, type: 'positive', position: 'bottom' })
    $router.push('/distribute/invoice')
    $q.loading.hide();
    // $q.notify({message:'Factura Realizada',type:'positive',position:'center'});
  }
}

const reset = () => {
  product.value = {
    state: false,
    val: null,
    edit: false
  }
}
const addProduct = async () => {
  $q.loading.show({ message: 'Insertando Producto' })
  let data = {
    _requisition: $route.params.inv,
    _product: product.value.val.id,
    units: units.value,
    comments: '',
    stock: product.value.val.stocks.find(e => e.id == 1).pivot.gen,
    amount: 0,
    cost: product.value.val.cost,
    total: product.value.val.cost * units.value,
    _supply_by: unitMeasure.value.val.id,
    toDelivered: product.value.val.pivot.toDelivered,
    checkout: 1,
    ipack: product.value.val.pivot.ipack,
    _suplier: invoice.value.partition[0]._suplier,
    _suplier_id: invoice.value.partition[0]._suplier_id,
    _partition: invoice.value.partition[0].id
  }
  const resp = await invApi.addProduct(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.loading.hide();
    products.value.push(resp)
  }
  reset()
}

const deleteProduct = async () => {
  $q.loading.show({ message: 'Eliminando Producto' })
  console.log(product.value)
  let data = {
    _requisition: $route.params.inv,
    _product: product.value.val.id,
  }
  console.log(data);
  const resp = await invApi.deleteProduct(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide();
    let inx = products.value.findIndex(e => e.id == data._product);
    products.value.splice(inx, 1);
  }
  reset()
}

const editProduct = async () => {
  $q.loading.show({ message: 'Editando Producto' })
  console.log(product.value)
  let data = {
    _requisition: $route.params.inv,
    _product: product.value.val.id,
    units: units.value,
    comments: '',
    stock: product.value.val.stocks.find(e => e.id == 1).pivot.gen,
    amount: 0,
    cost: product.value.val.cost,
    total: product.value.val.cost * units.value,
    _supply_by: unitMeasure.value.val.id,
    toDelivered: product.value.val.pivot.toDelivered,
    checkout: 1,
    ipack: product.value.val.pivot.ipack,
    _suplier: invoice.value.partition[0]._suplier,
    _suplier_id: invoice.value.partition[0]._suplier_id,
    _partition: invoice.value.partition[0].id
  }
  console.log(data);
  const resp = await invApi.editProduct(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide();
    let inx = products.value.findIndex(e => e.id == data.id);
    console.log(product.value.val);
    products.value.splice(inx, 1, resp);
  }
  reset()
}

const mosEditProduct = (a, b) => {
  console.log(b)
  product.value.val = b
  unitMeasure.value.val = unitMeasure.value.opts.find(e => e.id == b.pivot._supply_by)
  product.value.state = true
  product.value.edit = true
}


init()
</script>
