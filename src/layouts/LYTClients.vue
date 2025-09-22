<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <div class="row">
        <q-toolbar class="col">
          <q-icon name="assignment_ind" size="sm" />
          <q-toolbar-title>
            {{ title }}
          </q-toolbar-title>
        </q-toolbar>
        <q-separator spaced inset vertical dark v-if="storeClient.showOption" />
        <q-toolbar class="col" v-if="storeClient.showOption">
          <div class="text-center text-bold">{{ date }}</div>
          <q-separator spaced inset vertical dark />
          <q-toolbar-title>
            <q-select v-model="workpointVal" :options="workpoints" label="Sucursales" option-label="name" filled
              @update:model-value="searchTicketCredits" />
          </q-toolbar-title>
          <q-btn color="primary" icon="event" flat :disable="!workpointVal">
            <q-menu>
              <q-date v-model="date" landscape minimal mask="YYYY-MM-DD">
                <q-btn color="primary" label="Obtener" @click="searchTicketCredits" />
              </q-date>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </div>

      <q-separator />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import clientApi from 'src/API/clientApi.js';//para dirigirme bro
import { clientStore } from 'stores/ClientStore';
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import dayjs from 'dayjs';
import { store } from 'quasar/wrappers';


const VDB = useVDBStore();
const storeClient = clientStore();
const $q = useQuasar();
const workpointVal = ref(null)
const dateFormat = ref(dayjs().format('YYYY-MM-DD'))
const date = ref(dateFormat.value)


const title = computed(() => storeClient.title)
const workpoints = computed(() => storeClient.workpoints)


const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })

  const resp = await clientApi.getClients();
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    storeClient.setClient(resp.clients);
    storeClient.setWorkpoint(resp.workpoints);
    $q.loading.hide()
  }
}


const searchTicketCredits = async () => {
  $q.loading.show({ message: 'Obteniendo Ventas' })
  storeClient.setValWorkpoint(workpointVal.value)
  let data = {
    workpoint: workpointVal.value,
    date: date.value
  }
  console.log(data);
  const resp = await clientApi.getSalesC(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    storeClient.setCreditSuc(resp);
    console.log(resp);
    $q.loading.hide();
  }
}


init()
</script>
