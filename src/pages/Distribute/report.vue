<template>
  <q-page padding>
    <div class="text-center text-h6 text-bold">Reporte {{
      fechas && fechas.from
        ? `Del ${fechas.from} a ${fechas.to}`
        : fechas
    }}</div>
    <q-separator spaced inset vertical dark />
    <div class="row">
      <q-btn color="primary" icon="event" @click="date = !date" flat rounded dense />
      <q-separator spaced inset vertical dark />
      <q-select dense v-model="workpoints.cedis" :options="workpoints.workpoints" label="Cedis" class="col"
        option-label="name" :disable="true" outlined />
      <q-separator spaced inset vertical dark />
      <q-select dense v-model="workpoints.val" :options="workpoints.workpoints" label="Sucursal" class="col"
        option-label="name" outlined :option-disable="(i) => i.id == 1" @update:model-value="getData" />
    </div>
    <q-separator spaced inset vertical dark />

    <q-table title="Comparativo" :rows="table.rows" :filter="table.filter">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-separator spaced inset vertical dark />
        <q-btn color="primary" icon="ios_share" @click="exportTable" flat :disable="table.rows.length <= 0" />
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
import restockApi from 'src/API/RestockApi.js';
import { useQuasar } from 'quasar';
import { useRestockStore } from 'stores/Restock';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import RestockApi from 'src/API/RestockApi.js';
const $q = useQuasar();
const $route = useRoute();
const $restockStore = useRestockStore();

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

const table = ref({
  rows: [],
  filter: '',
})

const init = async () => {
  $restockStore.setShowLYT(false)
  let date = new Date();
  let fecha = dayjs(date).format("YYYY/MM/DD")
  fechas.value = { from: fecha, to: fecha };
  console.log(fecha);
  const resp = await restockApi.getStores()
  if (resp.status == 200) {
    console.log(resp.data)
    workpoints.value.workpoints = resp.data
    workpoints.value.cedis = resp.data.filter(e => e.id == 1)[0]
  } else {
    console.log(resp)
  }
}

const getData = async () => {
  table.value.rows = []
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
    match.value.salidas = resp.data.salidas;
    match.value.entradas = resp.data.entradas;
    $q.loading.hide()
    process()
  } else {
    alert(resp)

  }
}


