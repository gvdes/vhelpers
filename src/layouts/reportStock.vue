<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>
          Helpers <q-icon name="navigate_next" color="primary" />
          <span class="text-h6">Reporte Stocks</span>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>

        <q-table :rows="allReport" :loading="loading" :columns="table.columns" :pagination="table.pagination"/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';
import dbCompare from 'src/API/compareApi';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import axios from 'axios';//para dirigirme bro

const VDB = useVDBStore();
const $q = useQuasar();

const products = ref([]);
const categories = ref([]);
const compras = ref([]);
const allReport = ref([]);
const table = ref({
  pagination: {
    rowsPerPage: 20,
  },
  columns: [
    { name: 'code', label: 'Codigo', align: 'left', field: r => r.code },
    { name: 'description', label: 'Descripcion', align: 'left', field: r => r.description },
    { name: 'section', label: 'Seccion', align: 'left', field: r => r.categories.familia.seccion?.name },
    { name: 'family', label: 'Familia', align: 'left', field: r => r.categories.familia?.name },
    { name: 'category', label: 'Categoria', align: 'left', field: r => r.categories?.name },
    { name: 'pxc', label: 'PXC', align: 'center', field: r => r.pieces },
    { name: 'stock', label: 'Stock', align: 'center', field: r => r.total_stock },
    { name: 'venta', label: 'Venta', align: 'center', field: r => r.total_venta },
    { name: 'compra', label: 'Compra', align: 'center', field: r => r.compras },


  ]
});

const loading = ref(false); // Controlar el estado de carga

// Función para inicializar y obtener los datos
const init = async () => {
  loading.value = true;
  try {
    const resp = await dbCompare.getProductReport();
    if (resp.fail) {
      console.error("Error al obtener los datos:", resp.fail);
    } else {
      console.log(resp)
      products.value = resp.products;
      allReport.value = products.value.map(e => {
        const compra = compras.value.find(c => c.ARTLFR == e.code) || { COMPRA: 0 }
        return {
          ...e,
          compras: Number(compra.COMPRA)
        }
      })
      console.log(allReport.value)
      categories.value = resp.families;
    }
  } catch (error) {
    console.error("Error durante la carga de datos:", error);
    $q.notify({ message: "Error al cargar los datos", type: "negative" });
  } finally {
    loading.value = false;
  }
};

const index = async () => {
  // let host = '192.168.10.53:1619';
  let host = '192.168.10.160:1619';

  let url = `http://${host}/storetools/public/api/Products/getReceived`;
  axios.get(url)
    .then(r => {
      console.log(r.data)
      compras.value = r.data;
      init()
    })
    .catch(f => {
      console.log(f)
    })
}

// Verificar permisos y cargar datos
if (VDB.session.rol === "aux" || VDB.session.rol === "gen" || VDB.session.rol === "aud" || VDB.session.rol === "root") {
  index();
} else {
  $q.notify({ message: "No tienes acceso a esta página", type: "negative", position: "center" });
  $router.replace("/");
}

</script>
