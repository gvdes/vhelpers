<template>
  <q-page padding>
    <q-table :rows="clients" :filter="table.filters" :columns="table.columns"
      @row-click="(a, b) => { moscli.state = !moscli.state; moscli.val = b }" :pagination="table.pagination">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="table.filters" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-separator spaced inset vertical dark />
        <q-btn color="primary" icon="download"  @click="exportTable" flat rounded />
      </template>
    </q-table>

    <q-dialog v-model="moscli.state" persistent>
      <q-card style="width: 900px; max-width: 100vw;">
        <q-card-section class="text-center text-bold text-h5">
          {{ moscli.val.name }}
        </q-card-section>
        <q-card-section>
          <q-list bordered>
            <q-item>
              <q-item-section class="text-center">
                <q-item-label>Celular</q-item-label>
                <q-item-label>{{ moscli.val.phone }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-center">Correo</q-item-label>
                <q-item-label>{{ moscli.val.email }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <q-table :rows="moscli.val.credits" :columns="tableCredits.columns">
            <template v-slot:body-cell-tticket="props">
              <q-td :props="props">
                {{props.row.tickets?.reduce((a, e) => a + Number(e.total), 0) || 0}}
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-card class="q-pa-sm" style="min-width: 250px">
                    <q-card-section class="text-bold">Tickets</q-card-section>
                    <q-list dense bordered separator>
                      <q-item v-for="(t, i) in props.row.tickets" :key="i">
                        <q-item-section>
                          <q-item-label>{{ t.ticket }}</q-item-label>
                          <q-item-label caption>Total: {{ t.total }}</q-item-label>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ dayjs(t.created_at).format('YYYY-MM-DD') }}</q-item-label>
                          <q-item-label caption>Sucursal: {{ t.workpoint.alias }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </q-popup-proxy>
              </q-td>
            </template>
            <template v-slot:body-cell-tpayment="props">
              <q-td :props="props">
                {{props.row.payments?.reduce((a, e) => a + Number(e.import), 0) || 0}}
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-card class="q-pa-sm" style="min-width: 250px">
                    <q-card-section class="text-bold">Pagos</q-card-section>
                    <q-list dense bordered separator>
                      <q-item v-for="(p, i) in props.row.payments" :key="i">
                        <q-item-section>
                          <q-item-label> {{ p.counterpart.description }}</q-item-label>
                          <q-item-label caption>Importe: {{ p.import }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card>
                </q-popup-proxy>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="left">
          <q-btn flat icon="close" v-close-popup color="negative" />
          <q-space />
          <q-btn color="primary" icon="picture_as_pdf" flat rounded title="Generar Pdf" @click="exportExtracPDF" />
          <q-btn color="primary" icon="calculate" flat rounded title="Generar Excel" @click="exportExtacExcel" />
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
storeClient.setTitle('Clientes')
storeClient.setShowOption(false)
const moscli = ref({
  state: false,
  val: null,
})


const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: r => r.id, align: 'center',sortable:true },
    { name: 'name', label: 'NOMBRE', field: r => r.name, align: 'left',sortable:true },
    { name: 'celphone', label: 'TELEFONO', field: r => r.phone, align: 'left',sortable:true },
    { name: 'email', label: 'CORREO', field: r => r.email, align: 'left',sortable:true },
    { name: 'credits', label: 'CREDITOS', field: r => r.credits?.reduce((a, e) => a + Number(e.total), 0), align: 'center',sortable:true },
    { name: 'tickets', label: 'TICKETS', field: r => r.credits?.map(e => e.tickets)?.flat().reduce((a, e) => a + Number(e.total), 0), align: 'center',sortable:true },
    { name: 'pagos', label: 'PAGOS', field: r => r.credits?.map(e => e.payments)?.flat().reduce((a, e) => a + Number(e.import), 0), align: 'center',sortable:true }
  ],
  filters: null,
  pagination:{rowsPerPage:0}
})

const tableCredits = ref({
  columns: [
    { name: 'invoice', label: 'Factura', field: r => r.invoice, align: 'left' },
    { name: 'created', label: 'Fecha', field: r => dayjs(r.created_at).format('YYYY-MM-DD'), align: 'left' },
    { name: 'reference', label: 'Referencia', field: r => r.reference, align: 'left' },
    { name: 'total', label: 'Total Credito', field: r => r.total, align: 'center' },
    { name: 'tticket', label: 'Total Tickets', field: r => r.tickets?.reduce((a, e) => a + Number(e.total), 0), align: 'center' },
    { name: 'tpayment', label: 'Total Pagos', field: r => r.payments?.reduce((a, e) => a + Number(e.import), 0), align: 'center' },
    { name: 'debe', label: 'Deuda', field: r => Number(r.total) - Number(r.payments?.reduce((a, e) => a + Number(e.import), 0)), align: 'center' },
  ]
})



const clients = computed(() => storeClient.clients);


const exportTable = () => {

}

const exportExtracPDF = () => {

}

const exportExtacExcel = () => {

}


</script>
