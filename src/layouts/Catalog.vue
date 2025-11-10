<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <q-toolbar>
        <q-btn round dense icon="arrow_back" :disable="isMain" v-if="!isMain && !$catalogStore.orderState"
          @click="goBack" />
        <q-separator spaced inset vertical dark />
        <q-toolbar-title class=" row">
          <div class="col text-bold text-h5 q-mt-md">{{ $catalogStore.title }}</div>
          <div class="col " v-if="$catalogStore.orderState">
            <q-list bordered>
              <q-item>
                <q-item-section>
                  <q-item-label overline>Pedido</q-item-label>
                  <q-item-label>{{ $catalogStore.order.id }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Cliente</q-item-label>
                  <q-item-label>{{ $catalogStore.order.name }}</q-item-label>
                </q-item-section>

              </q-item>
            </q-list>
          </div>
        </q-toolbar-title>
        <div v-if="isCatalog">
          <q-btn flat round dense icon="shopping_cart" @click="viewOrder = !viewOrder"
            v-if="$catalogStore.orderState">{{$catalogStore.order.products.reduce((a, e) => a +
              Number(e.pivot.amount), 0)}}</q-btn>
          <q-btn flat round dense icon="add" @click="addOrder.state = !addOrder.state"
            v-if="!$catalogStore.orderState" />
        </div>
      </q-toolbar>
      <router-view />

      <q-dialog v-model="addOrder.state" persistent>
        <q-card>
          <q-card-section class="row items-center bg-primary text-white">
            <q-icon name="list" />
            <span class="q-ml-sm">Nevo Pedido</span>
          </q-card-section>
          <q-card-section>
            <q-form @submit="createOrder">
              <q-input v-model="addOrder.order.name" type="text" label="Nombre Cliente">
                <template v-slot:prepend>
                  <q-icon name="person_add" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="negative" v-close-popup />
            <q-btn flat label="Crear" color="positive" @click="createOrder" />
          </q-card-actions>
        </q-card>
      </q-dialog>


      <q-dialog v-model="viewOrder" persistent>
        <q-card class="q-pa-md" style="width: 950px; max-width: 90vw; border-radius: 16px;">
          <!-- Encabezado -->
          <q-card-section class="bg-primary text-white q-pa-md flex items-center justify-between rounded-borders">
            <div>
              <div class="text-h6 text-weight-bold">Resumen del Pedido</div>
              <div class="text-subtitle2">#{{ $catalogStore.order.id }} — {{ $catalogStore.order.name }}</div>
            </div>
            <q-btn flat dense round icon="close" color="white" v-close-popup />
          </q-card-section>
          <q-card-section class="q-pt-md">
            <div class="row q-col-gutter-md">
              <div class="col-6 col-md-3">
                <q-card flat bordered class="q-pa-sm text-center">
                  <div class="text-grey">Modelos</div>
                  <div class="text-h6 text-bold">{{ $catalogStore.order.products.length }}</div>
                </q-card>
              </div>
              <div class="col-6 col-md-3">
                <q-card flat bordered class="q-pa-sm text-center">
                  <div class="text-grey">Total piezas</div>
                  <div class="text-h6 text-bold">
                    {{$catalogStore.order.products.reduce((a, e) => a + Number(e.pivot.amount), 0)}}
                  </div>
                </q-card>
              </div>
              <div class="col-6 col-md-3">
                <q-card flat bordered class="q-pa-sm text-center">
                  <div class="text-grey">Creado por</div>
                  <div class="text-bold">{{ VDB.session.credentials.staff.complete_name }}</div>
                </q-card>
              </div>
              <div class="col-6 col-md-3">
                <q-card flat bordered class="q-pa-sm text-center">
                  <div class="text-grey">Sucursal</div>
                  <div class="text-bold">{{ VDB.session.store.name }}</div>
                </q-card>
              </div>
            </div>
          </q-card-section>

          <q-separator spaced />
          <q-card-section>
            <q-table flat bordered dense :rows="$catalogStore.order.products" :columns="table.columns" row-key="id"
              separator="cell" no-data-label="No hay productos en este pedido">
              <template v-slot:body-cell-picture="props">
                <q-td :props="props" class="text-center">
                  <q-avatar size="70px" square>
                    <q-img :src="props.row.imgcover
                      ? `${vizmedia}/Products/${props.row.id}/${props.row.imgcover}`
                      : `${vizmedia}/Products/sinpicture.png`" spinner-color="primary" style="object-fit: contain;" />
                  </q-avatar>
                </q-td>
              </template>

              <template v-slot:body-cell-code="props">
                <q-td :props="props">
                  <div class="text-bold">{{ props.row.code }}</div>
                </q-td>
              </template>

              <template v-slot:body-cell-description="props">
                <q-td :props="props">
                  <div class="ellipsis" style="max-width: 250px">{{ props.row.description }}</div>
                </q-td>
              </template>

              <template v-slot:body-cell-amount="props">
                <q-td :props="props" class="text-center">
                  <div class="row items-center justify-center q-gutter-xs">
                    <q-btn dense flat round icon="remove" size="sm" color="negative"
                      @click="decreaseAmount(props.row)" />
                    <div class="text-bold q-mx-sm">{{ props.row.pivot.amount }}</div>
                    <q-btn dense flat round icon="add" size="sm" color="primary" @click="increaseAmount(props.row)" />
                  </div>
                </q-td>
              </template>
              <template v-slot:body-cell-total="props">
                <q-td :props="props" class="text-center">
                  ${{ (props.row.pivot.amount * props.row.pivot.price).toFixed(2) }}
                </q-td>
              </template>
            </q-table>
          </q-card-section>
          <!-- <q-card-section class="text-right q-pr-lg">
            <div class="text-h6">
              Total pedido:
              <span class="text-bold text-primary">
                ${{$catalogStore.order.products.reduce((a, e) => a + e.pivot.amount * e.pivot.price, 0).toFixed(2)}}
              </span>
            </div>
          </q-card-section> -->
          <!-- <q-card-actions align="right">
            <q-btn flat color="negative" label="Cancelar Pedido" @click="cancelOrder" />
            <q-btn unelevated color="primary" label="Finalizar Pedido" @click="nextState" />
          </q-card-actions> -->
          <q-card-actions class="justify-between items-center">
            <q-select v-model="printers.val" :options="printers.opts" label="Impresora" outlined dense
              style="min-width: 200px" option-label="name" />
            <div>
              <q-btn flat color="negative" label="Cancelar Pedido" @click="cancelOrder" />
              <q-btn unelevated color="primary" label="Finalizar Pedido" @click="nextState" :disable="!printers.val || $catalogStore.order.products.reduce((a, e) => a +
                Number(e.pivot.amount), 0) <= 0" />
            </div>
          </q-card-actions>
        </q-card>
      </q-dialog>



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
import { catalogStore } from 'stores/catalogStore';
import { useQuasar } from 'quasar';
import UserToolbar from "src/components/UserToolbar.vue";
import { $sktOrders } from 'boot/socket';
const $route = useRoute();
const $router = useRouter();
const $catalogStore = catalogStore();
const $q = useQuasar();
const VDB = useVDBStore()
const viewOrder = ref(false)

