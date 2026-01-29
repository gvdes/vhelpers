<template>
  <q-page padding>

    <q-table v-if="stores" hide-bottom :pagination="table.pagination" :rows="stores" grid>
      <template v-slot:top>
        <div class="row  q-col-gutter-sm full-width">
          <div class="col">
            <q-select v-model="filters.area" :options="areas" label="Área" filled dense clearable
              @clear="filters.area = []" option-label="name" multiple />
          </div>
          <div class="col" v-if="filters.area?.length">
            <q-select v-model="filters.position" :options="filteredPositions" option-label="name" label="Puesto" filled
              dense multiple clearable use-chips @clear="filters.position = []" />
          </div>
          <div class="col">
            <q-input v-model="table.filter" dense debounce="300" placeholder="Buscar" filled>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <!-- <div class="col-auto">
            <q-btn color="primary" icon="download" flat round @click="download" />
          </div> -->
        </div>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4" @drop="onDrop($event, props.row.id)" @dragenter.prevent
          @dragover.prevent>
          <q-card class="my-card" flat bordered>
            <q-card-section>
              <div></div>
              <div class="text-h6  ">
                <q-icon name="store" size="30px"  />{{
                  props.row.name.toUpperCase()
                }}
                ({{ getlist(props.row.id).length }})
                <q-btn  round flat dense :icon="props.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                  " @click="props.expand = !props.expand" />
              </div>
            </q-card-section>
            <q-slide-transition>
              <div v-show="props.expand">
                <div v-for="item in getlist(props.row.id)" :key="item.id" :draggable="true"
                  @dragstart="startDrag($event, item)">
                  <q-card class="my-card" flat bordered>
                    <q-card-section class="row between">
                      <div class="col text-caption">{{ item.name }} {{ item.surnames }}</div>
                      <div class="col">
                        <q-badge>
                          {{ item.rol?.name }}
                        </q-badge>
                      </div>
                      <q-separator />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-slide-transition>
          </q-card>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="drop">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-gutter-md">
          <q-avatar size="96px">
            <img :src="avatarUrl(change.item)" />
          </q-avatar>
          <div class="col">
            <div class="text-h6 text-weight-bold">
              {{ fullName(change.item) }}
            </div>
            <div class="text-grey-6">
              @{{ change.item.nick }} · {{ change.item.rol?.name }} <q-space />
            </div>
          </div>
          <q-space />
          <div>
            <span class="text-h5 text-primary text-center text-bold">Cambio de Sucursal</span>
            <div class=" text-h6 text-primary text-center">
              <span class="text-negative">{{ change.item.store.name }}</span><q-icon name="autorenew"
                class="q-mr-md q-ml-md" /><span class="text-positive">{{ change.l.name }}</span>
            </div>
          </div>


        </q-card-section>
        <q-card-section class="q-gutter-sm">
          <q-select v-model="change.item.area" :options="areas" option-label="name" label="Área" filled dense
            @update:model-value="change.item.rol = null" />
          <q-select v-model="change.item.rol" :options="positions" option-label="name" label="Rol" filled dense />
          <div class="row">
            <q-select class="col" v-model="change.item.store" :options="stores" option-label="name" label="Origen"
              filled dense disable />
            <q-separator spaced inset vertical dark />
            <q-select class="col" v-model="change.l.name" :options="stores" label="Destino" filled dense
              option-label="name" disable />
            <q-separator spaced inset vertical dark />
            <q-btn dense flat round icon="store" @click="addWorkpoints = true" class="changed-store-btn">
              <q-badge floating color="positive">
                {{ change.item.stores.length }}
              </q-badge>
            </q-btn>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn flat label="Continuar" color="positive" @click="sendChange" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="addWorkpoints">
      <q-card style="min-width:320px">
        <q-card-section class="text-weight-bold">
          Sucursales asignadas
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-option-group v-model="selectedStores" :options="storeOptions" type="toggle" dense color="primary" />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Guardar" @click="saveStores" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { UserStore } from 'stores/UsersStore';
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { exportFile, useQuasar, date } from 'quasar';
import userApi from "src/API/UserApi.js";
import { vizmedia } from 'boot/axios'
import reportExcel from 'src/Excel/Reports/users.js'
import viewRol from 'src/components/User/viewRol.vue';
const VDB = useVDBStore();
const $q = useQuasar();
const userLYT = UserStore();
userLYT.setTitle('Equipos')
const users = ref([]);
const stores = ref([]);
const areas = ref([]);
const states = ref([]);
const table = ref({
  filter: null,
  pagination: { rowsPerPage: [0] }
})
const filters = ref({
  store: [],
  state: [],
  area: [],
  position: []
})
const drop = ref(false);
const change = ref({
  item: null,
  l: null
});
const addWorkpoints = ref(false)
const selectedStores = ref([])
const positions = computed(() =>
  areas.value.find(a => a.id === change.value.item.area?.id)?.roles || []
)
const storeOptions = computed(() =>
  stores.value.map(s => ({
    label: s.name,
    value: s.id,
    disable: s.id === change.value.store?.id
  }))
)
const filteredPositions = computed(() => {
  if (!filters.value.area?.length) return []
  const map = new Map()
  filters.value.area.forEach(area => {
    area.roles?.forEach(pos => {
      map.set(pos.id, pos)
    })
  })
  return [...map.values()]
})
const filteredUsers = computed(() => {
  return users.value.filter(u => {
    if (
      filters.value.area.length &&
      !filters.value.area.some(a => a.id === u.rol?.area?.id)
    ) return false
    if (
      filters.value.position.length &&
      !filters.value.position.some(p => p.id === u.rol?.id)
    ) return false
    if (
      table.value.filter && !`${u.name} ${u.surnames}`
        .toLowerCase()
        .includes(table.value.filter.toLowerCase())
    ) return false
    return true
  })
})

