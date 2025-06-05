<template>
  <q-page>

    <q-card class="my-card ">
      <q-card-section class="row">
        <div class="col">
          <div class="text-caption text-center">Dependiente</div>
          <q-btn class="full-width" flat :label="sale.dependiente ? sale.dependiente.complete_name : 'CTRL+d'"
            @click="changeDepen" />
        </div>
        <q-separator spaced inset vertical dark />
        <div class="col  ">
          <div class="text-caption text-center">Cliente</div>
          <q-btn class="full-width" flat :label="sale.client ? sale.client.name : 'CTRL+b'" @click="changeClient" />
        </div>
      </q-card-section>
    </q-card>
    <q-separator spaced inset vertical dark />
    <q-card class="my-card">
      <q-card-section class="row">
        <div class="col ">
          <div class="text-caption text-center">Total</div>
          <div class="text-center text-h6">$ {{ total }}</div>
        </div>
        <div class="col ">
          <div class="text-caption text-center">Cantidad</div>
          <div class="text-center text-h6">{{ cantidad }}</div>
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced inset vertical dark />

    <q-table :rows="sale.products" :columns="table.columns" hide-bottom :pagination="table.pagination"
      @row-click="getProduct" />

    <q-dialog v-model="product.state" persistent position="bottom">
      <viewProduct :product="product.val" :_price_list="clients.val ? clients.val._price_list : 1" :edit="product.edit"
        @reset="reset" :products="sale.products" :rules="cashLYT.rules" @addProduct="addProdcut"
        @deleteProduct="deleteProduct" @editProduct="editProduct" />
    </q-dialog>


    <q-dialog v-model="clients.state">
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

    <q-dialog v-model="Dependiente.state">
      <q-card style="width: 700px;">
        <q-form @submit="searchDep">
          <div class="text-h6 text-bold text-center">Buscar Dependiente</div>
          <div class="text-center text-bold text-caption">Busca por Nombre</div>
          <q-card-section>
            <q-separator spaced inset vertical dark />
            <div>
              <q-input autofocus v-model="Dependiente.val" type="text" label="Buscar" dense filled />
            </div>
          </q-card-section>
          <q-card-section v-if="Dependiente.opts.length > 0">
            <q-table :rows="Dependiente.opts" :columns="tableDep.columns" :pagination="tableDep.pagination"
              @row-click="changeNewDep" />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn flat label="Buscar" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <div>
      <q-dialog v-model="endSale">
        <paymentSales :total="Number(total)" :paymeths="cashLYT.methods" :client="sale.client.id"
          @sendTicket="finallytck" />
      </q-dialog>
    </div>


    <q-footer bordered class="bg-white">
      <q-card class="q-mb-md" flat bordered dense>
        <q-card-section class="row">
          <ProductAutocomplete ref="productRef" class="col" :checkState="false" @input="add" @agregar="agregar" />
          <q-btn v-if="validForm" color="primary" flat icon="east" @click="endSale = !endSale" round />
        </q-card-section>
      </q-card>
    </q-footer>

  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { useLayoutCash } from 'stores/cashLYT';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import viewProduct from 'src/components/Sales/viewProduct.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import CashApi from "src/API/cashApi";
import { exportFile, useQuasar, date } from 'quasar';
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import paymentSales from 'src/components/Sales/PaymentSales.vue';// encabezado aoiida;
import cashApi from 'src/API/cashApi';
import orderApi from 'src/API/orderApi';
import Resourse from 'src/API/resoursesOrder';
import { layouts } from 'chart.js';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const cashLYT = useLayoutCash();

console.log(cashLYT.rules);
const productRef = ref(null)
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

const clients = ref({
  val: null,
  opts: []
})
const Dependiente = ref({
  val: null,
  opts: []
})

const product = ref({
  state: false,
  val: null,
  edit: false
});

const sale = ref({
  client: null,
  dependiente: null,
  products: []
})

const endSale = ref(false)

