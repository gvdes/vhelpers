<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title />
      <q-separator spaced inset vertical dark />
      <q-btn flat round dense icon="upload_file" size="lg" @click="clickFile" title="Subir Archivo" />
      <q-btn flat round dense icon="download" size="lg" @click="downloadFile(dataResponse.data)" title="Descargar Archivo"
        :disable="dataResponse.data.length == 0" />
    </q-toolbar>
    <!-- <q-table v-if="dataResponse.state" :rows="dataResponse.data" :columns="table.columns" /> -->
    <q-table v-if="dataResponse.state" :rows="dataResponse.data" :columns="table.columns" />

    <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import { useQuasar } from 'quasar';
import dayjs from 'dayjs';
import productApi from 'src/API/productsApi.js';
import { useVDBStore } from 'stores/VDB';
import { useProductStore } from 'stores/ProductsStore';

const $q = useQuasar();
const VDB = useVDBStore();
const layoutProduct = useProductStore();
layoutProduct.setTitle('Pedido Proveedor');


const inputFile = ref(null);
const data = ref([]);
const dataResponse = ref({
  state: false,
  data: []
});



const table = ref({
  columns: [
    { name: 'code', label: 'Codigo', field: r => r.code, sortable: true, align: 'left' },
    { name: 'description', label: 'Descripcion', field: r => r.description, sortable: true, align: 'left' },
    { name: 'barcode', label: 'CB', field: r => r.barcode, sortable: true, align: 'left' },
    { name: 'section', label: 'Seccion', field: r => r.category?.familia?.seccion?.name, sortable: true, align: 'left' },
    { name: 'family', label: 'Familia', field: r => r.category?.familia?.name, sortable: true, align: 'left' },
    { name: 'category', label: 'Categoria', field: r => r.category?.name, sortable: true, align: 'left' },
    { name: 'pxc', label: 'PXC', field: r => r.pieces, sortable: true, align: 'left' },
    { name: 'salesant', label: 'Venta 2024', field: r => r.salesant, sortable: true, align: 'left' },
    { name: 'purchases', label: 'Compra', field: r => r.compras, sortable: true, align: 'left' },
    { name: 'sales', label: 'Venta', field: r => r.sales, sortable: true, align: 'left' },
    { name: 'stock', label: 'Stock', field: r => r.stock, sortable: true, align: 'left' },
    { name: 'ventstock', label: 'Venta+Stock', field: r => r.ventstock, sortable: true, align: 'left' },
    { name: 'diference', label: 'Diferencia', field: r => r.dif, sortable: true, align: 'left' },
    { name: 'cedis', label: 'Cedis', field: r => r.stockCedis, sortable: true, align: 'left' },
    { name: 'texcoco', label: 'Texcoco', field: r => r.stockTexcoco, sortable: true, align: 'left' },
    { name: 'stockcedis', label: 'Stock Cedis', field: r => r.stocksCed, sortable: true, align: 'left' },
    { name: 'min', label: 'Min', field: r => r.min, sortable: true, align: 'left' },
    { name: 'max', label: 'Max', field: r => r.max, sortable: true, align: 'left' },
    { name: 'faltantes', label: 'Faltantes', field: r => r.faltantes, sortable: true, align: 'left' },
    { name: 'pedir', label: 'Pedir', field: r => r.pedir, sortable: true, align: 'left' },
    { name: 'apartado', label: 'Apartado', field: r => r.invProvider, sortable: true, align: 'left' },
  ]
})

const clickFile = () => {
  inputFile.value.click();
};

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
      let data = { codes: Diferencia };
      $q.loading.show({ message: "Procesando archivo, espera.." });
      console.log(data)
      const resp = await productApi.getReportProvider(data)
      if (resp.fail) {
        console.log(resp)
      } else {
        console.log(resp)
        dataResponse.value.data = resp.map(r => {
          const cedis = r.stocks?.find(s => s.id === 1)?.pivot || {}
          const texcoco = r.stocks?.find(s => s.id === 2)?.pivot || {}
          const piezas = Number(r.pieces || 1)
          const salesant = Math.round(r.SalesSubYear / r.pieces)
          const compras = Math.round(r.PurchaseYear / r.pieces)
          const sales = Math.round(r.SalesYear / r.pieces)
          const stock = Math.round(r.SumStock / r.pieces)
          const ventstock = (Number(sales) + Number(stock))
          const diference = (Number(salesant) - Number(ventstock))
          const stockCedis = Math.round((cedis.stock ?? 0) / piezas)
          const stockTexcoco = Math.round((texcoco.stock ?? 0) / piezas)
          const stocksCed = (Number(stockCedis) + Number(stockTexcoco))
          const min = Math.round((cedis.min ?? 0) / piezas)
          const max = Math.round((cedis.max ?? 0) / piezas)
          const dif = Number(salesant) - Number(ventstock)
          const diferentsProducts = (Number(salesant) <= 8 && Number(stocksCed) <= 8 && Number(Number(stocksCed) <= Number(min) ? Number(max) - Number(stocksCed) : 0) == 0) ? 10 : 0
          const faltantes = Number(stocksCed) <= Number(min) ? Number(max) - Number(stocksCed) : diferentsProducts;
           const pedir = (Number(salesant) <= 8 && Number(stocksCed) <= 8 && Number(Number(faltantes) <= r.invProvider ? Number(faltantes) : r.invProvider) == 0)  ? 10 : Number(faltantes) <= r.invProvider ? Number(faltantes) : r.invProvider
          // const pedir =  Number(faltantes) <= r.invProvider ? Number(faltantes) : r.invProvider

          return {
            ...r,
            salesant,
            compras,
            sales,
            stock,
            ventstock,
            diference,
            stockCedis,
            stockTexcoco,
            stocksCed,
            min,
            max,
            dif,
            faltantes,
            pedir
          }
        })
        dataResponse.value.state = true
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

const downloadFile = (datosExport) => {
  console.log(datosExport)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(`Reporte`);
  const columns = table.value.columns.map(col => ({
    name: col.name,
    filterButton: true,
  }))
  const rows = datosExport.map(row =>
    table.value.columns.map(col => {
      try {
        return typeof col.field === 'function' ? col.field(row) : row[col.field]
      } catch (e) {
        return ''
      }
    })
  )
  worksheet.addTable({
    name: `ReporteAlta`,
    ref: 'A1',
    headerRow: true,
    style: { showRowStripes: true },
    columns: table.value.columns.map(col => ({ name: col.label, filterButton: true })),
    rows: rows
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
</script>
