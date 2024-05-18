<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Consulta de Pagos</span>
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <div class="justify-end">

          <q-btn color="primary" icon="event" @click="date = !date" flat round />

        </div>
        <q-separator spaced inset vertical dark />

        <div v-if="fpas.state">

          <q-table class="my-sticky-header-table" title="Fromas de Pago" :rows="fpas.body" row-key="name"
            :filter="fpas.filter" separator="cell" @row-click="mostck" :columns="table">

            <template v-slot:top-right>
              <div class="row">
                <div class="col"> <q-input borderless dense debounce="300" v-model="fpas.filter" placeholder="Search">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input></div>

                <q-separator spaced inset vertical dark />
                <div class="col"> <q-btn color="primary" icon="archive" dense no-caps flat round @click="exportTable" />
                </div>
              </div>

            </template>

          </q-table>

        </div>
        <q-dialog v-model="load" persistent>
          <div v-if="load">
            <q-spinner-facebook color="primary" size="7.5em" />
            <q-tooltip :offset="[0, 8]">Cargando Informacion</q-tooltip>
          </div>
        </q-dialog>

        <q-dialog v-model="otckopt.state" persistent>
          <q-card style="width: 700px; max-width: 70vw;">
            <q-card-section class="row justify-between">
              <div class="text-h4">Ticket : {{ otckopt.body.TICKET }}</div>
              <div class="text-subtitle2">{{ otckopt.body.TERMINAL }}</div>
            </q-card-section>
            <q-card-section>
              <div class="text-h5">{{ otckopt.body.CNOFAC }}</div>
            </q-card-section>
            <q-card-section>
              <div class="text-h5 text-center">{{ otckopt.body.CLIENTE }}</div>
              <div class="text-h5 text-center">{{ otckopt.body.FECHA }}</div>
            </q-card-section>
            <q-card-section>
              <q-list bordered>
                <q-item>
                  <q-item-section>EFECTIVO</q-item-section>
                  <q-item-section>TARJETA</q-item-section>
                  <q-item-section>TRANSFERENCIA</q-item-section>
                  <q-item-section>VALE</q-item-section>
                  <q-item-section>CREDITO</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>{{ otckopt.body.EFECTIVO }}</q-item-section>
                  <q-item-section>{{ otckopt.body.TARJETAS }}</q-item-section>
                  <q-item-section>{{ otckopt.body.TRANSFERENCIAS }}</q-item-section>
                  <q-item-section>{{ otckopt.body.VALES }}</q-item-section>
                  <q-item-section>{{ otckopt.body.CREDITOS }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-card-actions align="center">
              <q-btn flat color="negative" v-close-popup icon="close" />
              <q-btn flat color="primary" icon="print" @click="impresoras.state = !impresoras.state" />

            </q-card-actions>
          </q-card>
        </q-dialog>



        <q-dialog v-model="impresoras.state">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6 text-center">Impresora</div>
            </q-card-section>
            <q-card-section>
              <q-form @submit="imptck" class="q-gutter-md">
                <q-select dense option-label="name" v-model="impresoras.val" :options="impresoras.body"
                  label="Impresora" filled autofocus style="width: 200px" />
                <div>
                  <q-btn label="Enviar" type="submit" color="primary" style="width: 200px"
                    :disable="impresoras.val === null || imp" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog v-model="date">
          <q-card class="my-card">
            <q-card-section>
              <div class="q-pa-md">
                <div class="q-pb-sm">
                  <!-- Desde: {{ fechas.from }} : Hasta {{ fechas.to }} -->
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
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import {exportFile ,useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { assist } from "src/boot/axios";


const VDB = useVDBStore();
const $q = useQuasar();

const table =[
  {name:'terminal', label:'TERMINAL',align:'center' , field: row => row.TERMINAL},
  {name:'ticket', label:'TICKET' ,align:'center', field: row => row.TICKET},
  {name:'cliente', label:'CLIENTE' ,align:'center', field: row => row.CLIENTE},
  {name:'fecha', label:'FECHA' ,align:'center', field: row => row.FECHA},
  {name:'hora', label:'HORA' ,align:'center', field: row => row.HORA},
  {name:'efectivo', label:'EFECTIVO' ,align:'center', field: row => row.EFECTIVO},
  {name:'tarjetas', label:'TARJETAS' ,align:'center', field: row => row.TARJETAS},
  {name:'transferencias', label:'TRANSFERENCIAS' ,align:'center', field: row => row.TRANSFERENCIAS},
  {name:'creditos', label:'CREDITOS' ,align:'center', field: row => row.CREDITOS},
  {name:'vales', label:'VALES' ,align:'center', field: row => row.VALES},

]

const cash = ref({
  val: null,
  body: null
});

const impresoras = ref({
  state: false,
  val: null,
  body: null
})

const fpas = ref({
  val: null,
  filter: null,
  state: false,
  body: null
})
const load = ref(false);

const otckopt = ref({
  state: false,
  body: null
});

const imp = ref(false);

const date = ref(false);

const fechas = ref(null);


const imptck = () => {
  let split = otckopt.value.body.TICKET.split('-')
  let impdat = {
    type: "Reimpresion",
    serie: split[0],
    folio: split[1],
    print: impresoras.value.val.ip_address
  }
  imp.value = true;
  let host = VDB.session.store.ip;
  let url = `http://${host}/access/public/modify/newmod`;
  axios.post(url, impdat)
    .then(r => {
      console.log(r)
      imp.value = false
      impresoras.value.val = null;
      impresoras.value.state = false
    })
    .catch(r => r);
}

const index = async () => {
  console.log("Recibiendo Datos :)")
  load.value = true
  let host = VDB.session.store.ip;
  let riwo = `http://${host}/access/public/reports/getCash`;
  axios.get(riwo)
    .then(r => {
      cash.value.body = r.data.terminales
      fpas.value.body = r.data.formaspagos
      console.log(r.data);
      // impresoras.value.body = r.data.impresoras
      fpas.value.state = true;
      load.value = false
      console.log("ya lo recibi que no te enganen :)")
      impre()
      // console.log("Impresoras listas :)")

    })
    .catch(r => console.log(r))
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

const wrapCsvValue = (val, formatFn, row) => {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  if (/^\d{1,2}-\d{4}$/.test(formatted)) {
    formatted = `'${formatted}`
  }
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

const exportTable = () => {
  // naive encoding to csv format
  const content = [table.map(col => wrapCsvValue(col.label))].concat(
    fpas.value.body.map(row => table.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[col.field === void 0 ? col.name : col.field],
      col.format,
      row
    )).join(','))
  ).join('\r\n')

  const status = exportFile(
    'reporteCobros.csv',
    content,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }else{
    $q.notify({
      message: 'Descarga Completa :)',
      color: 'positive',
      icon: 'check',
      position:'center'
    })
  }
}

const buscas = () => {
  console.log(fechas.value);
  let filtro = {
    filt: fechas.value
  }
  console.log("Recibiendo Datos :)")
  load.value = true
  let host = VDB.session.store.ip;
  let riwo = `http://${host}/access/public/reports/filter`;
  axios.post(riwo, filtro)
    .then(r => {
      fpas.value.body = r.data.formaspagos
      fpas.value.state = true;
      load.value = false
      date.value = false
      console.log("ya lo recibi que no te enganen :)")
    })
    .catch(r => console.log(r))
}

const mostck = (a, row) => {
  console.log('aqui se podra reimprimir');
  console.log(row.TICKET)
  otckopt.value.state = true
  otckopt.value.body = row
}
index();
// impre();
</script>
