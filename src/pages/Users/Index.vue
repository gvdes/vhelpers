<template>
  <div class="q-pa-md">
    <viewUsers :users="bsktUser" :stores="stores" :areas="areas" :states="states" :mobile="isMobile" @alterUsers="alterUsers" :enterprises="enterprises" />
  </div>

  <q-dialog v-model="mosArchive" backdrop-filter="blur(4px) saturate(150%)" full-width>
    <viewUsers :users="bsktUserArvhive" :stores="stores" :areas="areas" :states="states" :mobile="isMobile" @alterUsers="alterUsers" :enterprises="enterprises" />
  </q-dialog>

  <q-dialog v-model="addUser" backdrop-filter="blur(4px) saturate(150%)" persistent :maximized="maximizedToggle"
    transition-show="slide-up" transition-hide="slide-down">
    <q-card class="my-card">
      <q-bar>
        Creacion Usuario ->
        <q-space />
        <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <addUserList :users="users" :stores="stores" :areas="areas" :states="states" :mobile="isMobile"
        @termino="termino" />
    </q-card>
  </q-dialog>



  <q-page-sticky position="bottom-right" :offset="[17, 17]" v-if="!canView">
    <q-fab vertical-actions-align="right" color="primary" icon="keyboard_arrow_up" direction="up" outline>
      <q-fab-action :hide-label="isMobile" outline color="positive" @click="addUser = !addUser" icon="add"
        label="Agregar" />
      <q-fab-action :hide-label="isMobile" outline color="negative" @click="mosArchive = !mosArchive" icon="archive"
        label="Arvhivados" />
    </q-fab>
  </q-page-sticky>
</template>

<script setup>
import { useVDBStore } from "stores/VDB";
import { UserStore } from "stores/UsersStore";
import { computed, ref, onMounted, watch, onBeforeUnmount } from "vue";
import { exportFile, useQuasar, date } from "quasar";
import userApi from "src/API/UserApi.js";
import reportExcel from "src/Excel/Reports/users.js";
import viewUsers from "src/components/User/viewUsers.vue";
import addUserList from "src/components/User/addUser.vue";
import { useRouter, useRoute } from "vue-router";
const $router = useRouter();
const $route = useRoute();

const VDB = useVDBStore();
const $q = useQuasar();
const userLYT = UserStore();
userLYT.setTitle("Usuarios");

const users = ref([]);
const stores = ref([]);
const areas = ref([]);
const states = ref([]);
const enterprises = ref([]);

const mosArchive = ref(false);
const addUser = ref(false)
const maximizedToggle = ref(true)



const isMobile = computed(() => $q.platform.is.mobile)
const bsktUser = computed(() => users.value.filter(e => e._state != 4));
const bsktUserArvhive = computed(() => users.value.filter(e => e._state == 4));
const canView = computed(() =>
  VDB.permission($route.meta.moduleId)
)

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  const resp = await userApi.getUsers();
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    users.value = resp.users;
    stores.value = resp.stores;
    areas.value = resp.areas;
    states.value = resp.states;
    enterprises.value = resp.enterprises;
    $q.loading.hide()
  }
};
init();

const termino = (userNew) => {
  users.value.push(userNew);
  addUser.value = false
}
const alterUsers = (userAlter) => {
  const inx = users.value.findIndex(e => e.id == userAlter.id)
  if (inx >= 0) {
    users.value.splice(inx, 1, userAlter)

  }
}
</script>
