<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title />
      <q-separator spaced inset vertical dark />
      <q-btn flat round dense icon="upload_file" size="lg" @click="clickFile" title="Subir Archivo" />

    </q-toolbar>


    <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import { useQuasar } from 'quasar';
import dayjs from 'dayjs';
import productApi from 'src/API/productsApi.js';
import { useVDBStore } from 'stores/VDB';
import { useProductStore } from 'stores/ProductsStore';

const $q = useQuasar();
const VDB = useVDBStore();
const layoutProduct = useProductStore();
layoutProduct.setTitle('Imagenes Productos');


const inputFile = ref(null);

const clickFile = () => {
  inputFile.value.click();
};

const readFile = async () => {
  const file = document.getElementById("inputFile").files[0];
  if (!file) {
    console.warn("No se seleccionó ningún archivo.");
    return;
  }

  // ExcelJS necesita un ArrayBuffer en navegadores
  const arrayBuffer = await file.arrayBuffer();

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(arrayBuffer);

  const worksheet = workbook.worksheets[0];
  const images = worksheet.getImages();

  console.log(`📸 Se encontraron ${images.length} imágenes en el archivo.`);

  // Pequeño retraso entre iteraciones
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let index = 0;
  for (const image of images) {
    index++;

    const { range, imageId } = image;
    const imgData = workbook.model.media.find(m => m.index === imageId);
    if (!imgData || !imgData.buffer) continue;

    const rowNumber = range.tl.nativeRow + 1;
    const codigo = worksheet.getCell(`C${rowNumber}`).value; // Columna C id
    if (!codigo) continue;

    const base64 = `data:image/${imgData.extension};base64,${imgData.buffer.toString('base64')}`;

    const data = {
      code: codigo,
      image: base64,
    };

    console.log(`🧾 [${index}/${images.length}] Procesando código: ${codigo}`);

    // 👉 Simulación o envío real
    // await axios.post('https://tu-api.com/api/upload-image', data);

    console.log(`✅ Enviada imagen del código ${codigo}`);

    // Espera 50 ms para liberar el hilo (ajústalo según el tamaño del Excel)
    await delay(50);
  }

  console.log("🎉 Proceso completado.");
};



</script>
