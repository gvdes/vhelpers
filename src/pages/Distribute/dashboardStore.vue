<template>
  <q-page padding>
    <div>
      <q-table :rows="ordersdb" row-key="name" grid :pagination="pagination" :filter="filter" hide-bottom
        :filter-method="customFilter">
        <template v-slot:item="props" bordered>
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-list bordered @dblclick="mosOrder(props.row)">
              <q-expansion-item :header-class="`${colorCellState[props.row.status.id - 1]}`" dense icon="list"
                :label="`${props.row.id.toString()} (${props.row.status.name})`"
                :caption="`${props.row.to.name} (${props.row.notes})`">
                <q-separator />
                <q-table hide-bottom flat :rows="props.row.partition" :columns="table.columns"
                  :pagination="table.pagination" @row-click="mosPartition" />
              </q-expansion-item>
            </q-list>
          </div>
        </template>
        <template v-slot:top>
          <div class="row justify-end q-gutter-sm full-width">
            <q-input dense debounce="300" v-model="filter" placeholder="Buscar" class="col-auto" outlined>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="viewPartition.state" persistent>
      <q-card>
        <q-card-section class="text-center text-h6">
          ID: {{ viewPartition.val.id }}
        </q-card-section>
        <q-card-section class="text-center text-bold">
          {{ viewPartition.val.status.name }}
        </q-card-section>
        <q-card-section>
          <q-list bordered v-for="(log, index) in viewPartition.val.log" :key="index">
            <q-item>
              <q-item-section>{{ log.name }}</q-item-section>
              <q-item-section>{{ JSON.parse(log.pivot.details).responsable }}</q-item-section>
              <q-item-section>{{ dayjs(log.pivot.updated_at).format('YYYY/MM/DD HH:mm:ss') }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="viewOrder.state" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="receipt_long" color="primary" text-color="white" />
          <span class="q-ml-sm text-h4">{{ viewOrder.val.id }}</span>
        </q-card-section>
        <q-card-section class="text-h5">
          Notas :
          <span class="text-bold">{{ viewOrder.val.notes }}</span>
        </q-card-section>
        <q-card-section class="text-h5">
          Creado Por :
          <span>{{ `${viewOrder.val.created_by.names} ${viewOrder.val.created_by.surname_pat}
            ${viewOrder.val.created_by.surname_mat}` }}</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat icon="close" color="negative" v-close-popup />
          <q-btn color="teal" flat icon="print" @click="print.state = !print.state"
            :disabled="viewOrder.val._status == 1" />
          <q-btn flat icon="send" color="blue" @click="continuePedido" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="print.state" persistent>
      <q-card>
        <q-card-section class="row items-center bg-primary text-white text-h6">
          Selecciona Impresora
        </q-card-section>
        <q-card-section class="">
          <q-select v-model="print.val" :options="prints" label="Impresoras" option-label="name" filled />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Terminar" color="primary" @click="pritnOrder" :disabled="!print.val" />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import RestockApi from 'src/API/RestockApi.js';
import { useVDBStore } from 'stores/VDB';
import { useRestockStore } from 'stores/Restock';
import { useQuasar } from 'quasar';
import { $sktRestock } from 'boot/socket';
import PrinterSelect from 'src/components/Restock/PrinterSelect.vue';
const $route = useRoute();
const $router = useRouter();
const $restockStore = useRestockStore();
const $q = useQuasar();
const VDB = useVDBStore()
const viewPartition = ref({
  state: false,
  val: null
})
const viewOrder = ref({
  state: false,
  val: null
})
const print = ref({
  state: false,
  val: null
})

const pagination = ref({ rowsPerPage: [0] })
const filter = ref(null)
const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: r => r.id, align: 'center' },
    { name: 'invoice', label: 'Factura', field: r => r.invoice, align: 'center' },
    { name: 'invoiceReceived', label: 'Factura R', field: r => r.invoice_received, align: 'center' },
    { name: 'status', label: 'Estado', field: r => r.status.name, align: 'left' },
    { name: 'UACT', label: 'U.Act', field: r => dayjs(r.log?.find(e => e.id == r._status)?.pivot.updated_at).format('YYYY/MM/DD HH:mm:ss'), align: 'left' },

  ],
  pagination: { rowsPerPage: 10 }
})
const ordersdb = computed(() => $restockStore.ordersok.filter(o => o._workpoint_from == VDB.session.store.id_viz))
const prints = computed(() => $restockStore.printers.find(e => e.id == VDB.session.store.id_viz).printers)

const continuePedido = () => {
  $router.push(`/distribute/dashboardStore/${viewOrder.value.val.id}`)
}


const init = async () => {
  $restockStore.setShowLYT(true)
  $restockStore.setTitle('Dashboard')
  $restockStore.setButtonShow(true)
  $restockStore.setButtonShowAdd(true)

}

const mosPartition = (a, b) => {
  viewPartition.value.state = true
  viewPartition.value.val = b
}

const colorCellState = [
  'text-grey-5',
  'text-h6 text-red',
  'text-indigo',
  '4',
  '5',
  'text-pink-7',
  'text-orange-8',
  '8',
  'text-primary',
  'text-positive'
];

const mosOrder = (b) => {
  viewOrder.value.state = true
  viewOrder.value.val = b
}


const customFilter = (rows, terms) => {
  const t = terms.toUpperCase()

  return rows.filter(row => {
    const normalMatch = Object.values(row).some(val =>
      String(val ?? '').toUpperCase().includes(t)
    )
    const partitionMatch =
      row.partition?.some(part =>
        part.products?.some(prod =>
          prod.code?.toUpperCase().includes(t)
        )
      ) ?? false
    return normalMatch || partitionMatch
  })
}


const pritnOrder = async () => {
  $q.loading.show({ message: "..." });
  // console.log(data);
  let data = {
    ip: print.value.val.ip,
    port: 9100,
    order: viewOrder.value.val.id
  }
  const response = await RestockApi.printforsupplyStore(data);
  console.log(response);
  if (response.status == 200) {
    let resp = response.data;
    if (resp) {
      $q.notify({ message: "Impresion correcta", icon: "done", color: "positive", position: "top" });
      print.value.state = false
    } else {
      $q.notify({ message: `Sin conexion a <b>${data.name} <small>(${data.ip})</small></b>`, icon: "fas fa-bug", color: "negative", position: "center", html: true, timeout: 4000 });
    }
    $q.loading.hide();
  } else { console.error(response); alert(`Error ${response.status}: ${response.data}`); }
}


init();
</script>