const insfo = () => {
  selectedStores.value = []
  change.value.item.stores = []
  if (change.value.item.store) {
    selectedStores.value.push(change.value.l.id)
    change.value.item.stores.push(change.value.l)

  }
}

const getlist = (list) => {
  return filteredUsers.value.filter((e) => e._store == list);
};


const init = async () => {
  $q.loading.show({message:'Obteniendo Datos'})
  const resp = await userApi.getUserWorkpoints()
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    users.value = resp.users;
    stores.value = resp.stores;
    areas.value = resp.areas;
    states.value = resp.states;
    $q.loading.hide()
  }
}
const saveStores = () => {
  change.value.item.stores = stores.value.filter(s =>
    selectedStores.value.includes(s.id)
  )
  addWorkpoints.value = false
}

const avatarUrl = item => {
  const a = item.media?.find(m => m._type === 1)
  return a
    ? `${vizmedia}/users/${a._user}/${a.id}/${a.path}`
    : '/avatares/avatar1.png'
}
const fullName = item => `${item.name} ${item.surnames}`

const startDrag = (e, i) => {
  console.log(i);
  e.dataTransfer.dropEffect = "move";
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("itemID", i.id);
};

const onDrop = async (e, l) => {
  const itemID = e.dataTransfer.getData("itemID");
  const item = users.value.find((user) => user.id == itemID);
  console.log(item._store);
  console.log(item.id);
  console.log(item);
  let area = item.rol?.area;
  item.area = area
  change.value.item = item
  change.value.l = stores.value.find(b => b.id == l)
  insfo()
  drop.value = true
};



const sendChange = async () => {
  $q.loading.show({ message: 'Cambiando Sucursal' });
  let mod = {
    user: change.value.item.id,
    modify: {
      _store: change.value.l.id,
      _rol: change.value.item.rol.id,
      stores: change.value.item.stores.map(e => e.id)
    }
  };
  console.log(mod);
  const resp = await userApi.changeWorkpoint(mod);
  if (resp.fail) {
    console.log(resp);
  } else {
    let inx = users.value.findIndex((user) => user.id == change.value.item.id);
    console.log(inx);
    users.value.splice(inx, 1, resp.user);
    $q.notify({
      type: "positive",
      message: `El usurio ${resp.user.nick} se cambio a la sucursal ${resp.user.store.alias}`,
      position: "center"
    });
    drop.value = false
    $q.loading.hide()
  }
}

watch(addWorkpoints, v => {
  if (v) {
    selectedStores.value = change.value.item.stores.map(s => s.id)
  }
})
init()
</script>
<style>
.changed-store-btn {
  animation: pulse 0.4s ease-in-out;
}
</style>
