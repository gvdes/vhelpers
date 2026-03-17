<template>
  <q-page padding>
    <q-card class="my-card" dense>
      <q-card-section dense>
        <q-toolbar class="justify-between">
          <div>
            <span class="text-grey">Helpers</span>
            <q-icon name="navigate_next" color="primary" />
            <span class="text-h6">SALIDAS DE MERCANCIA</span>
          </div>
          <div class="row">
            <q-btn icon="add" flat rounded @click="addInvoice = !addInvoice" />
          </div>
        </q-toolbar>
      </q-card-section>
    </q-card>
  </q-page>

  <q-dialog v-model="addInvoice" persistent>
    <q-card>
      <q-card-section class="text-center text-bold text-h5">
        Sucursal Destino
      </q-card-section>
      <q-card-section>
        <!-- <q-select v-model="type.val" :options="type.opts" label="Tipo" filled /> -->
        <q-select v-model="invoice.to" :options="stores.filter(e => e._type == 1)" label="Oringen" filled dense
          option-label="name" />
        <q-separator spaced inset vertical dark />
        <q-select v-model="invoice.from" :options="stores.filter(e => e._type == 2)" label="Destino" filled dense
          option-label="name" />
        <q-separator spaced inset vertical dark />
        <q-input v-model="invoice.notes" type="text" label="Notas" filled dense />

      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" v-close-popup />
        <q-btn flat label="Crear" color="positive" @click="createInvoice" />
      </q-card-actions>
    </q-card>

  </q-dialog>

</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import CashApi from "src/API/cashApi";
import { exportFile, useQuasar, date } from 'quasar';
import dayjs from 'dayjs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import { $sktRestock } from 'boot/socket';
import invApi from 'src/API/invoicesApi.js';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();

const stores = ref([]);
const warehouses = ref([])
const addInvoice = ref(false);

const invoice = ref({
  from: null,//de
  to: null,//a
  notes: null,
  created_by: null
})

// const type = ref({
//   val: {id:2, label:'Salida'},
//   opts:[
//     {id:1, label:'Nota'},
//     {id:2, label:'Salida'},
//     {id:3, label:'Traspaso'},
//   ]
// })

const init = async () => {
  const resp = await invApi.index();
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    stores.value = resp.stores
  }
}

const createInvoice = async () => {
  $q.loading.show({ message: 'Creando Salida' })
  invoice.value.created_by = VDB.session.credentials.staff
  console.log(invoice.value)
  const resp = await invApi.addInvoice(invoice.value);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    $sktRestock.emit('creating',  {order: resp.requisition} )
    $sktRestock.emit('partitionCreate',  resp.partition )
    $router.push(`/distribute/invoice/${resp.requisition.id}`)
    $q.loading.hide();
  }
}

// if(VDB.modules.filter(e => e.))
init()
</script>
