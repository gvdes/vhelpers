<template>
  <q-page padding v-if="order">

    <div class="row items-stretch justify-between bg-primary text-white">
      <q-btn @click="() => $router.push('/distribute/dashboardStore')" flat icon="close" color="white" />
      <div class="row items-center col divlcient">
        <div class="q-pa-sm col text-center">
          <div class="text--2">Destino:</div>
          <div class="text-uppercase">{{ order.to.alias }}</div>
        </div>

        <div class="q-pa-sm col text-center">
          <div class="text--2">Folio:</div>
          <div class="text-bold">{{ order.id }}</div>
        </div>
        <div class="q-pa-sm col text-center">
          <div class="text--2">Almacen:</div>
          <div class="text-bold">{{ order._warehouse }}</div>
        </div>
      </div>
    </div>
    <div class="row items-center justify-between q-mt-sm">
      <div class="row text-center">
        <div class="q-px-md">
          <div class="text--2">Modelos</div>
          <span class=" text-bold">
            {{ order.products.length }}
          </span>
        </div>
        <div class="q-px-md">
          <div class="text--2">Unidades</div>
          <span class=" text-bold">{{order.products.reduce((a, v) => a + Number(v.pivot.units), 0)}}</span>
        </div>
        <div class="q-px-md">
          <div class="text--2">Cajas</div>
          <span class=" text-bold">{{order.products.reduce((a, v) => a + Number(Number(v.pivot.units) /
            Number(v.pieces)), 0)}}</span>
        </div>
      </div>
    </div>
    <q-separator spaced inset vertical dark />

    <q-table grid flat dark row-key="id" :rows="order.products" :filter="table.filter" :pagination="table.pagination">
      <template v-slot:item="products">
        <div class="q-pa-xs col-xs-12  col-sm-6 col-md-4 col-lg-3">
          <q-card class=" q-mb-sm q-mr-sm" @click="selItem(products.row)">
            <div class="row items-center q-pt-md">
              <div class="col  q-px-md">
                <div class="text-bold">{{ products.row.code }}</div>
                <div>{{ products.row.name }}</div>
                <div class="text--2 ">{{ products.row.description }}</div>
              </div>
            </div>

            <div class="col q-px-md">
              <q-markup-table flat class="">
                <thead>
                  <tr>
                    <th>Sol. ({{units.find(e => e.id == products.row.pivot._supply_by).name}})</th>
                    <th>pzs / caj</th>
                    <th>Disp. ({{units.find(e => e.id == products.row.pivot._supply_by).name}})</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-center">
                    <td>{{ products.row.pivot.amount }}</td>
                    <td>{{ products.row.pieces }}</td>
                    <td>
                      <span :class="ttlStock(products.row) >= 1
                        ? 'text-green-10'
                        : 'text-pink-10'
                        ">{{ Math.round(ttlStock(products.row)) }}</span>
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
            <q-banner rounded class="" v-if="
              products.row.pivot.comments ||
              products.row.pivot._supply_by
            ">
              <span class="text--2">
                Se surtira la cantidad de
                <span class="text-weight-bold">{{ products.row.pivot.units }}pz</span>
                correspondiente a la unidad de {{units.find(e => e.id == products.row.pivot._supply_by).name}}
                <q-separator dark />
                Notas: {{ products.row.pivot.comments }}
              </span>
            </q-banner>
          </q-card>
        </div>
      </template>

      <template v-slot:bottom="scope">
        <q-page-sticky position="bottom" class="full-width" :offset="[0, 18]">
          <div class="row q-pt-xs">
            <q-btn-group rounded class="">
              <q-btn v-if="scope.pagesNumber > 2" icon="first_page" round dense flat :disable="scope.isFirstPage"
                @click="scope.firstPage" class="q-px-sm" />
              <q-btn icon="chevron_left" round dense flat :disable="scope.isFirstPage" @click="scope.prevPage"
                class="q-px-sm" />
              <q-btn flat disable no-caps>{{ scope.pagination.page }} / {{ scope.pagesNumber }}</q-btn>
              <q-btn icon="chevron_right" round dense flat :disable="scope.isLastPage" @click="scope.nextPage"
                class="q-px-sm" />
              <q-btn v-if="scope.pagesNumber > 2" icon="last_page" round dense flat @click="scope.lastPage"
                class="q-px-sm" />
            </q-btn-group>
          </div>
        </q-page-sticky>
      </template>
    </q-table>

    <q-dialog v-model="product.state" position="bottom">
      <q-card v-if="product.val">
        <q-card-section class="item-center">
          <div class="row">
            <div class="text-h6 col text-bold text-left">
              {{ product.val.code }}
            </div>
            <div class="text-subtitle2 col text-bold text-center">
              <!-- Stock: {{ product.stocks[0]._current }} -->
            </div>
            <div class="text-h6 col text-bold text-right">
              {{ product.val.name }}
            </div>
          </div>
          <div class="text-subtitle2 col">{{ product.val.description }}</div>
        </q-card-section>

        <q-card-section>
          <div class="row items-end">
            <div class="text-center">
              <div class="col q-pa-xs">
                <div class="text-bold text-h6">Cantidad:</div>
                <q-btn flat color="positive" icon="add" class="text-h5" @click="product.val.pivot.amount++" />
                <q-separator spaced inset vertical dark />
                <div class="col column q-py-md">
                  <input type="number" min="1" v-model="product.val.pivot.amount" class="text-center exo"
                    style=" width: 100px; font-size: 3em; margin: auto auto; border: none;" />
                </div>
                <q-separator spaced inset vertical dark />
                <q-btn flat color="negative" icon="remove" class="text-h5"
                  @click="product.val.pivot.amount > 1 ? product.val.pivot.amount-- : ''" />
              </div>
            </div>
            <q-separator spaced inset vertical dark />
            <div class="col q-pa-xs">
              <q-select dense filled v-model="product.val.units" :options="units" label="Surtir por" option-label="name"
                disable />
              <q-separator spaced inset vertical dark />
              <q-input dense filled v-model="product.val.pivot.comments" type="text" label="Notas" />
              <q-separator spaced inset vertical dark />
              <q-list>
                <q-item class="bg-grey-11">
                  <q-item-section class="text-left text-caption text-bold">STOCK {{product.val.stocks.find(e => e.id ==
                    order.to.id).alias}}</q-item-section>
                  <q-item-section class="text-bold text-center">{{ totalStock }} {{ product.val.units.id == 3 ? 'Cjs' :
                    product.val.units.id == 2 ? 'Dcns' : 'Pzs' }}</q-item-section>
                </q-item>
                <q-item class="bg-grey-11">
                  <q-item-section class="text-left text-caption">P x C</q-item-section>
                  <q-item-section class="text-bold text-center">{{ product.val.pieces }} pzs</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section class="text-left text-caption">Unidades</q-item-section>
                  <q-item-section class="text-bold text-center">{{ totalPzs }}
                    pzs</q-item-section>
                </q-item>

              </q-list>
            </div>
          </div>
        </q-card-section>

        <q-card-actions>
          <!-- <q-btn flat icon="close" @click="reset" /> -->
          <q-space />
          <q-btn flat icon="add" color="positive" v-if="!product.edit" @click="addProduct" />
          <q-btn flat icon="delete" color="negative" v-if="product.edit" @click="deleteProduct" />
          <q-btn flat icon="edit" color="warning" v-if="product.edit" @click="editProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="dataResponse.state" persistent>
      <q-card>
        <q-card-section class="text-center text-h5 text-bold">
          Resultados de Importacion
        </q-card-section>
        <q-card-section class="text-centet text-h6 text-bold">
          Correctos: {{ dataResponse.added.length }}
        </q-card-section>
        <q-card-section>
          Modelos sin Coincidencia: <span class="text-bold text-red">{{ dataResponse.notfound }}</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-footer reveal elevated bordered>
      <q-separator spaced inset vertical dark />
      <div class="row q-ml-sm">
        <div>
          <q-btn icon="upload" flat @click="clickFile" />
        </div>
        <q-separator spaced inset vertical dark />
        <q-card class="col">
          <ProductAutocomplete :checkState="false" @input="add" with_prices_Invoice :with_stock_cedis="order.to.id"
            @agregar="agregar" with_locations />
        </q-card>
        <q-separator spaced inset vertical dark />
        <div>
          <q-btn flat icon="send" @click="nextState" v-if="order.products.length > 0" />
        </div>
      </div>
      <q-separator spaced inset vertical dark />
    </q-footer>
    <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import ExcelJS from 'exceljs';
