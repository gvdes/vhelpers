<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <q-header class="bg-grey-3 text-dark" bordered>
        <UserToolbar />
        <q-separator />

      </q-header>
      <q-toolbar class="justify-between row">
        <div class="col">
          <span class="text-grey">Helpers</span>
          <q-icon name="navigate_next" color="primary" />
          <span class="text-h6">Cajas Abiertas</span>
        </div>
        <div class="col">
          <div class="row">
            <div class="col"></div>
            <q-btn color="primary" icon="event" @click="date = !date" flat round :disable="!stores.val" />
            <q-btn color="primary" icon="download" @click="calculate" flat round :disable="tickFilt.length <= 0" />
            <q-select class="col" v-model="stores.val" :options="stores.opts" label="Sucursales" filled
              option-label="name" @update:model-value="getSale" dense />

          </div>

        </div>

      </q-toolbar>
      <q-table title="Tickets" :rows="tickFilt" :pagination=table.pagination :filter="table.filter"
        :columns="table.columns">

        <template v-slot:top-right>
          <div class="row">
            <div class="col"> <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input></div>
            <q-separator spaced inset vertical dark />
            <q-select class="col" v-model="formas.val" :options="formas.opts" label="Formas de pago" filled
              option-label="DESFPA" dense>
              <template v-slot:append>
                <q-icon v-if="formas.val" name="close" @click="formas.val = null" />
              </template>

            </q-select>
          </div>

        </template>
      </q-table>



      <q-dialog v-model="date">
        <q-card class="my-card">
          <q-card-section>
            <div class="q-pa-md">
              <div class="q-pb-sm">
                <!-- Desde: {{ fechas.from }} : Hasta {{ fechas.to }} -->
                <!-- {{ fechas }} -->
              </div>
              <q-date v-model="fechas" range minimal />
            </div>
          </q-card-section>
          <q-card-section>
            <q-card-actions align="right">
              <q-btn flat icon="close" color="negative" @click="date = !date" />
              <q-btn flat icon="check" color="positive" @click="getSale" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-dialog>





      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { AppFullscreen, useQuasar } from "quasar";
import Chart from 'chart.js/auto';
import dayjs from "dayjs";
import ExcelJS from 'exceljs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import UserToolbar from "src/components/UserToolbar.vue";
import ApiAssist from "src/API/assistApi";
import { useVDBStore } from "src/stores/VDB";
import axios from "axios"; //para dirigirme bro
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const $user = useVDBStore();


const date = ref(false);

const fechas = ref(null);
const stores = ref({
  opts: [],
  val: null
});
const table = ref({
  columns: [
    { name: 'cash', label: 'CAJA', field: r => r.TERMINAL, align: 'left', sortable: true },
    { name: 'ticket', label: 'TICKET', field: r => r.TICKET, align: 'left', sortable: true },
    { name: 'cliet', label: 'CLIENTE', field: r => r.CLIENTE, align: 'left', sortable: true },
    { name: 'date', label: 'FECHA', field: r => r.FECHA, align: 'left', sortable: true },
    { name: 'hour', label: 'HORA', field: r => r.HORA, align: 'left', sortable: true },
    { name: 'fop', label: 'FORMA DE PAGO', field: r => r.FORMA_PAGO, align: 'left', sortable: true },
    { name: 'import', label: 'IMPORTE', field: r => parseFloat(r.IMPORTE), align: 'left', sortable: true },
  ],
  pagination: { rowsPerPage: 20 },
  filter: "",
});
const tickets = ref([]);
const formas = ref({
  val: null,
  opts: []
})


const ismobile = computed(() => $q.platform.is.mobile);

const tickFilt = computed(() => tickets.value.filter(e => {
  if (formas.value.val) {
    return e.FORMA_PAGO == formas.value.val.DESFPA
  } else {
    return e
  }
}))


const init = async () => {

  // smonth.value.val = meses.filter(e => e.id === mes)[0]
  $q.loading.show({ message: "Cargando Informacion" });
  console.log("se inicia el init");
  const resp = await ApiAssist.index();
  if (resp.error) {
    //   console.log(resp);
  } else {
    console.log(resp);
    stores.value.opts = resp;
    let date = new Date();
    let fecha = dayjs(date).format("YYYY/MM/DD")
    fechas.value = fecha
    console.log(fecha);
    $q.loading.hide();
  }
};

const getSale = async () => {
  console.log(stores.value.val.ip_address)
  $q.loading.show({ message: 'Obteniendo Registros' });
  console.log(fechas.value);
  let host = stores.value.val.ip_address;
  // let host = '192.168.10.160:1619'
  let url = `http://${host}/access/public/reports/getCashCob`;
  const resp = await axios.post(url, { filt: fechas.value });
  if (resp.status != 200) {
    console.log(resp);
  } else {
    console.log(resp.data)
    tickets.value = resp.data.formaspagos
    formas.value.opts = resp.data.formas
    date.value = false
    $q.loading.hide();
  }
};



// if ($user.session.rol === 'adm' || $user.session.rol === 'root') {
  init()
// } else {
//   $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
//   $router.replace('/');
// }



const calculate = () => {
  $q.loading.show({ message: 'Importando Ticket' })
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(`Venta`);


  worksheet.addTable({
    name: 'Venta',
    ref: 'A1',
    headerRow: true,
    totalsRow: true,
    style: {
      showRowStripes: true,
    },
    columns: [
      { name: 'Terminal', filterButton: true },
      { name: 'Tickets', filterButton: true },
      { name: 'Cliente', filterButton: true },
      { name: 'Fecha', filterButton: true },
      { name: 'Hora', filterButton: true },
      { name: 'Forma de Pago', filterButton: true },
      { name: 'Importe', filterButton: true, totalsRowFunction: 'sum' },
    ],
    rows: tickFilt.value.map(row => {
      return [row.TERMINAL,
      row.TICKET,
      row.CLIENTE,
      row.FECHA,
      row.HORA,
      row.FORMA_PAGO,
      parseFloat(row.IMPORTE)
      ]
    }),
  });

  const downloadExcel = async () => {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ReporteCajas.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  downloadExcel();
  $q.loading.hide()

}


</script>
