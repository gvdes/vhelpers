<template>
  <q-page padding>
    <q-header :class="$q.dark.isActive ? 'text-white bg-dark' : 'text-dark bg-white'" bordered>
      <UserToolbar />
      <q-separator />
      <div class=" row justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Traspasos entre
            Almacenes</span>
        </div>
        <div>
          <q-btn color="primary" icon="add" flat @click="addTransfer = !addTransfer" round />
          <q-btn color="primary" icon="event" @click="date = !date" flat round />
        </div>
      </div>
      <q-separator />
    </q-header>
    <q-list>
      <q-item>
        <q-item-section class="text-center">ID</q-item-section>
        <q-item-section class="text-center">CREADO</q-item-section>
        <q-item-section class="text-center">CREADO POR</q-item-section>
        <q-item-section class="text-center">NOTAS</q-item-section>
        <q-item-section class="text-center">ORIGEN</q-item-section>
        <q-item-section class="text-center">DESTINO</q-item-section>
        <q-item-section class="text-center">FACTUSOL</q-item-section>
        <q-item-section class="text-center">ARTICULOS</q-item-section>
      </q-item>
    </q-list>
    <q-separator spaced inset vertical dark />
    <q-list bordered v-for="(transfer, index) in (transfers)" :key="index">
      <q-item clickable v-ripple @click="direct(transfer)">
        <q-item-section class="text-center">{{ transfer.id }}</q-item-section>
        <q-item-section class="text-center">{{ dayjs(transfer.created_at).format('YYYY-MM-D') }}</q-item-section>
        <q-item-section class="text-center">{{ transfer.created_by }}</q-item-section>
        <q-item-section class="text-center">{{ transfer.notes }}</q-item-section>
        <q-item-section class="text-center">{{ transfer.origin.alias }}</q-item-section>
        <q-item-section class="text-center">{{ transfer.destiny.alias }}</q-item-section>
        <q-item-section class="text-center">{{ transfer.code_fs }}</q-item-section>
        <q-item-section class="text-center">{{ transfer.bodie.length }}</q-item-section>
      </q-item>
    </q-list>



    <q-dialog v-model="date">
      <q-card class="my-card">
        <q-card-section>
          <div class="q-pa-md">
            <div class="q-pb-sm">
              <!-- Desde: {{ fechas.from }} : Hasta {{ fechas.to }} -->
            </div>
            <q-date v-model="fechas" range minimal />
          </div>
        </q-card-section>
        <q-card-section>
          <q-card-actions align="right">
            <q-btn flat icon="close" color="negative" @click="date = !date" />
            <q-btn flat icon="check" color="positive" @click="buscas" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>


    <q-dialog v-model="addTransfer" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="text-h5 text-bold text-center">
          Nuevo Traspaso
        </q-card-section>
        <q-card-section class="row items-center">
          <q-select v-model="nwTransfer._origin" :options="userWarehouse" label="Almacen Origen" class="col"
            option-label="name" @update:model-value="nwTransfer._destiny = null"
            :option-disable="(val) => optionDisAud(val)" />
          <q-icon name="arrow_forward" class="col" size="md" />
          <q-select v-model="nwTransfer._destiny" :options="userWarehouse" label="Almacen Destino" class="col"
            option-label="name" :option-disable="(val) => optionDisable(val)" :disable="nwTransfer._origin == null" />
        </q-card-section>
        <q-card-section>
          <q-input v-model="nwTransfer.notes" type="text" label="Notas" />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="Cancelar" color="negative" @click="reset" />
          <q-btn flat label="Crear" color="positive" @click="adding" :disable="!validTransfer" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import tranApi from "src/API/transferApi";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import { useRoute, useRouter } from "vue-router";
import dayjs from 'dayjs';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
const $router = useRouter();

const VDB = useVDBStore();
const $q = useQuasar();

const date = ref(false);
const fechas = ref(null);
const addTransfer = ref(false);
const transfers = ref([]);
const warehouses = ref([]);

