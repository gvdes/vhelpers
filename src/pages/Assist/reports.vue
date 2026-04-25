<template>
  <q-page padding>
    <q-option-group v-model="devices.val" inline class="q-mb-md" :options="devices.opts" />
    <q-table :pagination="table.pagination" :rows="mosconfil" :filter="table.filter" :columns="table.columns" dense
      separator="cell">
      <template v-slot:top>
        <div class="row items-center">
          <div class="col">Reporte de Asistencias</div>
        </div>
        <q-space />
        <q-input dense outlined debounce="300" color="primary" v-model="table.filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-separator spaced inset vertical dark />
        <q-btn icon="event" color="primary" outline dense>
          <q-menu>
            <q-card class="my-card">
              <q-card-section>
                <q-date v-model="mosDate" landscape minimal mask="YYYY-MM-DD" disable dense />
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <q-input class="col" v-model="range.min" type="number" label="Min" dense outlined />
                  <q-separator spaced inset vertical dark />
                  <q-input class="col" v-model="range.max" type="number" label="Max" dense outlined />
                  <q-separator spaced inset vertical dark />
                  <q-select v-model="anio.val" :options="anio.opts" label="Ano" dense outlined />
                </div>
                <q-range :min="0" :max="53" v-model="range" :step="1" color="primary" disable />
                <q-btn flat label="Obtener" @click="getReportFilter" />
              </q-card-section>
            </q-card>
          </q-menu>
        </q-btn>
        <q-separator spaced inset vertical dark />
        <q-btn @click="exportTable" color="primary" icon="download" :disable="mosconfil.length == 0" outline dense />

      </template>
    </q-table>

  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import assistApi from "src/API/colabAPI.js";
import { exportFile, useQuasar, date } from 'quasar';
import ExcelJS from 'exceljs';
import addDeviceCm from "src/components/Assist/addDevice.vue";
import dayjs from 'dayjs';
import { AssistStore } from 'stores/AssistStore';
const AssistLYT = AssistStore();
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
AssistLYT.setTitle('Reporte')
AssistLYT.setShowBtns(false);

const dates = ref([]);
const report = ref([]);
const devices = ref({
  val: 'TODOS',
  opts: []
})
const range = ref({
  min: 0,
  max: 0
})
const anio = ref({
  val: null,
  opts: [],
});

const table = ref({
  columns: [
    { name: 'year', label: 'AÑO', field: r => r.year, align: 'center' },
    { name: 'week', label: '#', field: r => r.week, align: 'center' },
    { name: 'id', label: 'Id', field: r => r.employee_id, align: 'center' },
    { name: 'name', label: 'Nombre', field: r => r.employee, align: 'center' },
    { name: 'store', label: 'Sucursal', field: r => r.store, align: 'center' },
    { name: 'turn', label: 'Turno', field: r => r.turn, align: 'center' },
    { name: 'saturday', label: 'Sabado', field: r => r.sabado, align: 'center' },
    { name: 'sunday', label: 'Domingo', field: r => r.domingo, align: 'center' },
    { name: 'monday', label: 'Lunes', field: r => r.lunes, align: 'center' },
    { name: 'thuesday', label: 'Martes', field: r => r.martes, align: 'center' },
    { name: 'wednesday', label: 'Miercoles', field: r => r.miercoles, align: 'center' },
    { name: 'thursday', label: 'Jueves', field: r => r.jueves, align: 'center' },
    { name: 'friday', label: 'Viernes', field: r => r.viernes, align: 'center' },
    { name: 'absence', label: 'Faltas', field: r => r.faltas, align: 'center' },
    { name: 'retardment', label: 'Retardos', field: r => r.retardos, align: 'center' },
    { name: 'vacation', label: 'Vacaciones', field: r => r.vacaciones, align: 'center' },
  ],
  filter: '',
  pagination: { rowsPerPage: 50 }

})

const mosconfil = computed(() => {
  if (devices.value.val == 'TODOS') {
    return report.value
  } else {
    return report.value.filter((e) => e.store.trim() === devices.value.val.trim())
  }
})

const mosDate = computed(() => {
  let simon = dates.value.filter(e => e._week >= range.value.min && e._week <= range.value.max && e._year == anio.value.val);
  // console.log(simon)
  let init = 0;
  let ultm = simon.length - 1;
  return { from: simon[init]?.fecha, to: simon[ultm]?.fecha }
})


const init = async () => {

  let data = {
    sid: VDB.session.store.id,
    rid: VDB.session.credentials.rol.id,
    uid: VDB.session.credentials.id,
    zone: VDB.session.credentials.zone ? VDB.session.credentials.zone.stores.map(e => e.id) : null
  }
  const resp = await assistApi.getReport(data)
  if (resp.fail) {
    console.log(resp);

  } else {
    console.log(resp);
    dates.value = resp.dates
    report.value = resp.report
    devices.value.opts = resp.devices.map(e => { return { value: e.name, label: e.name } })
    devices.value.opts.push({ label: 'TODOS', value: 'TODOS' })
    let semAct = dates.value.find(e => e.fecha == dayjs().format('YYYY-MM-DD'));
    range.value.min = semAct._week
    range.value.max = semAct._week
    anio.value.val = semAct._year
    anio.value.opts = [...new Set(dates.value.map(item => item._year))];
  }
}

const getReportFilter = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  report.value = [];
  let data = {
    sid: VDB.session.store.id,
    rid: VDB.session.credentials.rol.id,
    uid: VDB.session.credentials.id,
    zone: VDB.session.credentials.zone ? VDB.session.credentials.zone.stores.map(e => e.id) : null,
    ranges: {
      _year: anio.value.val,
      start_week: range.value.min,
      end_week: range.value.max
    }

  }
  const resp = await assistApi.getReport(data)
  if (resp.error) {
    console.log(resp)
  } else {
    console.log(resp);
    report.value = resp.report
    $q.loading.hide();
  }
}

const exportTable = () => {
  const workbook = new ExcelJS.Workbook();
  const targetColumns = ['G', 'H', 'I', 'J', 'K', 'L', 'M'];

  const worksheet = workbook.addWorksheet(`Reporte`);
  const keys = table.value.columns.map(i => i.label);
  // keys.push('DESCUENTOS');
  worksheet.addRow(keys);
  mosconfil.value.forEach((row) => {
    worksheet.addRow([
      row.year,
      row.week,
      row.employee_id,
      row.employee,
      row.store,
      // row.DISPOSITIVO,
      row.turn,
      row.sabado,
      row.domingo,
      row.lunes,
      row.martes,
      row.miercoles,
      row.jueves,
      row.viernes,
      // Number(row.SANCIONES),
      Number(row.faltas),
      Number(row.retardos),
      Number(row.vacaciones),
      // Number(row.SANCIONES) + Number((row.RETARDOS * 100))
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
    a.download = `ReporteSM${range.value.min}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  downloadExcel();
}
init()
</script>
