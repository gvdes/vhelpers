<template>
  <q-page padding>
    <q-table :rows="products" :columns="table.columns" @row-click="viewProduct">
      <template v-slot:top>
        <div class="row  q-col-gutter-sm full-width">
          <div class="col-auto">
            <q-btn color="primary" icon="download" flat round @click="download" title="Descargar Productos Mostrados" />
            <q-btn color="primary" icon="sync" flat round title="Replicar Sucursales">
              <q-menu>
                <q-card class="my-card" style="width: 300px;">
                  <q-card-section>
                    <q-form @submit="sync" class="q-gutter-md">
                      <q-input v-model="form.date" type="date" label="Fecha" />
                      <q-separator spaced inset vertical dark />
                      <q-select v-model="form.stores" :options="layoutProduct.stores" label="Sucursales" filled dense
                        option-label="name" use-chips multiple emit-value option-value="id" map-options />
                      <div>
                        <q-btn label="Enviar" type="submit" color="primary" outline />
                      </div>
                    </q-form>
                  </q-card-section>
                </q-card>
              </q-menu>
            </q-btn>

          </div>
          <div class="col">
            <q-input v-model="table.filter" dense debounce="300" placeholder="Buscar" filled>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-auto">
            <q-btn color="primary" icon="price_change" flat round @click="clickPrices" title="Subir Precios Masivos" />
          </div>
          <div class="col-auto">
            <q-btn color="primary" icon="add" flat round @click="mosformProduct = !mosformProduct"
              title="Agregar Articulos" />
          </div>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="searhProduct" persistent>
      <q-card style="width: 700px; max-width: 90vw;">
        <q-form @submit.prevent="searching">
          <q-card-section>
            <div class="text-h6 text-bold text-center">Buscar</div>
          </q-card-section>
          <q-card-section>
            <div class="row items-center q-mb-md">
              <div class="text-center q-mr-sm">Buscar en</div>
              <q-select class="col" v-model="query.Campo" :options="table.columns" option-label="label" label="Campo"
                filled dense @update:model-value="resetSearch" />
            </div>
            <div class="row items-center">
              <div class="text-center q-mr-lg">Buscar</div>
              <q-input class="col" v-if="isTextField" v-model="query.val" :label="query.Campo.label" dense filled
                autofocus />
              <q-select class="col" v-else-if="query.Campo.id === 5" v-model="query.val" :options="layoutProduct.states"
                label="Estado" option-label="name" dense filled />
              <q-select class="col" v-else-if="query.Campo.id === 6" v-model="filters.secciones" :options="secciones"
                label="Sección" option-label="name" dense filled />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn flat label="Buscar" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="mosformProduct" persistent backdrop-filter="blur(4px) saturate(150%)"
      :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down">
      <q-card class="my-card">
        <q-bar>
          Articulos
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <newProducts />
      </q-card>
    </q-dialog>

    <q-dialog v-model="mosProduct.state" persistent backdrop-filter="blur(4px) saturate(150%)"
      :maximized="maximizedToggleProduct" transition-show="slide-up" transition-hide="slide-down">
      <q-card>
        <q-bar>
          <span class="text-bold q-ml-md"> {{ mosProduct.val.code }} </span>
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggleProduct = false" :disable="!maximizedToggleProduct">
            <q-tooltip v-if="maximizedToggleProduct" class="bg-white text-primary">Minimizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggleProduct = true" :disable="maximizedToggleProduct">
            <q-tooltip v-if="!maximizedToggleProduct" class="bg-white text-primary">Maximizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <viewPrd :product="mosProduct.val" :status="layoutProduct.states" :providers="layoutProduct.providers"
          :makers="layoutProduct.makers" :attributes="layoutProduct.attributes"
          :categories="layoutProduct.categories" />
      </q-card>
    </q-dialog>

    <q-dialog v-model="documentHigh.state" persistent backdrop-filter="blur(4px) saturate(150%)"
      :maximized="maximizedTogglePrices" transition-show="slide-up" transition-hide="slide-down">
      <q-card class="my-card">
        <q-bar>
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedTogglePrices = false" :disable="!maximizedTogglePrices">
            <q-tooltip v-if="maximizedTogglePrices" class="bg-white text-primary">Minimizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedTogglePrices = true" :disable="maximizedTogglePrices">
            <q-tooltip v-if="!maximizedTogglePrices" class="bg-white text-primary">Maximizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-table :rows="data" :columns="tablePrices.columns">
            <template v-slot:top v-if="documentHigh.state">
              <div>
                <div class="text-caption">
                  {{ documentHigh.autor.nick }}
                  <q-separator />
                  {{ documentHigh.date }}
                </div>
                <div class="text-bold"> {{ documentHigh.nameDoc }} </div>
              </div>
              <!-- <q-space />
              <q-btn color="primary" icon="cloud_sync" flat @click="sendProducts" /> -->
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dataErrors.state" persistent>
      <q-card>
        <q-card-section>
          <q-table :rows="dataErrors.data">
            <template v-slot:top v-if="documentHigh.state">
              <div class="text-bold text-h6 ">
                Errores
              </div>
              <q-space />
              <q-btn color="primary" icon="download" flat @click="downloadFile(dataErrors.data)" />
            </template></q-table>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dataResponse.state">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <q-list bordered>
            <q-item>
              <q-item-section class="text-center text-bold text-h6">
                Sucursal
              </q-item-section>
              <q-item-section class="">
                <q-item-label class="text-center text-bold text-h6">
                  Response
                </q-item-label>
                <q-item-label class="row">
                  <div class="col">IG</div>
                  <div class="col">IF</div>
                  <div class="col">UG</div>
                  <div class="col">UF</div>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-for="(suc, inx) in dataResponse.data.goals">
              <q-item-section class="text-left text-bold">
                {{ suc.sucursal }}
              </q-item-section>
              <q-item-section>
                <q-item-label class="row">
                  <div class="col">{{ suc.response.insertados.goals.length }}</div>
                  <div class="col">{{ suc.response.insertados.fails.length }}</div>
                  <div class="col">{{ suc.response.actualizados.goals.length }}</div>
                  <div class="col">{{ suc.response.actualizados.fails.length }}</div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <div class="text-bold text-center text-h6">ERRORES</div>
          <q-list bordered>
            <q-item v-for="(suc, inx) in dataResponse.data.fails">
              <q-item-section>{{ suc.sucursal }}</q-item-section>
              <q-item-section>{{ suc.response }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
  <input type="file" ref="inputPrices" id="inputPrices" @input="readFile" hidden accept=".xlsx,.xls" />
</template>
<script setup>
import { useProductStore } from 'stores/ProductsStore';
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useVDBStore } from 'stores/VDB';
import { useRoute, useRouter } from 'vue-router';
import newProducts from 'components/Products/newProducts.vue'
import viewPrd from 'components/Products/viewProduct.vue'


