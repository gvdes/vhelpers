<template>
  <q-page padding class="bg-grey-2">
    <div v-if="orderserrors.length" class="bg-negative text-white q-pa-md q-mb-md">
      <div class="text-warning text-bold">Los siguientes folios tienen errores que no permiten ser listados en la tabla.
      </div>
      <div class="text-h6">{{orderserrors.map(o => o.id).join('id')}}</div>
      <div class="text--2">Errores comunes: Sin log, Sin fecha, Estatus desconocido</div>
    </div>

    <div class="row q-mb-md items-start justify-around">
      <q-btn stack no-caps class="q-py-md" v-for="stat in stats" :key="stat.key" @click="report(stat.key)"
        :color="stat.total == 0 ? 'teal-10' : 'pink-13'" :disabled="stat.total == 0">
        <div class="text-left">
          <div class="text-h5">{{ stat.total }}</div>
          <div class="text--2">{{ stat.name }}</div>
        </div>
      </q-btn>
    </div>

    <q-table flat bordered row-key="id" :rows="ordersok" :columns="table.columns" :filter="table.filter"
      :pagination="table.pagination">

      <template v-slot:top>
        <div class="full-width row items-center">
          <div class="col text-h6 text-dark">Pedidos: {{ ordersSize }}</div>
          <q-input dense v-model="table.filter" input-class="text-uppercase" placeholder="Buscar" color="pink-5">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-separator spaced inset vertical dark />
          <div><q-icon name="archive" size="md" color="negative" @click="removes" /></div>
        </div>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>


      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" dense round flat @click="props.expand = !props.expand"
              :icon="props.expand ? 'expand_less' : 'expand_more'" v-if="props.row" />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props" @click="setOrderViewer(props)">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-list dense padding class="rounded-borders">
              <q-item>
                <q-item-section>ID</q-item-section>
                <q-item-section>ESTADO</q-item-section>
                <q-item-section>Utima Actividad</q-item-section>
                <q-item-section v-if="props.row.from._type == 2">SALIDA</q-item-section>
                <q-item-section v-if="props.row.from._type == 2">ENTRADA</q-item-section>
                <q-item-section v-if="props.row.from._type == 1">TRASPASO</q-item-section>

              </q-item>
              <div v-for="(partition, index) in props.row.partition" :key="index">
                <q-item>
                  <q-item-section>
                    <q-item-label overline>
                      {{ partition._suplier }}
                    </q-item-label>
                    <q-item-label caption>
                      {{ partition.id }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section :class="`${colorCellState[partition.status.id - 1]}`"> {{ partition.status.name
                  }}</q-item-section>
                  <!-- <q-item-section> {{ dayjs(partition.log.find(l => l.id == partition.status.id).pivot.updated_at).format('YYYY-MM-DD hh:mm A')}}</q-item-section> -->
                  <q-item-section> {{ dayjs(partition.log?.find(e => e.id == partition._status)?.pivot.updated_at).format('YYYY-MM-DD HH:mm:ss') }}</q-item-section>
                  <q-item-section v-if="props.row.from._type == 2"> {{ partition.invoice }}</q-item-section>
                  <q-item-section v-if="props.row.from._type == 2"> {{ partition.invoice_received }}</q-item-section>
                  <q-item-section v-if="props.row.from._type == 1"> {{ partition.invoice }}</q-item-section>
                </q-item>
                <q-separator spaced inset />
              </div>
            </q-list>

          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog full-width v-model="orderViewer.state" :persistent="orderViewer.block" :no-esc-dismiss="orderViewer.block"
      :no-backdrop-dismiss="orderViewer.block">
      <OrderViewer :head="orderViewer.head" @loaded="orderViewer.block = false" @loading="orderViewer.block = true"
        @fresh="fresh" @chofiAssigned="fresh" />
    </q-dialog>

    <q-dialog v-model="wndReport.state">
      <TableReport :rows="wndReport.data" :name="wndReport.name" :type="wndReport.type"
        @cardResumeActived="reloadDashboard" />
    </q-dialog>

    <q-dialog v-model="wndRemove" full-width>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="q-pt-none">
          <q-table flat bordered row-key="id" :rows="orderrem" :columns="table.columns" :pagination="table.pagination"
            title="Pedidos Cancelados"></q-table>
        </q-card-section>

      </q-card>

    </q-dialog>


  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { useQuasar } from 'quasar';
import RestockApi from 'src/API/RestockApi.js';
import { useRestockStore } from 'stores/Restock';
import OrderViewer from 'src/components/Restock/OrderViewer.vue';
import TableReport from 'src/components/Restock/TableReport.vue';

const $route = useRoute();
const $router = useRouter();
const VDB = useVDBStore();
const $restockStore = useRestockStore();
const $q = useQuasar();
const colorCellState = [
  'text-grey-5 text-bold',
  'text-bold text-h6 text-red',
  'text-indigo',
  '4',
  '5',
  'text-bold text-pink-7',
  'text-orange-8',
  '8',
  'text-primary',
  'text-positive'
];

const props = defineProps({
  dash: { type: Object, default: {} },
})
const $emit = defineEmits(["reloadDashboard", "freshOrder"]);
const table = ref({
  columns: [
    { name: 'id', label: 'Folio', field: 'id', align: "center", sortable: true },
    {
      name: 'state',
      label: 'Estado',
      field: row => (row.log.length == 1 ? row.log[0].name : row.log[row.log.length - 1].name),
      align: "left",
      sortable: true,
      sort: (a, b, rowA, rowB) => parseInt(rowA._status) - parseInt(rowB._status),
      classes: row => colorCellState[(row._status ? parseInt(row._status) - 1 : parseInt(row.status.id) - 1)],
    },
    { name: 'suplier', label: 'Surtidores', field: row => row.partition?.length, align: "center", classes: "text-bold" },
    {
      name: 'laststate',
      label: 'Ultima actividad',
      field: row => dayjs(row.log.find(l => l.id == row.status.id).pivot.updated_at).format('YYYY-MM-DD hh:mm A'),
      align: "left"
    },
    { name: 'from', label: 'Sucursal', field: row => row.from.name.toUpperCase(), align: "left", sortable: true },
    { name: 'to', label: 'Destino', field: row => row.to.name.toUpperCase(), align: "left", sortable: true },
    { name: 'notes', label: 'Notas', field: row => row.notes, align: "left", classes: 'text-orange text-bold' },
    { name: 'tmodels', label: 'Modelos', field: row => row.products_count, align: "center", sortable: true },
  ],
  filter: '',
  pagination: {
    sortBy: 'desc',
    descending: false,
    rowsPerPage: 20
  }
});
const wndRemove = ref(false)
const wndReport = ref({ state: false, title: "", data: null, name: null, type: null });

const orderViewer = ref({
  state: false,
  head: null,
  block: true
});

const ordersSize = computed(() => $restockStore.ordersSize);
const ordersok = computed(() => $restockStore.ordersok.filter(e => e._status != 100 && e._workpoint_to == VDB.session.store.id_viz));
const orderrem = computed(() => $restockStore.ordersok.filter(e => e._status == 100));
const orderserrors = computed(() => $restockStore.orderserrors);
const stats = computed(() => $restockStore.resume);



const setOrderViewer = async (row) => {
  console.log(row.row)
  orderViewer.value.head = row.row;
  orderViewer.value.state = true;
}

const report = async (key) => {
  $q.loading.show({ message: "cargando..." + key });
  const response = await RestockApi.report(key);
  console.log(response.data);
  wndReport.value.data = response.data.rows;
  wndReport.value.name = response.data.name;
  wndReport.value.type = key;
  wndReport.value.state = true;
  $q.loading.hide();
}

const reloadDashboard = () => {
  wndReport.value.state = false;
  wndReport.state = false;
  $emit("reloadDashboard");
}

const fresh = (id, del = false) => {
  console.log(id);
  del ? orderViewer.value.state = false : null
  // console.log("Se crearon las particiones", id);
  $emit("freshOrder", id);
};

const removes = () => {
  wndRemove.value = true
}
</script>
