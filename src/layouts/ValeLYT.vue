<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">VALES</span></div>
        <q-btn color="primary" icon="add">
          <q-menu>
            <div class="q-pa-md bg-grey-2 text-primary">Buscar Folio</div>
            <q-separator />
            <q-form dense @submit="search" class="q-gutter-md q-pa-md">
              <q-select v-model="cashdesk" :options="cashdesks" label="Serie" autofocus />
              <q-input v-model="folio" type="number" label="Folio" />
              <div class="text-right" v-if="cansearch">
                <q-btn type="submit" color="primary" icon="search" />
              </div>
            </q-form>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="bg-grey-3" padding>

        <div class="row justify-center ">
          <transition name="bounce">
            <q-card v-if="ticket.state" flat bordered :style="`width: ${ismobile ? '100%;' : '70%;'}`">
              <q-card-section>
                <div class="text-bold text-h5">Ticket: {{ ticket.body.ticket.ticket }}</div>
                <div>Nº Cliente: {{ ticket.body.ticket.codcli }} </div>
                <div>Cliente: {{ ticket.body.ticket.cliente }} </div>
                <div>Fecha: {{ ticket.body.ticket.fecha }}</div>
              </q-card-section>
              <q-card-section class="text-center text-bold">
                Selecciona los productos que se creara el vale
              </q-card-section>
              <q-card-section>
                <q-input v-model="filter" type="text" label="Buscar" filled />
              </q-card-section>

              <q-card-section>
                <q-list bordered>
                  <q-item  dense >
                    <q-item-section>ARTICULO</q-item-section>
                    <q-item-section class="text-left" v-if="!ismobile">DESCRIPCION</q-item-section>
                    <q-item-section class="text-right">CANTIDAD</q-item-section>
                    <q-item-section class="text-right" v-if="!ismobile">PRECIO</q-item-section>
                    <q-item-section class="text-right" v-if="!ismobile">TOTAL</q-item-section>
                    <q-item-section> SELECT </q-item-section>
                    <q-item-section > PIEZAS A DEV</q-item-section>
                  
                    <q-separator spaced inset vertical dark />
                  </q-item>
                </q-list>
                <q-separator spaced inset vertical dark />

                <q-list bordered v-for="(product, index) in bascket" :key="index">
                  <q-item  dense tag="label" v-ripple>
                    <q-item-section>{{ product.ARTICULO }}</q-item-section>
                    <q-item-section class="text-left" v-if="!ismobile">{{ product.DESCRIPCION }}</q-item-section>
                    <q-item-section class="text-right">{{ Number(product.CANTIDAD).toFixed(2) }}</q-item-section>
                    <q-item-section class="text-right" v-if="!ismobile">{{ Number(product.PRECIO).toFixed(2) }}</q-item-section>
                    <q-item-section class="text-right" v-if="!ismobile">{{ Number(product.TOTAL).toFixed(2) }}</q-item-section>
                    <q-item-section> <q-checkbox v-model="products" :val="product" /> </q-item-section>
                    <q-item-section > <q-input v-model="product.change" type="number" label="PZ" outlined :error="product.change >  Number(product.CANTIDAD)" error-message="es mayor que la cantidad X(" :disable="!products.some(e => e.ARTICULO === product.ARTICULO)" /></q-item-section>
                  
                    <q-separator spaced inset vertical dark />
                  </q-item>
                </q-list>

              </q-card-section>
              <div>
                <q-card-actions align="between">
                  <q-btn flat icon="cancel"  @click="reset"/>
                  <q-btn flat icon="arrow_forward" :disable="!valid" @click="enval" />
                </q-card-actions>
              </div>
            </q-card>
          </transition>
        </div>

        <q-dialog v-model="impresoras.state" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="print" color="primary" text-color="white" />
              <span class="q-ml-sm">Selecciona Impresora</span>
            </q-card-section>
            <q-card-section>
              <q-select v-model="impresoras.val" :options="impresoras.body" label="Impresora" option-label="name" filled />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="negative" v-close-popup />
              <q-btn flat label="Continuar" color="positive" @click="crear" :disable="!impresoras.val"/>
            </q-card-actions>
          </q-card>
        </q-dialog>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import { useQuasar } from 'quasar';
