<template>

  <q-dialog v-model="stateDate">
    <q-card class="my-card">
      <q-card-section>
        <div class="q-pa-md">
          <div class="q-pb-sm">
            {{ optranges.val }}
          </div>
          <q-date v-model="optranges.val" range minimal />
        </div>
      </q-card-section>
      <q-card-section>
        <q-card-actions align="right">
          <q-btn flat icon="close" color="negative" @click="stateDate = !stateDate" />
          <q-btn flat icon="check" color="positive" @click="buscas" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
  <div v-if="$restockStore.showLoad">
    <q-inner-loading :showing="$restockStore.showLoad" >
      <q-spinner-grid size="5.5em" color="primary" />
      Obteniendo Datos...
    </q-inner-loading>
  </div>
  <AdminDashboardComp v-else @reload="init" @freshOrder="freshOrder" />
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useVDBStore } from 'stores/VDB';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import RestockApi from 'src/API/RestockApi.js';
import { useRestockStore } from 'stores/Restock';
import { useQuasar, date } from 'quasar';
import { $sktRestock } from 'boot/socket';
import AdminDashboardComp from 'src/components/Restock/AdminDashboard.vue';

const $route = useRoute();
const $router = useRouter();
const $restockStore = useRestockStore();
const $q = useQuasar();
const VDB = useVDBStore()
const optranges = ref({
  val: null
});

const stateDate = ref(false)

const init = async () => {
  $restockStore.setTitle('Dashboard')
  $restockStore.setButtonShow(true)
  $restockStore.setButtonShowAdd(false)

}
const freshOrder = order => {
  console.log("orderViewer/AdminDashboard actualizaron el pedido:", order.id);
  $sktRestock.emit("order_refresh", { order });
}
watch(() => $route.query, () => {
  init();
});
init();
// document.title = "Vhelpers/Dashboar";
</script>
<style>
.sm {
  border: 1px dotted black;
}
</style>
