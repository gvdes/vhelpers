<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>
        ALMACENES
      </q-toolbar-title>
      <!-- <q-btn icon="refresh" flat rounded @click="init" /> -->
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
    <q-table :rows="report" :pagination="table.pagination" :loading="loading" :columns="table.columns" >
      <template v-slot:top-right>
        <q-btn :disable="report.value" color="primary" icon="download"  flat @click="exportData" />
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
const providers = ref({
  opts: [],
  val: null,
})
const makers = ref({
  opts: [],
  val: null,
})
const productFilt = ref('');
const loading = ref(false)
const report = ref([])
const baseColumns = ref([
  { name: 'code', label: 'CODIGO', field: r => r.code, align:'left' },
  { name: 'description', label: 'DESCRIPCION', field: r => r.description, align:'left' },
  { name: 'barcode', label: 'CB', field: r => r.barcode, align:'left' },
  { name: 'section', label: 'SECCION', field: r => r.category.familia.seccion.name, align:'left' },
  { name: 'family', label: 'FAMILIA', field: r => r.category.familia.name, align:'left' },
  { name: 'category', label: 'CATEGORIA', field: r => r.category.name, align:'left' },
  { name: 'mennav', label: 'MEDNAV/PERS', field: r => r.large, align:'left' },
  { name: 'provider', label: 'PROVEEDOR', field: r => r.providers.name, align:'left' },
  { name: 'maker', label: 'FABRICANTE', field: r => r.makers?.name, align:'left' },
  { name: 'pxc', label: 'PXC', field: r => r.pieces, align:'center' },
  {
    name: 'ultfch', label: 'ULT FECH LL', field: r => r.purchases.length > 0 ? dayjs(r.purchases.reduce((a, b) => {
      return new Date(b.created_at) > new Date(a) ? b.created_at : a
    }, 0)).format('YYYY-MM-DD') : null, align:'center'
  },
  {
    name: 'purchases', label: 'COMPRAS', field: r =>
      r.purchases.length > 0
        ? r.purchases.reduce((a, e) => a + Number(e.pivot.amount), 0)
        : null, align:'center'
  },
  {
    name: 'totalpurchases', label: 'TC_$', field: r =>
      r.purchases.length > 0
        ? r.purchases.reduce((a, e) => a + Number(e.pivot.total), 0)
        : null, align:'center'
  },
  {
    name: `sales${Number(dayjs().format('YYYY')) - 1}`, label: `VENTAS ${dayjs().format('YYYY') - 1}`, field: r =>
      r.sales.length > 0
        ? r.sales.reduce((a, e) => {
          return dayjs(e.created_at).format('YYYY') == dayjs().format('YYYY') - 1
            ? a + Number(e.pivot.amount)
            : a;
        }, 0)
        : null, align:'center'
  },
  {
    name: `totalsales${Number(dayjs().format('YYYY')) - 1}`, label: `TV_$ ${dayjs().format('YYYY') - 1}`, field: r =>
      r.sales.length > 0
        ? r.sales.reduce((a, e) => {
          return dayjs(e.created_at).format('YYYY') == dayjs().format('YYYY') - 1
            ? a + Number(e.pivot.total)
            : a;
        }, 0)
        : null, align:'center'
  },
  {
    name: `sales${dayjs().year}`, label: `VENTAS ${dayjs().format('YYYY')}`, field: r =>
      r.sales.length > 0
        ? r.sales.reduce((a, e) => {
          return dayjs(e.created_at).format('YYYY') === dayjs().format('YYYY')
            ? a + Number(e.pivot.amount)
            : a;
        }, 0)
        : null, align:'center'
  },
  {
    name: `totalsales${dayjs().year}`, label: `TV_$ ${dayjs().format('YYYY')}`, field: r =>
      r.sales.length > 0
        ? r.sales.reduce((a, e) => {
          return dayjs(e.created_at).format('YYYY') === dayjs().format('YYYY')
            ? a + Number(e.pivot.total)
            : a;
        }, 0)
        : null, align:'center'
  },
  {
    name: 'stock', label: 'STOCK', field: r => r.stocks.length > 0 ? r.stocks.reduce((a, e) => a + Number(e.pivot.stock) + Number(e.pivot.fdt), 0) : null, align:'center'
  },
  {
    name: 'totalstock', label: 'STOCK_$', field: r =>
      r.stocks.length > 0
        ? r.stocks.reduce((a, e) => a + Number(e.pivot.stock) + Number(e.pivot.fdt), 0) * r.cost
        : null, align:'center'
  },
])