const addOrder = ref({
  state: false,
  order: {
    _created_by: VDB.session.credentials.staff.id_va,
    _workpoint: VDB.session.store.id_viz,
    name: null
  }
})

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
  workpoint: VDB.session.store,
  room: 'sales'
}

const printers = ref({
  val: null,
  opts: []
})

const table = ref({
  columns: [
    { name: 'picture', label: 'Imagen', field: r => r.imgcover },
    { name: 'code', label: 'Codigo', field: r => r.code },
    { name: 'description', label: 'Descripcion', field: r => r.description },
    { name: 'amount', label: 'Cantidad', field: r => r.pivot.amount },

  ]
})


const isMain = computed(() => $route.name === 'sinx')
const isCatalog = computed(() => $route.name === 'fidca')

const init = async () => {
  const resp = await catalogApi.getPrinters(VDB.session.store.id_viz);
  if (resp.fail) {
    console.log(resp)
    alert('Hay Problema para recibir las impresoras')
  } else {
    console.log(resp)
    $catalogStore.setPrinters(resp)
    printers.value.opts = resp
    const savedPrinter = localStorage.getItem('selectedPrinter');
    if (savedPrinter) {
      const parsed = JSON.parse(savedPrinter);
      const match = printers.value.opts.find(p => p.id === parsed.id);
      if (match) printers.value.val = match;
    }
  }
}

