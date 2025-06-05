<template>
  <q-page padding v-if="cashLYT.cash">

    <q-card v-if="!order">
      <q-form @submit="searchCommand" class="q-gutter-md">
        <q-card-section>
          <q-input v-model="searchorders" type="text" label="Escanea" filled dense autofocus />
        </q-card-section>
      </q-form>
    </q-card>

    <q-separator spaced inset vertical dark />
    <div class="row justify-center">
      <transition name="bounce">
        <q-card class="my-card" v-if="order" style="min-width: 600px;">
          <q-card-section class=" text-bold text-h6 row">
            <div class="col text-left">Cliente:</div>
            <div class="col text-right">{{ order.client.name }}</div>
          </q-card-section>
          <q-card-section class=" text-bold text-h6 row">
            <div class="col text-left">Dependiente:</div>
            <div class="col text-right">{{ `${order.created_by.names} ${order.created_by.surname_pat}
              ${order.created_by.surname_mat} ` }}</div>
          </q-card-section>
          <q-card-section class=" text-bold text-h6 row">
            <div class="col text-left">Orden: </div>
            <div class="col text-right">{{ order.id }}</div>
          </q-card-section>
          <q-card-section class=" text-bold text-h6 row">
            <div class="col text-left"> Productos: </div>
            <div class="col text-right">{{ order.products.length }} ART</div>
          </q-card-section>
          <q-card-section class=" text-bold text-h6 row">
            <div class="col text-left"> Piezas: </div>
            <div class="col text-right">{{order.products.reduce((a, c) => a + c.pivot.toDelivered, 0)}} PZS</div>
          </q-card-section>
          <q-card-section class="text-bold text-h4 row bg-primary text-white">
            <div class="col text-left"> Total a Pagar: </div>
            <q-btn class="flex justify-right text-h5 bg-white text-primary" size="xl"
              :label="`$ ${order.products.reduce((a, c) => a + c.pivot.total, 0)}`" @click="payment = !payment" />
          </q-card-section>
        </q-card>
      </transition>
    </div>

    <div>
      <q-dialog v-model="payment">
        <paymentSales :total="order.products.reduce((a, c) => a + c.pivot.total, 0)" :paymeths="cashLYT.methods"
          :client="order._client" @sendTicket="sendTicket" />
      </q-dialog>
    </div>

  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { useLayoutCash } from 'stores/cashLYT';
import paymentSales from 'src/components/Sales/PaymentSales.vue';// encabezado aoiida
import { exportFile, useQuasar, date } from 'quasar';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import cashApi from 'src/API/cashApi';
import orderApi from 'src/API/orderApi';
const VDB = useVDBStore();
const $q = useQuasar();
const cashLYT = useLayoutCash();

const payment = ref(false);
const searchorders = ref(null);
const order = ref(null)
const methods = ref([]);



const searchCommand = async () => {
  if (searchorders.value) {
    $q.loading.show({ message: 'Obteniendo Orden' })
    let data = {
      uid: VDB.session.credentials.staff.id_va,
      oid: searchorders.value
    }
    const resp = await orderApi.getOrderCash(data)
    if (resp.fail) {
      if (resp.fail.status == 401) {
        console.log(resp);
        $q.notify({ message: resp.fail.response.data, type: 'negative', position: 'bottom' })
        searchorders.value = null;
        $q.loading.hide();
      } else if (resp.fail.status == 404) {
        console.log(resp);
        $q.notify({ message: resp.fail.response.data, type: 'negative', position: 'bottom' })
        searchorders.value = null;
        $q.loading.hide();
      } else {
        console.log(resp);
      }
    } else {
      order.value = resp
      console.log(resp)
      $q.loading.hide();
    }
  }
}


const sendTicket = async (pagos) => {
  $q.loading.show({ message: 'Realizando Ticket' })
  order.value.payments = pagos
  // order.value.change = (Number.parseFloat(pagos.SFPA.val) + Number.parseFloat(pagos.PFPA.val)) + Number.parseFloat(pagos.VALE.IMPANT) - order.value.products.reduce((a, c) => a + c.pivot.total, 0)
  order.value.change = pagos.conditions.super ? 0 : (Number.parseFloat(pagos.SFPA.val) + Number.parseFloat(pagos.PFPA.val)) + Number.parseFloat(pagos.VALE.val) - order.value.products.reduce((a, c) => a + c.pivot.total, 0)
  order.value.total = order.value.products.reduce((a, c) => a + c.pivot.total, 0)
  let data = {
    order: order.value,
    cashier: cashLYT.cash
  }
  console.log(data);
  const resp = await cashApi.addSale(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    payment.value = false;
    searchorders.value = null;
    methods.value = [];
    nextState()
  }

}

const nextState = async () => {
  let data = {
    uid: VDB.session.credentials.staff.id_va,
    oid: order.value.id
  }
  console.log(data);
  const resp = await orderApi.nextStateFinish(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    order.value = null
    $q.loading.hide();
  }

}

const handleKeyDown = (e) => {
  if (e.altKey && e.key === 'Enter' && order.value) {
    e.preventDefault()
    if (!payment.value) {
      payment.value = true
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

</script>

<style lang="scss">
.seeme {
  border: 2px solid green !important;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
</style>
