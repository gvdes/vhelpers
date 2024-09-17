<template>
  <q-page padding>
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
          <q-select v-model="nwTransfer._origin" :options="warehouses" label="Almacen Origen" class="col"
            option-label="name" @update:model-value="nwTransfer._destiny = null" />
          <q-icon name="arrow_forward" class="col" size="md" />
          <q-select v-model="nwTransfer._destiny" :options="warehouses" label="Almacen Destino" class="col"
            option-label="name" :option-disable="(val) => optionDisable(val)" />
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

const index = async () => {
console.log("Recibiendo Datos :)")
$q.loading.show({message:'Obteniendo Datos'})
let sid = VDB.session.store.id;
const resp = await tranApi.index(sid)
if (resp.error) {
  console.log(resp)
} else {
  transfers.value = resp.transfer
  warehouses.value = resp.warehouses
  $q.loading.hide()
}
}


const adding = async () => {
$q.loading.show({message:'Creando Traspaso'})
nwTransfer.value.created_by = VDB.session.name;
nwTransfer.value._store = VDB.session.store.id;
console.log(nwTransfer.value)
const resp = await tranApi.addTransfer(nwTransfer.value)
if(resp.error){
  console.log(resp)
  $q.notify({message:`No se logro crear el traspaso`, position:'center', type:'negative'})
}else{
  $q.loading.hide();
  $q.notify({message:`Traspaso ${resp.code_fs} creada`, position:'center', type:'positive'})
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
if (val.id == nwTransfer.value._origin.id) {
  return true
}
return false
}


index();


</script>
