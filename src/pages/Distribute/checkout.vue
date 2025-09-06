<template>
  <q-page padding>
    <div>
      <div class="flex justify-center">
        <div class="text-center " :style="`width: 50%;`">
          <q-form @submit="nextState">
            <q-input v-model="partition" type="number" label="Pedido" autofocus rounded outlined />
          </q-form>
        </div>
      </div>
      <q-table :rows="ordersdb" row-key="name" grid :pagination="pagination" hide-bottom>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-list bordered :class="colorsets(props.row)">
              <q-item clickable v-ripple @click="() => { mosPartition.state = true; mosPartition.val = props.row }">
                <q-item-section>
                  <q-item-label class="text-center text-bold">{{ props.row.id }}</q-item-label>
                  <q-item-label class="text-center text-overline text-caption"> <span class="text-bold">{{
                    props.row.requisition.from.name }}</span> (P: {{
                        props.row.requisition.id }})</q-item-label>

                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>


  <q-dialog v-model="warehouseSel.state">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="orange-14" text-color="white" />
        <span class="q-mx-sm text-h6">Iniciar CheckOut #{{ partition.id }}</span>
      </q-card-section>
      <q-card-section>
        <q-select v-model="warehouseSel.val" :options="warehouseSel.opts" label="Almacen Destino" filled />
      </q-card-section>
      <q-card-actions vertical align="center">
        <q-btn flat label="Si" color="primary" @click="nextState" :disable="warehouseSel.val == null" />
      </q-card-actions>
    </q-card>
  </q-dialog>


  <q-dialog v-model="mosPartition.state" persistent>
    <q-card>
      <q-card-section class="text-bold text-h5 items-center">
        Particion {{ mosPartition.val.id }}

      </q-card-section>
      <q-card-section class="text-center">
        Que Desesas Hacer ?
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat icon="close" color="negative" v-close-popup />
        <q-btn flat icon="print" color="primary">
          <q-menu class="bg-grey-1 text-indigo-10" style="min-width:250px;">
            <PrinterSelect @selectedPartition="printForPartition" :partition="true" />
          </q-menu>
        </q-btn>
        <q-btn flat icon="send" color="positive" @click="nextState" />

      </q-card-actions>
    </q-card>
  </q-dialog>


</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import RestockApi from 'src/API/RestockApi.js';
import { useVDBStore } from 'stores/VDB';
import { useRestockStore } from 'stores/Restock';
import { useQuasar } from 'quasar';
import { $sktRestock } from 'boot/socket';
import PrinterSelect from 'src/components/Restock/PrinterSelect.vue';
const $route = useRoute();
const $router = useRouter();
const $restockStore = useRestockStore();
const $q = useQuasar();
const VDB = useVDBStore()

const partition = ref(null)
const pagination = ref({ rowsPerPage: [0] })
const mosPartition = ref({
  state: false,
  val: null
})

const warehouseSel = ref({
  state: false,
  val: null,
  opts: [
    'GEN', 'EMP'
  ]
})

const ordersdb = computed(() => $restockStore.partitions.filter(o => o._status == 4 || o._status == 5 && o.requisition._workpoint_to == VDB.session.store.id_viz))
const init = async () => {
  $restockStore.setShowLYT(true)
  $restockStore.setTitle('Verificacion')
  $restockStore.setButtonShow(false)
}

const printForPartition = async data => {
  $q.loading.show({ message: "..." });
  console.log(data.ip);
  console.log(mosPartition.value)
  const resp = await RestockApi.printForPartition({ ip: data.ip, port: data._port, _partition: mosPartition.value.val.id, _workpoint_to: mosPartition.value.val._workpoint_to });
  console.log(resp);
  if (resp.status == 200) {
    let responding = resp.data;
    if (responding) {
      $q.notify({ message: "Impresion correcta", icon: "done", color: "positive", position: "top" });
    } else {
      $q.notify({ message: `Sin conexion a <b>${data.name} <small>(${data.ip})</small></b>`, icon: "fas fa-bug", color: "negative", position: "center", html: true, timeout: 4000 });
    }
    $q.loading.hide();
  } else { console.error(resp); alert(`Error ${resp.status}: ${resp.data}`); }
}

// const mosPartitiionStatus = () => {
//   // if(mosPartition.value.val.requisition.from._type == 1){

