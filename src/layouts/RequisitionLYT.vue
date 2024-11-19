<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Resurtido</span>
        </div>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="printers.state">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">Impresora</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="print" class="q-gutter-md">
            <q-select dense option-label="name" v-model="printers.val" :options="printers.body" label="Impresora" filled
              autofocus style="width: 200px" />
            <div>
              <q-btn label="Enviar" type="submit" color="primary" style="width: 200px"
                :disable="printers.val === null" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>


    <q-page-container>
      <q-page padding>
        <div class="row">
          <q-separator spaced inset vertical dark />
          <q-select class="col" v-model="cedis.val" :options="cedis.opts" label="Pedido Para" option-label="name" filled
            :disable="cedis.val != null" :option-disable="val => val.id == VDB.session.store.id_viz" />
          <q-separator spaced inset vertical dark />
          <q-select class="col" v-model="types.val" :options="types.opts" label="Tipo" filled :disable="!cedis.val"
            @update:model-value="typeChange" />
        </div>

        <q-separator spaced inset vertical dark />
        <div class="row" v-if="categories.state">
          <q-separator spaced inset vertical dark />
          <q-select dense class="col" v-model="categories.seccion.val" :options="sections" label="Seccion"
            option-label="name" filled multiple use-chips />
          <q-separator spaced inset vertical dark />
          <q-select dense class="col" v-model="categories.familias.val" :options="families" label="Familia"
            option-label="name" filled multiple use-chips :disable="categories.seccion.val.length == 0">
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.name }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.familia.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-separator spaced inset vertical dark />
          <q-select dense class="col" v-model="categories.categories.val" :options="caty" label="Categorias"
            option-label="name" filled multiple use-chips :disable="categories.familias.val.length == 0">
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.name }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.familia.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template></q-select>
          <q-separator spaced inset vertical dark />
          <q-btn color="primary" icon="send" @click="report" :disable="!categoriesfinish" flat dense rounded />

        </div>

        <div class="row" v-if="locations.state">
          <q-separator spaced inset vertical dark />
          <q-select dense class="col" v-model="categories.seccion.val" :options="categories.all" label="Seccion"
            option-label="name" filled multiple use-chips />
          <q-separator spaced inset vertical dark />
          <q-select dense class="col" v-model="locations.val" :options="locations.opts" label="Ubicacion"
            option-label="name" filled multiple use-chips />
          <q-separator spaced inset vertical dark />
          <q-select dense class="col" v-model="locations.locaciones.val" :options="locaciones" label="Locaciones"
            option-label="name" filled multiple use-chips :disable="locations.val.length == 0" />
          <q-separator spaced inset vertical dark />
          <q-btn color="primary" icon="send" @click="reportLocations" flat dense rounded
            :disable="locations.val.length == 0 || locations.locaciones.val.length == 0" />
        </div>

        <q-separator spaced inset vertical dark />

        <div class="row" v-if="categoriesLocations.state">
          <q-separator spaced inset vertical dark />
          <q-select dense class="col" v-model="categoriesLocations.seccion.val"
            :options="categoriesLocations.seccion.opts" label="Seccion" option-label="name" filled multiple use-chips />
          <q-separator spaced inset vertical dark />
          <q-select dense class="col" v-model="categoriesLocations.familias.val" :options="familiesLocations"
            label="Familia" option-label="name" filled multiple use-chips
            :disable="categoriesLocations.seccion.val.length == 0" />

          <q-separator spaced inset vertical dark />
          <q-select dense class="col" v-model="categoriesLocations.categorias.val" :options="catyLocations"
            label="Categorias" option-label="name" filled multiple use-chips
            :disable="categoriesLocations.familias.val.length == 0" />
          <q-separator spaced inset vertical dark />
        </div>

        <q-separator spaced inset vertical dark />
        <q-card class="my-card">
          <q-card-section>
            <div class="row">
              <q-item class="col">
                <q-item-section><q-radio dense v-model="condition.state" val="percentage"
                    label="Porcentaje" /></q-item-section>
                <!-- <q-item-label><q-radio v-model="condition.state" val="percentage" label="Porcentaje" /></q-item-label> -->
                <q-item-section caption v-if="condition.state == 'percentage'"> <q-input dense v-model="percentage.val"
                    type="number" filled label="Porcentaje" :disable="condition.state == 'minmax'" /></q-item-section>
                <q-item-section></q-item-section>
              </q-item>
              <q-radio dense class="col" v-model="condition.state" val="minmax" label="Minimo y Maximo" />
            </div>
          </q-card-section>
        </q-card>


        <q-separator spaced inset vertical dark />

        <q-table :rows="bascket" :columns="table.columns" separator="cell" :filter="table.filter"
          v-if="products.length > 0">
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn color="primary" icon-right="send" flat @click="newNotes.state = !newNotes.state"
              :disable="bascket.length == 0" />
            <q-btn color="primary" icon="print" flat @click="impre" :disable="bascket.length == 0" />
            <q-btn color="primary" icon="download" flat @click="download" :disable="bascket.length == 0" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="codigo" :props="props">
                {{ props.row.code }}
              </q-td>
              <q-td key="description" :props="props">
                {{ props.row.description }}
              </q-td>
              <q-td key="Seccion" :props="props">

                {{ props.row.categories.familia.seccion.name }}

              </q-td>
              <q-td key="Familia" :props="props">

                {{ props.row.categories.familia.name }}

              </q-td>
              <q-td key="Categoria" :props="props">

                {{ props.row.categories.name }}

              </q-td>
              <q-td key="pieces" :props="props">

                {{ props.row.pieces }}

              </q-td>
              <q-td key="locations" :props="props">

                {{ props.row.locations?.map(e => e.path).join(", ") }}

              </q-td>
              <q-td key="cedis" :props="props">

                {{ props.row.cedis }}

              </q-td>
              <q-td key="texcoco" :props="props">

                {{ props.row.texcoco }}

              </q-td>
              <q-td key="brasil" :props="props">

                {{ props.row.brasil }}

              </q-td>
              <q-td key="Sucursal" :props="props">

                {{ props.row.sucursal }}

              </q-td>
              <q-td key="min" :props="props">

                {{ props.row.min }}

              </q-td>
              <q-td key="max" :props="props">

                {{ props.row.max }}

              </q-td>
              <q-td key="Percentge" :props="props">

                {{ props.row.percentage }} %

              </q-td>
              <q-td key="required" :props="props">
                {{ props.row.required }}
                <q-popup-edit v-model="props.row.required" v-slot="scope">
                  <q-input v-model="scope.value" dense autofocus counter
                    @keyup.enter="updateProduct(props.row.id, scope)" />
                </q-popup-edit>
              </q-td>
              <q-td key="action" :props="props">

                <q-btn color="negative" icon="delete" @click="delProduct(props.row)" flat />

              </q-td>

            </q-tr>
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
import { assist } from "src/boot/axios";
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

