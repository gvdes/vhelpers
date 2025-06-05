<template>
  <q-card class="my-card">
    <q-card-section style="width: 700px;" class="text-center text-bold text-h6">
      Consulta de Documentos
    </q-card-section>
    <q-card-section>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
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
import orderApi from 'src/API/orderApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const cashLYT = useLayoutCash();

const sales = ref([])


const init = async () => {
  // $q.loading.show({message:'Obteniendo Ventas'})
  let data =  {
    cash:cashLYT.cash
  }
  const resp = await cashApi.getSales(data)
  console.log(resp);
}

init();
</script>
