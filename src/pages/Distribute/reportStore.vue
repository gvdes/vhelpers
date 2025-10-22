<template>
  <q-page padding>
    <div class="text-center text-h6 text-bold">Reporte {{
      fechas && fechas.from
        ? `Del ${fechas.from} a ${fechas.to}`
        : fechas
    }}</div>
    <q-separator spaced inset vertical dark />
    <div class="row">

      <q-btn color="primary" icon="event" @click="date = !date" flat rounded />
      <q-separator spaced inset vertical dark />
      <q-select v-model="workpoints.cedis" :options="workpoints.workpoints" label="Cedis" class="col"
        option-label="name" :disable="true" outlined />
      <q-separator spaced inset vertical dark />

      <q-select disable v-model="workpoints.val" :options="workpoints.workpoints" label="Sucursal" class="col"
        option-label="name" outlined :option-disable="(i) => i.id == 1" @update:model-value="getData" />
    </div>
    <q-separator spaced inset vertical dark />

    <q-table title="Comparativo" :rows="respData" :filter="table.filter" :loading="table.loading"
      :columns="table.columns">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-separator spaced inset vertical dark />
        <q-btn color="primary" icon="ios_share" @click="exportTable" flat :disable="respData.length <= 0" />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td>
            <q-btn size="sm" color="primary" round dense @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="50%">
            <q-table :rows="props.row.comparaciones" :columns="table.columnsSub" />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="date">
      <q-card class="my-card">
        <q-card-section>
          <div class="q-pa-md">
            <div class="q-pb-sm">
            </div>
            <q-date v-model="fechas" range minimal />
          </div>
        </q-card-section>
        <q-card-section>
          <q-card-actions align="right">
            <q-btn flat icon="close" color="negative" @click="date = !date" />
            <q-btn flat icon="check" color="positive" @click="buscas" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
// import restockApi from 'src/API/RestockApi.js';
import { Loading, useQuasar } from 'quasar';
import { useRestockStore } from 'stores/Restock';
import { useRoute, useRouter } from 'vue-router';
import { useVDBStore } from 'stores/VDB';
import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import RestockApi from 'src/API/RestockApi.js';


const $q = useQuasar();
const $route = useRoute();
const $restockStore = useRestockStore();
const VDB = useVDBStore()

const workpoints = ref({
  workpoints: [],
  cedis: null,
  val: null
})
const date = ref(false);

const fechas = ref({ from: null, to: null });

const match = ref({
  salidas: null,
  entradas: null
})

const respData = ref([])

const table = ref({
  columns: [
    { name: 'partition', label: 'Particion', field: r => r.id, sortable: true, align: 'left' },
    { name: 'status', label: 'Estado', field: r => r.status.name, sortable: true, align: 'left' },
    { name: 'invoice', label: 'Salida', field: r => r.invoice, sortable: true, align: 'left' },
    { name: 'invoiceReceived', label: 'Entrada', field: r => r.invoice_received, sortable: true, align: 'left' },
    { name: 'warehouse', label: 'Almacen', field: r => r._warehouse, sortable: true, align: 'left' },
  ],
  rows: [],
  filter: '',
  loading: false,
  columnsSub: [
    { name: 'invoice', label: 'Salida', field: r => r.SALIDA_FACTURA, sortable: true, align: 'left' },
    { name: 'code', label: 'Codigo', field: r => r.CODIGO, sortable: true, align: 'left' },
    // { name: 'description', label: 'Descripcion', field: r => r.DESCRIPCION, sortable: true, align: 'left' },
    { name: 'amount', label: 'Cantidad', field: r => r.CANTIDAD, sortable: true, align: 'left' },
    { name: 'codevalid', label: 'CodigoI', field: r => r.codigoIGUAL, sortable: true, align: 'left' },
    { name: 'amountvalid', label: 'CantiI', field: r => r.CANTIDADIGUAL, sortable: true, align: 'left' },
    { name: 'invoicereceived', label: 'Entrada', field: r => r.ENTRADA_FACTURA, sortable: true, align: 'left' },
    { name: 'codereceived', label: 'Codigo', field: r => r.ENTRADA_CODIGO, sortable: true, align: 'left' },
    // { name: 'descriptionreceived', label: 'Descripcion', field: r => r.ENTRADA_DESCRIPCION, sortable: true, align: 'left' },
    { name: 'amountreceived', label: 'Cantidad', field: r => r.ENTRADA_CANTIDAD, sortable: true, align: 'left' },
  ]
})

