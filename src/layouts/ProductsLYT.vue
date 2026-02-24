<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

      <UserToolbar />
      <q-separator/>
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">{{ layoutProduct.title }}</span></div>
      </q-toolbar>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import { useProductStore } from 'stores/ProductsStore';
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useVDBStore } from 'stores/VDB';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import productApi from 'src/API/productsApi.js';
import { useQuasar, date } from 'quasar';
const layoutProduct = useProductStore();

const VDB = useVDBStore();
const $q = useQuasar();

const init = async () => {
  $q.loading.show({message:'Obteniendo Datos'})
  const resp = await productApi.index();
  if(resp.fail){
    console.log(resp);
  }else{
    console.log(resp);
    layoutProduct.setCategories(resp.categories);
    layoutProduct.setMakers(resp.makers);
    layoutProduct.setProviders(resp.providers);
    layoutProduct.setUnits(resp.units);
    layoutProduct.setAttributes(resp.attributes);
    layoutProduct.setStates(resp.states);
    layoutProduct.setStores(resp.stores);
    $q.loading.hide()
  }
}

init();
</script>