const goBack = () => {
  if ($route.name === 'fidca') {
    const { sid } = $route.params
    $router.push({ name: 'sidca', params: { sid } })
  } else if ($route.name === 'sidca') {
    $router.push({ name: 'sinx' })
  }
}

const createOrder = async () => {
  console.log(addOrder.value.order)
  $q.loading.show({ message: 'Creando Pedido' })
  const resp = await orderApi.create(addOrder.value.order)
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    addOrder.value.state = false
    $catalogStore.setOrderState(true)
    $catalogStore.setOrder(resp);
    if ($sktOrders.connected) {
      $sktOrders.emit('order_add', { order: resp, user: user_socket.profile })
      console.log('Evento order_add emitido por socket')
    } else {
      console.warn('Socket no conectado, no se envió el evento order_add')
    }

    // $sktOrders.emit('order_add', { order: resp })
    $q.loading.hide();
  }
}

const increaseAmount = (row) => {
  row.pivot.amount++
  row.pivot.units++
  row.pivot.total = row.pivot.amount * row.pivot.price
  $catalogStore.updateProduct(row)
}

const decreaseAmount = (row) => {
  row.pivot.amount--
  row.pivot.units--
  if (row.pivot.amount <= 0) {
    delete row.pivot
    $catalogStore.removeProduct(row.id)
  } else {
    row.pivot.total = row.pivot.amount * row.pivot.price
    $catalogStore.updateProduct(row)
  }
}

const cancelOrder = () => {
  $catalogStore.clearOrder();
  viewOrder.value = false;
  window.location.reload()
}

const nextState = async () => {
  $q.loading.show({ message: 'Cerrando Pedido' })
  let data = {
    order: $catalogStore.order,
    _printer: printers.value.val
  }
  const resp = await orderApi.orderCatalog(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    if ($sktOrders.connected) {
      let socketData = { order: $catalogStore.order, newstate: resp.status }
      console.log(socketData);
      $sktOrders.emit('order_update', socketData)
      console.log('Evento order_update emitido por socket')
    } else {
      console.warn('Socket no conectado, no se envió el evento order_update')
    }
    $q.loading.hide()
    console.log(resp);
    $catalogStore.clearOrder();
    viewOrder.value = false;
    window.location.reload()
  }

}


// const sktOrderCreate = async skt => {
//   console.log(skt)
//   if (skt.order.to.id === VDB.session.store.id_viz || skt.order.from.id === VDB.session.store.id_viz) {
//     let order = skt.order;
//     console.log(skt.order.to.id)
//     let resp = await RestockApi.orderFresh(order.id);
//     let data = resp.data.order;
//     let oid = resp.data.oid;
//     let cmd = $restockStore.addOrUpdate(oid, data);
//   }
// }

// const sktOrderUpdate = skt => {
//   console.log(skt)
//   $restockStore.orderUpdate(skt);
//  }




watch(() => printers.value.val, (newVal) => {
  if (newVal) {
    localStorage.setItem('selectedPrinter', JSON.stringify(newVal))
  }
})





onMounted(() => {
  $sktOrders.connect();
  $sktOrders.emit("join", user_socket);
  // $sktOrders.on("order_add", sktOrderCreate);
  // $sktOrders.on("order_update", sktOrderUpdate);
  $catalogStore.loadOrder()
  init()

  const savedPrinter = localStorage.getItem('selectedPrinter')
  if (savedPrinter) {
    printers.value.val = JSON.parse(savedPrinter)
  }
})


onBeforeUnmount(() => {
  // $sktOrders.off("order_add", sktOrderCreate);
  // $sktOrders.off("order_update", sktOrderUpdate);
})


</script>
