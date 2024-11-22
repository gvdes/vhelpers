<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Presupuestos</span>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <q-card class="my-card">
          <q-card-section class="row">
            <q-select class="col" v-model="types.val" :options="types.opts" label="Tipo" filled @update:model-value="() => {form.client = null; form.number = null}" />
            <q-separator spaced inset vertical dark />
            <q-input class="col" v-model="form.number" type="text" :label="types.val?.id == 1 ? 'Salida' : 'Comanda'" :mask="types.val?.id == 1 ? '#-######' : '' " :type="types.val?.id == 1 ? 'text' : 'number' "  filled :disable="types.val == null" />
            <q-separator spaced inset vertical dark />
            <q-input class="col" v-model="form.client" type="number" label="Numero de cliente" filled :disable="types.val == null || form.number == null" />
            <q-separator spaced inset vertical dark />
            <q-btn color="primary" icon="send" flat  @click="createBudget"  :disable="types.val == null || form.number == null || form.client == null" />
          </q-card-section>
        </q-card>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import dbCompare from 'src/API/resoursesApi'
import { assist } from "src/boot/axios";
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

const types = ref({
  val:null,
  opts:[{id:1, label:'Salida'},{id:2, label:'Comanda'}]
})
const form = ref({
  number:null,
  client:null,
  store: VDB.session.store.id
})



const createBudget = () => {
  if(types.value.val.id == 1){
    console.log(form.value)
    // let url = '192.168.10.53:1619';
    let url = '192.168.10.160:1619';

    let sale = `http://${url}/storetools/public/api/Resources/getInvoiceBudget`;
    axios
        .post(sale,form.value)
        .then((done) => {
          console.log(done)
        })
        .catch((fail) => {
          console.log(fail);
        });

  }else if(types.value.val.id == 2){
    console.log(form.value)
  }
}


</script>
