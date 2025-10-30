<template>
  <q-page padding>
    <div>
      <q-table :rows="ordersdb" row-key="name" grid :pagination="pagination" hide-bottom >
        <template v-slot:item="props" bordered>
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-list bordered @click="continuePedido(props.row)" >
              <q-expansion-item :header-class="`${colorCellState[props.row.status.id - 1]}`" dense icon="list" :label="`${props.row.id.toString()} (${props.row.status.name})`"
                :caption="`${props.row.to.name} (${props.row.notes})`">
                <q-separator />
                <q-table hide-bottom flat :rows="props.row.partition" :columns="table.columns"
                  :pagination="table.pagination" @row-click="mosPartition" />
              </q-expansion-item>
            </q-list>
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
          <q-list bordered v-for="(log,index) in viewPartition.val.log" :key="index">
            <q-item >
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


const pagination = ref({ rowsPerPage: [0] })
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


const continuePedido = (b) => {
  if(b._status == 1){
    $router.push(`/distribute/dashboardStore/${b.id}`)
  }
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


init();
</script>
