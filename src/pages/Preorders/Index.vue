<template>
  <q-page padding>
    <div :class="!ismobile ? 'row' : ''">
      <q-table :class="!ismobile ? 'col' : ''" :rows="filteredOrders" :columns="table.columns" :filter="table.filter"
        :pagination="pagination" row-key="id" :row-class="row => selectedOrder?.id === row.id ? 'bg-blue-1' : ''"
        @row-click="onOrderClick" @row-dblclick="routPush"  >
        <template v-slot:top-right>
          <q-select v-model="status" :options="$orderStore.process" label="Estado" filled style="width: 130px;" dense
            option-label="name">
            <template v-if="status" v-slot:append>
              <q-icon name="cancel" @click.stop.prevent="status = null" class="cursor-pointer" />
            </template>
          </q-select>

          <q-btn class="q-ml-md" icon="filter_alt_off" flat dense @click="clearFilters"
            v-if="selectedUser || selectedOrder || status" />

          <q-separator spaced inset vertical dark />

          <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
      <q-separator spaced inset vertical dark />

      <q-table :class="!ismobile ? 'col' : ''" :rows="filteredUsers" :columns="tableUsers.columns"
        :filter="tableUsers.filter" :pagination="pagination" row-key="id"
        :row-class="row => selectedUser?.id === row.id ? 'bg-blue-1' : ''" @row-click="onUserClick">
        <!-- <template v-slot:body="props" >

          <q-tr :props="props" :class="props.row.id === selectedUser?.id ? 'selected-user' : ''">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template> -->
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="tableUsers.filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>


    </div>




  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import catalogApi from 'src/API/catalogApi'
import orderApi from 'src/API/orderApi'
import { vizmedia } from "boot/axios"
import { useVDBStore } from 'stores/VDB';
import { useOrderStore } from 'stores/OrderStore';
import { colors, useQuasar } from 'quasar';
import UserToolbar from "src/components/UserToolbar.vue";
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import { $sktOrders } from 'boot/socket';
import { $sktRestock } from 'boot/socket';
// import print from 'src/API/print';
const $route = useRoute();
const $router = useRouter();
const $orderStore = useOrderStore();
$orderStore.setTitle('INICIO');
$orderStore.setshowLyt(true);
$orderStore.setShowEvent(true);

const $q = useQuasar();
const VDB = useVDBStore()
const selectedUser = ref(null);   // usuario filtrado
const selectedOrder = ref(null);  // orden filtrada


const pagination = ref({ rowsPerPage: 10 })

const status = ref(null);
const table = ref({
  columns: [
    { name: 'id', label: 'FOLIO', field: r => r.id, align: 'left', sortable: true },
    { name: 'created', label: 'Creado Por', field: r => `${r.created_by?.names} ${r.created_by?.surname_pat} ${r.created_by?.surname_mat}`, align: 'left', sortable: true },
    { name: 'client', label: 'CLIENTE', field: r => r.name, align: 'left', sortable: true },
    { name: 'status', label: 'ESTADO', field: r => r.status?.name, align: 'center', classes: r => `text-${colorStatus.value[r.status.id - 1]}`, sortable: true },
    { name: 'created_time', label: 'HORA', field: r => dayjs(r.created_at).format('HH:mm:ss'), align: 'center', sortable: true },
  ],
  filter: null
})

const tableUsers = ref({
  columns: [
    { name: 'id', label: 'ID', field: r => r.id, sortable: true, align: 'left' },
    { name: 'name', label: 'Nombre', field: r => `${r.names} ${r.surname_pat} ${r.surname_mat}`, sortable: true, align: 'left' },
    { name: 'pedidos', label: 'Pedidos', field: r => r.filteredCount, sortable: true, align: 'center' },
  ],
  filter: null
})

const colorStatus = ref([
  "grey-6",
  "red-5",
  "deep-orange-10",
  "blue-4",
  "blue-10",
  "teal-4",
  "teal-10",
  "green-5",
  "green-10",
  "light-green-10",
])

const ismobile = computed(() => $q.platform.is.mobile)

const filteredOrders = computed(() => {
  let data = $orderStore.orders;

  if (selectedUser.value) {
    data = data.filter(o => o._created_by === selectedUser.value.id);
  }

  if (status.value) {
    data = data.filter(o => o._status === status.value.id);
  }

  if (selectedOrder.value) {
    data = data.filter(o => o.id === selectedOrder.value.id);
  }

  return data;
});

const filteredUsers = computed(() => {
  return $orderStore.users
    .map(user => {
      let orders = user.orders;
      if (selectedOrder.value) {
        orders = orders.filter(o => o.id === selectedOrder.value.id);
      }
      if (status.value) {
        orders = orders.filter(o => o._status === status.value.id);
      }
      if (selectedUser.value && selectedUser.value.id !== user.id) {
        orders = [];
      }
      return {
        ...user,
        filteredOrders: orders,
        filteredCount: orders.length
      };
    })
    .filter(u => u.filteredCount > 0 || (!status.value && !selectedOrder.value && !selectedUser.value));
});
const onUserClick = (evt, row) => {
  selectedUser.value = row;
  selectedOrder.value = null;
}

const onOrderClick = (evt, row) => {
  selectedOrder.value = row;
  selectedUser.value = null;
}

const clearFilters = () => {
  selectedUser.value = null;
  selectedOrder.value = null;
  status.value = null;
}

const routPush = (a,b) => {
   $router.push(`/preorders/pedidos/${b.id}`);
}

watch(status, () => {
  selectedOrder.value = null;
  selectedUser.value = null;
});
</script>
<style scoped>
.selected-user {
  background: #e0f7fa !important;
  border-left: 4px solid #00838f !important;
  font-weight: bold;
}
</style>
