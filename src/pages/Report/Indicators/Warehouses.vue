<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        ALMACENES
      </q-toolbar-title>
    </q-toolbar>
    <q-separator />
    <q-card class="my-card">
      <q-card-section class="row">
        <q-select class="col" v-model="categories.seccion.val" :options="sections" label="Seccion" filled dense
          option-label="name" multiple use-chips />
        <q-separator spaced inset vertical dark />
        <q-select class="col" v-model="categories.familias.val" :options="families" label="Familia" filled dense
          option-label="name" multiple use-chips :disable="categories.seccion.val.length == 0" />
        <q-separator spaced inset vertical dark />
        <q-select class="col" v-model="categories.categories.val" :options="caty" label="Categoria" filled dense
          option-label="name" multiple use-chips
          :disable="categories.seccion.val.length == 0 || categories.familias.val.length == 0" />
        <q-separator spaced inset vertical dark />
        <q-btn color="primary" :label="categories.seccion.val.length > 0 ? 'Obtener' : 'Todos'" flat
          @click="getReport" />
      </q-card-section>
    </q-card>
    <q-separator spaced inset vertical dark />
    <q-table :rows="report" :pagination="table.pagination" :loading="loading" :columns="columns">
      <template v-slot:top-right>
        <q-btn :disable="report.value" color="primary" icon="download" flat @click="exportData" />
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import reportApi from 'src/API/reportApi.js';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref, onMounted, watch } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import dayjs from 'dayjs';


const VDB = useVDBStore();
const $q = useQuasar();

const columns = ref([])

const categories = ref({
  all: [],
  seccion: {
    val: [],
  },
  familias: {
    val: [],
  },
  categories: {
    val: [],
  }
})

const loading = ref(false)
const report = ref([])

const table = computed(() => ({
  pagination: {
    rowsPerPage: 10,
  },
  // columns: [
  //   { name: 'code', label: 'CODIGO', field: r => r.code, align: 'left' },
  //   { name: 'description', label: 'DESCRIPCION', field: r => r.description, align: 'left' },
  //   { name: 'barcode', label: 'CB', field: r => r.barcode, align: 'left' },
  //   { name: 'section', label: 'SECCION', field: r => r.category.familia.seccion.name, align: 'left' },
  //   { name: 'family', label: 'FAMILIA', field: r => r.category.familia.name, align: 'left' },
  //   { name: 'category', label: 'CATEGORIA', field: r => r.category.name, align: 'left' },
  //   { name: 'mennav', label: 'MEDNAV/PERS', field: r => r.large, align: 'left' },
  //   { name: 'provider', label: 'PROVEEDOR', field: r => r.providers.name, align: 'left' },
  //   { name: 'maker', label: 'FABRICANTE', field: r => r.makers?.name, align: 'left' },
  //   { name: 'pxc', label: 'PXC', field: r => r.pieces, align: 'center' },
  //   {
  //     name: 'purchases', label: 'COMPRAS', field: r => r.PurchaseYear, align: 'center'
  //   },
  //   {
  //     name: 'purchasesPXC', label: 'COMPRAS PXC ', field: r => Number(Number(r.PurchaseYear) / Number(r.pieces)).toFixed(2), align: 'center'
  //   },
  //   {
  //     name: `sales${Number(dayjs().format('YYYY')) - 1}`, label: `VENTAS ${dayjs().format('YYYY') - 1}`, field: r => r.SalesSubYear, align: 'center'
  //   },
  //   {
  //     name: `sales${Number(dayjs().format('YYYY')) - 1} PXC`, label: `VENTAS ${dayjs().format('YYYY') - 1} PXC`, field: r => Number(Number(r.SalesSubYear) / Number(r.pieces)).toFixed(2), align: 'center'
  //   },
  //   {
  //     name: `sales${dayjs().year}`, label: `VENTAS ${dayjs().format('YYYY')}`, field: r => r.SalesYear, align: 'center'
  //   },
  //   {
  //     name: `sales${dayjs().year}`, label: `VENTAS ${dayjs().format('YYYY')}`, field: r => Number(Number(r.SalesYear) / Number(r.pieces)).toFixed(2), align: 'center'
  //   },
  //   {
  //     name: 'stock', label: 'STOCK', field: r => r.SumStock, align: 'center'
  //   },
  //   {
  //     name: 'stock PXC', label: 'STOCK PXC', field: r => Number(Number(r.SumStock) / Number(r.pieces)).toFixed(2), align: 'center'
  //   }
  // ]
}))

