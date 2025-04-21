<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Cobro Ofertas</span></div>
        <div>Total $<span class="text-bold">{{products.reduce((a, e) => a + e.amount * e.price?.pivot.price, 0)
            }}</span> </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="bg-grey-3" padding>

        <q-card class="my-card">
          <q-card-section v-if="products.length > 0">
            <q-table hide-bottom="" :rows="products" row-key="id" :columns="table.columns"
              :pagination="table.pagination" @row-click="rowClick" />
          </q-card-section>
        </q-card>

      </q-page>
    </q-page-container>

    <q-dialog v-model="editProduct.state" persistent position="bottom">
      <q-card>

        <q-card-section class="bg-grey-4">
          <div class="row text-h6">
            <div class="col">Codigo: <span class="text-bold">{{ editProduct.val.code }}</span></div>
            <div class="col">Cco: <span class="text-bold ">{{ editProduct.val.name }}</span></div>
            <div> <q-btn color="negative" icon="delete" @click="deleteProduct" flat size="sm"
                v-if="editProduct.val.edit == true" v-close-popup /></div>
          </div>
          <q-input v-model="editProduct.val.description" type="text" label="description" />
          <!-- {{ editProduct.val.description }} -->
        </q-card-section>

        <q-card-section>
          <div class="row items-end">
            <div class="text-center">
              <div class="col q-pa-xs">
                <div class="text-bold text-h6">Cantidad:</div>
                <q-btn flat color="positive" icon="add" class="text-h5" @click="editProduct.val.amount++" />
                <q-separator spaced inset vertical dark />
                <div class="col column q-py-md">
                  <input type="number" min="1" v-model="editProduct.val.amount" class="text-center exo"
                    style=" width: 100px; font-size: 3em; margin: auto auto; border: none;" />
                </div>
                <q-separator spaced inset vertical dark />
                <q-btn flat color="negative" icon="remove" class="text-h5"
                  @click="editProduct.val.amount > 1 ? editProduct.val.amount-- : ''"
                  :disable="editProduct.val.amount <= 1" />
              </div>
            </div>
            <q-separator spaced inset vertical dark />

            <div class="col q-pa-xs">
              <div class="row">
                <div class="col"><q-select v-model="editProduct.val.price" :options="editProduct.val.prices"
                    label="Precios" filled option-label="name" dense /></div>
                <q-separator spaced inset vertical dark v-if="editProduct.val.price" />
                <div class="col" v-if="editProduct.val.price"><q-input v-model="editProduct.val.price.pivot.price"
                    type="number" label="Precio" filled dense :error="editProduct.val.price.pivot.price <= 0"
                    error-message="El importe tiene que ser mayor que  0" /></div>
                <!-- en caso de que sea menor que el costo se puede poner que sea mayor que 0 solo quitas el de cost y se pone en 0 para que no aparezca el mensaje -->
              </div>
              <q-separator spaced inset vertical dark />
              <q-input dense filled v-model="editProduct.val.notes" type="text" label="Notas"
                :error="editProduct.val.notes.length <= 0" error-message="Campo Obligatorio" />
              <q-separator spaced inset vertical dark />
              <q-list>
                <q-item class="bg-grey-11">
                  <q-item-section class="text-left text-caption">P x C</q-item-section>
                  <q-item-section class="text-bold text-center">{{ editProduct.pieces }} pzs</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section class="text-left text-caption">Unidades</q-item-section>
                  <q-item-section class="text-bold text-center">{{ editProduct.val.amount }} pzs</q-item-section>
                </q-item>
                <q-item class="bg-grey-11">
                  <q-item-section class="text-left text-caption text-bold">Total</q-item-section>
                  <q-item-section class="text-bold text-center">$ {{ editProduct.val.price ? editProduct.val.amount
                    * editProduct.val.price?.pivot.price : 0 }} </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat icon="close" color="negative" v-close-popup />
          <q-btn flat icon="edit" color="warning" v-close-popup @click="edtProduct"
            v-if="editProduct.val.edit == true" />
          <q-btn flat icon="check" color="positive" v-close-popup @click="insertProduct"
            v-if="editProduct.val.edit == false"
            :disable="editProduct.val.price?.pivot.price <=  0 || editProduct.val.notes.length <= 0" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- AGREGAR PRODUCTOS -->

    <q-dialog v-model="pagos.state">
      <q-card class="my-card" style="width: 700px; max-width: 80vw;">
        <div class="bg-primary   q-pa-md text-white text-center">
          <div class="fw-bold text-h6">Cobro del documento</div>
        </div>
        <q-card-section>
          <div class="row text-center items-center">
            <div class="col"> Forma de pago: </div>
            <div class="col">
              <q-select class="col-3" v-model="modes.EFE.id" :options="paymeths" option-value="id" option-label="desc"
                dense filled label="Forma de pago" :option-disable="(val) => optionDisabled(val)">
              </q-select>
            </div>
          </div>
          <q-separator spaced inset vertical dark />

          <div class="row text-center items-center">
            <div class="col "> Total a pagar: </div>
            <div class="col  text-h5 text-bold bg-grey-3"> {{products.reduce((a, e) => a + e.amount *
              e.price?.pivot.price, 0)}} </div>
          </div>


          <q-separator spaced inset vertical dark />
          <div class="row text-center items-center ">
            <div class="col"> {{ modes.EFE.id?.id == 'EFE' ? 'Efectivo' : 'Importe Cobrado' }}</div>
            <div class="col"> <q-input class="col" v-model="modes.EFE.val" type="number" autofocus :min="0.00"
                step="any" dense input-class="q-pl-md fw-sbold fs-inc4 text-center" filled>
                <template v-slot:after>
                  <q-btn color="primary" icon="backspace" flat dense round v-if="parseFloat(modes.EFE.val)"
                    @click="modes.EFE.val = 0" />
                </template>
              </q-input>

            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row flex justify-center ">
            <div class="col flex justify-center">
              <q-btn color="primary" label="2ª Forma de pago"
                @click="() => { pagos.dafpa = !pagos.dafpa; modes.DIG.val = 0; modes.DIG.id = null; }" outline rounded
                dense size="md" style="width: 70%;" />
            </div>
            <div class="col" v-if="pagos.dafpa">
              <q-select class="col-3" v-model="modes.DIG.id" :options="paymeths" label="Forma Pago" option-value="id"
                option-label="desc" dense filled :option-disable="(val) => optionDisable(val)">
              </q-select>
            </div>
          </div>
          <q-separator spaced inset vertical dark />
          <div class="row flex justify-center text-center" v-if="pagos.dafpa">
            <div class="col"> {{ modes.DIG.id?.id == 'EFE' ? 'Efectivo' : 'Importe Cobrado' }}</div>
            <div class="col"> <q-input class="col" v-model="modes.DIG.val" type="number" autofocus :min="0.00"
                step="any" dense input-class="q-pl-md fw-sbold fs-inc4 text-center" filled>
                <template v-slot:after>
                  <q-btn color="primary" icon="backspace" flat dense round v-if="parseFloat(modes.DIG.val)"
                    @click="modes.DIG.val = 0" />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="bg-deep-purple-3 row items-center justify-between q-pa-md text-black">
          <div>
            <div class="fs-dec3">Cambio</div>
            <div class="text-h5"> $ {{ cambio }}</div>
          </div>
          <div class="text-center" v-if="valpag">
            <q-btn color="primary" icon="payment" label="Pagar" @click="impresoras.state = !impresoras.state" />
          </div>

        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- AGREGAR PAGOS -->


    <q-dialog v-model="impresoras.state">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">Selecciona Caja e Impresora</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="terminar" class="q-gutter-md">
            <q-select dense v-model="terminales.val" :options="terminales.opts" label="Caja" filled
              option-label="DESTER" />

            <q-separator spaced inset vertical dark />
            <q-select dense option-label="name" v-model="impresoras.val" :options="impresoras.body" label="Impresora"
              filled />
            <div>
              <q-btn label="Enviar" type="submit" color="primary" class="full-width"
                :disable="impresoras.val == null || terminales.val == null" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>


    <q-footer reveal elevated bordered class="bg-white">
      <div class="row">
        <ProductAutocomplete :checkState="false" @input="add" with_prices @agregar="agregar" class="col" />
        <q-separator spaced inset vertical dark v-if="products.length > 0" />
        <q-btn color="primary" icon="send" @click="nextStep" flat v-if="products.length > 0" />
      </div>

    </q-footer>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import dbproduct from 'src/API/Product'
