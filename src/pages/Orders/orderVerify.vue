<template>
  <q-page padding v-if="order">
    <q-card class="my-card">
      <q-card-section class="row">
        <div class="col">
          <div class="text-caption text-center">Orden</div>
          <div class="text-center text-h6">{{ order.id }}</div>
        </div>
      </q-card-section>
    </q-card>

    <q-footer reveal elevated bordered class="bg-white">
      <q-card class="q-mb-md" flat bordered dense>
        <q-card-section class="row">
          <ProductAutocomplete class="col" :checkState="false" @input="add" @agregar="agregar" />
          <q-btn v-if="order.products.length > 0" color="primary" flat icon="east" @click="endFund = !endFund" round />
        </q-card-section>
      </q-card>
    </q-footer>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import CashApi from "src/API/cashApi";
import { exportFile, useQuasar, date } from 'quasar';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import dayjs from 'dayjs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import orderApi from 'src/API/orderApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const order = ref(null);
const endVerify = ref(false)

const init = async () => {
  let orderId = $route.params.ord
  const resp = await orderApi.getOrderVerify(orderId);
  if (resp.fail) {
    if (resp.fail.status == 401) {
      $q.notify({ message: resp.fail.response.data, position: 'center', type: 'negative' })
      $router.push('/verifyOrder')
    } else {
      console.log(resp)

    }
  } else {
    order.value = resp
    console.log(resp)
  }
}

const add = (opt) => {
  console.log(opt)
}

const agregar = (ops) => {
  let inx = refund.value.bodie.findIndex(e => e.product == ops.code)
  console.log(inx);
  if (inx >= 0) {
    $q.notify({ message: 'El Producto ya esta agregado', type: 'negative', position: 'center' })
  } else {
    product.value.val = {
      "product": ops.code,
      "description": ops.description,
      "price": ops.cost,
      "to_delivered": 1
    };
    product.value.state = true
    console.log(ops);
  }
}










init()
</script>
