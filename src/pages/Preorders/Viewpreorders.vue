<template>
  <q-page padding v-if="order">

    <div class="row items-center justify-between bg-primary text-white q-py-xs q-px-sm">

      <q-btn @click="$router.push('/preorders/pedidos')" dense flat icon="close" color="white" />
      <div class="row items-center col">
        <div class="q-pa-xs col text-center">
          <div class="text-caption">Folio:</div>
          <div class="text-body2 text-bold">{{ order.id }}</div>
        </div>

        <div class="q-pa-xs col text-center">
          <div class="text-caption">Cliente:</div>
          <div class="text-body2 text-bold">{{ order.name }}</div>
        </div>
      </div>
      <q-btn icon="settings" dense flat>
        <q-menu style="width: 100%">
          <q-card>
            <q-card-section class="q-pa-sm">
              <q-select v-model="$orderStore.units.val" :options="$orderStore.units.opts" label="Pedir Por" filled option-label="name" dense />
            </q-card-section>
            <!-- <q-card-actions align="center" class="q-pa-none">
              <q-btn dense flat icon="upload" color="primary" @click="clickFile" />
            </q-card-actions> -->
            <q-card-section>
              <div class="row items-center justify-between q-mt-xs">
                <div class="row text-center">
                  <div class="q-px-md col">
                    <div class="text-caption ">Modelos</div>
                    <span class="text-body2 text-bold ">
                      {{ order.products.length }}
                    </span>
                  </div>
                  <div class="q-px-md col ">
                    <div class="text-caption ">Unidades</div>
                    <span class="text-body2 text-bold ">
                      {{order.products.reduce((a, v) => a + Number(v.pivot.units), 0)}}
                    </span>
                  </div>

                  <div class="q-px-md col ">
                    <div class="text-caption ">Total</div>
                    <span class="text-body2 text-bold ">
                      $ {{order.products.reduce((a, v) => a + Number(v.pivot.total), 0)}}
                    </span>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-menu>
      </q-btn>
    </div>
    <q-separator />
    <q-list bordered v-for="(uni, index) in $orderStore.units.opts" :key="index">
      <q-expansion-item expand-separator default-opened header-class="text-bold" expand-icon-class="hidden"
        v-if="order.products.filter(e => e.pivot._supply_by == uni.id).length">
        <template v-slot:header>
          <div class="row full-width items-center justify-between q-py-sm ">
            <div> {{ uni.name.toUpperCase() }} - {{order.products.filter(e => e.pivot._supply_by == uni.id).length}}
              productos <q-icon name="fas fa-caret-right" /> {{order.products.filter(e => e.pivot._supply_by ==
                uni.id).reduce((a, val) => a + val.pivot.units, 0)}} pzs
            </div>
            <div class="text-bold">$ {{order.products.filter(e => e.pivot._supply_by == uni.id).reduce((a, val) => a +
              val.pivot.total, 0)}}</div>
          </div>
        </template>
        <q-separator />
        <transition-group appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
          <div v-for="(prod, index) in order.products.filter(e => e.pivot._supply_by == uni.id)" :key="index"
            class="q-py-md q-px-sm wrapper_prod" @click="edit(prod)">
            <div class="row items-center">
              <div class="col q-pr-sm">
                <div class=" row items-center justify-between">
                  <div>
                    <span>{{ prod.code }}</span> --
                    <span>{{ prod.name }}</span>
                  </div>
                  <span class="text-caption text-right text-grey-6">{{ prod.category.familia.name }} (pxc {{ prod.pieces
                  }})</span>
                </div>
                <div class="text--3 text-uppercase text-italic">
                </div>
                <div class="text--2 text-grey-6">{{ prod.description }}</div>
                <div class="col text--2 text-caption"> {{ prod._supply_by != 1 ?
                  `(${prod.pivot.units} pzs)` : `` }}, PU: ${{ prod.pivot.price }}</div>
                <div class="text--2 text-amber-13">{{ prod.pivot.comments }}</div>
              </div>
              <div class="text-right ">
                <div class="text-caption text-bold">$ {{ prod.pivot.total }}</div>
                <div class="text-caption"> {{prod.prices.find(e => e.id == prod.pivot._price_list).name}}</div>
              </div>
            </div>
            <q-separator />
          </div>
        </transition-group>
      </q-expansion-item>
    </q-list>


    <q-dialog v-model="printers.state" persistent>
      <q-card>
        <q-card-section class="row items-center bg-primary text-white text-h6">
          Selecciona Impresora
        </q-card-section>
        <q-card-section class="">
          <q-select v-model="$orderStore.printers.val" :options="$orderStore.printers.opts.filter(e => e._type == 1)" label="Impresoras" option-label="name" filled />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Terminar" color="primary" @click="nextState" :disabled="!$orderStore.printers.val" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="product.state" persistent position="bottom">
      <viewProduct :product="product.val" :order="order" :edit="product.edit" @reset="reset" :products="order.products"
        :rules="$orderStore.rules" @addProduct="addProdcut" @deleteProduct="deleteProduct" :units="$orderStore.units.opts" :unit="$orderStore.units.val" />
    </q-dialog>

    <q-dialog v-model="dataResponse.state" persistent>
      <q-card>
        <q-card-section class="text-center text-h5 text-bold">
          Resultados de Importacion
        </q-card-section>
        <q-card-section class="text-centet text-h6 text-bold">
          Correctos: {{ dataResponse.added.length }}
        </q-card-section>
        <q-card-section>
          Modelos sin Coincidencia: <span class="text-bold text-red">{{ dataResponse.notfound }}</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-footer reveal elevated bordered  v-if="order._status == 1" >
      <q-separator spaced inset vertical dark />
      <div class="row q-ml-sm">
        <q-card class="col">
          <ProductAutocomplete :checkState="true" @input="add" with_prices @agregar="agregar"
            :workpoint-status="[1, 2, VDB.session.store.id_viz]" :wkpToVal="VDB.session.store.id_viz" />
        </q-card>
        <q-separator spaced inset vertical dark />
        <div>
          <q-btn flat icon="send" @click="printers.state = !printers.state" v-if="order.products.length > 0" />
        </div>
      </div>
      <q-separator spaced inset vertical dark />
    </q-footer>
    <q-footer  reveal elevated bordered v-else>
        <q-card class="my-card">
          <q-card-section class=" text-center text-bold bg-primary ">
           El pedido ya esta terminado :/
          </q-card-section>
        </q-card>
    </q-footer>
    <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import catalogApi from 'src/API/catalogApi'
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';
import viewProduct from 'src/components/Orders/productView.vue';// encabezado aoiida
import orderApi from 'src/API/orderApi'
import { vizmedia } from "boot/axios"
import { useVDBStore } from 'stores/VDB';
import { useOrderStore } from 'stores/OrderStore';
import { colors, useQuasar } from 'quasar';
import { $sktOrders } from 'src/boot/socket';
const $route = useRoute();
const $router = useRouter();
const $orderStore = useOrderStore();
// $orderStore.setTitle('PEDIDOS');
$orderStore.setshowLyt(false);

