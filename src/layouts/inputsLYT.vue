<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div class="row items-center">
          Helpers
          <q-icon name="navigate_next" color="primary" class="q-mx-sm" />

          <Transition name="fade">
            <span class="text-h6">Pedidos Insumos </span>
          </Transition>

        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-table title="Pedidos" :rows="stores" :columns="table.columns" v-if="stores.length > 0">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td auto-width>
              <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
                :icon="props.expand ? 'remove' : 'add'" />
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <q-table :rows="props.row.requisition" :columns="table.columnsReq" @row-click="mosRequisition" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <router-view />
    </q-page-container>

    <q-dialog v-model="mosEditRequisition.state" persistent>
      <q-card style="width: 500px;">
        <q-card-section class=" text-bold text-h6 text-center">
          PEDIDO: {{ mosEditRequisition.val.id }}
        </q-card-section>
        <q-card-section>
          <q-select v-model="mosEditRequisition.val.status" :options="statuses" label="Estado" filled option-label="name" disable />
        </q-card-section>
        <q-card-section>
          <q-table :rows="mosEditRequisition.val.bodie" :columns="table.columnsRequired" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat icon="close" color="primary" v-close-popup />
          <q-btn flat icon="print" color="primary" @click="printReq" />
          <q-btn flat icon="send" color="primary" @click="changeStatus" :disable="mosEditRequisition.val._status > 3"  />
        </q-card-actions>
      </q-card>
    </q-dialog>


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
const stores = ref([]);
const mosEditRequisition = ref({
  state: false,
  val: null,
})

const statuses = ref([]);


const table = ref({
  columnsReq: [
    { name: 'id', label: 'ID', field: r => r.id },
    { name: 'user', label: 'USUARIO', field: r => r.user.complete_name },
    { name: 'status', label: 'ESTADO', field: r => r.status.name },
    { name: 'date', label: 'FECHA', field: r => dayjs(r.created_at).format("YYYY/MM/DD") },
    { name: 'products', label: 'PRODUCTOS', field: r => r.bodie.length },
    { name: 'notes', label: 'NOTAS', field: r => r.notes },
  ],
  columns: [
    { name: 'id', label: 'ID', field: r => r.id },
    { name: 'name', label: 'NOMBRE', field: r => r.name },
    { name: 'countRequisition', label: 'REQUISISIONES', field: r => r.requisition_count },
  ],
  columnsRequired: [
    { name: 'code', label: 'CODE', field: r => r.code },
    { name: 'descripcion', label: 'DESCRIPCION', field: r => r.description },
    { name: 'amount', label: 'CANTIDAD', field: r => r.amount },
  ]
})

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' });
  const resp = await requisition.getRequisitionsStore();
  if (resp.status !== 200) {
    console.log(resp);
  } else {
    $q.loading.hide();
    stores.value = resp.data.stores;
    statuses.value = resp.data.status
    console.log(resp.data);
  }
}

const mosRequisition = (a, b) => {
  mosEditRequisition.value.state = true;
  mosEditRequisition.value.val = b
  console.log(b);
}

const printReq = async () => {
  $q.loading.show({message:'Imprimiendo'});
  // console.log(mosEditRequisition.value..val)
  const resp = await requisition.printReq(mosEditRequisition.value.val._stores, mosEditRequisition.value.val.id);

  if(resp.status != 200){
    console.log(resp)
  }else{
    console.log(resp);
    $q.loading.hide();
  }
}

const changeStatus = async () => {
  $q.loading.hide({message:'Cambiando Status'})
  const resp = await requisition.change(mosEditRequisition.value.val._stores, mosEditRequisition.value.val.id)
  if(resp.status != 200){
    console.log(resp)
  }else{
    console.log(resp)
    $q.loading.hide();
    $q.notify({message:'El pedido se cambio de estado',type:'positive',position:'center'});
    stores.value.forEach(e => {
      if(e.id == resp.data._stores){
        let inx = e.requisition.findIndex(i => i.id == resp.data.id);
        if(inx >= 0){
          e.requisition[inx] = resp.data
        }
      }
    })
    mosEditRequisition.value.val = resp.data
    mosEditRequisition.value.state = false
  }
}

if (VDB.session.rol == 'adm' || VDB.session.rol == 'root') {
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
