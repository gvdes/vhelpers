<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-card-section class="text-center text-h5">
      Documento : <span class="text-bold">{{ documentHigh.nameDoc }}</span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-input v-model="addProduct.val.code" type="text" label="Codigo" filled dense maxlength="13" @blur="blurCode"
        :loading="loadCode" />
      <q-separator spaced inset vertical dark />
      <div class="row">
        <q-input class="col" v-model="addProduct.val.short_code" type="number" label="Codigo Corto" filled dense
          disable />
        <q-separator spaced inset vertical dark />
        <q-input class="col" v-model="addProduct.val.cb" type="text" label="Codigo de Barras" filled dense
          @blur="blurBarcode" :loading="loadBarcode" :error="barcodeError.state" :error-message="barcodeError.message">
          <template v-slot:append v-if="!loadBarcode">
            <q-btn icon="qr_code_2" flat title="Generar codigo de barras" :disable="addProduct.val.cb?.length > 0"
              @click="genBarcode" />
          </template>
        </q-input>
        <q-separator spaced inset vertical dark />
      </div>
      <q-input v-model="addProduct.val.description" type="text" label="Descripcion" filled dense />
      <q-separator spaced inset vertical dark />
      <div class="row">
        <q-select class="col" v-model="addProduct.val.section" :options="sections" label="SECCION" filled
          option-label="name" dense />
        <q-separator spaced inset vertical dark />
        <q-select class="col" v-model="addProduct.val.familia" :options="familias" label="FAMILIA" filled
          option-label="name" dense :disable="!addProduct.val.section" />
        <q-separator spaced inset vertical dark />
        <q-select class="col" v-model="addProduct.val.categoria" :options="categories" label="CATEGORIA" filled
          option-label="name" dense :disable="!addProduct.val.familia" />
      </div>
      <q-separator spaced inset vertical dark />
      <q-select v-model="addProduct.val.provider" :options="providers" hide-selected label="PROVEEDOR" filled
        option-label="name" dense use-input fill-input @filter="filterProviders" />
      <q-separator spaced inset vertical dark />
      <q-select v-model="addProduct.val.reference" :options="layoutProduct.reference" label="REFERENCIA" filled
        option-label="name" dense />
      <q-separator spaced inset vertical dark />
      <q-select v-model="addProduct.val.makers" hide-selected :options="makers" label="FABRICANTE" filled
        option-label="name" dense use-input fill-input @filter="filterMakers" />
      <q-separator spaced inset vertical dark />
      <q-input v-model="addProduct.val.cost" type="number" label="COSTO" filled dense />
      <q-separator spaced inset vertical dark />
      <q-input v-model="addProduct.val.pxc" type="text" label="PXC" filled dense />
      <q-separator spaced inset vertical dark />
      <q-select v-model="addProduct.val.umc" :options="layoutProduct.unitsMeasure" label="U MEDIDA COMPRA" filled
        option-label="name" dense />
      <q-separator spaced inset vertical dark />
      <q-select v-model="addProduct.val.pr" :options="layoutProduct.productRe" label="PRODUCTO RESURTIBLE" filled
        option-label="name" dense />
      <q-separator spaced inset vertical dark />
      <div class="text-center text-h6">
        Atributos <span class="q-ml-md"><q-btn outline color="primary" dense icon="add" @click="addAtribute"
            :disable="addProduct.val.attributes.length == layoutProduct.attributes.length" /></span>
      </div>
      <q-separator spaced inset vertical dark />
      <div v-for="(val, index) in addProduct.val.attributes" v-if="addProduct.val.attributes.length > 0">
        <div class="row">
          <q-select class="col" v-model="val._attribute" :options="layoutProduct.attributes" label="Atributo" filled
            dense option-label="name" :option-disable="optionDisable" />
          <q-separator spaced inset vertical dark />
          <q-select class="col" v-model="val.value" :options="val.catalog" label="Valor" option-label="option" filled
            dense use-input @filter="(input, update, abort) => filterAttribute(input, update, abort, val)"
            @new-value="(input, done) => createAttribute(input, done, val)" />
          <q-separator spaced inset vertical dark />
          <q-btn color="negative" flat icon="delete" dense @click="deleteAtribute(index)" />
        </div>
        <q-separator spaced inset vertical dark />
      </div>

    </q-card-section>
    <q-card-actions align="center">
      <q-btn flat label="CANCELAR" @click="cancelAdd" />
      <q-btn flat label="AGREGAR" @click="insertProduct" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useProductStore } from 'stores/ProductsStore';
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useVDBStore } from 'stores/VDB';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import { useQuasar, date } from 'quasar';
import { $sktRestock } from 'boot/socket';
import productApi from 'src/API/productsApi.js';
const VDB = useVDBStore();
const $q = useQuasar();
const layoutProduct = useProductStore();
const loadBarcode = ref(false);
const loadCode = ref(false)
const providers = ref(layoutProduct.providers);
const makers = ref(layoutProduct.makers);
const person = ref(layoutProduct.MedidasPers);

const emits = defineEmits(['addingProduct', 'closePopup'])

