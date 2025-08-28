<template>
  <q-page>
    <q-toolbar class="">
      <q-toolbar-title>
      </q-toolbar-title>
      <q-btn flat round dense icon="settings" class="q-mr-xs">
        <q-menu style="width:200px;">
          <q-card class="my-card">
            <q-card-section>
              <q-list dense>
                <q-item class="q-px-sm q-py-xs column">
                  <div class="row items-center justify-between">
                    <q-item-label>{{ config.name }}</q-item-label>
                    <q-toggle color="blue" v-model="config.option"
                      @update:model-value="(a) => { a ? config.value = 16 : config.value = 0 }" />
                  </div>
                  <q-select v-if="config.option" v-model="config.value" :options="config.optval" label="Porcentaje"
                    filled dense emit-value map-options class="q-mt-sm" />
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-menu>
      </q-btn>

      <q-btn flat round dense icon="receipt_long">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item>
              <q-item-section>
                <q-select v-model="reut.val" :options="reut.opts" label="Tipo" filled dense />
                <q-separator spaced inset vertical dark />
                <q-input v-model="reut.valueVal" :type="reut.val.type" dense filled :label="reut.val.label"
                  @keyup.enter="reutilizar" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

    </q-toolbar>
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
          <div class="text-caption text-center">{{ config.option ? 'SUBTOTAL' : 'TOTAL' }}</div>
          <div class="text-center text-h6">$ {{ total }}</div>
        </div>
        <div class="col " v-if="config.option">
          <div class="text-caption text-center"> IVA </div>
          <div class="text-center text-h6 text-caption">$ {{ Number(total * Number((config.value / 100))).toFixed(2) }}
          </div>
        </div>
        <div class="col " v-if="config.option">
          <div class="text-caption text-center"> TOTAL </div>
          <div class="text-center text-h6">$ {{ Number(total * Number((1 + config.value / 100))).toFixed(2) }}</div>
        </div>
        <div class="col ">
          <div class="text-caption text-center">Cantidad</div>
          <div class="text-center text-h6">{{ cantidad }}</div>
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced inset vertical dark />

    <q-table :rows="sale.products" :columns="columns" hide-bottom :pagination="table.pagination"
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
        <paymentSales
          :total="config.option ? Number(total * Number.parseFloat((1 + config.value / 100))) : Number(total)"
          :paymeths="cashLYT.methods" :client="sale.client.id" @sendTicket="finallytck" />
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
import ProductAutocomplete from 'src/components/Sales/ProductAutocomplete.vue';// encabezado aoiida
import viewProduct from 'src/components/Sales/viewProduct.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { exportFile, useQuasar, date } from 'quasar';
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import paymentSales from 'src/components/Sales/PaymentSales.vue';// encabezado aoiida;
import cashApi from 'src/API/cashApi';
import orderApi from 'src/API/orderApi';
import Resourse from 'src/API/resoursesOrder';
import { layouts } from 'chart.js';
import saleLocalApi from 'src/API/saleLocalApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const cashLYT = useLayoutCash();


const order = ref(null);
const productRef = ref(null)
const reut = ref({
  val: { id: 1, label: "Preventa", type: "number" },
  opts: [
    { id: 1, label: "Preventa", type: "number" },
    // { id: 2, label: "Particion", type: "number" },
    // { id: 3, label: "Presupuesto", type: "text" },
    // { id: 4, label: "Ticket", type: "number" },
    // {id:1,label:"Preventa"},
  ],
  valueVal: null
})
const pivots = ref({
  amount: 0,
  amountDelivered: 1,
  price: 0,
  toDelivered: 0,
  total: 0,
  units: 0,
  _price_list: 1,
  _supply_by: 1
})
const config = ref({ name: 'IVA', option: false, optval: [16, 8, 6], value: 0, amount: 0 })
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
  client: {
    "id": 0,
    "name": "PUBLICO EN GENERAL",
    "phone": "",
    "email": "",
    "rfc": "",
    "address": "{\"cp\": 6300, \"calle\": \"PLAZA DE LOS ANGELEES 5\", \"colonia\": \"Guerrero\", \"municipio\": \"Deleg. Cuauhtemoc CDMX\"}",
    "created_at": "2020-12-28T07:00:00.000000Z",
    "updated_at": null,
    "_price_list": 1,
    "store_name": null
  },
  dependiente: VDB.session.credentials.staff,
  products: []
})

