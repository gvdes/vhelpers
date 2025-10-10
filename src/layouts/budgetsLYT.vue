<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />

    </q-header>

    <q-page-container>
      <q-page padding>
        <q-toolbar class="justify-between">
          <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Presupuestos</span>
          </div>
        </q-toolbar>
        <q-card class="my-card">
          <q-card-section class="row">
            <q-select class="col" v-model="types.val" :options="types.opts" label="Tipo" filled
              @update:model-value="updateType" />
            <q-separator spaced inset vertical dark />
            <q-input class="col" v-model="form.number"  :label="types.val?.label"
              :mask="types.val?.id == 1 ? '#-######' : ''" :type="types.val?.id == 1 ? 'text' : 'number'" filled
              :disable="types.val == null" />
            <q-separator spaced inset vertical dark />
            <q-input class="col" v-model="form.client" type="number" label="Numero de cliente" filled
              :disable="types.val == null || form.number == null" />
            <q-separator spaced inset vertical dark />
            <q-btn color="primary" icon="send" flat @click="getInvoice"
              :disable="types.val == null || form.number == null || form.client == null" />
          </q-card-section>
        </q-card>
        <q-separator spaced inset vertical dark />

        <transition name="bounce">
          <q-card class="my-card" v-if="presupuesto.state" style="min-width: 400px;" flat bordered>
            <q-list bordered>
              <q-card class="my-card">
                <q-card-section>
                  <q-item class="text-center">
                    <q-item-section>
                      <q-item-label caption lines="2">{{ types.val?.label }}</q-item-label>
                      <q-item-label class="text-h4">{{ `${presupuesto.factura.FOLIO}`
                      }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption lines="2">Fecha</q-item-label>
                      <q-item-label class="text-h6">{{ presupuesto.factura.FECHA }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption lines="2">Modelos</q-item-label>
                      <q-item-label class="text-h6">{{ presupuesto.products.length }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption lines="2">Piezas</q-item-label>
                      <q-item-label class="text-h6">{{presupuesto.products.reduce((a, e) => Number(a) +
                        Number(e.CANLFA), 0)}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption lines="2">Total</q-item-label>
                      <q-item-label class="text-h6">${{presupuesto.products.reduce((a, e) => Number(a) +
                        Number(e.TOTAL), 0)}}</q-item-label>
                    </q-item-section>

                  </q-item>
                </q-card-section>
              </q-card>

              <q-separator spaced inset vertical dark />

              <q-card class="my-card">
                <q-card-section>
                  <q-item class="text-h6 ">
                    <q-item-section>
                      <q-item-label lines="2">Cliente</q-item-label>
                    </q-item-section>
                    <q-item-section>{{ presupuesto.client.NOFCLI }}</q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
              <q-separator spaced inset vertical dark />
              <q-separator spaced inset vertical dark />

              <q-card class="my-card">
                <q-card-section>

                  <q-table class="my-sticky-virtscroll-table" style="height: 400px" :rows="presupuesto.products"
                    :columns="table.columns" hide-bottom virtual-scroll :pagination="table.pagination" />
                </q-card-section>
              </q-card>

              <q-separator spaced inset vertical dark />

              <q-btn class="full-width" color="primary" icon="receipt" label="Crear" @click="createBudget" />
            </q-list>
          </q-card>
        </transition>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import dbCompare from 'src/API/resoursesApi'
import { assist } from "src/boot/axios";
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

const types = ref({
  val: null,
  opts: [{ id: 1, label: 'Salida' }, { id: 2, label: 'Comanda' }, {id: 3, label:'Particion'}]
})
const form = ref({
  number: null,
  client: null,
  store: null
})
const presupuesto = ref({
  state: false,
  client: null,
  products: null,
  factura: null
})
const table = ref({
  columns: [
    { name: 'code', label: 'ARTICULO', align: 'center', field: row => row.ARTLFA },
    { name: 'des', label: 'DESCRIPCION', align: 'left', field: row => row.DESLFA },
    { name: 'cantidad', label: 'CANTIDAD', align: 'center', field: row => Number(row.CANLFA) },
    { name: 'precio', label: 'PRECIO', align: 'center', field: row => Number(row.PRELTA), format: (val, row) => `$ ${val}` },
    { name: 'total', label: 'TOTAL', align: 'center', field: row => Number(row.TOTAL), format: (val, row) => `$ ${val}` }
  ],
  filter: '',
  pagination: { rowsPerPage: 0 }
})


const getInvoice = () => {
  $q.loading.show({ message: 'Obteniendo Salida' })
  let url = '192.168.10.53:1619';
  // let url = '192.168.10.160:1619';
  let sale = null;
  if (types.value.val.id == 1) {
    form.value.store = VDB.session.store.id;
    console.log(form.value)
    sale = `http://${url}/storetools/public/api/Resources/getInvoiceBudget`;
  } else if (types.value.val.id == 2) {
    sale = `http://${url}/storetools/public/api/Resources/getCommand`;
    form.value.store = VDB.session.store.id_viz;
  } else if (types.value.val.id == 3) {
    sale = `http://${url}/storetools/public/api/Resources/getPartition`;
    form.value.store = VDB.session.store.id_viz;
  }
  axios.post(sale, form.value)
    .then((done) => {
      console.log(done.data)
      presupuesto.value.client = done.data.cliente;
      presupuesto.value.factura = done.data.factura;
      presupuesto.value.products = done.data.productos;
      presupuesto.value.state = true;
      $q.loading.hide();
    })
    .catch((fail) => {
      console.log(fail.response.data);
      $q.notify({ message: fail.response.data.message, type: 'negative', position: 'center' });
      $q.loading.hide();
    });
}

const updateType = () => {
  presupuesto.value = {
    state: false,
    client: null,
    products: null,
    factura: null
  }
  form.value.client = null;
  form.value.number = null;
}

const createBudget = () => {
  $q.loading.show({
    message: 'Generando Presupuesto'
  });
  presupuesto.value.factura.TOTAL = presupuesto.value.products.reduce((a, e) => Number(a) + Number(e.TOTAL), 0)
  console.log(presupuesto.value)
  let url = VDB.session.store.ip_address
  // let url = '192.168.10.207:1619';
  console.log(form.value)
  let sale = `http://${url}/storetools/public/api/Resources/createBudget`;
  axios.post(sale, presupuesto.value)
    .then(r => {
      if (r.data.status) {
        setTimeout(() => {
          $q.notify({ message: r.data.message, caption: `Folio ${r.data.folio} =>  Productos ${r.data.productos}`, type: 'positive', position: 'center' })
        }, 3200)
        updateType()

        $q.loading.hide();
      } else {
        $q.notify({ message: r.data.message, type: 'negative', position: 'center' })
        $q.loading.hide();

      }
    })
    .catch((fail) => {
      console.log(fail.response.data)
      $q.notify({ message: fail.response.data.message, type: 'negative', position: 'center' })
      $q.loading.hide();
    })
}
</script>

<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  height: 400px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #F7F7F8

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
