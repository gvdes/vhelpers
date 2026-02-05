<template>
  <q-card-section class="row">
    <div class="col">
      <q-input v-model="product.code" type="text" filled label="Codigo" maxlength="13" dense disable>
        <template v-slot:after>
          <q-btn color="primary" icon="category" outline dense @click="relatedAdd.state = !relatedAdd.state" />
        </template>
      </q-input>
      <q-separator spaced inset vertical dark />
      <q-input v-model="product.barcode" type="text" filled label="Codigo de Barras" dense>
        <template v-slot:append>
          <q-btn icon="qr_code_2" flat title="Generar codigo de barras" @click="genBarcode"
            :disable="product.barcode.length > 0" />
        </template>
        <template v-slot:after>
          <q-btn color="primary" icon="add" @click="barcodeAdd.state = !barcodeAdd.state" dense outline="" />
        </template>
      </q-input>
    </div>
    <q-separator spaced inset vertical dark />
    <div class="col">
      <div class="row">
        <div class="col"><q-input v-model="product.reference" type="text" filled label="Referencia" dense />
        </div>
        <q-separator spaced inset vertical dark />
        <div class="col"><q-select v-model="product.state" :options="status" label="Estado" filled option-label="name"
            dense /></div>
      </div>

      <q-separator spaced inset vertical dark />
      <div class="row">
        <div class="col"><q-input v-model="product.pieces" type="number" filled label="PXC" dense />
        </div>
        <q-separator spaced inset vertical dark />
        <div class="col"><q-input v-model="product.short_code" type="text" filled label="Codigo Corto" disable dense />
        </div>
      </div>
    </div>
    <q-separator spaced inset vertical dark />
    <div v-if="product.picture">
      <q-avatar square size="120px">
        <q-img :src="`${product.picture.url}`" spinner-color="primary">
          <q-menu touch-position>
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label><q-icon name="edit" /> <span class="text-bold text-center">Editar</span></q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section> <q-item-label><q-icon name="visibility" /> <span
                      class="text-bold text-center">Ver</span>
                  </q-item-label></q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-img>
      </q-avatar>
    </div>
    <div v-else>
      <q-btn flat icon="add_photo_alternate" size="42px" />
    </div>
  </q-card-section>

  <q-card-section>
    <q-tabs v-model="tab" class="text-primary">
      <q-tab name="general" icon="settings" label="General" />
      <q-tab name="prices" icon="price_change" label="Precios" />
    </q-tabs>
  </q-card-section>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="general">
      <q-card-section>
        <q-input v-model="product.description" type="text" filled label="Descripcion" dense class="col" />
        <q-separator spaced inset vertical dark />
        <div class="row">
          <q-select class="col" v-model="product.category.familia.seccion" :options="sections" label="SECCION" filled
            option-label="name" dense />
          <q-separator spaced inset vertical dark />
          <q-select class="col" v-model="product.category.familia" :options="familias" label="FAMILIA" filled
            option-label="name" dense />
          <q-separator spaced inset vertical dark />
          <q-select class="col" v-model="product.category" :options="categories" label="CATEGORIA" filled
            option-label="name" dense />
        </div>
        <q-separator spaced inset vertical dark />
        <div class="row">
          <q-select class="col" v-model="product.providers" :options="providers" label="Proveedor" filled
            option-label="name" dense />
          <q-separator spaced inset vertical dark />
          <q-select class="col" v-model="product.makers" :options="makers" label="Fabricando" filled option-label="name"
            dense />
        </div>
        <q-separator spaced inset vertical dark />
        <div class="text-center text-h6">
          Atributos <span class="q-ml-md"><q-btn outline color="primary" dense icon="add" @click="addAtribute"
              :disable="product.attributes.length == attributes.length" /></span>
        </div>
        <q-separator spaced inset vertical dark />
        <div v-for="(val, index) in product.attributes" v-if="product.attributes.length > 0">
          <div class="row">
            <q-select class="col" v-model="val.name" :options="attributes" label="Atributo" option-label="name" filled
              dense />
            <q-separator spaced inset vertical dark />
            <q-select class="col" v-model="val.pivot.value" :options="val.catalog" label="Valor" option-label="option"
              filled dense use-input @filter="(input, update, abort) => filterAttribute(input, update, abort, val)"
              @new-value="(input, done) => createAttribute(input, done, val)" />
            <q-separator spaced inset vertical dark />
            <q-btn color="negative" flat icon="delete" dense @click="deleteAtribute(index)" />
          </div>
          <q-separator spaced inset vertical dark />
        </div>
      </q-card-section>
    </q-tab-panel>

    <q-tab-panel name="prices">
      <q-card-section>
        <div> <q-input v-model="product.cost" type="number" filled label="Costo" dense /></div>
        <q-separator spaced inset vertical dark />
        <div v-if="product" class="row">
          <div class="col">
            <div class="text-center text-h5">Locales</div>
            <q-separator spaced inset />
            <div v-for="(price, index) in product.prices.filter(e => e.pivot._type == 1)" :key="index">
              <q-separator spaced inset vertical dark />
              <div class="row">
                <q-separator spaced inset vertical dark />
                <div class="col">
                  {{ price.name }}
                </div>

                <q-input class="col" v-model="price.pivot.price" type="number" label="Precio" dense filled outline />

              </div>
            </div>
            <q-separator spaced inset />
          </div>
          <div class="col">
            <div class="text-center text-h5">Foraneos</div>
            <q-separator spaced inset />
            <div v-for="(price, index) in product.prices.filter(e => e.pivot._type == 2)" :key="index">
              <q-separator spaced inset vertical dark />
              <div class="row">
                <q-separator spaced inset vertical dark />
                <div class="col">
                  {{ price.name }}
                </div>
                <q-input class="col" v-model="price.pivot.price" type="number" label="Precio" dense filled outline />
              </div>
            </div>
            <q-separator spaced inset />
          </div>
        </div>
      </q-card-section>
    </q-tab-panel>
  </q-tab-panels>

  <q-dialog v-model="barcodeAdd.state" persistent>
    <q-card style="width: 800px; max-width: 80vw;">
      <q-card-section class="row items-center">
        <q-form @submit="addBarcode" class="q-gutter-md">
          <q-input v-model="barcodeAdd.val" type="text" filled label="CB ADICIONAL" dense />
        </q-form>
      </q-card-section>
      <q-card-section>
        <q-list bordered v-for="(related, index) in product.barcodes" :key="index">
          <q-item>
            <q-item-section>{{ related.barcode }}</q-item-section>
            <q-item-section avatar>
              <q-btn color="negative" icon="close" flat @click="product.barcodes.splice(index, 1)" />
            </q-item-section>
          </q-item>
        </q-list>
        <div>
          <q-btn flat label="OK" color="primary" v-close-popup />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="relatedAdd.state" persistent>
    <q-card>
      <q-card-section class=" items-center">
        <q-form @submit="addRelatedCode" class="q-gutter-md ">
          <div class="row">
            <q-input class="col" v-model="relatedAdd.val.code" type="text" filled label="Codigo" dense />
            <q-separator spaced inset vertical dark />
            <q-input class="col" v-model="relatedAdd.val.barcode" type="text" filled label="Codigo Barras" dense />
            <q-separator spaced inset vertical dark />
            <q-select class="col" v-model="relatedAdd.val.provider" :options="providers" label="Proveedor" filled
              option-label="name" dense />
            <q-separator spaced inset vertical dark />
            <q-input v-model="relatedAdd.val.cost" type="text" label="Costo" class="col" dense />
            <q-separator spaced inset vertical dark />
            <q-input v-model="relatedAdd.val.pieces" type="number" label="PxC" class="col" dense />
          </div>
        </q-form>
      </q-card-section>
      <q-card-section>
        <q-list bordered v-for="(related, index) in product.variants" :key="index">
          <q-item>
            <q-item-section>{{ related }}</q-item-section>
            <q-item-section avatar>
              <q-btn color="negative" icon="close" flat @click="product.variants.splice(index, 1)" />
            </q-item-section>
          </q-item>
        </q-list>
        <div>
          <q-btn flat label="OK" color="primary" v-close-popup />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useProductStore } from 'stores/ProductsStore';
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useVDBStore } from 'stores/VDB';
import { useRoute, useRouter } from 'vue-router';
import formProduct from 'components/Products/formProduct.vue'
import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import { useQuasar, date } from 'quasar';
import { $sktRestock } from 'boot/socket';
import productApi from 'src/API/productsApi.js';
import cloneDeep from 'lodash/cloneDeep'
const VDB = useVDBStore();
const $q = useQuasar();
const layoutProduct = useProductStore();
const loadBarcode = ref(false);
const tab = ref('general')
const productOriginal = ref(null)
const props = defineProps({
  "product": { default: {}, type: Object },
  "status": { default: [], type: Array },
  "providers": { default: [], type: Array },
  "makers": { default: [], type: Array },
  "attributes": { default: [], type: Array },
  "categories": { default: [], type: Array }
})
const barcodeAdd = ref({
  state: false,
  val: null
})
const relatedAdd = ref({
  state: false,
  val: {
    code: null,
    provider: null,
    barcode: null,
    cost: 0,
    pieces: null
  }
})

