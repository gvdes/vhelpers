<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Consulta cobros con
            tarjetas</span></div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>

        <div v-if="fpas.state">
          <q-table
          style="height: 700px"
          title="Fromas de Pago"
          :rows="fpas.body"
          row-key="name"
          :filter="fpas.filter"
          separator="cell"
          virtual-scroll
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          @row-click="mostck"
        />
        </div>

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

const fpas = ref({
  val:null,
  filter:null,
  state:false,
  body:null
})

const pagination = ref({
        rowsPerPage: 0
      })

const search = () => {
  console.log("buscar")
}

const index = async () => {
  console.log("Recibiendo Datos :)")
  let host = VDB.session.store.ip;
  let riwo = `http://${host}/access/public/reports/getCash`;
  axios.get(riwo)
    .then(r => {
      cash.value.body = r.data.terminales
      fpas.value.body = r.data.formaspagos
      fpas.value.state = true;
      console.log("ya lo recibi que no te enganen :)")
    })
    .catch(r => console.log(r))
}

const mostck = () => {
  console.log('aqui se podra reimprimir');
}
index();
</script>
