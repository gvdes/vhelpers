<template>
  <div class="q-pa-sm  row items-center" :class="$q.dark.isActive ? 'text-white bg-dark' : 'text-dark bg-white'">
    <q-btn color="primary" icon="list" flat dense class="q-mr-sm" @click="drawerPr = !drawerPr" />
    <div class="col">
      <q-btn class=" text-pink " flat :label="user.credentials.nick" @click="$router.push('/')" />
    </div>
    <div v-if="VDB.stores.length == 0" class="col text-center fs-inc1 text-primary fw-sbold">{{ !ismobile ?
      user.store.name : user.store.alias }}</div>
    <q-select v-model="stores.val" :options="VDB.stores" :option-label="opt => opt.store.name" borderless
      color="primary" @update:model-value="changeStore" v-if="VDB.stores.length > 1" dense class="text-center"
      options-selected-class="text-primary text-bold">
      <template v-slot:selected>
        <div class="text-center fs-inc1 text-primary fw-sbold">
          {{ !ismobile ? stores.val.store.name : stores.val.store.alias }}
        </div>
      </template></q-select>
    <div class="col text-right">
      <!-- <q-btn dense round flat icon="notifications" color="primary">
        <q-badge color="red" floating transparent>
          9+
        </q-badge>
      </q-btn> -->
    </div>
  </div>


  <q-drawer v-model="drawerPr" :width="300" :breakpoint="500" bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
    <q-scroll-area class="fit text-bold text-dark">
      <q-list>
        <q-item>
          <q-btn round flat class="q-mr-md">
            <q-avatar size="40px">
              <q-img :src="`/avatares/${VDB.session.credentials.avatar}`" />
            </q-avatar>
            <q-menu anchor="bottom right" self="top right">
              <q-list style="min-width: 180px">
                <!-- <q-item clickable>
                  <q-item-section>Ver Perfil</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Red Social</q-item-section>
                </q-item> -->
                <q-item clickable
                  @click="() => { mosAvatar.state = !mosAvatar.state; mosAvatar.val = VDB.session.credentials.avatar }">
                  <q-item-section>Cambiar Avatar</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-item-section>
            <q-item-label>{{ user.credentials.staff.complete_name }}</q-item-label>
            <q-item-label caption>{{ user.store.alias }} <q-space /> ({{ user.credentials.nick }})</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <div class="row">
          <q-btn color="primary" icon="home" flat dense class="col" @click="$router.push('/')" />
          <q-separator spaced inset vertical dark />
          <q-btn class="col" color="pink" icon="logout" no-caps flat @click="WSD.state = true" />
          <q-separator spaced inset vertical dark />
          <q-toggle v-model="$q.dark.mode" color="primary" :icon="$q.dark.mode ? 'light_mode' : 'dark_mode'" keep-color
            @update:model-value="toggleDark" class="col text-center" />
        </div>
        <q-separator />
        <q-separator spaced inset vertical dark />
        <template v-for="(menuItem, index) in VDB.modules" :key="index">
          <q-expansion-item expand-separator :label="menuItem.name" :dark="$q.dark.isActive"
            :header-class="$q.dark.isActive ? 'text-white' : 'text-dark'">
            <div v-for="(modul, inx) in menuItem.modules" :key="inx">
              <q-item clickable v-ripple :to="`/${modul.path}`" :dark="$q.dark.isActive">
                <q-item-section side>
                  <q-btn flat round dense icon="star" :color="favorites.isFavorite(modul.path) ? 'yellow-8' : 'grey'"
                    @click.stop.prevent="favorites.toggle(modul)" />
                </q-item-section>
                <q-item-section>
                  <q-item-label :class="$q.dark.isActive ? 'text-white' : 'text-dark'">
                    {{ modul.name }}
                  </q-item-label>
                  <q-item-label caption :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-7'">
                    {{ modul.desc }}
                  </q-item-label>
                </q-item-section>
                <q-item-section avatar>
                  <q-avatar flat color="transparent" :text-color="$q.dark.isActive ? 'primary' : 'primary'"
                    icon="arrow_forward" />
                </q-item-section>
              </q-item>
              <q-separator :dark="$q.dark.isActive" />
            </div>
          </q-expansion-item>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>

  <q-dialog v-model="mosAvatar.state" persistent>
    <q-card>
      <q-card-section>
        <div class="row q-gutter-md justify-center q-pa-md">
          <div v-for="(avatar, index) in mosAvatar.opts" :key="index" class="relative-position"
            style="width: 100px; height: 100px; cursor: pointer" @click="selectAvatar(avatar)">
            <q-img :src="`/avatares/${avatar}`" :alt="avatar" style="width: 100px; height: 100px"
              class="rounded-borders" />
            <q-icon v-if="mosAvatar.val === avatar" name="check_circle" color="" size="sm"
              class="absolute-bottom-right q-mt-sm q-mr-sm" />
          </div>
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="OK" @click="changeAvatar" color="positive" />
        <q-btn flat label="Cancelar" v-close-popup color="negative" />
      </q-card-actions>
    </q-card>
  </q-dialog>

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
import { CandyBus } from 'src/services/CandyBus'
import { useFavoritesStore } from 'src/stores/favorites'
const favorites = useFavoritesStore()

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

const ismobile = computed(() => $q.platform.is.mobile);
const mosAvatar = ref({
  val: null,
  state: false,
  opts: [
    'avatar0.png',
    'avatar1.png',
    'avatar2.png',
    'avatar3.png',
    'avatar4.png',
    'avatar5.png',
    'avatar6.png',
    'avatar7.png',
    'avatar8.png',
    'avatar9.png',
    'avatar10.png',
    'avatar11.png',
    'avatar12.png',
    'avatar13.png',
    'avatar14.png',
    'avatar15.png',
    'avatar16.png',
    'avatar17.png',
    'avatar18.png',
    'avatar19.png',
    'avatar20.png',
    'avatar21.gif',
    'avatar22.png',
    'avatar23.png',
    'avatar24.png',
    'avatar25.png',
    'avatar26.png',
    'avatar27.png',
  ]
})
const init = async () => {
  // $q.loading.show({ message: 'Obteniendo Informacion' })
  const resp = await authsApi.getResources(user.credentials.id)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    VDB.setModules(resp.grouped_modules)
    VDB.setStores(resp.stores)
    VDB.modulesLoaded = true;
    // stores.value.opts = resp.stores
    // modules.value = resp.rol.modules
    // $q.loading.hide()
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

// Restaurar modo guardado
const saved = localStorage.getItem('mode')
if (saved) {
  $q.dark.set(saved === 'dark')
}

// Toggle del usuario
const toggleDark = () => {
  $q.dark.toggle()
  localStorage.setItem('mode', $q.dark.isActive ? 'dark' : 'light')
}

const selectAvatar = (avatar) => {
  mosAvatar.value.val = avatar
}


const changeAvatar = async () => {
  $q.loading.show({ message: 'Cambiando Avatar :)' })
  let data = {
    id: VDB.session.credentials.id,
    avatar: mosAvatar.value.val
  }
  const resp = await authsApi.changeAvatar(data);
  if (resp.fail) {
    console.log(resp)
    CandyBus.emit('error', 'algo salio mal')
  } else {
    console.log(resp);
    VDB.setSession({
      ...VDB.session,
      credentials: {
        ...VDB.session.credentials,
        avatar: mosAvatar.value.val
      }
    })
    CandyBus.emit('error', 'algo salio bien')
    mosAvatar.value.val = null
    mosAvatar.value.state = false
    $q.notify({ type: 'positive', icon: 'check' })
    $q.loading.hide()
  }
}



init();

</script>
