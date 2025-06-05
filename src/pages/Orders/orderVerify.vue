<template>
  <q-page padding v-if="order">

    <q-card class="my-card ">
      <q-card-section class="row">
        <div class="col">
          <div class="text-caption text-center">Dependiente</div>
          <div class="text-center text-h6">{{ `${order.created_by.names} ${order.created_by.surname_pat}
            ${order.created_by.surname_mat}` }}</div>
        </div>
        <div class="col  ">
          <div class="text-caption text-center">Cliente</div>
          <q-btn class="full-width" flat :label="order.client.name" @click="changeClient" />
        </div>
        <div class="col">
          <div class="text-caption text-center">Fecha</div>
          <div class="text-center text-h6">{{ dayjs(order.created_at).format('YYYY-MM-DD') }}</div>
        </div>
        <q-btn color="primary" flat />
        <q-separator spaced inset vertical dark />
      </q-card-section>
    </q-card>
    <q-separator spaced inset vertical dark />
    <q-card class="my-card">
      <q-card-section class="row">
        <div class="col">
          <div class="text-caption text-center">Orden</div>
          <div class="text-center text-h6">{{ order.id }}</div>
        </div>
        <div class="col ">
          <div class="text-caption text-center">Total</div>
          <div class="text-center text-h6">$ {{Number(order.products.reduce((a, e) => a + e.pivot.total,
            0)).toFixed(2)}}</div>
        </div>
        <div class="col ">
          <div class="text-caption text-center">Cantidad</div>
          <div class="text-center text-h6">{{order.products.reduce((a, e) => a + Number(e.pivot.toDelivered), 0)}}</div>
        </div>
        <q-btn color="primary" flat icon="add" @click="addCommand.state = !addCommand.state" />
        <q-separator spaced inset vertical dark />
      </q-card-section>
    </q-card>

    <q-separator spaced inset vertical dark />


    <q-separator spaced inset vertical dark />

    <q-table :rows="order.products" :columns="table.columns" hide-bottom :pagination="table.pagination"
      @row-click="getProduct" />

    <q-dialog v-model="product.state" persistent position="bottom">
      <viewProduct :product="product.val" :order="order" :edit="product.edit" @reset="reset" :products="order.products"
        :rules="rules" @addProduct="addProdcut" @deleteProduct="deleteProduct" />
    </q-dialog>

    <q-dialog v-model="clients.state" persistent>
      <q-card style="width: 700px;">
        <q-form @submit="searchClient">
          <div class="text-h6 text-bold text-center">Buscar Cliente</div>
          <div class="text-center text-bold text-caption">Busca por ID, Celular, o Nombre</div>
          <q-card-section>
            <q-separator spaced inset vertical dark />
            <div>
              <q-input autofocus v-model="clients.val" type="text" label="Buscar" dense filled />
            </div>
          </q-card-section>
          <q-card-section v-if="clients.opts.length > 0">
            <q-table :rows="clients.opts" :columns="tableClients.columns" :pagination="tableClients.pagination"
              @row-click="changeNewClient" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn flat label="Buscar" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="endVerify" persistent>
      <q-card>
        <q-card-section class="text-center text-bold text-h6">
          Orden {{ order.id }}
        </q-card-section>
        <q-card-section>
          El pedido se ira directo a caja, <span class="text-bold"> Deseas Continuar?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat icon="close" color="negative" v-close-popup />
          <q-btn flat icon="send" color="positive" @click="nexState" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addCommand.state" persistent>
      <q-card style="width: 300px;">
        <q-form @submit="searchCommand">
          <div class="text-h6 text-bold text-center">Buscar Comanda</div>
          <div class="text-center text-bold text-caption">Busca ID de commanda</div>
          <q-card-section>
            <q-separator spaced inset vertical dark />
            <div>
              <q-input autofocus v-model="addCommand.val" type="text" label="Buscar" dense filled />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Buscar" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <q-footer reveal elevated bordered class="bg-white">
      <q-card class="q-mb-md" flat bordered dense>
        <q-card-section class="row">
          <ProductAutocomplete class="col" :checkState="false" @input="add" @agregar="agregar" />
          <q-btn v-if="validVerfy" color="primary" flat icon="east" @click="endVerify = !endVerify"
            round />
        </q-card-section>
      </q-card>
    </q-footer>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import CashApi from "src/API/cashApi";
