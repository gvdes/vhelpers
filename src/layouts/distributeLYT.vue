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
            <q-btn class="col" color="primary" icon="event" @click="stateDate = !stateDate" flat round
              v-if="store.showButton" />
            <q-separator spaced inset vertical dark />
            <q-btn class="col" color="primary" icon="add" @click="addRequisition.state = !addRequisition.state"
              v-if="store.showButtonAdd" />

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

    <q-dialog v-model="addRequisition.state">
      <q-card class="my-card" style="width: 400px; max-width: 50vw;">
        <q-card-section class="text-center text-bold text-h6">
          Nuevo Pedido
        </q-card-section>
        <q-card-section :class="!ismobile ? 'row' : ''">
          <q-select :class="!ismobile ? 'col' : ''" v-model="addRequisition.suply_by.val"
            :options="addRequisition.suply_by.opts" label="Cedis" filled option-label="alias" dense />
          <q-separator spaced inset vertical dark />
          <q-select :class="!ismobile ? 'col' : ''" v-model="addRequisition.warehouse.val"
            :options="addRequisition.warehouse.opts" label="Almacen" filled dense />
          <q-separator spaced inset vertical dark />
          <q-select :class="!ismobile ? 'col' : ''" v-model="addRequisition.types.val"
            :options="addRequisition.types.opts" label="Tipo" filled dense />
        </q-card-section>
        <q-card-section v-if="addRequisition.types?.val?.id != 1">
          <q-input v-model="addRequisition.folio" :type="addRequisition.types.val.id == 3 ? 'text' : 'number'"
            :label="addRequisition.types.val.id == 3 ? 'Ticket' : 'Folio'"
            :mask="addRequisition.types.val.id == 3 ? '#-######' : ''" filled dense :error="foioError" :error-message="foioErrorMssg"   />
        </q-card-section>
        <q-card-section>
          <q-input v-model="addRequisition.notes" type="text" label="Notas" filled dense />
        </q-card-section>
        <q-card-section>
          <q-card-actions align="right">
            <q-btn flat icon="close" color="negative" @click="addRequisition.state = !addRequisition.state" />
            <q-btn flat icon="check" color="positive" @click="addRequired" :disable="foioError"  />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import { useRestockStore } from 'stores/Restock';
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useVDBStore } from 'stores/VDB';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import RestockApi from 'src/API/RestockApi.js';
import { useQuasar, date, AddressbarColor } from 'quasar';
import { $sktRestock } from 'boot/socket';
const store = useRestockStore();


const $route = useRoute();
const $router = useRouter();
const $restockStore = useRestockStore();
const $q = useQuasar();
const VDB = useVDBStore()
const stateDate = ref(false)
const addRequisition = ref({
  state: false,
  folio: null,
  notes: null,
  types: {
    val: { id: 1, label: 'Manual' },
    opts: [
      { id: 1, label: 'Manual' },
      { id: 3, label: 'Venta' },
      { id: 4, label: 'Preventa' },
    ],
  },
  suply_by: {
    val: null,
    opts: []
  },
  warehouse: {
    val: { id: 'GEN', label: 'General' },
    opts: [
      { id: 'GEN', label: 'General' },
      { id: 'EMP', label: 'Empaques' },
    ]
  }
})
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


const ismobile = computed(() => $q.platform.is.mobile);
const foioError = computed(() => {
  if(addRequisition.value.types.val.id == 3 && addRequisition.value.folio?.length != 8 ){
    return true
  }else if(addRequisition.value.types.val.id == 4 && !addRequisition.value.folio ){
    return true
  }else{
    return false
  }
})

const foioErrorMssg = computed(() => {
  if(addRequisition.value.types.val.id == 3 && addRequisition.value.folio?.length != 8 ){
    return 'reduerda ingresar 0'
  }else if(addRequisition.value.types.val.id == 4 && !addRequisition.value.folio ){
    return 'debe de tener minimo un caracter'
  }else{
    return ''
  }
})

