<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Resurtido</span>
        </div>
        <!-- <q-btn color="primary" icon="add" @click="newRequistion.status = !newRequistion.status" /> -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <div class="row">
          <q-select class="col" v-model="families.val" :options="families.opts" label="Familia" option-label="name" filled multiple
          use-chips @blur="report" />
          <q-separator spaced inset vertical dark />
          <q-select class="col" v-model="categories.val" :options="categories.opts" label="Categoria" filled :disable="!families.val" multiple use-chips />
        </div>

        <q-separator spaced inset vertical dark />

        <q-table :rows="bascket" :columns="table.columns" separator="cell" :filter="table.filter">
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn color="primary" icon-right="send" flat @click="newNotes.state = !newNotes.state" :disable="suggested.length == 0" />
          </template>

        </q-table>

        <q-dialog v-model="newNotes.state" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Agrega una nota</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input dense v-model="notes" autofocus @keyup.enter="prompt = false" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancelar" v-close-popup @click="notes = null" />
              <q-btn flat label="Enviar Pedido" v-close-popup @click="newRequsition" />
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
import dbCompare from 'src/API/resoursesApi'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';

const VDB = useVDBStore();
const $q = useQuasar();

const newNotes = ref({
  status: false
})

const families = ref({
  val: null,
  opts: []
})
const categories = ref({
  val:[],
  opts:[]
})
const products = ref([]);
const notes = ref(null);

const table = ref({
  columns: [
    { name: 'short_code', label: 'Codigo Corto', align: 'left', sortable: true, field: row => row.name },
    { name: 'codigo', label: 'Codigo', align: 'left', sortable: true, field: row => row.code },
    { name: 'description', label: 'Descripcion', align: 'left', sortable: true, field: row => row.description },
    { name: 'Seccion', label: 'Seccion', align: 'left', sortable: true, field: row => row.categories.familia.seccion.name },
    { name: 'Familia', label: 'Familia', align: 'left', sortable: true, field: row => row.categories.familia.name },
    { name: 'Categoria', label: 'Categoria', align: 'left', sortable: true, field: row => row.categories.name },
    { name: 'pieces', label: 'PXC', align: 'center', sortable: true, field: row => row.pieces },
    { name: 'cedis', label: 'Cedis', align: 'center', sortable: true, field: row => row.cedis },
    { name: 'texcoco', label: 'Texcoco', align: 'center', sortable: true, field: row => row.texcoco },
    { name: 'Sucursal', label: `${VDB.session.store.name}`, align: 'center', sortable: true, field: row => row.sucursal },
    { name: 'Percentge', label: `${VDB.session.store.name} % `, align: 'center', sortable: true, field: row => row.percentage, format: (val, row) => `${val}%`, }
  ],
  filter: ''
}

)


const suggested = computed(() => {
  return products.value.map((product) => {
    let CajasCedis = Math.round(Number(product.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)) / Number(product.pieces));
    let CajasTexcoco = Math.round(Number(product.stocks.filter(e => e.id == 2).map(e => e.pivot.stock)) / Number(product.pieces));
    let Sucursal = Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock));
    let Porcentaje = Math.round(Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock)) * 100 / Number(product.pieces))
    return {
      id: product.id,
      name: product.name,
      code: product.code,
      cost: product.cost,
      description: product.description,
      categories: product.categories,
      pieces: product.pieces,
      cedis: CajasCedis,
      texcoco: CajasTexcoco,
      sucursal: Sucursal,
      percentage: Porcentaje
    }

  }).filter(e => (e.cedis + e.texcoco) > 0 && e.percentage <= 20)
})

const bascket = computed(() => {
  if(categories.value.val.length > 0){
    return suggested.value.filter(e => categories.value.val.includes(e.categories.name))
  }else{
    return suggested.value
  }
})

const init = async () => {
  $q.loading.show({ message: 'Obteniendo secciones' })
  const resp = await dbCompare.getSeccion()
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    families.value.opts = resp
    $q.loading.hide();
  }
  console.log(resp)
}

const report = async () => {

  if (families.value.val) {
    $q.loading.show({ message: 'Obteniendo Reporte' })
    console.log(families.value.val.map(e => e.id))
    let sid = VDB.session.store.id_viz
    let data = families.value.val.map(e => e.id)
    const resp = await dbCompare.getProductsCompare(sid, { data })
    if (resp.fail) {
      console.log(resp);
    } else {
      $q.loading.hide()
      console.log(resp);
      products.value = resp
      products.value.forEach(e => {
      const categorias = e.categories.name
      if (categorias && !categories.value.opts.includes(categorias)) {
        categories.value.opts.push(categorias)
      }
    })
    }
  }
}

const newRequsition = async () => {
  $q.loading.show({message:'Creando Pedido'})
  let dat = {
    workpoint_from: VDB.session.store.id_viz,
    workpoint_to: 1,
    products: bascket.value,
    notes: notes.value,
    id_userviz: VDB.session.id,
    type: 2
  }
  console.log(dat)
  const resp = await dbCompare.create(dat);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    $q.notify({ message: `Se creo el pedido ${resp.order.id}`, type: 'positive', position: 'center' })
    products.value = []
    notes.value = []
    families.value.val = null
    categories.value.val = []
    $q.loading.hide()
  }
}
init()

</script>
