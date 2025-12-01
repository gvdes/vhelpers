<template>
  <q-page padding>
		<q-banner v-if="soundAuth.state!='running'" inline-actions class="text-white bg-red-11">
			El permiso del sonido no esta habilitado!
			<template v-slot:avatar>
				<q-icon name="volume_off" color="white" />
			</template>
		</q-banner>


    <q-table :rows="myorders" :columns="table.columns" :filter="table.filter" @row-click="printed" :pagination="pagination">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>


    <q-dialog v-model="print.state" persistent>
      <q-card>
        <q-card-section class="row items-center bg-primary text-white text-h6">
          Selecciona Impresora
        </q-card-section>
        <q-card-section class="">
          <q-select v-model="$orderStore.printers.val" :options="$orderStore.printers.opts.filter(e => e._type == 2)"
            label="Impresoras" option-label="name" filled />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Imprimir" color="primary" :disabled="!$orderStore.printers.val"
            @click="reimpresion" />
        </q-card-actions>
      </q-card>
    </q-dialog>


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
$orderStore.setTitle('ALMACEN');
$orderStore.setshowLyt(true);
const $q = useQuasar();
const VDB = useVDBStore()
const pagination = ref({ rowsPerPage:20 })
const print = ref({
  state: false,
})
const mosView = ref(null);
const soundAuth = new AudioContext()
const table = ref({
  columns: [
    { name: 'id', label: 'FOLIO', field: r => r.id, align: 'left', sortable:true },
    { name: 'created', label: 'Creado Por', field: r => `${r.created_by.names} ${r.created_by.surname_pat} ${r.created_by.surname_mat}`, align: 'left', sortable:true },
    { name: 'client', label: 'CLIENTE', field: r => r.name, align: 'left', sortable:true },
    { name: 'status', label: 'ESTADO', field: r => r.status?.name, align: 'center', classes: r => `text-${colorStatus.value[r.status.id - 1]}`, sortable:true },
    { name: 'created', label: 'HORA', field: r => dayjs(r.created_at).format('HH:mm:ss'), align: 'center', sortable:true },
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

const myorders = computed(() => $orderStore.orders.filter(e => e._status >= 3 && e._status <= 10))

const printed = (a,b) => {
  if(b._status >= 5){
  mosView.value = b.id
  print.value.state = !print.value.state
  }else{
    $q.notify({message:'Aun no se puede Imprimir la comanda :/',type:'negative',position:'top'})
  }

}

const reimpresion = async () => {
  $q.loading.show({message:'Reimprimiendo'})
  let data = {
    _order:mosView.value,
    _printer:$orderStore.printers.val.id
  }
  const resp = await orderApi.reimpresion(data);
  if(resp.fail){
    console.log(resp)
  }else{
    print.value.state = false
    mosView.value = null
    $q.loading.hide()
  }
}


</script>
