<template>
  <q-page padding>
    <div class="row">
      <q-input class="col" v-model="filter" type="text" label="Buscar" filled dense />
      <q-separator spaced inset vertical dark v-if="Pedido" />
      <q-btn color="primary" flat dense icon="send" @click="confirm = !confirm" v-if="Pedido" :disable="order?._status > 1 " />

    </div>

    <q-separator spaced inset vertical dark />
    <q-list>
      <q-item>
        <q-item-section>Codigo</q-item-section>
        <q-item-section>Descripcion</q-item-section>
        <q-item-section>Cantidad</q-item-section>
      </q-item>
    </q-list>
    <q-list bordered v-for="(product, index) in bascket" :key="index">
      <q-item>
        <q-item-section>{{ product.code }}</q-item-section>
        <q-item-section>{{ product.description }}</q-item-section>
        <q-item-section> <q-input v-model="product.amount" type="number" filled :disable="order?._status > 1 " />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>


  <q-dialog v-model="confirm" persistent>
    <q-card style="width: 500px;">
      <q-card-section class=" text-bold text-h6 text-center">
        Se Creara Pedido
      </q-card-section>
      <q-card-section>

        <q-list v-for="(pedidos, index) in articulos" :key="index" bordered>
          <q-item>
            <q-item-section>{{ pedidos.code }}</q-item-section>
            <q-item-section>{{ pedidos.description }}</q-item-section>
            <q-item-section>{{ pedidos.amount }}</q-item-section>
          </q-item>
        </q-list>


      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Crear" color="primary" @click="crearPedido" />
      </q-card-actions>
    </q-card>
  </q-dialog>





</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useLayoutStore } from 'stores/layoutStore.js';
import requisition from 'src/API/requisitionApi.js';
import impProduct from 'src/API/resoursesApi.js';


const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const confirm = ref(false)
const layout = useLayoutStore();
const oid = $route.params.oid;
const order = ref(null);
const products = ref([]);
const filter = ref('');


const bascket = computed(() => {
  if (filter.value.length <= 0) {
    return products.value
  } else {
    return products.value.filter(e => e.description.toLowerCase().includes(filter.value.toLowerCase()))
  }
})

const Pedido = computed(() => bascket.value.some(e => e.amount > 0))
const articulos = computed(() => bascket.value.filter(e => e.amount > 0))

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' });
  const resp = await requisition.getRequisition(VDB.session.store.id, oid);
  if (resp.status !== 200) {
    console.log(resp);
  } else {
    $q.loading.hide();
    console.log(resp);
    order.value = resp.data
    index()
    layout.setTitle(`${resp.data.notes || oid}`);
    layout.setShowCreateButton(false);
    layout.setShowOrders(false)
  }
}



const index = async () => {
  const resp = await impProduct.getAssortmentInsumos()
  if (resp.error) {
    console.log(resp)
  } else {
    console.log(resp)
    products.value = resp
      if (order.value.bodie.length > 0) {
        products.value.forEach(product => {
          const found = order.value.bodie.find(o => o.code === product.code);
          console.log(found)
          if (found) {
            product.amount = found.amount;
          } else {
            product.amount = 0;
          }
        })
      }
    }
}

const crearPedido = async () => {
  $q.loading.show({ message: 'Cerrando Pedido' });
  let data = {
    id: oid,
    products: articulos.value
  }
  const resp = await requisition.finishRequisition(data);
  if (resp.status != 200) {
    console.log(resp);
  } else {
    $router.push('/assortment')
    $q.loading.hide();
  }
}

onMounted(() => {
  // if(VDB.session.rol == 'aux' || VDB.session.rol == 'gen' || VDB.session.rol == 'aud' || VDB.session.rol == 'root' ){
  init()
// }else{
//   $q.notify({message:'No tienes acceso a esta pagina',type:'negative',position:'center'})
//   $router.replace('/');

// }

});

onBeforeUnmount(() => {
  layout.setTitle('Pedidos Insumos');
  layout.setShowCreateButton(true);
  layout.setShowOrders(true)
});

</script>