import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import { useQuasar, date } from 'quasar';
import { $sktRestock } from 'boot/socket';
import productApi from 'src/API/productsApi.js';
import { formToJSON } from 'axios';
const VDB = useVDBStore();
const $q = useQuasar();
const layoutProduct = useProductStore();
layoutProduct.setTitle('Articulos')
const maximizedToggle = ref(true)
const maximizedToggleProduct = ref(true)
const maximizedTogglePrices = ref(true)

const mosProduct = ref({
  state: false,
  val: null
})
const form = ref({
  date: null,
  stores: []
})
const inputPrices = ref(null)
const searhProduct = ref(true)
const mosformProduct = ref(false)
const products = ref([]);
const mosPriceProduct = ref({
  state: false
})
const documentHigh = ref({
  state: false,
  autor: VDB.session.credentials,
  nameDoc: null,
  date: null,
});
const data = ref([]);
const dataErrors = ref({
  data: [],
  state: false
});
const dataResponse = ref({
  state: false,
  data: null,
});


const query = ref({
  Campo: {
    id: 1,
    name: 'code',
    label: 'CODIGO'
  },
  val: ''
})


const table = ref({
  columns: [
    { id: 1, name: 'code', label: 'CODIGO', field: r => r.code, align: 'center' },
    { id: 2, name: 'short_code', label: 'CODIGO CORTO', field: r => r.short_code, align: 'center' },
    { id: 3, name: 'barcode', label: 'CODIGO DE BARRAS', field: r => r.barcode, align: 'center' },
    { id: 4, name: 'description', label: 'DESCRIPCION', field: r => r.description, align: 'center' },
    { id: 5, name: '_state', label: 'ESTADO', field: r => r.state.name, align: 'center' },
    { id: 6, name: 'section', label: 'SECCION', field: r => r.category?.familia?.seccion?.name, align: 'center' },
  ]
})
const tablePrices = ref({
  columns: [
    { name: 'code', label: 'Código', field: 'code', align: 'left' },
    { name: 'description', label: 'Descripción', field: 'description', align: 'left' },
    { name: 'section', label: 'Section', field: 'section', align: 'left' },
    { name: 'family', label: 'Familia', field: 'family', align: 'left' },
    { name: 'category', label: 'Categoria', field: 'category', align: 'left' },
    { name: 'type', label: 'Tipo', field: r => r.type == 1 ? 'Local' : 'Foraneo', align: 'left' },
    { name: 'cost', label: 'Costo', field: 'cost', align: 'right' },
    { name: 'aaa', label: 'AAA', field: 'aaa', align: 'right' },
    { name: 'centro', label: 'Centro', field: 'centro', align: 'right' },
    { name: 'especial', label: 'Especial', field: 'especial', align: 'right' },
    { name: 'caja', label: 'Caja', field: 'caja', align: 'right' },
    { name: 'docena', label: 'Docena', field: 'docena', align: 'right' },
    { name: 'mayoreo', label: 'Mayoreo', field: 'mayoreo', align: 'right' },
    { name: 'menudeo', label: 'Menudeo', field: 'menudeo', align: 'right' },
  ]
});

