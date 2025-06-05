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
      <q-btn flat icon="send" color="positive" @click="createdWidrawal" />
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
import orderApi from 'src/API/orderApi';
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
    {name:'codigo',label:'Codigo',field:r=>r.id},
    {name:'fs_code',label:'Factusol',field:r=>r.fs_id},
    {name:'provedor',label:'Provedor',field:r=>r.provider.name},
    {name:'concept',label:'Concepto',field:r=>r.concept},
    {name:'import',label:'Importe',field:r=>r.import},
  ],
  pagination:{rowsPerPage:0}
})


const consultWidrawal = async () => {
  $q.loading.show({ message: 'OBTENIENDO RETIRADAS' })
  let data = {
    cash: cashLYT.cash,
  }
  console.log(data);
  const resp = await cashApi.getWithdrawals(data);
  if (resp.fail) {
    console.log(resp);
  } else {
    // console.log(resp);
    withdrawals.value.status = true
    withdrawals.value.vals = resp
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
  const resp = await cashApi.addWitrawal(data);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.notify({ message: `Retirada ${resp.retirada.fs_id} Creada`, type: 'positive', position: 'bottom' })
    $q.loading.hide();
    reset()
  }
}

const printRet = async  (a,b) =>{
  $q.loading.show({ message: 'RIMPRIMIENDO RETIRADA' })
  const resp = await cashApi.reprintWithdrawal(b);
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
