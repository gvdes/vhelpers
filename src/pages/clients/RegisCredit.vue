<template>
  <q-page padding>
    <div class="row">
      <q-table class="col" title="Registrados" :rows="registrados" :columns="table.columns" />
      <q-separator spaced inset vertical dark />
      <q-table class="col" title="No Registrados" :rows="noRegistrados" :columns="table.columns"
        @row-click="(a,b) => {mosTck.state = !mosTck.state; mosTck.val = b }" />
    </div>

    <q-dialog v-model="mosTck.state" persistent>
      <q-card>
        <q-card-section class="text-bold text-h6">
          {{ mosTck.val.cliente }}
        </q-card-section>
        <q-card-section>
          <div>TICKET: {{ mosTck.val.ticket }}</div>
          <q-separator spaced inset vertical dark />
          <div>TOTAL: {{ mosTck.val.total }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat icon="close" color="negative" v-close-popup />
          <q-btn flat label="Registrar" color="positive"  @click="registrar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import clientApi from 'src/API/clientApi.js';//para dirigirme bro
import { clientStore } from 'stores/ClientStore';
import { exportFile, useQuasar } from 'quasar';
import dayjs from 'dayjs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
const VDB = useVDBStore();
const storeClient = clientStore();
const $q = useQuasar();
storeClient.setTitle('Registro De Creditos')
storeClient.setShowOption(true)

const mosTck = ref({
  state:false,
  val:null
})

const table = ref({
  columns: [
    { name: 'date', label: 'FECHA', field: r => dayjs(r.created_at).format('YYYY-MM-DD'), align: 'left' },
    { name: 'ncli', label: 'NCLI', field: r => r._client, align: 'left' },
    { name: 'name', label: 'Cliente', field: r => r.cliente, align: 'left' },
    { name: 'tck', label: 'Ticket', field: r => r.ticket, align: 'left' },
    { name: 'total', label: 'Total', field: r => r.total, align: 'left' },
  ],
})

const workpoint = computed(() => storeClient.valWorkpoint)
const registerTicket = computed(() => storeClient.clients.flatMap(client => client.credits?.flatMap(credit => credit.tickets || []) || []))
const ticketsForSucursal = computed(() => registerTicket.value.filter(e => e._workpoint == workpoint.value?.id))
const creditSuc = computed(() => storeClient.creditsSuc)

const registrados = computed(() => {
  return creditSuc.value.filter(v => ticketsForSucursal.value.some(c => c.ticket === v.ticket))
})

const noRegistrados = computed(() => {
  return creditSuc.value.filter(v => !ticketsForSucursal.value.some(c => c.ticket === v.ticket))
})

const registrar = () => {
  console.log('se va a registrar')
  mosTck.value.val.store = workpoint.value
  console.log(mosTck.value.val)
}


</script>
