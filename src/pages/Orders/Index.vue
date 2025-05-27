<template>
  <q-page padding>
    <q-card class="my-card" dense>
      <q-card-section dense>
        <q-toolbar class="justify-between">
          <div>
            <span class="text-grey">Helpers</span>
            <q-icon name="navigate_next" color="primary" />
            <span class="text-h6">Verificacion Pedidos</span>
          </div>
          <div class="row">
          </div>
        </q-toolbar>
      </q-card-section>
    </q-card>

    <q-separator spaced inset vertical dark />

    <q-card class="my-card">
      <q-card-section>
        <q-form @submit="obtOrder" class="q-gutter-md">
          <q-input v-model="order" type="number" label="Escanea" filled hint="Escanea el pedido de preventa" />
        </q-form>
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
import orderApi from 'src/API/orderApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();

const order = ref(null);


const obtOrder = async () => {
  // $q.loading.show({ message: 'Obteniendo Datos' });
  let data = {uid:VDB.session.credentials.staff.id_va}
  if (order.value) {
    console.log(order.value);
    const resp = await orderApi.getOrder(order.value,data);
    if (resp.fail) {
      console.log(resp);
      if (resp.fail.status == 401) {
        $q.notify({ message: resp.fail.response.data, position: 'center', type: 'negative' })
      } else {
        console.log(resp)
      }
    } else {1311866
      $router.push(`/verifyOrder/${resp.id}`)
      console.log(resp);
      order.value = null
      $q.loading.hide();
    }
  }
}






</script>