//   // };
//   // // if(mosPartition.value.)
//   if (mosPartition.value.val) {
//     partition.value = mosPartition.value.val.id
//   }
//   console.log(partition.value)
//   // let ext = ordersdb.value.findIndex(e => e.id == partition.value);
//   let ext = ordersdb.value.find(e => e.id == partition.value);
//   console.log(ext)
//   if (ext) {
//     partition.value = ext;
//     warehouseSel.value.state = true;
//   } else {
//     $q.notify({ message: 'No se encuentra tu pedido', type: 'negative', position: 'bottom' })
//     partition.value = null
//   }
// }

// const nextState = async () => {
//   // console.log(partition.value)
//   $q.loading.show({message:'Cambiando Estado'})
//   let data = {
//     partition: partition.value,
//     verified: VDB.session.credentials.staff.id,
//     warehouse: warehouseSel.value.val ? warehouseSel.value.val : 'GEN',
//     state: 5
//   }
//   console.log(data)
//   let savesupply = await RestockApi.SaveVerified(data);
//   console.log(savesupply)
//   if (savesupply.status == 200) {
//     let inx = $restockStore.partitions.findIndex(e => e.id == savesupply.data.partition.id);
//     if (inx >= 0) {
//       $restockStore.partitions.splice(inx, 1, savesupply.data.partition)
//       if (savesupply.data.partitionsEnd > savesupply.data.partition.requisition._status) {
//         let nes = { id: savesupply.data.partition._requisition, state: savesupply.data.partitionsEnd };
//         const nxt = await RestockApi.nextState(nes);
//         $sktRestock.emit("order_refresh", { order:nxt.data });
//         console.log(nxt.data);
//       }
//       $sktRestock.emit("orderpartition_refresh", { order: savesupply.data.partition })
//     }
//     partition.value = null
//     $router.push(`/distribute/checkout/${savesupply.data.partition.id}`)
//     $q.loading.hide();
//   } else {
//     alert(`Error ${savesupply.status}: ${savesupply.data} 2`);
//   }
// }



const nextState = async () => {
  if (mosPartition.value.val) {
    partition.value = mosPartition.value.val.id
  }
  console.log(partition.value)
  // let ext = ordersdb.value.findIndex(e => e.id == partition.value);
  let ext = ordersdb.value.find(e => e.id == partition.value);
  if (ext._status == 5) {
    $router.push(`/distribute/checkout/${ext.id}`)
  } else if (ext._status == 4) {
    $q.loading.show({ message: "Terminando, espera..." });
    let data = { id: ext.id, state: 5, suply: ext._suplier_id }
    console.log(data);
    let resp = await RestockApi.nextStatePartition(data)
    console.log(resp)
    if (resp.status == 200) {
      console.log(ext.requisition._status)
      if (resp.data.partitionsEnd > resp.data.partition.requisition._status) {
        let nes = { id: resp.data.partition._requisition, state: resp.data.partitionsEnd };
        const nxt = await RestockApi.nextState(nes);
        $sktRestock.emit("order_refresh", { order: nxt.data });
        console.log(nxt.data);
      }
      $sktRestock.emit("orderpartition_refresh", { order: resp.data.partition })
      $router.push(`/distribute/checkout/${resp.data.partition.id}`)
    } else { console.log(resp) }
    $q.loading.hide();
  }else{
    $q.notify({ message: 'No se encuentra tu pedido', type: 'negative', position: 'bottom' })
    partition.value = null
  }
}

const colorsets = (partitionStore) => {
  let status = partitionStore.status ==  4 ? '11' : '10'
  let cltext = partitionStore.status ==  4 ? 'text-dark' : 'text-white'

  // console.log(partitionStore.requisition.from.id)
  let store = partitionStore.requisition.from.id;
  switch (store) {
    case 4:
      return `bg-blue-${status} ${cltext}`
    case 7:
      return `bg-red-${status} ${cltext}`
    case 5:
      return `bg-purple-${status} ${cltext}`
    case 9:
      return `bg-green-${status} ${cltext}`
    case 23:
      return `bg-yellow-${status} ${cltext}`
    case 13:
      return `bg-brown-${status} ${cltext}`
    default:
      return 'text-dark'
  }
}




init();
</script>
