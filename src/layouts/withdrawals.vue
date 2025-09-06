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
          <span class="text-h6">Retiradas de Cajas</span>
        </div>
        <div class="col">
          <div class="row">
            <div class="col"></div>
            <q-select class="col" v-model="stores.val" :options="stores.opts" label="Sucursales" filled
              option-label="name" @update:model-value="getCuts" dense />
          </div>

        </div>

      </q-toolbar>
      <q-separator spaced inset vertical dark />
      <q-table :rows="basketFilt" :filter="table.filter" :columns="table.columns" @row-click="mosWithdrawals">
        <template v-slot:top-right>
          <q-input v-model="table.filter" type="text" label="Buscar" filled dense :disable="!stores.val" />
          <q-separator spaced inset vertical dark />
          <q-select v-model="term.val" :options="term.opts" label="Terminal" filled style="min-width: 150px" dense
            option-label="DESTER" :disable="!stores.val" />
          <q-separator spaced inset vertical dark />
          <q-btn color="primary" icon="event" flat round :disable="!stores.val">
            <q-menu>
              <q-date v-model="fechas" landscape minimal mask="YYYY-MM-DD" />
            </q-menu>
          </q-btn>
          <q-separator spaced inset vertical dark />
          <q-btn color="primary" icon="add" flat @click="adding.state = !adding.state" :disable="!stores.val" />
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

    <q-dialog v-model="cut.state" persistent>
      <q-card style="width: 300px">
        <q-card-section class="text-bold text-center text-h5">
          <span class="q-ml-sm">Retirada {{ cut.val.CODRET }}</span>
        </q-card-section>
        <q-card-section>
          <q-input v-model="cut.val.FECHA" type="date" label="Fecha" dense filled disable />
          <q-separator spaced inset vertical dark />
          <q-input v-model="cut.val.HORA" type="time" label="Hora" dense filled disable />
          <q-separator spaced inset vertical dark />
          <q-input v-model="cut.val.DESTER" type="text" label="Terminal" dense filled disable />
          <q-separator spaced inset vertical dark />
          <q-select v-model="cut.val.PROVEEDOR" :options="providers" label="Proveedor" filled option-label="NOFPRO" />
          <q-separator spaced inset vertical dark />
          <q-input v-model="cut.val.CONRET" type="text" label="Concepto" dense filled />
          <q-separator spaced inset vertical dark />
          <q-input v-model="cut.val.IMPRET" type="number" label="Importe" dense filled mask="#.##" fill-mask="0"
            reverse-fill-mask />
          <q-separator spaced inset vertical dark />
          <q-select dense option-label="name" v-model="impresoras.val" :options="impresoras.body" label="Impresora"
            filled />
          <q-separator spaced inset vertical dark />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat color="negative" icon="close" v-close-popup />
          <q-btn flat color="primary" icon="print" @click="print" :disable="!validEdit || !impresoras.val" />
          <q-btn flat color="yellow" icon="edit" :disable="validEdit || !impresoras.val" @click="modifyRet" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="adding.state" persistent>
      <q-card style="width: 300px">
        <q-card-section class="text-bold text-center text-h5">
        </q-card-section>
        <q-card-section>
          <q-input v-model="adding.FECHA" type="date" label="Fecha" dense filled />
          <q-separator spaced inset vertical dark />
          <q-select v-model="adding.DESTER" :options="term.opts" label="Terminal" filled option-label="DESTER" dense />
          <q-separator spaced inset vertical dark />
          <q-select v-model="adding.PROVEEDOR" :options="options" label="Proveedor" filled option-label="NOFPRO"
            use-input input-debounce="0" @filter="filterFn" dense />
          <q-separator spaced inset vertical dark />
          <q-input v-model="adding.CONRET" type="text" label="Observacion" dense filled />
          <q-separator spaced inset vertical dark />
          <q-input v-model="adding.IMPRET" type="number" label="Importe" dense filled mask="#.##" fill-mask="0"
            reverse-fill-mask />
          <q-separator spaced inset vertical dark />
          <q-select dense option-label="name" v-model="impresoras.val" :options="impresoras.body" label="Impresora"
            filled />
          <q-separator spaced inset vertical dark />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat color="negative" icon="close" @click="reset" />
          <!-- <q-btn flat color="primary" icon="print" @click="print" :disable="!validEdit || !impresoras.val" /> -->
          <q-btn flat color="positive" icon="send" :disable="validForm || !impresoras.val" @click="addAnt" />
        </q-card-actions>
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
const cut = ref({
  val: null,
  state: false
})
const term = ref({
  val: null,
  opts: []
})
const impresoras = ref({
  state: false,
  val: null,
  body: null
})
const providers = ref([]);
const options = ref(providers.value)


const adding = ref({
  state: false,
  CONRET: null,
  DESTER: null,
  IMPRET: null,
  CLIENTE: null,
  FECHA: null
})

const table = ref({
  filter: '',
  columns: [
    { name: 'date', label: 'FECHA', field: r => r.FECHA, align: 'left', sortable: true },
    { name: 'time', label: 'TIME', field: r => r.HORA, align: 'left', sortable: true },
    { name: 'code', label: 'CODIGO', field: r => r.CODRET, align: 'left', sortable: true },
    { name: 'idter', label: 'ID', field: r => r.CAJRET, align: 'center', sortable: true },
    { name: 'ter', label: 'TERMINAL', field: r => r.DESTER, align: 'left', sortable: true },
    { name: 'conc', label: 'CONCEPTO', field: r => r.CONRET, align: 'left', sortable: true },
    { name: 'import', label: 'IMPORTE', field: r => Number(r.IMPRET).toFixed(2), align: 'center', sortable: true },
    { name: 'provider', label: 'PROVEEDOR', field: r => r.NOFPRO, align: 'left', sortable: true },
  ]
})

