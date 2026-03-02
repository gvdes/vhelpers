<template>
  <q-page padding>
    <q-table :rows="filteredRefunds" :columns="table.columns" @row-click="redirect">
      <template v-slot:top>
        <q-space />
        <q-select v-model="table.status" :options="states" label="Estado" filled clearable style="width: 20%;" dense option-label="name"  />
        <q-separator spaced inset vertical dark />
        <q-input v-model="table.filter" type="text" label="Buscar" dense outlined />
        <q-separator spaced inset vertical dark />
        <q-btn color="primary" icon="event" outline>
          <q-menu>
            <div class="q-pa-md">
              <q-date v-model="table.fechas" range minimal />
            </div>
          </q-menu>
        </q-btn>
        <q-separator spaced inset vertical dark />
        <q-btn color="primary" icon="all_out" outline title="salida Interna"
          v-if="VDB.session.credentials.rol._type == 1" :option-disable="(val) => optionDisableMov(val)">
          <q-menu>
            <q-card style="width: 300px;">
              <q-card-section class="text-h6 text-bold text-center">
                Salida Interna
              </q-card-section>
              <q-card-section class=" items-center">
                <div class="row">
                  <q-select v-model="newOut._warehouse" :options="warehousStore.warehouses" label="Almacen" class="col"
                    option-label="name" emit-value option-value="id" map-options
                    :option-disable="(val) => optionDisableMov(val)" />
                </div>
                <q-input v-model="newOut.notes" type="text" label="Notas" />
              </q-card-section>
              <q-card-actions align="center">
                <q-btn flat label="Contultar" color="primary" @click="mosOuts = !mosOuts" />
                <q-btn flat label="Crear" color="positive" @click="addingOut" :disable="!validOut" />
              </q-card-actions>
            </q-card>
          </q-menu></q-btn>
      </template></q-table>
  </q-page>




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
import { useWarehouse } from 'src/stores/warehousStore';

const $router = useRouter();
const warehousStore = useWarehouse()
warehousStore.setTitle(`Salidas Internas`)
warehousStore.setshowReportLocations(false);
warehousStore.setshowReportMinMax(false);
warehousStore.setshowOptions(false);

const VDB = useVDBStore();
const $q = useQuasar();
const states = ref([])
const outputs = ref([])
const newOut = ref({
  _warehouse: null,
  notes: null
})
const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: r => r.id, align: 'center' },
    { name: 'created', label: 'Fecha', field: r => dayjs(r.created_at).format('YYYY-MM-DD'), align: 'center' },
    { name: 'updated', label: 'ULT Act', field: r => dayjs(r.updated_at).format('YYYY-MM-DD'), align: 'center' },
    { name: 'createdBy', label: 'Creado', field: r => r.createdby.nick, align: 'left' },
    { name: 'modifyBy', label: 'Actualizado', field: r => r.modifyby?.nick, align: 'left' },
    { name: 'warehouse', label: 'Almacen', field: r => r.warehouse.alias, align: 'center' },
    // { name: 'destiny', label: 'Destino', field: r => r.destiny.alias, align: 'center' },
    { name: 'notes', label: 'Notas', field: r => r.notes, align: 'center', classes: 'ellipsis-cell' },
    { name: 'articulos', label: 'Articulos', field: r => r.bodie.length, align: 'center' },
    { name: 'state', label: 'Estado', field: r => r.state.name, align: 'center', classes: r => labelStates(r.state.id) },
  ],
  fechas: null,
  filter: null,
  status:null
})
const validOut = computed(() => newOut.value._warehouse && newOut.value.notes)

const filteredRefunds = computed(() => {
  if (!outputs.value) return null
  const filterText = table.value.filter?.toLowerCase() || null
  const statusFilter = table.value.status?.id || null
  const dateFilter = table.value.fechas || null
  const applyFilters = (list) => {
    return list?.filter(item => {
      const matchText = !filterText ||
        item.id?.toString().includes(filterText) ||

        item.notes?.toLowerCase().includes(filterText) ||

        (Array.isArray(item.bodie) &&
          item.bodie.some(b =>
            b.code?.toLowerCase().includes(filterText)
          ))
      const matchStatus = !statusFilter ||
        item._state === statusFilter
      const matchDate = !dateFilter ||
        dayjs(item.created_at).format('YYYY/MM/DD') === dateFilter
      return matchText && matchStatus && matchDate
    })

  }
  return applyFilters(outputs.value)
})


const index = async () => {
  if(VDB.session.credentials.rol._type == 1){
  console.log("Recibiendo Datos :)")
  $q.loading.show({ message: 'Obteniendo Datos' })
  // let sid = VDB.session.store.id;
  const resp = await outApi.index()
  if (resp.error) {
    console.log(resp)
  } else {
    console.log(resp)
    outputs.value = resp.outs
    states.value = resp.states
    $q.loading.hide()
  }
  }else{
    $router.push(`/`);

  }

}





const addingOut = async () => {
  console.log(newOut.value)
  $q.loading.show({ message: 'Creando Salida Interna' })
  newOut.value._state = 1;
  const resp = await outApi.addOuts(newOut.value);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $router.push(`/warehouse/outputs/${resp.id}`);
    $q.loading.hide()
  }
}

const optionDisableMov = (val) => {
  return val._type !== 1
}

const redirect = (a,output) => {
  console.log(output)
  if(output._state == 1 && output._created_by == VDB.session.credentials.id){
    $router.push(`/warehouse/outputs/${output.id}`);
  // }else if(output._state == 2 && VDB.session.credentials.id ){
  //       $q.dialog({
  //         title: `Salida N.${output.id}`,
  //         message: 'Quires Actualizar la salida ? ',
  //         cancel: true,
  //         persistent: false
  //       }).onOk(async () => {
  //         $q.loading.show({ message: 'Cambiando Estado' })
  //         const nxtCo = await outApi.updateOutput(output)
  //         if (nxtCo.fail) {
  //           $q.notify({ message: 'No pudo cambiar de status', type: 'negative', position: 'top' })
  //           $q.loading.hide();
  //           $router.replace(`warehouse/refunds`);
  //         } else {
  //           console.log(nxtCo);
  //           $q.loading.hide();
  //           refund.value = nxtCo
  //         }
  //       }).onCancel(() => {
  //         // $router.replace(`/warehouse/refunds`);
  //       })
  }
  else{
    $q.notify({message:'No puedes Ingresar A esta salida Interna',type:'negative',position:'top'})
  }
  // $router.push(`/outputs/${output.id}`);
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
index()


</script>
