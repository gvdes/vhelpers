<template>
  <q-page padding>

    <q-table :rows="mosUsers" :columns="table.columns">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th auto-width />
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <q-table :rows="props.row.sanctions" :columns="table.colApi" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import assistApi from "src/API/colabAPI.js";
import { exportFile, useQuasar, date } from 'quasar';
import addDeviceCm from "src/components/Assist/addDevice.vue";
import dayjs from 'dayjs';
import { AssistStore } from 'stores/AssistStore';
const AssistLYT = AssistStore();

const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
AssistLYT.setTitle('Sanciones')
AssistLYT.setShowBtns(false);
AssistLYT.setshowSanctBtns(true);

const table = ref({
  columns: [
    { name: 'id', label: 'Id', field: r => r.id, align: 'center' },
    { name: 'nick', label: 'Nick', field: r => r.nick, align: 'left' },
    { name: 'name', label: 'Nombre', field: r => r.complete_name, align: 'left' },
    { name: 'store', label: 'Sucursal', field: r => r.store.name, align: 'left' },
    { name: 'position', label: 'Puesto', field: r => r.rol.name, align: 'left' },
    { name: 'sanctions', label: 'Sancion', field: r => r.sanctions.length, align: 'center' },
  ],
  colApi: [
    { name: 'id', label: 'Id', field: r => r.id, align: 'center' },
    { name: 'created', label: 'Fecha', field: r => dayjs(r.created_at).format('YYYYY-mm-dd HH:mm:ss'), align: 'left' },
    { name: 'sanction', label: 'Sancion', field: r => r.sanction.name, align: 'left' },
    { name: 'crated', label: 'Creado', field: r => r.created_by.nick, align: 'left' },
    {
      name: 'details', label: 'Detalles', field: r => {
        if (r.sanction.id == 1) {
          return JSON.parse(r.details).reason
        } else {
          return JSON.parse(r.details).motivo
        }
      }, align: 'left'
    },
  ]
})

const mosUsers = computed(() => AssistLYT.users.filter(e => e.sanctions.length > 0))

const init = async () => {
  $q.loading.show({message:'Cargando Datos'})
  let data = {
    sid: VDB.session.store.id,
    uid: VDB.session.credentials.id,
    zone: VDB.session.credentials.zone ? VDB.session.credentials.zone.stores.map(e => e.id) : null
  }
  const resp = await assistApi.resourcesSanctions(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide()
    AssistLYT.setUsers(resp.users)
    AssistLYT.setSanctions(resp.sanctions)
  }
}

init()
</script>
