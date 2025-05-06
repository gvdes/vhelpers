<template>
  <q-page padding>
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <div class=" row justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Salidas Internas</span>
        </div>
        <div>
          <q-btn color="primary" icon="add" flat @click="addOuts = !addOuts" round />
          <q-btn color="primary" icon="event" flat round>
            <q-menu>

              <div class="q-pa-md">
                <div class="q-pb-sm">
                  <!-- Desde: {{ fechas.from }} : Hasta {{ fechas.to }} -->
                </div>
                <q-date v-model="fechas" range minimal />
              </div>
              <div class="flex justify-center"> <q-btn flat label="Obtener" color="positive" @click="buscas" /></div>

            </q-menu>
          </q-btn>
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
        <q-item-section class="text-center">ALMACEN</q-item-section>
        <!-- <q-item-section class="text-center">DESTINO</q-item-section> -->
        <q-item-section class="text-center">FACTUSOL</q-item-section>
        <q-item-section class="text-center">ARTICULOS</q-item-section>


      </q-item>
    </q-list>
    <q-separator spaced inset vertical dark />
    <q-list bordered v-for="(output, index) in (outputs)" :key="index">
      <q-item clickable v-ripple @click="direct(output)">
        <q-item-section class="text-center">{{ output.id }}</q-item-section>
        <q-item-section class="text-center">{{ dayjs(output.created_at).format('YYYY-MM-D') }}</q-item-section>
        <q-item-section class="text-center">{{ output.created_by }}</q-item-section>
        <q-item-section class="text-center">{{ output.notes }}</q-item-section>
        <q-item-section class="text-center">{{ output.warehouse.alias }}</q-item-section>
        <!-- <q-item-section class="text-center">{{ output.destiny.alias }}</q-item-section> -->
        <q-item-section class="text-center">{{ output.code_fs }}</q-item-section>
        <q-item-section class="text-center">{{ output.bodie.length }}</q-item-section>


      </q-item>
    </q-list>









  </q-page>





  <q-dialog v-model="addOuts" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section class="text-h5 text-bold text-center">
        Nueva Salida
      </q-card-section>
      <q-card-section class="row items-center">
        <q-select v-model="nwOut.warehouse" :options="userWarehouse" label="Almacen Origen" class="col"
          option-label="name" />
      </q-card-section>
      <q-card-section>
        <q-input v-model="nwOut.notes" type="text" label="Notas" />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat label="Cancelar" color="negative" @click="reset" />
        <q-btn flat label="Crear" color="positive" @click="adding" :disable="!nwOut.warehouse || !nwOut.notes" />
      </q-card-actions>
    </q-card>
  </q-dialog>


</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import outApi from "src/API/outputsApi";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import { useRoute, useRouter } from "vue-router";
import dayjs from 'dayjs';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
const $router = useRouter();

const VDB = useVDBStore();
const $q = useQuasar();


const addOuts = ref(false);
const fechas = ref(null);
const outputs = ref([])
const warehouses = ref([])
const nwOut = ref({
  warehouse: null,
  notes: null
})


const userWarehouse = computed(() => VDB.session.rol !== 'alm' ? warehouses.value.filter(w => [1, 2, 3, 4].includes(w.id)) : warehouses.value.filter(w => [5, 6].includes(w.id)))


const index = async () => {
  console.log("Recibiendo Datos :)")
  $q.loading.show({ message: 'Obteniendo Datos' })
  let sid = VDB.session.store.id;
  const resp = await outApi.index(sid)
  if (resp.error) {
    console.log(resp)
  } else {
    console.log(resp)
    outputs.value = resp.output
    warehouses.value = resp.warehouses
    $q.loading.hide()
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
  const resp = await outApi.getDate(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    outputs.value = resp
    $q.loading.hide();
    fechas.value = null
  }
}

const adding = async () => {
  $q.loading.show({ message: 'Creando Traspaso' })
  nwOut.value.created_by = VDB.session.name;
  nwOut.value._store = VDB.session.store.id;
  console.log(nwOut.value)
  const resp = await outApi.addOuts(nwOut.value)
  console.log(resp)
  if (resp.error) {
    console.log(resp)
    $q.notify({ message: `No se logro crear el traspaso`, position: 'center', type: 'negative' })
  } else {
   $q.loading.hide();
   $q.notify({ message: `Salida ${resp.code_fs} creada`, position: 'center', type: 'positive' })
   $router.push(`/outputs/${resp.id}`);
  }
}

const reset = () => {
  addOuts.value = false
  nwOut.value = {
    warehouse: null,
    notes: null
  }
}

const direct = (output) => {
  $router.push(`/outputs/${output.id}`);
}


if(VDB.session.rol == 'root' || VDB.session.rol == 'aud' ){
  index()
}else{
  $q.notify({message:'No tienes acceso a esta pagina',type:'negative',position:'center'})
  $router.replace('/');
}


</script>
