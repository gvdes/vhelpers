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

      <div class="text-center">
        <div class="q-pa-xs">
          <div class="text-bold text-h6">Cantidad:</div>

          <div class="row items-center justify-center q-gutter-md">
            <q-btn flat color="negative" icon="remove" class="text-h5"
              @click="product.pivot.units > 1 ? product.pivot.units-- : ''" />

            <q-input v-model.number="product.pivot.units" type="number" outlined min="1" step="1"
              input-class="text-center text-h3" style="width: 100px" autofocus
              @keydown.enter="edit ? editProduct() : addProduct()"
              @keypress="($event.key === '.' || $event.key === '-') && $event.preventDefault()" @update:model-value="val => {
                if (!val) {
                  product.pivot.units = 1
                }
                else if (val < 1) {
                  product.pivot.units = 1
                }
                else if (!Number.isInteger(val)) {
                  product.pivot.units = Math.floor(val)
                }
              }" />

            <!-- <q-input type="number" min="1" v-model="product.pivot.amountDelivered" class="text-center exo" step="1"
              style="width: 100px; font-size: 3em; border: none;" autofocus  @keydown.enter="edit ? editProduct() : addProduct() " /> -->

            <!-- <input /> -->

            <q-btn flat color="positive" icon="add" class="text-h5" @click="product.pivot.units++" />
          </div>
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
import Resourse from 'src/API/resoursesOrder';

const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const props = defineProps({
  product: { type: Object, default: {} },
  _price_list: { type: Number, default: 1 },
  edit: { type: Boolean, default: false },
  products: { type: Array, default: [] },
  rules: { type: Array, default: [] },
  promotion: { type: Array, default: [] },
})



const emit = defineEmits(['reset', 'addProduct', 'deleteProduct', 'editProduct'])

const validDelivered = computed(() => !props.product.pivot.units || props.product.pivot.units <= 0)
const totalPzs = computed(() => props.product.pivot.units)


const mostPrice = computed(() => {
  if (props._price_list <= 3) {
    return [1, 2, 3, 4];
  } else {
    return [props._price_list];
  }
});

const selectPrice = computed(() => {
  console.log(props._price_list)
  if (props._price_list <= 3) {
    // if ((totalPzs.value >= props.product.pieces && (props.product.pivot._supply_by == 1 || props.product.pivot._supply_by == 2)) || props.product.pivot._supply_by == 3) {
    //   return 4;
    // }
    if (Resourse.verificarPrecioCaja(props.products, props.product, props.rules)) {
      return 4;
    } else if (Resourse.verificarPrecioDocena(props.products, props.product, props.rules)) {
      return 3;
    } else if (Resourse.verificarPrecioMayoreo(props.products, props.product, props.rules)) {
      return 2;
    } else {
      return 1;
    }
  } else {
    return props._price_list;
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
  $q.loading.hide();
  reset()
  Resourse.aplicarPromociones(props.products, props.promotion)
  Resourse.actualizarPreciosProductosSales(props.products, props._price_list, props.rules)
  emit('editProduct')

}

const addProduct = async () => {
  if (!props.product.pivot.units || props.product.pivot.units < 1) {
    props.product.pivot.units = 1
  }
  $q.loading.show({ message: 'Agregando producto' })
  let price = props.product.prices.find(e => e.id == selectPrice.value).pivot.price
  let total = totalPzs.value * price
  props.product.pivot.toDelivered = totalPzs.value
  props.product.pivot._price_list = selectPrice.value
  props.product.pivot.price = price
  props.product.pivot.total = total
  props.product.pivot._product = props.product.id
  console.log(props.product)
  emit('addProduct', props.product);
  $q.loading.hide()
  Resourse.aplicarPromociones(props.products, props.promotion)
  Resourse.actualizarPreciosProductosSales(props.products, props._price_list, props.rules)
  // }
}

const deleteProduct = async () => {
  $q.loading.show({ message: 'Eliminando Producto' })

  emit('deleteProduct', props.product);
  $q.loading.hide()
  Resourse.aplicarPromociones(props.products, props.promotion)
  Resourse.actualizarPreciosProductosSales(props.products, props._price_list, props.rules)
  // }
}


</script>
