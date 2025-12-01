<template>
  <q-page padding>
    <q-table :rows="myorders" :columns="table.columns" :filter="table.filter" @row-click="mosRow" :pagination="pagination">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

    <q-dialog v-model="wndOrder.state" persistent>
      <q-card>
        <q-card-section class="row items-center bg-primary text-white">
          <q-icon name="list" />
          <span class="q-ml-sm">Nevo Pedido</span>
        </q-card-section>
        <q-card-section>
          <div class="text-caption text-grey">{{ client.state ? 'Escribe Cliente' : '' }}</div>
          <q-form @submit="createdOrder">
            <q-input v-model="wndOrder.order.name" :type="client.state ? 'text' : 'number'" label="Cliente">
              <template v-slot:prepend>
                <q-btn color="primary" :icon="client.state ? 'person_add_disabled' : 'person_add'" title="client" flat
                  @click="client.state = !client.state" disable />
              </template>
            </q-input>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat title="Cancelar" color="negative" v-close-popup icon="close" />
          <q-btn flat color="positive" icon="check" @click="createdOrder" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="Anex.state" persistent>
      <q-card>
        <q-card-section class="row items-center bg-teal text-white">
          <q-icon name="post_add" />
          <span class="q-ml-sm">Nuevo Anexo</span>
        </q-card-section>
        <q-card-section>
          <q-form @submit="newAnexo">
            <q-input v-model="wndOrder.order._anex" type="number" label="Pedido" />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat title="Cancelar" color="negative" v-close-popup icon="close" />
          <q-btn flat color="positive" icon="check" @click="newAnexo" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="viewOrder.state" persistent>
      <q-card>
        <q-card-section class="text-h5">
          Cliente : <span class="text-bold">{{ viewOrder.val.name }}</span>
        </q-card-section>
        <q-card-section class="text-h6">
          Pedido : <span class="text-bold">{{ viewOrder.val.id }}</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat icon="close" color="negative" v-close-popup />
          <q-btn flat icon="print" color="positive" @click="print.state = !print.state" />
          <q-btn flat icon="send" color="primary" @click="routPush"/>
          <q-btn flat label="Anexo" color="primary" @click="createAn"/>


        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="print.state" persistent>
      <q-card>
        <q-card-section class="row items-center bg-primary text-white text-h6">
          Selecciona Impresora
        </q-card-section>
        <q-card-section class="">
          <q-select v-model="$orderStore.printers.val" :options="$orderStore.printers.opts.filter(e => e._type == 1)" label="Impresoras" option-label="name" filled />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Imprimir" color="primary" :disabled="!$orderStore.printers.val" @click="reimpresionClientTicket" />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-page-sticky position="bottom-right"  :offset="[20, 20]">
      <q-fab color="primary" icon="add" direction="up">
        <q-fab-action color="primary" @click="wndOrder.state = !wndOrder.state" icon="add" label="Pedido" />
        <q-fab-action color="primary" @click="Anex.state = !Anex.state" icon="post_add" label="Anexo" />
      </q-fab>
      <!-- <q-btn fab icon="add" color="primary" @click="newOrder" /> -->
    </q-page-sticky>

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
import { colors, useQuasar } from 'quasar';
import UserToolbar from "src/components/UserToolbar.vue";
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import { $sktOrders } from 'boot/socket';
import { $sktRestock } from 'boot/socket';
// import print from 'src/API/print';
const $route = useRoute();
const $router = useRouter();
const $orderStore = useOrderStore();
$orderStore.setTitle('PEDIDOS');
$orderStore.setshowLyt(true);
const $q = useQuasar();
const VDB = useVDBStore()
const pagination = ref({ rowsPerPage:20 })
const print = ref({
  state: false,
  val: null,
  opts: []
})

const viewOrder = ref({
  state: false,
  val: null
})
const wndOrder = ref({
  state: false,
  order: {
    _created_by: VDB.session.credentials.staff.id_va,
    _workpoint: VDB.session.store.id_viz,
    name: null,
    _anex: null
  },

})
const client = ref({
  state: true,
  val: null,
  opts: [],
  filter: []
})
const Anex = ref({
  state: false,
  val: null
})
const table = ref({
  columns: [
    { name: 'id', label: 'FOLIO', field: r => r.id, align: 'left', sortable:true },
    { name: 'client', label: 'CLIENTE', field: r => r.name, align: 'center', sortable:true },
    { name: 'status', label: 'ESTADO', field: r => r.status?.name, align: 'center', classes: r => `text-${colorStatus.value[r.status.id - 1]}`, sortable:true },
    { name: 'created', label: 'HORA', field: r => dayjs(r.created_at).format('HH:mm:ss'), align: 'center', sortable:true },
  ],
  filter: null
})

const colorStatus = ref([
  "grey-6",
  "red-5",
  "deep-orange-10",
  "blue-4",
  "blue-10",
  "teal-4",
  "teal-10",
  "green-5",
  "green-10",
  "light-green-10",
])

const myorders = computed(() => $orderStore.orders.filter(e => e.created_by.id == VDB.session.credentials.staff.id_va))

const createdOrder = async () => {
  $q.loading.show({ message: 'Creando Pedido' })
  console.log(wndOrder.value.order)
  const resp = await orderApi.create(wndOrder.value.order);
  if (resp.fail) {
    console.log(resp)
  } else {
    $sktOrders.emit('order_add', { order: resp, user: $orderStore.socket_user.profile })
    $orderStore.addOrUpdate({ order: resp});
    $q.notify({
      message: `El Pedido ${resp.id} se creo`,
      type: 'positive',
      position: 'center'
    })

    $q.loading.hide();
    $router.push(`/preorders/pedidos/${resp.id}`);

  }
}


const newAnexo = async () => {
  $q.loading.show({ message: 'Creando Pedido' })
  console.log(wndOrder.value)
  const resp = await orderApi.create(wndOrder.value.order);
  console.log(resp);
  if (resp.fail) {
    console.log(resp)
  } else {
    $sktOrders.emit('order_add', { order: resp, user: $orderStore.socket_user.profile })
    $orderStore.addOrUpdate({ order: resp});
    $q.notify({
      message: `El Pedido ${resp.id} se creo`,
      type: 'positive',
      position: 'center'
    })
    $q.loading.hide();
    $router.push(`/preorders/pedidos/${resp.id}`);
  }
}

const mosRow = (a, b) => {
  if (b._status == 1) {
    $router.push(`/preorders/pedidos/${b.id}`);
  } else {
    viewOrder.value.state = true;
    viewOrder.value.val = b
  }
}

const reimpresionClientTicket = async () => {
  $q.loading.show({message:'Reimprimiendo'})
  let data = {
    _order:viewOrder.value.val.id,
    _printer:$orderStore.printers.val.id
  }
  const resp = await orderApi.reimpresionClientTicket(data);
  if(resp.fail){
    console.log(resp)
  }else{
    print.value.state = false
    viewOrder.value.state = false;
    viewOrder.value.val = null
    $q.loading.hide()
  }
}

const createAn = () => {
  wndOrder.value.order._anex = viewOrder.value.val.id
  viewOrder.value.state = false;
  viewOrder.value.val = null
  newAnexo();
}

const routPush = () => {
   $router.push(`/preorders/pedidos/${viewOrder.value.val.id}`);
}


</script>
