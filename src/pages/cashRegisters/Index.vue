<template>
  <q-table :rows="cashes" grid :columns="table.columns" @row-click="mosCash" :pagination="table.pagination">
  </q-table>

  <q-dialog v-model="cash.state" persistent>
    <q-card class="" style="width: 300px;">
      <q-card-section class="text-center text-bold text-h6 ">
        {{ cash.val.name }}
      </q-card-section>
      <q-card-section>
        <q-select v-model="cash.val.cashier.user" :options="cashiers" label="Cajero"
          :option-label="opt => opt.staff.complete_name" option filled :disable="cash.val._status == 1" />
        <q-separator spaced inset vertical dark />
        <q-select v-model="cash.val.cashier.print" :options="printers" label="Impresora" option-label="name" filled
          :disable="cash.val._status == 1" />
        <q-separator spaced inset vertical dark />
        <q-input v-model="cash.val.cashier.cash_start" type="number" label="Monto Inicial" filled
          :disable="cash.val._status == 1" />
      </q-card-section>
      <q-card-actions align="left">
        <q-btn color="negative" icon="close" flat rounded @click="reset" />
        <q-space />
        <q-btn color="positive" label="Abrir" @click="openCash" flat
          v-if="cash.val._status == 2 && (VDB.session.rol == 'gen' || VDB.session.rol == 'aud' || VDB.session.rol == 'aux' || VDB.session.rol == 'root')" />
        <q-btn color="positive" label="Ir" @click="redirect" flat v-if="cash.val._status == 1" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { useLayoutCash } from 'stores/cashLYT';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import CashApi from "src/API/cashApi";
import { exportFile, useQuasar, date } from 'quasar';
import dayjs from 'dayjs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import cashApi from 'src/API/cashApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const cashLYT = useLayoutCash();

const cashiers = ref([])
const cash = ref({
  val: null,
  state: false
})
const nwOpnCash = ref({
  cashier: {
    user: null,
    print: null,
    cash_start: 5000,
  },
  _status: 2,
  id: null,
  name: null

})
const printers = ref([])
const cashes = ref([])
const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: r => r.id },
    { name: 'name', label: 'NOMBRE', field: r => r.name },
    { name: 'status', label: 'ESTADO', field: r => r.status.name },
    { name: 'store', label: 'SUCURSAL', field: r => r.store.name },
    { name: 'cashies', label: 'ULTIMO CAJERO', field: r => r.cashier?.user.staff.complete_name },
    { name: 'open_at', label: 'ULTIMA APERTURA', field: r => r.cashier ? dayjs(r.cashier?.open_date).format('YYYY-MM-DD HH:mm:ss') : '' },
  ],
  pagination: { rowsPerPage: 0 }
})


const init = async () => {
  $q.loading.show({ message: 'Obteniendo Cajas' });
  let data = {
    uid: VDB.session.credentials.id,
    sid: VDB.session.store.id,
  }
  console.log(VDB.session)
  const resp = await CashApi.index(data)
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp)
    cashes.value = resp.cashes;
    cashiers.value = resp.cashiers
    printers.value = resp.printers
    cashLYT.setTitle('CAJAS')
    cashLYT.setDate(null)
    cashLYT.setshowtoolbar(false)
    cashLYT.setCash(null);
    $q.loading.hide()
  }
}

const mosCash = (a, b) => {
  console.log(b.name)
  cash.value.state = true
  if (b._status == 1) {
    cash.value.val = b
  } else {
    nwOpnCash.value.id = b.id
    nwOpnCash.value.name = b.name
    cash.value.val = nwOpnCash.value
  }

}

const openCash = async () => {
  $q.loading.show({ message: 'Abriendo Caja' })
  let data = {
    cashier: cash.value.val,
    uid: VDB.session.credentials.id
  }
  const resp = await cashApi.openCash(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    let inx = cashes.value.findIndex(e => e.id == resp.id)
    console.log(inx)
    if (inx >= 0) {
      cashes.value.splice(inx, 1, resp);
      reset()
      $q.loading.hide()
    }
  }
}


const reset = () => {
  cash.value.state = false
  cash.value.val = null
}

const redirect = () => {
  $router.push(`/cashRegisters/${cash.value.val.id}/automate`)
  cashLYT.setCash(cash.value.val.id);
}




init();
</script>
