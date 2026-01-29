<template>
  <q-table :rows="filteredUsers" grid :filter="table.filter" hide-bottom :pagination="table.pagination">
    <template v-slot:top v-if="!mobile">
      <div class="row  q-col-gutter-sm full-width">
        <div class="col">
          <q-select v-model="filters.store" :options="stores" label="Sucursal" filled dense clearable
            @clear="filters.store = []" option-label="name" multiple />
        </div>
        <div class="col">
          <q-select v-model="filters.state" :options="states" label="Estado" filled dense clearable
            @clear="filters.state = []" option-label="name" multiple />
        </div>
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
        <div class="col-auto">
          <q-btn color="primary" icon="download" flat round @click="download" />
        </div>
      </div>
    </template>
    <template v-slot:top-right v-else>
      <q-input v-model="table.filter" dense debounce="300" placeholder="Buscar" filled>
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div class="col-auto">
        <q-btn color="primary" icon="filter_alt" flat round @click="mosFilt = !mosFilt" />
      </div>
      <div class="col-auto">
        <q-btn color="primary" icon="download" flat round @click="download" />
      </div>
    </template>
    <template v-slot:item="props">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm" @click="mosUser(props.row)">
        <q-card flat bordered class="full-height" clickable v-ripple>
          <q-card-section class="row items-center no-wrap  ">
            <q-avatar size="48px">
              <img :src="avatarUrl(props.row.media.find(e => e._type == 1))" />
            </q-avatar>
            <div class="q-ml-sm">
              <div class="text-weight-medium">
                {{ props.row.name }} {{ props.row.surnames }}
              </div>
              <div class="text-caption text-grey">@{{ props.row.nick }}</div>
            </div>
            <q-space />
            <q-chip dense class="q-ml-xs" :color="color(props.row)">
            </q-chip>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-caption text-grey">
              {{ props.row.email }}
            </div>
            <div class="row q-mt-sm">
              <q-chip dense class="q-ml-xs" color="primary" text-color="white">
                {{ props.row.rol.name }}
              </q-chip>
              <q-chip dense class="q-ml-xs" color="info" text-color="dark">
                {{ props.row.store.alias }}
              </q-chip>
              <q-space />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>

  <q-dialog v-model="mosFilt">
    <q-card class="mycard" style="width: 200px;">
      <q-card-section class="items-center">
        <div class="col">
          <q-select v-model="filters.store" :options="stores" label="Sucursal" filled dense clearable
            option-label="name" @clear="filters.store = []" multiple />
        </div>
        <q-separator spaced inset vertical dark />
        <div class="col">
          <q-select v-model="filters.state" :options="states" label="Estado" filled dense clearable option-label="name"
            multiple @clear="filters.state = []" />
        </div>
        <q-separator spaced inset vertical dark />
        <div class="col">
          <q-select v-model="filters.area" :options="areas" label="Área" filled dense clearable option-label="name"
            multiple @clear="filters.area = []" />
        </div>
        <q-separator spaced inset vertical dark />
        <div class="col" v-if="filters.area?.length">
          <q-select v-model="filters.position" :options="filteredPositions" option-label="name" label="Puesto" filled
            dense multiple clearable use-chips @clear="filters.position = []" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="rowUser.state" backdrop-filter="blur(4px) saturate(150%)" persistent :maximized="maximizedToggle"
    transition-show="slide-up" transition-hide="slide-down">
    <q-card class="my-card">
      <q-bar>
        Vista Usuario -> {{ (rowUser.val.nick).toUpperCase() }}
        <q-space />
        <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" @click="reset">
          <q-tooltip class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <viewUser :user="rowUser.val" :users="users" :stores="stores" :areas="areas" :states="states" @termino="termino"
        :enterprises="enterprises" />
    </q-card>

  </q-dialog>



</template>

<script setup>
import UserApi from 'src/API/UserApi';
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { exportFile, useQuasar, date } from 'quasar';
import { vizmedia } from "boot/axios"
import reportExcel from 'src/Excel/Reports/users.js'
import viewUser from "src/components/User/viewUser.vue";

import { useRouter, useRoute } from "vue-router";
import { useVDBStore } from "stores/VDB";
const VDB = useVDBStore();
const $router = useRouter();
const $route = useRoute();




const $q = useQuasar();
const props = defineProps({
  users: { type: Array, default: [] },
  stores: { type: Array, default: [] },
  states: { type: Array, default: [] },
  areas: { type: Array, default: [] },
  enterprises: { type: Array, default: [] },
  mobile: { type: Boolean, default: false }
})
const emit = defineEmits(['alterUsers'])
const maximizedToggle = ref(false)
const rowUser = ref({
  state: false,
  val: null
})
const filters = ref({
  store: [],
  state: [],
  area: [],
  position: []
})

const table = ref({
  filter: null,
  pagination: { rowsPerPage: 0 }
})
const mosFilt = ref(false);

const filteredUsers = computed(() => {
  return props.users.filter(u => {
    if (
      filters.value.store.length &&
      !filters.value.store.some(s => s.id === u.store?.id)
    ) return false
    if (
      filters.value.state.length &&
      !filters.value.state.some(s => s.id === u.state?.id)
    ) return false
    if (
      filters.value.area.length &&
      !filters.value.area.some(a => a.id === u.rol?.area?.id)
    ) return false
    if (
      filters.value.position.length &&
      !filters.value.position.some(p => p.id === u.rol?.id)
    ) return false
    return true
  })
})
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
const color = (e) => {
  if (e._state == 1) {//nuevo
    return 'accent' // azul
  } else if (e._state == 2) {//activo
    return 'green' // verde
  } else if (e._state == 3) {//bloqueado
    return 'warning' //naranja
  } else if (e._state == 4) {//archivado
    return 'negative' // rojo
  } else if (e._state == 5) {//reinicio
    return 'primary' // morado
  } else {
    return 'dark' //negro default
  }
}

const canView = computed(() =>
  VDB.permission($route.meta.moduleId)
)

const avatarUrl = (avatar) => {
  return avatar ? `${vizmedia}/users/${avatar?._user}/${avatar?.id}/${avatar?.path}` : "/avatares/avatar1.png";
};


const mosUser = (b) => {
  rowUser.value.state = true
  rowUser.value.val = b
}
const reset = () => {
  rowUser.value.state = false
  rowUser.value.val = null
}
const termino = (userAlter) => {
  emit('alterUsers', userAlter)
  reset()
}

const download = async () => {
  $q.loading.show({ message: '' })
  reportExcel.users({ value: filteredUsers.value })
  $q.loading.hide()
}

watch(() => filters.value.area, areas => {
  filters.value.position = filters.value.position.filter(p =>
    areas.some(a => a.id === p._area)
  )
})
watch(
  () => filters.value.area,
  () => {
    filters.value.position = []
  },
  { deep: true }
)
</script>
