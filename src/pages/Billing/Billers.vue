<template>
  <q-page padding>
    <q-toolbar>
      <q-btn flat round dense icon="receipt_long" />
      <q-toolbar-title>
        Solicitudes De Facturas
      </q-toolbar-title>
      <q-btn flat round dense icon="event">
        <q-menu>
          <q-card class="my-card">
            <q-card-section>
              <div>
                <div class="q-pb-sm text-center">
                </div>
                <q-date v-model="obtranges" range minimal />
              </div>
            </q-card-section>
            <q-card-actions vertical align="center">
              <q-btn flat label="Obtener" color="positive" @click="buscas" />
            </q-card-actions>
          </q-card>
        </q-menu>
      </q-btn>
      <q-separator spaced inset vertical dark />
      <q-input v-model="table.filter" type="text" label="Buscar" dense filled />
      <q-separator spaced inset vertical dark />
      <q-input v-model="table.filter" type="text" label="Buscar" dense filled />
    </q-toolbar>
    <q-separator spaced inset vertical dark />
    <q-list bordered v-for="(state, index) in status.opts" :key="index">
      <q-separator spaced inset vertical dark />
      <q-expansion-item expand-separator default-opened :header-class="state.class">
        <template v-slot:header>
          <div class="row full-width items-center justify-between q-py-sm ">
            <div> {{ state.label.toUpperCase() }} - {{billings.filter(e => e._state == state.id).length}}
            </div>
          </div>
        </template>
        <q-separator />
        <q-table :rows="billings.filter(e => e._state == state.id)" :columns="table.columns"
          :pagination="table.paginate" :filter="table.filter" @row-click="rowclicked">
        </q-table>
      </q-expansion-item>
      <q-separator spaced inset vertical dark />
    </q-list>

    <q-dialog v-model="wndViewer.state" full-width>
      <BillViewer :id="wndViewer.folio" @nextState="nextState" />
    </q-dialog>

  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import billingApi from 'src/API/billingApi.js';//para dirigirme bro
import { useBillingStore } from 'stores/BillingStore';
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import reportExc from "src/Excel/reports.js";
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import dayjs from 'dayjs';
import BillViewer from 'src/components/Billing/viewBilling.vue'
const VDB = useVDBStore();
const $billing = useBillingStore();
const $q = useQuasar();
$billing.setShowToolbar(true)
const obtranges = ref({ from: null, to: null })
const wndViewer = ref({ state: false, data: null });
const billings = ref([]);
const status = ref({
  opts: [
    { id: 1, label: 'Solicitado', class: 'bg-red-10 ' },
    { id: 2, label: 'Proceso', class: 'bg-yellow-10 ' },
    { id: 4, label: 'Creado', class: 'bg-green-10' },
  ]
})



const table = ref({
  columns: [
    { name: 'date', label: 'Creado', field: r => dayjs(r.creeated_at).format('YYYY-MM-DD HH:mm:ss'), align: 'left' },
    { name: 'id', label: 'Solicitud', field: r => r.id, align: 'left' },
    { name: 'store', label: 'Sucursal', field: r => r.store.name, align: 'left' },
    { name: 'ticket', label: 'Ticket', field: r => r.ticket, align: 'left' },
    { name: 'contact', label: 'Contacto', field: r => r.name, align: 'left' },
    { name: 'email', label: 'Correo', field: r => r.email, align: 'left' },
    { name: 'celphone', label: 'Telefono', field: r => r.celphone, align: 'left' },
    { name: 'razonSocial', label: 'Razon Social', field: r => r.razon_social, align: 'left' },
    { name: 'Status', label: 'Estado', field: r => r.status.name, align: 'left' },
    { name: 'Usuario', label: 'Usuario', field: r => r.logs.find(e => e._state == r._state).user.nick, align: 'left' },

  ],
  filter: null,
  paginate: { rowsPerPage: 15 }
})

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  let fecha = dayjs(new Date()).format("YYYY/MM/DD")
  obtranges.value = { from: fecha, to: fecha }
  const resp = await billingApi.getBillings({ date: obtranges.value })
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide()
    billings.value = resp
  }
}

const buscas = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  const resp = await billingApi.getBillings({ date: obtranges.value })
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide()
    billings.value = resp
  }
}
const rowclicked = async (evt, row, idx) => {
  wndViewer.value.folio = row.id;
  wndViewer.value.state = true;
}
const nextState = async (billing) => {
  console.log(billing)
  if (billing._state == 1) {
    // $q.loading.show({ message: 'Creando Factura' });
    let data = {
      billing:billing,
      user:VDB.session.credentials.id
    }
    const resp = await billingApi.crearFacturaInterna(data);
    if (resp.fail) {
      console.log(resp)
    } else {
        $q.loading.hide();
        console.log(resp)
        let inx = billings.value.findIndex(e => e.id == resp.id)
        if (inx >= 0) {
          billings.value.splice(inx, 1, resp);
          wndViewer.value = { state: false, data: null }
      }
    }
  } else if (billing._state == 2) {
      $q.loading.show({ message: 'Cambiando Status' });
      let datasend = {
        billing: billing,
        user: VDB.session.credentials.id
      }
      const nextState = await billingApi.finishState(datasend)
      if (nextState.fail) {
        console.log(nextState)
      } else {
        $q.loading.hide();
        console.log(nextState)
        let inx = billings.value.findIndex(e => e.id == nextState.id)
        if (inx >= 0) {
          billings.value.splice(inx, 1, nextState);
          wndViewer.value = { state: false, data: null }
        }
      }
  }
}


init()
</script>
