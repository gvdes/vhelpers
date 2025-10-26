<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="text-center">
          <div class="text-bold">Selecciona los Precios</div>
          <q-option-group :options="prices.opts" type="toggle" v-model="prices.val" inline />
        </div>
        <div class="row text-center">
          <q-btn class="col" outline color="primary" icon="upload_file" title="Subir Etiquetas" @click="clickFile" />
          <q-separator spaced inset vertical dark />
          <div v-if="products.length > 0" class="col">
            <div class="row">
              <q-btn class="col" outline color="primary" icon="delete" title="Eliminar Etiquetas"
                @click="deltb.state = !deltb.state" />
              <q-separator spaced inset vertical dark />
              <q-btn class="col" outline="" color="primary" icon="download" title="Descargar Etquetas"
                @click="mosPDF.state = !mosPDF.state" />
            </div>

          </div>
        </div>
        <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
      </q-card-section>
      <q-card-section>
        <div class="row">
          <q-select  style="width: 80px;" v-model="typeBus.val" :options="typeBus.opts" filled dense
            @update:modelValue="obtLocations" hide-dropdown-icon />
          <q-separator spaced inset vertical dark />
          <div v-if="typeBus.val.id == 1" class="col">
            <ProductAutocomplete @input="add" @agregar="agregar" with_prices />
          </div>
          <div v-if="typeBus.val.id == 2" class="col">
            <div class="row" v-if="sections.length > 0">
              <q-list dense>
                <q-item>
                  <q-item-section>
                    <q-item-label caption>ACT HOY</q-item-label>
                    <q-item-label class="flex flex-center"><q-checkbox dense v-model="updatedHoy" /></q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-select class="col" v-model="selectedUbicacion" :options="sections" label="ALMACEN" filled
                optionLabel="name" dense />
              <q-separator spaced inset vertical dark />
              <selectsSections v-if="selectedUbicacion" :sections="selectedUbicacion.sections"
                @obtProducts="obtenerProductsSection" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced inset vertical dark />

    <q-table :rows="products" row-key="name" grid :filter="table.filter" :pagination="table.pagination"
      no-data-label="''">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card class="my-card">
            <q-card-section>
              <q-chip size="sm" class="
                          fixed-right
                          absolute-right
                          text-bold text-white text-uppercase
                        " :color="colorLabel(props.row.type)">{{ props.row.type }}</q-chip>
              <div class="text-h5 text-bold text-center">{{ props.row.code }}</div>
              <div class="text-subtitle2 text-bold text-center">{{ props.row.name }}</div>
              <div class="text-subtitle2 text-bold text-center">{{ props.row.label }}</div>
              <div class="text-subtitle2 text-bold text-center">Longitud: {{ props.row.large }}</div>
              <div class="text-subtitle2 text-bold text-center">Ubicacion: {{props.row.locations?.map(location =>
                location.path).join('/')}}</div>

              <q-separator spaced inset vertical dark />
              <div class="row">
                <div class="col items-start"
                  v-for="(price, index) in props.row.usedPrices.filter(item => prices.val.includes(item.id))"
                  :key="index">
                  <div class="text-center">{{ price.alias }}</div>
                  <div class="text-center">{{ price.pivot.price }}</div>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn flat icon="delete" color="negative" @click="delrow(props.row)" />

              <q-btn flat icon="add" @click="props.row._copies++" />
              <div>
                <div class="text-caption text--2">copias</div>
                <div class="text-bold q-pb-sm text-center">
                  {{ props.row._copies }}
                </div>
              </div>
              <q-btn flat icon="remove" @click=" props.row._copies <= 1 ? '' : props.row._copies--" />
            </q-card-actions>
          </q-card>
        </div>
      </template>

      <template v-slot:bottom="scope">
        <q-page-sticky position="bottom" class="full-width" :offset="[0, 18]">
          <div class="row q-pt-xs">
            <q-btn-group rounded flat color="primary">
              <q-btn v-if="scope.pagesNumber > 2" icon="first_page" round dense flat :disable="scope.isFirstPage"
                @click="scope.firstPage" class="q-px-sm" />
              <q-btn icon="chevron_left" round dense flat :disable="scope.isFirstPage" @click="scope.prevPage"
                class="q-px-sm" />
              <q-btn flat disable no-caps>{{ scope.pagination.page }} /
                {{ scope.pagesNumber }}</q-btn>
              <q-btn icon="chevron_right" round dense flat :disable="scope.isLastPage" @click="scope.nextPage"
                class="q-px-sm" />
              <q-btn v-if="scope.pagesNumber > 2" icon="last_page" round dense flat @click="scope.lastPage"
                class="q-px-sm" />
            </q-btn-group>
          </div>
        </q-page-sticky>
      </template>
      <template v-slot:no-data>
      </template>
    </q-table>
    <q-dialog v-model="deltb.state" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="white" text-color="negative" />
          <div class="q-ml-sm">Se eliminaran todos los articulos de la lista </div>
        </q-card-section>
        <q-card-section>
          <div class="q-ml-sm">Deseas Continuar?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="No" color="positive" v-close-popup />
          <q-btn flat label="Si" color="negative" @click="delTable" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="mosPDF.state" persistent>
      <optionLabels :products="products" :prices="prices" />
    </q-dialog>
    <q-dialog v-model="wndImportJSON.state">

      <q-card class="my-card " style="width: 70%;">
        <q-card-section class=" items-center">
          <div class="text-center text-bold">Repetidos</div>
          <div class="text-negative">{{ wndImportJSON.messageRepeat }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-center">Productos Sin Precio</div>
          <q-list>
            <q-item v-for="(list, index) in wndImportJSON.wndNoDataFound" :key="index">
              <q-item-section>
                <q-item-label overline>{{ list.code }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label caption>{{ list.description }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <div class="text-center">Productos Sin Existencia</div>
          <q-list>
            <q-item v-for="(list, index) in wndImportJSON.wndNotExist" :key="index">
              <q-item-section>
                <q-item-label overline>{{ list }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import selectsSections from 'src/components/Locations/selectsLocations.vue';// encabezado aoiida
import optionLabels from 'src/components/Labels/OptionsLabels.vue';// encabezado aoiida
import locationsApi from 'src/API/locationsApi';
import dbproduct from 'src/API/Product'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { assist } from "src/boot/axios";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import labels from 'src/Pdf/labels/labels.js'

const VDB = useVDBStore();
const $q = useQuasar();

const products = ref([])
const sections = ref([])
const selectedUbicacion = ref(null)
const updatedHoy = ref(false)
const typeBus = ref({
  val: { id: 1, label: 'Productos' },
  opts: [
    { id: 1, label: 'Productos' },
    { id: 2, label: 'Ubicacion' },
  ]
})

const table = ref({
  filter: '',
  pagination: { rowsPerPage: 9 }
})
const deltb = ref({
  state: false
})
const mosPDF = ref({
  state: false,
})
const prices = ref({
  val: [0, 1, 2, 4],
  opts: [
    { label: 'Menudeo', value: 1 },
    { label: 'Mayoreo', value: 2 },
    { label: 'Docena', value: 3 },
    { label: 'Caja', value: 4 },
  ]
})

const inputFile = ref(null)

const wndImportJSON = ref({
  state: false,
  wndGetRows: [],
  wndNoDataFound: [],
  wndTotal: [],
  wndGetAdded: [],
  _supply_by: 0,
  message: "",
  messageRepeat: "",
  wndNotExist: [],
})

const checkPrices = (data) => {

  let notFound = [];
  let add = [];
  let resp = new Object();
  data.products.map((item) => {
    return getPrices(item.prices) ? notFound.push(item) : add.push(item);
  });
  console.log(data);
  resp.notFound = notFound;
  resp.add = add;
  return resp;

}
const getPrices = (prices) => {
  let flag = true;
  prices.map((item, id) => {
    flag = item.pivot.price == 0 ? true : false;
  });
  return flag;

}

const add = (ops) => {
  console.log(ops);
  let inx = products.value.findIndex(e => e.id == ops.id)
  console.log(inx);
  if (inx >= 0) {
    products.value[inx]._copies++
  } else {
    let _labelType = labelType(ops.prices, ops.pieces);
    ops._copies = 1;
    ops.type = _labelType.type;
    ops.usedPrices = _labelType.prices;
    ops._copies = 1;
    products.value.push(ops)
    console.log(ops)
  }
}

const agregar = (ops) => {
  console.log(ops);
  let inx = products.value.findIndex(e => e.id == ops.id)
  console.log(inx);
  if (inx >= 0) {
    products.value[inx]._copies++
  } else {
    let _labelType = labelType(ops.prices, ops.pieces);
    ops._copies = 1;
    ops.type = _labelType.type;
    ops.usedPrices = _labelType.prices;
    ops._copies = 1;
    products.value.push(ops)
    console.log(ops)
  }
}

const delrow = (row) => {
  let inx = products.value.findIndex(e => e.id == row.id)
  products.value.splice(inx, 1)
}

const delTable = () => {
  products.value = []
  deltb.value.state = false
}

const clickFile = () => {
  inputFile.value.click()
}

const readFile = async () => {
  let inputFile = document.getElementById("inputFile").files[0];
  let workbook = new ExcelJS.Workbook();
  let codesToSend = [];
  let diference = [];
  let convert = 0;


  workbook.xlsx.load(inputFile).then((data) => {
    // console.log(data)
    let worksheet = workbook.worksheets[0];


    let column = worksheet.getColumn("A");
    column.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      // console.log(cell.value)
      cell.value ? codesToSend.push(cell.value) : null;
    });
    diference = codesToSend.filter((item, pos, self) => {
      return self.indexOf(item) == pos;
    });
    // console.log(codesToSend.length)
    if (codesToSend.length) {
      let data = { codes: codesToSend, _workpoint: VDB.session.store.id_viz };
      console.log(data)
      // wndImportJSON.wndTotal  = codesToSend.length;
      $q.loading.show({ message: "Procesando archivo, espera.." });

      dbproduct.getMassive(data)
        .then((success) => {
          // console.log(success.data)
          let resp = success.data;
          let addeds = 0;
          let _data = checkPrices(resp);
          resp.fails.notFound.map(e => wndImportJSON.value.wndNotExist.push(e))
          wndImportJSON.value.wndGetRows = _data.add.length;
          wndImportJSON.value.state = !wndImportJSON.value.state;
          wndImportJSON.value.wndGetAdded = _data.add;
          wndImportJSON.value.wndNoDataFound = _data.notFound;
          if (wndImportJSON.value.wndNoDataFound.length > 0) {
            let long = wndImportJSON.value.wndNoDataFound.length;
            wndImportJSON.value.message = long <= 1 ? "El producto no contiene precios." : "Los productos no contienen precios."
          }
          _data.add.map((item) => {
            let _labelType = labelType(item.prices, item.pieces);
            item._copies = 1;
            item.type = _labelType.type;
            item.usedPrices = _labelType.prices;
            products.value.push(item);
            // this.labelsPage.unshift(item);
            // this.add(item);
            // this.wndImport.goals.unshift(item);
            addeds++;
          });

          //al menos una etiqueta fue agregada, y no hay errores
          if (
            addeds &&
            !resp.fails.notFound.length &&
            diference.length == codesToSend.length
          ) {
            $q.notify({
              message: `Etiquetas generadas: ${addeds}`,
              color: "positive",
              icon: "done",
              timeout: 1000,
            });
            // this.updateCacheLabels();
          } else {
            convert = codesToSend.length - diference.length;
            wndImportJSON.value.messageRepeat = convert <= 1 ? `${convert} producto se repitio. Favor de validar su documento antes de subirlo.` : `${convert} productos se repitieron. Favor de validar su documento antes de subirlo.`
            // this.updateCacheLabels();
          }

          console.log(wndImportJSON.value)

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

const labelType = (_prices, ipack) => {
  let prices = [..._prices];
    prices.sort((a, b) => a.pivot._type - b.pivot._type);
    console.log(prices);
  const centro = prices.find(e => e.pivot._type == 4);
  const menudeo = prices.find(e => e.pivot._type == 1);
  if (centro.pivot.price == menudeo.pivot.price) {
    let _prices_ = {
      id: 0,
      alias: "OFERTA",
      name: "Oferta",
      pivot: { price: prices[0].pivot.price },
      used: true,
    };
    console.log('oferta')
    return { type: "off", prices: [_prices_] };

  } else {
    console.log('estandar')
    return {
      type: "std",
      prices: prices,
    }


  }
}

const colorLabel = (type) => {
  switch (type) {
    case "off":
      return "orange-9";
      break;
    case "std":
      return "green-9";
      break;
  }

}

const obtLocations = async () => {
  if (typeBus.value.val.id == 2) {
    $q.loading.show({ message: 'Obteniendo Secciones' })
    const resp = await locationsApi.index(VDB.session.store.id_viz)
    if (resp.fail) {
      console.log(resp);
    } else {
      console.log(resp)
      sections.value = resp
    }
    $q.loading.hide()
  }
}

const obtenerProductsSection = async (nivel) => {
  $q.loading.show({message:'Obteniendo Productos'})
  let data = {
    section: nivel.selected,
    workpoint: VDB.session.store.id_viz,
    update: updatedHoy.value
  }
  const resp = await locationsApi.obtProductSections(data);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    let produ = { products: resp };
    if (produ.products.length > 0) {
      let _data = checkPrices(produ);
      _data.add.map((item) => {
        let inx = products.value.findIndex(e => e.id == item.id);
        if (inx >= 0) {
          products.value[inx]._copies++;
        } else {
          let _labelType = labelType(item.prices, item.pieces);
          item._copies = 1;
          item.type = _labelType.type;
          item.usedPrices = _labelType.prices;
          products.value.push(item);
        }
      });
      $q.loading.hide();
    } else {
      $q.loading.hide();
      $q.notify({ message: 'No Hay Articulos Ubicados x(', type: 'negative', position: 'center', icon: 'mood_bad' })
    }
  }
}

watch(
  () => products.value,
  (val) => {
    localStorage.setItem('applabels', JSON.stringify(val))
  },
  { deep: true }
)

onMounted(() => {
  const savedlabel = localStorage.getItem('applabels')
  if (savedlabel) {
    products.value = JSON.parse(savedlabel)
  }
  // window.addEventListener('keydown', handleKeyDown)
})
onBeforeUnmount(() => {
  // window.removeEventListener('keydown', handleKeyDown)
})

</script>
