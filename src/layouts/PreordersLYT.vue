<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> {{ $orderStore.title }} <span class="text-h6"></span>
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

const $route = useRoute();
const $router = useRouter();
const $orderStore = useOrderStore();
const $q = useQuasar();
const VDB = useVDBStore()


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
      return null;
  }
};



const user_socket = {
  profile: {
    me: {
      id: VDB.session.credentials.staff.id_va,
      nick: VDB.session.credentials.nick,
      picture: '',
      names: VDB.session.credentials.staff.complete_name,
      surname_pat: '',
      surname_mat: '',
      change_password: false,
      _rol: VDB.session.credentials._rol
    },
    workpoint: VDB.session.store
  },
  workpoint: VDB.session.store
};

user_socket.room = getRoom(user_socket.profile.me._rol);


const joinedat = socket => {
  console.log(socket);
}
const newjoin = socket =>{
  console.log(socket)

}

const order_add = socket => {
  console.log(socket)
  $orderStore.addOrUpdate(socket);
}
const order_update = socket =>{
  console.log(socket)
  $orderStore.addOrUpdate(socket);
}


const init = async () => {
  $q.loading.show({message:'Obteniendo datos'})
  const resp = await orderApi.getOrders(VDB.session.store.id_viz)
  if(resp.fail){
    console.log(resp)
  }else{
    console.log(resp)
    $orderStore.setOrders(resp);
    $q.loading.hide()
  }
}


onMounted(async () => {
init()
$sktOrders.connect();
$sktOrders.emit("join", user_socket);
$sktOrders.on('joinedat',joinedat)
$sktOrders.on('newjoin',newjoin)
$sktOrders.on('order_add',order_add)
$sktOrders.on('order_update',order_update)

})

onBeforeUnmount(() => {
$sktOrders.off('joinedat',joinedat)
$sktOrders.off('newjoin',newjoin)
$sktOrders.off('order_add',order_add)
$sktOrders.off('order_update',order_update)
})
</script>