import { assist } from "src/boot/axios";

import { computed, ref } from 'vue';

const VDB = useVDBStore();
const $q = useQuasar();


const cashdesks = VDB.series;
const cashdesk = ref(null);
const folio = ref("");
const ticket = ref({
  state: false,
  body: null
});


const impresoras = ref({
  state:false,
  val: null,
  body: null
})

const filter = ref('')

const products = ref([])

const cansearch = computed(() => (cashdesk.value && folio.value.length));//para enviar a buscar
const bascket = computed(() => {
  if(filter.value){
    return ticket.value.body.product.filter(e => e.ARTICULO.includes(filter.value)) 
  }else{
    return ticket.value.body.product
  }
})

const ismobile = computed(() => $q.platform.is.mobile);
const valid = computed(() => {
  if(products.value.length > 0){
    return  products.value.every(e => e.change > 0) && products.value.every(e => e.change <= (e.CANTIDAD))
  }else{
    return false
  }
})

const index = async () => {
  let idstore = VDB.session.store.id;
  console.log(idstore)
  try {
    let resp = await assist.get(`/cashier/getPrinters/${idstore}`)
    if (resp.status == 200) {
      impresoras.value.body = resp.data
      console.log("Impresoras listas :)")
    }

  } catch (err) {
    console.log(err);
    $q.notify({
      message: 'No se pudiron obtener las impresoras',
      type: 'negative',
      position: 'center',
      icon: 'error'
    })
  }
}

const search = async () => {
  $q.loading.show({ message: 'Obteniendo Ticket' });
  ticket.value.body = null;
  let impdat = {
    type: 'Modificacion',
    serie: cashdesk.value,
    folio: folio.value,
  }
  let host = VDB.session.store.ip;
  let url = `http://${host}/access/public/modify/newmod`;


  axios.post(url, impdat)
    .then(done => {
      console.log(done)
      ticket.value.state = true
      ticket.value.body = done.data;
      $q.loading.hide()
    })
    .catch(fail => {
      console.log(fail.response.data.message);
      $q.notify({
        html: true,
        message: fail.response.data.message,
        color: "negative",
        position: "center"
      });
    });

}

const enval = () => {
  impresoras.value.state = true
}

const crear = () => {
  $q.loading.show({ message: 'Obteniendo Ticket' });
  products.value.map(e => e._chantot = e.change * e.PRECIO)
  let dat = {
    ticket:ticket.value.body.ticket,
    products:products.value,
    print:impresoras.value.val,
    created: `${VDB.session.name} - ${VDB.session.store.alias}`
  }
  let host = VDB.session.store.ip;
  let url = `http://${host}/access/public/modify/createVal`;
  axios.post(url, dat)
    .then(done => {
      console.log(done)
      if(done.data.mmsg){
        $q.notify({
        message: `devolucion ${done.data.devolucion}`,
        type:'positive',
        position: "center"
      });
      $q.notify({
        message: `vale ${done.data.vale}`,
        type:'positive',
        position: "center"
      });
      }

      cashdesk.value = null;
      folio.value = "";
      ticket.value = {
      state: false,
      body: null
      };
      impresoras.value = {
      state:false,
      val: null,
      body: null
      }
      filter.value = ''
      products.value = []
      $q.loading.hide()
    })
    .catch(fail => {
    console.log(fail);
      $q.notify({
        html: true,
        message: fail,
        color: "negative",
        position: "center"
      });
    });
  console.log(dat)
}

const reset = () => {
  
  cashdesk.value = null;
      folio.value = "";
      ticket.value = {
      state: false,
      body: null
      };
      impresoras.value = {
      state:false,
      val: null,
      body: null
      }
      filter.value = ''
      products.value = []
}

index();
</script>