<template>
  <q-page padding v-if="traspaso">
    <q-header reveal bordered class="bg-white text-black">
      <q-toolbar class="justify-between">
        <q-btn color="primary" icon="arrow_back" flat @click="$router.push('/transfers')" round />
        <div>{{ traspaso.store.name }} </div>
        <div class="row items-center">
          <div class="col"> {{ traspaso.origin.name }}</div> <q-icon name="arrow_forward" class="col" />
          <div class="col"> {{ traspaso.destiny.name }}</div>
        </div>
        <div>{{ traspaso.created_by }} </div>
        <div>Traspaso <q-icon name="navigate_next" color="primary" /> <span class="text-h6">{{ traspaso.code_fs
            }}</span>
        </div>
      </q-toolbar>
      <q-separator />
      <div class="text-center text-bold">{{ traspaso.notes }}</div>
    </q-header>

    <q-separator spaced inset vertical dark />


    <q-list bordered>
      <q-item>
        <q-item-section> Producto </q-item-section>
        <q-item-section> Descripcion </q-item-section>
        <q-item-section class="text-center"> Cantidad </q-item-section>
      </q-item>
    </q-list>

    <q-list bordered v-for="(product, index) in products" :key="index">

      <q-item clickable v-ripple @click="viewProduct(product)">
        <q-item-section>{{ product.product }}</q-item-section>
        <q-item-section>{{ product.description }}</q-item-section>
        <q-item-section class="text-center">{{ product.amount }}</q-item-section>
      </q-item>
      <q-separator />
    </q-list>

    <q-dialog v-model="product.state" persistent :position="'bottom'">
      <q-card style="width: 300; max-width: 40vw;">
        <q-card-section>
          <div class="text-center text-h4">{{ product.val.product }}</div>
          <div class="text-center text-h6 text-grey-14">{{ product.val.description }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-center">
            <div class="q-pa-xs">
              <div class="text-bold text-h6">Cantidad:</div>
              <div class="row">
                <q-btn flat color="negative" icon="remove" class="text-h5 col"
                  @click="product.val.amount > 1 ? product.val.amount-- : ''" />
                <div class=" col column q-py-md">
                  <input type="number" min="1" v-model="product.val.amount" class="text-center exo"
                    style=" width: 100px; font-size: 3em; margin: auto auto; border: none;" />
                </div>
                <q-btn flat color="positive" icon="add" class="text-h5 col" @click="product.val.amount++" />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center" v-if="!existProduct">
          <q-btn flat label="Cancelar" color="negative" @click="reset" />
          <q-btn flat label="Agregar" color="positive" @click="addProduct" />
        </q-card-actions>
        <q-card-actions align="center" v-else>
          <q-btn flat icon="close" color="red-10" @click="reset" />
          <q-btn flat label="Eliminar" color="negative" @click="deleteProduct" />
          <q-btn flat label="Editar" color="blue-10" @click="editProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-footer reveal elevated bordered class="bg-white">
      <q-card class="q-mb-md" flat bordered dense>
        <q-card-section class="row">
          <ProductAutocomplete class="col" :checkState="false" @input="add" @agregar="agregar" />
          <q-btn v-if="products.length > 0" color="primary" flat icon="east" @click="endTransfer" round/>
        </q-card-section>
      </q-card>
    </q-footer>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import tranApi from "src/API/transferApi";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import { useRoute, useRouter } from "vue-router";
const $router = useRouter();
const $route = useRoute();


const VDB = useVDBStore();
const $q = useQuasar();
const traspaso = ref(null);
const product = ref({
  val: null,
  state: false
})
const products = ref([]);


const existProduct = computed(() => products.value?.filter(e => e.product ==  product.value.val?.product).length > 0)

const init = async () => {
  const transfer = $route.params.oid;
  const resp = await tranApi.getTransfer(transfer)
  if (resp.fail) {
    console.log(resp)
  } else {
    traspaso.value = resp
    products.value = resp.bodie
    console.log(traspaso.value)
  }
}

const add = (opt) => {
  console.log(opt)
}

const agregar = (ops) => {
  let inx = products.value.findIndex(e => e.product == ops.code)
  console.log(inx);
  if (inx >= 0) {
    $q.notify({ message: 'El Producto ya esta agregado', type: 'negative', position: 'center' })
  } else {
    product.value.val = {
      "product": ops.code,
      "description": ops.description,
      "amount": 1
    };
    product.value.state = true
    console.log(ops);

  }
}

const addProduct = async () => {
  $q.loading.show({message:'Insertando Producto'})
  console.log(product.value.val)
  product.value.val._transfer = $route.params.oid
  const resp = await tranApi.addProduct(product.value.val)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    products.value.push(product.value.val);
    product.value = {
      val: null,
      state: false
    }
    $q.loading.hide()
  }
}

const editProduct = async () => {
  $q.loading.show({message:'Editando Producto'})
  console.log(product.value.val)
  product.value.val._transfer = $route.params.oid
  const resp = await tranApi.editProduct(product.value.val)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    let inx = products.value.findIndex(e => e.product == product.value.val.product)
    if(inx >= 0 ){
      products.value[inx].amount = product.value.val.amount
      $q.notify({type:'positive',position:'center'})
      product.value = {
      val: null,
      state: false
    }
    $q.loading.hide()
    }

  }
}
const deleteProduct = async () => {
  $q.loading.show({message:'Eliminando Producto'})
  console.log(product.value.val)
  product.value.val._transfer = $route.params.oid
  const resp = await tranApi.removeProduct(product.value.val)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    let inx = products.value.findIndex(e => e.product == product.value.val.product)
    if(inx >= 0 ){
      products.value.splice(inx, 1)
      $q.notify({type:'positive',position:'center'})
      product.value = {
      val: null,
      state: false
    }
    $q.loading.hide()
    }

  }
}

const viewProduct = (val) => {
  product.value.state = true
  product.value.val = val
}

const reset = () => {
  product.value = {
    val: null,
    state: false
  }
}

const endTransfer = async () => {
  $q.loading.show({message:'Terminando Traspaso'})
  let data = {
    user:VDB.session.name,
    traspaso:traspaso.value,
    products:products.value
  }
  const resp = await tranApi.endTransfer(data)
  if(resp.fail){
    console.log(resp)
  }else{
    $q.notify({message:resp,position:'center',type:'positive'})
    console.log(resp)
    $q.loading.hide();
    $router.push('/transfers')
  }
}



init()
</script>
