<template>
  <q-page padding>
      <!-- <q-page padding> -->
      <q-table  :rows="categories" row-key="id" grid :pagination="table.pagination" :columns="table.columns" hide-bottom @row-click="changeRoute" >
      </q-table>
      <!-- </q-page> -->
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
  $catalogStore.setTitle('Secciones')
  $q.loading.show({message:'Obteniendo Datos'})
  const resp = await catalogApi.index()
  if (resp.fail) {
    console.error(resp)
  } else {
    $q.loading.hide()
    categories.value = resp
  }
}

// const buildTree = (list) => {
//   const map = {}
//   list.forEach(item => {
//     map[item.id] = {
//       id: item.id,
//       label: item.name,
//       alias: item.alias,
//       num: item.num,
//       children: []
//     }
//   })

//   const tree = []
//   list.forEach(item => {
//     if (item.deep === 0) {
//       tree.push(map[item.id])
//     } else {
//       const parent = map[item.root]
//       if (parent) parent.children.push(map[item.id])
//     }
//   })

//   return tree
// }
// const treeData = computed(() => buildTree(categories.value))
const changeRoute = (a,b) => {
  console.log(b)
  $router.push(`/catalog/${b.id}`)
}

onMounted(() => {
  init()
})
</script>