const cedis = ref({
  val: null,
  opts: []
})
const types = ref({
  val: null,
  opts: [
    { id: 1, label: 'Ubicaciones' },
    { id: 2, label: 'Categorias' }

  ]
})

const categories = ref({
  state: false,
  all: [],
  seccion: {
    val: [],
  },
  familias: {
    val: [],
  },
  categories: {
    val: [],
  }
})

const categoriesLocations = ref({
  state: false,
  seccion: {
    val: [],
    opts: []
  },
  familias: {
    val: [],
    opts: []
  },
  categorias: {
    val: [],
    opts: []
  },
})
const percentage = ref({
  val: 20
})
const condition = ref({ state: 'percentage' })
const products = ref([]);
const notes = ref(null);
const printers = ref({
  state: false,
  val: null,
  body: []
})
const locations = ref({
  state: false,
  val: [],
  opts: [],
  locaciones: {
    val: []
  }
})

const table = ref({
  columns: [
    { name: 'codigo', label: 'Codigo', align: 'left', sortable: true, field: row => row.code },
    { name: 'description', label: 'Descripcion', align: 'left', sortable: true, field: row => row.description },
    { name: 'Seccion', label: 'Seccion', align: 'left', sortable: true, field: row => row.categories.familia.seccion.name },
    { name: 'Familia', label: 'Familia', align: 'left', sortable: true, field: row => row.categories.familia.name },
    { name: 'Categoria', label: 'Categoria', align: 'left', sortable: true, field: row => row.categories.name },
    { name: 'pieces', label: 'PXC', align: 'center', sortable: true, field: row => row.pieces },
    { name: 'locations', label: 'Ubicacion', align: 'center', sortable: true, field: row => row.locations },
    { name: 'cedis', label: 'Ced CJ', align: 'center', sortable: true, field: row => row.cedis },
    { name: 'texcoco', label: 'Tex CJ', align: 'center', sortable: true, field: row => row.texcoco },
    { name: 'brasil', label: 'Bra CJ', align: 'center', sortable: true, field: row => row.brasil },
    { name: 'Sucursal', label: `${VDB.session.store.name}`, align: 'center', sortable: true, field: row => row.sucursal },
    { name: 'min', label: `Minimo`, align: 'center', sortable: true, field: row => row.min },
    { name: 'max', label: `Maximo`, align: 'center', sortable: true, field: row => row.max },
    { name: 'Percentge', label: `${VDB.session.store.name} % `, align: 'center', sortable: true, field: row => row.percentage },
    { name: 'required', label: 'Solicitado CJ', align: 'center', sortable: true, field: row => row.required },
    { name: 'action', align: 'center' }
  ],
  filter: ''
})

