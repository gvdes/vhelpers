<template>
  <q-page padding>
    <q-table flat row-key="id" :rows="ordersdb" :columns="table.columns" :filter="table.filter"
      :pagination="table.pagination">
      <template v-slot:top>
        <div class="full-width row items-center">
          <div class="col text-h6 text-dark">Pedidos: {{ ordersdb.length }}</div>
          <q-input dense v-model="table.filter" input-class="text-uppercase" placeholder="Buscar" color="pink-5">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
// import RestockApi from 'src/API/RestockApi.js';
import { useRestockStore } from 'stores/Restock';
// import OrderViewer from 'src/components/Restock/OrderViewer.vue';

const $route = useRoute();
const $router = useRouter();
const $restockStore = useRestockStore();

const props = defineProps({
  dash: { type: Object, default: {} },
})

const table = ref({
  columns: [
    { name: 'id', label: 'Folio', field: 'id', align: "center" },
    {
      name: 'state',
      label: 'Estado',
      field: row => row.log.length == 1 ? row.log[0].name : row.log[row.log.length - 1].name,
      align: "left",
      sortable: true,
      classes: row => row._status == 3 ? 'text-positive text-bold' : '',
    },
    { name: 'laststate', label: 'Ultima actividad', field: row => dayjs(row.log.find(l => l.id == row.status.id).pivot.updated_at).format('YYYY-MM-DD hh:mm A'), align: "left" },
    { name: 'from', label: 'Sucursal', field: row => row.from.name.toUpperCase(), align: "left", sortable: true },
    { name: 'models', label: 'Modelos', field: 'products_count', align: "center" },
    { name: 'notes', label: 'Notas', field: row => row.notes, align: "left" },
    { name: 'invoice', label: 'Salida', field: row => row.invoice ?? '--', align: "center" },
  ],
  filter: '',
  pagination: {
    sortBy: 'desc',
    descending: false,
    rowsPerPage: 20
  }
});

// const open = (q, row, c) => $router.push(`/distribute/supply/${row.id}`);

// const ordersSize = computed(() => $restockStore.ordersSize);
const ordersdb = computed(() => $restockStore.ordersdb.filter(o =>  o._status == 3))


const setOrderViewer = async (evt, row, idx) => {
  orderViewer.value.head = row;
  orderViewer.value.state = true;
}
</script>
