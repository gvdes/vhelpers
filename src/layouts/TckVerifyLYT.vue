<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">TICKETS</span></div>
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
        <div v-if="ticket.state">
          <div class="row justify-center">
            <transition name="bounce">
              <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Fecha:</q-item-label>
                        <q-item-label>{{ ticket.head.fecha }}</q-item-label>
                      </q-item-section>
                      <q-separator spaced inset vertical dark />
                      <q-item-section>
                        <q-item-label>Ticket:</q-item-label>
                        <q-item-label>{{ ticket.head.ticket }}</q-item-label>
                      </q-item-section>
                      <q-separator spaced inset vertical dark />
                      <q-item-section>
                        <q-item-label>Cliente:</q-item-label>
                        <q-item-label>{{ ticket.head.cliente }}</q-item-label>
                      </q-item-section>
                      <q-separator spaced inset vertical dark />
                      <q-item-section>
                        <q-item-label>Total:</q-item-label>
                        <q-item-label>{{ ticket.head.total }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </transition>
          </div>
          <q-separator spaced inset vertical dark />

          <div class="row">
            <q-card class="my-card col">
              <q-card-section>
                <div class="text-h6 text-center">Articulos Por Validar</div>
              </q-card-section>
              <q-card-section class="text-center text-h4">
                {{ invalidBascket.length }}
              </q-card-section>
            </q-card>
            <q-separator spaced inset vertical dark />

            <q-card class="my-card col">
              <q-card-section>
                <div class="text-h6 text-center">Articulos Validados</div>
              </q-card-section>
              <q-card-section class="text-center text-h4">
                {{ validBacket.length }}
              </q-card-section>
            </q-card>

            <q-separator spaced inset vertical dark />
            <q-card class="my-card col">
              <q-card-section>
                <div class="text-h6 text-center">Diferencias</div>
              </q-card-section>
              <q-card-section class="text-center text-h4">
                {{ ticket.body.reduce((a, v) => a + Number(v.diferencia), 0) }}
              </q-card-section>
            </q-card>

          </div>

          <q-separator spaced inset vertical dark />

          <div class="row justify-center">
            <q-card class="my-card col" style="width: 700px; max-width: 80vw;">
              <q-card-section>
                <q-table flat title="Productos Sin Revisar" :rows="invalidBascket" :columns="table.columns"
                  :visible-columns="table.visibleColumns" no-data-label="No hay datos :(" :pagination="table.pagination"
                  @row-click="selectProduct">
                  <template v-slot:top>
                    <div class="text-h6"> Productos Sin Revisar</div>
                    <q-space />

                    <q-select v-model="table.visibleColumns" multiple outlined dense options-dense
                      :display-value="$q.lang.table.columns" emit-value map-options :options="table.columns"
                      option-value="name" options-cover style="min-width: 150px" />
                  </template>

                </q-table>
              </q-card-section>
            </q-card>
            <q-separator spaced inset vertical dark />
            <q-card class="my-card col" style="width: 700px; max-width: 80vw;">
              <q-card-section>
                <q-table flat title="Productos Revisados" :rows="validBacket" :columns="table.columns"
                  :visible-columns="table.visibleColumnstwo" no-data-label="No hay datos :("
                  :pagination="table.pagination" @row-click="selectProduct">
                  <template v-slot:top>
                    <div class="text-h6"> Productos Revisados</div>
                    <q-space />

                    <q-select v-model="table.visibleColumnstwo" multiple outlined dense options-dense
                      :display-value="$q.lang.table.columns" emit-value map-options :options="table.columns"
                      option-value="name" options-cover style="min-width: 150px" />
                  </template>

                </q-table>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <q-dialog v-model="validProduct.state" persistent position="bottom">
          <q-card>
            <q-card-section class="bg-grey-3">
              <div class="row justify-between">
                <div class="text-left">
                  <div class="text--3">CCO: {{ validProduct.val.corto }}</div>
                  <!-- <div class="text-h6">{{ wndCounter.item.code }}</div> -->
                </div>
                <div class="text-right">
                  <div class="text-bold">{{ validProduct.val.codigo }}</div>
                  <div class="text--2">{{ validProduct.val.cb }}</div>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>{{ validProduct.val.descripcion }}</q-card-section>
            <q-form @submit.prevent="setDeliveryProduct">
              <q-card-section>
                <div class="row">

                  <div class="text-center col">
                    <div>Cajas</div>
                    <q-input dense borderless v-model="validProduct.val.conteo" type="number" min="0"
                      input-class="text-h6 text-center" ref="iptcounter" />
                  </div>

                  <div class="text-center col">
                    <div>PXC</div>
                    <q-input dense borderless v-model="validProduct.val.pxc" type="number" min="0"
                      input-class="text-h6 text-center" ref="iptcounter" />
                  </div>
                  <div class="text-center col">
                    <div>Conteo</div>
                    <div class="text-h6">{{ validProduct.val.conteo * validProduct.val.pxc }}</div>
                  </div>
                </div>
              </q-card-section>
              <q-btn color="green-5" type="submit" square icon="done_all" no-caps class="q-mt-md q-py-md full-width" />
            </q-form>
          </q-card>
        </q-dialog>

        <q-dialog v-model="validTerm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="mood" color="positive" text-color="white" />
              <span class="q-ml-sm">Productos validados correctamente</span>
            </q-card-section>

            <q-card-section class="row">
              <q-card-actions class="col" >
              <q-btn flat icon="print" color="primary" @click="impresoras.state = !impresoras.state" />
            </q-card-actions>
            <q-card-actions  >
              <q-btn flat label="TERMINAR"  color="positive" @click="terminarConteo" />
            </q-card-actions>
            </q-card-section>
          </q-card>
        </q-dialog>


        <q-dialog v-model="InvalidTerm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="sentiment_dissatisfied" color="negative" text-color="white" />
              <span class="q-ml-sm">Hay productos Con diferencia</span>
            </q-card-section>
            <q-card-section>
              <div v-for="(product, index) in btnTerm">
                {{ product.codigo }}
              </div>
            </q-card-section>
            <q-card-section class="row">
              <q-card-actions class="col" >
              <q-btn flat icon="print" color="primary" @click="impresoras.state = !impresoras.state" />
            </q-card-actions>
            <q-card-actions  >
              <q-btn flat label="Regresar"  color="negative" @click="returnModels" />
            </q-card-actions>
            </q-card-section>

          </q-card>
        </q-dialog>

        <q-dialog v-model="impresoras.state">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6 text-center">Impresora</div>
            </q-card-section>
            <q-card-section>
              <q-form @submit="terminar" class="q-gutter-md">
                <q-select dense option-label="name" v-model="impresoras.val" :options="impresoras.body"
                  label="Impresora" filled autofocus style="width: 200px" />
                <div>
                  <q-btn label="Enviar" type="submit" color="primary" style="width: 200px" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog v-model="premature.state" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="warning" text-color="black" />
              <span class="q-ml-sm">Hay Productos que no estan validados</span>
            </q-card-section>
            <q-card-section>
              <div class="text-bold">
                Productos No Validados
              </div>
              <div v-for="(product,index) in  (invalidBascket)" :key="index">
                {{ product.codigo }}
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-bold">
                Productos Con Diferencia
              </div>
              <div v-for="(product,index) in  (btnTerm)" :key="index">
                {{ product.codigo }}
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-bold">
                Productos Validados
              </div>
              <div v-for="(product,index) in  (validBacket)" :key="index">
                {{ product.codigo }}
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat color="primary" icon="print" @click="impresoras.state = !impresoras.state" />
              <q-btn flat label="Continuar" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>



      </q-page>
      <q-footer reveal elevated bordered v-if="ticket.state" class="row" >
          <q-select  class="col" v-model="filter" :options="opts" filled option-label="codigo" use-input fill-input hide-selected input-class="text-white"
            input-debounce="0" @filter="filterFn" @input-value="setModel" dense @update:model-value="updateProduct">
            <template v-slot:before>
              <q-icon name="fas fa-barcode" color="white" />
            </template>
          </q-select>
          <q-btn  v-if="validBacket.length > 0" color="white" text-color="primary" size="sm" label="Terminar" @click="revisarTerm" />
      </q-footer>
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
import ProductsAutocomplete from 'src/components/ProductsAutocomplete.vue';

const VDB = useVDBStore();
const $q = useQuasar();

const cashdesks = VDB.series;// SERIES DE LAS CAJAS
const cashdesk = ref(null);
const filter = ref(null)
const folio = ref("");
const impresoras = ref({
  state:false,
  val: null,
  body: null
})
const premature = ref({
  state:false
})
const ticket = ref({
  state: false,
  body: [],
  head: null
});
const validProduct = ref({
  state: false,
  val: null
})
const opts = ref([]);

const table = ref({
  pagination: { rowsPerPage: 10 },
  visibleColumns: ['code', 'description'],
  visibleColumnstwo: ['code', 'description', 'checkout', 'diferencia'],
  columns: [
    { name: 'code', label: 'Codigo', field: row => row.codigo, required: true, align: 'left', sortable: true },
    { name: 'barcode', label: 'CB', field: row => row.cb, align: 'left', sortable: true },
    { name: 'shortcode', label: 'Corto', field: row => row.corto, align: 'center', sortable: true },
    { name: 'description', label: 'Descripcion', field: row => row.descripcion, align: 'left', sortable: true },
    // { name: 'amount', label: 'Cantidad', field: row => Number(row.cantidad), align: 'center',sortable: true  },
    // { name: 'price', label: 'Precio  ', field: row => Number(row.precio), align: 'center',sortable: true  },
    // { name: 'total', label: 'Total', field: row => Number(row.total), align: 'center',sortable: true  },
    // { name: 'validate', label: 'Validate', field: row => row.validate, align:'center' },
    { name: 'checkout', label: 'Validado', field: row => row.checkout, align: 'center', sortable: true },
    { name: 'diferencia', label: 'Diferencia', field: row => row.diferencia, align: 'center', sortable: true },

  ]
})


const cansearch = computed(() => (cashdesk.value && folio.value.length));//para enviar a buscar
const invalidBascket = computed(() => ticket.value.body.filter(e => e.validate == 0));
const validBacket = computed(() => ticket.value.body.filter(e => e.validate == 1));
const btnTerm = computed(() => ticket.value.body?.filter(a => a.diferencia != 0))
const validTerm = computed(() => validBacket.value.length > 0 && btnTerm.value.length == 0 && invalidBascket.value.length == 0);
const InvalidTerm = computed(() => validBacket.value.length > 0 && btnTerm.value.length > 0 && invalidBascket.value.length == 0);


const search = async () => {
  $q.loading.show({ message: 'Se esta obteniendo el ticket' })
  let impdat = {
    serie: cashdesk.value,
    folio: folio.value,
  }
  let host = VDB.session.store.ip_address;
  // let host = '192.168.10.160:1619';
  let url = `http://${host}/access/public/modify/getTck`;
  axios.post(url, impdat)
    .then(r => {
      console.log(r.data)
      ticket.value.head = r.data.ticket
      ticket.value.body = r.data.product
      ticket.value.state = true
      $q.loading.hide()
    })
    .catch(r => {
      console.log(r.response.data);
      // datenv.value = false
      $q.notify({
        html: true,
        message: r.response.data,
        color: "negative",
        position: "center"
      });
      $q.loading.hide()
    });
}

const onSubmit = () => {
  let target = filter.value.toUpperCase().trim();
  console.log(target);
  let products = ticket.value.body.filter(product => {
    let variantsMatch = product.variants.some(variant =>
      variant.cb.toUpperCase() === target
    );
    let productMatch =
      product.codigo.toUpperCase() === target ||
      product.cb.toUpperCase() === target ||
      product.corto.toUpperCase() === target;
    return variantsMatch || productMatch;
  });
  if (products.length > 0) {
    validProduct.value.state = true;
    validProduct.value.val = products[0]
    filter.value = "";
  } else {
    filter.value = "";
    $q.notify({ message: 'No se encuentran considencias', type: 'negative', position: 'center' })
  }
}

const setDeliveryProduct = () => {
  let product = validProduct.value.val;
  let inx = ticket.value.body.findIndex(e => e.codigo == product.codigo);
  if (inx >= 0) {
    ticket.value.body[inx].checkout = product.conteo * product.pxc
    ticket.value.body[inx].validate = 1
    ticket.value.body[inx].diferencia = product.checkout - product.cantidad
    if (ticket.value.body[inx].diferencia != 0) {
      console.log('Hay diferencia se bloquea productos sin revisar para que se analice el producto revisado ?')
      $q.notify({ message: 'El producto esta mal contado', type: 'negative', icon: 'sentiment_dissatisfied', position: 'top' })
    } else {
      $q.notify({ message: 'El producto esta bien contado', type: 'positive', icon: 'mood', position: 'top' })
    }
    validProduct.value.val = null
    validProduct.value.state = false
  } else {
    $q.notify({ message: 'No se encuentra el articulo', })
  }
}

const selectProduct = (a, b) => {
  console.log(b);
  validProduct.value.state = true;
  validProduct.value.val = b
}

const terminarConteo = () => {
  console.log('conteo terminado')
  cashdesk.value = null;
  filter.value = ""
  folio.value = "";
  ticket.value = {
    state: false,
    body: [],
    head: null
  };
  validProduct.value = {
    state: false,
    val: null
  }
}

const revisarTerm  = () => {
  console.log('Terminado Incompleto')
  premature.value.state = true;

}


const returnModels = () => {
  btnTerm.value.forEach(e => {
    let inx = ticket.value.body.findIndex(i => i.codigo == e.codigo);
    if (inx >= 0) {
      ticket.value.body[inx].checkout = 0;
      ticket.value.body[inx].diferencia = 0;
      ticket.value.body[inx].conteo = 0;
      ticket.value.body[inx].validate = 0;
    }

  })
}

const filterFn = (val, update, abort) => {
  update(() => {

    const needle = val.toUpperCase()
    // opts.value = ticket.value.body.filter(v => v.codigo.indexOf(needle) > -1)


    opts.value = ticket.value.body.filter(product => {
      // Busca coincidencias en variantes.
      const variantsMatch = product.variants.some(variant =>
        variant.cb.toUpperCase().indexOf(needle) > -1
      );

      // Busca coincidencias en el producto (código, cb, corto).
      const productMatch =
        product.codigo.toUpperCase().indexOf(needle) > -1 ||
        product.cb.toUpperCase().indexOf(needle) > -1 ||
        product.corto.toUpperCase().indexOf(needle) > -1;

      // Retorna productos que coincidan.
      return variantsMatch || productMatch;
    });
    console.log(opts.value)
  });
}

const updateProduct = () => {
  let products = ticket.value.body.filter(product => product == filter.value)
  validProduct.value.state = true;
  validProduct.value.val = products[0]
  filter.value = "";
}

const setModel = (val) => {
  filter.value = val
  console.log(filter.value)
}

const index = async () => {
  let idstore = VDB.session.store.id;
  // console.log(idstore)
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

const terminar = async () => {
  $q.loading.show({ message: 'Imprimiendo Diferencias' })
  let dat = {
    printer: impresoras.value.val.ip_address,
    data:ticket.value,
    invalid:invalidBascket.value,
    valid:validBacket.value,
    diff:btnTerm.value
  }
  let host = VDB.session.store.ip_address;
  // let host = '192.168.10.160:1619';
  let url = `http://${host}/access/public/modify/PrintDiff`;
  axios.post(url, dat)
  .then(r => {
      console.log(r.data)
      if(r.data == 1 ){
        $q.notify({message:'Impresion Correcta',type:'positive',position:'center'})
        impresoras.value.state = false,
        impresoras.value.val = null
      }

      $q.loading.hide()
    })
    .catch(r => {
      console.log(r.response.data);

      $q.notify({
        html: true,
        message: r.response.data,
        color: "negative",
        position: "center"
      });
      $q.loading.hide()
    });

}

if (VDB.session.rol == 'aux' || VDB.session.rol == 'gen' || VDB.session.rol == 'aud' || VDB.session.rol == 'root') {
  console.log('Acceso Validado')
  index()
} else {
  $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
  $router.replace('/');

}

index()

</script>
