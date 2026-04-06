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
      <q-btn icon="delete_sweep" @click="sumPrices" flat round dense title="Eliminar Productos" />
      <q-btn icon="notes" flat round dense title="Agregar Notas">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item>
              <q-item-section>
                <q-input v-model="sale.observation" type="text" label="Observacion" />
              </q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn flat round dense v-if="validForm" icon="save" @click="endSale = !endSale" />
    </q-toolbar>

    <q-card class="my-card q-ml-sm q-mr-sm ">
      <q-card-section class="row">
        <div class="col">
          <div class="text-caption text-center">Dependiente</div>
          <q-btn class="full-width" flat :label="sale.dependiente ? sale.dependiente.complete_name : 'CTRL+d'"
            @click="changeDepen"   />
        </div>
        <q-separator spaced inset vertical dark />
        <div class="col  ">
          <div class="text-caption text-center">Cliente</div>
          <q-btn class="full-width" flat :label="sale.client ? sale.client.name : 'CTRL+b'" @click="changeClient"   />
        </div>
      </q-card-section>
    </q-card>
    <q-separator spaced inset vertical dark />
    <q-card class="my-card q-ml-sm q-mr-sm">
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
    <q-input class="q-ml-md q-mr-md" v-model="table.filter" type="text" label="Buscar" filled dense />
    <q-separator spaced inset vertical dark />

    <div class="row q-ml-sm q-mr-sm">
      <div class="col">
        <q-table :rows="bascketProductVerified" :columns="columns" hide-bottom :pagination="table.pagination"
          :filter="table.filter">
          <template v-slot:body-cell-promo="props">
            <q-td align="center">
              <q-badge v-if="props.row.pivot.promo_units > 0" color="red" label="OFERTA " />
            </q-td>
          </template>
          <template v-slot:body-cell-verify="props">
            <q-td align="center">
              <div class="row">
                <div class="col" v-if="props.row.pivot.units <= 1"><q-btn color="negative" rounded dense size="xs"
                    icon="delete" @click="deleteProduct(props.row)" /></div>
                <div class="col" v-else><q-btn dense color="primary" rounded size="xs" icon="remove"
                    @click="removeUnit(props.row)" /></div>
                <div class="col cursor-pointer">
                  {{ props.row.pivot.units }}
                  <q-popup-edit v-model="props.row.pivot.units"
                    @save="(val) => editProduct(validateUnits(val), props.row)" v-slot="scope">
                    <q-input v-model="scope.value" dense autofocus type="number" hint="Cantidad"
                      @keyup.enter="scope.set" min="1" step="1" outlined
                      @keypress="($event.key === '.' || $event.key === '-') && $event.preventDefault()" />
                  </q-popup-edit>
                </div>
                <div class="col"><q-btn dense color="primary" rounded size="xs" icon="add"
                    @click="addUnit(props.row)" /></div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td align="center">
              <div class="row">
                <q-btn color="negative" flat rounded dense size="sm" icon="delete" @click="deleteProduct(props.row)" />
              </div>
            </q-td>
          </template>
        </q-table>

      </div>
    </div>

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

    <q-dialog v-model="searchProduct.state" >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <q-input v-model="searchProduct.target" type="text" label="Producto" filled dense
            @keypress.enter="searchInfProduct" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-table :rows="searchProduct.products" :columns="searchProduct.columns" :loading="searchProduct.loading"
            @row-click="addProductTable" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-footer bordered class="bg-white">
      <q-card class="q-mb-md" flat bordered dense>
        <q-card-section class="row">
          <ProductAutocomplete ref="productRef" class="col" @input="addProdcut" :products="sale.products"
            :rules="cashLYT.rules" :promotion="cashLYT.promotion" @infProduct="infProduct" :automate="automate" />
        </q-card-section>
      </q-card>
    </q-footer>

  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { useLayoutCash } from 'stores/cashLYT';
import dbproduct from 'src/API/productsApi'
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
import SalesOffers from 'src/layouts/salesOffers.vue';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const cashLYT = useLayoutCash();


