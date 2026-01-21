<template>
  <q-page>
    <q-table :rows="areas" row-key="name" grid :filter="table.filter" :pagination="table.pagination"
      :columns="table.columns" v-if="areas.length > 0">
      <template v-slot:top-right>
        <div class="row">
          <q-input class="col" dense debounce="300" v-model="table.filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-separator />
          <div class="col">
            <q-btn color="primary" flat icon="add" @click="wndArea.state = !wndArea.state" />
            <q-btn color="primary" flat icon="download" @click="downloadTable" />
          </div>
        </div>

      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card class="my-card" bordered flat>
            <q-card-section>
              <div class="text-h6">{{ props.row.name.toUpperCase() }}</div>
              <div class="text-subtitle2">Id: {{ props.row.id }}</div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn color="primary" icon="add" flat @click="addRol(props.row)" />
              <q-space />
              Puestos: {{ props.row.roles.length }}
              <q-space />
              <q-btn color="primary" round flat dense :icon="props.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="props.expand = !props.expand" />
            </q-card-actions>
            <q-slide-transition>
              <div v-show="props.expand">
                <q-separator />
                <q-card-section class="text-subtitle2" v-for="(roles, index) in props.row.roles" :key="index">
                  <q-list dense>
                    <q-item clickable v-ripple @click="mosPer(props.row, roles)">
                      <q-item-section>
                        <q-item-label overline> {{ roles.name }}</q-item-label>
                        <q-item-label caption>Jerarquia {{ roles.deep }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </div>
            </q-slide-transition>
          </q-card>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="wndArea.state" persistent>
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Creacion de nueva Area</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="addArea" @reset="wndArea.val = ''" class="q-gutter-md">
            <q-input v-model="wndArea.val" type="text" label="Nombre de nueva Area" filled :error="eArea"
              error-message="El area ya existe :0" />
            <div class="flex justify-center">
              <q-btn type="reset" color="negative" flat class="q-ml-sm" icon="close" v-close-popup />
              <q-btn type="submit" color="positive" flat icon="check" :disable="eArea" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="add" persistent>
      <viewRol :area="area" :edit="edit" :rol="rol" :typeRol="types" :permissions="modules" @reset="resetAdd"
        @termino="termino" />
    </q-dialog>



  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { UserStore } from 'stores/UsersStore';
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { exportFile, useQuasar, date } from 'quasar';
import userApi from "src/API/UserApi.js";
import reportExcel from 'src/Excel/Reports/users.js'
import viewRol from 'src/components/User/viewRol.vue';
const VDB = useVDBStore();
const $q = useQuasar();
const userLYT = UserStore();
userLYT.setTitle('Areas')

const areas = ref([]);
const types = ref([]);
const modules = ref([]);
const area = ref(null);
const rol = ref(null)
const edit = ref(false);

const table = ref({
  filter: '',
  pagination: { rowsPerPage: 12 },
  columns: [
    { id: 'id', name: 'id', label: 'ID', field: row => row.id },
    { id: 'name', name: 'name', label: 'Nombre', field: row => row.name },
    { id: 'roles', name: 'rol', label: 'Roles', field: row => row.roles?.length }
  ]
})


const wndArea = ref({
  state: false,
  val: ''
})
const add = ref(false)


const eArea = computed(() => areas.value.findIndex(e => e.name.toLowerCase() == wndArea.value.val.toLowerCase()) >= 0 ? true : false)

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  const resp = await userApi.getAreas()
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    $q.loading.hide()
    areas.value = resp.areas;
    types.value = resp.types;
    modules.value = resp.modules;
  }
}

const addRol = (row) => {
  add.value = true;
  edit.value = false
  area.value = row;
  rol.value = {
    alias: null,
    deep: 0,
    modules: [],
    name: null,
    type: { id: 1, name: 'Administrativo' },
    area: row.id
  }
}

const addArea = async () => {
  $q.loading.show({ message: 'Creando Area' });
  const resp = await userApi.addArea({ name: wndArea.value.val.toUpperCase() })
  if (resp.error) {
    alert('No se pudo generar el area')
  } else {
    $q.loading.hide()
    console.log(resp)
    $q.notify({
      message: 'Area Creada :)',
      type: 'positive',
      position: 'center'
    })
    wndArea.value.state = false
    wndArea.value.val = ''
    areas.value.push(resp)
  }
}

const resetAdd = () => {
  add.value = false;
  area.value = null;
  rol.value = null
}

const mosPer = async (a, row) => {
  add.value = true;
  area.value = a;
  rol.value = row
  edit.value = true
}

const termino = (playload) => {
  console.log(playload)
  let find = areas.value.findIndex(a => a.id == playload._area)
  if (find >= 0) {
    let inx = areas.value[find].roles.findIndex(e => e.id == playload.id);
    console.log(areas.value[find])
    if (inx < 0) {
      areas.value[find].roles.push(playload)
    } else {
      areas.value[find].roles.splice(inx, 1, playload)
    }
    resetAdd();
  }
}


const downloadTable = async () => {
  await reportExcel.areas(areas.value)
}


init()
</script>
