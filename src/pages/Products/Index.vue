<template>
  <q-page padding>
    <q-table :rows="products" :columns="table.columns" @row-click="viewProduct">
      <template v-slot:top>
        <div class="row  q-col-gutter-sm full-width">
          <div class="col-auto">
            <q-btn color="primary" icon="download" flat round @click="download" title="Descargar Productos Mostrados" />
          </div>
          <div class="col">
            <q-input v-model="table.filter" dense debounce="300" placeholder="Buscar" filled>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-auto">
            <q-btn color="primary" icon="price_change" flat round @click="clickPrices" title="Subir Precios Masivos" />
          </div>
          <div class="col-auto">
            <q-btn color="primary" icon="add" flat round @click="mosformProduct = !mosformProduct"
              title="Agregar Articulos" />
          </div>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="searhProduct" persistent>
      <q-card style="width: 700px; max-width: 90vw;">
        <q-form @submit.prevent="searching">
          <q-card-section>
            <div class="text-h6 text-bold text-center">Buscar</div>
          </q-card-section>
          <q-card-section>
            <div class="row items-center q-mb-md">
              <div class="text-center q-mr-sm">Buscar en</div>
              <q-select class="col" v-model="query.Campo" :options="table.columns" option-label="label" label="Campo"
                filled dense @update:model-value="resetSearch" />
            </div>
            <div class="row items-center">
              <div class="text-center q-mr-lg">Buscar</div>
              <q-input class="col" v-if="isTextField" v-model="query.val" :label="query.Campo.label" dense filled
                autofocus />
              <q-select class="col" v-else-if="query.Campo.id === 5" v-model="query.val" :options="layoutProduct.states"
                label="Estado" option-label="name" dense filled />
              <q-select class="col" v-else-if="query.Campo.id === 6" v-model="filters.secciones" :options="secciones"
                label="Sección" option-label="name" dense filled />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn flat label="Buscar" type="submit" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="mosformProduct" persistent backdrop-filter="blur(4px) saturate(150%)"
      :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down">
      <q-card class="my-card">
        <q-bar>
          Articulos
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <newProducts />
      </q-card>
    </q-dialog>

    <q-dialog v-model="mosProduct.state" persistent backdrop-filter="blur(4px) saturate(150%)"
      :maximized="maximizedToggleProduct" transition-show="slide-up" transition-hide="slide-down">
      <q-card>
        <q-bar>
          <span class="text-bold q-ml-md"> {{ mosProduct.val.code }} </span>
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximizedToggleProduct = false" :disable="!maximizedToggleProduct">
            <q-tooltip v-if="maximizedToggleProduct" class="bg-white text-primary">Minimizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggleProduct = true" :disable="maximizedToggleProduct">
            <q-tooltip v-if="!maximizedToggleProduct" class="bg-white text-primary">Maximizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <viewPrd :product="mosProduct.val" :status="layoutProduct.states" :providers="layoutProduct.providers" :makers="layoutProduct.makers" :attributes="layoutProduct.attributes" :categories="layoutProduct.categories" />
      </q-card>
    </q-dialog>

  </q-page>
  <input type="file" ref="inputPrices" id="inputPrices" @input="readPrices" hidden accept=".xlsx,.xls" />
</template>
<script setup>
import { useProductStore } from 'stores/ProductsStore';
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useVDBStore } from 'stores/VDB';
import { useRoute, useRouter } from 'vue-router';
import newProducts from 'components/Products/newProducts.vue'
import viewPrd from 'components/Products/viewProduct.vue'


import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import { useQuasar, date } from 'quasar';
import { $sktRestock } from 'boot/socket';
import productApi from 'src/API/productsApi.js';
const VDB = useVDBStore();
const $q = useQuasar();
const layoutProduct = useProductStore();
layoutProduct.setTitle('Articulos')
const maximizedToggle = ref(true)
const maximizedToggleProduct = ref(true)
const mosProduct = ref({
  state: false,
  val: null
})
const readPrices = ref(null)
const inputPrices = ref(null)
const searhProduct = ref(true)
const mosformProduct = ref(false)
const products = ref([]);

const query = ref({
  Campo: {
    id: 1,
    name: 'code',
    label: 'CODIGO'
  },
  val: ''
})


const table = ref({
  columns: [
    { id: 1, name: 'code', label: 'CODIGO', field: r => r.code, align: 'center' },
    { id: 2, name: 'short_code', label: 'CODIGO CORTO', field: r => r.short_code, align: 'center' },
    { id: 3, name: 'barcode', label: 'CODIGO DE BARRAS', field: r => r.barcode, align: 'center' },
    { id: 4, name: 'description', label: 'DESCRIPCION', field: r => r.description, align: 'center' },
    { id: 5, name: '_state', label: 'ESTADO', field: r => r.state.name, align: 'center' },
    { id: 6, name: 'section', label: 'SECCION', field: r => r.category?.familia?.seccion?.name, align: 'center' },
  ]
})

const filters = ref({
  secciones: null,
})
const isTextField = computed(() =>
  [1, 2, 3, 4].includes(query.value.Campo.id)
)
const secciones = computed(() =>
  layoutProduct.categories.filter(c => c.deep === 0)
)

const resetSearch = () => {
  query.value.val = ''
  filters.value.secciones = null
  filters.value.familias = null
  filters.value.categorias = null
}

const searching = async () => {
  $q.loading.show({ message: 'Buscando' })
  let value = query.value.val
  if (filters.value.categorias) value = filters.value.categorias.id
  else if (filters.value.familias) value = filters.value.familias.id
  else if (filters.value.secciones) value = filters.value.secciones.id
  else if (value?.id) value = value.id

  const payload = {
    field: query.value.Campo.name,
    value
  }
  console.log(payload)
  const resp = await productApi.searchProd(payload);
  if (resp.fail) {
    console.log(resp.fail)
  } else {
    console.log(resp)
    $q.loading.hide();
    searhProduct.value = false
    products.value = resp
  }

}

const handleKeyDown = (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'b') {
    e.preventDefault()
    if (!$q.dialog.isActive) {
      searhProduct.value = true
    }
  }
}
const viewProduct = (a, b) => {
  mosProduct.value.state = true
  mosProduct.value.val = b
}


const clickPrices = () => {
  inputPrices.value.click();
}

const download = () => {

}

watch(() => filters.value.secciones, () => {
  filters.value.familias = null
  filters.value.categorias = null
})

watch(() => filters.value.familias, () => {
  filters.value.categorias = null
})
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  layoutProduct.setTitle('Articulos')
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