const searchProduct = ref({
  state: false,
  target: '',
  loading: false,
  products: [],
  columns: [
    { name: 'code', label: 'Codigo', field: r => r.code, align: 'left', sortable: true },
    { name: 'barcode', label: 'CB', field: r => r.barcode, align: 'left', sortable: true },
    { name: 'description', label: 'Descripcion', field: r => r.description, align: 'left', sortable: true },
    { name: 'section', label: 'Seccion', field: r => r.category.familia.seccion.alias, align: 'left', sortable: true },
    { name: 'family', label: 'Familia', field: r => r.category.familia.name, align: 'left', sortable: true },
    { name: 'category', label: 'Categoria', field: r => r.category.name, align: 'left', sortable: true },
    { name: 'pieces', label: 'PXC', field: r => r.pieces, align: 'left', sortable: true },
    { name: 'stockGen', label: 'General', field: r => r.stocks.find(e => e.id == VDB.session.store.id_viz)?.pivot.gen, align: 'left', sortable: true },
    { name: 'stockExh', label: 'Exhibicion', field: r => r.stocks.find(e => e.id == VDB.session.store.id_viz)?.pivot.exh, align: 'left', sortable: true },
    { name: 'stockFDT', label: 'Fin de Temp', field: r => r.stocks.find(e => e.id == VDB.session.store.id_viz)?.pivot.fdt, align: 'left', sortable: true },
    { name: 'stockTRA', label: 'Transito', field: r => r.stocks.find(e => e.id == VDB.session.store.id_viz)?.pivot.in_transit, align: 'left', sortable: true },
  ]
})
const order = ref(null);
const productRef = ref(null)
const automate = ref(false);
const reut = ref({
  val: { id: 1, label: "Preventa", type: "number" },
  opts: [
    { id: 1, label: "Preventa", type: "number" },
    // { id: 2, label: "Particion", type: "number" },
    // { id: 3, label: "Presupuesto", type: "text" },
    // { id: 4, label: "Ticket", type: "number" },
  ],
  valueVal: null
})
const pivots = ref({
  amount: 0,
  amountDelivered: 1,
  price: 0,
  toDelivered: 0,
  total: 0,
  units: 1,
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
  products: [],
  observation: null,
})

const bascketProductVerified = computed(() => {
  return (sale.value.products || [])
})

const endSale = ref(false)

const table = ref({
  pagination: { rowsPerPage: 0 },
  filter: null
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

const cantidad = computed(() => sale.value.products.reduce((a, e) => a + Number(e.pivot.units), 0))

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
      label: 'Cantidad',
      field: row => row.pivot.units,
      align: 'center'
    },
    {
      name: 'price',
      label: 'Precio',
      field: row => row.pivot.price,
      align: 'center'
    },
    {
      name: 'promo',
      label: 'Oferta',
      field: row => Number(row.pivot.promo_amount) > 0,
      align: 'center'
    },
    {
      name: 'bruto',
      label: config.value.option ? 'Subtotal' : 'Total',
      field: row => row.pivot.total,
      format: val => `$ ${val.toFixed(2)}`,
      align: 'center'
    },
    {
      name: 'action',
      label: '',
      align: 'center'
    }
  ]
  return cols
})



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
  recalculateAll()
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
  const copy = JSON.parse(JSON.stringify(product))
  sale.value.products.push(copy)
  recalculateProduct(copy)
  recalculateAll()
  // reset();
  nextTick(() => {
    productRef.value?.focus()
  })
}

const validateUnits = (val) => {
  const num = Number(val)
  if (isNaN(num) || num < 1) return 1
  return Math.floor(num)
}

const editProduct = (val, product) => {
  product.pivot.units = Math.max(1, Math.floor(val || 1))
  recalculateProduct(product)
  recalculateAll()

  nextTick(() => {
    productRef.value?.focus()
  })
}
const addUnit = (product) => {
  product.pivot.units++
  recalculateProduct(product)
  recalculateAll()
}

const removeUnit = (product) => {
  if (product.pivot.units > 1) {
    product.pivot.units--
    recalculateProduct(product)
    recalculateAll()
  }
}

