<template>
  <q-page padding>
      <q-table  :rows="categories" row-key="id" grid :pagination="table.pagination" :columns="table.columns" hide-bottom @row-click="changeRoute" >
      </q-table>
  </q-page>
</template>

<script setup>
import { ref, computed, watch,onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import catalogApi from 'src/API/catalogApi'
import { useVDBStore } from 'stores/VDB';
import { catalogStore } from 'stores/catalogStore';
import { useQuasar } from 'quasar';
import UserToolbar from "src/components/UserToolbar.vue";
import { $sktRestock } from 'boot/socket';
import PrinterSelect from 'src/components/Restock/PrinterSelect.vue';
const $route = useRoute();
const $router = useRouter();
const $catalogStore = catalogStore();
const $q = useQuasar();
const VDB = useVDBStore()
const categories = ref([])
const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: r => r.id, align: 'center' },
    { name: 'name', label: 'Nombre', field: r => r.name, align: 'left' },
    { name: 'alias', label: 'ALIAS', field: r => r.alias, align: 'center' },

  ],
  pagination: { rowsPerPage: 10 }
})

const init = async () => {

  $q.loading.show({message:'Obteniendo Hijos'})
  console.log($route.params.sid);
  const root = $route.params.sid
  const resp = await catalogApi.getFamilys(root)
  if(resp.fail){
    console.log(resp);
  }else{
    categories.value = resp.children
      $catalogStore.setTitle(`Seccion ${resp.name}`)
    console.log(resp)
    $q.loading.hide();
  }

}




const changeRoute = (a,b) => {
  console.log(b)
  $router.push(`/catalog/${b.root}/${b.id}`)
}


init();
</script>