const basketFilt = computed(() => {
  if (fechas.value && !term.value.val) {
    return cuts.value.filter(e => e.FECHA == fechas.value)
  } else if (!fechas.value && term.value.val) {
    return cuts.value.filter(e => e.CAJRET == term.value.val.CODTER)
  } else if (fechas.value && term.value.val) {
    return cuts.value.filter(e => e.FECHA == fechas.value && e.CAJRET == term.value.val.CODTER)
  } else {
    return cuts.value
  }
})

const validEdit = computed(() => {
  if (cut.value) {
    const filt = cuts.value.find(e => e.CODRET === cut.value.val.CODRET)
    if (!filt) return false
    let difference = {
      CAJRET: filt.CAJRET,
      CODRET: filt.CODRET,
      CONRET: filt.CONRET,
      DESTER: filt.DESTER,
      FECHA: filt.FECHA,
      HORA: filt.HORA,
      IMPRET: Number(filt.IMPRET).toFixed(2),
      PROVEEDOR: {
        PRORET: filt.PRORET,
        NOFPRO: filt.NOFPRO
      }
    }
    return JSON.stringify(difference) === JSON.stringify(cut.value.val)
  } else {
    return true
  }
})

const validForm = computed(() => !adding.value.CONRET || !adding.value.DESTER || !adding.value.IMPRET || !adding.value.PROVEEDOR)

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


const mosWithdrawals = (a, b) => {
  cut.value.state = !cut.value.state
  console.log(b)
  let data = {
    CAJRET: b.CAJRET,
    CODRET: b.CODRET,
    CONRET: b.CONRET,
    DESTER: b.DESTER,
    FECHA: b.FECHA,
    HORA: b.HORA,
    IMPRET: Number(b.IMPRET).toFixed(2),
    PROVEEDOR: {
      PRORET: b.PRORET,
      NOFPRO: b.NOFPRO
    }
  }
  cut.value.val = { ...data }
}



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
  let url = `http://${host}/storetools/public/api/reports/getWithdrawals`;
  const resp = await axios.get(url);
  if (resp.status != 200) {
    console.log(resp);
  } else {
    console.log(resp.data)
    cuts.value = resp.data.cuts
    term.value.opts = resp.data.terminal
    providers.value = resp.data.proveedores
    //   formas.value.opts = resp.data.formas
    //   date.value = false
    $q.loading.hide();
  }
};


const print = async () => {
  console.log(stores.value.val.ip_address)
  let data = {
    print: impresoras.value.val.ip_address,
    codret: cut.value.val.CODRET
  }
  console.log(data)
  $q.loading.show({ message: 'Imprimiendo Retirada' });
  // console.log(fechas.value);
  let host = stores.value.val.ip_address;
  // let host = '192.168.10.160:1619'
  let url = `http://${host}/storetools/public/api/reports/printWitrawal`;
  const resp = await axios.post(url, data);
  if (resp.status != 200) {
    console.log(resp);
  } else {
    console.log(resp.data)
    impresoras.value.val = null
    cut.value.val = null
    cut.value.state = false
    $q.loading.hide();
  }
}


const modifyRet = async () => {
  cut.value.val.Print = impresoras.value.val.ip_address
  console.log(cut.value.val);

  $q.loading.show({ message: 'Modificando Retirada' });
  // console.log(fechas.value);
  let host = stores.value.val.ip_address;
  // let host = '192.168.10.160:1619'
  let url = `http://${host}/storetools/public/api/reports/modifyWithdrawal`;
  const resp = await axios.post(url, cut.value.val);
  if (resp.status != 200) {
    console.log(resp);
  } else {
    console.log(resp.data)
    let inx = cuts.value.findIndex(e => e.CODRET == resp.data.CODRET)
    if (inx >= 0) {
      cuts.value[inx] = resp.data
    }
    impresoras.value.val = null
    cut.value.val = null
    cut.value.state = false
    $q.loading.hide();
  }
}

const addAnt = async () => {
  adding.value.Print = impresoras.value.val.ip_address
  console.log(adding.value);

  $q.loading.show({ message: 'Agregando Anticipo' });
  // console.log(fechas.value);
  let host = stores.value.val.ip_address;
  // let host = '192.168.10.160:1619'
  let url = `http://${host}/storetools/public/api/reports/addWithdrawal`;
  const resp = await axios.post(url, adding.value);
  if (resp.status != 200) {
    console.log(resp);
  } else {
    console.log(resp.data)
    cuts.value.push(resp.data)
    impresoras.value.val = null
    cut.value.val = null
    cut.value.state = false
    $q.loading.hide();
    reset();
  }
}

const reset = () => {
  adding.value = {
    state: false,
    CONRET: null,
    DESTER: null,
    IMPRET: null,
    CLIENTE: null,
    FECHA: null
  }
}

const filterFn = (val, update, abort) => {
  if (val === '') {
    update(() => {
      options.value = providers.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value = providers.value.filter(v => v.NOFCLI.toLowerCase().includes(needle))
  })

}


// if ($user.session.rol === 'adm' || $user.session.rol === 'root') {
  init()
// } else {
//   $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
//   $router.replace('/');
// }

</script>
