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
            <q-list bordered>
              <q-item clickable v-ripple @click="() => { mosPartition.state = true; mosPartition.val = props.row }">
                <q-item-section>
                  <q-item-label class="text-center text-bold">{{ props.row.id }}</q-item-label>
                  <q-item-label class="text-center text-overline text-caption"> <span class="text-bold">{{
                    props.row.requisition.from.name }}</span> (P: {{
                        props.row.requisition.id }})</q-item-label>
                  <q-item-label class="text-center text-bold">{{ props.row.status.name }}</q-item-label>


                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>

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
        <q-btn flat icon="send" color="positive" @click="() => { partition = mosPartition.val.id, nextState() }" />
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

const ordersdb = computed(() => {
  return $restockStore.partitions.filter(part => {
    const isChofer = ['chf', 'vld','root'].includes(VDB.session.rol);
    const isSameStore = part.requisition.from.id == VDB.session.store.id_viz;
    const isStore = part.requisition.to.id == VDB.session.store.id_viz;
    const isAlmacenista = ['gen', 'aux', 'alm', 'root'].includes(VDB.session.rol);
    if (isChofer && isStore) {
      return part._status === 6
    }
    if (isSameStore && isAlmacenista) {
      return part._status === 7;
    }
    return false;
  });
})
const init = async () => {
  $restockStore.setTitle('En Camino')
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


const nextState = async () => {
  let ext = ordersdb.value.findIndex(e => e.id == partition.value);
  if (ext >= 0) {
    $q.loading.show({ message: 'Cambiando Estado' });
    let state = Number($restockStore.partitions.find(e => e.id == partition.value)._status) + Number(1);
    let data = {
      partition: partition.value,
      chofi: VDB.session.credentials.staff.id,
      state: state
    }
    console.log(data)
    let savesupply = null;
    if (state == 7) {
      savesupply = await RestockApi.SaveChofi(data);
    } else if (state == 8) {
      savesupply = await RestockApi.saveReceipt(data);
    }
    console.log(savesupply)
    if (savesupply.status == 200) {
      let inx = $restockStore.partitions.findIndex(e => e.id == savesupply.data.partition.id);
      if (inx >= 0) {
        $restockStore.partitions.splice(inx, 1, savesupply.data.partition)
        if (savesupply.data.partitionsEnd > savesupply.data.partition.requisition._status) {
          let nes = { id: savesupply.data.partition._requisition, state: savesupply.data.partitionsEnd };
          const nxt = await RestockApi.nextState(nes);
          $sktRestock.emit("order_refresh", { order: nxt.data });
          console.log(nxt.data);
        }
        $sktRestock.emit("orderpartition_refresh", { order: savesupply.data.partition })
      }
      partition.value = null
      mosPartition.value = {
        state: false,
        val: null
      }
      if (state == 8) { $router.push('/distribute/checkin') }
      $q.loading.hide();
    } else {
      alert(`Error ${savesupply.status}: ${savesupply.data} 2`);
    }
  } else {
    $q.notify({ message: 'No se encuentra tu pedido', type: 'negative', position: 'bottom' })
    partition.value = null
  }
}
init();
// document.title = "Vhelpers/InComming";
</script>