const init = async () => {
  $restockStore.setShowLYT(false)
  let date = new Date();
  let fecha = dayjs(date).format("YYYY/MM/DD")
  fechas.value = { from: fecha, to: fecha };
  console.log(fecha);
  const resp = await RestockApi.getStores()
  if (resp.status == 200) {
    console.log(resp.data)
    workpoints.value.workpoints = resp.data
    workpoints.value.val = resp.data.find(e => e.id == VDB.session.store.id)
    workpoints.value.cedis = resp.data.filter(e => e.id == 1)[0]
    getData();
  } else {
    console.log(resp)
  }
}

const getData = async () => {
  table.value.rows = []
  table.value.loading = true;
  $q.loading.show({ message: 'Obteniendo datos' })
  let data = {
    cedis: workpoints.value.cedis,
    sucursal: workpoints.value.val,
    fechas: fechas.value
  }
  console.log(data);
  const resp = await RestockApi.getData(data);
  console.log(resp)
  if (resp.status == 200) {
    console.log(resp.data);
    respData.value = resp.data
    $q.loading.hide()
    table.value.loading = false
    // process()
  } else {
    alert(resp)

  }
}


const buscas = async () => {
  console.log(fechas.value);
  date.value = false;
  table.value.rows = []
  getData();
}

const exportTable = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('SALIDASVSENTRADAS');

  // Encabezados
  const headers = [
    'PARTICION', 'STATUS', 'SALIDA', 'ENTRADA', 'ALMACEN',
    'SALIDA FACTURA', 'SALIDAFECHA', 'REFERENCIA',
    'CODIGO', 'DESCRIPCION', 'CANTIDAD',
    'CODIGOIGUAL', 'CANTIDADIGUAL', 'PRECIOIGUAL', 'TOTALIGUAL',
    'ENTRADA FACTURA', 'ENTRADA SALIDA', 'ENTRADA FECHA',
    'ENTRADA CODIGO', 'ENTRADA DESCRIPCION', 'ENTRADA CANTIDAD'
  ];

  worksheet.addRow(headers);

  // Definir columna de particion como ancho mayor
  worksheet.getColumn(1).width = 15;

  respData.value.forEach((partition) => {
    const products = partition.comparaciones;
    const startRow = worksheet.lastRow.number + 1;

    products.forEach((p) => {
      worksheet.addRow([
        partition.id, // aquí luego combinamos las celdas
        partition.status.name,
        partition.invoice,
        partition.invoice_received,
        partition._warehouse,
        p.SALIDA_FACTURA,
        p.SALIDA_FECHA,
        p.REFERENCIA,
        p.CODIGO,
        p.DESCRIPCION,
        p.CANTIDAD,
        p.codigoIGUAL ? 'VERDADERO' : 'FALSO',
        p.CANTIDADIGUAL ? 'VERDADERO' : 'FALSO',
        p.PRECIOIGUAL ? 'VERDADERO' : 'FALSO',
        p.TOTALIGUAL ? 'VERDADERO' : 'FALSO',
        p.ENTRADA_FACTURA,
        p.ENTRADA_SALIDA,
        p.ENTRADA_FECHA,
        p.ENTRADA_CODIGO,
        p.ENTRADA_DESCRIPCION,
        p.ENTRADA_CANTIDAD
      ]);
    });
    const endRow = worksheet.lastRow.number;
    ['A', 'B', 'C', 'D', 'E'].forEach(col => {
      worksheet.mergeCells(`${col}${startRow}:${col}${endRow}`);
      const cell = worksheet.getCell(`${col}${startRow}`);
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
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
    a.download = `SalidasVSEntradas ${workpoints.value.val.name} ${typeof (fechas.value) == 'object' ? `Del ${fechas.value.from} a ${fechas.value.to}` : fechas.value}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  downloadExcel();
}

init()
</script>
