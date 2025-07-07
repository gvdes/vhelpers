<template>
  <q-page padding>
    <div>
      <q-table :rows="ordersdb" row-key="name" grid :pagination="pagination" hide-bottom>
        <template v-slot:item="props" bordered>
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-list bordered>
            <q-expansion-item dense icon="list" :label="`${props.row.id.toString()} (${props.row.status.name})`" :caption="`${props.row.to.name} (${props.row.notes})`">
              <q-separator />
                <q-table
                  hide-bottom
                  flat
                  :rows="props.row.partition"
                  :columns="table.columns"
                  :pagination="table.pagination"
                />
            </q-expansion-item>
          </q-list>
        </div>


        </template>
      </q-table>
    </div>
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

const pagination = ref({ rowsPerPage: [0] })
const table = ref({
  columns:[
    {name:'id',label:'ID',field:r => r.id, align:'center'},
    {name:'invoice',label:'Factura',field:r => r.invoice , align:'center'},
    {name:'invoiceReceived',label:'Factura R',field:r => r.invoice_received , align:'center'},
    {name:'status',label:'Estado',field:r => r.status.name, align:'left'},
  ],
  pagination:{rowsPerPage:10}
})
const ordersdb = computed(() => $restockStore.ordersok.filter(o => o._workpoint_from == VDB.session.store.id_viz))
const init = async () => {
  $restockStore.setShowLYT(true)
  $restockStore.setTitle('Dashboard')
  $restockStore.setButtonShow(false)
}

init();
</script>
