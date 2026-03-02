<template>
  <q-page padding v-if="refund">
    <q-card class="my-card">
      <q-card-section class="row">
        <div class=" text-center">
          <div class="text-caption">ID</div>
          <div class="text-bold">{{ refund.id }}</div>
        </div>
        <div class="col text-center">
          <div class="text-caption">REFERENCIA</div>
          <div class="text-bold">{{ refund.notes }}</div>
        </div>
        <div class="col text-center">
          <div class="text-caption">ORIGEN</div>
          <div class="text-bold">{{ refund.origin.store.name }}</div>
        </div>
        <div class="col text-center">
          <div class="text-caption">CREADO</div>
          <div class="text-bold">{{ refund.createdby.nick }}</div>
        </div>
        <div class="col text-center">
          <div class="text-caption">FECHA</div>
          <div class="text-bold">{{ dayjs(refund.created_at).format('DD-MM-YYYY HH:mm:ss') }}</div>
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced inset vertical dark />


    <q-list bordered>
      <q-item>
        <q-item-section> Producto </q-item-section>
        <q-item-section> Descripcion </q-item-section>
        <q-item-section class="text-center"> Enviado </q-item-section>
        <q-item-section class="text-center"> Recibido </q-item-section>
        <q-item-section class="text-center"> Diferencia </q-item-section>


      </q-item>
    </q-list>

    <q-list bordered v-for="(product, index) in filtrados" :key="index">

      <q-item clickable v-ripple @click="viewProduct(product)">
        <q-item-section>{{ product.code }}</q-item-section>
        <q-item-section>{{ product.description }}</q-item-section>
        <q-item-section class="text-center">{{ product.pivot.to_delivered }}</q-item-section>
        <q-item-section class="text-center">{{ product.pivot.to_received }}</q-item-section>
        <q-item-section class="text-center">{{ product.pivot.to_received - product.pivot.to_delivered
        }}</q-item-section>
      </q-item>
      <q-separator />
    </q-list>

    <q-dialog v-model="product.state" persistent :position="'bottom'">
      <q-card style="width: 300; max-width: 40vw;">
        <q-card-section>
          <div class="text-center text-h4">{{ product.val.code }}</div>
          <div class="text-center text-h6 text-grey-14">{{ product.val.description }}</div>
        </q-card-section>

        <q-card-section>
          <div class="row items-start justify-between">
            <div class="text-center col text-primary">
              <div>Enviado</div>
              <div class="text-bold">
                <!-- {{ product.val.pivot.to_delivered }} -->
                <q-input dense borderless v-model="product.val.pivot.to_delivered" type="number" min="0"
                  input-class="text-h6 text-center" ref="iptcounter" />
              </div>
            </div>

            <div class="text-center col">
              <div>Recibido</div>
              <q-input dense borderless v-model="product.val.pivot.to_received" type="number" min="0"
                input-class="text-h6 text-center" ref="iptcounter" />
            </div>

            <div class="text-center col">
              <div>Diferencia</div>
              <div>{{ product.val.pivot.to_received - product.val.pivot.to_delivered }}</div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat icon="close" color="red-10" @click="reset" />
          <q-btn flat label="Editar" color="blue-10" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="endFund" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="text text-h6">Estas Seguro de terminar la verificacion no se podra editar</span>
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
          <div class="col">
            <q-form @submit="mosProduct">
              <q-input v-model="busqueda" type="text" label="Buscar Codigo" dense />
            </q-form>
          </div>
          <q-separator spaced inset vertical dark />
          <q-btn color="primary" icon="send" label="Terminar" @click="endFund = !endFund" :disable="existCount == 0" />
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
import { useWarehouse } from 'src/stores/warehousStore';
import cloneDeep from 'lodash/cloneDeep'
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import { useRoute, useRouter } from "vue-router";
import dayjs from 'dayjs';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
const $router = useRouter();
const $route = useRoute();
const VDB = useVDBStore();
const $q = useQuasar();

const originalRefund = ref(null)
const warehousStore = useWarehouse()
warehousStore.setTitle(`Traspaso / Sucursal (${$route.params.rid})`)
warehousStore.setshowReportLocations(false);
warehousStore.setshowReportMinMax(false);
warehousStore.setshowOptions(false);


const types = ref([]);
const providers = ref([]);
const refund = ref(null);
const endFund = ref(false)
const busqueda = ref(null)
const product = ref({
  state: false,
  val: null
})

const existCount = computed(() => refund.value.bodie.reduce((a, v) => Number(a) + Number(v.pivot.to_received), 0))

const filtrados = computed(() => {
  if (busqueda.value) {
    return refund.value.bodie.filter(item => {
      return item.code.toLowerCase().includes(busqueda.value?.toLowerCase());
    })
  } else {
    return refund.value.bodie;
  }
});


const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  let rid = $route.params.rid;
  console.log(rid)
  const resp = await refundsApi.getRefundto(rid)
  if (resp.error) {
    console.log(resp)
  } else {
    if (resp.status.id == 6) {
      console.log(resp);
      $q.loading.hide();
      refund.value = resp
      originalRefund.value = cloneDeep(resp)
    } else {
      $q.notify({ message: 'Ya no se puede modificar la recepion', type: 'negative', position: 'top' })
      $router.replace(`/warehouse/refunds`);
    }
  }
}

const reset = () => {
  product.value = {
    val: null,
    state: false
  }
}

const nextState = async () => {
  $q.loading.show({ message: 'Procesando cambios' })
  const cambios = getChanges()
  const payload = {
    transfer: refund.value,
    cambios
  }
  console.log(payload)
  const resp = await refundsApi.finishUpdate(payload)
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.notify({ message: `Se Realizo correctamente el proceso `, type: 'positive', position: 'center' });
    $router.push(`/warehouse/refunds`);
  }
  $q.loading.hide();
}

const viewProduct = (val) => {
  product.value.state = true
  product.value.val = val
}

const mosProduct = () => {
  if (busqueda.value != null) {
    let productfind = refund.value.bodie.find(e => e.code.toLowerCase() == busqueda.value.toLowerCase())
    if (productfind) {
      product.value.state = true
      product.value.val = productfind
    } else {
      $q.notify({ message: `No se encuentra el producto ${busqueda.value}`, type: 'negative', position: 'top' })
    }
    busqueda.value = null
  }

}
const getChanges = () => {
  const cambios = []

  refund.value.bodie.forEach(product => {
    const original = originalRefund.value.bodie.find(p => p.id === product.id)

    const beforeDelivered = Number(original.pivot.to_delivered)
    const nowDelivered = Number(product.pivot.to_delivered)

    const beforeReceived = Number(original.pivot.to_received)
    const nowReceived = Number(product.pivot.to_received)

    if (beforeDelivered !== nowDelivered || beforeReceived !== nowReceived) {
      cambios.push({
        id: product.id,
        to_delivered: {
          antes: beforeDelivered,
          ahora: nowDelivered,
          diferencia: nowDelivered - beforeDelivered
        },
        to_received: {
          antes: beforeReceived,
          ahora: nowReceived,
          diferencia:  nowReceived - beforeReceived
        }
      })
    }
  })

  return cambios
}
init()
</script>
