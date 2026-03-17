<template>
  <q-page padding>
    <q-page padding>
      <q-card class="my-card" flat>
        <q-table :title="`Inventarios`"
          :rows="inventoriesdb" :columns="invtable.cols" row-key="id" @row-click="rowclicked" />
      </q-card>
      <q-dialog v-model="wndViewer.state" full-width>
        <InvViewer :folio="wndViewer.folio" :store="$user.session.store.id_viz" />
      </q-dialog>
    </q-page>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import dayjs from 'dayjs';
import UserToolbar from 'src/components/UserToolbar.vue';
import CDB from 'src/API/cicsdb';
import { cyclecountStore } from 'stores/cyclecountStore';
import { useVDBStore } from 'src/stores/VDB';
import InvViewer from 'src/components/Inventory/Viewer.vue'

const folio = ref("");
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const $user = useVDBStore();
const cycleStore = cyclecountStore()
cycleStore.settitle('Ciclicos')
cycleStore.setshowBtns(true)
const wndViewer = ref({ state: false, data: null });
const inventoriesdb = computed(() => cycleStore.cyclecounts);
const invtable = ref({
  cols: [
    { name: "id", field: "id", label: "Folio" },
    { name: "started", field: row => dayjs(row.created_at).format("YYYY/MM/DD HH:mm:ss"), label: "Creacion", align: "center" },
    { name: "status", field: row => row.status.name, label: "Estado", align: "center" },
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
    { name: "pressition", field: row => `${row.precision}%`, label: "Precision",},
    { name: "warehouse", field: row => row.settings ? JSON.parse(row.settings).warehouse.name : '---', label: "Almacen" },
  ]
});




const rowclicked = async (evt, row, idx) => {
  wndViewer.value.folio = row.id;
  wndViewer.value.state = true;
}

</script>
