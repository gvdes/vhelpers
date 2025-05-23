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
          <div class="text-bold">{{ refund.reference }}</div>
        </div>
        <div class="col text-center">
          <div class="text-caption">ORIGEN</div>
          <div class="text-bold">{{ refund.storefrom.name }}</div>
        </div>
        <div class="col text-center">
          <div class="text-caption">CREADO</div>
          <div class="text-bold">{{ refund.createdby.complete_name }}</div>
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
        <q-item-section>{{ product.product }}</q-item-section>
        <q-item-section>{{ product.description }}</q-item-section>
        <q-item-section class="text-center">{{ product.to_delivered }}</q-item-section>
        <q-item-section class="text-center">{{ product.to_received }}</q-item-section>
        <q-item-section class="text-center">{{ product.to_delivered - product.to_received }}</q-item-section>

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
          <div class="row items-start justify-between">
            <div class="text-center col text-primary">
              <div>Enviado</div>
              <div class="text-bold">
                {{ product.val.to_delivered }}
              </div>
            </div>

            <div class="text-center col">
              <div>Recibido</div>
              <q-input dense borderless v-model="product.val.to_received" type="number" min="0"
                input-class="text-h6 text-center" ref="iptcounter" />
            </div>

            <div class="text-center col">
              <div>Diferencia</div>
              <div>{{ product.val.to_delivered - product.val.to_received }}</div>
            </div>

            <!-- <div class="text-center col">
                    <div>Piezas</div>
                    <div class="text-bold">{{ wndCounter.item.pivot._supply_by == 3 ?
                      (wndCounter.form.count * wndCounter.form.ipack) : wndCounter.item.pivot._supply_by == 2 ?
                        (wndCounter.form.count * 12) : wndCounter.form.count }}</div>
                  </div> -->
          </div>
        </q-card-section>
        <!-- <q-card-actions align="center" v-if="!existProduct">
          <q-btn flat label="Cancelar" color="negative" @click="reset" />
          <q-btn flat label="Agregar" color="positive" @click="addProduct" />
        </q-card-actions> -->
        <q-card-actions align="center">
          <q-btn flat icon="close" color="red-10" @click="reset" />
          <!-- <q-btn flat label="Eliminar" color="negative" @click="deleteProduct" /> -->
          <q-btn flat label="Editar" color="blue-10" @click="editProduct" />
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

    <!-- <q-footer reveal elevated bordered class="bg-white">
      <q-card class="q-mb-md" flat bordered dense>
        <q-card-section class="row">
          <ProductAutocomplete class="col" :checkState="false" @input="add" @agregar="agregar" />
          <q-btn v-if="refund.bodie.length > 0" color="primary" flat icon="east" @click="endFund = !endFund" round />
        </q-card-section>
      </q-card>
    </q-footer> -->
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
import { useRoute, useRouter } from "vue-router";
import dayjs from 'dayjs';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
const $router = useRouter();
const $route = useRoute();
const VDB = useVDBStore();
const $q = useQuasar();


const types = ref([]);
const providers = ref([]);
const refund = ref(null);
const endFund = ref(false)
const busqueda = ref(null)
const product = ref({
  state: false,
  val: null
})

// const existProduct = computed(() => refund.value?.bodie.filter(e => e.product == product.value.val?.product).length > 0)

const existCount = computed(() => refund.value.bodie.reduce((a, v) => Number(a) + Number(v.to_received), 0))

const filtrados = computed(() => {
  if (busqueda.value) {
    return refund.value.bodie.filter(item => {
      return item.product.toLowerCase().includes(busqueda.value?.toLowerCase());
    })
  } else {
    return refund.value.bodie;
  }
});


const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  let sid = VDB.session.store.id
  let rid = $route.params.rid;
  console.log(rid)
  const resp = await refundsApi.getRefundto(sid, rid)
  if (resp.error) {
    console.log(resp)
  } else {
    if (resp.status.id == 3) {
      console.log(resp);
      $q.loading.hide();
      refund.value = resp
    } else {
      $q.notify({ message: 'Ya no se puede modificar la recepion', type: 'negative', position: 'top' })
      $router.replace(`/refunds`);
    }

  }

}

// const add = (opt) => {
//   console.log(opt)
// }

// const agregar = (ops) => {
//   let inx = refund.value.bodie.findIndex(e => e.product == ops.code)
//   console.log(inx);
//   if (inx >= 0) {
//     $q.notify({ message: 'El Producto ya esta agregado', type: 'negative', position: 'center' })
//   } else {
//     product.value.val = {
//       "product": ops.code,
//       "description": ops.description,
//       "price": ops.cost,
//       "to_delivered": 1
//     };
//     product.value.state = true
//     console.log(ops);
//   }
// }

const reset = () => {
  product.value = {
    val: null,
    state: false
  }
}

// const addProduct = async () => {
//   $q.loading.show({ message: 'Insertando Producto' })
//   product.value.val._refund = $route.params.rid
//   console.log(product.value.val)
//   const resp = await refundsApi.addProduct(product.value.val)
//   if (resp.fail) {
//     console.log(resp)
//   } else {
//     console.log(resp);
//     refund.value.bodie.push(product.value.val);
//     product.value = {
//       val: null,
//       state: false
//     }
//     $q.loading.hide()
//   }
// }

const nextState = async () => {
  $q.loading.show({ message: 'Creando Proceso' })
  const resp = await refundsApi.finallyRefund({ id: $route.params.rid })
  console.log(resp);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.notify({ message: `Se Realizo correctamente el proceso `, type: 'positive', position: 'center' });
    $router.push(`/refunds`);
  }
  $q.loading.hide();
}

const editProduct = async () => {
  $q.loading.show({ message: 'Editando Producto' })
  console.log(product.value.val)
  product.value.val._refund = $route.params.rid
  const resp = await refundsApi.editProductReceipt(product.value.val)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    let inx = refund.value.bodie.findIndex(e => e.product == product.value.val.product)
    if (inx >= 0) {
      refund.value.bodie[inx].to_received = product.value.val.to_received
      $q.notify({ type: 'positive', position: 'center' })
      product.value = {
        val: null,
        state: false
      }
      $q.loading.hide()
    }

  }
}
// const deleteProduct = async () => {
//   $q.loading.show({ message: 'Eliminando Producto' })
//   console.log(product.value.val)
//   product.value.val._refund = $route.params.rid
//   const resp = await refundsApi.deleteProduct(product.value.val)
//   if (resp.fail) {
//     console.log(resp)
//   } else {
//     console.log(resp);
//     let inx = refund.value.bodie.findIndex(e => e.product == product.value.val.product)
//     if (inx >= 0) {
//       refund.value.bodie.splice(inx, 1)
//       $q.notify({ type: 'positive', position: 'center' })
//       product.value = {
//         val: null,
//         state: false
//       }
//       $q.loading.hide()
//     }

//   }
// }

const viewProduct = (val) => {
  product.value.state = true
  product.value.val = val
}

const mosProduct = () => {
  if (busqueda.value != null) {
    let productfind = refund.value.bodie.find(e => e.product.toLowerCase() == busqueda.value.toLowerCase())
    if (productfind) {
      product.value.state = true
      product.value.val = productfind
    } else {
      $q.notify({ message: `No se encuentra el producto ${busqueda.value}`, type: 'negative', position: 'top' })
    }
    busqueda.value = null
  }

}

if (VDB.session.rol == 'aux' || VDB.session.rol == 'gen' || VDB.session.rol == 'aud' || VDB.session.rol == 'root') {
  init()
} else {
  $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
  $router.replace('/');
}




init()
</script>
