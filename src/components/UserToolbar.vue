<template>
  <div class="q-pa-sm transparent text-dark row items-center">
    <!-- <q-btn color="primary" icon="home" flat dense class="q-mr-sm" @click="$router.push('/')" /> -->
    <q-btn color="primary" icon="list" flat dense class="q-mr-sm" @click="drawerPr = !drawerPr" />
    <!-- <div class="col"  @click="$router.push('/')" ><span class="text-h6 text-pink">{{ user.credentials.nick }}</span></div> -->
    <div class="col">
      <q-btn class=" text-pink " flat :label="user.credentials.nick" @click="$router.push('/')" />
    </div>

    <div v-if="VDB.stores.length == 0" class="col text-center fs-inc1 text-primary fw-sbold">{{ user.store.name }}</div>
    <q-select v-model="stores.val" :options="VDB.stores" :option-label="opt => opt.store.name" borderless
      color="primary" @update:model-value="changeStore" v-if="VDB.stores.length > 1" dense class="text-center"
      options-selected-class="text-primary text-bold">
      <template v-slot:selected>
        <div class="text-center fs-inc1 text-primary fw-sbold">
          {{ stores.val.store.name }}
        </div>
      </template></q-select>

    <div class="col text-right">

    </div>
  </div>


  <q-drawer v-model="drawerPr" :width="300" :breakpoint="500" bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
    <q-scroll-area class="fit text-bold text-dark">
      <q-list>
        <div class="row">
          <q-btn color="primary" icon="home" flat dense class="col" @click="$router.push('/')" />
          <q-separator spaced inset vertical dark />
          <q-btn class="col" color="pink" icon="logout" no-caps flat @click="WSD.state = true" />
        </div>
        <q-separator />
        <q-separator spaced inset vertical dark />
        <template v-for="(menuItem, index) in VDB.modules" :key="index">
          <q-item clickable v-ripple :to="`/${menuItem.module.path}`">
            <q-item-section>
              <q-item-label class="text-h6 text-dark">{{ menuItem.module.name }}</q-item-label>
              <q-item-label caption>{{ menuItem.module.desc }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-avatar flat color="transparent" text-color="primary" icon="arrow_forward" />
            </q-item-section>
          </q-item>
          <q-separator />
        </template>

      </q-list>
    </q-scroll-area>
  </q-drawer>


  <q-dialog v-model="WSD.state" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="logout" color="primary" text-color="white" />
        <span class="q-ml-sm">Estas por cerrar sesion</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Nope!" color="primary" v-close-popup />
        <q-btn flat label="Simon!" color="primary" @click="sessionDestroy" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useVDBStore } from 'src/stores/VDB'
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import authsApi from "src/API/auth.js";
import { exportFile, useQuasar } from 'quasar';
const VDB = useVDBStore();
const user = VDB.session;
const $router = useRouter();
const WSD = ref({ state: false });

const sessionDestroy = () => {
  VDB.sessionDestroy();

  $router.replace('/auth');
}


const $q = useQuasar();
const modules = ref([]);
const drawerPr = ref(false)
const stores = ref({
  val: VDB.session,
  opts: []
})
const init = async () => {
  $q.loading.show({ message: 'Obteniendo Informacion' })
  const resp = await authsApi.getResources(user.credentials.id)
  if (resp.fail) {
    console.log(resp)
  } else {
    // console.log(resp)
    VDB.setModules(resp.rol.modules)
    VDB.setStores(resp.stores)
    // stores.value.opts = resp.stores
    // modules.value = resp.rol.modules
    $q.loading.hide()
  }
}

const changeStore = () => {
  $q.loading.show({ message: 'Cambiando sucursal' })
  VDB.session.store = stores.value.val.store
  VDB.setSession({
    ...VDB.session,
    store: stores.value.val.store
  })
  console.log(VDB.session)
window.location.reload()

  $q.loading.hide()
}

init();

</script>