const $q = useQuasar();
const VDB = useVDBStore()
const order = ref(null)
const units = ref({
  opts: [],
  val: null
})
const product = ref({
  state: false,
  val: null,
  edit: false
})
const dataResponse = ref({
  state: false,
  notfound: [],
  added: []
})
const inputFile = ref(null)

const pivots = ref({
  amount: 1,
  amountDelivered: 0,
  price: 0,
  toDelivered: 0,
  total: 0,
  units: 1,
  _price_list: 1,
  _supply_by: 1
})

const printers = ref({
  state: false,
  val: null,
  opts:[]
})

const init = async () => {
  $q.loading.show({message:'Obtenidendo datos'})
  let data = {
    pedido: $route.params.oid,
    store: VDB.session.store.id_viz,
    uid: VDB.session.credentials.staff.id_va
  }
  const resp = await orderApi.getOrderPrv(data)
  if (resp.fail) {
    console.log(resp)
    if (resp.fail.status == 401 || resp.fail.status == 404) {
      $q.notify({ message: resp.fail.response.data.mssg, type: 'negative', position: 'top' })
      $router.push(`/preorders/pedidos`);
    }
  } else {
    console.log(resp)
    order.value = resp
    $q.loading.hide()
  }

}

const agregar = (opt) => {
  console.log(opt)
  let inx = order.value.products.findIndex(e => e.id == opt.id)
  if (inx >= 0) {
    // producto ya existe en el pedido: abrir edición
    opt.units = $orderStore.units.opts.find(e => e.id == opt.pivot._supply_by)
    product.value.val = order.value.products[inx];
    product.value.state = true
    product.value.edit = true
  } else {
    pivots.value._supply_by = $orderStore.units.val.id
    opt.pivot = { ...pivots.value }
    console.log(opt.pivot)
    opt.units = $orderStore.units.val
    product.value.val = opt;
    product.value.state = true
    product.value.edit = false
  }
}