const sections = computed(() => categories.value.all.filter(e => e.deep == 0))
const families = computed(() => {
  if (categories.value.seccion.val.length > 0) {
    return categories.value.all.filter(e => e.deep == 1 && categories.value.seccion.val.map(e => e.id).includes(e.root))
  } else {
    return categories.value.all.filter(e => e.deep == 1)
  }
})
const caty = computed(() => {
  if (categories.value.seccion.val.length > 0 && categories.value.familias.val.length == 0) {
    let familias = categories.value.all.filter(e => e.deep == 1 && categories.value.seccion.val.map(e => e.id).includes(e.root)).map(e => e.id);
    return categories.value.all.filter(e => e.deep == 2 && familias.includes(e.root))
  } else if (categories.value.familias.val.length > 0) {
    return categories.value.all.filter(e => e.deep == 2 && categories.value.familias.val.map(e => e.id).includes(e.root))
  } else {
    return categories.value.all.filter(e => e.deep == 2)
  }
})
const categoriesfinish = computed(() => categories.value.seccion.val.length > 0);
const locaciones = computed(() => {
  if (locations.value.val.length > 0) {
    let res = [];
    locations.value.opts.filter(e => locations.value.val.map(e => e.id).includes(e.id)).forEach(e => e.sections.forEach(i => res.push(i)));
    return res
  } else {
    let res = []
    locations.value.opts.forEach(e => e.sections.forEach(i => res.push(i)));
    return res
  }
})

const suggested = computed(() => {
  return products.value.map((product) => {
    let CajasCedis = Math.round(Number(product.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)) / Number(product.pieces));
    let CajasTexcoco = Math.round(Number(product.stocks.filter(e => e.id == 2).map(e => e.pivot.stock)) / Number(product.pieces));
    let CajasBrasil = Math.round(Number(product.stocks.filter(e => e.id == 16).map(e => e.pivot.stock)) / Number(product.pieces));
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
      min: Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.min)),
      max: Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.max)),
      cedis: CajasCedis,
      texcoco: CajasTexcoco,
      brasil: CajasBrasil,
      sucursal: Sucursal,
      percentage: Porcentaje,
      required: product.required,
      locations: product.locations
    }

  }).filter(e => {
    if (condition.value.state == 'percentage') {
      if (VDB.session.store.id_viz == 1) {
        return (e.texcoco) > 0 && e.percentage <= percentage.value.val
      } else {
        return (e.cedis + e.texcoco) > 0 && e.percentage <= percentage.value.val
      }
    } else if (condition.value.state == 'minmax') {
      if (VDB.session.store.id_viz == 1) {
        return (e.texcoco) > 0 && (e.sucursal <= e.min) && (e.min > 0)
      } else {
        return (e.cedis + e.texcoco) > 0 && (e.sucursal <= e.min) && (e.min > 0)
      }
    }

  })
})

