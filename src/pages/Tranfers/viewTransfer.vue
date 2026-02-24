<template>
  <q-page padding v-if="traspaso">
    <q-header reveal bordered :class="$q.dark.isActive ? 'text-white bg-dark' : 'text-dark bg-white'">
      <q-toolbar class="justify-between">
        <q-btn color="primary" icon="arrow_back" flat @click="$router.push('/warehouse/transfers')" round />
        <div class="row items-center">
          <div class="col"> {{ traspaso.origin.name }}</div> <q-icon name="arrow_forward" class="col" />
          <div class="col"> {{ traspaso.destiny.name }}</div>
        </div>
        <div>{{ traspaso.created_by.nick.toUpperCase() }} </div>
      </q-toolbar>
      <q-separator />
      <div class="text-center text-bold">{{ traspaso.notes }}
      </div>
      <q-separator />
      <div class="text-center text-bold row ">
        <div class="col"><q-btn color="primary" icon="publish" label="Importar Excel" flat @click="clickFile"
            :disable="traspaso._state != 1" /></div>
        <div class="col"><q-btn color="primary" icon="apps" label="Preventas" flat @click="clickFilePreventa"
            :disable="traspaso._state != 1" /></div>
        <div class="col"><q-btn color="primary" icon="picture_as_pdf" label="PDF" flat @click="pdfTransfer"
            v-if="traspaso._state == 2" /></div>

        <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
        <input type="file" ref="inputFilePreventa" id="inputFilePreventa" @input="readFilePreventa" hidden
          accept=".xlsx,.xls" />
      </div>
    </q-header>

    <q-separator spaced inset vertical dark />


    <q-list bordered>
      <q-item>
        <q-item-section> Producto </q-item-section>
        <q-item-section> Descripcion </q-item-section>
        <q-item-section class="text-center"> Cantidad </q-item-section>
      </q-item>
    </q-list>

    <q-list bordered v-for="(product, index) in products" :key="index">

      <q-item clickable v-ripple @click="viewProduct(product)">
        <q-item-section>{{ product.code }}</q-item-section>
        <q-item-section>{{ product.description }}</q-item-section>
        <q-item-section class="text-center">{{ product.pivot.amount }}</q-item-section>
      </q-item>
      <q-separator />
    </q-list>

    <q-dialog v-model="product.state" persistent :position="'bottom'">
      <q-card>
        <q-card-section>
          <div class="text-center text-h4">{{ product.val.code }}</div>
          <div class="text-center text-h6 text-grey-14">{{ product.val.description }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-center">
            <div class="q-pa-xs">
              <div class="text-bold text-h6">Cantidad:</div>
              <div class="row">
                <q-btn flat color="negative" icon="remove" class="text-h5 col"
                  @click="product.val.pivot.amount > 1 ? product.val.pivot.amount-- : ''" />
                <div class="col column q-py-md bg-section" style="border-radius: 8px;">
                  <input type="number" min="1" v-model="product.val.pivot.amount" class="text-center exo clean-input"
                    style="width: 100px; font-size: 3em; margin:auto;" />
                </div>
                <q-btn flat color="positive" icon="add" class="text-h5 col" @click="product.val.pivot.amount++" />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center" v-if="!existProduct">
          <q-btn flat label="Cancelar" color="negative" @click="reset" />
          <q-btn flat label="Agregar" color="positive" @click="addProduct" />
        </q-card-actions>
        <q-card-actions align="center" v-else>
          <q-btn flat icon="close" color="red-10" @click="reset" />
          <q-btn flat label="Eliminar" color="negative" @click="deleteProduct" />
          <q-btn flat label="Editar" color="blue-10" @click="editProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="excelImport.state">
      <q-card>
        <q-card-section class="row text-bold text-overline text-center">
          Resultados de la importacion :O
        </q-card-section>
        <q-card-section>
          <q-list bordered>
            <q-item>
              <q-item-section>Productos Encontrados</q-item-section>
              <q-item-section>{{ excelImport.wndGetRows }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Productos Sin Datos</q-item-section>
              <q-item-section>{{ excelImport.wndNotExist }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="orderImport.state">
      <q-card>
        <q-card-section class="row text-bold text-overline text-center">
          Resultados de la importacion :O
        </q-card-section>
        <q-card-section>
          <q-list bordered>
            <q-item>
              <q-item-section>Pedidos Encontrados</q-item-section>
              <q-item-section>{{ orderImport.encontrados }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Pedidos Sin Encontrar</q-item-section>
              <q-item-section>{{ orderImport.faltantes }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Productos Encontrados</q-item-section>
              <q-item-section>{{ orderImport.products }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-footer reveal elevated bordered class="bg-white" v-if="traspaso._state == 1 || traspaso._state == 4">
      <q-card class="q-mb-md" flat bordered dense>
        <q-card-section class="row">
          <ProductAutocomplete class="col" :checkState="true" @input="agregar" @agregar="agregar"
            :wkpToVal="traspaso?.origin?.id" />
          <q-btn v-if="products.length > 0" color="primary" flat icon="east" @click="endTransfer" round />
        </q-card-section>
      </q-card>
    </q-footer>
    <q-footer reveal elevated bordered v-else>...</q-footer>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import dayjs from 'dayjs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import { useWarehouse } from 'src/stores/warehousStore';
import  PDF from 'src/Pdf/transfers/transfers.js';

import dbproduct from 'src/API/Product'
import { useRoute, useRouter } from "vue-router";
import warehouseApi from 'src/API/warehouseApi';
import transferApi from 'src/API/transferApi';

const warehousStore = useWarehouse()
const $router = useRouter();
const $route = useRoute();
warehousStore.setTitle(`Traspaso - ${$route.params.oid} `)
warehousStore.setshowReportLocations(false);
warehousStore.setshowReportMinMax(false);
warehousStore.setshowOptions(false);

const VDB = useVDBStore();
const $q = useQuasar();
const traspaso = ref(null);
const product = ref({
  val: null,
  state: false
})
const products = ref([]);

const excelImport = ref({
  state: false,
  wndGetRows: [],
  wndNoDataFound: [],
  wndTotal: [],
  wndGetAdded: [],
  _supply_by: 0,
  message: "",
  messageRepeat: "",
  wndNotExist: [],
  repeat: []
})

const orderImport = ref({
  state: false,
  encontrados: [],
  faltantes: [],
  products: null
})

const inputFile = ref(null)
const inputFilePreventa = ref(null)



const existProduct = computed(() => products.value?.filter(e => e.id == product.value.val?.id).length > 0)

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Traspaso' })
  const transfer = $route.params.oid;
  const resp = await transferApi.getTransfer(transfer)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    if (VDB.session.credentials.rol._type == 1) {
      // console.log('administrativo');
      traspaso.value = resp
      products.value = resp.bodie
    } else if (VDB.session.credentials.id == resp.created_by.id) {
      traspaso.value = resp
      products.value = resp.bodie
      // console.log('otro vato');
    } else {
      $q.notify({ message: 'No puedes ingresar al traspaso', position: 'center', type: 'negative' })
      console.log(resp)
      $router.push('/warehouse/transfers')
    }
    $q.loading.hide();

  }
}

const agregar = (ops) => {
  console.log(ops)
  let inx = products.value.findIndex(e => e.id == ops.id)
  console.log(inx);
  if (inx >= 0) {
    $q.notify({ message: 'El Producto ya esta agregado', type: 'negative', position: 'center' })
  } else {
    product.value.val = ops
    product.value.val.pivot = { amount: 1 }
    product.value.state = true
    console.log(ops);
  }
}

const addProduct = async () => {
  $q.loading.show({ message: 'Insertando Producto' })
  console.log(product.value.val)
  // product.value.val._transfer = $route.params.oid
  let data = {
    _transfer: $route.params.oid,
    _product: product.value.val.id,
    amount: product.value.val.pivot.amount
  }

  const resp = await transferApi.addProduct(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    products.value.push(product.value.val);
    product.value = {
      val: null,
      state: false
    }
    $q.loading.hide()
  }
}

const editProduct = async () => {
  $q.loading.show({ message: 'Editando Producto' })
  console.log(product.value.val)
  let data = {
    _transfer: $route.params.oid,
    _product: product.value.val.id,
    amount: product.value.val.pivot.amount
  }
  const resp = await transferApi.editProduct(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    let inx = products.value.findIndex(e => e.id == product.value.val.id)
    if (inx >= 0) {
      products.value[inx].amount = product.value.val.amount
      $q.notify({ type: 'positive', position: 'center' })
      product.value = {
        val: null,
        state: false
      }
      $q.loading.hide()
    }

  }
}
const deleteProduct = async () => {
  $q.loading.show({ message: 'Eliminando Producto' })
  console.log(product.value.val)
  let data = {
    _transfer: $route.params.oid,
    _product: product.value.val.id,
  }
  const resp = await transferApi.removeProduct(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    let inx = products.value.findIndex(e => e.id == product.value.val.id)
    if (inx >= 0) {
      products.value.splice(inx, 1)
      $q.notify({ type: 'positive', position: 'center' })
      product.value = {
        val: null,
        state: false
      }
      $q.loading.hide()
    }

  }
}

const viewProduct = (val) => {
  if (traspaso.value._state == 1 || traspaso.value._state == 4) {
    product.value.state = true
    product.value.val = val
  } else {
    $q.notify({ message: 'Traspaso Terminado no se puede modificar', type: 'negative', position: 'center' })
  }

}

const reset = () => {
  product.value = {
    val: null,
    state: false
  }
}

const endTransfer = async () => {
  $q.loading.show({ message: 'Terminando Traspaso' })
  console.log(traspaso.value);
  const resp = await transferApi.endTransfer(traspaso.value)
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.notify({ message: resp, position: 'center', type: 'positive' })
    console.log(resp)
    $q.loading.hide();
    $router.push('/warehouse/transfers')
  }
}


const clickFile = () => {
  inputFile.value.click()
}

const readFile = async () => {

  let inputFile = document.getElementById("inputFile").files[0];
  // console.log(inputFile)
  let workbook = new ExcelJS.Workbook();
  let codesToSend = [];
  let diference = [];
  let convert = 0;
  let datos = {};


  workbook.xlsx.load(inputFile).then((data) => {
    let worksheet = workbook.worksheets[0];
    // console.log(worksheet.getColumn("A"))
    // console.log(worksheet.getColumn("B"))
    let codigos = worksheet.getColumn("A");
    let cantidades = worksheet.getColumn("B");



    codigos.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      let codigo = cell.value;
      let cantidadCell = worksheet.getCell(`B${rowNumber}`);
      let cantidad = parseFloat(cantidadCell.value);
      if (datos[codigo]) {
        datos[codigo] += cantidad;
      } else {
        datos[codigo] = cantidad;
      }
    });
    let Diferencia = Object.keys(datos).map(codigo => ({
      codigo: codigo,
      cantidad: datos[codigo]
    }));
    Diferencia.forEach(e => codesToSend.push(e.codigo))
    // console.log(Diferencia)
    // console.log(codesToSend.length)
    if (codesToSend.length) {
      let data = { codes: codesToSend, _workpoint: VDB.session.store.id_viz };
      // console.log(data)
      // wndImportJSON.wndTotal  = codesToSend.length;
      $q.loading.show({ message: "Procesando archivo, espera.." });

      dbproduct.getMassive(data)
        .then((success) => {

          let resp = success.data;
          resp.fails.notFound.map(e => excelImport.value.wndNotExist.push(e))
          resp.fails.repeat.map(e => excelImport.value.repeat.push(e))
          let products = success.data.products
          excelImport.value.wndGetRows = products.length;
          excelImport.value.state = !excelImport.value.state;
          console.log(products)
          let dat = products.map(product => {
            let cantidad = Diferencia.find(item => item.codigo === product.code);
            return {
              product: product.code,
              description: product.description,
              amount: cantidad ? cantidad.cantidad : 0,
              "_transfer": $route.params.oid
            };
          });
          addingMasive(dat)
          $q.loading.hide();
        })
        .catch((fail) => {
          console.log(fail);
          $q.notify({
            message: "Hay un problema con obtener los datos :/.",
            icon: "fas fa-grin-beam-sweat",
            color: "negative",
          });
        });
    } else {
      $q.notify({
        message: "Vaya!! Al parecer este archivo esta vacio.",
        icon: "fas fa-grin-beam-sweat",
        color: "negative",
      });
    }

  });
}

const clickFilePreventa = () => {
  inputFilePreventa.value.click()
}


const readFilePreventa = async () => {

  let inputFile = document.getElementById("inputFilePreventa").files[0];
  // console.log(inputFile)
  let workbook = new ExcelJS.Workbook();
  let codesToSend = [];


  workbook.xlsx.load(inputFile).then(async (data) => {
    let worksheet = workbook.worksheets[0];
    let codigos = worksheet.getColumn("A");


    $q.loading.show({ message: "Procesando archivo, espera.." });
    codigos.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      cell.value ? codesToSend.push(cell.value) : null
    });
    if (codesToSend.length) {
      let data = { codes: codesToSend, _workpoint: VDB.session.store.id_viz };
      console.log(data)
      const resp = await tranApi.transferPreventa(data);
      if (resp.fail) {
        alert(resp)
      } else {
        orderImport.value.encontrados = resp.Encontrados
        orderImport.value.faltantes = resp.Faltantes
        orderImport.value.products = resp.products.length
        orderImport.value.state = !orderImport.value.state
        resp.products.forEach(e => e._transfer = $route.params.oid)
        let dat = resp.products
        console.log(dat);
        addingMasive(dat)
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



const addingMasive = async (prd) => {
  const resp = await tranApi.addProductMasive(prd)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    prd.map(e => { products.value.push(e); })
    $q.loading.hide()
  }
}

const pdfTransfer = async () => {
  await PDF.tranfer_warehouse(traspaso.value)
}



init()
</script>
