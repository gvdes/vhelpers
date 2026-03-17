<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <q-toolbar>
        <q-btn round dense icon="arrow_back" :disable="isMain"
          v-if="!isMain && (!$catalogStore.orderState && !$catalogStore.requisitionState)" @click="goBack" />
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

          <div class="col " v-if="$catalogStore.requisitionState">
            <q-list bordered>
              <q-item>
                <q-item-section>
                  <q-item-label overline>Pedido</q-item-label>
                  <q-item-label>{{ $catalogStore.requisition.id }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Cliente</q-item-label>
                  <q-item-label>{{ $catalogStore.requisition.notes }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

        </q-toolbar-title>
        <div v-if="isCatalog">
          <q-btn flat round dense icon="shopping_cart" @click="viewOrder = !viewOrder"
            v-if="$catalogStore.orderState">{{$catalogStore.order.products.reduce((a, e) => a +
              Number(e.pivot.amount), 0)}}</q-btn>


          <q-btn flat round dense icon="shopping_cart" @click="viewRequisition = !viewRequisition"
            v-if="$catalogStore.requisitionState">{{$catalogStore.requisition.products.reduce((a, e) => a +
              Number(e.pivot.amount), 0)}}</q-btn>


          <q-btn flat round dense icon="add" @click="addOrder.state = !addOrder.state"
            v-if="!$catalogStore.orderState && !$catalogStore.requisitionState" />
          <q-btn flat round dense icon="add_circle" @click="requisition.state = !requisition.state"
            v-if="useRequisition && !$catalogStore.orderState && !$catalogStore.requisitionState" />
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
            <!-- <q-form @submit="createOrder"> -->
            <q-select v-model="dependients.val" :options="dependients.optsFil" label="Vendedor" option-label="nick"
              use-input hide-selected filled fill-input input-debounce="0" @filter="filterFn" dense>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ `${scope.opt.names} ${scope.opt.surname_mat} ${scope.opt.surname_pat}`
                      }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.nick }} ({{ scope.opt.id_tpv }})</q-item-label>
                  </q-item-section>
                </q-item>
              </template>

              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    APOCO AUN NO TE DICEN?
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-separator spaced inset vertical dark />
            <q-input v-model="addOrder.order.name" type="text" label="Nombre Cliente">
              <template v-slot:prepend>
                <q-icon name="person_add" />
              </template>
            </q-input>
            <!-- </q-form> -->
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="negative" v-close-popup />
            <q-btn flat label="Crear" color="positive" @click="createOrder" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="requisition.state" persistent>
        <q-card>
          <q-card-section class="row items-center bg-secondary text-black">
            <q-icon name="list" />
            <span class="q-ml-sm">Nevo Pedido Cedis</span>
          </q-card-section>
          <q-card-section>
            <q-input v-model="requisition.required.notes" type="text" label="Nombre Cliente">
              <template v-slot:prepend>
                <q-icon name="person_add" />
              </template>
            </q-input>
            <!-- </q-form> -->
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="negative" v-close-popup />
            <q-btn flat label="Crear" color="positive" @click="createRequisition" />
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
                  <div class="text-bold">{{ $catalogStore.order.created_by.names }}</div>
                  <div class="text-bold">{{ `${$catalogStore.order.created_by.surname_pat}
                    ${$catalogStore.order.created_by.surname_mat}` }}</div>

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


      <q-dialog v-model="viewRequisition" persistent>
        <q-card class="q-pa-md" style="width: 950px; max-width: 90vw; border-radius: 16px;">
          <!-- Encabezado -->
          <q-card-section class="bg-primary text-white q-pa-md flex items-center justify-between rounded-borders">
            <div>
              <div class="text-h6 text-weight-bold">Resumen del Pedido</div>
              <div class="text-subtitle2">#{{ $catalogStore.requisition.id }} — {{ $catalogStore.requisition.notes }}
              </div>
            </div>
            <q-btn flat dense round icon="close" color="white" v-close-popup />
          </q-card-section>
          <q-card-section class="q-pt-md">
            <div class="row q-col-gutter-md">
              <div class="col-6 col-md-3">
                <q-card flat bordered class="q-pa-sm text-center">
                  <div class="text-grey">Modelos</div>
                  <div class="text-h6 text-bold">{{ $catalogStore.requisition.products.length }}</div>
                </q-card>
              </div>
              <div class="col-6 col-md-3">
                <q-card flat bordered class="q-pa-sm text-center">
                  <div class="text-grey">Total piezas</div>
                  <div class="text-h6 text-bold">
                    {{$catalogStore.requisition.products.reduce((a, e) => a + Number(e.pivot.amount), 0)}}
                  </div>
                </q-card>
              </div>
              <div class="col-6 col-md-3">
                <q-card flat bordered class="q-pa-sm text-center">
                  <div class="text-grey">Creado por</div>
                  <div class="text-bold">{{ $catalogStore.requisition.created_by.names }}</div>
                  <div class="text-bold">{{ `${$catalogStore.requisition.created_by.surname_pat}
                    ${$catalogStore.requisition.created_by.surname_mat}` }}</div>

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
            <q-table flat bordered dense :rows="$catalogStore.requisition.products" :columns="table.columns"
              row-key="id" separator="cell" no-data-label="No hay productos en este pedido">
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
                      @click="decreaseAmountRequisition(props.row)" />
                    <div class="text-bold q-mx-sm">{{ props.row.pivot.amount }}</div>
                    <q-btn dense flat round icon="add" size="sm" color="primary"
                      @click="increaseAmountRequisition(props.row)" />
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
          <q-card-actions class="justify-between items-center">
            <q-select v-model="printers.val" :options="printers.opts" label="Impresora" outlined dense
              style="min-width: 200px" option-label="name" />
            <div>
              <q-btn flat color="negative" label="Cancelar Pedido" @click="cancelRequisition" />
              <q-btn unelevated color="primary" label="Finalizar Pedido" @click="nextStateRequisition" :disable="!printers.val || $catalogStore.requisition.products.reduce((a, e) => a +
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
import RestockApi from 'src/API/RestockApi.js';
import { vizmedia } from "boot/axios"
import { useVDBStore } from 'stores/VDB';
import { catalogStore } from 'stores/catalogStore';
import { useQuasar } from 'quasar';
import UserToolbar from "src/components/UserToolbar.vue";
import { $sktOrders } from 'boot/socket';
import { $sktRestock } from 'boot/socket';
const $route = useRoute();
const $router = useRouter();
const $catalogStore = catalogStore();
const $q = useQuasar();
const VDB = useVDBStore()
const viewOrder = ref(false)
const viewRequisition = ref(false)


