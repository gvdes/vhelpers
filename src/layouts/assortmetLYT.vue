<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />

    </q-header>

    <q-page-container>
      <q-toolbar class="justify-between">
        <div class="row items-center">
          Helpers
          <q-icon name="navigate_next" color="primary" class="q-mx-sm" />

          <Transition name="fade">
            <span class="text-h6" :key="layout.title">{{ layout.title }}</span>
          </Transition>

        </div>
        <div v-if="layout.showCreateButton">
          <q-btn color="primary" icon="add">
            <q-menu>
              <q-card class="my-card">
                <q-card-section>
                  <q-input v-model="nameOrder" type="text" label="Nota Pedido" prefix="INSUMOS" />
                </q-card-section>
                <q-card-actions>
                  <q-btn flat label="Crear" @click="createRequisition" />
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>

      <q-table v-if="layout.showOrders" title="Pedidos" :rows="orders" grid :columns="table.columns"
        @row-click="viewRequisition" />

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import { useLayoutStore } from 'stores/layoutStore.js'; // ✅ Ahora solo importas
import requisition from 'src/API/requisitionApi.js';



const VDB = useVDBStore();
const layout = useLayoutStore();
const $router = useRouter();
const $route = useRoute();
const $q = useQuasar();
const nameOrder = ref('');
const orders = ref([]);


const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: r => r.id },
    { name: 'user', label: 'USUARIO', field: r => r.user.complete_name },
    { name: 'status', label: 'ESTADO', field: r => r.status.name },
    { name: 'date', label: 'FECHA', field: r => dayjs(r.created_at).format("YYYY/MM/DD") },
    { name: 'products', label: 'PRODUCTOS', field: r => r.bodie_count },
    { name: 'notes', label: 'NOTAS', field: r => r.notes }
  ]
})

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' });
  let store = VDB.session.store.id;
  const resp = await requisition.index(store);
  if (resp.status !== 200) {
    console.log(resp);
  } else {
    $q.loading.hide();
    orders.value = resp.data;
    console.log(resp.data);
  }
}

const createRequisition = async () => {
  $q.loading.show({ message: 'Creando Pedido' })
  let data = {
    notes: `INSUMOS ${nameOrder.value}`,
    _stores: VDB.session.store.id,
    _user: VDB.session.id
  }
  const resp = await requisition.createRequisition(data);
  if (resp.status !== 200) {
    console.log(resp);
  } else {
    console.log(resp.data);
    let id = resp.data.id;
    $router.push(`/assortment/${id}`);
    $q.loading.hide();
  }
}

const viewRequisition = (a, b) => {
  $router.push(`/assortment/${b.id}`);
}

if (VDB.session.rol == 'aux' || VDB.session.rol == 'gen' || VDB.session.rol == 'aud' || VDB.session.rol == 'root') {
  init()
} else {
  $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
  $router.replace('/');

}

</script>

<!-- 🎯 Aquí el efecto fade -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
