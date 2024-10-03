<template>
  <q-page padding>
    <q-table title="Depositos" :rows="depositos" row-key="id"
      :rows-per-page-options="[0]"  separator="cell" :columns="table.columns">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            <div class="text-bold text-left">{{ props.row.id }}</div>
          </q-td>
          <q-td key="created" :props="props">
            <div class="text-bold text-center">{{ props.row.send_by }}</div>
          </q-td>
          <!-- <q-td key="start_date" :props="props">
            <div class="text-bold text-left"> {{ props.row.start_date }}</div>
          </q-td>
          <q-td key="final_date" :props="props">
            <div class="text-bold text-left"> {{props.row.final_date}}</div>
          </q-td> -->
          <q-td key="store" :props="props">
            <div class="text-bold text-center">{{ props.row.store.name }}</div>
          </q-td>
          <q-td key="concept" :props="props">
            <div class="text-bold text-left">{{ props.row.concept }}</div>
          </q-td>
          <q-td key="reference" :props="props">
            <div class="text-bold text-center">{{ props.row.refernce }}</div>
          </q-td>
          <q-td key="status" :props="props" >
            <div class="text-bold text-left">{{ props.row.status.name }}</div>
        </q-td>
        <q-td key="ticket" :props="props">
          <div class="text-bold text-left">{{ props.row.ticket }}</div>
        </q-td>
          <q-td key="picture" :props="props"  @click="mosimage(props.row)">
            <q-img v-if="props.row.picture != null"
              :src="`http://192.168.10.160:1920/Assist/public/storage/${props.row.picture}`" :ratio="1.7" spinner-color="primary"
              spinner-size="20px" style="width: 100px"  />
            <q-avatar v-else rounded size="100px" font-size="52px" color="white" text-color="primary" icon="close"/>
          </q-td>
        </q-tr>

      </template>
    </q-table>

    <q-dialog v-model="mos.state" >
      <q-card class="my-card">
        <img :src="`http://192.168.10.160:1920/Assist/public/storage/${mos.val.picture}`">
        <q-card-section>
          <div class="text-h6">Creado: {{ mos.val.send_by }}</div>
          <div class="text-subtitle2">Estado: {{  mos.val.status.name }}</div>
        </q-card-section>
        <q-card-section>
          {{ mos.val.concept}}
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
// import { initializeApp } from "firebase/app";
import depoApi from 'src/API/deposits'
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

const mos = ref({
  state:false,
  val:null
})

const depositos = ref([])
const table = ref({
  columns:[
    {name:'id', label:'Id', align:'center' , field:row => row.id},
    {name:'created', label:'Creado por',align:'center', field:row => row.send_by},
    {name:'store', label:'Sucursal', align:'center', field:row => row.store.name},
    {name:'concept', label:'Concepto', align:'left',  field:row => row.concept},
    {name:'reference', label:'Referencia / Folio', align:'center', field:row => row.refernce},
    {name:'status', label:'Estado', align:'left', field:row => row.status.name},
    {name:'ticket', label:'Ticket', align:'center', field:row => row.ticket},
    {name:'picture', label:'Foto', align:'center', field:row => row.picture},

  ]
})

const init = async () => {
  $q.loading.show({message:'Obteniendo Datos'})
  const resp =  await depoApi.getFormStore(VDB.session.store.id)
  if(resp.fail){
    console.log(resp)
  }else{
    $q.loading.hide();
    depositos.value = resp
  }
}

const mosimage = (row) => {
  mos.value.val = row
  mos.value.state = true
}
// const firebaseConfig = {
//   apiKey: "AIzaSyAYG45-tckIslCQTM6U9DZGOoZPVIqqXwM",
//   authDomain: "notificationsdeposits.firebaseapp.com",
//   projectId: "notificationsdeposits",
//   storageBucket: "notificationsdeposits.appspot.com",
//   messagingSenderId: "216447915873",
//   appId: "1:216447915873:web:895bf0e5bded30c7e11720"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

init()
</script>
