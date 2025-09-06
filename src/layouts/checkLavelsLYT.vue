<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="bg-grey-3 text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>

      <q-page padding class="q-pa-md">
        <div class="q-mb-md flex justify-center">
          <q-btn label="Iniciar Escaneo" color="primary" @click="startCamera" />
          <q-btn label="Detener Escaneo" color="negative" class="q-ml-md" @click="stopCamera" />
        </div>
        <div v-if="cameraActive" id="reader"></div>
        <div v-if="batchQueue.length" class="q-mt-md row">
          <q-table dense title="Actualizados" :rows="istrue" row-key="code" :columns="columns" class="col" />
          <q-separator spaced inset vertical dark />

          <q-table dense title="Sin Actualizar" :rows="isfalse" row-key="code" :columns="columns" class="col">
            <template v-slot:top-right>
              <q-btn color="primary" icon-right="archive" flat @click="exportTable" :disable="isfalse.length <= 0" />
              <q-separator spaced inset vertical dark />
              <q-btn class="col" flat color="primary" icon="label" rounded title="Crear Etiquetas"
                @click="mosPDF.state = !mosPDF.state" />
            </template>
          </q-table>
        </div>
        <q-dialog v-model="mosPDF.state" persistent>
          <optionLabels :products="products" :prices="prices" />
        </q-dialog>

      </q-page>

    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import optionLabels from 'src/components/Labels/OptionsLabels.vue';// encabezado aoiida
import dbproduct from 'src/API/productsApi'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { computed, ref, onMounted, nextTick } from 'vue';
import dayjs from "dayjs";
import ExcelJS from 'exceljs';
import labels from 'src/Pdf/labels/labels.js'
import { Html5Qrcode } from 'html5-qrcode';
const VDB = useVDBStore();
const $q = useQuasar();
const scanned = ref([]);
const mosPDF = ref({
  state: false,
})
const prices = ref({
  val: [0, 1, 2, 4],
  opts: [
    { label: 'Menudeo', value: 1 },
    { label: 'Mayoreo', value: 2 },
    { label: 'Docena', value: 3 },
    { label: 'Caja', value: 4 },
  ]
})

const batchQueue = ref([]);
const logs = ref([]);
let html5QrCode = null;
const cameraActive = ref(false);
const columns = [
  { name: 'id', label: 'Producto', field: r => r.modelo, align: 'left' },
  { name: 'code', label: 'Producto', field: r => r.item?.code, align: 'left' },
  { name: 'description', label: 'Descripcion', field: r => r.item?.description, align: 'left' },
  { name: 'ubicacion', label: 'Ubicaciones', field: r => r.item?.locations.map(e => e.path).join('/'), align: 'left' },
  { name: 'stock', label: 'Stocks', field: r => r.item?.stocks[0].pivot.gen, align: 'left' },
  { name: 'ult', label: 'Ult.Actualizacion', field: r => dayjs(r.update?.created_at).format('YYYY-MM-DD'), align: 'center' },
];

const istrue = computed(() => batchQueue.value?.filter(e => e.status))
const isfalse = computed(() => batchQueue.value?.filter(e => !e.status))
const products = computed(() => isfalse.value.map(e => e.item))

const sendBatch = async () => {
  $q.loading.show({ message: 'Obteniendo Informacion' })
  if (batchQueue.value.size === 0) {
    console.log('No hay nada brou')
    return;
  }
  const qrArray = batchQueue.value;
  const data = {
    products:qrArray,
    workpoint:VDB.session.store.id_viz
  }
  console.log(`Enviando ${qrArray.length} QR al backend...`);
  const resp = await dbproduct.checkLabel(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    resp.forEach(item => {
      const index = batchQueue.value.findIndex(q => q.modelo === item.code.id);
      if (index !== -1) {
        batchQueue.value[index].status = item.status;
        batchQueue.value[index].item = item.code;
        let _labelType = labelType(batchQueue.value[index].item.prices)
        batchQueue.value[index].item._copies = 1;
        batchQueue.value[index].item.type = _labelType.type;
        batchQueue.value[index].item.usedPrices = _labelType.prices;
        batchQueue.value[index].update = item.actualizado;
      }
    });
    $q.loading.hide();
  }
};

// Iniciar cámara
const startCamera = () => {
  if (html5QrCode) {
    console.log("La cámara ya está activa");
    return;
  }
  cameraActive.value = true;
  nextTick(() => {
    html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: 300 };
    html5QrCode.start(
      { facingMode: "environment" },
      config,
      (decodedText) => {
        try {
          const data = JSON.parse(decodedText); // si tu QR devuelve objeto JSON
          // Verificar si ya existe en batchQueue
          const exists = batchQueue.value.some(q => q.modelo === data.modelo && q.idChange === data.idChange);
          if (!exists) {
            batchQueue.value.push(data);
            console.log(`QR agregado: ${data.modelo}`);
          } else {
            console.log(`QR repetido ignorado: ${data.modelo}`);
          }
        } catch (e) {
          console.log("QR inválido: " + decodedText);
        }
      }
    ).catch(err => console.log("Error al iniciar cámara: " + err.message));
    console.log("Cámara iniciada");
  });
};

const stopCamera = () => {
  if (!html5QrCode) {
    console.log("La cámara no estaba activa");
    return;
  }
  html5QrCode.stop().then(() => {
    html5QrCode.clear();
    html5QrCode = null;
    cameraActive.value = false;
    console.log("Cámara detenida");
    sendBatch();
  }).catch(err => console.log("Error al detener cámara: " + err.message));
};



const exportTable = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('ActualizaEtiquetas');
  worksheet.addRow(columns.map(e => e.label));
  isfalse.value.forEach(row =>
    worksheet.addRow([
      row.modelo,
      row.item?.code,
      row.item?.description,
      row.item?.locations.map(e => e.path).join('/'),
      row.item?.stocks[0].pivot.gen,
      dayjs(row.update?.created_at).format('YYYY-MM-DD')
    ])
  );

  const downloadExcel = async () => {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `Comparativo${VDB.session.store.alias}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  downloadExcel();
}

const labelType = (_prices, ipack) => {
  let prices = [..._prices];
  const centro = prices.find(e => e.pivot._type == 4);
  const menudeo = prices.find(e => e.pivot._type == 1);
  if (centro.pivot.price == menudeo.pivot.price) {
    let _prices_ = {
      id: 0,
      alias: "OFERTA",
      name: "Oferta",
      pivot: { price: prices[0].pivot.price },
      used: true,
    };
    console.log('oferta')
    return { type: "off", prices: [_prices_] };

  } else {
    console.log('estandar')
    return {
      type: "std",
      prices: prices,
    }


  }
}

</script>

<style>
#reader {
  width: 100%;
  max-width: 100%;
  aspect-ratio: 1;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  margin: auto;
}
</style>
