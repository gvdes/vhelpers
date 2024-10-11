<template>
  <q-page padding>

    <div class="flex justify-center">
      <q-form @submit="submitForm" @reset="onReset" class="q-gutter-md">

        <q-input v-model="values.origin" type="number" label="Cuenta Origen" filled dense />
        <!-- <q-input v-model="values.destiny" type="number" label="Cuenta Destino" filled dense /> -->
        <q-select v-model="values.destiny" :options="accounts" label="Cuenta Destino" filled dense option-label="name"
          option-value="name">
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
                <q-item-label caption>{{ scope.opt.bank }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input v-model="values.concepto" type="text" label="Referencia" filled dense />
        <q-input v-model="values.reference" type="number" label="Referencia Numerica / Folio" filled dense />
        <q-input v-model="values.amount" type="number" label="Monto" filled dense />

        <q-uploader v-model="values.files" accept="image/*" :auto-upload="false" @added="onFileAdded" ref="refe">
          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all"
                @click="() => { refe.reset(); values.files = [] }" round dense flat>
                <q-tooltip>Limpiar</q-tooltip>
              </q-btn>
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
              <div class="col">
                <div class="q-uploader__title">Subir Archivo</div>
                <div class="q-uploader__subtitle">{{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}</div>
              </div>
              <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" @click="scope.pickFiles" round dense flat>
                <q-uploader-add-trigger />
                <q-tooltip>Subir Archivo</q-tooltip>
              </q-btn>
            </div>
          </template>

          <template v-slot:list="scope">
            <div v-for="file in scope.files" :key="file.__key">
              <div class="row">
                <q-img :src="file.__img.src" :ratio="20 / 8" spinner-color="primary" spinner-size="82px" class="col" />
                <q-btn color="negative" icon="delete" @click="() => { scope.removeFile(file); values.files = [] }" flat
                  rounded="" />
              </div>
              <div class="text-overline">{{ file.name }}</div>
            </div>
          </template>
        </q-uploader>
        <div class="flex justify-center">
          <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" />
          <q-btn label="Enviar" type="submit" color="primary" flat :disable="!validform" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import depoApi from 'src/API/deposits'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
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
if (soc.connected) {
  // console.log(`Connect ${soc.id}`)
  console.log(`%c Connect ${soc.id} `, 'background: #222; color: #bada55');
} else {
  console.log(`%c No hay conexion en el socket `, 'background: #222; color: #bada55');
};

$socket.emit('Conexion', (VDB))
$socket.on('Room', (param) => { console.log(param) })

console.log(VDB.session.name)

const accounts = ref([
  { id: 1, name: '0110292745', bank: 'BBVA' },
  { id: 2, name: '0110292974', bank: 'BBVA' },
  { id: 3, name: '0110292834', bank: 'BBVA' },
  { id: 4, name: '0110292761', bank: 'BBVA' },
  { id: 5, name: '0110292982', bank: 'BBVA' },
  { id: 6, name: '0110293040', bank: 'BBVA' },
  { id: 7, name: '0473998967', bank: 'BBVA' },
  { id: 8, name: '0110292729', bank: 'BBVA' },

])

const refe = ref(null);

const values = ref({
  origin: null,
  destiny: null,
  reference: null,
  concepto: null,
  amount: null,
  files: []
})

const onReset = () => {
  values.value = {
    origin: null,
    destiny: null,
    reference: null,
    concepto: null,
    amount: null,
    files: []
  }
  refe.value.reset();
}

const validform = computed(() => values.value.origin && values.value.destiny && values.value.reference && values.value.concepto && values.value.amount && values.value.files.length > 0)


const onFileAdded = (files) => {
  // Aquí se asegura de que el array de archivos se actualice con los archivos seleccionados
  values.value.files = files;
  console.log('Archivos añadidos:', values.value.files);
};

const submitForm = async () => {
  $q.loading.show({ message: 'Enviando Formulario' })
  const formData = new FormData();
  formData.append('origin', values.value.origin);
  formData.append('destiny', values.value.destiny.name);
  formData.append('reference', values.value.reference);
  formData.append('concepto', values.value.concepto);
  formData.append('amount', values.value.amount);
  formData.append('_store', VDB.session.store.id);
  formData.append('send_by', VDB.session.name);
  values.value.files.forEach((file, index) => {
    formData.append(`file_${index}`, file);
    console.log(values.value.files);
  });
  const response = await depoApi.newForm(formData);
  if (response.fail) {
    console.log(response)
  } else {
    console.log(response)
    $q.loading.hide()
    $socket.emit('Create', response.insert)
    $q.notify({ type: 'positive', message: response.message });
    onReset()
  }
};
</script>
