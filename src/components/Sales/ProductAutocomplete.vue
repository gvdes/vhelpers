<template>
  <div class="QuickRegular row items-center">
    <q-btn color="primary" icon="search" @click="infProduct" dense rounded outline />
    <q-separator spaced inset vertical dark />
    <q-input ref="iptatc" :loading="data.iptsearch.processing" :disable="data.iptsearch.processing"
      v-model="product.code" dense filled color="blue-13" class="text-uppercase " @keypress.enter="search"
      autocomplete="off" autofocus label="Codigo...">
    </q-input>
    <q-separator spaced inset vertical dark />
    <q-input v-model="product.description" type="text" label="Descripcion..." class="col" filled dense disable />
    <q-separator spaced inset vertical dark />
    <q-input ref="iptmount" v-model="product.pivot.units" type="number" label="Cantidad..." dense min="1" step="1" :bg-color="automate ? 'negative'  : ''"
      outlined @keypress="($event.key === '.' || $event.key === '-') && $event.preventDefault()" @update:model-value="val => {
        if (val < 0) product.pivot.units = 1
      }" @keypress.enter="selItem" :disable="!product.id" />
    <q-separator spaced inset vertical dark />
    <q-select disable v-model="selectedPrice" :options="priceOptions" dense filled emit-value map-options class="col-2"
      label="Precio">
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <div :class="{
              'text-weight-bold': scope.opt.value === selectPrice,
              'text-grey-6': scope.opt.value !== selectPrice
            }">
              {{ scope.opt.label }}
            </div>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-separator spaced inset vertical dark />
    <q-input v-model="product.pivot.total" type="number" label="Total..." filled dense disable />
  </div>



</template>

<script setup>
import dbproduct from 'src/API/productsApi'
import { ref, onMounted, computed, nextTick, watch, onBeforeUnmount } from 'vue'
import { exportFile, useQuasar } from 'quasar';
import { useVDBStore } from 'src/stores/VDB';
import Resourse from 'src/API/resoursesOrder';
const $q = useQuasar();
const $user = useVDBStore();


const props = defineProps({
  _price_list: { type: Number, default: 1 },
  edit: { type: Boolean, default: false },
  products: { type: Array, default: [] },
  rules: { type: Array, default: [] },
  promotion: { type: Array, default: [] },
  automate:{type:Boolean, default:false},
})
const createPivot = () => ({
  amount: 0,
  amountDelivered: 1,
  price: 0,
  toDelivered: 0,
  total: 0,
  units: 1,
  _price_list: 1,
  _supply_by: 1
})
const product = ref({
  code: '',
  description: null,
  cantidad: 1,
  pivot: createPivot()

});
const selectedPrice = ref(null);


const emit = defineEmits(['input', 'addProduct','infProduct']);

const data = ref({
  target: "",
  iptsearch: { processing: false },
})
const iptatc = ref(null)
const iptmount = ref(null)

const attrs = computed(() => {
  return {
    "autocomplete": product.value.code,
    "_workpoint": $user.session.store.id_viz,
  }
})
const reset = () => {
  product.value = {
    code: '',
    description: null,
    cantidad: 1,
    pivot: createPivot()
  }
  selectedPrice.value = null
}

const selItem = () => {
  const copy = JSON.parse(JSON.stringify(product.value))
  emit('input', copy)
  reset()
}
const search = async () => {
  // console.log(attrs.value)/
  product.value.code.trim().toUpperCase();
  if (product.value.code.length) {
    data.value.iptsearch.processing = true;
    const resp = await dbproduct.autocomplete(attrs.value)
    if (resp.fail) {
      console.log(resp);
    } else {
      // console.log(resp)
      switch (Object.keys(resp).length) {
        case 0:
          let code = data.value.target;
          $q.notify({
            message: `Sin resultados para <b>${code}</b>`,
            color: 'negative',
            icon: 'fas fa-times',
            html: true,
            timeout: 1000,
            position: 'center'
          });
          putFocus();
          reset()
          break;
        default:
          if(resp.stock.gen <= 0){
            $q.notify({message:'Se generara negativo de este modelo',position:'top',type:'negative'})
          }
          product.value = {
            pivot: createPivot(),
            ...resp
          }
          if(props.automate){
            selItem()
          }
          nextTick(() => {
            iptmount.value.focus()
            iptmount.value.select()

          })
          break;
      }
      data.value.iptsearch.processing = false;
    }
  }
}

const selectPrice = computed(() => {
  if (!product.value?.id) return null;
  const productosEvaluar = [...props.products, product.value];
  // console.log(props._price_list)
  if (props._price_list <= 3) {
    if (Resourse.verificarPrecioCaja(productosEvaluar, product.value, props.rules)) {
      return 4;
    } else if (Resourse.verificarPrecioDocena(productosEvaluar, product.value, props.rules)) {
      return 3;
    } else if (Resourse.verificarPrecioMayoreo(productosEvaluar, product.value, props.rules)) {
      return 2;
    } else {
      return 1;
    }
  } else {
    return props._price_list;
  }
});

const priceOptions = computed(() => {
  if (!product.value?.prices) return [];

  return product.value.prices.map(p => ({
    label: `${p.alias} - $${p.pivot.price}`,
    value: p.id,
    price: p.pivot.price
  }));
});

const putFocus = () => {
  nextTick(() => {
    iptatc.value.focus();
  })
}

defineExpose({ focus: () => iptatc.value?.focus?.() })

watch(selectPrice, (val) => {
  if (val) {
    selectedPrice.value = val;
  }
});

watch(selectedPrice, (val) => {
  if (!val) return;
  const prices = product.value?.prices || [];
  const priceData = prices.find(p => p.id === val);
  if (!priceData) return;
  product.value.pivot._price_list = val;
  product.value.pivot.price = priceData.pivot.price;
  product.value.pivot.total = product.value.pivot.units * priceData.pivot.price;
})

const handleKeyDown = (e) => {
  if (e.altKey && e.key === 'Delete') {
    e.preventDefault()
    reset();
    putFocus()
  } else if (e.key === 'F1') {
    e.preventDefault()
    infProduct()
  }
}

const infProduct = () => {
  console.log('si ya tengo precodigos busco si no nel ')
  emit('infProduct', product.value.code)
  product.value.code = ''
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>