const stockColumns = computed(() => {
  if (report.value.length === 0) return []
  const first = report.value[0]
  return first.stocks.map(stock => ({
    name: stock.alias.toLowerCase(),
    label: stock.alias,
    field: r => {
      const st = r.stocks.find(s => s.alias === stock.alias)
      return st ? Number(st.pivot.stock) +  Number(st.pivot.fdt) : 0
    }, align:'center'
  }))
})

const priceColumns = computed(() => {
  if (report.value.length === 0) return []
  const first = report.value[0]
  return first.prices.map(price => ({
    name: price.alias.toLowerCase(),
    label: price.name,
    field: r => {
      const pr = r.prices.find(p => p.alias === price.alias)
      return pr ? pr.pivot.price : 0
    }, align:'center'
  }))
})



const salesByWorkpointColumns = computed(() => {
  if (report.value.length === 0) return []
  const first = report.value[0]
  const workpoints = []
  report.value.forEach(r => {
    r.sales.forEach(sale => {
      const wp = sale.cash_register?.workpoint
      if (wp && wp.active === 1 && !workpoints.find(w => w.id === wp.id)) {
        workpoints.push(wp)
      }
    })
  })

  return workpoints.map(wp => ({
    name: `sales_${wp.alias}`,
    label: `Ventas ${wp.alias}`, // Nombre de la columna
    field: r => {
      return r.sales.reduce((a, sale) => {
        if (
          sale.cash_register?.workpoint?.id === wp.id &&
          dayjs(sale.created_at).format('YYYY') === dayjs().format('YYYY') // Solo este año
        ) {
          return a + Number(sale.pivot.amount)
        }
        return a
      }, 0)
    }, align:'center'
  }))
})


const table = computed(() => ({
  pagination: {
    rowsPerPage: 10,
  },
  columns: [
    ...baseColumns.value,
    ...stockColumns.value,
    ...salesByWorkpointColumns.value,
    {id:'cost',label:'COSTO', field: r => r.cost},
    ...priceColumns.value
  ]
}))

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
  $q.loading.show({message:'El reporte puede tardar unos minutos'})
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
    $q.notify({message:'No se pudo obtener el reporte comuniquese con soporte',type:'negative',position:'center'})
  } else {
    console.log(resp);
    report.value = resp;
    loading.value = false
    $q.loading.hide()
  }
}

const exportData = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Almacenes');

  // 1️⃣ Definir las columnas desde tu table.value.columns
  const cols = table.value.columns.map(col => ({
    header: col.label, // encabezado
    key: col.name, // key única
    width: 15
  }));
  worksheet.columns = cols;

  // 2️⃣ Generar las filas con los valores reales
  const rows = report.value.map(r => {
    const row = {};
    table.value.columns.forEach(col => {
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

  // 3️⃣ Convertir las rows en un array de arrays (necesario para addTable)
  const rowsArray = rows.map(row =>
    table.value.columns.map(col => row[col.name])
  );

  // 4️⃣ Agregar la tabla estructurada
  worksheet.addTable({
    name: 'AlmacenesTable', // nombre interno de la tabla
    ref: 'A1', // desde dónde empieza
    headerRow: true,
    style: {
      theme: 'TableStyleMedium9', // estilo
      showRowStripes: true,
    },
    columns: table.value.columns.map(col => ({
      name: col.label, // encabezado visible
      filterButton: true, // habilitar filtros
    })),
    rows: rowsArray, // filas reales
  });

  // 5️⃣ Ajustar el ancho de columnas automáticamente
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

  // 6️⃣ Descargar Excel
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