const process = () => {
  $q.loading.show({ message: 'Haciendo Match' })

  match.value.entradas.sort((a, b) => {
    if (b.ARTICULOS !== a.ARTICULOS) {
      return b.ARTICULOS.localeCompare(a.ARTICULOS); // Ordena por codigo
    }
    return b.REFERENCIA.localeCompare(a.REFERENCIA); // Si los codigos son iguales, ordena por factura
  });

  // Ordenar salidas por codigo y luego por factura (de mayor a menor)
  match.value.salidas.sort((a, b) => {
    if (b.ARTICULOS !== a.ARTICULOS) {
      return b.ARTICULOS.localeCompare(a.ARTICULOS); // Ordena por codigo
    }
    return b.PARTICION.localeCompare(a.PARTICION); // Si los codigos son iguales, ordena por factura
  });

  const matchedIndices = new Set();

  // Procesar todas las entradas
  match.value.entradas.forEach(entrada => {
    const salidaCoincidente = match.value.salidas.find((salida, index) => {
      console.log(`P-${salida.PARTICION}`)
      console.log(entrada.REFERENCIA)
      const matchFound = salida.ARTICULOS === entrada.ARTICULOS && `P-${salida.PARTICION}` === entrada.REFERENCIA;
      console.log(matchFound)
      if (matchFound) {

        matchedIndices.add(index); // Marcar el índice como coincidente
      }
      return matchFound;
    });
    if (salidaCoincidente) {
      const totalEntrada = entrada.CANTIDAD * entrada.PRECIO;
      const totalSalida = salidaCoincidente.CANTIDAD * salidaCoincidente.PRECIO;

      const codigoIgual = salidaCoincidente.ARTICULOS === entrada.ARTICULOS;
      const cantidadIgual = salidaCoincidente.CANTIDAD === entrada.CANTIDAD;
      const precioIgual = salidaCoincidente.PRECIO === entrada.PRECIO;
      const totalIgual = totalSalida === totalEntrada;

      table.value.rows.push({
        SALIDA: salidaCoincidente.FACTURA,
        FECHA: salidaCoincidente.FECHAYHORA,
        REFERENCIA: salidaCoincidente.REFERENCIA,
        CLIENTE: salidaCoincidente.NOMBRECLIENTE,
        CODIGO: salidaCoincidente.ARTICULOS,
        DESCRIPCION: salidaCoincidente.DESCRIPCION,
        CANTIDAD: Number(salidaCoincidente.CANTIDAD).toFixed(2),
        // PRECIO: Number(salidaCoincidente.PRECIO).toFixed(2),
        // TOTAL: Number(totalSalida).toFixed(2),

        codigoIGUAL: codigoIgual ? 'verdadero' : 'falso',
        CANTIDADIGUAL: cantidadIgual ? 'verdadero' : 'falso',
        PRECIOIGUAL: precioIgual ? 'verdadero' : 'falso',
        TOTALIGUAL: totalIgual ? 'verdadero' : 'falso',

        ENTRADA: entrada.FACTURA,
        ENTRADA_SALIDA: entrada.SALIDA,
        ENTRADA_FECHA: entrada.FECHA,
        ENTRADA_CODIGO: entrada.ARTICULOS,
        ENTRADA_DESCRIPCION: entrada.DESCRIPCION,
        ENTRADA_CANTIDAD: Number(entrada.CANTIDAD).toFixed(2),
        // ENTRADA_PRECIO: Number(entrada.PRECIO).toFixed(2),
        // ENTRADA_TOTAL: Number(totalEntrada).toFixed(2)
      });

      // Eliminar la salida coincidente para que luego podamos procesar las que no tienen entrada
      const index = match.value.salidas.indexOf(salidaCoincidente);
      if (index > -1) {
        match.value.salidas.splice(index, 1);
      }
    } else {
      // No hay salida coincidente, campos de salida vacíos
      const totalEntrada = entrada.CANTIDAD * entrada.PRECIO;
      table.value.rows.push({
        SALIDA: '',
        FECHA: '',
        REFERENCIA: '',
        CLIENTE: '',
        CODIGO: '',
        DESCRIPCION: '',
        CANTIDAD: '',
        // PRECIO: '',
        // TOTAL: '',

        codigoIGUAL: false,
        CANTIDADIGUAL: false,
        PRECIOIGUAL: false,
        TOTALIGUAL: false,

        ENTRADA: entrada.FACTURA,
        ENTRADA_SALIDA: entrada.SALIDA,
        ENTRADA_FECHA: entrada.FECHA,
        ENTRADA_CODIGO: entrada.ARTICULOS,
        ENTRADA_DESCRIPCION: entrada.DESCRIPCION,
        ENTRADA_CANTIDAD: Number(entrada.CANTIDAD).toFixed(2),
        // ENTRADA_PRECIO: Number(entrada.PRECIO).toFixed(2),
        // ENTRADA_TOTAL: Number(totalEntrada).toFixed(2)
      });
    }
  });

  // Procesar las salidas que no tienen entradas correspondientes
  match.value.salidas.forEach((salida, index) => {
    if (!matchedIndices.has(index)) {

      const totalSalida = salida.CANTIDAD * salida.PRECIO;

      table.value.rows.push({


        SALIDA: salida.FACTURA,
        FECHA: salida.FECHAYHORA,
        REFERENCIA: salida.REFERENCIA,
        CLIENTE: salida.NOMBRECLIENTE,
        CODIGO: salida.ARTICULOS,
        DESCRIPCION: salida.DESCRIPCION,
        CANTIDAD: Number(salida.CANTIDAD).toFixed(2),
        // PRECIO: Number(salida.PRECIO).toFixed(2),
        // TOTAL: Number(totalSalida).toFixed(2),

        codigoIGUAL: false,
        CANTIDADIGUAL: false,
        PRECIOIGUAL: false,
        TOTALIGUAL: false,

        ENTRADA: '',
        ENTRADA_SALIDA: '',
        ENTRADA_FECHA: '',
        ENTRADA_CODIGO: '',
        ENTRADA_DESCRIPCION: '',
        ENTRADA_CANTIDAD: '',
        // ENTRADA_PRECIO: '',
        // ENTRADA_TOTAL: ''


      });
    }
  });

  $q.loading.hide();
}

const buscas = async () => {
  console.log(fechas.value);
  date.value = false;
  workpoints.value.val = null
  table.value.rows = []
}

const exportTable = async () => {
  const workbook = new ExcelJS.Workbook();


  const worksheet = workbook.addWorksheet(`Comparativo ${workpoints.value.val.name}`);
  console.log()
  worksheet.addTable({
    name: 'Comparativo',
    ref: 'A1',
    headerRow: true,
    totalsRow: false,
    style: {
      // theme: 'TableStyleBlue2',
      showRowStripes: true,
    },
    columns: Object.keys(table.value.rows[0]).map(e => { return { name: e, filterButton: true } }),
    rows: table.value.rows.map(e => Object.values(e)),
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
    a.download = `Comparativo ${workpoints.value.val.name} ${typeof (fechas.value) == 'object' ? `Del ${fechas.value.from} a ${fechas.value.to}` : fechas.value}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  downloadExcel();
}

init()
</script>
