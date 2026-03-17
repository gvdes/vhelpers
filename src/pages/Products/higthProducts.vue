<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
      </q-toolbar-title>
      <!-- <q-btn flat round dense icon="download" class="q-mr-xs" size="lg" title="Descargar Archivo" -->
        <!-- :disable="data.length == 0" /> -->
      <q-separator spaced inset vertical dark />
      <q-btn flat round dense icon="upload_file" size="lg" @click="clickFile" title="Subir Archivo"
        :disable="documentHigh.state" />
      <q-separator spaced inset vertical dark />
      <q-btn icon="add" @click="addDoc.state = !addDoc.state" title="Crear Documento" flat round dense size="lg"
        :disable="documentHigh.state" />
    </q-toolbar>
    <q-separator spaced inset vertical dark />
    <q-table :rows="data" :columns="table.columns">
      <template v-slot:top v-if="documentHigh.state">
        <div>
          <div class="text-caption"> {{ documentHigh.autor.staff.complete_name }} <q-separator /> {{ documentHigh.date
          }}
          </div>
          <div class="text-bold"> {{ documentHigh.nameDoc }} </div>
        </div>

        <q-space />
        <q-btn color="primary" icon="inventory" flat @click="mosformProduct = !mosformProduct" />
        <q-btn color="primary" icon="cloud_sync" flat @click="sendProducts" />

      </template>
    </q-table>
    <q-dialog v-model="mosformProduct" persistent position="right" full-height>
      <formProduct :documentHigh="documentHigh" @closePopup="cancel" @addingProduct="addProduct" />
    </q-dialog>



    <q-dialog v-model="addDoc.state" persistent>
      <q-card>
        <q-card-section class="text-bold text-h6">
          Nombre de el nuevo Documento
        </q-card-section>
        <q-card-section>
          <q-input v-model="addDoc.val" type="text" label="Nombre" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Crear" color="primary" @click="addDocument" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="errores.state" persistent>
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-h6 text-center text-bold">
          Errores de Archivo
        </q-card-section>
        <q-card-section>
          <q-table :rows="errores.data" :columns="errores.columns" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dataResponse.state" persistent>
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section class="text-center text-bold text-h6">
          Insertados Base {{ dataResponse.data.mysql.insert.goal.length }}
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col">
              <span class="text-center text-bold">Correcto</span>
              <q-separator spaced inset vertical dark />
              <q-list bordered>
                <q-item v-for="(sucg, index) in dataResponse.data.sucursales.insert.goal" :key="index">
                  <q-item-section>
                    <q-item-label caption>Sucursal</q-item-label>
                    <q-item-label>{{ Object.keys(sucg)[0] }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Bien</q-item-label>
                    <q-item-label :title="`${sucg[Object.keys(sucg)[0]].insertados.goals?.join('/')}`">{{ sucg[Object.keys(sucg)].insertados.goals.length }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Error</q-item-label>
                    <q-item-label :title="`${sucg[Object.keys(sucg)[0]].insertados.fails?.join('/')}`">{{ sucg[Object.keys(sucg)].insertados.fails.length }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <q-separator spaced inset vertical dark />
            <div class="col">
              <span class="text-center text-bold">Errores</span>
              <q-separator spaced inset vertical dark />
              <q-list bordered>
                <q-item v-for="(sucf, index) in dataResponse.data.sucursales.insert.fails" :key="index">
                 <q-item-section>
                    <q-item-label caption>Sucursal</q-item-label>
                    <q-item-label>{{ Object.keys(sucf)[0] }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Sucursal</q-item-label>
                    <q-item-label>{{ Object.values(sucf)[0] }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="reload" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
  <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
</template>

<script setup>
import { useProductStore } from 'stores/ProductsStore';
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useVDBStore } from 'stores/VDB';
import { useRoute, useRouter } from 'vue-router';
import formProduct from 'components/Products/formProduct.vue'
import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import { useQuasar, date } from 'quasar';
import { $sktRestock } from 'boot/socket';
import productApi from 'src/API/productsApi.js';
const VDB = useVDBStore();
const $q = useQuasar();
const layoutProduct = useProductStore();
layoutProduct.setTitle('Alta Productos')
const mosformProduct = ref(false);

const inputFile = ref(null)
const data = ref([]);
const dataResponse = ref({
  state: false,
  data: null,
});
const errores = ref({
  data: [],
  state: false,
  columns: [
    { name: 'row', label: 'Linea', field: r => r.row, align: 'center' },
    { name: 'code', label: 'Codigo', field: r => r.code, align: 'left' },
    { name: 'field', label: 'Campo', field: r => r.field, align: 'left' },
    { name: 'value', label: 'Valor', field: r => r.value, align: 'left' },
  ]
})
const addDoc = ref({
  state: false,
  val: null
})

const table = ref({
  columns: [
    { name: 'code', label: 'Codigo', field: r => r.code, align: 'left' },
    { name: 'cb', label: 'CB', field: r => r.cb, align: 'left' },
    { name: 'short_code', label: 'CCO', field: r => r.short_code, align: 'left' },
    { name: 'description', label: 'Descripcion', field: r => r.description, align: 'left' },
    { name: 'section', label: 'Seccion', field: r => r.section.alias, align: 'left' },
    { name: 'family', label: 'Familia', field: r => r.familia.alias, align: 'left' },
    { name: 'category', label: 'Categoria', field: r => r.categoria.alias, align: 'left' },
    { name: 'provider', label: 'Proveedor', field: r => r.provider.name, align: 'left' },
    { name: 'reference', label: 'Referencia', field: r => r.reference, align: 'left' },
    { name: 'makers', label: 'Fabricante', field: r => r.makers.name, align: 'left' },
    { name: 'cost', label: 'Costo', field: r => r.cost, align: 'left' },
    { name: 'pxc', label: 'PXC', field: r => r.pxc, align: 'left' },
    { name: 'nluz', label: 'NLUZ', field: r => r.nluces, align: 'left' },
    { name: 'unit_measures', label: 'UMC', field: r => r.umc.name, align: 'left' },
    { name: 'resurtible', label: 'P.Resurtible', field: r => r.pr, align: 'left' },
    { name: 'person', label: 'MN / P', field: r => r.mnp?.large, align: 'left' },
  ]
})

const documentHigh = ref({
  state: false,
  autor: VDB.session.credentials,
  nameDoc: null,
  date: null,
})

const clickFile = () => {
  inputFile.value.click();
}

const readFile = async () => {
  $q.loading.show({ message: 'Revisando Archivo' })
  const inputFile = document.getElementById("inputFile").files[0];
  const workbook = new ExcelJS.Workbook();
  const headerMap = {
    'CODIGO': 'code',
    'CB': 'cb',
    'FAMILIA': 'familia',
    'DESCRIPCION': 'description',
    'CODIGO CORTO': 'short_code',
    'PROVEEDOR': 'provider',
    'REFERENCIA': 'reference',
    'FABRICANTE': 'makers',
    'COSTO': 'cost',
    'PXC': 'pxc',
    'CATEGORIA': 'categoria',
    '#LUCES': 'nluces',
    'UNIDA MED COMPRA': 'umc',
    'PRO RES': 'pr',
    'MEDIDAS NAV': 'mnp'
  };

  await workbook.xlsx.load(inputFile);
  documentHigh.value.state = true;
  documentHigh.value.nameDoc = inputFile.name;
  documentHigh.value.date = dayjs().format('YYYY-MM-DD HH:mm:ss');

  const worksheet = workbook.worksheets[0];
  const rows = worksheet.getRows(1, worksheet.rowCount);
  if (!rows) return;
  let headers = [];
  const allCodes = [];
  const allBarcodes = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowValues = row.values.slice(1);
    const isEmptyRow = rowValues.every(cell => cell == null || cell.toString().trim() === '');
    if (isEmptyRow) continue;
    if (i === 0) {
      headers = rowValues.map(h => h?.toString().trim());
      continue;
    }
    const codeIndex = headers.findIndex(h => headerMap[h] === 'code');
    const cbIndex = headers.findIndex(h => headerMap[h] === 'cb');
    if (rowValues[codeIndex]) allCodes.push(rowValues[codeIndex]);
    if (rowValues[cbIndex]) allBarcodes.push(rowValues[cbIndex]);
  }
  const validationResults = await productApi.checkCodesBatch({
    codes: allCodes,
    barcodes: allBarcodes
  });

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const rowValues = row.values.slice(1);
    const dataline = i;
    const isEmptyRow = rowValues.every(cell => cell == null || cell.toString().trim() === '');
    if (isEmptyRow) continue;
    const rowObj = {
      code: null,
      cb: null,
      short_code: null,
      description: null,
      categoria: null,
      familia: null,
      section: null,
      provider: null,
      reference: null,
      makers: null,
      cost: 0,
      pxc: null,
      nluces: null,
      umc: null,
      pr: null,
      mnp: null
    };

    let hasError = false;
    let familiaObj = null;
    let categoriaObj = null;
    let currentCode = null;
    let shortCode = null;

    for (let index = 0; index < rowValues.length; index++) {
      const cell = rowValues[index];
      const headerName = headers[index];
      const mappedKey = headerMap[headerName];
      if (!mappedKey) continue;

      let value = cell;

      if (mappedKey === 'code') {
        currentCode = cell;
        if (cell.length > 13) {
          errores.value.data.push({ row: dataline, field: 'Mayor a 13 dígitos', value: cell, code: currentCode });
          hasError = true;
          break;
        }

        const existcode = validationResults.codes[cell];
        if (!existcode) continue;
        if (existcode.exist) {
          errores.value.data.push({ row: dataline, field: 'Código ya existe', value: cell, code: currentCode });
          hasError = true;
          break;
        }
        shortCode = validationResults.codes[cell].cco
      }

      if (mappedKey === 'cb') {
        if (cell?.length > 13) {
          errores.value.data.push({ row: dataline, field: 'Mayor a 13 dígitos', value: cell, code: currentCode });
          hasError = true;
          break;
        }

        const exist = validationResults.barcodes[cell];
        if (exist) {
          errores.value.data.push({ row: dataline, field: 'Código de barras ya existe', value: cell, code: currentCode });
          hasError = true;
          break;
        }
      }

      if (mappedKey === 'familia') {
        familiaObj = layoutProduct.categories.find(p => p.alias.toUpperCase() === cell.toUpperCase() && p.root !== null);
        if (!familiaObj) {
          errores.value.data.push({ row: dataline, field: 'familia', value: cell, code: currentCode });
          hasError = true;
          break;
        }
        value = familiaObj;
        const seccionObj = layoutProduct.categories.find(p => p.id === familiaObj.root);
        rowObj.section = seccionObj || null;
      }

      if (mappedKey === 'categoria') {
        categoriaObj = layoutProduct.categories.find(p =>
          p.alias.toUpperCase() === cell.toUpperCase() && familiaObj && p.root === familiaObj.id
        );
        if (!categoriaObj) {
          errores.value.data.push({ row: dataline, field: 'categoria', value: cell, code: currentCode });
          hasError = true;
          break;
        }
        value = categoriaObj;
      }

      if (mappedKey === 'provider') {
        value = layoutProduct.providers.find(p => p.id == cell);
        if (!value) {
          errores.value.data.push({ row: dataline, field: 'provider', value: cell, code: currentCode });
          hasError = true;
          break;
        }
      }

      if (mappedKey === 'makers') {
        value = layoutProduct.makers.find(f => f.id == cell);
        if (!value) {
          errores.value.data.push({ row: dataline, field: 'makers', value: cell, code: currentCode });
          hasError = true;
          break;
        }
      }

      if (mappedKey === 'pr') {
        value = layoutProduct.productRe.find(p => p == cell);
        if (!value) {
          errores.value.data.push({ row: dataline, field: 'pr', value: cell, code: currentCode });
          hasError = true;
          break;
        }
      }

      if (mappedKey === 'cost') {
        value = parseFloat(cell) || 0;
      }

      if (mappedKey === 'mnp') {
        value = { large: cell };
      }

      if (mappedKey === 'umc') {
        value = layoutProduct.unitsMeasure.find(e => e.name.toUpperCase() === cell.toUpperCase());
        if (!value) {
          errores.value.data.push({ row: dataline, field: 'umc', value: cell, code: currentCode });
          hasError = true;
          break;
        }
      }
      rowObj[mappedKey] = value;
      rowObj.short_code = shortCode
    }
    if (!hasError) {
      data.value.push(rowObj);
    }
  }

  console.log("✅ Válidos:", data.value);
  console.warn("❌ Errores:", errores.value.data);
  $q.loading.hide();
  if (errores.value.data.length > 0) {
    errores.value.state = true;
  }
};

const addDocument = () => {
  addDoc.value.state = false
  documentHigh.value.state = true,
    documentHigh.value.nameDoc = addDoc.value.val
  documentHigh.value.date = dayjs().format('YYYY-MM-DD HH:mm:ss')
  mosformProduct.value = true
}

const cancel = () => {
  mosformProduct.value = false;
}
const addProduct = (value) => {
  let inx = data.value.findIndex(e => e.code == value.code);
  if (inx >= 0) {
    $q.notify({ message: 'El Producto ya esta en la lista', type: 'negative', position: 'center' });
  } else {
    data.value.push(value);
  }
}

const sendProducts = async () => {
  $q.loading.show({ message: 'Insertando datos' })
  let sendData = {
    head: documentHigh.value,
    data: data.value
  }
  const resp = await productApi.highProducts(sendData);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    dataResponse.value.state = true
    dataResponse.value.data = resp
    $q.loading.hide();

  }
}

const reload = () => {
window.location.reload()
}
</script>
