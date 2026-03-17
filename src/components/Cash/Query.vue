<template>
  <q-card class="my-card">
    <q-card-section style="" class="text-center text-bold text-h6">
      Consulta de Documentos
    </q-card-section>
    <q-card-section>
      <q-table
        :rows="sales"
        :columns="table.columns"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { useLayoutCash } from 'stores/cashLYT';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { exportFile, useQuasar, date } from 'quasar';
import dayjs from 'dayjs';
import { computed, ref, onMounted, watch } from 'vue';
import cashApi from 'src/API/cashApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const cashLYT = useLayoutCash();

const sales = ref([])

const table  = ref({
  columns:[
    {name:'id',label:'ID',field:r=>r.id},
    {name:'client',label:'CLIENTE',field:r=>r.client_name},
    {name:'staff',label:'COLABORADOR',field:r=>r.staff.complete_name},
    {name:'fpas',label:'FPAS',field:r=> r.payments.length},
  ]
})


const init = async () => {
  // $q.loading.show({message:'Obteniendo Ventas'})
  let data =  {
    cash:cashLYT.cash
  }
  const resp = await cashApi.getSales(data)
  if(resp.fail){
    console.log(resp);
  }else{
  console.log(resp);
  sales.value = resp;
  }

}

init();
</script>