const table = ref({
  columns: [
    { name: 'code', label: 'Codigo', field: r => r.code, align: 'left' },
    { name: 'description', label: 'Descripcion', field: r => r.description, align: 'left' },
    // { name: 'amount', label: 'Pedido', field: r => r.pivot.units, align: 'center' },
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
const tableDep = ref({
  columns: [
    { name: 'id', label: 'Codigo', field: r => r.id, align: 'left' },
    { name: 'Nombre', label: 'Descripcion', field: r => r.complete_name, align: 'left' },
  ],
  pagination: { rowsPerPage: 0 }
})

const total = computed(() => Number(sale.value.products.reduce((a, e) => a + e.pivot.total, 0)).toFixed(2));
const cantidad = computed(() => sale.value.products.reduce((a, e) => a + Number(e.pivot.toDelivered), 0))

const validForm = computed(() => sale.value.products.length > 0 && sale.value.dependiente && sale.value.client)

const agregar = (ops) => {
  console.log(ops)
  let inx = sale.value.products.findIndex(e => e.id == ops.id)
  if (inx >= 0) {
    product.value.val = sale.value.products[inx];
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
  console.log(opt)
  let inx = sale.value.products.findIndex(e => e.id == opt.id)
  if (inx >= 0) {
    product.value.val = sale.value.products[inx];
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


const changeClient = () => {
  console.log('cambio de cliente')
  clients.value.state = true
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
  sale.value.client = b
  Resourse.actualizarPreciosProductosSales(sale.value.products, b._price_list, cashLYT.rules)
  clients.value = {
    state: false,
    val: null,
    opts: []
  }
  $q.loading.hide();

}


const changeDepen = () => {
  console.log('cambio de cliente')
  Dependiente.value.state = true
}

const searchDep = async () => {
  if (Dependiente.value.val) {
    let data = {
      val:Dependiente.value.val,
      sto:VDB.session.store.id
    }
    const resp = await cashApi.getDependiente(data);
    if (resp.fail) {
      console.log(resp);
    } else {
      if (resp.length > 0) {
        console.log(resp);
        Dependiente.value.opts = resp
      } else {
        $q.notify({ message: 'No hay ningun Dependiente con el parametro de busqueda intentalo de nuevo', type: 'negative', position: 'bottom' })
      }
    }
    console.log(resp);
  } else {
    $q.notify({ message: 'Coloca Numero, telefono o Nombre para hacer la busqueda', type: 'negative', position: 'bottom' })
  }
}

const changeNewDep = (a, b) => {
  sale.value.dependiente = b
  Dependiente.value = {
    state: false,
    val: null,
    opts: []
  }
  $q.loading.hide();
}

const addProdcut = (product) => {
  sale.value.products.push(product)
  reset();
  nextTick(() => {
    productRef.value?.focus()
  })
}

const editProduct = () => {
  nextTick(() => {
    productRef.value?.focus()
  })
}

const deleteProduct = (product) => {
  let inx = sale.value.products.findIndex(e => e.id == product.id)
  if (inx >= 0) {
    sale.value.products.splice(inx, 1)
    reset();
  }
  nextTick(() => {
    productRef.value?.focus()
  })
}

const finallytck = async (pagos) => {
  $q.loading.show({ message: 'Realizando Ticket' })
  sale.value.payments = pagos
  sale.value.change = pagos.conditions.super ? 0 : (Number.parseFloat(pagos.SFPA.val) + Number.parseFloat(pagos.PFPA.val)) + Number.parseFloat(pagos.VALE.val) - sale.value.products.reduce((a, c) => a + c.pivot.total, 0)
  sale.value.total = sale.value.products.reduce((a, c) => a + c.pivot.total, 0)
  let data = {
    order: sale.value,
    cashier: cashLYT.cash
  }
  console.log(data);
  const resp = await cashApi.addSaleStandar(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    endSale.value = false;
    sale.value = {
      client: null,
      dependiente: null,
      products: []
    }
    localStorage.removeItem('current_sale')
    $q.loading.hide();
  }
}

const reset = () => {
  product.value = {
    state: false,
    val: null,
    edit: false
  };
  pivots.value = {
    amount: 0,
    amountDelivered: 0,
    price: 0,
    toDelivered: 0,
    total: 0,
    units: 0,
    _price_list: 1,
    _supply_by: 1
  }
  nextTick(() => {
    productRef.value?.focus()
  })
}


const handleKeyDown = (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'b') {
    e.preventDefault()
    if (!clients.value.state) {
      clients.value.state = true
    }
  } else if (e.ctrlKey && e.key.toLowerCase() === 'd') {
    e.preventDefault()
    if (!Dependiente.value.state) {
      Dependiente.value.state = true
    }
  } else if (e.altKey && e.key === 'Enter' && validForm.value) {
    e.preventDefault()
    if (!endSale.value) {
      endSale.value = true
    }
  }
}

watch(
  () => sale.value,
  (val) => {
    localStorage.setItem('current_sale', JSON.stringify(val))
  },
  { deep: true }
)

onMounted(() => {
  const savedSale = localStorage.getItem('current_sale')
  if (savedSale) {
    sale.value = JSON.parse(savedSale)
  }
  window.addEventListener('keydown', handleKeyDown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
