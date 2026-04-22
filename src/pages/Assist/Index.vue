<template>
  <q-page padding>
    <q-table hide-bottom :rows="devices" :columns="table.columns" row-key="name" grid :filter="table.filter"
      :pagination="table.pagination">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm">
          <q-card flat bordered class="full-height" clickable v-ripple @click="mosRow(props.row)">
            <q-card-section class="row items-center no-wrap  ">
              <div class="q-ml-sm">
                <div class="text-weight-medium">
                  {{ props.row.nick_name }}
                </div>
                <div class="text-caption text-grey">@{{ props.row.store.name }}</div>
              </div>
              <q-space />
              <q-chip dense class="q-ml-xs" :color="props.row._status ? 'positive' : 'negative'">
              </q-chip>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="text-caption text-grey">
                {{ props.row.name }}
              </div>
              <div class="text-caption">
                {{ props.row.ip_address }}
              </div>
              <div class="text-caption row">
                <div class="col">
                  <div class="text-center">Horario</div>
                  <div class="text-center text-bold">{{ props.row._current }}</div>
                </div>
                <div class="col">
                  <div class="text-center">Dispositivo</div>
                  <div class="text-center text-bold">{{ props.row._time }}</div>
                </div>
              </div>
              <div class="row q-mt-sm">
                <q-chip dense class="q-ml-xs" color="primary" text-color="white">
                  R :{{ props.row._att ?? 0 }}
                </q-chip>
                <q-chip dense class="q-ml-xs" color="info" text-color="dark">
                  D : {{ dayjs(props.row._time).diff(dayjs(props.row._current), 'second', true) }} s
                </q-chip>
                <q-space />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="device.state" persistent>
      <q-card>
        <viewDevice :device="device.device" :devices="devices" />
      </q-card>
    </q-dialog>

    <q-dialog v-model="addDevice" persistent>
      <q-card>
        <viewDevice  />
      </q-card>
    </q-dialog>


    <q-page-sticky position="bottom-right" :offset="[17, 17]">
      <q-fab vertical-actions-align="right" color="primary" icon="keyboard_arrow_up" direction="up" outline>
        <q-fab-action :hide-label="isMobile" outline color="positive" @click="addDevice = !addDevice" icon="add"
          label="Agregar" />
      </q-fab>
    </q-page-sticky>

  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import assistApi from "src/API/colabAPI.js";
import { exportFile, useQuasar, date } from 'quasar';
import viewDevice from "src/components/Assist/viewDevice.vue";
import addDeviceCm from "src/components/Assist/addDevice.vue";
import dayjs from 'dayjs';
import { AssistStore } from 'stores/AssistStore';
const AssistLYT = AssistStore();

const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
AssistLYT.setTitle('Dispositivos')
AssistLYT.setShowBtns(false);
const timeouts = [];
const devices = ref([]);
const device = ref({
  state: false,
  device: null
})
const addDevice = ref(false);
const table = ref({
  columns: [
    { name: 'id', label: 'id', field: row => row.id },
    { name: 'name', label: 'Dispositivo', field: row => row.name },
    { name: 'nick_name', label: 'Nombre', field: row => row.nick_name },
    { name: 'id', label: 'Numero de Serie', field: row => row.serial_number },
    { name: 'ip', label: 'Direccion Ip', field: row => row.ip },
    { name: 'store', label: 'Sucursal', field: row => row.store.name }
  ],
  filter: '',
  pagination: { rowsPerPage: [0] }
})
const isMobile = computed(() => $q.platform.is.mobile)

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Dispositivos' })
  let data = {
    sid: VDB.session.store.id,
    rid: VDB.session.credentials.rol.id,
    uid: VDB.session.credentials.id,
    zone: VDB.session.credentials.zone ? VDB.session.credentials.zone.stores.map(e => e.id) : null
  }
  console.log(data)
  const resp = await assistApi.getDevices(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    $q.loading.hide()
    devices.value = resp
    pings(devices.value);
  }
}

const pings = (devices) => {

  devices.forEach((e, index) => {
    const t = setTimeout(async () => {
      const resp = await assistApi.ping(e.id)
      console.log(resp)
      if (resp.fail) {
        console.error(`Error pinging ${e.ip_address}:`);
      } else {
        console.log(resp)
        e._status = resp.connect;
        e._att = resp.register
        e._time = resp.date
        e._current = resp.current
      }
    }, index * 1000)
    timeouts.push(t)
  })
}

const mosRow = (e) => {
  console.log(e)
  device.value.state = true,
    device.value.device = e
}

init()
onBeforeUnmount(() => {
  timeouts.forEach(t => clearTimeout(t))
})
</script>
