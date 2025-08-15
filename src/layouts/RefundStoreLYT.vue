<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="bg-grey-3 text-dark" bordered>
      <UserToolbar />
      <q-separator />

    </q-header>
    <q-page-container>
      <q-page padding>
        <q-toolbar class="justify-between row">
          <div class="col">
            <span class="text-grey">Helpers</span>
            <q-icon name="navigate_next" color="primary" />
            <span class="text-h6">Devoluciones de Sucursales</span>
          </div>
          <q-btn color="primary" icon="event" flat round>
            <q-menu>
              <q-card dense class="my-card">
                <q-card-section dense>
                  <q-date v-model="fechas" range minimal mask="YYYY-MM-DD" />
                </q-card-section>
                <q-card-actions vertical align="center">
                  <q-btn color="primary" flat label="Obtener" @click="buscar" />
                </q-card-actions>
              </q-card>

              <q-separator spaced inset vertical dark />

            </q-menu>
          </q-btn>
        </q-toolbar>
        <q-separator spaced inset vertical dark />
        <q-table :rows="refunds" :columns="table.columns" :filter="table.filter" @row-click="mostRefund">
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template></q-table>
      </q-page>
    </q-page-container>
    <q-dialog v-model="refund.state" persistent>
      <q-card>
        <q-card-section class="text-center text-bold text-h5">
          Devolucion {{ refund.val.devolucion }}
        </q-card-section>
        <q-card-section>
          <div>NOTAS: <span class="text-bold q-ml-md">{{ refund.val.comentario }}</span> </div>
          <div>CLIENTE: <span class="text-bold q-ml-md">{{ refund.val.cliente }}</span></div>
          <div>CAJA: <span class="text-bold q-ml-md">{{ refund.val.caja }}</span></div>
          <div>Fecha y Hora: <span class="text-bold q-ml-md">{{ ` ${dayjs(refund.val.fecha).format('YYYY-MM-DD')}
              ${dayjs(refund.val.hora).format('HH:mm:ss')}` }}</span></div>
        </q-card-section>
        <q-card-section>
          <q-tabs v-model="tab" class="text-primary" dense>
            <q-tab name="pagos" icon="payments" />
            <q-tab name="products" icon="inventory_2" />
          </q-tabs>
        </q-card-section>
        <q-card-section>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="pagos">
              <q-table :rows="refund.val.fpas" hide-bottom :columns="table.columnsfpa" />
            </q-tab-panel>
            <q-tab-panel name="products">
              <q-table :rows="refund.val.products" :columns="table.columnsProducts" />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat icon="close" v-close-popup />
          <q-btn flat icon="print" class="text-primary" @click="impresoras.state = !impresoras.state" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="impresoras.state">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">Impresora</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="print" class="q-gutter-md">
            <q-select dense option-label="name" v-model="impresoras.val" :options="impresoras.body" label="Impresora"
              filled autofocus style="width: 200px" />
            <div>
              <q-btn label="Enviar" type="submit" color="primary" style="width: 200px"
                :disable="impresoras.val === null" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
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

