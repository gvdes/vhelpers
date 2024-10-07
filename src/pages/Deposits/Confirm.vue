<template>
  <q-page padding>
    <q-table title="Depositos" :rows="bascket" row-key="id"
      :rows-per-page-options="[0]"  separator="cell" :columns="table.columns" :filter="table.filter">
      <template v-slot:top="props">
        <div class="col-2 q-table__title q-mr-xl">Depositos</div>

        <q-space />
        <q-select v-model="stores.val" :options="stores.opts" label="Sucursal" option-label="name" filled  style="width: 200px;">
          <template v-if="stores.val" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="stores.val = null" class="cursor-pointer" />
              </template>
        </q-select>
        <q-separator spaced inset vertical  />
        <q-select v-model="status.val" :options="status.opts" label="Estado" option-label="name" filled  style="width: 200px;">
          <template v-if="status.val" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="status.val = null" class="cursor-pointer" />
              </template>
        </q-select>
        <q-separator spaced inset vertical   />


        <q-btn color="primary" icon="event" @click="date = !date" flat round />
        <q-separator spaced inset vertical   />

        <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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
          <q-td key="concept" :props="props">
            <div class="text-bold text-left">{{ props.row.concept }}</div>
          </q-td>
          <q-td key="reference" :props="props">
            <div class="text-bold text-center">{{ props.row.refernce }}</div>
          </q-td>
          <q-td key="amount" :props="props">
            <div class="text-bold text-center">$ {{ Number(props.row.import).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
          </q-td>
          <q-td key="status" :props="props" >
            <q-select  :bg-color="colors[props.row.status.id - 1]" v-model="props.row.status" :options="status.opts" label="Estado" filled  option-label="name" dense @update:model-value="changeStatus(props.row)" />
        </q-td>
        <q-td key="ticket" :props="props">
          <div class="text-bold text-left">{{ props.row.ticket }}</div>
        </q-td>
          <q-td key="picture" :props="props"  @click="mosimage(props.row)">
            <q-img v-if="props.row.picture != null"
              :src="`http://192.168.10.160:1920/Assist/public/storage/${props.row.picture}`" :ratio="1.7" spinner-color="primary"
              spinner-size="20px" style="width: 100px"  />
            <q-avatar v-else rounded size="100px" font-size="52px" color="white" text-color="primary" icon="close"/>
          </q-td>
        </q-tr>

      </template>
    </q-table>
    <q-dialog v-model="mos.state" >
      <q-card class="my-card">
        <img :src="`http://192.168.10.160:1920/Assist/public/storage/${mos.val.picture}`">
        <q-card-section>
          <div class="text-h6">Creado: {{ mos.val.send_by }}</div>
          <div class="text-subtitle2">Estado: {{  mos.val.status.name }}</div>
        </q-card-section>
        <q-card-section>
          {{ mos.val.concept}}
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

// $socket.emit('Conexion', (VDB))
// $socket.on('Room',(param) => {console.log(param)})
$socket.on('List', (param) => {
  // console.log('listo')
  console.log(param);
  depositos.value.push(param)
})



const mos = ref({
  state:false,
  val:null
})
const status = ref({
  val:{id:1, name:"Pendiente"},
  opts:[]
})

const colors = [
  "yellow-11",
  "green-11",
  "red-11",
]

const date = ref(false);

const fechas = ref(null);

const stores = ref({
  val:null,
  opts:[]
})
const depositos = ref([])
const table = ref({
  columns:[
    {name:'id', label:'Id', align:'center' , field:row => row.id},
    {name:'created', label:'Creado por',align:'center', field:row => row.send_by},
    {name:'store', label:'Sucursal', align:'center', field:row => row.store.name},
    {name:'concept', label:'Concepto', align:'left',  field:row => row.concept},
    {name:'reference', label:'Referencia / Folio', align:'center', field:row => row.refernce},
    {name:'amount', label:'Importe', align:'center', field:row => row.amount},

    {name:'status', label:'Estado', align:'left', field:row => row.status.name},
    {name:'ticket', label:'Ticket', align:'center', field:row => row.ticket},
    {name:'picture', label:'Foto', align:'center', field:row => row.picture},

  ],
  filter:''
})

const bascket = computed(() => {
  if(stores.value.val && status.value.val){
    return depositos.value.filter(e => e._store == stores.value.val.id && e._status == status.value.val.id)
  }else if(stores.value.val && !status.value.val){
    return depositos.value.filter(e => e._store == stores.value.val.id)
  }else if(!stores.value.val && status.value.val){
    return depositos.value.filter(e => e._status == status.value.val.id)
  }else{
    return depositos.value
  }
})

const init = async () => {
  let date = new Date();
  let fecha =  dayjs(date).format("YYYY/MM/DD")
  fechas.value = fecha
  console.log(fecha);
  $q.loading.show({ message: 'Obteniendo Datos' })
  $q.loading.show({message:'Obteniendo Datos'})
  const resp =  await depoApi.getForm({filt:fechas.value})
  if(resp.fail){
    console.log(resp)
  }else{
    console.log(resp)
    $q.loading.hide();
    depositos.value = resp.deposit
    status.value.opts = resp.status
    stores.value.opts = resp.stores
  }
}

const mosimage = (row) => {
  mos.value.val = row
  mos.value.state = true
}

const changeStatus = async (row) => {
  $q.loading.show({message:'Cambiando estado'})
  let data = {
    id:row.id,
    status:row.status.id
  }
  console.log(data)
  const resp =  await depoApi.changeStatus(data)
  console.log(resp)
  if(resp.fail){
    console.log(resp)
  }else{
    $q.loading.hide()
    row._status = row.status.id
    $socket.emit('ChangeStatus',resp)
    $q.notify({message:'Se cambio de estado', type:'positive'})
  }
}

const buscas = async () => {
  console.log(fechas.value);
  $q.loading.show({ message: 'Obteniendo Datos' })
  const resp = await depoApi.getForm({filt:fechas.value})
  if(resp.fail){
    console.log(resp)
  }else{
    console.log(resp)
    $q.loading.hide();
    depositos.value = resp.deposit
    date.value = false
  }

}


init()
</script>
