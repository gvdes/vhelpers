<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="bg-grey-3 text-dark" bordered>
      <UserToolbar />
      <q-separator />

    </q-header>
    <q-page-container>
      <q-toolbar class="justify-between row">
        <div class="col">
          <span class="text-grey">Helpers</span>
          <q-icon name="navigate_next" color="primary" />
          <span class="text-h6">Cortes de Caja</span>
        </div>
        <div class="col">
          <div class="row">
            <div class="col"></div>


            <!--  <q-btn color="primary" icon="download" @click="calculate" flat round :disable="tickFilt.length <= 0" /> -->
            <q-select class="col" v-model="stores.val" :options="stores.opts" label="Sucursales" filled
              option-label="name" @update:model-value="getCuts" dense />
          </div>

        </div>

      </q-toolbar>
      <q-separator spaced inset vertical dark />
      <q-table :rows="basketFilt" :filter="table.filter" :columns="table.columns" @row-click="mosImp">
        <template v-slot:top-right>
          <q-input v-model="table.filter" type="text" label="Buscar" filled dense :disable="!stores.val" />
          <q-separator spaced inset vertical dark />
          <q-select v-model="term.val" :options="term.opts" label="Terminal" filled style="min-width: 150px" dense
            option-label="DESTER" :disable="!stores.val" />
          <q-separator spaced inset vertical dark />
          <q-btn color="primary" icon="event" flat round :disable="!stores.val">
            <q-menu>
              <q-date v-model="fechas" landscape minimal />
            </q-menu>
          </q-btn>
        </template>
      </q-table>
    </q-page-container>

    <q-dialog v-model="impresoras.state">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">Impresora</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="print" class="q-gutter-md">
            <q-select dense option-label="name" v-model="impresoras.val" :options="impresoras.body" label="Impresora"
              filled autofocus style="width: 200px" />
            <div>
              <q-btn label="Enviar" type="submit" color="primary" style="width: 200px"
                :disable="impresoras.val === null" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>



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
import { assist } from "src/boot/axios";
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const $user = useVDBStore();
const VDB = useVDBStore();




const stores = ref([])
const fechas = ref(null)
const cuts = ref([]);
const cut = ref(null)
const term = ref({
  val: null,
  opts: []
})
const impresoras = ref({
  state: false,
  val: null,
  body: null
})

const table = ref({
  filter: '',
  columns: [
    { name: 'date', label: 'FECHA', field: r => r.FECHA, align: 'left', sortable: true },
    { name: 'idter', label: 'ID', field: r => r.TERATE, align: 'center', sortable: true },
    { name: 'ter', label: 'TERMINAL', field: r => r.DESTER, align: 'left', sortable: true },
    { name: 'sinate', label: 'SALDO INICIAL', field: r => Number(r.SINATE).toFixed(2), align: 'center', sortable: true },
    { name: 'efeate', label: 'EFECTIVO', field: r => Number(r.EFEATE).toFixed(2), align: 'center', sortable: true },
    { name: 'sales', label: 'VENTAS', field: r => Number(r.VENTASEFE).toFixed(2), align: 'center', sortable: true },
    { name: 'withdrawals', label: 'RETIRADAS', field: r => Number(r.RETIRADAS).toFixed(2), align: 'center', sortable: true },
    { name: 'ingres', label: 'INGRESOS', field: r => Number(r.INGRESOS).toFixed(2), align: 'center', sortable: true },
    { name: 'unsquare', label: 'DESCUADRE', field: r => Number(Number(r.RETIRADAS) - Number(r.VENTASEFE)).toFixed(2), align: 'center', sortable: true },
  ]
})

const basketFilt = computed(() => {
  if (fechas.value && !term.value.val) {
    return cuts.value.filter(e => e.FECHA == fechas.value)
  } else if (!fechas.value && term.value.val) {
    return cuts.value.filter(e => e.TERATE == term.value.val.CODTER)
  } else if (fechas.value && term.value.val) {
    return cuts.value.filter(e => e.FECHA == fechas.value && e.TERATE == term.value.val.CODTER)
  } else {
    return cuts.value
  }
})


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
    $q.loading.hide();
    impre();
  }
};




const impre = async () => {
  let idstore = VDB.session.store.id;
  console.log(idstore)
  // console.log(host);
  // let impr = `http://${host}/access/public/modify/getPrinter`;
  try {
    let resp = await assist.get(`/cashier/getPrinters/${idstore}`)
    if (resp.status == 200) {
      impresoras.value.body = resp.data
      console.log("Impresoras listas :)")
    }

  } catch (err) {
    console.log(err);
    $q.notify({
      message: 'No se pudiron obtener las impresoras',
      type: 'negative',
      position: 'center',
      icon: 'error'
    })
  }
}



const getCuts = async () => {
  console.log(stores.value.val.ip_address)
  $q.loading.show({ message: 'Obteniendo Registros' });
  // console.log(fechas.value);
  let host = stores.value.val.ip_address;
  // let host = '192.168.10.160:1619'
  let url = `http://${host}/storetools/public/api/reports/getCuts`;
  const resp = await axios.get(url);
  if (resp.status != 200) {
    console.log(resp);
  } else {
    console.log(resp.data)
    cuts.value = resp.data.cuts
    term.value.opts = resp.data.terminal

    //   formas.value.opts = resp.data.formas
    //   date.value = false
    $q.loading.hide();
  }
};


const print = async () => {
  console.log(stores.value.val.ip_address)
  let data = {
    print: impresoras.value.val.ip_address,
    fecha: cut.value.FECHA,
    terminal: cut.value.TERATE
  }
  console.log(data)
  $q.loading.show({ message: 'Obteniendo Registros' });
  // console.log(fechas.value);
  let host = stores.value.val.ip_address;
  // let host = '192.168.10.160:1619'
  let url = `http://${host}/storetools/public/api/reports/printCut`;
  const resp = await axios.post(url, data);
  if (resp.status != 200) {
    console.log(resp);
  } else {
    console.log(resp.data)
    // cuts.value = resp.data.cuts
    // term.value.opts = resp.data.terminal

    //   formas.value.opts = resp.data.formas
    //   date.value = false
    $q.loading.hide();
  }
}

const mosImp = (a, b) => {
  impresoras.value.state = !impresoras.value.state;
  cut.value = b
}

// if ($user.session.rol === 'adm' || $user.session.rol === 'root') {
  init()
// } else {
//   $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
//   $router.replace('/');
// }

</script>
