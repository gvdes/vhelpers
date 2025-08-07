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
      <q-select v-model="addProduct.val.provider" :options="providers"  hide-selected label="PROVEEDOR" filled option-label="name"
        dense use-input fill-input @filter="filterProviders" />
      <q-separator spaced inset vertical dark />
      <q-select v-model="addProduct.val.reference" :options="layoutProduct.reference" label="REFERENCIA" filled
        option-label="name" dense />
      <q-separator spaced inset vertical dark />
      <q-select v-model="addProduct.val.makers"  hide-selected :options="makers" label="FABRICANTE" filled option-label="name" dense
        use-input fill-input @filter="filterMakers" />
      <q-separator spaced inset vertical dark />
      <q-input v-model="addProduct.val.cost" type="number" label="COSTO" filled dense />
      <q-separator spaced inset vertical dark />
      <q-input v-model="addProduct.val.pxc" type="text" label="PXC" filled dense />
      <q-separator spaced inset vertical dark />
      <q-input v-model="addProduct.val.nluces" type="text" label="NUMERO LUCES" filled dense />
      <q-separator spaced inset vertical dark />
      <q-select v-model="addProduct.val.umc" :options="layoutProduct.unitsMeasure" label="U MEDIDA COMPRA" filled
        option-label="name" dense />
      <q-separator spaced inset vertical dark />
      <q-select v-model="addProduct.val.pr" :options="layoutProduct.productRe" label="PRODUCTO RESURTIBLE" filled
        option-label="name" dense />
      <q-separator spaced inset vertical dark />
      <q-select v-model="addProduct.val.mnp" :options="person" label="MEDIDA / PERSONAJE" filled option-label="large"
        dense use-input fill-input @filter="filterPerson" @new-value="createPerson" hide-selected />
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
    nluces: null,
    umc: null,
    pr: null,
    mnp: null
  }
})

const sections = computed(() => layoutProduct.categories.filter(e => e.deep == 0))
const familias = computed(() => {
  let families = layoutProduct.categories.filter(e => e.deep == 1)
  if (addProduct.value.val.section) {
    return families.filter(e => e.root == addProduct.value.val.section.id)
  } else {
    return families
  }
})
const categories = computed(() => {
  let category = layoutProduct.categories.filter(e => e.deep == 2)
  if (addProduct.value.val.familia) {
    return category.filter(e => e.root == addProduct.value.val.familia.id)
  } else {
    return category
  }
})

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
const filterPerson = (val, update, abort) => {
  if (val === '') {
    update(() => {
      person.value = layoutProduct.MedidasPers
    })
    return
  }

  if (val.length < 1) {
    abort()
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    person.value = layoutProduct.MedidasPers.filter(
      v => v.large.toLowerCase().includes(needle)
    )
  })
}

const createPerson = (val, done) => {
  val = val?.trim()
  if (val.length > 0) {
    const exists = layoutProduct.MedidasPers.some(item => item.large?.toLowerCase() === val.toLowerCase())
    if (!exists) {
      layoutProduct.MedidasPers.push({ large: val })
    }
    done({ large: val }, 'toggle')
  }
}

const insertProduct = () => {
  console.log(addProduct.value);
  emits('addingProduct', { ...addProduct.value.val });
  resetForm()
}

const cancelAdd = () => {
  emits('closePopup')

}

const resetForm = () => {
  addProduct.value.val= {
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
    nluces: null,
    umc: null,
    pr: null,
    mnp: null
  }
}


</script>
