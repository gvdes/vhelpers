<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between row">
        <div class="col">
          <span class="">Helpers</span>
          <q-icon name="navigate_next" color="" />
          <span class="text-h6">Información Producto</span>
        </div>
      </q-toolbar>
    </q-header class="q-ml-md">
    <q-page-container>
      <q-page padding>

        <div class="row justify-center">
          <transition name="bounce">
            <q-card class="my-card" v-if="product">
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
                  <div class=" col text-bold text-center">
                    <div class="text-caption">Stock</div>
                    <div>{{ product.total_stock }}</div>
                  </div>
                  <div class="text-h6 col text-bold text-right">
                    {{ product.name }}
                  </div>
                </div>
                <div class="text-subtitle2 col">{{ product.description }}</div>
              </q-card-section>
              <q-card-section class="item-center row">
                <div class="col text-subtitle2 text-center" v-for="(price, index) in product.prices" :key="index">
                  <div class="text-weight-bold">
                    {{ price.alias }}
                  </div>
                  <q-separator spaced inset vertical dark />
                  <div class="text-bold  text-blue-13">
                    {{ price.pivot.price }}
                  </div>
                  <q-separator spaced inset vertical dark />
                </div>
              </q-card-section>
              <q-card-section>
                <q-table :rows="product.details" hideBottom :columns="table.columns" :pagination="{ rowsPerPage: 0 }">
                  <template v-slot:bottom-row>
                    <q-tr class="text-bold text-dark bg-yellow-12">
                      <q-td class="text-center">
                        Total
                      </q-td>
                      <q-td class="text-center">
                        {{ product.details.reduce((a,r) => a + Number(r.compras), 0) }}
                      </q-td>
                      <q-td class="text-center">
                        {{ product.details.reduce((a,r) => a + Number(r.ventas), 0) }}
                      </q-td>
                    </q-tr>
                  </template></q-table>
              </q-card-section>
            </q-card>
          </transition>
        </div>

        <q-footer reveal elevated bordered>
          <q-separator spaced inset vertical dark />
          <div class="row q-ml-sm">
            <q-card class="col">
              <ProductAutocomplete :checkState="false" @input="add" with_prices_Invoice with_stock
                with_locations />
            </q-card>
            <q-separator spaced inset vertical dark />
          </div>
          <q-separator spaced inset vertical dark />
        </q-footer>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import ProductAutocomplete from 'src/components/Products/ProductAutocomplete.vue';// encabezado aoiida
import UserToolbar from "src/components/UserToolbar.vue";
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { exportFile, useQuasar, date } from 'quasar';
import { computed, ref } from 'vue';
import productApi from "src/API/productsApi";

const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const product = ref(null);
const table = ref({
  columns: [
    { name: 'anio', label: 'AÑO', field: 'year', align: 'center' },
    { name: 'sales', label: 'COMPRAS', field: 'compras', align: 'center' },
    { name: 'purchases', label: 'VENTAS', field: 'ventas', align: 'center' },
  ]
})
const add = (opt) => {
  // CODIGO DE BARRAS
  console.log(opt);
  getProduct(opt.id)
}

// const agregar = (ops) => {
//   //BUSQUEDA
//   // console.log(ops)
//   // getProduct(ops.id)
// }

const getProduct = async (id) => {
  $q.loading.show({ message: 'Obteniendo Datos' });
  product.value = null
  console.log(id)
  const resp = await productApi.getProduct(id)
  if (resp.fail) {
    console.log(resp);
  } else {
    $q.loading.hide();
    console.log(resp)
    resp.prices.push({ id: 8, alias: "COS", pivot: { price: resp.cost } })
    resp.prices.sort((a, b) => b.id - a.id);
    product.value = resp;
  }
}


</script>
<style>
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
</style>
