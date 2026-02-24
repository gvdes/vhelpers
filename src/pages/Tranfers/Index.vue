<template>
  <q-page padding>
    <q-table :rows="transferValid" :columns="table.columns" @row-click="rowClick">
      <template v-slot:top>
        <q-space />
        <q-btn color="primary" icon="event" outline>
          <q-menu>
            <div class="q-pa-md">
              <q-date v-model="fechas" range minimal @range-end="buscas" />
            </div>

          </q-menu>
        </q-btn>
        <q-separator spaced inset vertical dark />
        <q-btn color="primary" icon="add" outline>
          <q-menu>
            <q-card style="width: 350px;">
              <q-card-section class="text-h6 text-bold text-center">
                Traspaso Almacen
              </q-card-section>
              <q-card-section class=" items-center">
                <div class="row">
                  <q-select v-model="nwTransfer._origin" :options="warehousStore.warehouses" label="Origen" class="col"
                    option-label="name" emit-value option-value="id" map-options
                    @update:model-value="nwTransfer._destiny = null" :option-disable="(val) => optionDisable(val)" />
                  <q-icon name="arrow_forward" class="col" size="md" />
                  <q-select v-model="nwTransfer._destiny" :options="warehousStore.warehouses" label="Destino" emit-value
                    option-value="id" map-options class="col" option-label="name"
                    :option-disable="(val) => optionDisable(val)" :disable="nwTransfer._origin == null" />
                </div>
                <q-input v-model="nwTransfer.notes" type="text" label="Notas" />
              </q-card-section>
              <q-card-actions align="center">
                <q-btn flat label="Crear" color="positive" @click="addingTransfer" :disable="!validTransfer" />
              </q-card-actions>
            </q-card>
          </q-menu>
        </q-btn>
        <q-separator spaced inset vertical dark />
        <q-btn color="negative" icon="archive" outline @click="mosArchive = !mosArchive" />
      </template>
      <template #body-cell-notes="props">
        <q-td :props="props" class="ellipsis-cell">
          <span>{{ props.row.notes }}</span>
          <q-tooltip>
            {{ props.row.notes }}
          </q-tooltip>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="mosArchive" backdrop-filter="blur(4px) saturate(150%)">
      <q-card style="width: 830px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <q-table :rows="transferInValid" :columns="table.columns" />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="mosTransfer.state">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="text-h6">
          <div class="row">
            <div class="col text-left"> ID: <span class="text-bold">{{ mosTransfer.val.id }}</span> </div>
            <div class="col text-right"> N: <span class="text-bold">{{ mosTransfer.val.notes }}</span></div>
          </div>
          <div>
            <q-list>
              <q-item>
                <q-item-section class="text-center">
                  <q-item-label caption>Creado Por</q-item-label>
                  <q-item-label class="text-bold text-primary">{{ mosTransfer.val.created_by.nick }}</q-item-label>
                  <q-item-label class="text-bold text-positive" caption>{{
                    dayjs(mosTransfer.val.created_at).format('YYYY-MM-DD HH:mm:ss') }}</q-item-label>
                </q-item-section>
                <q-item-section class="text-center" v-if="mosTransfer.val.modify_by">
                  <q-item-label caption>Actualizado Por</q-item-label>
                  <q-item-label class="text-bold text-primary">{{ mosTransfer.val.modify_by?.nick }}</q-item-label>
                  <q-item-label class="text-bold text-positive" caption>{{
                    dayjs(mosTransfer.val.created_at).format('YYYY-MM-DD HH:mm:ss') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="negative" icon="close" v-close-popup outline />
          <q-space />
          <q-btn outline color="negative" @click="deleteTransfer" icon="delete" v-if="mosTransfer.val.state.id == 1" />
          <!-- <q-btn outline color="blue" v-close-popup icon="update" v-if="mosTransfer.val.state.id == 2 && VDB.session.credentials.rol._type == 1"  /> -->
          <q-btn outline color="pink" icon="print" v-if="mosTransfer.val.state.id == 2" @click="createPdf" />
          <q-btn outline color="primary" @click="$router.push(`transfers/${mosTransfer.val.id}`)" icon="send"
            v-if="mosTransfer.val.state.id == 1" />
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
import transferApi from 'src/API/transferApi';
import PDF from 'src/Pdf/transfers/transfers.js';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import { useRoute, useRouter } from "vue-router";
import { useWarehouse } from 'src/stores/warehousStore';

import dayjs from 'dayjs';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida

const $router = useRouter();
const warehousStore = useWarehouse()
warehousStore.setTitle(`Traspasos Entre Almacenes `)
warehousStore.setshowReportLocations(false);
warehousStore.setshowReportMinMax(false);
warehousStore.setshowOptions(false);

const VDB = useVDBStore();
const $q = useQuasar();
const mosArchive = ref(false)
const date = ref(false);
const fechas = ref(null);
const transfers = ref([]);
const mosTransfer = ref({
  state: false,
  val: null
});
const nwTransfer = ref({
  _origin: null,
  _destiny: null,
  notes: null
})

const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: r => r.id, align: 'center' },
    { name: 'created', label: 'Fecha', field: r => dayjs(r.created_at).format('YYYY-MM-DD'), align: 'center' },
    { name: 'updated', label: 'ULT Act', field: r => dayjs(r.updated_at).format('YYYY-MM-DD'), align: 'center' },
    { name: 'createdBy', label: 'Creado', field: r => r.created_by.nick, align: 'left' },
    { name: 'modifyBy', label: 'Actualizado', field: r => r.modify_by?.nick, align: 'left' },
    { name: 'origin', label: 'Origen', field: r => r.origin.alias, align: 'center' },
    { name: 'destiny', label: 'Destino', field: r => r.destiny.alias, align: 'center' },
    { name: 'notes', label: 'Notas', field: r => r.notes, align: 'center', classes: 'ellipsis-cell' },
    { name: 'articulos', label: 'Articulos', field: r => r.bodie.length, align: 'center' },
    { name: 'state', label: 'Estado', field: r => r.state.name, align: 'center', classes: r => labelStates(r.state.id) },
  ]
})

