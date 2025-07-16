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
    </q-card-section>
    <q-card-section class="item-center">
      <div class="row">
        <div class="text-h6 col text-bold text-left">
          {{ product.code }}
        </div>
        <div class="text-h6 col text-bold text-right">
          {{ product.name }}
        </div>
      </div>
      <div class="text-subtitle2 col">{{ product.description }}</div>
    </q-card-section>
    <q-card-section class="item-center row">
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
    </q-card-section>
    <q-card-section>
      <div class="row items-start justify-between">
        <div class="text-center col text-primary ">
          <div>Solicitud</div>
          <div class="text-bold ">{{ product.pivot.amount }} {{ product.pivot._supply_by == 3 ?
            `Caja${product.pivot.amount != 1 ? 's' : ''}` : product.pivot._supply_by == 2 ?
              `Docena${product.pivot.amount != 1 ? 's' : ''}` :
              `Pieza${product.pivot.amount != 1 ? 's' : ''}` }}
          </div>
          <div class="text-caption">
            {{ `(${product.pivot.units} Pzs)` }}
          </div>
        </div>

        <div class="text-center col ">
          <div>PxC</div>
          <q-input dense borderless v-model="product.pieces" type="number" input-class="text-h6 text-center"
            :disable="product.pivot._supply_by != 3"  />
        </div>

        <div class="text-center col ">
          <div class="text-bold text-caption">{{ product.pivot._supply_by == 3 ? 'Cajas' :
            product.pivot._supply_by == 2 ? 'Docenas' : 'Piezas' }} </div>
          <q-input autofocus dense borderless v-model="product.pivot.amountDelivered" type="number" min="0"
            input-class="text-center text-bold text-h6" ref="iptcounter" />
        </div>

        <div class="text-center col ">
          <div>Piezas</div>
          <div class="text-bold">{{ totalPzs }}</div>
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
import { computed, ref } from 'vue';
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
  rules: { type: Array, default: [] }
})

const emit = defineEmits(['reset', 'addProduct', 'deleteProduct'])

const validDelivered = computed(() => !props.product.pivot.amountDelivered || props.product.pivot.amountDelivered <= 0)
const totalPzs = computed(() => props.product.pivot._supply_by == 3 ? (props.product.pivot.amountDelivered * props.product.pieces) : props.product.pivot._supply_by == 2 ? (props.product.pivot.amountDelivered * 12) : props.product.pivot.amountDelivered)


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
  // console.log(props.product.pivot)

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
  // console.log(props.product)
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


</script>