const endSale = ref(false)

const table = ref({
  columns: [
    { name: 'code', label: 'Codigo', field: r => r.code, align: 'left' },
    { name: 'description', label: 'Descripcion', field: r => r.description, align: 'left' },
    // { name: 'amount', label: 'Pedido', field: r => r.pivot.units, align: 'center' },
    { name: 'verify', label: 'Cantidad', field: r => r.pivot.toDelivered, align: 'center' },
    { name: 'price', label: 'Precio', field: r => r.pivot.price, align: 'center' },
    { name: 'bruto', label: config.option ? 'Bruto' : 'Total', field: r => r.pivot.total, align: 'center' },
    { name: 'iva', label: 'Total', field: r => r.pivot.total, align: 'center' },
    { name: 'neto', label: 'Total', field: r => r.pivot.total, align: 'center' },

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
const columns = computed(() => {
  const cols = [
    {
      name: 'code',
      label: 'Codigo',
      field: row => row.code,
      align: 'left'
    },
    {
      name: 'description',
      label: 'Descripcion',
      field: row => row.description,
      align: 'left'
    },
    ,
    {
      name: 'verify',
      label: 'Verificado',
      field: row => row.pivot.toDelivered,
      align: 'center'
    },
    {
      name: 'price',
      label: 'Precio',
      field: row => row.pivot.price,
      align: 'center'
    },
    {
      name: 'bruto',
      label: config.value.option ? 'Subtotal' : 'Total',
      field: row => row.pivot.total,
      format: val => `$ ${val.toFixed(2)}`,
      align: 'center'
    }
  ]

  // // Si IVA está activo, agregamos columnas de IVA y Total con IVA
  // if (config.value.option) {
  //   cols.splice(6, 0, {
  //     name: 'iva',
  //     label: 'IVA',
  //     field: row => row.pivot.total * (config.value.value / 100),
  //     format: val => `$ ${val.toFixed(2)}`,
  //     align: 'center'
  //   })

  //   cols.push({
  //     name: 'total',
  //     label: 'Total c/IVA',
  //     field: row => row.pivot.total * (1 + config.value.value / 100),
  //     format: val => `$ ${val.toFixed(2)}`,
  //     align: 'center'
  //   })
  // }

  return cols
})

const agregar = (ops) => {
  console.log(ops)
  let prices = ops.prices.map(e => e.pivot.price).includes(0)
  if (!prices) {
    // let inx = sale.value.products.findIndex(e => e.id == ops.id)
    // if (inx >= 0) {
    // product.value.val = sale.value.products[inx];
    // product.value.state = true
    // product.value.edit = true
    // } else {
    ops.pivot = pivots.value;
    product.value.val = ops;
    product.value.state = true
    product.value.edit = false
    // }
  } else {
    $q.notify({ message: 'El producto no tiene precio :/', type: 'negative', position: 'center' })
  }
}

const add = (opt) => {
  console.log(opt)
  let prices = opt.prices.map(e => e.pivot.price).includes(0)
  if (!prices) {
    // let inx = sale.value.products.findIndex(e => e.id == opt.id)
    // if (inx >= 0) {
    // product.value.val = sale.value.products[inx];
    // product.value.state = true
    // product.value.edit = true
    // } else {
    opt.pivot = pivots.value;
    product.value.val = opt;
    product.value.state = true
    product.value.edit = false
    // }
  } else {
    $q.notify({ message: 'El producto no tiene precio :/', type: 'negative', position: 'center' })
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
      val: Dependiente.value.val,
      sto: VDB.session.store.id
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
  // (Number(Number.parseFloat(modes.value.SFPA.val) + Number.parseFloat(modes.value.PFPA.val)) + Number.parseFloat(modes.value.VALE.val) - Number.parseFloat(props.total)).toFixed(2))
  sale.value.change = pagos.conditions.super ? 0 : pagos.change
  if (config.value.option) {
    sale.value.subtotal = sale.value.products.reduce((a, c) => a + c.pivot.total, 0)
    sale.value.iva = config.value.value
    sale.value.total = Number(total.value * Number((1 + config.value.value / 100)).toFixed(2))
    sale.value.impuesto = Number(total.value * Number((config.value.value / 100))).toFixed(2)
  } else {
    sale.value.total = sale.value.products.reduce((a, c) => a + c.pivot.total, 0)
  }

  let data = {
    order: sale.value,
    cashier: cashLYT.cash,
    config: config.value
  }
  console.log(data);
  const resp = await saleLocalApi.addSale(data)
  console.log(resp)
  // const resp = await cashApi.addSaleStandar(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    endSale.value = false;
    let current_sale = {
      client:{ "id": 0,
        "name": "PUBLICO EN GENERAL",
        "phone": "",
        "email": "",
        "rfc": "",
        "address": "{\"cp\": 6300, \"calle\": \"PLAZA DE LOS ANGELEES 5\", \"colonia\": \"Guerrero\", \"municipio\": \"Deleg. Cuauhtemoc CDMX\"}",
        "created_at": "2020-12-28T07:00:00.000000Z",
        "updated_at": null,
        "_price_list": 1,
        "store_name": null},
      dependiente:sale.value.dependiente,
      products:[]
    }
    sale.value = current_sale;
    // sale.value.client = {
    //   // client: {
    //     "id": 0,
    //     "name": "PUBLICO EN GENERAL",
    //     "phone": "",
    //     "email": "",
    //     "rfc": "",
    //     "address": "{\"cp\": 6300, \"calle\": \"PLAZA DE LOS ANGELEES 5\", \"colonia\": \"Guerrero\", \"municipio\": \"Deleg. Cuauhtemoc CDMX\"}",
    //     "created_at": "2020-12-28T07:00:00.000000Z",
    //     "updated_at": null,
    //     "_price_list": 1,
    //     "store_name": null
    //   // },
    //   // dependiente: null,
    //   // products: []
    // }
    // sale.value.products = [];


    config.value.value = 0
    config.value.option = false
    // localStorage.removeItem('current_sale')
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
    amountDelivered: null,
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

const reutilizar = async () => {
  console.log(reut.value)
  switch (reut.value.val.id) {
    case 1:
      searchOrd(reut.value)
      break;

    default:
      break;
  }
}

const searchOrd = async (order) => {
  console.log(order)
  if (order) {
    $q.loading.show({ message: 'Obteniendo Orden' })
    let data = {
      uid: VDB.session.credentials.staff.id_va,
      oid: order.valueVal
    }
    const resp = await cashApi.getOrderCash(data)
    if (resp.fail) {
      if (resp.fail.status == 401) {
        console.log(resp);
        $q.notify({ message: resp.fail.response.data, type: 'negative', position: 'bottom' })
        order.value = null;
        $q.loading.hide();
      } else if (resp.fail.status == 404) {
        console.log(resp);
        $q.notify({ message: resp.fail.response.data, type: 'negative', position: 'bottom' })
        order.value = null;
        $q.loading.hide();
      } else {
        console.log(resp);
      }
    } else {
      sale.value.order = order.valueVal;
      sale.value.dependiente = resp.staff
      sale.value.client = resp.client
      resp.products.forEach(newProduct => {
        console.log(newProduct)
        const existing = sale.value.products.find(p => p.id === newProduct.id)

        const newUnits = newProduct.pivot?.amountDelivered || 0
        if (existing) {
          if (!existing.pivot) {
            existing.pivot = { amountDelivered: 0 }
          }
          existing.pivot.amountDelivered += newUnits
        } else {
          sale.value.products.push({ ...newProduct })
        }
      })
      reut.value.valueVal = null
      console.log(resp)
      $q.loading.hide();
    }
  }
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