const sections = computed(() => props.categories.filter(e => e.deep == 0))
const familias = computed(() => {
  let families = props.categories.filter(e => e.deep == 1)
  if (props.product.section) {
    return families.filter(e => e._root == props.product.category.familia.seccion.id)
  } else {
    return families
  }
})
const categories = computed(() => {
  let category = props.categories.filter(e => e.deep == 2)
  if (props.product.category.familia) {
    return category.filter(e => e._root == props.product.category.familia.id)
  } else {
    return category
  }
})


const filterAttribute = (val, update, abort, attr) => {
  if (!attr.catalogOriginal) {
    attr.catalogOriginal = [...attr.catalog]
  }

  update(() => {
    const needle = val.toLowerCase()
    attr.catalog = attr.catalogOriginal.filter(v =>
      v.option.toLowerCase().includes(needle)
    )
  })
}


const genBarcode = async () => {
  if (filters.value.secciones && filters.value.familias && filters.value.categorias) {
    const resp = await prapi.genBarcode(filters.value);
    if (resp.error) {
      console.log(resp)
    } else {
      console.log(resp);
      product.value.barcode = resp;
    }
  } else {
    $q.notify({ message: 'Selecciona categorias para poder generar el codigo de barras', type: 'negative', position: 'bottom' })
  }
}

