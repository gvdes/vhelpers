<template>
  <q-page padding v-if="cash?.cashier">
    <q-card>
      <q-card-section >
        <q-input v-model="text" type="text" label="Escanea" filled />
      </q-card-section>
    </q-card>

  </q-page>
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
import cashApi from 'src/API/cashApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const cash = ref(null)
const clients = ref({
  val:null,
})

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Caja' })
  let data = {
    uid: VDB.session.credentials.id,
    cash: $route.params.cid,
    sid: VDB.session.store.id
  }
  const resp = await cashApi.getCash(data);
  if (resp.fail) {
    if (resp.fail.status == 401) {
      $router.push('/cashRegisters')
      $q.loading.hide()
      $q.notify({message:'No tienes acceso a la caja',type:'negative',position:'center'})
    } else {
      console.log(resp)
    }
  } else {
    console.log(resp);
    cash.value = resp
    $q.loading.hide()
  }
}

init()
</script>
