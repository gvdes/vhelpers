<template>
  <q-card>
    <q-card-section class="text-center text-bold text-h6">
      Ingreso Efectivo
    </q-card-section>
    <q-card-section>
      <q-input v-model="ingress.concept" type="text" label="Concepto" filled autofocus dense />
    </q-card-section>
    <q-card-section>
      <q-input v-model="ingress.import" type="number" label="Importe" filled dense />
    </q-card-section>
    <q-card-section>
      <q-select v-model="ingress.client.val" :options="ingress.client.opts" label="Clientes" option-label="name" filled
        dense />
    </q-card-section>
    <q-card-section>
      <q-btn class="full-width bg-black text-white" flat label="Consultar Ingresos" @click="consultIngress" />
    </q-card-section>
    <q-card-actions>
      <q-btn flat icon="close" color="negative" @click="reset" />
      <q-space />
      <q-btn flat icon="send" color="positive" @click="createdIngress" />
    </q-card-actions>
  </q-card>

    <q-dialog v-model="ingresing.status" >
    <q-card style="width: 565px; max-width: 80vw;">
      <q-card-section class="row items-center">
        <q-table :rows="ingresing.vals" :columns="table.columns" :pagination="table.pagination" @row-click="printIng"/>
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


const ingress = ref({
  concept: null,
  import: 0,
  client: {
    val: null,
    opts: cashLYT.clients
  }
})

const ingresing = ref({
  status: false,
  vals: [],
});

const table = ref({
  columns:[
    {name:'codigo',label:'Codigo',field:r=>r.id},
    {name:'fs_code',label:'Factusol',field:r=>r.fs_id},
    {name:'client',label:'Cliente',field:r=>r.client.name},
    {name:'concept',label:'Concepto',field:r=>r.concept},
    {name:'import',label:'Importe',field:r=>r.import},
  ],
  pagination:{rowsPerPage:0}
})

const consultIngress = async () => {
  $q.loading.show({ message: 'OBTENIENDO INGRESOS' })
  let data = {
    cash: cashLYT.cash,
  }
  console.log(data);
  const resp = await cashApi.getIngress(data);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    ingresing.value.status = true
    ingresing.value.vals = resp
    $q.loading.hide();
  }

}

const reset = () => {
  ingress.value = {
    concept: null,
    import: 0,
    client: {
      val: null,
      opts: []
    }
  }
  cashLYT.closeDialogModule()
}

const createdIngress = async () => {
  $q.loading.show({ message: 'CREANDO INGRESO' })
  let data = {
    cash: cashLYT.cash,
    ingress: ingress.value
  }
  console.log(data);
  const resp = await cashApi.addIngress(data);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.notify({ message: `Ingreso ${resp.ingreso.fs_id} Creada`, type: 'positive', position: 'bottom' })
    $q.loading.hide();
    reset()
  }
}

const printIng = async  (a,b) =>{
  $q.loading.show({ message: 'RIMPRIMIENDO INGRESO' })
  const resp = await cashApi.reprintIngress(b);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.loading.hide();

  }
}


</script>