const addOrder = ref({
  state: false,
  order: {
    _created_by: null,
    _workpoint: VDB.session.store.id_viz,
    name: null
  }
})

const requisition = ref({
  state: false,
  required: {
    created_by: VDB.session.credentials.staff.id_va,
    suply_by: {
      "id": 1,
      "name": "CEDIS San Pablo",
      "alias": "CEDISSAP",
      "dominio": "192.168.10.160:1619",
      "_type": 1,
      "_client": 359,
      "active": 1,
      "_port": "1619"
    },
    workpointFrom: VDB.session.store.id_viz,
    notes: null,
    type: { id: 1, label: 'Manual' },
    warehouse: { id: 'GEN', label: 'General' }
  }
})

const dependients = ref({
  val: null,
  opts: [],
  optsFil: null
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
const useRequisition = computed(() => VDB.session.rol == 'ven' || VDB.session.rol == 'floor' ? false : true)

const init = async () => {
  const resp = await catalogApi.getPrinters(VDB.session.store);
  if (resp.fail) {
    console.log(resp)
    alert('Hay Problema para recibir las impresoras')
  } else {
    console.log(resp)
    $catalogStore.setPrinters(resp)
    printers.value.opts = resp.printers
    dependients.value.opts = resp.users
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
  addOrder.value.order._created_by = dependients.value.val.id
  console.log(addOrder.value.order)
  $q.loading.show({ message: 'Creando Pedido' })
  $sktOrders.connect();
  $sktOrders.emit("join", user_socket);
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

const createRequisition = async () => {
  $q.loading.show({ message: 'Creando Pedido' })
  console.log(requisition.value.required)
  $sktRestock.connect();
  $sktRestock.emit("joinat", user_socket);
  const resp = await RestockApi.newRequisitionPreventa(requisition.value.required)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    requisition.value.state = false
    $catalogStore.setRequisitionState(true)
    $catalogStore.setRequisition(resp.requisition)
    if ($sktRestock.connected) {
      $sktRestock.emit('creating', { order: resp.requisition })
    } else {
      console.warn('Socket no conectado, no se envió el evento creating')
    }
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



const increaseAmountRequisition = (row) => {
  row.pivot.amount++
  row.pivot.units++
  row.pivot.total = row.pivot.amount * row.pivot.price
  $catalogStore.updateProductRequisition(row)
}

const decreaseAmountRequisition = (row) => {
  row.pivot.amount--
  row.pivot.units--
  if (row.pivot.amount <= 0) {
    delete row.pivot
    $catalogStore.removeProductRequisition(row.id)
  } else {
    row.pivot.total = row.pivot.amount * row.pivot.price
    $catalogStore.updateProductRequisition(row)
  }
}

const cancelRequisition = () => {
  $catalogStore.clearRequisition();
  viewOrder.value = false;
  window.location.reload()
}


const nextStateRequisition = async () => {
  $q.loading.show({ message: 'Cerrando Pedido' })
  let data = {
    requisition: $catalogStore.requisition,
    printer: printers.value.val
  }
  const resp = await RestockApi.nextStepCatalog(data)
  console.log(resp);
  if (resp.fail) {
    console.log(resp)
  } else {
    if ($sktRestock.connected) {
      $sktRestock.emit('order_refresh', { order: resp.data.requisition })
      $sktRestock.emit('partitionCreate', resp.data.partition)
      console.log('Evento order_update emitido por socket')
    } else {
      console.warn('Socket no conectado, no se envió el evento order_update')
    }
    $q.loading.hide()
    console.log(resp);
    $catalogStore.clearRequisition();
    viewRequisition.value = false;
    window.location.reload()
  }

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

const filterFn = (val, update, abort) => {
  update(() => {
    const needle = val.toLowerCase()
    dependients.value.optsFil = dependients.value.opts.filter(v => {
      let complete_name = `${v.names} ${v.surname_pat} ${v.surname_mat}`
      if (/^\d+$/.test(needle)) {
        return (
          String(v.id_tpv).includes(needle) || // busca en ID
          complete_name.toLowerCase().includes(needle)
        )
      }
      return complete_name.toLowerCase().includes(needle)
    })

  })
}


watch(() => printers.value.val, (newVal) => {
  if (newVal) {
    localStorage.setItem('selectedPrinter', JSON.stringify(newVal))
  }
})





onMounted(() => {
  $catalogStore.loadRequisition();
  init()

  const savedPrinter = localStorage.getItem('selectedPrinter')
  if (savedPrinter) {
    printers.value.val = JSON.parse(savedPrinter)
  }
})


</script>
