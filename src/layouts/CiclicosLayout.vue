<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header  class="bg-grey-3 text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div><span class="text-grey">Helpers</span> <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Ciclicos</span></div>

        <div class="row items-center">
          <q-select v-model="viewdate" :options="optranges" label="Vista" autofocus @update:model-value="reloadView" borderless>
            <template v-slot:prepend>
              <q-btn dense flat color="primary" icon="autorenew"  @click.stop="init" />
            </template>
          </q-select>
          <!-- <q-btn color="primary" /> -->
          <q-btn color="primary" icon="search" dense flat>
            <q-menu>
              <div class="q-pa-md bg-grey-2 text-primary">Buscar Inventario</div>
              <q-separator />
              <q-form dense @submit="search" class="q-gutter-md q-pa-md">
                <q-input v-model="folio" type="number" label="Folio" autofocus/>
                <div class="text-right" v-if="cansearch">
                  <q-btn type="submit" color="primary" icon="search"/>
                </div>
              </q-form>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- This is where pages get injected -->
      <!-- <router-view /> -->

      <q-page padding>
        <q-card class="my-card" flat>
          <q-table
            :title="`Inventarios del ${ dispDateInit } al ${ dispDateEnd } [ ${inventoriesdb.length} ]`"
            :rows="inventories"
            :columns="invtable.cols"
            row-key="id"
            @row-click="rowclicked"
          />
        </q-card>

        <q-dialog v-model="wndViewer.state" full-width>
          <InvViewer :folio="wndViewer.folio" :store="$user.session.store.id" />
        </q-dialog>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import dayjs from 'dayjs';
import UserToolbar from 'src/components/UserToolbar.vue';
import CDB from 'src/API/cicsdb';
import { useVDBStore } from 'src/stores/VDB';
import InvViewer from 'src/components/Inventory/Viewer.vue'

const folio = ref("");
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const $user = useVDBStore();

const wndViewer = ref({ state:false, data:null });
const viewdate = ref(null);
const inventoriesdb = ref([]);
const invtable = ref({
  cols:[
    { name:"id", field:"id", label:"Folio" },
    { name:"started", field: row => dayjs(row.created_at).format("YYYY/MM/DD HH:mm:ss"), label:"Creacion", align:"center" },
    { name:"status", field: row => row.status.name, label:"Estado", align:"center" },
    {
      name:"ended",
      field: row => {
        let logend = row.log.find( l => l.id==3 )
        return logend ? dayjs(logend.pivot.created_at).format("YYYY/MM/DD HH:mm:ss") :"--"
      },
      align:"center",
      label:"Termino"
    },
    { name:"models", field:"products_count", label:"Modelos" },
    { name:"type", field: row => row.type.name, label:"Tipo" },
    { name:"warehouse", field:row => row.settings ? row.settings.warehouse.name:'---', label:"Almacen" },
  ]
});

const optranges = ref([
  { id:"day", label:"Hoy" },
  { id:"week", label:"Semana" },
  { id:"month", label:"Mes" },
  { id:'c', label:'otra ...', disable:true},
]);

const dateranges = ref({
  from:dayjs( Date.now() ).startOf('day'), // seteamos la fecha de nicio, por default al inicio del dia actual
  to:dayjs( Date.now() ).endOf('day')// seteamos la fecha final, por default al inicio del dia actual
});

const inventories = computed(() => inventoriesdb.value.map( i => { i.settings = JSON.parse(i.settings); return i; } ));

const cansearch = computed(() => (folio.value&&folio.value.length));
const dispDateInit = computed(() => dateranges.value.from.format("YYYY/MM/DD")); // despliega la fecha de inicio
const dispDateEnd = computed(() =>  dateranges.value.to.format("YYYY/MM/DD")); // despliega la fecha de fin

const search = () => {
  console.log("searching folio");
  wndViewer.value.folio = folio.value;
  wndViewer.value.state = true;
}

const rowclicked = async (evt,row,idx) => {
  wndViewer.value.folio = row.id;
  wndViewer.value.state = true;
}

const init = async () => {
  console.log($user.session);
  $q.loading.show({ message:"Cargado vista..." });

  let v = $route.query.v ?? "day"; // define el valor de la vista
  let r = optranges.value.findIndex( o => o.id==v ); // busca que sea un valor valido (day||week||month)
  let idx = (r>=0) ? r:0; // obtiene el indice correspondiente al valor hayado, de lo contrario devuelve 0 (day)

  console.log(idx);

  viewdate.value = optranges.value[idx]; // setea el valor del select de la vista
  dateranges.value.from = dayjs(Date.now()).startOf(viewdate.value.id); // setea el valor de inicio de la vista

  const response = await CDB.index( { dateranges, view:viewdate.value, store:$user.session.store.id });
  console.log(response);
  inventoriesdb.value = response.inventories;

  $q.loading.hide();
}

const reloadView  = () => {
  $router.push(`/ciclicos?v=${viewdate.value.id}`)
};

init();

watch(() => $route.query, () => { init(); }); // vigila cambios de la ruta

</script>