import { useQuasar } from 'quasar';
import { assist } from "src/boot/axios";

import { computed, ref } from 'vue';

const VDB = useVDBStore();
const $q = useQuasar();


const impresoras = ref({
  state: false,
  val: null,
  body: null
})
const terminales = ref({
  val: null,
  opts: []
})
const colab = ref({
  val: null,
  opts: []
});
const editProduct = ref({
  val: null,
  state: false
})
const pagos = ref({
  state: false,
  dafpa: false,
})

const modes = ref({ "EFE": { id: null, val: 0 }, "DIG": { id: null, val: 0 } });
const paymeths = [
  { id: "EFE", desc: "CONTADO EFECTIVO" },
  { id: "TBA", desc: "TARJETA C/D BANCOMER" },
  { id: "TSA", desc: "TARJETA C/D SANTANDER" },
  { id: "TDB", desc: "TRA/DEP BANCOMER" },
  { id: "TDA", desc: "TRA/DEP Santander" },
  { id: "TDS", desc: "TRA/DEP Scotiabank" },
  { id: "C30", desc: "CREDITO" },
]

const products = ref([]);

const table = ref({
  columns: [
    { name: 'code', label: 'ARICULO', field: r => r.code, align: 'left' },
    { name: 'description', label: 'DESCRIPCION', field: r => r.description, align: 'left' },
    { name: 'amount', label: 'CANTIDAD', field: r => r.amount, align: 'center' },
    { name: 'price', label: 'PRECIO', field: r => r.price?.pivot.price, align: 'center' },
    { name: 'total', label: 'TOTAL', field: r => r.amount * r.price?.pivot.price, align: 'center' },
  ],
  pagination: { rowsPerPage: 0 },
  filter: "",
})