const bascket = computed(() => {
  if (types.value.val.id == 2) {
    return suggested.value;
  } else {
    if (categoriesLocations.value.seccion.val.length == 0 && categoriesLocations.value.familias.val.length == 0 && categoriesLocations.value.categorias.val.length == 0) {
      return suggested.value;
    } else if (categoriesLocations.value.seccion.val.length > 0 && categoriesLocations.value.familias.val.length == 0 && categoriesLocations.value.categorias.val.length == 0) {
      return suggested.value.filter(e => categoriesLocations.value.seccion.val.map(i => i.id).includes(e.categories.familia.seccion.id))
    } else if (categoriesLocations.value.seccion.val.length > 0 && categoriesLocations.value.familias.val.length > 0 && categoriesLocations.value.categorias.val.length == 0) {
      return suggested.value.filter(e => categoriesLocations.value.seccion.val.map(i => i.id).includes(e.categories.familia.seccion.id) && categoriesLocations.value.familias.val.map(i => i.id).includes(e.categories.familia.id))
    } else if (categoriesLocations.value.seccion.val.length > 0 && categoriesLocations.value.familias.val.length > 0 && categoriesLocations.value.categorias.val.length > 0) {
      return suggested.value.filter(e => categoriesLocations.value.seccion.val.map(i => i.id).includes(e.categories.familia.seccion.id) && categoriesLocations.value.familias.val.map(i => i.id).includes(e.categories.familia.id) && categoriesLocations.value.categorias.val.map(i => i.id).includes(e.categories.id))
    }
  }
})

const familiesLocations = computed(() => {
  if (categoriesLocations.value.seccion.val.length > 0) {
    return categoriesLocations.value.familias.opts.filter(e => categoriesLocations.value.seccion.val.map(e => e.id).includes(e.root))
  } else {
    return categoriesLocations.value.familias.opts
  }
})

const catyLocations = computed(() => {
  if (categoriesLocations.value.familias.val.length > 0) {
    return categoriesLocations.value.categorias.opts.filter(e => categoriesLocations.value.familias.val.map(e => e.id).includes(e.root))
  } else {
    return categoriesLocations.value.categorias.opts
  }
})

const init = async () => {
  $q.loading.show({ message: 'Obteniendo secciones' })
  const resp = await dbCompare.getCedis()
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    cedis.value.opts = resp
    $q.loading.hide();
  }
  console.log(resp)
}

const typeChange = async () => {
  categories.value = {
    state: false,
    all: [],
    seccion: {
      val: [],
    },
    familias: {
      val: [],
    },
    categories: {
      val: [],
    }
  }
  locations.value = {
    state: false,
    val: [],
    opts: [],
    locaciones: {
      val: []
    }
  }
  let sid = VDB.session.store.id_viz;
  let _type = types.value.val.id
  $q.loading.show({ message: 'Obteniendo secciones' })
  const resp = await dbCompare.getSeccion(sid, { _type })
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    if (resp.message) {
      $q.notify({ message: 'No existe la categoria', type: 'negative', position: 'center' })
    } else if (resp.families) {
      categories.value.all = resp.families
      categories.value.state = true;
    } else if (resp.locations) {
      locations.value.state = true;
      locations.value.opts = resp.locations
      categories.value.all = resp.sections
    }
    $q.loading.hide();
  }
}

const report = async () => {

  $q.loading.show({ message: 'Obteniendo Reporte' })

  let sid = VDB.session.store.id_viz
  let data = {
    _workpoint_to: cedis.value.val.id,
    _workpoint_from: sid,
    seccion: categories.value.seccion.val.map(e => e.id),
    familia: categories.value.familias.val.map(e => e.id),
    categoria: categories.value.categories.val.map(e => e.id),
  }
  const resp = await dbCompare.reportProductsCategories(data)
  if (resp.fail) {
    console.log(resp);
  } else {
    $q.loading.hide()
    console.log(resp);
    products.value = resp;
    products.value.forEach(product => {
      let CajasSucursal = Math.round(Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock)) / Number(product.pieces));
      let maxCajas = Math.round(Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.max)) / Number(product.pieces))
      if ((maxCajas - CajasSucursal) >= 1) {
        product.required = Math.round(maxCajas - CajasSucursal);
      } else {
        product.required = 1
      }
    }
    );
  }
}