const barcodeError = ref({
  state: false,
  message: null,
  body: null
})
const props = defineProps({
  documentHigh: { type: Object }
})

const addProduct = ref({
  val: {
    code: null,
    cb: null,
    short_code: null,
    description: null,
    categoria: null,
    familia: null,
    section: null,
    provider: null,
    reference: null,
    makers: null,
    cost: 0,
    pxc: null,
    umc: null,
    pr: null,
    attributes: []
  }
})

const sections = computed(() => layoutProduct.categories.filter(e => e.deep == 0))
const familias = computed(() => {
  let families = layoutProduct.categories.filter(e => e.deep == 1)
  if (addProduct.value.val.section) {
    return families.filter(e => e._root == addProduct.value.val.section.id)
  } else {
    return families
  }
})
const categories = computed(() => {
  let category = layoutProduct.categories.filter(e => e.deep == 2)
  if (addProduct.value.val.familia) {
    return category.filter(e => e._root == addProduct.value.val.familia.id)
  } else {
    return category
  }
})

const addAtribute = () => {
  addProduct.value.val.attributes.push({
    _attribute: null,
    value: null,
    catalog: []
  })
}

const deleteAtribute = (index) => {
  addProduct.value.val.attributes.splice(index, 1)
}
const optionDisable = (item) => {
  return addProduct.value.val.attributes.some(
    e => e._attribute && e._attribute.id === item.id
  )
}


const blurBarcode = async () => {
  if (addProduct.value.val.cb) {
    loadBarcode.value = true
    const resp = await productApi.searchBarcode(addProduct.value.val.cb)
    if (resp.error) {
      console.log(resp)
      loadBarcode.value = false;
    } else {
      console.log(resp);
      if (resp) {
        $q.notify({ message: 'El codigo de barras esta duplicado', type: 'negative', position: 'bottom' })
        barcodeError.value.state = true
        barcodeError.value.message = `El codigo ya existe en un  articulo`;
        barcodeError.value.body = resp
      }
      loadBarcode.value = false;
    }
  }
}

const blurCode = async () => {
  if (addProduct.value.val.code) {
    console.log(addProduct.value.val.code)
    loadCode.value = true
    const resp = await productApi.searchCode(addProduct.value.val.code)
    console.log(resp);
    if (resp.fail) {
      console.log(resp)
      loadCode.value = false;
    } else {
      console.log(resp);
      if (resp.exist) {
        $q.notify({ message: 'El codigo ya existe', type: 'negative', position: 'bottom' })
        alert('El codigo ya existe Favor de revisarlo')
        addProduct.value.val.code = null;
      }
      addProduct.value.val.short_code = resp.cco
      loadCode.value = false;
    }
  }
}


const genBarcode = async () => {
  $q.loading.show({ message: 'Generando CB' });
  if (addProduct.value.val.section && addProduct.value.val.familia && addProduct.value.val.categoria) {
    const resp = await productApi.generateBarcode(addProduct.value.val.categoria);
    if (resp.error) {
      console.log(resp)
    } else {
      console.log(resp);
      addProduct.value.val.cb = resp;
      $q.loading.hide();
    }
  } else {
    $q.notify({ message: 'Selecciona categorias para poder generar el codigo de barras', type: 'negative', position: 'bottom' })
    $q.loading.hide();
  }
}


const filterProviders = (val, update, abort) => {
  update(() => {
    const needle = val.toLowerCase()
    providers.value = layoutProduct.providers.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
  })
}

const filterMakers = (val, update, abort) => {
  update(() => {
    const needle = val.toLowerCase()
    makers.value = layoutProduct.makers.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
  })
}
const filterAttribute = (val, update, abort, attr) => {
  if (!attr.catalog) return abort()

  update(() => {
    const needle = val.toLowerCase()
    attr.catalog = attr.catalog.filter(v =>
      v.option.toLowerCase().includes(needle)
    )
  })
}

const createAttribute = (val, done, attr) => {
  val = val?.trim()
  if (!val) return
  const newOption = {
    option: val,
    is_custom: true
  }
  const globalAttr = layoutProduct.attributes.find(
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
}


const insertProduct = () => {

  const payload = {
    ...addProduct.value.val,
    attributes: addProduct.value.val.attributes.map(a => ({
      name:a._attribute.name,
      id: a._attribute.id,
      value: a.value.option
    }))
  }
  console.log(payload);
  emits('addingProduct', { ...payload});
  resetForm()
}

const cancelAdd = () => {
  emits('closePopup')

}

const resetForm = () => {
  addProduct.value.val = {
    code: null,
    cb: null,
    short_code: null,
    description: null,
    categoria: null,
    familia: null,
    section: null,
    provider: null,
    reference: null,
    makers: null,
    cost: 0,
    pxc: null,
    umc: null,
    pr: null,
    attributes: []
  }
}


watch(
  () => addProduct.value.val.attributes,
  (attrs) => {
    attrs.forEach(attr => {
      if (attr._attribute && !attr.catalog.length) {
        attr.catalog = attr._attribute.catalog
          ? JSON.parse(JSON.stringify(attr._attribute.catalog))
          : []
      }
    })
  },
  { deep: true }
)




</script>
