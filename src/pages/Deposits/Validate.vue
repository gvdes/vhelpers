<template>
  <q-page padding>
    <q-table title="Depositos" :rows="bascket" row-key="id" :rows-per-page-options="[0]" separator="cell"
      :columns="table.columns">

      <template v-slot:top="props">
        <div class="col-2 q-table__title">Depositos</div>

        <q-space />
        <q-select v-model="status.val" :options="status.opts" label="Estado" option-label="name" filled  style="width: 200px;">
          <template v-if="status.val" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="status.val = null" class="cursor-pointer" />
              </template>
        </q-select>
        <q-separator spaced inset vertical   />

        <q-btn color="primary" icon="event" @click="date = !date" flat round />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            <div class="text-bold text-left">{{ props.row.id }}</div>
          </q-td>
          <q-td key="created" :props="props">
            <div class="text-bold text-center">{{ props.row.send_by }}</div>
          </q-td>
          <!-- <q-td key="start_date" :props="props">
            <div class="text-bold text-left"> {{ props.row.start_date }}</div>
          </q-td>
          <q-td key="final_date" :props="props">
            <div class="text-bold text-left"> {{props.row.final_date}}</div>
          </q-td> -->
          <q-td key="store" :props="props">
            <div class="text-bold text-center">{{ props.row.store.name }}</div>
          </q-td>
          <q-td key="origin" :props="props">
            <div class="text-bold text-center">{{ props.row.origin }}</div>
          </q-td>
          <q-td key="destiny" :props="props">
            <div class="text-bold text-center">{{ props.row.destiny }}</div>
          </q-td>
          <q-td key="concept" :props="props">
            <div class="text-bold text-left">{{ props.row.concept }}</div>
          </q-td>
          <q-td key="reference" :props="props">
            <div class="text-bold text-center">{{ props.row.refernce }}</div>
          </q-td>
          <q-td key="amount" :props="props">
            <div class="text-bold text-center">$ {{ Number(props.row.import).toLocaleString('en-US', {
              minimumFractionDigits: 2, maximumFractionDigits: 2
            }) }}</div>
          </q-td>
          <q-td key="status" :props="props">
            <!-- <div :class="`text-bold text-left text-${colors[props.row.status.id -1]}`">{{ props.row.status.name }}</div> -->
            <q-input v-model="props.row.status.name" type="text" filled :bg-color="colors[props.row.status.id - 1]"
              dense :disable=true />
          </q-td>
          <q-td key="ticket" :props="props">
            {{ props.row.ticket }}
            <q-popup-edit v-if="props.row.ticket == null && props.row._status == 2" v-model="props.row.ticket" title="Ticket" buttons v-slot="scope" label-set="Guardar" label-cancel="Cancelar" @update:model-value="updateTicket(props.row)">
            <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" mask="#-######"  />
          </q-popup-edit>
          </q-td>
          <q-td key="picture" :props="props" @click="mosimage(props.row)">
            <q-img v-if="props.row.picture != null"
              :src="`http://192.168.10.160:1920/Assist/public/storage/${props.row.picture}`" :ratio="1.7"
              spinner-color="primary" spinner-size="20px" style="width: 100px" />
            <q-avatar v-else rounded size="100px" font-size="52px" color="white" text-color="primary" icon="close" />
          </q-td>
        </q-tr>

      </template>
    </q-table>

    <q-dialog v-model="mos.state">
      <q-card class="my-card">
        <img :src="`http://192.168.10.160:1920/Assist/public/storage/${mos.val.picture}`">
        <q-card-section>
          <div class="text-h6">Creado: {{ mos.val.send_by }}</div>
          <div class="text-subtitle2">Estado: {{ mos.val.status.name }}</div>
        </q-card-section>
        <q-card-section>
          {{ mos.val.concept }}
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="date">
      <q-card class="my-card">
        <q-card-section>
          <div class="q-pa-md">
            <div class="q-pb-sm">
              <!-- Desde: {{ fechas.from }} : Hasta {{ fechas.to }} -->
              <!-- {{ fechas }} -->
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


  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import depoApi from 'src/API/deposits'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import dayjs from 'dayjs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import { $socket } from 'src/boot/socket';

