<template>
  <q-page padding v-if="salida">
    <q-header reveal bordered class="bg-white text-black">
      <q-toolbar class="justify-between">
        <q-btn color="primary" icon="arrow_back" flat @click="$router.push('/transfers')" round />
        <div>{{ salida.store.name }} </div>
        <div class="row items-center">
          <div class="col"> {{ salida.warehouse.name }}</div> <q-icon name="arrow_forward" class="col" />
        </div>
        <div>{{ salida.created_by }} </div>
        <div>salida <q-icon name="navigate_next" color="primary" /> <span class="text-h6">{{ salida.code_fs
        }}</span>
        </div>
      </q-toolbar>
      <q-separator />
      <div class="text-center text-bold">{{ salida.notes }}
      </div>
      <q-separator />
      <div class="text-center text-bold row ">
        <div class="col"><q-btn color="primary" icon="publish" label="Importar Excel" flat @click="clickFile" /></div>
        <div class="col"><q-btn color="primary" icon="apps" label="Preventas" flat @click="clickFilePreventa" /></div>
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
        <q-item-section>{{ product.product }}</q-item-section>
        <q-item-section>{{ product.description }}</q-item-section>
        <q-item-section class="text-center">{{ product.amount }}</q-item-section>
      </q-item>
      <q-separator />
    </q-list>

    <q-dialog v-model="product.state" persistent :position="'bottom'">
      <q-card style="width: 300; max-width: 40vw;">
        <q-card-section>
          <div class="text-center text-h4">{{ product.val.product }}</div>
          <div class="text-center text-h6 text-grey-14">{{ product.val.description }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-center">
            <div class="q-pa-xs">
              <div class="text-bold text-h6">Cantidad:</div>
              <div class="row">
                <q-btn flat color="negative" icon="remove" class="text-h5 col"
                  @click=" product.val.amount--" />
                <div class=" col column q-py-md">
                  <input type="number" min="1" v-model="product.val.amount" class="text-center exo"
                    style=" width: 100px; font-size: 3em; margin: auto auto; border: none;" />
                </div>
                <q-btn flat color="positive" icon="add" class="text-h5 col" @click="product.val.amount++" />
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

    <q-footer reveal elevated bordered class="bg-white">
      <q-card class="q-mb-md" flat bordered dense>
        <q-card-section class="row">
          <ProductAutocomplete class="col" :checkState="false" @input="add" @agregar="agregar" />
          <q-btn v-if="products.length > 0" color="primary" flat icon="east" @click="endTransfer" round />
        </q-card-section>
      </q-card>
    </q-footer>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import outApi from "src/API/outputsApi";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import dbproduct from 'src/API/Product'
import { useRoute, useRouter } from "vue-router";
const $router = useRouter();
const $route = useRoute();


const VDB = useVDBStore();
const $q = useQuasar();

const salida = ref(null);
const products = ref([])
const product = ref({
  val: null,
  state: false
})
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

const existProduct = computed(() => products.value?.filter(e => e.product == product.value.val?.product).length > 0)

const init = async () => {
  $q.loading.show({message:'Obteniendo datos'})
  const transfer = $route.params.oid;
  const resp = await outApi.getOutput(transfer)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide();
    if (VDB.session.rol == 'aud' || VDB.session.rol == 'audc' || VDB.session.rol == 'root') {
      salida.value = resp
      products.value = resp.bodie
      console.log(salida.value)
    } else if ((VDB.session.rol == 'aux' || VDB.session.rol == 'gen') && (resp.origin.id !== 4 && resp.destiny.id !== 4)) {
      salida.value = resp
      products.value = resp.bodie
      console.log(salida.value)
    } else if (VDB.session.rol == 'alm' && ([5, 6].includes(resp.destiny.id) || [5, 6].includes(resp.origin.id))) {
      salida.value = resp
      products.value = resp.bodie
      console.log(salida.value)
    } else {
      $router.push(`/outputs`);
      $q.notify({
        message: 'No tienes acceso a este traspaso',
        type: 'negative',
        position: 'center'
      });
    }

  }
}


const add = (opt) => {
  console.log(opt)
}

const agregar = (ops) => {
  let inx = products.value.findIndex(e => e.product == ops.code)
  console.log(inx);
  if (inx >= 0) {
    $q.notify({ message: 'El Producto ya esta agregado', type: 'negative', position: 'center' })
  } else {
    product.value.val = {
      "product": ops.code,
      "description": ops.description,
      "amount": 1
    };
    product.value.state = true
    console.log(ops);

  }
}

const addProduct = async () => {
  $q.loading.show({ message: 'Insertando Producto' })
  console.log(product.value.val)
  product.value.val._transfer = $route.params.oid
  const resp = await outApi.addProduct(product.value.val)
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
  product.value.val._transfer = $route.params.oid
  const resp = await outApi.editProduct(product.value.val)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    let inx = products.value.findIndex(e => e.product == product.value.val.product)
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
  product.value.val._transfer = $route.params.oid
  const resp = await outApi.removeProduct(product.value.val)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    let inx = products.value.findIndex(e => e.product == product.value.val.product)
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

const endTransfer = async () => {
  $q.loading.show({ message: 'Terminando Salida' })
  let data = {
    user: VDB.session.name,
    output: salida.value,
    products: products.value
  }
  console.log(data);
  const resp = await outApi.endOutput(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.notify({ message: resp, position: 'center', type: 'positive' })
    console.log(resp)
    $q.loading.hide();
    $router.push('/outputs')
  }
}


const viewProduct = (val) => {
  product.value.state = true
  product.value.val = val
}

const reset = () => {
  product.value = {
    val: null,
    state: false
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
            "_output": $route.params.oid
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
    const resp = await outApi.outputPreventa(data);
    if (resp.fail) {
      alert(resp)
    } else {
      orderImport.value.encontrados = resp.Encontrados
      orderImport.value.faltantes = resp.Faltantes
      orderImport.value.products = resp.products.length
      orderImport.value.state = !orderImport.value.state
      resp.products.forEach(e => e._output = $route.params.oid)
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
  const resp = await outApi.addProductMasive(prd)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    prd.map(e => { products.value.push(e); })
    $q.loading.hide()
  }
}

// if(VDB.session.rol == 'root' || VDB.session.rol == 'aud' ){
  init()
// }else{
//   $q.notify({message:'No tienes acceso a esta pagina',type:'negative',position:'center'})
//   $router.replace('/');
// }

</script>
