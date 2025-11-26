<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <q-toolbar class="justify-between" v-if="$orderStore.showLyt">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> {{ $orderStore.title }} <span
            class="text-h6"></span>
        </div>
      </q-toolbar>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import catalogApi from 'src/API/catalogApi'
import orderApi from 'src/API/orderApi'
import { vizmedia } from "boot/axios"
import { useVDBStore } from 'stores/VDB';
import { useOrderStore } from 'stores/OrderStore';
import { useQuasar } from 'quasar';
import UserToolbar from "src/components/UserToolbar.vue";
import { $sktOrders } from 'boot/socket';
const appsounds = new Audio("sounds/success01.mp3")
const $route = useRoute();
const $router = useRouter();
const $orderStore = useOrderStore();
const $q = useQuasar();
const VDB = useVDBStore()
let joined = false;


const getRoom = (rol) => {
  switch (rol) {
    case 1:
    case 2:
    case 6:
      return 'admins';

    case 8:
      return 'sales';

    case 4:
    case 24:
    case 28:
      return 'supply';

    default:
      return 'sales';
  }
};

const joinedat = socket => {
  console.log(socket);
}
const newjoin = socket => {
  console.log(socket)

}


const order_add = socket => {
  console.log(socket)
  $orderStore.addOrUpdate(socket);
}
const order_update = socket => {
  console.log(socket)
  $orderStore.addOrUpdate(socket);
  if (socket.order._status == 5 && $route.path === '/preorders/warehouse') {
    console.log('aqui suena')
    appsounds.play()
  } else {
    console.log('aqui no suena')
  }
}


const init = async () => {
  $q.loading.show({ message: 'Obteniendo datos' })
  let data = {
    uid: VDB.session.credentials.staff.id_va,
    wid: VDB.session.store.id_viz,
    view: getRoom(VDB.session.credentials._rol)
  }
  console.log(data)
  const resp = await orderApi.getOrders(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $orderStore.setOrders(resp.orders);
    $orderStore.setPrinters(resp.prints);
    $orderStore.setUnits(resp.units);
    $orderStore.setRules(resp.rules);
    $orderStore.setUsers(resp.user);
    $orderStore.setProcess(resp.process);
    $q.loading.hide()
  }
}


// onMounted(async () => {
//   init()
//   // $sktOrders.connect();
//   // $sktOrders.emit("join", $orderStore.socket_user);
//   watch(
//     () => $orderStore.socket_user,
//     val => {
//       if (val) {
//         $sktOrders.connect();
//         $sktOrders.emit("join", val);
//       }
//     },
//     { immediate: true }
//   )
//   $sktOrders.on('joinedat', joinedat)
//   $sktOrders.on('newjoin', newjoin)
//   $sktOrders.on('order_add', order_add)
//   $sktOrders.on('order_update', order_update)

// })



onMounted(() => {
  init()

  // Listener de conexión
  $sktOrders.on("connect", () => {
    if (!joined && $orderStore.socket_user) {
      joined = true;
      $sktOrders.emit("join", $orderStore.socket_user)
    }
  })

  // Conexión
  $sktOrders.connect()

  // Watch para esperar a que exista el usuario
  watch(
    () => $orderStore.socket_user,
    val => {
      if (val && !joined && $sktOrders.connected) {
        joined = true;
        $sktOrders.emit("join", val)
      }
    },
    { immediate: true }
  )

  // Listeners
  $sktOrders.on('joinedat', joinedat)
  $sktOrders.on('newjoin', newjoin)
  $sktOrders.on('order_add', order_add)
  $sktOrders.on('order_update', order_update)
})

onBeforeUnmount(() => {
  $sktOrders.off('joinedat', joinedat)
  $sktOrders.off('newjoin', newjoin)
  $sktOrders.off('order_add', order_add)
  $sktOrders.off('order_update', order_update)
})
</script>
