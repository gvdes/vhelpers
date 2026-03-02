<template>
  <q-page padding v-if="refund">
    <q-card class="my-card">
      <q-card-section class="row">
        <div class="col text-center">
          <div class="text-caption">REFERENCIA</div>
          <div class="text-bold">{{ refund.notes }}</div>
        </div>
        <div class="col text-center">
          <div class="text-caption">DESTINO</div>
          <div class="text-bold">{{ refund.destiny.store.alias }} ({{ refund.destiny.name }})</div>
        </div>
        <div class="col text-center">
          <div class="text-caption">CREADO</div>
          <div class="text-bold">{{ refund.createdby.nick.toUpperCase() }}</div>
        </div>
        <div class="col text-center">
          <div class="text-caption">FECHA</div>
          <div class="text-bold">{{ dayjs(refund.created_at).format('DD-MM-YYYY') }}</div>
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced inset vertical dark />


    <q-list bordered>
      <q-item>
        <q-item-section> Producto </q-item-section>
        <q-item-section> Descripcion </q-item-section>
        <q-item-section class="text-center"> Cantidad </q-item-section>
      </q-item>
    </q-list>

    <q-list bordered v-for="(product, index) in refund.bodie" :key="index">

      <q-item clickable v-ripple @click="viewProduct(product)">
        <q-item-section>{{ product.code }}</q-item-section>
        <q-item-section>{{ product.description }}</q-item-section>
        <q-item-section class="text-center">{{ product.pivot.to_delivered }}</q-item-section>
      </q-item>
      <q-separator />
    </q-list>

    <q-dialog v-model="product.state" persistent :position="'bottom'">
      <q-card>
        <q-card-section>
          <div class="text-center text-h4">{{ product.val.code }}</div>
          <div class="text-center text-h6 text-grey-14">{{ product.val.description }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-center">
            <div class="q-pa-xs">
              <div class="text-bold text-h6">Cantidad:</div>
              <div class="row">
                <q-btn flat color="negative" icon="remove" class="text-h5 col"
                  @click="product.val.pivot.to_delivered > 1 ? product.val.pivot.to_delivered-- : ''" />
                <q-separator spaced inset vertical dark />
                <div class="col column bg-section ">
                  <input type="number" min="1" v-model="product.val.pivot.to_delivered"
                    class="text-center exo clean-input" style="width: 100px; font-size: 3em; margin:auto;" />
                </div>
                <q-separator spaced inset vertical dark />
                <q-btn flat color="positive" icon="add" class="text-h5 col" @click="product.val.pivot.to_delivered++" />
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

    <q-dialog v-model="endFund" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="text text-h6">Estas Seguro de terminar la devolucion no se podra editar</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat icon="close" color="negative" v-close-popup />
          <q-btn flat icon="check" color="positive" @click="nextState" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-footer reveal elevated bordered class="bg-white">
      <q-card class="q-mb-md" flat bordered dense>
        <q-card-section class="row">
          <ProductAutocomplete class="col" :checkState="true" @agregar="agregar" />
          <q-btn v-if="refund.bodie.length > 0" color="primary" flat icon="east" @click="endFund = !endFund" round />
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
import refundsApi from "src/API/refundsApi";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import pdfRefund from "src/Pdf/Refunds/Refund.js";
import { useWarehouse } from 'src/stores/warehousStore';
import { useRoute, useRouter } from "vue-router";
import dayjs from 'dayjs';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
const $router = useRouter();
const $route = useRoute();
const VDB = useVDBStore();
const $q = useQuasar();
const warehousStore = useWarehouse()
warehousStore.setTitle(`Traspaso / Sucursal (${$route.params.rid})`)
warehousStore.setshowReportLocations(false);
warehousStore.setshowReportMinMax(false);
warehousStore.setshowOptions(false);


const types = ref([]);
const providers = ref([]);
const refund = ref(null);

const endFund = ref(false)
const product = ref({
  state: false,
  val: null
})

const existProduct = computed(() => refund.value?.bodie.filter(e => e.id == product.value.val?.id).length > 0)

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  // let sid = VDB.session.store.id
  let rid = $route.params.rid;
  console.log(rid)
  const resp = await refundsApi.getRefund(rid)
  if (resp.error) {
    console.log(resp)
  } else {
    console.log(resp)
    if (resp.origin.store.id == VDB.session.store.id) {
      if (resp.status.id == 1 && resp.createdby.id == VDB.session.credentials.id) {
        console.log(resp);
        $q.loading.hide();
        refund.value = resp
      } else {
        $q.notify({ message: 'Ya no se puede modificar la devolucion', type: 'negative', position: 'top' })
        $router.replace(`/warehouse/refunds`);
      }
    } else {
      $q.notify({ message: 'No puedes Ingresar a este traspaso ', type: 'negative', position: 'top' })
      $router.replace(`/warehouse/refunds`);
    }

  }


}

const agregar = (ops) => {
  let inx = refund.value.bodie.findIndex(e => e.product == ops.code)
  console.log(inx);
  if (inx >= 0) {
    $q.notify({ message: 'El Producto ya esta agregado', type: 'negative', position: 'center' })
  } else {
    product.value.val = ops
    product.value.val.pivot = { "to_delivered": 1 }
    product.value.state = true
    console.log(ops);
  }
}

const reset = () => {
  product.value = {
    val: null,
    state: false
  }
}

const addProduct = async () => {
  $q.loading.show({ message: 'Insertando Producto' })
  let data = {
    _transfer: $route.params.rid,
    _product: product.value.val.id,
    to_delivered: product.value.val.pivot.to_delivered
  };
  const resp = await refundsApi.addProduct(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    console.log(product.value.val)
    refund.value.bodie.push(product.value.val);
    product.value = {
      val: null,
      state: false
    }
    $q.loading.hide()
  }
}

const nextState = async () => {
  $q.loading.show({ message: 'Creando Devolucion' })
  const resp = await refundsApi.endRefund(refund.value)
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.notify({ message: `Se creo la devolucion ${resp.id} Correctamente`, type: 'positive', position: 'center' });
    $router.push(`/warehouse/refunds`);
    genPdf(resp)
  }
  $q.loading.hide();
}

const editProduct = async () => {
  $q.loading.show({ message: 'Editando Producto' })
  let data = {
    _transfer: $route.params.rid,
    _product: product.value.val.id,
    to_delivered: product.value.val.pivot.to_delivered
  };
  const resp = await refundsApi.editProduct(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    let inx = refund.value.bodie.findIndex(e => e.product == product.value.val.product)
    if (inx >= 0) {
      refund.value.bodie[inx].pivot.to_delivered = product.value.val.pivot.to_delivered
      $q.notify({ type: 'positive', position: 'center' })
      product.value = {
        val: null,
        state: false
      }
      $q.loading.hide()
    }

  }
}
const deleteProduct = async () => {
  $q.loading.show({ message: 'Eliminando Producto' })
  let data = {
    _transfer: $route.params.rid,
    _product: product.value.val.id,
    to_delivered: product.value.val.pivot.to_delivered
  };
  const resp = await refundsApi.deleteProduct(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    let inx = refund.value.bodie.findIndex(e => e.product == product.value.val.product)
    if (inx >= 0) {
      refund.value.bodie.splice(inx, 1)
      $q.notify({ type: 'positive', position: 'center' })
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

const genPdf = (refund) => {
  console.log(refund);
  pdfRefund.refund(refund)
}

init()

</script>
