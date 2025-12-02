<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section class="row">
        <q-select class="col" v-model="types.val" :options="types.opts" label="UNIDAD" filled dense
          :hint="types.val ? `Los min y max que generes se pondran en ${types.val.label}` : ''" />
        <q-separator spaced inset vertical dark />
        <q-btn :disable="!types.val" color="primary" title="subirArchivo" icon="upload" @click="() => inputFile.click()"
          flat rounded />
      </q-card-section>
    </q-card>
    <q-separator spaced inset vertical dark />
    <transition name="bounce">
      <div v-if="product.state" :class="!ismobile ? 'row' : ''">
        <q-card :class="!ismobile ? 'col' : ''">
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section>Codigo</q-item-section>
                <q-item-section>{{ product.val.code }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Descripcion</q-item-section>
                <q-item-section>{{ product.val.description }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>PXC</q-item-section>
                <q-item-section>{{ product.val.pieces }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Estado</q-item-section>
                <!-- {{ product.val.stateToVal.state }} -->
                <q-item-section>
                  <q-select v-model="product.val.stateToVal.state" option-value="id" :options="product_states.opts"
                    filled dense @update:model-value="updateStatus" option-label="name" emit-value map-options />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>GEN</q-item-label>
                  <q-item-label overline>{{product.val.stocks.find(e => e.id ==
                    VDB.session.store.id_viz).pivot.gen}}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>EXH</q-item-label>
                  <q-item-label overline>{{product.val.stocks.find(e => e.id ==
                    VDB.session.store.id_viz).pivot.exh}}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>FDT</q-item-label>
                  <q-item-label overline>{{product.val.stocks.find(e => e.id == VDB.session.store.id_viz).pivot.fdt
                    }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>EnTransito</q-item-label>
                  <q-item-label overline>{{product.val.stocks.find(e => e.id ==
                    VDB.session.store.id_viz).pivot.in_transit
                    }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <!-- <q-card-section>
            {{ product.val.stocks.find(e => e.id == VDB.session.store.id_viz).pivot._status }}
          </q-card-section> -->

          <q-card-section class="row">
            <q-input v-model="inputs.min" type="number" label="Minimo" class="col" filled input-class="text-center"
              :error="Number(inputs.max) <= Number(inputs.min) || Number(inputs.min) >= Number(inputs.max)"
              :error-message="inputs.max <= inputs.min || inputs.min >= inputs.max ? 'El maximo es menor que el minimo' : 'El minimo es mayor que el maximo'"
              @blur="setMin" />
            <q-separator spaced inset vertical dark />
            <q-input v-model="inputs.max" type="number" label="Maximo" class="col" filled input-class="text-center"
              :error="Number(inputs.max) <= Number(inputs.min) || Number(inputs.min) >= Number(inputs.max)"
              :error-message="inputs.max <= inputs.min || inputs.min >= inputs.max ? 'El maximo es menor que el minimo' : 'El minimo es mayor que el maximo'"
              @blur="setMax" />
          </q-card-section>

          <q-card-section class="row">
            <q-input disable v-model="product.val.stocks.find(e => e.id == VDB.session.store.id_viz).pivot.min"
              type="number" label="Minimo" class="col" filled input-class="text-center" />
            <q-separator spaced inset vertical dark />
            <q-input disable v-model="product.val.stocks.find(e => e.id == VDB.session.store.id_viz).pivot.max"
              type="number" label="Maximo" class="col" filled input-class="text-center" />
          </q-card-section>
          <q-card-section>
            <q-list bordered>
              <q-item v-for="(value, index) in product.val.stocks.filter(e => e._type == 1)" :key="index">
                <q-item-section class="text-bold">
                  {{ value.name }}
                </q-item-section>
                <q-item-section class="text-center">
                  {{ value.pivot.stock }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
        <q-separator spaced inset vertical dark />
        <q-table :class="!ismobile ? 'col' : ''" :rows="product.val.stocks.filter(e => e._type == 2)"
          :columns="table.columns" :pagination="table.pagination" />
      </div>
    </transition>

    <q-dialog v-model="excelImport.state" persistent>
      <q-card style="width: 800px; max-width: 90vw;">
        <q-card-section class="text-center text-h6 text-bold">
          Resultado de Importacion
        </q-card-section>

        <q-card-section>
          <q-list bordered>
            <q-item>
              <q-item-section>
                <q-item-label class="text-center">Productos Encontrados</q-item-label>
                <q-item-label class="text-center">{{ excelImport.wndGetRows }}</q-item-label>
              </q-item-section>
              <q-item-section> <q-item-label class="text-center">Productos Repetidos</q-item-label>
                <q-item-label class="text-center">{{ excelImport.repeat.length }}</q-item-label></q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <q-tabs v-model="tab" class="text-teal">
            <q-tab name="products" icon="local_mall" label="Encontrados" />
            <q-tab name="notFund" icon="wrong_location" label="No Encontrados" />
          </q-tabs>
        </q-card-section>
        <q-card-section>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="products">
              <q-table :rows="excelImport.wndTotal" virtual-scroll flat bordered style="height: 400px"
                row-key="producto" />
            </q-tab-panel>
            <q-tab-panel name="notFund">
              <q-list bordered>
                <q-item v-for="(val, index) in excelImport.wndNotExist" :key="index">
                  <q-item-section>{{ val }}</q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat label="Modificar" color="positive" @click="setMassiveminmax" />
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-footer reveal elevated bordered>
      <q-card class="my-card">
        <ProductAutocomplete @input="add" @agregar="agregar" :workpoint-status="'all'" :checkState="true"
          :wkpToVal="VDB.session.store.id_viz" />
      </q-card>
    </q-footer>
  </q-page>
  <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import { useWarehouse } from 'src/stores/warehousStore';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import dbCompare from 'src/API/compareApi'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import productsApi from 'src/API/productsApi';
import dbproduct from 'src/API/Product'
import Product from 'src/API/Product';

const VDB = useVDBStore();
const $q = useQuasar();
const warehousStore = useWarehouse()
warehousStore.setTitle('Minimos Y Maximos')
warehousStore.setshowReportLocations(false);
warehousStore.setshowReportMinMax(true);
const inputFile = ref(null)
const tab = ref('products')
const product = ref({
  state: false,
  val: null
})
const product_states = ref({
  opts: [
    { id: 1, name: 'Disponible' },
    { id: 3, name: 'Agotado' },
    { id: 6, name: 'Bloqueado' },
  ]
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

const inputs = ref({
  min: null,
  max: null
})
const originalMinMax = ref(null)

const types = ref({
  val: null,
  opts: [
    { id: 1, label: "Pieza" },
    { id: 2, label: "Docena" },
    { id: 3, label: "Caja" },
    { id: 4, label: "Media Caja" },
  ]
})

const table = ref({
  columns: [
    { name: 'store', label: "Sucursal", field: r => r.name, align: 'left' },
    { name: 'Stock', label: "Stock PZ", field: r => r.pivot.stock, align: 'center' },
  ],
  pagination: { rowsPerPage: 10 }
})


const ismobile = computed(() => $q.platform.is.mobile);


const add = (opt) => {
  console.log(opt)
}

const agregar = (ops) => {
  product.value.state = true;
  product.value.val = ops;
  console.log(ops)
  const stock = ops.stocks.find(e => e.id == VDB.session.store.id_viz);
  if (stock) {
    // aquí puedes dividir los valores reales para mostrar “base”
    let divisor = 1;
    switch (types.value.val?.id) {
      case 1:
        divisor = 1;
        break;
      case 2:
        divisor = 12;
        break;
      case 3:
        divisor = ops.pieces || 1;
        break;
      case 4:
        divisor = (ops.pieces || 1) / 2;
        break;
    }
    originalMinMax.value = {
      min: stock.pivot.min / divisor,
      max: stock.pivot.max / divisor
    }
    inputs.value.min = stock.pivot.min / divisor;
    inputs.value.max = stock.pivot.max / divisor;
  }
}
const calculateRealValues = () => {
  if (!product.value.val) return;

  const stock = product.value.val.stocks.find(
    (e) => e.id == VDB.session.store.id_viz
  );
  if (!stock) return;

  let multiplier = 1; // default piezas
  switch (types.value.val?.id) {
    case 1:
      multiplier = 1;
      break;
    case 2:
      multiplier = 12;
      break;
    case 3:
      multiplier = product.value.val.pieces || 1;
      break;
    case 4:
      multiplier = (product.value.val.pieces || 1) / 2;
      break;
  }

  stock.pivot.min = inputs.value.min * multiplier;
  stock.pivot.max = inputs.value.max * multiplier;
};

const setMin = async () => {
  // console.log(originalMinMax.value)
  const stock = product.value.val.stocks.find(
    (e) => e.id == VDB.session.store.id_viz
  );
  if (stock.pivot.min !== originalMinMax.value.min) {
    let data = {
      product: product.value.val.id,
      min: stock.pivot.min,
      _workpoint: VDB.session.store.id_viz
    }
    console.log(data)
    $q.loading.show({ message: 'Modificando' })
    const resp = await productsApi.setMin(data)
    if (resp.fail) {
      console.log(resp)
    } else {
      $q.loading.hide();
      originalMinMax.value.min = data.min
      $q.notify({ message: resp.message, type: resp.success ? 'positive' : 'negative', position: 'top' })
    }
  }

}

const setMax = async () => {
  const stock = product.value.val.stocks.find(
    (e) => e.id == VDB.session.store.id_viz
  );
  if (stock.pivot.max !== originalMinMax.value.max) {
    let data = {
      product: product.value.val.id,
      max: stock.pivot.max,
      _workpoint: VDB.session.store.id_viz
    }
    console.log(data)
    $q.loading.show({ message: 'Modificando' })
    const resp = await productsApi.setMax(data)
    if (resp.fail) {
      console.log(resp)
    } else {
      $q.loading.hide();
      originalMinMax.value.max = data.max
      $q.notify({ message: resp.message, type: resp.success ? 'positive' : 'negative', position: 'top' })
    }
  }


}

const readFile = () => {
  let inputFile = document.getElementById("inputFile").files[0];
  let workbook = new ExcelJS.Workbook();
  let codesToSend = [];
  let datos = {};

  workbook.xlsx.load(inputFile).then(() => {
    let worksheet = workbook.worksheets[0];
    let codigos = worksheet.getColumn("A");

    codigos.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      let codigo = cell.value;
      if (!codigo) return;

      let minimo = parseFloat(worksheet.getCell(`B${rowNumber}`).value) || 0;
      let maximo = parseFloat(worksheet.getCell(`C${rowNumber}`).value) || 0;
      if (!datos[codigo]) {
        datos[codigo] = { minimo: 0, maximo: 0 };
      }
      datos[codigo].minimo = minimo;
      datos[codigo].maximo = maximo;
    });

    let Diferencia = Object.keys(datos).map(codigo => ({
      codigo: codigo,
      minmax: datos[codigo]
    }));

    Diferencia.forEach(e => codesToSend.push(e.codigo));

    if (codesToSend.length) {
      let data = { codes: codesToSend, _workpoint: VDB.session.store.id_viz };
      $q.loading.show({ message: "Procesando archivo, espera.." });

      dbproduct.getMassive(data)
        .then((success) => {
          let resp = success.data;
          resp.fails.notFound.map(e => excelImport.value.wndNotExist.push(e));
          resp.fails.repeat.map(e => excelImport.value.repeat.push(e));
          let products = resp.products;
          excelImport.value.wndGetRows = products.length;
          excelImport.value.state = !excelImport.value.state;
          let dat = products.map(product => {
            let multiplier = 1; // default piezas
            switch (types.value.val?.id) {
              case 1:
                multiplier = 1;
                break;
              case 2:
                multiplier = 12;
                break;
              case 3:
                multiplier = product.pieces || 1;
                break;
              case 4:
                multiplier = (product.pieces || 1) / 2;
                break;
            }

            let cantidad = Diferencia.find(item => item.codigo === product.code);
            return {
              id: product.id,
              producto: product.code,
              descripcion: product.description,
              min: cantidad ? cantidad.minmax.minimo * multiplier : 0,
              max: cantidad ? cantidad.minmax.maximo * multiplier : 0,
            };
          });
          excelImport.value.wndTotal = dat;
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
};

const setMassiveminmax = async () => {
  $q.loading.show({ message: 'actualizando Min y Max' })
  let data = {
    workpoint: VDB.session.store.id_viz,
    products: excelImport.value.wndTotal
  }
  console.log(data)
  const resp = await productsApi.setMassisveMinMax(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.loading.hide();
    $q.notify({ message: 'Datos Actualizados', type: 'positive', position: 'center' })
    console.log(resp)
    excelImport.value = {
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
    }
  }
}

const updateStatus = async (a) => {
  $q.loading.show({message:'Cambiando Estado'})
  let data = {
    _product: product.value.val.id,
    _status: a,
    wid: VDB.session.store.id_viz
  }
  console.log(data)
  const resp = await productsApi.updateStatusProduct(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    $q.loading.hide();
    $q.notify({ message: 'Estado Actualizado', type: 'positive', position: 'right' })
  }

}

watch(
  [() => types.value.val, () => inputs.value.min, () => inputs.value.max],
  ([newType, newMin, newMax], [oldType, oldMin, oldMax]) => {
    localStorage.setItem('minmaxType', JSON.stringify(newType));
    calculateRealValues();
  },
  { deep: true }
);
onMounted(() => {
  const savedSale = localStorage.getItem('minmaxType')
  if (savedSale) {
    types.value.val = JSON.parse(savedSale)
  }
})

</script>
<style>
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
</style>