import { useRestockStore } from 'stores/Restock';
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
import RestockApi from 'src/API/RestockApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $restockStore = useRestockStore();
const $router = useRouter();
const $route = useRoute();


const order = ref(null);
const units = ref([])
const product = ref({
  state: false,
  val: null,
  edit: false
})
const dataResponse = ref({
  state:false,
  notfound:[],
  added:[]
})
const inputFile = ref(null)
const table = ref({
  pagination: { rowsPerPage: 16 },
  filter: ""
})

const pivot = ref({
  _requisition: $route.params.rid,//ok
  _product: null,//ok
  amount: 1,//ook
  _supply_by: null,//ok
  units: 0,//ok
  cost: 0,//ok
  total: null,//ok
  comments: null,//ok
  stock: null,//ok
  ipack: null,
})

const totalPzs = computed(() => {
  let pzs = product.value.val.pivot._supply_by == 3 ? (product.value.val.pivot.amount * product.value.val.pieces) : product.value.val.pivot._supply_by == 2 ? (product.value.val.pivot.amount * 12) : product.value.val.pivot.amount
  product.value.val.pivot.units = pzs
  return pzs
})

const totalStock = computed(() => {
  let pzs = product.value.val.pivot._supply_by == 3 ? (product.value.val.pivot.stock / product.value.val.pieces) : product.value.val.pivot._supply_by == 2 ? (product.value.val.pivot.stock / 12) : product.value.val.pivot.stock
  product.value.val.pivot.units = pzs
  return pzs
})