const valpag = computed(() => cambio.value >= 0 && ((modes.value.EFE.id?.id && modes.value.EFE.val > 0) || (modes.value.DIG.id?.id && modes.value.DIG.val > 0)))
const cambio = computed(() => (Number.parseFloat(modes.value.DIG.val) + Number.parseFloat(modes.value.EFE.val)) - products.value.reduce((a, e) => a + e.amount * e.price?.pivot.price, 0))


const init = async () => {
  $q.loading.show({ message: 'Obteniendo Cajas' });
  let host = VDB.session.store.ip;
  // let host = '192.168.10.160:1619'
  console.log(VDB.session)
  let url = `http://${host}/access/public/reports/getTerminal`;
  const resp = await axios.get(url);
  if (resp.status != 200) {
    console.log(resp)
  } else {
    console.log(resp);
    terminales.value.opts = resp.data;
    $q.loading.hide();

  }
}

const add = (opt) => {
  console.log(opt)
}

const agregar = (ops) => {
  console.log(ops)
  let inx = products.value.findIndex(e => e.id == ops.id)
  console.log(inx);
  // if (inx >= 0) {
  //   $q.notify({ message: 'El Producto ya esta agregado', type: 'negative', position: 'center' })
  //   editProduct.value.state = true
  //   editProduct.value.val = products.value[inx]
  //   editProduct.value.val.edit = true
  // } else {
  editProduct.value.state = true
  ops.amount = 1
  ops.notes = '';
  ops.edit = false
  editProduct.value.val = ops
  // }
}

const rowClick = (a, b, c) => {
  console.log(b)
  console.log(c)
  let inx = c
  console.log(inx);
  if (inx >= 0) {
    editProduct.value.state = true
    editProduct.value.val = products.value[inx]
    editProduct.value.val.edit = true
    editProduct.value.index = inx
  }
}

const insertProduct = () => {
  console.log(editProduct.value.val);
  products.value.push(editProduct.value.val)

}

const edtProduct = () => {
  let inx = editProduct.value.index
  products.value.splice(inx, 1, editProduct.value.val)
}

const deleteProduct = () => {
  let inx = products.value.findIndex(e => e.id == editProduct.value.val.id)
  if (inx >= 0) {
    products.value.splice(inx, 1)
  }
}


const nextStep = async () => {
  let idstore = VDB.session.store.id;
  console.log(idstore)
  try {
    let resp = await assist.get(`/cashier/getPrinters/${idstore}`)
    if (resp.status == 200) {
      impresoras.value.body = resp.data
      console.log("Impresoras listas :)")
      pagos.value.state = true
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
const optionDisabled = (val) => {
  if (val.id == modes.value.DIG.id?.id) {
    return true
  }
  return false
}
const optionDisable = (val) => {
  if (val.id == modes.value.EFE.id?.id) {
    return true
  }
  return false
}


const terminar = async () => {
  // let host = '192.168.10.160:1619'
  $q.loading.show({message:"Realizando Ticket"});
  let host = VDB.session.store.ip;
  let url = `http://${host}/access/public/modify/createTicket`;
  let by = `${VDB.session.name} - ${VDB.session.store.alias}`;
  let data = {
    by,
    modes: modes.value,
    colab: colab.value.val,
    terminal: terminales.value.val,
    impresoras: impresoras.value.val,
    productos: products.value,
    cambio: cambio.value
  }
  const resp = await axios.post(url, data)
  if (resp.status != 200) {
    console.log(resp);
  } else {
    console.log(resp.data);
    impresoras.value = {
      state: false,
      val: null,
      body: null
    }
    terminales.value = {
      val: null,
      opts: []
    }
    colab.value = {
      val: null,
      opts: []
    };
    editProduct.value = {
      val: null,
      state: false
    }
    pagos.value = {
      state: false,
      dafpa: false,
    }
    modes.value = { "EFE": { id: null, val: 0 }, "DIG": { id: null, val: 0 } };
    products.value = [];
    $q.notify({ message: resp.data.mssg, type: 'positive', position: 'center' })
    $q.loading.hide()
  }

}


init()

</script>
