<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class=" row justify-between">
          <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Modificacion Devoluciones </span>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-separator spaced inset vertical dark />

    <q-table :rows="refunds" v-if="refunds.length > 0" :columns="table.columns" :pagination="table.pagination"
      @row-click="mosVal" />
    <q-dialog v-model="refund.state" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="text-bold text-center text-h6">
          Edicion de Devolucion
        </q-card-section>
        <q-card-section class="q-ml-xl">
          Referencia : {{ refund.val.reference }}
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold text-center" caption> Realiza </q-item-label>
                <q-item-label class="text-bold text-overline text-center"> {{ refund.val.createdby.complete_name }}
                </q-item-label>
              </q-item-section>
              <q-separator spaced inset vertical dark />
              <q-item-section>
                <q-item-label class="text-bold text-center" caption> Recibe </q-item-label>
                <q-item-label class="text-bold text-overline text-center "> {{ refund.val.receiptby.complete_name }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold text-center" caption> Devolucion </q-item-label>
                <q-item-label class="text-bold text-overline text-center"> {{ refund.val.fs_id }} </q-item-label>
              </q-item-section>
              <q-separator spaced inset vertical dark />
              <q-item-section>
                <q-item-label class="text-bold text-center" caption> Abono </q-item-label>
                <q-item-label class="text-bold text-overline text-center "> {{ refund.val.season_ticket }}
                </q-item-label>
              </q-item-section>
              <q-separator spaced inset vertical dark />
              <q-item-section>
                <q-item-label class="text-bold text-center" caption> Factura </q-item-label>
                <q-item-label class="text-bold text-overline text-center"> {{ refund.val.invoice }} </q-item-label>
              </q-item-section>
              <q-separator spaced inset vertical dark />
              <q-item-section>
                <q-item-label class="text-bold text-center" caption> Entrada </q-item-label>
                <q-item-label class="text-bold text-overline text-center"> {{ refund.val.entry }} </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <q-table :rows="refund.val.bodie" :columns="table.columnsProduct" :pagination="table.pagination" hide-bottom>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="code" :props="props">
                  {{ props.row.product }}
                </q-td>
                <q-td key="description" :props="props">
                  {{ props.row.description }}
                </q-td>
                <q-td key="delivered" :props="props">
                  <div class="text-pre-wrap">{{ props.row.to_delivered }}</div>
                  <q-popup-edit v-model="props.row.to_delivered" persistent v-slot="scope">
                    <q-input type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set()" :min="1" />
                  </q-popup-edit>
                </q-td>
                <q-td key="received" :props="props">
                  {{ props.row.to_received }}
                  <q-popup-edit v-model="props.row.to_received" persistent v-slot="scope">
                    <q-input type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set()" :min="1" />
                  </q-popup-edit>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn flat label="Confirmar" color="positive" @click="sendRefund" />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import refundsApi from "src/API/refundsApi";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import { useRoute, useRouter } from "vue-router";
import dayjs from 'dayjs';
import viewRefund from 'src/components/Refunds/ViewRefunds.vue';// encabezado aoiida
import { addPlugins } from 'workbox-precaching';
const $router = useRouter();
const VDB = useVDBStore();
const $q = useQuasar();

const refunds = ref([]);
const refund = ref({
  state: false,
  val: null
})

const table = ref({
  columns: [
    { name: 'reference', label: 'Referencia', field: r => r.reference, align: 'left' },
    { name: 'storeFrom', label: 'Origen', field: r => r.storefrom.name, align: 'left' },
    { name: 'storeTo', label: 'Destino', field: r => r.storeto.name, align: 'left' },
    { name: 'type', label: 'Tipo', field: r => r.type.name, align: 'left' },
    { name: 'created_by', label: 'Creado Por', field: r => r.createdby.complete_name, align: 'left' },
    { name: 'refund', label: 'Devolucion', field: r => r.fs_id, align: 'center' },
    { name: 'season', label: 'Abono', field: r => r.season_ticket, align: 'center' },
    { name: 'invoice', label: 'Factura', field: r => r.invoice, align: 'center' },
    { name: 'entrt', label: 'Entrada', field: r => r.entry, align: 'center' },
  ],
  columnsProduct: [
    { name: 'code', label: 'Codigo', field: r => r.product, align: 'left' },
    { name: 'description', label: 'Descripcion', field: r => r.description, align: 'left' },
    { name: 'delivered', label: 'Enviado', field: r => r.to_delivered, align: 'center' },
    { name: 'received', label: 'Recibido', field: r => r.to_received, align: 'center' },
  ],
  pagination: { rowsPerPage: 0 }
})

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos', type: 'positive', position: 'center' });
  let sid = VDB.session.store.id
  const resp = await refundsApi.getRefundDirerences(sid)
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    refunds.value = resp
    $q.loading.hide()
  }
}

const mosVal = (a, b) => {
  refund.value.state = true
  refund.value.val = b
}

const sendRefund = async () => {
  $q.loading.show({ message: 'Editando TRASPASO' })
  console.log(refund.value.val)
  const resp = await refundsApi.correction(refund.value.val)
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.notify({ message: 'Modificacion Realizada Favor de confirmarla', type: 'positive', position: 'bottom' });
    $q.loading.hide();
    refund.value.state = false
  }
}

if ($user.session.rol === 'aud' || $user.session.rol === 'root') {
  init()
} else {
  $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
  $router.replace('/');
}


</script>