const ttlStock = (product) => {
  let pzs = product.pivot._supply_by == 3 ? (product.pivot.stock / product.pieces) : product.pivot._supply_by == 2 ? (product.pivot.stock / 12) : product.pivot.stock
  return pzs
}

const selItem = (item) => {
  console.log(item)
  product.value.val = item
  product.value.state = true
  product.value.edit = true
}

const add = (opt) => {
  console.log(opt)
  let inx = order.value.products.findIndex(e => e.id == opt.id)
  console.log(inx);
  if (inx >= 0) {
    product.value.val = order.value.products[inx]
    // console.log(product.value.val)
    // unitMeasure.value.val = unitMeasure.value.opts.find(e => e.id == product.value.val.pivot._supply_by)
    // console.log(unitMeasure.value)
    product.value.state = true
    product.value.edit = true
  } else {
    product.value.edit = false
    product.value.val = opt
    pivot.value._product = ops.id
    pivot.value._supply_by = ops._unit
    pivot.value.ipack = ops.pieces
    pivot.value.cost = ops.prices.find(e => e.id == 7).pivot.price
    pivot.value.stock = ops.stocks.find(e => e.id == order.value.to.id).pivot.stock
    product.value.val.pivot = pivot.value;
    // product.value.val.pivot.ipack = opt.pieces
    product.value.state = true
  }
}


const agregar = (ops) => {
  console.log(ops)
  let inx = order.value.products.findIndex(e => e.id == ops.id)
  console.log(inx);
  if (inx >= 0) {
    product.value.val = order.value.products[inx]
    console.log(product.value.val)
    // unitMeasure.value.val = unitMeasure.value.opts.find(e => e.id == product.value.val.pivot._supply_by)
    // console.log(unitMeasure.value)
    product.value.state = true
    product.value.edit = true
  } else {
    product.value.val = ops
    pivot.value._product = ops.id
    pivot.value._supply_by = ops._unit
    pivot.value.ipack = ops.pieces
    pivot.value.cost = ops.prices.find(e => e.id == 7).pivot.price
    pivot.value.stock = ops.stocks.find(e => e.id == order.value.to.id).pivot.stock
    product.value.val.pivot = pivot.value;
    product.value.edit = false
    // product.value.val.pivot.ipack = ops.pieces
    product.value.state = true
  }
}