const baseColumns = [
  { name: 'code', label: 'CODIGO', field: r => r.code, align: 'left' },
  { name: 'description', label: 'DESCRIPCION', field: r => r.description, align: 'left' },
  { name: 'barcode', label: 'CB', field: r => r.barcode, align: 'left' },
  { name: 'section', label: 'SECCION', field: r => r.category.familia.seccion.name, align: 'left' },
  { name: 'family', label: 'FAMILIA', field: r => r.category.familia.name, align: 'left' },
  { name: 'category', label: 'CATEGORIA', field: r => r.category.name, align: 'left' },
  { name: 'mennav', label: 'MEDNAV/PERS', field: r => r.large, align: 'left' },
  { name: 'provider', label: 'PROVEEDOR', field: r => r.providers.name, align: 'left' },
  { name: 'maker', label: 'FABRICANTE', field: r => r.makers?.name, align: 'left' },
  { name: 'pxc', label: 'PXC', field: r => r.pieces, align: 'center' },
  { name: 'purchases', label: 'COMPRAS', field: r => r.PurchaseYear, align: 'center' },
  { name: 'purchasesPXC', label: 'COMPRAS PXC', field: r => Number(r.PurchaseYear / r.pieces).toFixed(2), align: 'center' },
  { name: `sales${dayjs().year() - 1}`, label: `VENTAS ${dayjs().year() - 1}`, field: r => r.SalesSubYear, align: 'center' },
  { name: `sales${dayjs().year() - 1} PXC`, label: `VENTAS ${dayjs().year() - 1} PXC`, field: r => Number(r.SalesSubYear / r.pieces).toFixed(2), align: 'center' },
  { name: `sales${dayjs().year()}`, label: `VENTAS ${dayjs().year()}`, field: r => r.SalesYear, align: 'center' },
  { name: `sales${dayjs().year()} PXC`, label: `VENTAS ${dayjs().year()} PXC`, field: r => Number(r.SalesYear / r.pieces).toFixed(2), align: 'center' },
  { name: 'stock', label: 'STOCK', field: r => r.SumStock, align: 'center' },
  { name: 'stock PXC', label: 'STOCK PXC', field: r => Number(r.SumStock / r.pieces).toFixed(2), align: 'center' }
]

// ahora agregamos las columnas dinámicas por sucursal
const generateColumns = (products) => {
  const sucursales = []
  products.forEach(p => {
    if (p.stocks) {
      p.stocks.forEach(s => {
        if (!sucursales.find(x => x.id === s.id)) {
          sucursales.push(s)
        }
      })
    }
  })

  const sucursalColumns = sucursales.map(s => ({
    name: `s_${s.alias}`,
    label: `${s.alias}`,
    field: r => {
      const stockSucursal = r.stocks?.find(x => x.id === s.id)
      return stockSucursal ? stockSucursal.pivot.stock : 0
    },
    align: 'center'
  }))

  return [...baseColumns, ...sucursalColumns]
}

const sections = computed(() => categories.value.all.filter(e => e.deep == 0))
const families = computed(() => {
  if (categories.value.seccion.val.length > 0) {
    return categories.value.all.filter(e => e.deep == 1 && categories.value.seccion.val.map(e => e.id).includes(e.root))
  } else {
    return categories.value.all.filter(e => e.deep == 1)
  }
})
const caty = computed(() => {
  if (categories.value.seccion.val.length > 0 && categories.value.familias.val.length == 0) {
    let familias = categories.value.all.filter(e => e.deep == 1 && categories.value.seccion.val.map(e => e.id).includes(e.root)).map(e => e.id);
    return categories.value.all.filter(e => e.deep == 2 && familias.includes(e.root))
  } else if (categories.value.familias.val.length > 0) {
    return categories.value.all.filter(e => e.deep == 2 && categories.value.familias.val.map(e => e.id).includes(e.root))
  } else {
    return categories.value.all.filter(e => e.deep == 2)
  }
})


const init = async () => {
  $q.loading.show({ message: 'Obteniendo Familias' })
  const resp = await reportApi.init();
  if (resp.fail) {
    console.log(resp);
    $q.loading.hide()
  } else {
    console.log(resp)
    categories.value.all = resp
    $q.loading.hide();
  }
}

const getReport = async () => {
  $q.loading.show({ message: 'El reporte puede tardar unos minutos' })
  loading.value = true
  let data = {
    sections: categories.value.seccion.val?.map(e => e.id),
    familys: categories.value.familias.val?.map(e => e.id),
    categories: categories.value.categories.val?.map(e => e.id),
  }
  console.log(data);
  const resp = await reportApi.reportWarehouses(data);
  if (resp.fail) {
    console.log(resp);
    $q.notify({ message: 'No se pudo obtener el reporte comuniquese con soporte', type: 'negative', position: 'center' })
  } else {
    console.log(resp);
    report.value = resp;
    columns.value = generateColumns(report.value)
    loading.value = false
    $q.loading.hide()
  }
}

const exportData = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Almacenes');

  const cols = columns.value.map(col => ({
    header: col.label, // encabezado
    key: col.name, // key única
    width: 15
  }));
  worksheet.columns = cols;

  const rows = report.value.map(r => {
    const row = {};
    columns.value.forEach(col => {
      let val;
      if (typeof col.field === 'function') {
        val = col.field(r);
      } else {
        val = r[col.field];
      }
      row[col.name] = val;
    });
    return row;
  });

  const rowsArray = rows.map(row =>
    columns.value.map(col => row[col.name])
  );


  worksheet.addTable({
    name: 'Almacenes', // nombre interno de la tabla
    ref: 'A1', // desde dónde empieza
    headerRow: true,
    style: {
      theme: 'TableStyleMedium9', // estilo
      showRowStripes: true,
    },
    columns: columns.value.map(col => ({
      name: col.label, // encabezado visible
      filterButton: true, // habilitar filtros
    })),
    rows: rowsArray, // filas reales
  });
  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'almacenes.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
init()
</script>