const date = new Date();
const fechas = ref(dayjs(date).format("YYYY-MM-DD"));
const tab = ref('pagos');
const refunds = ref([]);
const table = ref({
  columns: [
    { name: 'refund', label: 'Devolucion', field: r => r.devolucion, align: 'left' },
    { name: 'date', label: 'Fecha', field: r => dayjs(r.fecha).format('YYYY-MM-DD'), align: 'left' },
    { name: 'hour', label: 'Hora', field: r => dayjs(r.hora).format("HH-mm-ss"), align: 'left' },
    { name: 'client', label: 'N Cliente', field: r => Number(r.num_cli), align: 'left' },
    { name: 'cli', label: 'Cliente', field: r => r.cliente, align: 'left' },
    { name: 'origin', label: 'Origen', field: r => r.origen, align: 'left' },
    { name: 'cash', label: 'Caja', field: r => r.caja, align: 'left' },
    { name: 'total', label: 'Total', field: r => Number(r.total).toFixed(2), align: 'left' },
    { name: 'coment', label: 'Comentario', field: r => r.comentario, align: 'left' },
    { name: 'products', label: 'Productos', field: r => (r.products?.length ?? 0), align: 'left' },
    { name: 'fpas', label: 'Formas Pago', field: r => (r.fpas?.length ?? 0), align: 'left' },
  ],
  columnsfpa: [
    { name: 'fpa', label: 'Pago', field: r => r.FPALCO, align: 'left' },
    { name: 'des', label: 'Descripcion', field: r => r.CPTLCO, align: 'left' },
    { name: 'total', label: 'Total', field: r => Number(r.IMPLCO).toFixed(2), align: 'left' },
  ],
  columnsProducts: [
    { name: 'code', label: 'Articulo', field: r => r.ARTLFA, align: 'left' },
    { name: 'description', label: 'Descripcion', field: r => r.DESLFA, align: 'left' },
    { name: 'amount', label: 'Cantidad', field: r => Number(r.CANLFA).toFixed(2), align: 'left' },
    { name: 'price', label: 'Precio', field: r => Number(r.PRELFA).toFixed(2), align: 'left' },
    { name: 'tota', label: 'Total', field: r => Number(r.TOTLFA).toFixed(2), align: 'left' },
  ],
  filter: null
})
const refund = ref({
  val: null,
  state: false
})
const impresoras = ref({
  state: false,
  val: null,
  body: null
})
const impre = async () => {
  let idstore = VDB.session.store.id;
  console.log(idstore)
  // console.log(host);
  // let impr = `http://${host}/access/public/modify/getPrinter`;
  try {
    let resp = await assist.get(`/cashier/getPrinters/${idstore}`)
    if (resp.status == 200) {
      impresoras.value.body = resp.data
      console.log("Impresoras listas :)")
    }

  } catch (err) {
    console.log(err);
    $q.notify({
      message: 'No se pudiron obtener las impresoras',
      type: 'negative',
      position: 'center',
      icon: 'error'
    })
  }
}



const getRefunds = async () => {
  console.log(VDB.session.store)
  $q.loading.show({ message: 'Obteniendo Registros' });
  console.log(fechas.value);
  let host = VDB.session.store.ip_address;
  // let host = '192.168.10.160:1619'
  let url = `http://${host}/storetools/public/api/reports/getRefunds`;
  console.log(url)
  const resp = await axios.post(url, { fechas: fechas.value });
  console.log(resp)
  if (resp.status != 200) {
    console.log(resp);
  } else {
    console.log(resp)
    refunds.value = resp.data
    impre()
    $q.loading.hide();
  }
};


const print = async () => {
  console.log(refund.value.val.devolucion)
  $q.loading.show({ message: 'Imprimiendo' })
  let split = refund.value.val.devolucion.split('-')
  let impdat = {
    type: "Reimpresion",
    serie: split[0],
    folio: split[1],
    print: impresoras.value.val.ip_address
  }
  // imp.value = true;
  let host = VDB.session.store.ip_address;
  // let host = '192.168.10.160:1619'

  let url = `http://${host}/access/public/modify/newmod`;
  axios.post(url, impdat)
    .then(r => {
      console.log(r)
      // imp.value = false
      impresoras.value.val = null;
      impresoras.value.state = false
      $q.loading.hide()
    })
    .catch(r => r);
}

const mostRefund = (a, b) => {
  console.log(b)
  refund.value.state = true
  refund.value.val = b
}

const buscar = async () => {
  console.log(VDB.session.store)
  $q.loading.show({ message: 'Obteniendo Registros' });
  console.log(fechas.value);
  let host = VDB.session.store.ip_address;
  // let host = '192.168.10.160:1619'
  let url = `http://${host}/storetools/public/api/reports/getRefunds`;
  console.log(url)
  const resp = await axios.post(url, { fechas: fechas.value });
  console.log(resp)
  if (resp.status != 200) {
    console.log(resp);
  } else {
    console.log(resp)
    refunds.value = resp.data
    // impre()
    $q.loading.hide();
  }
}

getRefunds()
</script>
