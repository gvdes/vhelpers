<template>

  <q-table :rows="filtRef" grid :columns="table.columns" :filter="table.filter" >
    <template v-slot:top-left>
      <div class="text-bold text-centerz">{{ fechas }}</div>
    </template>
    <template v-slot:top-right>
      <div class="row">
        <q-input class="col" filled dense v-model="table.filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-separator spaced inset vertical dark />
        <q-select class="col" v-model="statusFil" :options="status" label="Estado" dense filled option-label="name">
          <template v-if="statusFil" v-slot:append>
            <q-icon name="cancel" @click.stop.prevent="statusFil = null" class="cursor-pointer" />
          </template>
        </q-select>
        <q-separator spaced inset vertical dark />
        <q-btn color="primary" flat icon="event">
          <q-menu>
            <q-date v-model="fechas" landscape minimal />
          </q-menu>
        </q-btn>
      </div>
    </template>
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4" @click="mosRow(props.row)">
        <q-card bordered class="text-center my-card">
          <q-card-section class="row" dense>
            <div class="col">
              <div class="text-caption">ID</div>
              <div class="text-bold">{{ props.row.id }}</div>
            </div>
            <q-separator vertical />
            <div class="col">
              <div class="text-caption">Referencia</div>
              <div class="text-bold">{{ props.row.reference }}</div>
            </div>
            <q-separator vertical />
            <div class="col">
              <div class="text-caption">Referencia</div>
              <div class="text-bold">{{ dayjs(props.row.created_at).format('DD-MM-YYYY HH:mm:ss') }}</div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col">
              <div class="text-caption">Origen</div>
              <div class="text-bold">{{ props.row.storefrom.name }}</div>
            </div>
            <q-separator vertical />
            <div class="col">
              <div class="text-caption">Destino</div>
              <div class="text-bold">{{ props.row.storeto.name }}</div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <div class="col">
              <div class="text-caption">Tipo</div>
              <div class="text-bold">{{ props.row.type.name }}</div>
            </div>
            <q-separator vertical />
            <div :class="`col bg-${colorStatus(props.row.status.id)}`">
              <div class="text-caption">Estado</div>
              <div class="text-bold">{{ props.row.status.name }}</div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="text-caption">Creado Por</div>
            <div class="text-bold">{{ props.row.createdby.complete_name }}</div>
          </q-card-section>
          <q-card-section class="row" @click="genPdf(props.row)">
            <div class="col">
              <div class="text-caption">Devolucion</div>
              <div class="text-bold">{{ props.row.fs_id }}</div>
            </div>
            <q-separator vertical />
            <div class="col">
              <div class="text-caption">{{ props.row._type == 1 ? 'ABONO' : 'ENTRADA' }}</div>
              <div class="text-bold">{{  props.row._type == 1 ? props.row.season_ticket : props.row.entry}}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>

  <q-dialog v-model="ReceiptRefund.state" persistent>
    <q-card>
      <q-card-section class="text-center text-bold text-h5">
        Quires recepcionar la devolucion ?
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" v-close-popup />
        <q-btn flat label="Recibir" color="positive" @click="nextState(ReceiptRefund.val)" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import refundsApi from "src/API/refundsApi";
import pdfRefund from "src/Pdf/Refunds/Refund.js";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import { useRoute, useRouter } from "vue-router";
import dayjs from 'dayjs';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
const $router = useRouter();

const VDB = useVDBStore();
const $q = useQuasar();
const statusFil = ref(null);
const fechas = ref(null)

const ReceiptRefund = ref({
  state: false,
  val: null
})

const props = defineProps({
  refunds: { type: Array, default: [] },
  status: { type: Array, default: [] }

})


const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: r => r.id },
    { name: 'reference', label: 'REFERENCIA', field: r => r.reference },
    { name: 'destiny', label: 'DESTINO', field: r => r.storefrom.name },
    { name: 'origin', label: 'ORIGEN', field: r => r.storeto.name },
    { name: 'createby', label: 'CREADO POR', field: r => r.createdby.complete_name },
    { name: 'date', label: 'FECHA', field: r => dayjs(r.created_at).format('DD-MM-YYYY HH:mm:ss') },
    { name: 'status', label: 'Estado', field: r => r.status },
  ],
  filter: ''
})


const filtRef = computed(() => {
  if (statusFil.value && !fechas.value) {
    return props.refunds.filter(e => e.status.id == statusFil.value.id)
  } else if(!statusFil.value && fechas.value){
    return props.refunds.filter(e => dayjs(e.created_at).format('YYYY/MM/DD') == fechas.value)
  }else if(statusFil.value && fechas.value){
    return props.refunds.filter(e => dayjs(e.created_at).format('YYYY/MM/DD') == fechas.value &&  e.status.id == statusFil.value.id)
  }else{
   return  props.refunds
  }
})

const colorStatus = (status) => {
  switch (status) {
    case 1:
      return 'red'
      break;
    case 2:
      return 'yellow'
      break;
    case 3:
      return 'blue'
      break;
    case 4:
      return 'green'
      break;

    default:
      break;
  }
}

const mosRow = (b) => {
  if (b.status.id == 1 && b.storefrom.id == VDB.session.store.id) {
    console.log('terminar el que se esta creando')
    $router.push(`/refunds/${b.id}`);
  } else if (b.status.id == 1 && b.storeto.id == VDB.session.store.id) {
    $q.notify({ message: 'No se puede abrir la devolucion', type: 'negative', position: 'center' })
  } else if (b.status.id == 2 && b.storefrom.id == VDB.session.store.id) {
    $q.notify({ message: 'No se puede abrir la devolucion', type: 'negative', position: 'center' })
  } else if (b.status.id == 2 && b.storeto.id == VDB.session.store.id) {
    console.log('se va a recibir')
    ReceiptRefund.value.state = true
    ReceiptRefund.value.val = b
  } else if (b.status.id == 4) {
    $q.notify({ message: 'No se puede abrir la devolucion', type: 'negative', position: 'center' })
  }
}

const nextState = async (rows) => {
  $q.loading.show({ message: 'Cambiando Estado' })
  let data = {
    id: rows.id,
    uid:VDB.session.id,
  }
  const resp = await refundsApi.nexState(data)
  if (resp.fail) {
    console.log(resp);
  } else {
    $router.push(`/refunds/verified/${rows.id}`);
    $q.loading.hide()
  }
}

const genPdf = (refund) => {
  console.log(refund);
  pdfRefund.refund(refund)

}




</script>
