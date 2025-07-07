<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="bg-grey-3 text-dark" bordered>
      <UserToolbar />
      <q-separator />

    </q-header>
    <q-page-container>
      <q-toolbar class="justify-between row">
        <div class="col">
          <span class="text-grey">Helpers</span>
          <q-icon name="navigate_next" color="primary" />
          <span class="text-h6">Rerporte Aperturas de Cajas</span>
        </div>
      </q-toolbar>

      <div>
        <q-card class="my-card">
          <q-card-section class="text-center text-bold text-h6">
            <div class="row">
              <div class="col">Descuadre ({{ descuadre.length }})</div>
              <q-btn color="grey" round flat dense
                :icon="expands.descuadre ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="expands.descuadre = !expands.descuadre" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-slide-transition>
              <div v-show="expands.descuadre">
                <q-table :rows="descuadre" :columns="table.columnsDescruadre" :pagination="table.pagination" hide-bottom
                  @row-click="viewCutCurrent" />
              </div>
            </q-slide-transition>

          </q-card-section>
        </q-card>
        <q-separator spaced inset vertical dark />
        <q-card class="my-card" v-if="VDB.session.store.id != 1">
          <q-card-section class="text-center text-bold text-h6">
            <div class="row">
              <div class="col">Devolucion ({{ devolucion.length }})</div>
              <q-btn color="grey" round flat dense
                :icon="expands.devolucion ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="expands.devolucion = !expands.devolucion" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-slide-transition>
              <div v-show="expands.devolucion">
                <q-table :rows="devolucion" :columns="table.columnsDevolucion" :pagination="table.pagination"
                  hide-bottom @row-click="viewCutCurrent" />
              </div>
            </q-slide-transition>

          </q-card-section>
        </q-card>

        <q-separator spaced inset vertical dark />
        <q-card class="my-card" v-if="VDB.session.store.id != 1">
          <q-card-section class="text-center text-bold text-h6">
            <div class="row">
              <div class="col">Retiradas ({{ retiradas.length }})</div>
              <q-btn color="grey" round flat dense
                :icon="expands.retiradas ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="expands.retiradas = !expands.retiradas" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-slide-transition>
              <div v-show="expands.retiradas">
                <q-table :rows="retiradas" :columns="table.columnsRetiradas" :pagination="table.pagination" hide-bottom
                  @row-click="viewCutCurrent" />
              </div>
            </q-slide-transition>

          </q-card-section>
        </q-card>
      </div>


      <q-dialog v-model="viewCut.state" persistent>
        <q-card>
          <q-card-section>
            <q-img :src="viewCut.img" :ratio="1" @click="openImage" />
          </q-card-section>

          <q-card-section class="row items-center">
            <q-list bordered>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-center text-bold">Descuadre </q-item-label>
                  <q-item-label class="text-center text-bold">{{ JSON.parse(viewCut.val.details_cut).descuadre }}
                  </q-item-label>
                </q-item-section>
                <q-separator spaced inset vertical dark />
                <q-item-section>
                  <q-item-label class="text-center text-bold">Hora </q-item-label>
                  <q-item-label class="text-bold text-center">{{ JSON.parse(viewCut.val.details_cut).corte.HORA }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions>
            <q-btn flat icon="close" color="negative" v-close-popup />
            <q-space />
            <q-btn flat icon="print" color="primary" @click="impresoras.state = !impresoras.state" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="impresoras.state">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6 text-center">Selecciona Impresora</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="printCut" class="q-gutter-md">
              <q-select dense option-label="name" v-model="impresoras.val" :options="impresoras.opts" label="Impresora"
                filled />
              <div>
                <q-btn label="Enviar" type="submit" color="primary" class="full-width"
                  :disable="impresoras.val == null" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>


    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { AppFullscreen, useQuasar } from "quasar";
import Chart from 'chart.js/auto';
import dayjs from "dayjs";
import ExcelJS from 'exceljs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import OpenApi from 'src/API/OpenCash.js';
import UserToolbar from "src/components/UserToolbar.vue";
import ApiAssist from "src/API/assistApi";
import { useVDBStore } from "src/stores/VDB";
import axios from "axios"; //para dirigirme bro
import { assist } from "src/boot/axios";
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const $user = useVDBStore();
const VDB = useVDBStore();
const viewCut = ref({
  state: false,
  val: null,
  img: null,
})
const impresoras = ref({
  state: false,
  val: null,
  opts: []
})
const expands = ref({
  descuadre: false,
  devolucion: false,
  retiradas: false
})

const table = ref({
  columnsDescruadre: [
    { name: 'id', label: 'Id', field: r => r.id, align: 'center' },
    { name: 'date', label: 'Fecha', field: r => dayjs(r.created_at).format('YYYY-MM-DD'), align: 'left' },
    { name: 'createdby', label: 'Apertura', field: r => r.createdby.complete_name, align: 'left' },
    { name: 'cashier', label: 'Cajero', field: r => r.cashier.complete_name, align: 'left' },
    { name: 'cash_name', label: 'Caja', field: r => r.cash_name, align: 'left' },
    { name: 'unsquare', label: 'Descuadre', field: r => r.unsquare, align: 'center' },
    { name: 'mismatch_reason', label: 'Motivo', field: r => r.mismatch_reason, align: 'left' },
  ],
  columnsDevolucion: [
    { name: 'id', label: 'Id', field: r => r.id, align: 'center' },
    { name: 'date', label: 'Fecha', field: r => dayjs(r.created_at).format('YYYY-MM-DD'), align: 'left' },
    { name: 'createdby', label: 'Apertura', field: r => r.createdby.complete_name, align: 'left' },
    { name: 'cashier', label: 'Cajero', field: r => r.cashier.complete_name, align: 'left' },
    { name: 'cash_name', label: 'Caja', field: r => r.cash_name, align: 'left' },
    { name: 'ticket', label: 'Ticket Original', field: r => r.ticket, align: 'center' },
    { name: 'refund', label: 'Devolucion', field: r => r.refund_ticket, align: 'center' },
    { name: 'refund_reason', label: 'Motivo Devolucion', field: r => r.refund_reason, align: 'left' },

  ],
  columnsRetiradas: [
    { name: 'id', label: 'Id', field: r => r.id, align: 'center' },
    { name: 'date', label: 'Fecha', field: r => dayjs(r.created_at).format('YYYY-MM-DD'), align: 'left' },
    { name: 'createdby', label: 'Apertura', field: r => r.createdby.complete_name, align: 'left' },
    { name: 'cashier', label: 'Cajero', field: r => r.cashier.complete_name, align: 'left' },
    { name: 'cash_name', label: 'Caja', field: r => r.cash_name, align: 'left' },
    { name: 'withdrawanumber', label: 'Retirada', field: r => r.withdrawal_number, align: 'center' },
    { name: 'originalmount', label: 'Monto Original', field: r => r.withdrawal_original_mount, align: 'center' },
    { name: 'modify', label: 'Monto Modificado', field: r => r.withdrawal_mount ?? 0, align: 'center' },
    { name: 'modify_reason', label: 'Motivo Modificacion', field: r => r.reason_modify, align: 'left' },
  ],
  pagination: { rowsPerPage: 0 }
})

const cuts = ref([]);
const medis = ref(`http://192.168.10.238:2902/Assist/public/storage/uploads/cuts/${VDB.session.store.id}/`)


const descuadre = computed(() => cuts.value.filter(e => e._type == 1));
const devolucion = computed(() => cuts.value.filter(e => e._type == 2));
const retiradas = computed(() => cuts.value.filter(e => e._type == 3));


const init = async () => {
  $q.loading.show({ message: "Obteniendo Datos" })
  let sid = VDB.session.store.id;
  const resp = await OpenApi.getCutsBoxes(sid)
  if (resp.fail) {
    console.log(resp)
  } else {
    cuts.value = resp.opens
    impresoras.value.opts = resp.prints
    console.log(resp)
    $q.loading.hide()
  }
}

const printCut = async () => {
  $q.loading.show({ message: 'Imprimiendo Corte Anterior' })
  let data = {
    id: viewCut.value.val.id,
    print: impresoras.value.val.ip_address
  }
  console.log(data);
  const resp = await OpenApi.getCurrenCut(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    impresoras.value.val = null,
      impresoras.value.state = false
    $q.loading.hide()
  }
}

const viewCutCurrent = (a, b) => {
  console.log(b)
  viewCut.value.state = true
  viewCut.value.val = b;
  viewCut.value.img = `${medis.value}/${b.current_cut}`;
}
const openImage = () => {
  window.open(viewCut.value.img, '_blank')
}

// if (VDB.session.rol === 'aud' || VDB.session.rol === 'root') {
  init()
// } else {
//   $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
//   $router.replace('/');
// }
</script>