const reportLocations = async () => {

  $q.loading.show({ message: 'Obteniendo Reporte' })
  let sid = VDB.session.store.id_viz
  let data = {
    _workpoint_to: cedis.value.val.id,
    _workpoint_from: sid,
    celler: locations.value.val.map(e => e.id),
    locations: locations.value.locaciones.val.map(e => e.id),
    section: categories.value.seccion.val.map(e => e.id)
  };
  console.log(data)
  const resp = await dbCompare.getProductsCompareLocation(data)
  console.log(resp)
  if (resp.fail) {
    console.log(resp);
  } else {
    $q.loading.hide()
    console.log(resp);
    products.value = resp
    products.value.forEach(e => e.required = 1);
    products.value.forEach(e => {
      let CajasSucursal = Math.round(Number(e.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock)) / Number(e.pieces));
      let maxCajas = Math.round(Number(e.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.max)) / Number(e.pieces))
      if ((maxCajas - CajasSucursal) >= 1) {
        e.required = Math.round(maxCajas - CajasSucursal);
      } else {
        e.required = 1
      }
    const seccion = e.categories.familia.seccion
    if (seccion && !categoriesLocations.value.seccion.opts.map(e => e.id).includes(seccion.id)) {
      categoriesLocations.value.seccion.opts.push(seccion)
    }
    const familia = e.categories.familia
    if (familia && !categoriesLocations.value.familias.opts.map(e => e.id).includes(familia.id)) {
      categoriesLocations.value.familias.opts.push(familia)
    }
    const categoria = e.categories
    if (categoria && !categoriesLocations.value.categorias.opts.map(e => e.id).includes(categoria.id)) {
      categoriesLocations.value.categorias.opts.push(categoria)
    }
  })
  categoriesLocations.value.state = true;
}

}

const updateProduct = (productId, scope) => {
  const product = products.value.find((p) => p.id === productId);
  console.log(product)
  if (product) {
    product.required = scope.value; // Actualiza el valor directamente
    scope.set();
  }
}

const newRequsition = async () => {
  $q.loading.show({ message: 'Creando Pedido' })
  let dat = {
    workpoint_from: VDB.session.store.id_viz,
    workpoint_to: cedis.value.val.id,
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
    families.value.val = []
    locations.value.val = []
    categories.value.val = []
    $q.loading.hide()
    window.location.reload();
  }
}

const delProduct = (product) => {
  console.log(product)
  let inx = products.value.findIndex(e => e.id === product.id);
  console.log(inx)
  if (inx >= 0) {
    products.value.splice(inx, 1);
  }
}

const print = async () => {
  console.log('aqui imprimo');
  let dat = {
    products: bascket.value,
    from: VDB.session.store,
    ip_address: printers.value.val.ip_address
  }
  const resp = await dbCompare.preview(dat);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.notify({ message: 'Impresion Correcta', type: 'positive', position: 'center' })
    printers.value.val = null,
      printers.value.state = false
  }
}

const download = async () => {
  const workbook = new ExcelJS.Workbook();


  const worksheet = workbook.addWorksheet(`Resurtido`);
  console.log()
  worksheet.addTable({
    name: 'Resurtido',
    ref: 'A1',
    headerRow: true,
    totalsRow: false,
    style: {
      // theme: 'TableStyleBlue2',
      showRowStripes: true,
    },
    columns: [
      { name: 'Codigo', filterButton: true },
      { name: 'Descripcion', filterButton: true },
      { name: 'Seccion', filterButton: true },
      { name: 'Familia', filterButton: true },
      { name: 'Categoria', filterButton: true },
      { name: 'PXC', filterButton: true },
      { name: 'Ubicacion', filterButton: true },
      { name: 'Cedis CJ', filterButton: true },
      { name: 'Texcoco CJ', filterButton: true },
      { name: 'Brasil CJ', filterButton: true },
      { name: 'Sucursal', filterButton: true },
      { name: 'MIN', filterButton: true },
      { name: 'MAX', filterButton: true },
      { name: 'Porcentaje', filterButton: true },
      { name: 'Solicitado', filterButton: true },

    ],
    rows: bascket.value.map(e => { return [e.code, e.description, e.categories.familia.seccion.name, e.categories.familia.name, e.categories.name, e.pieces, e.locations.map(e => e.path).join(", "), e.cedis, e.texcoco, e.brasil, e.sucursal, e.min, e.max, e.percentage, e.required] }),
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength; // Ajusta el ancho mínimo y máximo
  });



  const downloadExcel = async () => {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `Resurtido.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  downloadExcel();
}

const impre = async () => {
  let idstore = VDB.session.store.id;
  console.log(idstore)
  // console.log(host);
  // let impr = `http://${host}/access/public/modify/getPrinter`;
  try {
    let resp = await assist.get(`/cashier/getPrinters/${idstore}`)
    if (resp.status == 200) {
      printers.value.body = resp.data
      console.log(resp)
      printers.value.state = true
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

init()

</script>