const VDB = useVDBStore();
const $q = useQuasar();


const soc = $socket.connect();
if(soc.connected){
  // console.log(`Connect ${soc.id}`)
  console.log(`%c Connect ${soc.id} `, 'background: #222; color: #bada55');
}else{
  console.log(`%c No hay conexion en el socket `, 'background: #222; color: #bada55');
};

$socket.emit('Conexion', (VDB))
$socket.on('Room',(param) => {console.log(param)})
$socket.on('StoreList', (param) => {
  console.log(param);
  depositos.value.push(param)
})
$socket.on('ChangeStatus', (param) => {
  let inx = depositos.value.findIndex( e => e.id == param.id);
  if(inx >= 0){
    depositos.value[inx].status = param.status
    depositos.value[inx]._status = param._status
    $q.notify({message:`El deposito de $ ${param.import} cambio de status a ${param.status.name}`, type:`${param.status.id == 2 ? 'positive' : 'negative'}`, position:'center'})
  }
})

const mos = ref({
  state: false,
  val: null
})
const colors = [
  "yellow-11",
  "green-11",
  "red-11",
]

const status = ref({
  val:null,
  opts:[]
})

const date = ref(false);

const fechas = ref(null);


const depositos = ref([])
const table = ref({
  columns: [
    { name: 'id', label: 'Id', align: 'center', field: row => row.id },
    { name: 'created', label: 'Creado por', align: 'center', field: row => row.send_by },
    { name: 'store', label: 'Sucursal', align: 'center', field: row => row.store.name },
    { name: 'origin', label: 'Origen', align: 'center', field: row => row.origin},
    { name: 'destiny', label: 'Destino', align: 'center', field: row => row.destiny},
    { name: 'concept', label: 'Concepto', align: 'left', field: row => row.concept },
    { name: 'reference', label: 'Referencia / Folio', align: 'center', field: row => row.refernce },
    { name: 'amount', label: 'Importe', align: 'center', field: row => row.amount },
    { name: 'status', label: 'Estado', align: 'left', field: row => row.status.name },
    { name: 'ticket', label: 'Ticket', align: 'center', field: row => row.ticket },
    { name: 'picture', label: 'Foto', align: 'center', field: row => row.picture },

  ]
})

const bascket = computed(() => {
  if(status.value.val){
    return depositos.value.filter(e => e._status == status.value.val.id)
  }else{
    return depositos.value
  }
})

const init = async () => {
  let date = new Date();
  let fecha = dayjs(date).format("YYYY/MM/DD")
  fechas.value = fecha
  console.log(fecha);
  $q.loading.show({ message: 'Obteniendo Datos' })
  const resp = await depoApi.getFormStore(VDB.session.store.id, { filt: fechas.value })
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide();
    depositos.value = resp.deposit
    status.value.opts = resp.status
  }
}

const mosimage = (row) => {
  mos.value.val = row
  mos.value.state = true
}

const buscas = async () => {
  console.log(fechas.value);
  $q.loading.show({ message: 'Obteniendo Datos' })
  const resp = await depoApi.getFormStore(VDB.session.store.id, { filt: fechas.value })
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide();
    depositos.value = resp.deposit
    date.value = false
  }

}

const updateTicket = async(ticket ) => {
  console.log(ticket)

  $q.loading.show({message:'Poniendo Ticket'})
  let data = {
    id:ticket.id,
    ticket:ticket.ticket
  }
  console.log(data)
  const resp =  await depoApi.changeTicket(data)
  console.log(resp)
  if(resp.fail){
    console.log(resp)
  }else{
    $q.loading.hide()
    ticket.ticket = ticket.ticket
    $socket.emit('ChangeTicket',resp)
    $q.notify({message:'Se agrego Ticket', type:'positive'})
  }
}


init()
</script>