const init = async () => {
  $restockStore.setShowLoad(true)
  $q.loading.show({ message: "Cargado vista..." });
  console.log("%cIniciando MainLayout...", "font-size:2em;color:orange;");
  let fecha = dayjs(new Date()).format("YYYY/MM/DD")
  optranges.value.val = { from: fecha, to: fecha }
  const req = await RestockApi.index({ date: optranges.value.val, storeTo: VDB.session.store.id_viz });
  if (req.fail) {
    console.log(req);
  } else {
    console.log(req);
    $restockStore.fillOrders(req.orders);
    $restockStore.fillResume(req.resume);
    $restockStore.fillPrinters(req.printers);
    // $restockStore.setUsers(req.staff)
    $restockStore.fillPartitions(req.partitions)
    $restockStore.setShowLoad(false)
    $restockStore.setCedis(req.cedis)
    // supply_cedis.value = req.cedis
    addRequisition.value.suply_by.opts = req.cedis;
    addRequisition.value.suply_by.val = req.cedis[0];
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


const addRequired = async () => {
  $q.loading.show({ message: 'Creando Pedido' })
  addRequisition.value.workpointFrom = VDB.session.store.id_viz;
  addRequisition.value.created_by = VDB.session.credentials.staff.id_va
  console.log(addRequisition.value)
  const resp = await RestockApi.newRequisition(addRequisition.value)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide();
    $sktRestock.emit('creating', { order: resp.requisition })
    addRequisition.value = {
      state: false,
      folio: null,
      notes: null,
      types: {
        val: { id: 1, label: 'Manual' },
        opts: [
          { id: 1, label: 'Manual' },
          { id: 3, label: 'Venta' },
          { id: 4, label: 'Preventa' },
        ],
      },
      suply_by: {
        val: $restockStore.cedis[0],
        opts: $restockStore.cedis
      },
      warehouse: {
        val: { id: 'GEN', label: 'General' },
        opts: [
          { id: 'GEN', label: 'General' },
          { id: 'EMP', label: 'Empaques' },
        ]
      }
    }
    $router.push(`/distribute/dashboardStore/${resp.requisition.id}`)
  }
}


const sktOrderPartFresh = async skt => {
  console.log(skt)
  if (skt.order.requisition.to.id === VDB.session.store.id_viz || skt.order.requisition.from.id === VDB.session.store.id_viz) {
    let order = skt.order;
    console.log("Partition refresh!!", skt);
    // let resp = await RestockApi.partitionFresh(order.id);
    // console.log(resp);
    let data = skt.order;
    // let partitions = data.partition;
    let oid = skt.order.id;
    let cmd = $restockStore.addOrUpdatePartition(oid, data);
    console.log(data)
    console.log(oid)
    let part = $restockStore.ordersdb.find(e => e.id == data._requisition).partition
    console.log(part)
    let inx = part.findIndex(e => e.id == data.id);
    if (inx >= 0) {
      part.splice(inx, 1, data)
    }
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
    // let resp = await RestockApi.partitionFresh(partition.id);
    let data = skt;
    let oid = skt.id;
    let cmd = $restockStore.addOrUpdatePartition(oid, data);
  }
}

const sktPartitionDelete = async skt => {
  console.log(skt)
  let oid = skt.id;
  let requisition = skt._requisition
  let cmd = $restockStore.deleteParition(oid);
  let cmdd = $restockStore.deleteParitionOrder(oid, requisition);

}

const sktOrderUpdate = skt => {
  console.log(skt)
  $restockStore.orderUpdate(skt);
 }

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

const ChangeStatus = skt => { $restockStore.setStatusPartition(skt); }

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


onMounted(async () => {
  $sktRestock.connect();
  $sktRestock.emit("joinat", user_socket);
  $sktRestock.on("joineddashreq", sktJoinatRes);
  $sktRestock.on("creating", sktOrderCreate);
  $sktRestock.on("order_update", sktOrderUpdate);
  $sktRestock.on("order_changestate", sktOrderChangeState);
  $sktRestock.on("order_refresh", sktOrderOrderFresh);
  $sktRestock.on("orderpartition_refresh", sktOrderPartFresh);
  $sktRestock.on("sktPartitionCreate", sktPartitionCreate);
  $sktRestock.on("sktPartitionDelete", sktPartitionDelete);
  $sktRestock.on("ChangeStatus", ChangeStatus);
  await nextTick();
  window.layoutReady = true;
  await init()
  window.dispatchEvent(new Event('layout-ready'));
})

onBeforeUnmount(() => {
  $sktRestock.off("joineddashreq", sktJoinatRes);
  $sktRestock.off("creating", sktOrderCreate);
  $sktRestock.off("order_update", sktOrderUpdate);
  $sktRestock.off("order_changestate", sktOrderChangeState);
  $sktRestock.off("order_refresh", sktOrderOrderFresh);
  $sktRestock.off("orderpartition_refresh", sktOrderPartFresh);
  $sktRestock.on("sktPartitionCreate", sktPartitionCreate);
  $sktRestock.on("sktPartitionDelete", sktPartitionDelete);
  $sktRestock.on("ChangeStatus", ChangeStatus);

})


</script>
