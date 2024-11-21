<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Asistencias</span>
        </div>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <q-page padding>

        <q-table :title="`Asistencias ${VDB.session.store.name}`" :rows="filterReport" :filter="report.filter" :separator="'cell'" :columns="table.columns" >
          <template v-slot:top>

            <q-separator spaced inset vertical dark />
            <div class="row items-center">

              <div class="col text-h6">{{`Asistencias ${VDB.session.store.name}`}}</div>
            </div>
            <q-space />

            <q-input borderless dense debounce="300" color="primary" v-model="report.filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn @click="exportTable" color="primary" icon="cloud_download" :disable="filterReport.length == 0" flat />
          </template>
        </q-table>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import assist from 'src/API/assistApi'
// import { assist } from "src/boot/axios";
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';

const VDB = useVDBStore();
const $q = useQuasar();

const report = ref({
  filter:'',
  report:[]
});
const sucursal = ref([])
const table = ref({
  columns:[
    { name: 'ANIO', label: 'AÑO', field: row => row.ANIO, sortable: true, align:'center'},
    { name: 'week', label: 'SEMANA', field: row => row.semana, sortable: true, align:'center'},
    { name: 'id', label: 'ID', field: row => row.ID, sortable: true, classes:'bg-white', align:'center'},
    { name: 'name', label: 'NOMBRE', field: row => row.NOMBRE, sortable: true, classes:'bg-white', align:'left'},
    { name: 'store', label: 'SUCURSAL', field: row => row.SUCURSAL, sortable: true, classes:'bg-white', align:'left'},
    { name: 'turn', label: 'TURNO', field: row => row.TURNO, sortable: true, classes:'bg-white', align:'center'},
    { name: 'saturday', label: 'SABADO', field: row => row.SABADO, sortable: true, classes:row => row.SABADO == 'FALTA' ? 'bg-red-2 text-red' : row.SABADO?.includes('R') ? 'text-red bg-yellow' : null , align:'center'},
    { name: 'sunday', label: 'DOMINGO', field: row => row.DOMINGO, sortable: true, classes:row => row.DOMINGO == 'DESCANSO' ? 'bg-lime-11 text-green' : row.DOMINGO?.includes('R') ? 'text-red bg-yellow' : null, align:'center'},
    { name: 'monday', label: 'LUNES', field: row => row.LUNES, sortable: true, classes:row => row.LUNES == 'FALTA' ? 'bg-red-2 text-red' : row.LUNES?.includes('R') ? 'text-red bg-yellow' : null, align:'center'},
    { name: 'tuesday', label: 'MARTES', field: row => row.MARTES, sortable: true, classes:row => row.MARTES == 'FALTA' ? 'bg-red-2 text-red' : row.MARTES?.includes('R') ? 'text-red bg-yellow' : null, align:'center'},
    { name: 'wednesday', label: 'MIERCOLES', field: row => row.MIERCOLES, sortable: true, classes:row => row.MIERCOLES == 'FALTA' ? 'bg-red-2 text-red' : row.MIERCOLES?.includes('R') ? 'text-red bg-yellow' : null, align:'center'},
    { name: 'thursday', label: 'JUEVES', field: row => row.JUEVES, sortable: true, classes:row => row.JUEVES == 'FALTA' ? 'bg-red-2 text-red' : row.JUEVES?.includes('R') ? 'text-red bg-yellow' : null, align:'center'},
    { name: 'friday', label: 'VIERNES', field: row => row.VIERNES, sortable: true, classes:row => row.VIERNES == 'FALTA' ? 'bg-red-2 text-red' : row.VIERNES?.includes('R') ? 'text-red bg-yellow' : null, align:'center'},
    { name: 'absence', label: 'FALTAS', field: row => row.FALTAS, sortable: true, classes:'bg-white', align:'center'},
    { name: 'delays', label: 'RETARDOS', field: row => row.RETARDOS, sortable: true, classes:'bg-white', align:'center'},
    { name: 'vacations', label: 'VACACIONES', field: row => row.VACACIONES, sortable: true, classes:'bg-white', align:'center'},
  ]
})

const filterReport = computed(() => report.value.report.filter(e => e.SUCURSAL == sucursal.value.name))

const init = async () => {
  $q.loading.show({ meesage: 'Obteniendo Reporte' });
  const resp = await assist.getReport();
  if (resp.error) {
    console.log(resp)
  } else {
    console.log(resp)
    report.value.report = resp.reporte
    sucursal.value = resp.sucursal?.find(e => e._store == VDB.session.store.id);
    $q.loading.hide()
  }
}
const exportTable = async () => {
  const workbook = new ExcelJS.Workbook();
  const targetColumns = ['G', 'H', 'I', 'J', 'K', 'L', 'M'];

  const worksheet = workbook.addWorksheet(`Reporte`);
  worksheet.addRow(Object.keys(filterReport.value[0]).map(i => i));
  filterReport.value.forEach((row) => {
    worksheet.addRow([
      row.ANIO,
      row.semana,
      row.ID,
      row.NOMBRE,
      row.SUCURSAL,
      row.TURNO,
      row.SABADO,
      row.DOMINGO,
      row.LUNES,
      row.MARTES,
      row.MIERCOLES,
      row.JUEVES,
      row.VIERNES,
      Number(row.FALTAS),
      Number(row.RETARDOS),
      Number(row.VACACIONES)
    ])
  })


  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      const colLetter = worksheet.getColumn(colNumber).letter;
      if (targetColumns.includes(colLetter)) {
        if (cell.value == 'FALTA' || cell.value == 'string' && cell.value.includes('-0%')) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFCCCC' } };
          cell.font = { color: { argb: 'FF990000' } };
        } else if (typeof cell.value == 'string' && cell.value.includes('-50%')) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFCC' } };
          cell.font = { color: { argb: 'FF999900' } };
        } else if (typeof cell.value == 'string' && cell.value.includes(' R')) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF00' } };
          cell.font = { color: { argb: 'FFCC0000' } };
        } else if (typeof cell.value == 'string' && cell.value.includes('-100%')) {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCCCCFF' } };
          cell.font = { color: { argb: 'FF000099' } };
        } else if (cell.value == 'DESCANSO') {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFCC' } };
          cell.font = { color: { argb: 'FF999900' } };
        }

        const regex = /\(([^)]+)\)/; // Expresión regular para encontrar texto entre paréntesis
        const match = typeof cell.value === 'string' ? cell.value.match(regex) : null;

        if (match) {
          // Añadir el texto entre paréntesis como comentario de la celda
          cell.note = match[1].trim(); // Usa trim() para eliminar espacios alrededor
          // Eliminar el texto entre paréntesis del valor de la celda
          cell.value = cell.value.replace(regex, '').trim() // trim() también aquí para limpiar
        }
      }
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
    a.download = `Reporte.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  downloadExcel();
}

init()

</script>