const filters = ref({
  secciones: null,
})
const isTextField = computed(() =>
  [1, 2, 3, 4].includes(query.value.Campo.id)
)
const secciones = computed(() =>
  layoutProduct.categories.filter(c => c.deep === 0)
)

const resetSearch = () => {
  query.value.val = ''
  filters.value.secciones = null
  filters.value.familias = null
  filters.value.categorias = null
}

const searching = async () => {
  $q.loading.show({ message: 'Buscando' })
  let value = query.value.val
  if (filters.value.categorias) value = filters.value.categorias.id
  else if (filters.value.familias) value = filters.value.familias.id
  else if (filters.value.secciones) value = filters.value.secciones.id
  else if (value?.id) value = value.id

  const payload = {
    field: query.value.Campo.name,
    value
  }
  console.log(payload)
  const resp = await productApi.searchProd(payload);
  if (resp.fail) {
    console.log(resp.fail)
  } else {
    console.log(resp)
    $q.loading.hide();
    searhProduct.value = false
    products.value = resp
  }

}

const handleKeyDown = (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'b') {
    e.preventDefault()
    if (!$q.dialog.isActive) {
      searhProduct.value = true
    }
  }
}
const viewProduct = (a, b) => {
  mosProduct.value.state = true
  mosProduct.value.val = b
}


const clickPrices = () => {
  inputPrices.value.click();
}

