<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
    </q-header>
    <q-page-container>
      <q-toolbar class="row justify-between items-center" v-if="$restockStore.showLYT">
        <div class="text-bold">{{ store.title }} </div>
        <div>{{
          optranges.val && optranges.val.from
            ? `Del ${optranges.val.from} a ${optranges.val.to}`
            : optranges.val
          }}</div>
        <div class="row">
          <q-btn color="white" round unelevated flat icon="sync" @click="init" />
          <div class="col row">
            <q-btn color="primary" icon="event" @click="stateDate = !stateDate" flat round v-if="store.showButton" />
          </div>
        </div>
      </q-toolbar>
      <router-view />
    </q-page-container>
    <q-dialog v-model="stateDate">
      <q-card class="my-card">
        <q-card-section>
          <div class="q-pa-md">
            <div class="q-pb-sm text-center">
              <!-- {{ optranges.val }}
             {{ optranges.val.from ? `De: ${optranges.val?.from} A: ${optranges.val?.to} ` : optranges.val}} -->
            </div>
            <q-date v-model="optranges.val" range minimal />
          </div>
        </q-card-section>
        <q-card-section>
          <q-card-actions align="right">
            <q-btn flat icon="close" color="negative" @click="stateDate = !stateDate" />
            <q-btn flat icon="check" color="positive" @click="buscas" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import { useRestockStore } from 'stores/Restock';
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useVDBStore } from 'stores/VDB';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import RestockApi from 'src/API/RestockApi.js';
import { useQuasar, date } from 'quasar';
import { $sktRestock } from 'boot/socket';
const store = useRestockStore();


const $route = useRoute();
const $router = useRouter();
const $restockStore = useRestockStore();
const $q = useQuasar();
const VDB = useVDBStore()
const stateDate = ref(false)
const optranges = ref({
  val: { from: null, to: null }
});
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
      _rol: 1
    },
    workpoint: VDB.session.store
  },
  workpoint: VDB.session.store
}
const init = async () => {
  $restockStore.setShowLoad(true)
  $q.loading.show({ message: "Cargado vista..." });
  console.log("%cIniciando MainLayout...", "font-size:2em;color:orange;");
  let fecha = dayjs(new Date()).format("YYYY/MM/DD")
  optranges.value.val =   { from: fecha, to: fecha }
  const req = await RestockApi.index({ date: optranges.value.val, storeTo: VDB.session.store.id_viz });
  if (req.fail) {
    console.log(req);
  } else {
    console.log(req);
    $restockStore.fillOrders(req.orders);
    $restockStore.fillResume(req.resume);
    $restockStore.fillPrinters(req.printers);
    $restockStore.setUsers(req.staff)
    $restockStore.fillPartitions(req.partitions)
    $restockStore.setShowLoad(false)
    console.log("%cMainLayout listo!!", "font-size:2em;color:orange;");
    $q.loading.hide();
  }

}

const buscas = async () => {
  stateDate.value = false
  $q.loading.show({ message: 'Obteniendo Datos' })
  const req = await RestockApi.index({ date: optranges.value.val, storeTo: VDB.session.store.id_viz });
  console.log(req);
  $restockStore.fillOrders(req.orders);
  $restockStore.fillPartitions(req.partitions)
  console.log("%cMainLayout listo!!", "font-size:2em;color:orange;");
  $q.loading.hide();
}


const sktOrderPartFresh = async skt => {
  console.log(skt)
  if (skt.order.requisition.to.id === VDB.session.store.id_viz || skt.order.requisition.from.id === VDB.session.store.id_viz) {
    let order = skt.order;
    console.log("Partition refresh!!", skt);
    let resp = await RestockApi.partitionFresh(order.id);
    console.log(resp);
    let data = resp.data.order;
    // let partitions = data.partition;
    let oid = resp.data.oid;
    let cmd = $restockStore.addOrUpdatePartition(oid, data);
    // $q.notify({
    //   message: `La Particion <b>${oid}</b> esta listo para iniciar <b>embarque</b>`,
    //   html: true,
    //   color: "purple-10",
    //   icon: "fa-solid fa-truck-ramp-box"
    // });
    // }
  }

}

const sktJoinatRes = skt => {
  console.log(
    `%c${skt.user.me.nick} de ${skt.from.alias} se ha unido a Restock (UID: ${skt.user.me.id})`,
    "background:#076F3E;color:#f5f6fa;border-radius:10px;padding:10px;font-size:1.1em;"
  );
}


const sktOrderCreate = async skt => {
  console.log(skt)
  if (skt.order.to.id === VDB.session.store.id_viz || skt.order.from.id === VDB.session.store.id_viz) {
    let order = skt.order;
    console.log(skt.order.to.id)
    let resp = await RestockApi.orderFresh(order.id);
    let data = resp.data.order;
    let oid = resp.data.oid;
    let cmd = $restockStore.addOrUpdate(oid, data);
  }
}

const sktPartitionCreate = async skt => {
  console.log(skt)
  if (skt.requisition.to.id === VDB.session.store.id_viz || skt.requisition.from.id === VDB.session.store.id_viz) {
    let partition = skt;
    console.log(skt.requisition.to.id)
    let resp = await RestockApi.partitionFresh(partition.id);
    let data = resp.data.order;
    let oid = resp.data.oid;
    let cmd = $restockStore.addOrUpdatePartition(oid, data);
  }
}

const sktOrderUpdate = skt => { $restockStore.orderUpdate(skt); }

const sktOrderChangeState = async skt => {
  if (skt.order.to.id === VDB.session.store.id_viz) {
    let order = skt.order;
    let newstate = skt.state;
    let resp = await RestockApi.orderFresh(order.id);
    let data = resp.data.order;
    let oid = resp.data.oid;
    let cmd = $restockStore.addOrUpdate(oid, data);
    if (newstate.id == 2) {
    }
  }

}

const sktOrderOrderFresh = async skt => {
  console.log(skt)
  if (skt.order?.to.id === VDB.session.store.id_viz || skt.order.from.id === VDB.session.store.id_viz) {
    console.log("REFRESHING BY SKT!!", skt);
    let order = skt.order;
    let resp = await RestockApi.orderFresh(order.id);
    console.log(resp);
    let data = resp.data.order;
    console.log(data.partition);
    let oid = resp.data.oid;
    let cmd = $restockStore.addOrUpdate(oid, data);
  }
}


onMounted(() => {
  $sktRestock.connect();
  $sktRestock.emit("joinat", user_socket);
  $sktRestock.on("joineddashreq", sktJoinatRes);
  $sktRestock.on("creating", sktOrderCreate);
  $sktRestock.on("order_update", sktOrderUpdate);
  $sktRestock.on("order_changestate", sktOrderChangeState);
  $sktRestock.on("order_refresh", sktOrderOrderFresh);
  $sktRestock.on("orderpartition_refresh", sktOrderPartFresh);
  $sktRestock.on("sktPartitionCreate", sktPartitionCreate);

})

onBeforeUnmount(() => {
  $sktRestock.off("joineddashreq", sktJoinatRes);
  $sktRestock.off("creating", sktOrderCreate);
  $sktRestock.off("order_update", sktOrderUpdate);
  $sktRestock.off("order_changestate", sktOrderChangeState);
  $sktRestock.off("order_refresh", sktOrderOrderFresh);
  $sktRestock.off("orderpartition_refresh", sktOrderPartFresh);
  $sktRestock.on("sktPartitionCreate", sktPartitionCreate);

})

init()
</script>