const init = async () => {
  $restockStore.setShowLYT(false)
  $q.loading.show({ message: 'Obteniendo Pedido' })
  let data = {
    workpoint: VDB.session.store.id_viz,
    folio: $route.params.rid
  }
  const resp = await RestockApi.getRequired(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.loading.hide();
    console.log(resp)
    order.value = resp.order
    units.value = resp.units
    if(order.value._status != 1 ){ $router.push('/distribute/dashboardStore') }
  }
}

const addProduct = async () => {
  $q.loading.show({ message: 'Insertando Producto' })
  product.value.val.pivot.total = product.value.val.pivot.units * product.value.val.pivot.cost
  const resp = await RestockApi.addProductRequired(product.value.val.pivot)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide()
    order.value.products.push(resp)
    reset()
  }
}

const editProduct = async () => {
  $q.loading.show({ message: 'Editando Producto' })
  product.value.val.pivot.total = product.value.val.pivot.units * product.value.val.pivot.cost
  const resp = await RestockApi.addProductRequired(product.value.val.pivot)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide()
    let inx = order.value.products.findIndex(e => e.id == product.value.val.id)
    order.value.products.splice(inx, 1, resp)
    reset()
  }
}

const deleteProduct = async () => {
  $q.loading.show({ message: 'Eliminando Producto' })
  // product.value.val.pivot.total = product.value.val.pivot.units * product.value.val.pivot.cost
  const resp = await RestockApi.deleteProductRequired(product.value.val.pivot)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide()
    let inx = order.value.products.findIndex(e => e.id == product.value.val.id)
    order.value.products.splice(inx, 1)
    // order.value.products.push(resp)
    reset()
  }
}

const clickFile = () => {
  inputFile.value.click()
}

const readFile = async () => {
  let inputFile = document.getElementById("inputFile").files[0];
  let workbook = new ExcelJS.Workbook();
  let datos = {};


  workbook.xlsx.load(inputFile).then(async (data) => {
    let worksheet = workbook.worksheets[0];
    let codigos = worksheet.getColumn("A");
    let cantidades = worksheet.getColumn("B");
    codigos.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber === 1) return;
      let codigo = cell.value;
      let cantidadCell = worksheet.getCell(`B${rowNumber}`);
      let cantidad = parseFloat(cantidadCell.value);
      if (codigo) {
        if (datos[codigo]) {
          datos[codigo] += cantidad;
        } else {
          datos[codigo] = cantidad;
        }
      }
    });

    let Diferencia = Object.keys(datos).map(codigo => ({
      codigo: codigo,
      cantidad: datos[codigo]
    }));
    if (Diferencia.length) {
      let data = {
        codes: Diferencia,
        _requisition:order.value.id
      };
      $q.loading.show({ message: "Procesando archivo, espera.." });
      console.log(data)
      const resp = await RestockApi.addMassiveProducts(data)
      if (resp.fail) {
        console.log(resp)
      } else {
        console.log(resp)
        order.value.products = resp.products
        dataResponse.value.state = true
        dataResponse.value.added = resp.products
        dataResponse.value.notfound = resp.notFound
        // dataResponse.value.state = true
        $q.loading.hide()
      }
    } else {
      $q.notify({
        message: "Vaya!! Al parecer este archivo esta vacio.",
        icon: "fas fa-grin-beam-sweat",
        color: "negative",
      });
    }

  });
}

const nextState = async () => {
  $q.loading.show({ message: 'Enviando Pedido' });
  const resp = await RestockApi.nextStep({ id: order.value.id })
  console.log(resp)
  if (resp.status == 200) {
    console.log(resp)
    $q.notify({ message: 'Pedido Enviado :)', type: 'positive', position: 'center' })
    $router.push('/distribute/dashboardStore')
    $sktRestock.emit('order_refresh', { order: resp.data.requisition })
    $q.loading.hide();
  } else {
    alert('Problema con el envio de el pedido ')
  }
}

const reset = () => {
  pivot.value = {
    _requisition: $route.params.rid,//ok
    _product: null,//ok
    amount: 1,//ook
    _supply_by: null,//ok
    units: 0,//ok
    cost: 0,//ok
    total: null,//ok
    comments: null,//ok
    stock: null,//ok
    ipack: null,
  }
  product.value = {
    state: false,
    val: null,
    edit: false
  }
}
init()
</script>