import { exportFile, useQuasar, date } from 'quasar';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import viewProduct from 'src/components/Orders/productView.vue';// encabezado aoiida
import dayjs from 'dayjs';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import Resourse from 'src/API/resoursesOrder';
import orderApi from 'src/API/orderApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const order = ref(null);
const addCommand = ref({
  state: false,
  val: null,
});
const endVerify = ref(false)
const clients = ref({
  state: false,
  val: null,
  opts: [],
})
const product = ref({
  state: false,
  val: null,
  edit: false
});

const pivots = ref({
  amount: 0,
  amountDelivered: 0,
  price: 0,
  toDelivered: 0,
  total: 0,
  units: 0,
  _price_list: 1,
  _supply_by: 1
})
const rules = ref([]);

const table = ref({
  columns: [
    { name: 'code', label: 'Codigo', field: r => r.code, align: 'left' },
    { name: 'description', label: 'Descripcion', field: r => r.description, align: 'left' },
    { name: 'amount', label: 'Pedido', field: r => r.pivot.units, align: 'center' },
    { name: 'verify', label: 'Verificado', field: r => r.pivot.toDelivered, align: 'center' },
    { name: 'price', label: 'Precio', field: r => r.pivot.price, align: 'center' },
    { name: 'total', label: 'Total', field: r => r.pivot.total, align: 'center' }
  ],
  pagination: { rowsPerPage: 0 }
})
const tableClients = ref({
  columns: [
    { name: 'id', label: 'Codigo', field: r => r.id, align: 'left' },
    { name: 'Nombre', label: 'Descripcion', field: r => r.name, align: 'left' },
    { name: 'Telefono', label: 'Pedido', field: r => r.celphone, align: 'center' },
  ],
  pagination: { rowsPerPage: 0 }
})

const validVerfy = computed(() => order.value.products.every(e => e.pivot.amountDelivered || e.pivot.amountDelivered > 0 ));

const init = async () => {
  let orderId = $route.params.ord
  const resp = await orderApi.getOrderVerify(orderId);
  if (resp.fail) {
    if (resp.fail.status == 401) {
      $q.notify({ message: resp.fail.response.data, position: 'center', type: 'negative' })
      $router.push('/verifyOrder')
    } else {
      console.log(resp)
    }
  } else {
    console.log(resp)
    order.value = resp.order
    rules.value = resp.rules

  }
}

const agregar = (ops) => {
  let inx = order.value.products.findIndex(e => e.id == ops.id)
  if (inx >= 0) {
    product.value.val = order.value.products[inx];
    product.value.state = true
    product.value.edit = true
  } else {
    ops.pivot = pivots.value;
    product.value.val = ops;
    product.value.state = true
    product.value.edit = false
  }
}

const add = (opt) => {
  let inx = order.value.products.findIndex(e => e.id == opt.id)
  if (inx >= 0) {
    product.value.val = order.value.products[inx];
    product.value.state = true
    product.value.edit = true
  } else {
    opt.pivot = pivots.value;
    product.value.val = opt;
    product.value.state = true
    product.value.edit = false
  }
}

const getProduct = (a, b) => {
  console.log(b)
  product.value.val = b;
  product.value.edit = true
  product.value.state = true
}

const reset = () => {
  product.value = {
    state: false,
    val: null,
    edit: false
  };
}
const addProdcut = (product) => {
  order.value.products.push(product)
  reset();
}

const deleteProduct = (product) => {
  let inx = order.value.products.findIndex(e => e.id == product.id)
  if (inx >= 0) {
    order.value.products.splice(inx, 1)
    reset();
  }
}

