<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- <q-header reveal elevated bordered class="bg-white q-pa-md">
      <q-btn color="primary" label="Full Generate" @click="fullset" />
    </q-header> -->

    <q-page-container>
      <!-- This is where pages get injected -->
      <!-- <router-view /> -->
      <q-page padding>
        <q-table
          title="Usuarios"
          :rows="nusers"
          :columns="tcols"
          row-key="id"
          @row-click="rowclicked"
          :filter="filter"
        >
        <template v-slot:top>
          <q-input borderless dense debounce="150" v-model="filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        </q-table>

        <q-dialog v-model="wndViewer.state">
          <q-card v-if="wndViewer.user">
            <q-card-section>
              <pre>{{ wndViewer.user }}</pre>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-page>

    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useVDBStore } from 'src/stores/VDB';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { v4 as uuid } from 'uuid';
import CryptoJS  from 'crypto-js';
import { copyToClipboard as ctc } from 'quasar'
import { AppFullscreen, useQuasar } from "quasar";
const $user = useVDBStore();
const $q = useQuasar();
const $router = useRouter();


const VDB = useVDBStore();
const nusers = ref([]);
const tcols = ref([
  { name:'id', field:'id', label:"UID" },
  { name:'uname', field:'name', label:"Nombre", sortable:true },
  { name:'unick', field: row => row.credentials.nick, label:"nick", sortable:true },
  { name:'upass', field: row => "****", label:"nip" },
  { name:'store', field: row => row.store.name, label:"Sucursal", sortable:true },
  // { name:'hash', field:(row) => row.credentials.hash, label:"HASH" }
]);
const filter = ref('');
const wndViewer = ref({ state:false, user:null, idx:null });

const fullset = () => {
  // genera nips para todos los usuarios
  VDB.users.forEach( u => {
    let id = uuid();
    let splitted = id.split('-');
    let nnip = `${splitted[1]}`;
    let hash = CryptoJS.MD5(nnip).toString();
    console.log(`${u.credentials.nick}:: `,nnip,` ==> `,hash);

    u.credentials.pass = nnip;
    u.credentials.hash = hash;

    nusers.value.push(u);
  });

  console.log(nusers.value);
}

const rowclicked = (evt,row,idx) => {
  console.log(evt);
  console.log(row);
  console.log(idx);

  wndViewer.value.idx = idx;
  wndViewer.value.user = row;
  wndViewer.value.state = true;
}

const usersToClipboard = () => {
  let data = JSON.stringify(nusers.value);
  ctc(data).then( done => {
    console.log(done);
  }).catch( fail => {
    console.log(fail);
  });
}

const init = () => {

  nusers.value = VDB.users;

}

// if ($user.session.rol == 'root') {
  init()
// } else {
//   $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
//   $router.replace('/');
// }

init();
</script>
