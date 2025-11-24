<template>
  <q-card>
    <q-card-section class="item-center">
      <div class="row">
        <div class="text-subtitle2 col text-bold text-left text-grey text-overline">
          {{ product.category.familia.seccion.name }}
        </div>
        <div class="text-subtitle2 col text-bold text-center text-grey text-overline">
          {{ product.category.familia.name }}
        </div>
        <div class="text-subtitle2 col text-bold text-right text-grey text-overline">
          {{ product.category.name }}
        </div>
      </div>
      <div class="row">
        <div class="text-h6 col text-bold text-left">
          {{ product.code }}
        </div>
        <div class="text-h6 col text-bold text-right">
          {{ product.name }}
        </div>
      </div>
      <div class="text-subtitle2 col">{{ product.description }}</div>
      <div class="item-center row">
        <div class="col text-subtitle2 text-center"
          v-for="(price, index) in product.prices.filter(e => mostPrice.includes(e.id))" :key="index">
          <div :class="price.id == selectPrice ? 'text-weight-bold' : 'text-caption text-strike'">
            {{ price.alias }}
          </div>
          <q-separator spaced inset vertical dark />
          <div :class="price.id == selectPrice ? 'text-bold  text-blue-13' : 'text-caption'">
            {{ price.pivot.price }}
          </div>
          <q-separator spaced inset vertical dark />
        </div>
      </div>

    </q-card-section>
    <q-card-section>
      <div class="row items-end">
        <div class="text-center">
          <div class="col q-pa-xs">
            <div class="text-bold text-h6">Cantidad:</div>
            <q-btn flat color="positive" icon="add" class="text-h5" @click="product.pivot.amount++" />
            <q-separator spaced inset vertical dark />
            <div class="col column q-py-md">
              <input type="number" min="1" v-model="product.pivot.amount" class="text-center exo"
                style=" width: 100px; font-size: 3em; margin: auto auto; border: none;" />
            </div>
            <q-separator spaced inset vertical dark />
            <q-btn flat color="negative" icon="remove" class="text-h5"
              @click="product.pivot.amount > 1 ? product.pivot.amount-- : ''" />
          </div>
        </div>
        <q-separator spaced inset vertical dark />
        <div class="col q-pa-xs">
          <q-select dense filled v-model="product.units" :options="units" label="Surtir por" option-label="name"
            @update:model-value="changeUnit" />
          <q-separator spaced inset vertical dark />
          <q-input dense filled v-model="product.pivot.comments" type="text" label="Notas" />
          <q-separator spaced inset vertical dark />
          <q-list dense>
            <q-item class="bg-grey-11">
              <q-item-section class="text-left text-caption">P x C</q-item-section>
              <q-item-section class="text-bold text-center">{{ product.pieces }} pzs</q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="text-left text-caption">Cajas</q-item-section>
              <q-item-section class="text-bold text-center">{{ Number(totalPzs / product.pieces).toFixed(1) }}
              </q-item-section>
            </q-item>
            <q-item class="bg-grey-11">
              <q-item-section class="text-left text-caption">Unidades</q-item-section>
              <q-item-section class="text-bold text-center">{{ totalPzs }}
                pzs</q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="text-left text-caption">Precio</q-item-section>
              <q-item-section class="text-bold text-center">{{product.prices.find(e => e.id == selectPrice).pivot.price
                }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section class="text-left text-caption">Total</q-item-section>
              <q-item-section class="text-bold text-center">{{product.prices.find(e => e.id == selectPrice).pivot.price
                * totalPzs}} </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card-section>


    <q-card-actions>
      <q-btn flat icon="close" @click="reset" />
      <q-space />
      <q-btn flat icon="add" color="positive" v-if="!edit" @click="addProduct" :disable="validDelivered" />
      <q-btn flat icon="delete" color="negative" v-if="edit" @click="deleteProduct" />
      <q-btn flat icon="edit" color="warning" v-if="edit" @click="editProduct" :disable="validDelivered" />

    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { exportFile, useQuasar, date } from 'quasar';
import { computed, onMounted, ref, watch } from 'vue';
import orderApi from 'src/API/orderApi';
import Resourse from 'src/API/resoursesOrder';

const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const props = defineProps({
  product: { type: Object, default: {} },
  order: { type: Object, default: {} },
  edit: { type: Boolean, default: false },
  products: { type: Array, default: [] },
  rules: { type: Array, default: [] },
  units: { type: Array, default: [] },
  unit: { type: Object, default: {} }

})

const emit = defineEmits(['reset', 'addProduct', 'deleteProduct'])

const validDelivered = computed(() => !props.product.pivot.amount || props.product.pivot.amount <= 0)
const totalPzs = computed(() => props.product.pivot._supply_by == 3 ? (props.product.pivot.amount * props.product.pieces) : props.product.pivot._supply_by == 2 ? (props.product.pivot.amount * 12) : props.product.pivot.amount)

const changeUnit = () => {
  props.product.pivot._supply_by = props.product.units.id
}

const mostPrice = computed(() => {
  if (props.order.client._price_list <= 3) {
    return [1, 2, 3, 4];
  } else {
    return [props.order.client._price_list];
  }
});

const selectPrice = computed(() => {
  if (props.order.client._price_list <= 3) {
    if ((totalPzs.value >= props.product.pieces && (props.product.pivot._supply_by == 1 || props.product.pivot._supply_by == 2)) || props.product.pivot._supply_by == 3) {
      return 4;
    } else if (Resourse.verificarPrecioDocena(props.products, props.product, props.rules)) {
      return 3;
    } else if (Resourse.verificarPrecioMayoreo(props.products, props.product, props.rules)) {
      return 2;
    } else {
      return 1;
    }
  } else {
    return props.order.client._price_list;
  }
});

const reset = () => {
  emit('reset')
}

const editProduct = async () => {
  $q.loading.show({ message: 'Editando Producto' });
  let price = props.product.prices.find(e => e.id == selectPrice.value).pivot.price
  let total = totalPzs.value * price
  props.product.pivot.toDelivered = totalPzs.value
  props.product.pivot._price_list = selectPrice.value
  props.product.pivot.price = price
  props.product.pivot.total = total
  console.log(props.product.pivot)

  const resp = await orderApi.editProduct(props.product.pivot)
  if (resp.fail) {
    console.log(resp);
  } else {
    $q.loading.hide();
    reset()
    Resourse.actualizarPreciosProductos(props.products, props.order, props.rules)
  }

}

const addProduct = async () => {
  $q.loading.show({ message: 'Agregando producto' })
  let price = props.product.prices.find(e => e.id == selectPrice.value).pivot.price
  let total = totalPzs.value * price
  props.product.pivot.toDelivered = totalPzs.value
  props.product.pivot._price_list = selectPrice.value
  props.product.pivot.price = price
  props.product.pivot.total = total
  props.product.pivot._product = props.product.id
  props.product.pivot._order = props.order.id

  console.log(props.product.pivot)
  const resp = await orderApi.addProduct(props.product.pivot)
  if (resp.fail) {
    console.log(resp);
  } else {
    emit('addProduct', props.product);
    $q.loading.hide()
    Resourse.actualizarPreciosProductos(props.products, props.order, props.rules)
  }
}

const deleteProduct = async () => {
  $q.loading.show({ message: 'Eliminando Producto' })
  // console.log(props.product.pivot)
  const resp = await orderApi.deleteProduct(props.product.pivot)
  if (resp.fail) {
    console.log(resp);
  } else {
    emit('deleteProduct', props.product);
    $q.loading.hide()
    Resourse.actualizarPreciosProductos(props.products, props.order, props.rules)
  }
}


watch(totalPzs, (val) => {
  // console.log(val)
  props.product.pivot.units = val
},
  props.product.units, (val) => {
    props.product.pivot._supply_by = val.id
  },
  { immediate: true }
)
onMounted(() => {
  if (!props.product.pivot._supply_by && props.units.length) {
    props.product.pivot._supply_by = props.product.units
  }

  if (!props.product.pivot.amount) {
    props.product.pivot.amount = 1
  }
  // if (!props.product.pivot._supply_by) {
    props.product.pivot.units = totalPzs.value
  // }

})


</script>
