<template>
  <q-card>
    <q-card-section class="text-center text-bold text-h6">
      Retiradas Efectivo
    </q-card-section>
    <q-card-section>
      <q-input v-model="withdrawal.concept" type="text" label="Concepto" filled autofocus dense />
    </q-card-section>
    <q-card-section>
      <q-input v-model="withdrawal.import" type="number" label="Importe" filled dense />
    </q-card-section>
    <q-card-section>
      <q-select v-model="withdrawal.providers.val" :options="withdrawal.providers.opts" label="Provedoores"
        option-label="name" filled dense />
    </q-card-section>
    <q-card-section>
      <q-btn class="full-width bg-black text-white" flat label="Consultar Retiradas" @click="consultWidrawal" />
    </q-card-section>
    <q-card-actions>
      <q-btn flat icon="close" color="negative" @click="reset" />
      <q-space />
      <q-btn flat icon="send" color="positive" @click="createdWidrawal" :disable="!validForm" />
    </q-card-actions>
  </q-card>

  <q-dialog v-model="withdrawals.status" >
    <q-card style="width: 565px; max-width: 80vw;">
      <q-card-section class="row items-center">
        <q-table :rows="withdrawals.vals" :columns="table.columns" :pagination="table.pagination" @row-click="printRet"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { useLayoutCash } from 'stores/cashLYT';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { exportFile, useQuasar, date } from 'quasar';
import dayjs from 'dayjs';
import { computed, ref, onMounted, watch } from 'vue';
import cashApi from 'src/API/cashApi';
import saleLocalApi from 'src/API/saleLocalApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const cashLYT = useLayoutCash();
const cash = ref(null)

const withdrawal = ref({
  import: 0,
  concept: null,
  providers: {
    val: null,
    opts: cashLYT.providers
  }
})

const withdrawals = ref({
  status: false,
  vals: [],
});

const table = ref({
  columns:[
    {name:'fs_code',label:'code',field:r=>r.CODRET},
    {name:'date',label:'Factusol',field:r=>r.FECHA},
    {name:'hour',label:'Factusol',field:r=>r.HORA},
    {name:'concept',label:'Factusol',field:r=>r.CONRET},
    {name:'import',label:'Factusol',field:r=>r.IMPRET},
    {name:'provedor',label:'Provedor',field:r=>r.NOFPRO},,
  ],
  pagination:{rowsPerPage:0}
})

const validForm = computed(() => withdrawal.value.concept && withdrawal.value.import > 0 && withdrawal.value.providers.val )


const consultWidrawal = async () => {
  $q.loading.show({ message: 'OBTENIENDO RETIRADAS' })
  let data = {
    cash: cashLYT.cash,
  }
  console.log(data);
  const resp = await saleLocalApi.getWithdrawal(data);
  console.log(resp)
  if (resp.fail) {
    console.log(resp);
  } else {
    // console.log(resp);
    withdrawals.value.status = true
    withdrawals.value.vals = resp.withdrawals
    $q.loading.hide();
  }


}

const createdWidrawal = async () => {
  $q.loading.show({ message: 'CREANDO RETIRADA' })
  let data = {
    cash: cashLYT.cash,
    withdrawal: withdrawal.value
  }
  console.log(data);
  const resp = await saleLocalApi.addWithdrawal(data);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.notify({ message: `Retirada ${resp} Creada`, type: 'positive', position: 'bottom' })
    $q.loading.hide();
    reset()
  }
}

const printRet = async  (a,b) =>{
  $q.loading.show({ message: 'RIMPRIMIENDO RETIRADA' })
  let data = {
    cash:cashLYT.cash,
    withdrawal:b.CODRET
  }
  const resp = await saleLocalApi.printWitrawal(data);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.loading.hide();

  }
}

const reset = () => {
  withdrawal.value = {
    import: 0,
    concept: null,
    providers: {
      val: null,
      opts: cashLYT.providers
    }
  }
  cashLYT.closeDialogModule()
}
</script>
