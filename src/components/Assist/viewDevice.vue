<template>
  <q-card-section>
    <q-card-section class="items-center">
      <q-input v-model="device.store.name" type="text" label="Sucursal" filled disable />
      <q-separator spaced inset vertical dark />
      <q-input v-model="device.id" type="text" label="Id" filled disable />
      <q-separator spaced inset vertical dark />
      <q-input v-model="device.serial_number" type="text" label="Numero de serie" filled disable />
      <q-separator spaced inset vertical dark />
      <q-input v-model="device.name" type="text" label="Dispositivo" filled disable />
      <q-separator spaced inset vertical dark />
      <q-input v-model="device.nick_name" type="text" label="Nombre" filled />
      <q-separator spaced inset vertical dark />
      <q-input v-model="device.ip_address" type="text" label="IP" filled>
        <template v-slot:append>
          <q-btn color="primary" icon="sensors" @click="ping(device.id)" flat />
        </template>
      </q-input>
      <q-separator spaced inset vertical dark />

      <div class="text-center">Dispositivo: <div class="text-center">{{ device._time }}</div>
      </div>
      <q-separator spaced inset vertical dark />
      <div class="text-center"> Horario: <div class="text-centert">{{ device._current }}</div>
      </div>
      <q-separator spaced inset vertical dark />
      <div class="text-center">Diferencia: <div class="text-center">{{
        dayjs(device._time).diff(dayjs(device._current),
          'second', true) }}</div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-btn color="primary" label="Registros" @click="replyRegister" outline class="full-width" rounded />
      <q-separator spaced inset vertical dark />
      <q-btn color="primary" label="Cambiar Horario" @click="changeDate" outline class="full-width" rounded />
      <q-separator spaced inset vertical dark />
      <q-btn color="primary" label="Eliminar Registros" @click="deleteConfirm.state = !deleteConfirm.state" outline
        rounded class="full-width" :disable="device._att < 600" />
    </q-card-section>
    <q-card-actions align="center">
      <q-btn flat label="Cancel" color="negative" v-close-popup />
      <q-btn flat label="Editar" color="positive" @click="edit(device)" />
    </q-card-actions>
  </q-card-section>

  <q-dialog v-model="deleteConfirm.state" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="warning" text-color="white" />
        <span class="q-ml-sm">Estas seguro de eliminar los registros ? Ya replicaste ? Segur@?</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="positive" v-close-popup />
        <q-btn flat label="Aceptar" color="negative" @click="deleteRegister" />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
const props = defineProps({
  device: { type: Object, default: {} },
  devices: { type: Array, default: [] },
})
const deleteConfirm = ref({ state: false })


const ping = async (ip) => {
  $q.loading.show({ message: 'Haciendo Pin :P' });
  const resp = await assistApi.ping(ip)
  if (resp.error) {
    console.log(resp)
  } else {
    let mssg = resp ? 'Con Conexion' : 'Sin Conexion';
    let type = resp ? 'positive' : 'negative';
    $q.notify({
      message: mssg,
      type: type,
      position: 'center'
    })
    $q.loading.hide();
  }
}

const replyRegister = async () => {
  const id = props.device.id
  console.log(id)
  $q.loading.show({ message: 'Impotando Registros :P' });
  const resp = await assistApi.getRegisDevice(id)
  if (resp.error) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.notify({ message: resp.goals, type: 'positive', position: 'center' })
    $q.loading.hide();
  }
}
const changeDate = async () => {
  const id = props.device.id
  console.log(id)
  $q.loading.show({ message: 'Cambiando Horario :P' });
  const resp = await assistApi.changeDate(id)
  if (resp.error) {
    console.log(resp)
  } else {
    console.log(resp)
    props.device.time = resp.date
    props.device.curret = resp.date
    $q.notify({ message: 'Cambio Realizado :)', type: 'positive', position: 'center' })
    $q.loading.hide();
  }
}

const deleteRegister = async () => {
  try {
    await replyRegister();
    const id = props.device.id
    console.log(id);
    $q.loading.show({ message: 'ELIMINANDO REGISTROS :P' });
    const resp = await assistApi.deleteAttendance(id);
    if (resp.error) {
      console.log(resp);
    } else {
      console.log(resp.data);
      $q.notify({ message: 'Registros Eliminados :)', type: 'positive', position: 'center' });
    }
  } catch (error) {
    console.error(error);
  } finally {
    $q.loading.hide();
    deleteConfirm.value.state = !deleteConfirm.value.state
  }
}

</script>
