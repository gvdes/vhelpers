<template>
  <q-page padding>
    <div>
      <div class="flex justify-center">
        <div class="text-center " :style="`width: 50%;`">
          <q-form @submit="nextState(orderInput)">
            <q-input v-model="orderInput" type="number" label="Pedido" autofocus rounded outlined />
          </q-form>
        </div>
      </div>

      <q-table :rows="checkin" grid :pagination="pagination" hide-bottom>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-2 col-sm-1">
            <q-list bordered>
              <q-item clickable v-ripple @dblclick="nextState(props.row.id)">
                <q-item-section>
                  <q-item-label class="text-center text-bold text-h5">{{ props.row.id }}</q-item-label>
                  <q-item-label class="text-center text-overline text-caption"> <span class="text-bold  q-mr-md">{{
                    props.row.name }} </span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
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
import { $sktRestock } from 'boot/socket';
const $route = useRoute();
const $router = useRouter();
const $orderStore = useOrderStore();
$orderStore.setTitle('Checkin');
$orderStore.setshowLyt(true);
$orderStore.setShowEvent(false);

const $q = useQuasar();
const VDB = useVDBStore()

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
$sktRestock.connect();
$sktRestock.emit("joinat", user_socket);


const orderInput = ref(null)
const pagination = ref({ rowsPerPage: [0] })
const checkin = computed(() => $orderStore.orders.filter(e => e._status == 3));

const nextState = async (order) => {
  $q.loading.show({ message: 'Cambiando Estado' })
  let orderChange = $orderStore.orders.find(e => e.id == order);

  const resp = await orderApi.nextStepCheck({ id: order })
  if (resp.fail) {
    if(resp.fail.status == 404){
      $q.loading.hide();
      orderInput.value = null
      $q.notify({message:resp.fail.response.data.msg, type:'negative', position:'top'})
    }
    console.log(resp);
  } else {
    $q.loading.hide();
    console.log(resp)
    let restock = resp.requisition
    if (restock) {
        $sktRestock.emit("creating", { order: resp.requisition.requisition });
        $sktRestock.emit("partitionCreate", resp.requisition.partition);
        // $sktRestock.disconnect();
    }
    let socketData = { order: resp.order, newstate: resp.status }
    console.log(socketData);

    $sktOrders.emit('order_update', socketData)
    $orderStore.addOrUpdate(socketData)
    orderInput.value = null
  }
}


</script>
