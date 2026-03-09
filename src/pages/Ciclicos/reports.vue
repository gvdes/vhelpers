<template>
  <q-page padding>
    <q-card class="my-card" flat>
      <q-table :title="`Inventarios`" :rows="inventoriesdb" :columns="invtable.cols" row-key="id"
        @row-click="rowclicked" />
    </q-card>
    <q-dialog v-model="wndViewer.state" full-width>
      <InvViewer :folio="wndViewer.folio" :store="VDB.session.store.id" />
    </q-dialog>
  </q-page>
</template>

<script setup>
import InvViewer from 'src/components/Inventory/Viewer.vue'
import { useWarehouse } from 'src/stores/warehousStore';
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import dayjs from 'dayjs';
import UserToolbar from 'src/components/UserToolbar.vue';
import CDB from 'src/API/cicsdb';
import { useVDBStore } from 'src/stores/VDB';
import InvCreate from 'src/components/Inventory/Create.vue'
import { cyclecountStore } from 'stores/cyclecountStore';
import { $sktCounters } from 'boot/socket';
import reportExc from "src/Excel/reports.js";
const VDB = useVDBStore();
const folio = ref("");
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const cycleStore = cyclecountStore()
const warehousStore = useWarehouse()
warehousStore.setTitle(`Inventarios Ciclicos `);
warehousStore.setshowReportLocations(false);
warehousStore.setshowReportMinMax(false);
warehousStore.setshowOptions(false);

const wndViewer = ref({ state: false, data: null });
const inventoriesdb = computed(() => cycleStore.cyclecounts);
const invtable = ref({
  cols: [
    { name: "id", field: "id", label: "Folio" },
    { name: "started", field: row => dayjs(row.created_at).format("YYYY/MM/DD HH:mm:ss"), label: "Creacion", align: "center" },
    { name: "status", field: row => row.state.name, label: "Estado", align: "center" },
    {
      name: "ended",
      field: row => {
        let logend = row.log.find(l => l.id == 3)
        return logend ? dayjs(logend.pivot.created_at).format("YYYY/MM/DD HH:mm:ss") : "--"
      },
      align: "center",
      label: "Termino"
    },
    { name: "models", field: "products_count", label: "Modelos" },
    { name: "type", field: row => row.type.name, label: "Tipo" },
    { name: "pressition", field: row => `${row.precision}%`, label: "Precision", },
    { name: "warehouse", field: row => row.warehouse.name, label: "Almacen" },
  ]
});


const rowclicked = async (evt, row, idx) => {
  wndViewer.value.folio = row.id;
  wndViewer.value.state = true;
}

</script>
