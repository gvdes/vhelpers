<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title />
      <q-separator spaced inset vertical dark />
      <q-btn flat round dense icon="upload_file" size="lg" @click="clickFile" title="Subir Archivo"
        :disable="documentHigh.state" />
      <q-btn flat round dense icon="download" size="lg" @click="downloadFile(data)" title="Descargar Archivo"
        :disable="data.length == 0" />

    </q-toolbar>

    <q-table :rows="data" :columns="table.columns">
      <template v-slot:top v-if="documentHigh.state">
        <div>
          <div class="text-caption">
            {{ documentHigh.autor.staff.complete_name }}
            <q-separator />
            {{ documentHigh.date }}
          </div>
          <div class="text-bold"> {{ documentHigh.nameDoc }} </div>
        </div>
        <q-space />
        <q-btn color="primary" icon="cloud_sync" flat @click="sendProducts" />
      </template>
    </q-table>

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

    <q-dialog v-model="dataResponse.state" persistent>
      <q-card style="width: 600px; max-width: 80vw;">
        <q-card-section class="text-center text-bold text-h6">
          Actualizados Base {{ dataResponse.data.mysql.update.goal.length }}
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col">
              <span class="text-center text-bold">Correcto</span>
              <q-separator spaced inset vertical dark />
              <q-list bordered>
                <q-item v-for="(sucg, index) in dataResponse.data.sucursales.update.goal" :key="index">
                  <q-item-section>
                    <q-item-label caption>Sucursal</q-item-label>
                    <q-item-label>{{ Object.keys(sucg)[0] }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Bien</q-item-label>
                    <q-item-label :title="`${sucg[Object.keys(sucg)[0]].actualizados.goals?.join('/')}`">{{
                      sucg[Object.keys(sucg)].actualizados.goals.length }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Error</q-item-label>
                    <q-item-label :title="`${sucg[Object.keys(sucg)[0]].actualizados.fails?.join('/')}`">{{
                      sucg[Object.keys(sucg)].actualizados.fails.length }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <q-separator spaced inset vertical dark />
            <div class="col">
              <span class="text-center text-bold">Errores</span>
              <q-separator spaced inset vertical dark />
              <q-list bordered>
                <q-item v-for="(sucf, index) in dataResponse.data.sucursales.update.fails" :key="index">
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


    <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import ExcelJS from 'exceljs';
import { useQuasar } from 'quasar';
import dayjs from 'dayjs';
import productApi from 'src/API/productsApi.js';
import { useVDBStore } from 'stores/VDB';
import { useProductStore } from 'stores/ProductsStore';

const $q = useQuasar();
const VDB = useVDBStore();
const layoutProduct = useProductStore();
layoutProduct.setTitle('Modificacion de Precios');

const inputFile = ref(null);
const data = ref([]);
const dataErrors = ref({
  data: [],
  state: false
});
const dataResponse = ref({
  state: false,
  data: null,
});

const documentHigh = ref({
  state: false,
  autor: VDB.session.credentials,
  nameDoc: null,
  date: null,
});

const table = ref({
  columns: [
    { name: 'code', label: 'Código', field: 'code', align: 'left' },
    { name: 'description', label: 'Descripción', field: 'description', align: 'left' },
    { name: 'section', label: 'Section', field: 'section', align: 'left' },
    { name: 'family', label: 'Familia', field: 'family', align: 'left' },
    { name: 'category', label: 'Categoria', field: 'category', align: 'left' },
    { name: 'priceFamil', label: 'PFamilia', field: 'familia', align: 'left' },
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

const clickFile = () => {
  inputFile.value.click();
};

const readFile = async () => {
  $q.loading.show({ message: 'Cargando Archivo' })
  data.value = [];
  dataErrors.value = [];

  const file = document.getElementById("inputFile").files[0];
  const workbook = new ExcelJS.Workbook();

  const headerMap = {
    'MODELO': 'code',
    'FAMILIA': 'familia',
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
  dataErrors.value.data = enrichedErrors;
  if (dataErrors.value.data.length > 0) {
    dataErrors.value.state = true
  }
  documentHigh.value.state = true;
  documentHigh.value.nameDoc = file.name;
  documentHigh.value.date = dayjs().format('YYYY-MM-DD HH:mm:ss');
  $q.loading.hide()
};


const sendProducts = async () => {
  $q.loading.show({ message: 'Insertando datos' });
  const transformed = data.value.map(item => ({
    _product: item.id,
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
  console.log(payload)
  const resp = await productApi.highPrices(payload);
  console.log(resp)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    dataResponse.value.state = true
    dataResponse.value.data = resp
    $q.notify({message:'Productos Actualizados',type:'positive',position:'bottom'})
    $q.loading.hide();
  }

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
    name: `ReporteAlta`,
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

const reload = () => {
  window.location.reload()
}
</script>
