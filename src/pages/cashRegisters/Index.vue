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
          :option-label="opt => opt.complete_name" option filled :disable="disableOpen" clearable dense />
        <q-separator spaced inset vertical dark />
        <q-select v-model="cash.val.cashier.print" :options="printers" label="Impresora" option-label="name" filled
           :clearable="!disableOpen" @update:model-value="changePrint" dense>
          <template v-slot:after v-if="cash.val.cashier.print">
            <q-btn round dense flat icon="print" @click="testPrint" />
          </template></q-select>
        <q-separator spaced inset vertical dark />
        <q-input v-model="cash.val.cashier.cash_start" type="number" label="Monto Inicial" filled
          :disable="disableOpen" dense />
      </q-card-section>
      <q-card-actions align="left">
        <q-btn color="negative" icon="close" flat rounded @click="reset" />
        <q-btn flat color="primary" icon="account_balance"
          v-if="cash.val._status == 1 && ['gen', 'gro', 'aux', 'root', 'des'].includes(VDB.session.rol) && countDisable"
          title="Arqueo de Caja" @click="cash_count" />
        <q-space />
        <!-- <div v-if="!disableOpen"> -->
        <q-btn color="positive" label="Abrir" @click="openCash" flat
          v-if="cash.val._status == 2 && ['gen', 'gro', 'aux', 'root', 'des'].includes(VDB.session.rol) && !disableOpen"
          :disable="disableOpen || !cash.val.cashier.user || !cash.val.cashier.print" />
        <q-btn color="positive" label="Ir" @click="redirect" flat v-if="cash.val?._status == 1" />
        <!-- </div> -->
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="openCashCount" persistent>
    <cashCount :cash="cash.val" />
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
import cashCount from 'src/components/Cash/cashCount.vue';

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
    { name: 'cashies', label: 'ULTIMO CAJERO', field: r => r.cashier?.user.complete_name },
    { name: 'open_at', label: 'ULTIMA APERTURA', field: r => r.cashier ? dayjs(r.cashier?.open_date).format('YYYY-MM-DD HH:mm:ss') : '' },
  ],
  pagination: { rowsPerPage: 0 }
})

const disableOpen = computed(() => {
  const openDate = cash.value.val?.cashier?.open_date;
  if (!openDate) return false;
  const today = dayjs().format("YYYY-MM-DD");
  const cashierDate = dayjs(openDate).format("YYYY-MM-DD");
  console.log("Hoy:", today, "OpenDate:", cashierDate);
  return cash.value.val?._status == 1 || today === cashierDate;
});
const countDisable = computed(() => {
  const openDate = cash.value.val?.cashier?.open_date;
  if (!openDate) return false;
  const today = dayjs().format("YYYY-MM-DD");
  const cashierDate = dayjs(openDate).format("YYYY-MM-DD");
  console.log("Hoy:", today, "OpenDate:", cashierDate);
  return today === cashierDate;
})
const openCashCount = computed(() => cashLYT.dialogModule === 10);


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
  console.log(b)

  cash.value.state = true

  const today = dayjs().format("YYYY-MM-DD")
  const cashierDate = b.cashier?.open_date ? dayjs(b.cashier.open_date).format("YYYY-MM-DD") : null

  console.log("Hoy:", today, "OpenDate:", cashierDate)

  if (b._status == 1) {
    cash.value.val = b
  } else if (b._status == 2 && today === cashierDate) {
    cash.value.val = b
  } else {
    nwOpnCash.value.id = b.id
    nwOpnCash.value.name = b.name
    nwOpnCash.value.store = b.store
    nwOpnCash.value._terminal = b._terminal
    cash.value.val = nwOpnCash.value
  }

  console.log(cash.value.val);
}

const openCash = async () => {
  $q.loading.show({ message: 'Abriendo Caja' })
  let data = {
    cashier: cash.value.val,
    uid: VDB.session.credentials.id
  }
  console.log(data);
  const resp = await cashApi.openCash(data)
  console.log(resp)
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
  $router.push(`/cashRegisters/${cash.value.val.id}/cash`)
  cashLYT.setCash(cash.value.val.id);
}

const cash_count = () => {
  console.log('se realizara arqueo de caja')
  cashLYT.openDialogModule(10)
  console.log(cashLYT.dialogModule)

}

const testPrint = async () => {
  $q.loading.show({ message: 'Probando Impresora' })
  let data = {
    cashier: cash.value.val.cashier.print,
    uid: VDB.session.credentials.id
  }
  const resp = await cashApi.testPrintCash(data)
  if(resp.fail){
    console.log(resp)
  }else{
    console.log(resp)
    $q.loading.hide();
  }
}

const changePrint =  async (val) => {
  if(cash.value.val._status == 1){
    $q.loading.show({message:'Realizando Cambio'})
    console.log(val)
    let data = {
      print:val.id,
      cashier:cash.value.val.cashier.id
    }
    console.log(data)
    const resp = await cashApi.changePrint(data);
    if(resp.fail){
      console.log(resp);

    }else{
      console.log(resp)
      $q.loading.hide()
      $q.notify({message:'Cambio Realizado',type:'positive',position:'center'})
    }

  }
}

init();
</script>
