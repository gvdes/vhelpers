<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Consulta de Pagos</span></div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>

        <div v-if="fpas.state">

          <q-table class="my-sticky-header-table" title="Fromas de Pago" :rows="fpas.body"
            row-key="name" :filter="fpas.filter" separator="cell"
             @row-click="mostck">
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="fpas.filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
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
                  <q-item-section>{{otckopt.body.TARJETAS}}</q-item-section>
                  <q-item-section>{{otckopt.body.TRANSFERENCIAS}}</q-item-section>
                  <q-item-section>{{otckopt.body.VALES}}</q-item-section>
                  <q-item-section>{{otckopt.body.CREDITOS}}</q-item-section>
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



      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';

const VDB = useVDBStore();
const $q = useQuasar();


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


const search = () => {
  console.log("buscar")
}


const imptck = () => {
  let split = otckopt.value.body.TICKET.split('-')
  let impdat = {
    type: "Reimpresion",
    serie: split[0],
    folio: split[1],
    print: impresoras.value.val.ip
  }
  let host = VDB.session.store.ip;
  let url = `http://${host}/access/public/modify/newmod`;
  axios.post(url, impdat)
    .then(r => {
      console.log(r)
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
      fpas.value.state = true;
      console.log("ya lo recibi que no te enganen :)")
      load.value = false
    })
    .catch(r => console.log(r))
}

const impre = async () => {
  let host = VDB.session.store.ip;
  let impr = `http://${host}/access/public/modify/getPrinter`;
  axios.get(impr)
    .then(done => {
      impresoras.value.body = done.data
      console.log("Impresoras listas :)")
    })
    .catch(fail => {
      console.log(fail.response.data.message);
    });
}



const mostck = (a, row) => {
  console.log('aqui se podra reimprimir');
  console.log(row.TICKET)
  otckopt.value.state = true
  otckopt.value.body = row
}
index();
impre();
</script>