const deleteAtribute = (index) => {
  product.attributes.splice(index, 1)
}

const createAttribute = (val, done, attr) => {
  val = val?.trim()
  if (!val) return
  const newOption = {
    option: val,
    is_custom: true
  }
  const globalAttr = props.attributes.find(
    a => a.id === attr._attribute.id
  )
  if (globalAttr) {
    const existsGlobal = globalAttr.catalog?.some(
      o => o.option.toLowerCase() === val.toLowerCase()
    )

    if (!existsGlobal) {
      globalAttr.catalog.push(newOption)
    }
  }
  const existsLocal = attr.catalog.some(
    o => o.option.toLowerCase() === val.toLowerCase()
  )
  if (!existsLocal) {
    attr.catalog.push(newOption)
  }
  done(newOption, 'toggle')
  attr.pivot.value = newOption.option
}

const addAtribute = () => {
  props.product.attributes.push({
    _attribute: null,
    value: null,
    catalog: []
  })
}
const changedFields = computed(() => getChanges())
const addBarcode = async () => {
  if (barcodeAdd.value.val) {
    $q.loading.show({ message: 'Revisando Dato' })
    const resp = await productApi.searchBarcode(barcodeAdd.value.val)
    if (resp.error) {
      console.log(resp)
    } else {
      console.log(resp);
      if (resp.length > 0) {
        $q.notify({ message: 'El codigo de barras esta duplicado', type: 'negative', position: 'bottom' })
        barcodeAdd.value.val = null
      } else {
        let data = {
          // _product:props.product.id,
          barcode: barcodeAdd.value.val
        }
        props.product.barcodes.push(data)
        barcodeAdd.value.val = null
        $q.loading.hide();
      }
    }
  }
}

const addRelatedCode = async () => {
  if (relatedAdd.value.val) {
    $q.loading.show({ message: 'Revisando Dato' })
    const resp = await productApi.searchCode(relatedAdd.value.val.code)
    if (resp.error) {
      console.log(resp)
    } else {
      console.log(resp);
      if (resp.length > 0) {
        $q.notify({ message: 'El codigo de barras esta duplicado', type: 'negative', position: 'bottom' })
        relatedAdd.value.val = null
      } else {
        let data = {
          _product: props.product.id,
          code: relatedAdd.value.val.code
        }
        props.product.barcodes.push(data)
        relatedAdd.value.val = null
        $q.loading.hide();
      }
    }
  }
}

const getChanges = () => {
  const changes = {}

  const compare = (newObj, oldObj, path = '') => {
    Object.keys(newObj).forEach(key => {
      const newVal = newObj[key]
      const oldVal = oldObj?.[key]

      const currentPath = path ? `${path}.${key}` : key
      if (Array.isArray(newVal)) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
          changes[currentPath] = newVal
        }
        return
      }
      if (typeof newVal === 'object' && newVal !== null) {
        compare(newVal, oldVal, currentPath)
        return
      }
      if (newVal !== oldVal) {
        changes[currentPath] = newVal
      }
    })
  }

  compare(props.product, productOriginal.value)
  return changes
}

const saveProduct = async () => {
  const changes = getChanges()
  if (changes.attributes) {
    changes.attributes = props.product.attributes.map(a => ({
      id: a._attribute.id,
      value: a.pivot.value
    }))
  }
  console.log(changes)

  // if (Object.keys(changes).length === 0) {
  //   $q.notify({ message: 'Sin cambios', type: 'warning' })
  //   return
  // }

  // await productApi.update(product.id, changes)

  // $q.notify({ message: 'Guardado', type: 'positive' })

  // productOriginal.value = cloneDeep(props.product)
}


onMounted(() => {
  productOriginal.value = cloneDeep(props.product)
})
</script>
