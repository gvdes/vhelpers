<template>

  <q-table :rows="filtRef" grid :columns="table.columns" :filter="table.filter">
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
        <q-card bordered class="text-center my-card">
          <q-card-section class="row" dense>
            <div class="col">
              <div class="text-caption">ID</div>
              <div class="text-bold">{{ props.row.id }}</div>
            </div>
            <q-separator vertical />
            <div class="col">
              <div class="text-caption">Referencia</div>
              <div class="text-bold">{{ props.row.notes }}</div>
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
              <div class="text-bold">{{ props.row.origin.store.name }}</div>
            </div>
            <q-separator vertical />
            <div class="col">
              <div class="text-caption">Destino</div>
              <div class="text-bold">{{ props.row.destiny.store.name }}</div>
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
            <div class="row">
              <div class="col">
                <div class="text-caption">Creado Por</div>
                <div class="text-bold">{{ props.row.createdby.nick }}</div>
              </div>
              <div class="col" v-if="props.row.receiptby">
                <div class="text-caption">Recibido Por</div>
                <div class="text-bold">{{ props.row.receiptby.nick }}</div>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="row">
            <!-- Cancelar Traspaso / devolucion -->
            <q-btn class="col" color="negative" icon="delete" outline @click="deleteRefund(props.row)"
              v-if="props.row._state == 1 && props.row.origin.store.id == VDB.session.store.id" />
            <q-separator spaced inset vertical dark v-if="props.row._state > 1" />
            <!-- Imprimir -->
            <q-btn class="col" color="pink" icon="print" outline @click="genPdf(props.row)"
              v-if="props.row._state > 1" />
            <q-separator spaced inset vertical dark
              v-if="(props.row._state == 5 || props.row._state == 6) && VDB.session.credentials.rol._type == 1" />
            <!-- Actualizar Origen solo una persona con tipo administrativo y solo si es antes de recibirlo -->
            <q-btn class="col" color="blue" icon="update" outline @click="updateRefund(props.row)"
              v-if="(props.row._state == 5 || props.row._state == 6) && VDB.session.credentials.rol._type == 1" />
            <q-separator spaced inset vertical dark
              v-if="props.row._state == 2 && props.row.destiny.store.id == VDB.session.store.id" />
            <!-- Recepcion de Traspaso / Devolucion -->
            <q-btn class="col" color="positive" icon="approval" outline @click="nextState(props.row)"
              v-if="props.row._state == 2 && props.row.destiny.store.id == VDB.session.store.id" />
            <q-separator spaced inset vertical dark
              v-if="props.row._state == 1 && (props.row._created_by == VDB.session.credentials.id || VDB.session.credentials.rol._type == 1) && props.row.origin.store.id == VDB.session.store.id" />
            <!-- validando Recepcion si es que se salio que continue solo la persona que lo estaba realizando -->
            <!-- Continuar validando Ingresar solo la persona que lo estaba haciendo -->
            <q-separator spaced inset vertical dark
              v-if="(props.row._state == 4 || props.row._state == 3) && (props.row._receipt_by == VDB.session.credentials.id || VDB.session.credentials.rol._type == 1) && props.row.destiny.store.id == VDB.session.store.id" />
            <q-btn class="col" color="primary" icon="send" outline
              @click=" $router.push(`/warehouse/refunds/${props.row.id}`);"
              v-if="props.row._state == 1 && (props.row._created_by == VDB.session.credentials.id || VDB.session.credentials.rol._type == 1) && props.row.origin.store.id == VDB.session.store.id" />
            <q-btn class="col" color="primary" icon="send" outline
              @click="$router.push(`/warehouse/refunds/verified/${props.row.id}`);"
              v-if="(props.row._state == 4 || props.row._state == 3) && (props.row._receipt_by == VDB.session.credentials.id || VDB.session.credentials.rol._type == 1) && props.row.destiny.store.id == VDB.session.store.id" />
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
  } else if (!statusFil.value && fechas.value) {
    return props.refunds.filter(e => dayjs(e.created_at).format('YYYY/MM/DD') == fechas.value)
  } else if (statusFil.value && fechas.value) {
    return props.refunds.filter(e => dayjs(e.created_at).format('YYYY/MM/DD') == fechas.value && e.status.id == statusFil.value.id)
  } else {
    return props.refunds
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
    case 5:
      return 'primary'
      break;
    default:
      break;
  }
}

const nextState = async (rows) => {
  $q.loading.show({ message: 'Cambiando Estado' })
  let data = {
    id: rows.id,
  }
  const resp = await refundsApi.nexState(data)
  if (resp.fail) {
    console.log(resp);
  } else {
    $router.push(`/warehouse/refunds/verified/${rows.id}`);
    $q.loading.hide()
  }
}

const genPdf = (refund) => {
  console.log(refund);
  pdfRefund.refund(refund)

}


const deleteRefund = (refund) => {
  console.log(refund);
}

const updateRefund = async (refund) => {
  if (refund._state == 6) {
    $router.push(`/warehouse/refunds/update/${refund.id}`);
  } else {
    $q.loading.show({ message: 'Cambiando Estado a Actualizado' })
    let data = {
      id: refund.id,
    }
    const resp = await refundsApi.nexStateUpdate(data)
    if (resp.fail) {
      console.log(resp);
    } else {
      $router.push(`/warehouse/refunds/update/${refund.id}`);
      $q.loading.hide()
    }
  }

}




</script>