const searchClient = async () => {
  if (clients.value.val) {
    const resp = await orderApi.getClient(clients.value);
    if (resp.fail) {
      console.log(resp);

    } else {
      if (resp.length > 0) {
        console.log(resp);
        clients.value.opts = resp
      } else {
        $q.notify({ message: 'No hay ningun cliente con el parametro de busqueda intentalo de nuevo', type: 'negative', position: 'bottom' })
      }
    }
    console.log(resp);
  } else {
    $q.notify({ message: 'Coloca Numero, telefono o Nombre para hacer la busqueda', type: 'negative', position: 'bottom' })
  }
}

const changeNewClient = async (a, b) => {
  $q.loading.show({ message: 'Recalculando Ticket' })
  let data = {
    order: order.value.id,
    client: b.id
  }
  const resp = await orderApi.changeClientOrder(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    order.value.client = b
    Resourse.actualizarPreciosProductos(order.value.products, order.value, rules.value)
    clients.value = {
      state: false,
      val: null,
      opts: []
    }
    $q.loading.hide();
  }
}

const changeClient = () => {
  console.log('cambio de cliente')
  clients.value.state = true
}

const handleKeyDown = (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'b') {
    e.preventDefault()
    if (!clients.value.state) {
      clients.value.state = true
    }
  } else if (e.ctrlKey && e.key.toLowerCase() === 'p') {
    e.preventDefault()
    if (!addCommand.value.state) {
      addCommand.value.state = true
    }
  }
}

const nexState = async () => {
  $q.loading.show({message:'Terminando Verificacion'})
  let data = {
      uid: VDB.session.credentials.staff.id_va,
      oid: order.value.id
  }
  const resp = await orderApi.nextState(data)
  if(resp.fail){
    console.log(resp);
  }else{
    console.log(resp);
    $q.notify({ message:  'El pedido ya esta en Caja', position: 'center', type: 'positive', icon:'check' })
    $q.loading.hide();
    $router.push('/verifyOrder')
  }
}

const searchCommand = async () => {
  if (addCommand.value.val) {
    let data = {
      uid: VDB.session.credentials.staff.id_va,
      oid: order.value.id
    }
    const resp = await orderApi.getOrderAdd(addCommand.value.val, data);
    console.log(resp)
    if (resp.fail) {
      if (resp.fail.status == 401) {
        $q.notify({ message: resp.fail.response.data, position: 'bottom', type: 'negative' })
      } else if (resp.fail.status == 404) {
        $q.notify({ message: resp.fail.response.data, position: 'bottom', type: 'negative' })
      } else {
        console.log(resp);
      }
    } else {
      if (resp) {
        console.log(resp);
        mergeOrderProducts(order.value.products, resp.products).then(r => order.value.products = r)
        Resourse.actualizarPreciosProductos(order.value.products, order.value, rules.value)
        addCommand.value = {
          state: false,
          val: null,
        }
      } else {
        $q.notify({ message: 'No hay ningun pedido con el parametro de busqueda intentalo de nuevo', type: 'negative', position: 'bottom' })
      }
    }
  } else {
    $q.notify({ message: 'Coloca Numero, telefono o Nombre para hacer la busqueda', type: 'negative', position: 'bottom' })
  }
}

const mergeOrderProducts = async (currentProducts, newProducts) => {
  const merged = [...currentProducts];
  for (const newProduct of newProducts) {
    const existing = merged.find(p => p.id === newProduct.id);
    if (existing) {
      existing.pivot.units += newProduct.pivot.units;
      existing.pivot.toDelivered = 0;
      existing.pivot.amountDelivered = 0;
      const resp = await orderApi.editProduct(existing.pivot);
      console.log(existing);
      if (resp.fail) {
        console.log('Edit failed:', resp);
      } else {
        console.log('Edited:', resp);
      }
    } else {
      newProduct.pivot._order = order.value.id;
      newProduct.pivot.toDelivered = 0;
      newProduct.pivot.amountDelivered = 0;
      const resp = await orderApi.addProduct(newProduct.pivot);
      if (resp.fail) {
        console.log('Add failed:', resp);
      } else {
        console.log('Added:', resp);
        merged.push(newProduct);
      }
    }
  }
  return merged;
};

onMounted(() => {
  init()
  window.addEventListener('keydown', handleKeyDown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