const selectPrice = (product) => {
  if (sale.value.client._price_list <= 3) {
    if (Resourse.verificarPrecioCaja(sale.value.products, product, cashLYT.rules)) {
      return 4;
    } else if (Resourse.verificarPrecioDocena(sale.value.products, product, cashLYT.rules)) {
      return 3;
    } else if (Resourse.verificarPrecioMayoreo(sale.value.products, product, cashLYT.rules)) {
      return 2;
    } else {
      return 1;
    }
  } else {
    return sale.value.client._price_list;
  }
};

const recalculateProduct = (product) => {
  const priceList = selectPrice(product)
  const price = product.prices.find(e => e.id == priceList)?.pivot.price || 0

  product.pivot.toDelivered = product.pivot.units
  product.pivot._price_list = priceList
  product.pivot.price = price
  product.pivot.total = product.pivot.units * price
}

const recalculateAll = () => {
  let debounceTimer = null
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    Resourse.aplicarPromociones(
      sale.value.products,
      cashLYT.promotion
    )
    Resourse.actualizarPreciosProductosSales(
      sale.value.products,
      sale.value.client._price_list,
      cashLYT.rules
    )
  }, 500)
}

const deleteProduct = (product) => {
  let inx = sale.value.products.findIndex(e => e.id == product.id)
  if (inx >= 0) {
    sale.value.products.splice(inx, 1)
    recalculateAll()
    reset();
  }
  nextTick(() => {
    productRef.value?.focus()
  })
}

const finallytck = async (pagos) => {
  $q.loading.show({ message: 'Realizando Ticket' })
  sale.value.payments = pagos
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
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    endSale.value = false;
    let current_sale = {
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
      dependiente: sale.value.dependiente,
      products: [],
      observation: null
    }
    sale.value = current_sale;
    config.value.value = 0
    config.value.option = false
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
    amountDelivered: 1,
    price: 0,
    toDelivered: 0,
    total: 0,
    units: 1,
    _price_list: 1,
    _supply_by: 1
  }
  nextTick(() => {
    productRef.value?.focus()
  })
}

const reutilizar = async () => {
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

        const newUnits = newProduct.pivot?.units || 0
        if (existing) {
          if (!existing.pivot) {
            existing.pivot = { units: 0 }
          }
          existing.pivot.units += newUnits
        } else {
          sale.value.products.push({ ...newProduct })
        }
      })
      recalculateAll()
      reut.value.valueVal = null
      console.log(resp)
      $q.loading.hide();
    }
  }
}

const sumPrices = () => {
  sale.value.products = [];
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
    e.stopPropagation();
    if (!endSale.value) {
      endSale.value = true
    }
  } else if (e.altKey && e.key === 'F1') {
    e.preventDefault()
    window.open(window.location.href, '_blank', 'noopener,noreferrer')
  } else if (e.key === 'F6') {
    e.preventDefault()
    cashLYT.openDialogModule(1)
  } else if (e.key === 'F7') {
    e.preventDefault()
    automate.value = !automate.value
    let message = automate.value ? 'Caja automatica Activada' :'Caja automatica Desactivada';
    let types = automate.value ? 'positive' :'negative';
    $q.notify({message:message,type:types,position:'top-right'})
  }
}

const infProduct = (code) => {
  code.trim().toUpperCase();
  searchProduct.value.state = true
  if (code.length) {
    searchProduct.value.target = code
    searchInfProduct()
  }
}
const searchInfProduct = async () => {
  let data = {
    autocomplete: searchProduct.value.target,
    _workpoint: VDB.session.store.id_viz,
  }
  console.log(data);
  searchProduct.value.loading = true
  const resp = await dbproduct.getProducts(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    searchProduct.value.products = resp
    searchProduct.value.loading = false
  }
}

const addProductTable = (a, b) => {
  console.log(b)
  b.pivot = pivots.value
  addProdcut(b)
  searchProduct.value.state = false
  searchProduct.value.target = ''
  searchProduct.value.loading = false
  searchProduct.value.products = []
}


watch(
  () => sale.value,
  (val) => {
    sessionStorage.setItem('current_sale', JSON.stringify(val))
  },
  { deep: true }
)

onMounted(() => {
  const savedSale = sessionStorage.getItem('current_sale')
  if (savedSale) {
    sale.value = JSON.parse(savedSale)
  }
  window.addEventListener('keydown', handleKeyDown, true)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown, true)
})
</script>