const validTransfer = computed(() => nwTransfer.value._origin && nwTransfer.value._destiny && nwTransfer.value.notes)
const transferValid = computed(() => transfers.value.filter(e => e._state != 3))
const transferInValid = computed(() => transfers.value.filter(e => e._state == 3))


const index = async () => {
  console.log("Recibiendo Datos :)")
  $q.loading.show({ message: 'Obteniendo Datos' })
  let data = { date: dayjs().format('YYYY-MM-DD') }
  console.log(data)
  const resp = await transferApi.getTransfers(data)
  if (resp.error) {
    console.log(resp)
  } else {
    console.log(resp)
    transfers.value = resp.transfer
    $q.loading.hide()
  }
}


const addingTransfer = async () => {
  console.log(nwTransfer.value)
  $q.loading.show({ message: 'Creando Traspaso' })
  const resp = await transferApi.addingTransfer(nwTransfer.value);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $router.push(`transfers/${resp.id}`);
    $q.loading.hide()
  }
}


const optionDisable = (val) => {
  return (
    val.id === nwTransfer.value._origin || ((VDB.session.credentials.rol._type !== 1) && val._type === 3)
  );
}


const buscas = async () => {
  console.log(fechas.value);
  $q.loading.show({ message: 'Obteniendo Datos' })
  let data = { date: fechas.value }
  console.log(data)
  const resp = await transferApi.getTransfers(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    transfers.value = resp.transfer
    $q.loading.hide();
    fechas.value = null
    date.value = false
  }
}

const labelStates = (state) => {
  switch (state) {
    case 1:
      return 'text-bold text-primary'
    case 2:
      return 'text-bold text-positive'
    case 3:
      return 'text-bold text-negative'
    case 4:
      return 'text-bold text-blue'
    default:
      return 'text-bold text-primary'

  }
}

const rowClick = (a, b) => {
  mosTransfer.value.state = !mosTransfer.value.state;
  mosTransfer.value.val = b
}

const deleteTransfer = async () => {
  $q.loading.show({ message: 'Eliminando Traspaso' });
  const resp = await transferApi.deleteTransfer(mosTransfer.value.val);
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.loading.hide();
    console.log(resp);
    let inx = transfers.value.findIndex(e => e.id == resp.id);
    console.log(inx);
    if (inx >= 0) {
      transfers.value.splice(inx, 1, resp);
      mosTransfer.value.state = false;
      mosTransfer.value.val = null;
    }
  }
}

const createPdf = async () => {
  await PDF.tranfer_warehouse(mosTransfer.value.val)
}

index();


</script>
<style>
.ellipsis-cell {
  max-width: 75px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
