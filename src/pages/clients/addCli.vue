<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section class="text-right">
        <q-btn color="negative" icon="archive" label="" @click="wndArchives.state = true" />
      </q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col">
          <q-table title="Solicitudes" :rows="qts_news" row-key="name" :columns="table.cols" @row-click="clicked"
            :filter="table.filter" :visible-columns="table.vcolumns">
            <template v-slot:top>
              <div class=" full-width row justify-between item-center">
                <div class="text-h5 ">Pendientes</div>
                <q-input v-model="table.filter" type="text" label="Buscar" />
              </div>
            </template>
          </q-table>


        </q-card-section>
        <q-card-section class="col">
          <q-table title="Aceptados" :rows="qts_acepted" :columns="table2.cols" row-key="name" :filter="table2.filter"
            :visible-columns="table2.vcolumns">
            <template v-slot:top>
              <div class=" full-width row justify-between item-center">
                <div><q-btn color="positive" icon="sync" @click="synclient" :disabled="(qts_acepted <= 0)" /></div>
                <div class="text-h5">Aceptadas</div>
                <q-input v-model="table2.filter" type="text" label="Buscar" />
              </div>
            </template>
          </q-table>
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-card class="my-card">
      <q-card-section class="text-right">
      </q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="col">
          <q-table title="Terminadas" :rows="qts_sync" row-key="name" :columns="table3.cols" :filter="table3.filter"
            :visible-columns="table3.vcolumns">
            <template v-slot:top>
              <div class=" full-width row justify-between item-center">
                <div class="text-h5 ">En Sucursales</div>
                <q-input v-model="table3.filter" type="text" label="Buscar" />
              </div>
            </template>
          </q-table>
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-dialog v-model="wnd.state" :persistent="wnd.pts">

      <q-card v-if="wnd.pts">
        <q-card-section>
          <q-spinner-ball color="primary" size="md" />
          <q-tooltip :offset="[0, 8]">Dando de alta en sucursales :)</q-tooltip>
        </q-card-section>

      </q-card>
      <q-card v-else>
        <q-card-section v-if="wnd.row._status == 0">
          <div class="text-h6 text-center ">Solicitud: {{ wnd.row.id }}</div>
          <div class="text-h5 text-left">Cliente</div>
          <div class="text-h5 text-left">{{ wnd.row.nom_cli }}</div>
          <div class="text-subtitle2 text-left">Sucursal: {{ wnd.row.sucursal }}</div>
          <div class="text-subtitle2 text-left">Precio: {{ wnd.row.price }}</div>
          <div class="text-subtitle2 text-left">Telefono: {{ wnd.row.celphone }}</div>
          <div class="text-subtitle2 text-left">Correo: {{ wnd.row.email }}</div>
          <div class="text-subtitle2 text-left">Solicitado: {{ wnd.row.created_at }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat @click="ignoredClient" color="negative">Rechazar</q-btn>
          <q-btn flat @click="addClient" color="positive">Aprobar</q-btn>
        </q-card-actions>
        <q-card-section v-if="wnd.row._status == 1">
          {{ wnd.row }} - 1
        </q-card-section>
        <q-card-section v-if="wnd.row._status == 2">
          {{ wnd.row }} - 2
        </q-card-section>
        <q-card-actions>
          <q-btn flat label="Cancelar" v-close-popup>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="wndArchives.state" persistent>
      <QuotesArchive :quotes="qts_decline" @restore="restore" @destroy="destroy" />
    </q-dialog>
  </q-page>
</template>


<script setup>
import { ref, computed } from 'vue'
// import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import clientApi from 'src/API/clientApi.js';
import QuotesArchive from 'src/components/Clientes/QuotesArchive.vue'
const $q = useQuasar();



let quotes = ref([]);

let wnd = ref({ state: false, row: null, pts: false });

let qstates = {
  0: { label: "Nueva", color: "text-pink" },
  1: { label: "Aprobada", color: "text-light-green-10" },
  2: { label: "Rechazada", color: "text-red-14" },
  3: { label: "Sincronizadas", color: "text-deep-orange-10" },
  4: { label: "Eliminadas", color: "text-deep-orange-10" }

}

let wndArchives = ref({ state: false, row: null });



let table = ref({
  vcolumns: ['client', 'celphone', 'price', 'status'],
  cols: [
    { name: 'id', label: 'ID', field: 'id' },
    { name: 'client', label: 'Cliente', field: 'nom_cli' },
    { name: 'address', label: 'Domicilio', field: r => `${r.street}, ${r.num_ext}` },
    { name: 'celphone', label: 'Telefono', field: 'celphone' },
    { name: 'email', label: 'Correo', field: 'email' },
    { name: 'price', label: 'Precio', field: 'price' },
    { name: 'tickets', label: 'Ticket', field: 'tickets' },
    {
      name: 'status', label: 'Estado',
      field: row => qstates[row._status].label,
      classes: row => qstates[row._status].color
    },
    { name: 'store', label: 'Sucursal', field: 'sucursal' },
    // { name:'idFactusol', label:'Factusol', field:'_fsid'},

  ],
  filter: "",
});

let table2 = ref({
  vcolumns: ['client', 'celphone', 'price', 'status', 'idfs', 'ReplyStore'],
  cols: [

    { name: 'id', label: 'ID', field: 'id' },
    { name: 'idfs', label: 'Factusol', field: 'fs_id' },
    { name: 'client', label: 'Cliente', field: 'nom_cli' },
    { name: 'address', label: 'Domicilio', field: r => `${r.street}, ${r.num_ext}` },
    { name: 'celphone', label: 'Telefono', field: 'celphone' },
    { name: 'email', label: 'Correo', field: 'email' },
    { name: 'price', label: 'Precio', field: 'price' },
    { name: 'tickets', label: 'Ticket', field: 'tickets' },
    {
      name: 'status', label: 'Estado',
      field: row => qstates[row._status].label,
      classes: row => qstates[row._status].color
    },
    { name: 'store', label: 'Sucursal', field: 'sucursal' },
    { name: 'ReplyStore', label: 'ReplicadoEn:', field: 'Stores' }

  ],
  filter: "",
});

let table3 = ref({
  vcolumns: ['client', 'celphone', 'price', 'status', 'idfs'],
  cols: [

    { name: 'id', label: 'ID', field: 'id' },
    { name: 'idfs', label: 'Factusol', field: 'fs_id' },
    { name: 'client', label: 'Cliente', field: 'nom_cli' },
    { name: 'address', label: 'Domicilio', field: r => `${r.street}, ${r.num_ext}` },
    { name: 'celphone', label: 'Telefono', field: 'celphone' },
    { name: 'email', label: 'Correo', field: 'email' },
    { name: 'price', label: 'Precio', field: 'price' },
    { name: 'tickets', label: 'Ticket', field: 'tickets' },
    {
      name: 'status', label: 'Estado',
      field: row => qstates[row._status].label,
      classes: row => qstates[row._status].color
    },
    { name: 'store', label: 'Sucursal', field: 'sucursal' },

  ],
  filter: "",
});


let qts_news = computed(() => quotes.value.filter(q => q._status == 0));
let qts_decline = computed(() => quotes.value.filter(q => q._status == 2));
let qts_acepted = computed(() => quotes.value.filter(q => q._status == 1));
let qts_sync = computed(() => quotes.value.filter(q => q._status == 3));



const index = async () => {
  console.log('Traiendo solicitudes creadas');
  const resp = await clientApi.getSolicitud();
  console.log(resp);
  // resp.data.solicitudes.map(s => s.address = JSON.parse(s.address))
  quotes.value = resp.solicitudes;
}

const clicked = (a, row) => {
  console.log(row._status)

  wnd.value.row = row;

  wnd.value.state = true;
}

const addClient = async () => {
  wnd.value.pts = true;
  let resp = await clientApi.addClient(wnd.value.row);
  console.log(resp);
  if (resp.fail) {
    console.log(resp)
    console.log("error brou")
    console.log(resp)
    let msg = resp.fail.response.data.error.msg;
    wnd.value.pts = false;
    $q.notify({
      message: msg,
      icon: 'close',
      color: 'negative'
    });

  } else {
    let idres = resp.id;
    let inx = quotes.value.findIndex(e => e.id == idres);
    quotes.value[inx]._status = resp._status;
    quotes.value[inx].fs_id = resp.fs_id;
    wnd.value.state = false;
    wnd.value.pts = false;
    $q.notify({
      message: "Cliente Creado",
      icon: 'check_circle',
      color: 'positive'
    });
    console.log(resp)
  }
}

const ignoredClient = async () => {
  wnd.value.pts = true;
  const resp = await clientApi.ignoredClient(wnd.value.row)
  let idres = resp.id;
  let inx = quotes.value.findIndex(e => e.id == idres);
  quotes.value[inx]._status = resp._status;
  wnd.value.state = false;
  wnd.value.pts = false;
  console.log(inx);
  $q.notify({
    message: "Cliente Ignorado",
    icon: 'close',
    color: 'danger'
  });
  console.log(resp)
}

const restore = async (id) => {
  let resp = await clientApi.restoreClient({ id });
  let idres = resp.id;
  let inx = quotes.value.findIndex(e => e.id == idres);
  quotes.value[inx]._status = resp._status;
  // console.log(inx);
  $q.notify({
    message: "Restaurado",
    icon: 'check',
    color: 'primary'
  });
  console.log(resp)

}

const destroy = async (id) => {
  console.log('amo a destruira ' + id)
  let resp = await clientApi.deleteClient({ id });
  let idres = resp.id;
  let inx = quotes.value.findIndex(e => e.id == idres);
  quotes.value[inx]._status = resp._status;
  // console.log(inx);
  $q.notify({
    message: "Eliminado",
    icon: 'close',
    color: 'negative'
  });
  console.log(resp)
}

const synclient = async () => {
  wnd.value.state = true
  wnd.value.pts = true;
  console.log('SINCRONIZANDO CLIENTES');
  let resp = await clientApi.synclient();
  console.log(resp)
  if (resp.fail) {

    $q.notify({
      message: "hubo problemas con la replicacion",
      icon: 'close',
      color: 'negative'
    });
  } else {
    let aresp = resp;
    aresp.forEach(e => {
      let isd = quotes.value.findIndex(el => el.id == e.id);
      quotes.value[isd]._status = e._status
      quotes.value[isd].Stores = e.Stores
    });
    wnd.value.state = false
    wnd.value.pts = false;
    $q.notify({
      message: "CLIENTES SINCRONIZADOS",
      icon: 'check_circle',
      color: 'positive'
    });
  }
}

index();

</script>