const add = (opt) => {
  console.log(opt)
  let inx = order.value.products.findIndex(e => e.id == opt.id)
  if (inx >= 0) {
    // producto ya existe en el pedido: abrir edición
    opt.units = $orderStore.units.opts.find(e => e.id == opt.pivot._supply_by)
    product.value.val = order.value.products[inx];
    product.value.state = true
    product.value.edit = true
  } else {
    pivots.value._supply_by = $orderStore.units.val.id
    opt.pivot = { ...pivots.value }
        console.log(opt.pivot)
    opt.units = $orderStore.units.val
    product.value.val = opt;
    product.value.state = true
    product.value.edit = false
  }
}


const reset = () => {
  product.value = {
    state: false,
    val: null,
    edit: false
  };
  pivots.value._supply_by = 1
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

const edit = (prd) => {
  console.log(prd);
  console.log(units.value);
  prd.units = $orderStore.units.opts.find(e => e.id == prd.pivot._supply_by);
  product.value.val = prd
  product.value.state = true
  product.value.edit = true
}


const clickFile = () => {
  inputFile.value.click()
}

const readFile = async () => {
  let inputFile = document.getElementById("inputFile").files[0];
  let workbook = new ExcelJS.Workbook();
  let datos = {};


  workbook.xlsx.load(inputFile).then(async (data) => {
    let worksheet = workbook.worksheets[0];
    let codigos = worksheet.getColumn("A");
    let cantidades = worksheet.getColumn("B");
    codigos.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber === 1) return;
      let codigo = cell.value;
      let cantidadCell = worksheet.getCell(`B${rowNumber}`);
      let cantidad = parseFloat(cantidadCell.value);
      if (codigo) {
        if (datos[codigo]) {
          datos[codigo] += cantidad;
        } else {
          datos[codigo] = cantidad;
        }
      }
    });

    let Diferencia = Object.keys(datos).map(codigo => ({
      codigo: codigo,
      cantidad: datos[codigo]
    }));
    if (Diferencia.length) {
      let data = {
        codes: Diferencia,
        _requisition: order.value.id
      };
      $q.loading.show({ message: "Procesando archivo, espera.." });
      console.log(data)
      const resp = await RestockApi.addMassiveProducts(data)
      if (resp.fail) {
        console.log(resp)
      } else {
        console.log(resp)
        order.value.products = resp.products
        dataResponse.value.state = true
        dataResponse.value.added = resp.products
        dataResponse.value.notfound = resp.notFound
        // dataResponse.value.state = true
        $q.loading.hide()
      }
    } else {
      $q.notify({
        message: "Vaya!! Al parecer este archivo esta vacio.",
        icon: "fas fa-grin-beam-sweat",
        color: "negative",
      });
    }

  });
}

const nextState = async () => {
  $q.loading.show({message:'Mandando Pedido'})
  let data = {
    id: order.value.id,
    _printer: $orderStore.printers.val
  }
  console.log(data)
  const resp = await orderApi.nextStepPrv(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    let socketData = { order: resp.order, newstate: resp.status }
    console.log(socketData);
    $sktOrders.emit('order_update', socketData)
    $orderStore.addOrUpdate(socketData);
    $router.push('/preorders/pedidos')
    $q.loading.hide()
  }
}


init()
</script>
