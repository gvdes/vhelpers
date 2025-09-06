<template>
  <q-card class="my-card" style="width:40%">

    <q-card-section class="text-center text-bold text-h6">
      Creacion de Anticipo
    </q-card-section>
    <q-card-section>
      <q-form @submit="searchClient">
        <q-input v-model="clients.val" type="text" label="Cliente" filled />
      </q-form>
    </q-card-section>
    <q-card-section v-if="clients.opts.length > 0">
      <q-select v-model="anticipo.client" :options="clients.opts" label="Cliente" option-label="name" filled />
      <q-separator spaced inset vertical dark />
      <q-input v-model="anticipo.import" type="number" label="Importe" filled />
      <q-separator spaced inset vertical dark />
      <q-input v-model="anticipo.observacion" type="text" label="Observacion" filled />
    </q-card-section>
    <q-card-actions align="right" v-if="clients.opts.length > 0">
      <q-btn flat label="Cancelar" color="primary" @click="reset" />
      <q-btn flat label="Crear" color="primary" @click="CrearAnticipo" />
    </q-card-actions>
    <q-card-actions v-else>
      <q-btn flat label="Cancelar" color="primary" @click="reset" />
    </q-card-actions>

  </q-card>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { useLayoutCash } from 'stores/cashLYT';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { exportFile, useQuasar, date } from 'quasar';
import dayjs from 'dayjs';
import { computed, ref, onMounted, watch } from 'vue';
import cashApi from 'src/API/cashApi';
import orderApi from 'src/API/orderApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const cashLYT = useLayoutCash();
const cash = ref(null)

const clients = ref({
  val: null,
  opts: []
})

const anticipo = ref({
  client: null,
  import: 0,
  observacion: null
})

const searchClient = async () => {
  if (clients.value.val) {
    const resp = await orderApi.getClient(clients.value);
    if (resp.fail) {
      console.log(resp);
    } else {
      if (resp.length > 0) {
        console.log(resp);
        clients.value.opts = resp
      } else {
        $q.notify({ message: 'No hay ningun cliente con el parametro de busqueda intentalo de nuevo', type: 'negative', position: 'bottom' })
      }
    }
    console.log(resp);
  } else {
    $q.notify({ message: 'Coloca Numero, telefono o Nombre para hacer la busqueda', type: 'negative', position: 'bottom' })
  }
}

const reset = () => {
  clients.value = {
    val: null,
    opts: []
  }
  anticipo.value = {
    client: null,
    import: 0,
    observacion: null
  }
  cashLYT.closeDialogModule()
}

const CrearAnticipo = async () => {
  $q.loading.show({ message: 'Creando anticipo' })
  let data = {
    cash: cashLYT.cash,
    advance: anticipo.value
  }
  const resp = await cashApi.addAdvances(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    $q.loading.hide()
    $q.notify({ message: `Anticipo creado folio ${resp.fs_id}`, type: 'positive', position: 'bottom' })
    reset()
  }



}
</script>