const nwTransfer = ref({
  _origin: null,
  _destiny: null,
  notes: null
})


const validTransfer = computed(() => nwTransfer.value._origin && nwTransfer.value._destiny && nwTransfer.value.notes)
const userWarehouse = computed(() => VDB.session.rol !== 'alm' && VDB.session.rol !== 'vld' && VDB.session.rol !== 'gce'  ? warehouses.value.filter(w => [1, 2, 3, 4].includes(w.id)) : warehouses.value.filter(w => [5, 6, 7,8,9].includes(w.id)))

const index = async () => {
  console.log("Recibiendo Datos :)")
  $q.loading.show({ message: 'Obteniendo Datos' })
  let sid = VDB.session.store.id;
  const resp = await tranApi.index(sid)
  if (resp.error) {
    console.log(resp)
  } else {
    console.log(resp)
    transfers.value = resp.transfer
    warehouses.value = resp.warehouses
    $q.loading.hide()
  }
}


const adding = async () => {
  $q.loading.show({ message: 'Creando Traspaso' })
  nwTransfer.value.created_by = VDB.session.name;
  nwTransfer.value._store = VDB.session.store.id;
  console.log(nwTransfer.value)
  const resp = await tranApi.addTransfer(nwTransfer.value)
  if (resp.error) {
    console.log(resp)
    $q.notify({ message: `No se logro crear el traspaso`, position: 'center', type: 'negative' })
  } else {
    $q.loading.hide();
    $q.notify({ message: `Traspaso ${resp.code_fs} creada`, position: 'center', type: 'positive' })
    $router.push(`transfers/${resp.id}`);
  }

}

const reset = () => {
  addTransfer.value = false
  nwTransfer.value = {
    _origin: null,
    _destiny: null,
    notes: null
  }
}

const optionDisable = (val) => {

  return (
    val.id === nwTransfer.value._origin.id ||
    ((VDB.session.rol !== 'gro'  && VDB.session.rol !== 'jfz' &&  VDB.session.rol !== 'axo') && val.id === 4)
  );
}

const optionDisAud = (val) => {
  if (val.id == 4 && (VDB.session.rol != 'gro' && VDB.session.rol  != 'jfz' && VDB.session.rol != 'axo')  ) {
    return true
  } else {
    return false
  }
}


const buscas = async () => {
  console.log(fechas.value);
  $q.loading.show({ message: 'Obteniendo Datos' })
  let sid = VDB.session.store.id;
  let data = {
    store: sid,
    date: fechas.value
  }

  console.log("Recibiendo Datos :)")
  const resp = await tranApi.getDate(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    transfers.value = resp
    $q.loading.hide();
    fechas.value = null
    date.value = false

  }
}

const direct = (transfer) => {
  console.log(transfer);
  let oid = transfer.id
  console.log((transfer.origin.id !== 4 && transfer.destiny.id !== 4))
  if (
    VDB.session.rol == 'axo' ||  VDB.session.rol == 'root' || VDB.session.rol == 'jfz' || VDB.session.rol == 'gro' || VDB.session.rol == 'des'
  ) {
    $router.push(`transfers/${oid}`);
  } else if (
    (VDB.session.rol == 'aux' || VDB.session.rol == 'gen') &&
    (transfer.origin.id !== 4 && transfer.destiny.id !== 4)
  ) {
    $router.push(`transfers/${oid}`);
  } else if (
   ( VDB.session.rol == 'alm' || VDB.session.rol == 'vld' || VDB.session.rol == 'gce'   ) &&
    ([5, 6,7].includes(transfer.destiny.id) || [5, 6,7].includes(transfer.origin.id))
  ) {
    $router.push(`transfers/${oid}`);
  } else {
    $q.notify({
      message: 'No tienes acceso a este traspaso',
      type: 'negative',
      position: 'center'
    });
  }
  // console.log(allowedIds.includes(transfer.origin.id) || allowedIds.includes(transfer.destiny.id));
}

index();


</script>