const download = () => {

}
const readFile = async () => {
  // $q.loading.show({ message: 'Cargando Archivo' })
  data.value = [];
  dataErrors.value = [];

  const file = document.getElementById("inputPrices").files[0];
  const workbook = new ExcelJS.Workbook();

  const headerMap = {
    'CODIGO': 'code',
    'TIPO': 'type',
    'COSTO': 'cost',
    'AAA': 'aaa',
    'CENTRO': 'centro',
    'ESPECIAL': 'especial',
    'CAJA': 'caja',
    'DOCENA': 'docena',
    'MAYOREO': 'mayoreo',
    'MENUDEO': 'menudeo',
  };

  await workbook.xlsx.load(file);
  const worksheet = workbook.worksheets[0];
  const rows = worksheet.getRows(1, worksheet.rowCount);
  if (!rows) return;

  let headers = [];
  const productos = [];
  const tempData = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowValues = row.values.slice(1);
    const isEmptyRow = rowValues.every(cell => cell == null || cell.toString().trim() === '');
    if (isEmptyRow) continue;

    if (i === 0) {
      headers = rowValues.map(h => h?.toString().trim());
      continue;
    }

    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      const header = headerMap[headers[j]];
      if (header) {
        let val = rowValues[j];
        if (typeof val === 'string') val = val.trim();
        if (typeof val === 'number') {
          val = header === 'cost' ? parseFloat(val.toFixed(2)) : Math.round(val);
        }
        obj[header] = val ?? null;
      }
    }

    if (obj.code) {
      productos.push(obj.code);
      tempData.push(obj);
    }
  }
  const response = await productApi.lookupProducts({ codes: productos });
  const enrichedData = [];
  const enrichedErrors = [];
  for (const item of tempData) {
    const prodInfo = response.products.find(p => p.code === item.code);

    if (!prodInfo) {
      enrichedErrors.push({ ...item, error: 'Producto no encontrado' });
      continue;
    }

    if (item.menudeo == null && item.mayoreo != null) {
      console.log(prodInfo)
      const fam = prodInfo.category.familia.alias || '';

      if (fam === 'MBP') {
        item.menudeo = item.mayoreo + 20;
      } else if (fam === 'MLB' || fam === 'MPC') {
        item.menudeo = item.mayoreo + 10;
      } else if (item.mayoreo === item.centro) {
        item.menudeo = item.caja;
      } else if (item.mayoreo >= 0 && item.mayoreo <= 49) {
        item.menudeo = item.mayoreo + 5;
      } else if (item.mayoreo >= 50 && item.mayoreo <= 99) {
        item.menudeo = item.mayoreo + 10;
      } else if (item.mayoreo >= 100 && item.mayoreo <= 499) {
        item.menudeo = item.mayoreo + 20;
      } else if (item.mayoreo >= 500 && item.mayoreo <= 999) {
        item.menudeo = item.mayoreo + 50;
      } else if (item.mayoreo >= 1000) {
        item.menudeo = item.mayoreo + 100;
      }
    }

    const enrichedItem = {
      ...item,
      id: prodInfo.id,
      description: prodInfo.description || '',
      section: prodInfo.category.familia.seccion.name || '',
      family: prodInfo.category.familia.name || '',
      category: prodInfo.category.name || '',
    };

    // Validación de precios
    const keys = ['cost', 'aaa', 'centro', 'especial', 'caja', 'docena', 'mayoreo', 'menudeo'];
    let isValid = true;
    for (let i = 0; i < keys.length - 1; i++) {
      const current = enrichedItem[keys[i]];
      const next = enrichedItem[keys[i + 1]];
      if (current != null && next != null && current > next) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      enrichedData.push(enrichedItem);
    } else {
      enrichedErrors.push({ ...enrichedItem, error: 'Validación de precios fallida' });
    }
  }

  data.value = enrichedData;
  console.log(data.value)
  dataErrors.value.data = enrichedErrors;
  if (dataErrors.value.data.length > 0) {
    dataErrors.value.state = true
  }
  documentHigh.value.state = true;
  documentHigh.value.nameDoc = file.name;
  documentHigh.value.date = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const transformed = data.value.map(item => ({
    _product: item.id,
    _type: item.type,
    code: item.code,
    costo: item.cost,
    familia: item.familia,
    prices: {
      7: item.aaa,
      6: item.centro,
      5: item.especial,
      4: item.caja,
      3: item.docena,
      2: item.mayoreo,
      1: item.menudeo
    }
  }));
  const payload = {
    head: documentHigh.value,
    data: transformed
  };
  console.log(payload);
  const resp = await productApi.highPrices(payload);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
  }
  // $q.loading.hide()
};

const downloadFile = (datosExport) => {
  console.log(datosExport)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(`Reporte`);
  const keys = Object.keys(datosExport[0]).map(i => i)
  const columns = keys.map((key, index) => {
    const isLast = index === keys.length - 1;
    return {
      name: key.toUpperCase(),
      filterButton: true,
      totalsRowFunction: isLast ? 'sum' : undefined
    };
  });
  worksheet.addTable({
    name: `ReportePrecios`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows: datosExport.map(row => keys.map(k => row[k]))
  });


  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength; // Ajusta el ancho mínimo y máximo
  });

  const downloadExcel = async () => {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reporte.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  downloadExcel();
}

const sync = async () => {
  $q.loading.show({message:'replicando'})
  console.log(form.value)
  if (form.value.date == null) {
    form.value.date = dayjs().format('YYYY-MM-DD')
  }
  console.log(form.value)
  const resp = await productApi.syncStores(form.value)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    dataResponse.value.state = true
    dataResponse.value.data = resp
    $q.loading.hide()
  }
}


watch(() => filters.value.secciones, () => {
  filters.value.familias = null
  filters.value.categorias = null
})

watch(() => filters.value.familias, () => {
  filters.value.categorias = null
})
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  layoutProduct.setTitle('Articulos')
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

</script>
