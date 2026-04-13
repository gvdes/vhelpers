<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title> Alta de Compuestos (Variantes) </q-toolbar-title>
      <q-separator spaced inset vertical dark />
      <q-btn flat round dense icon="upload_file" size="lg" @click="clickFile" title="Cargar Excel de Variantes"
        :disable="documentHigh.state" color="primary" />
      <q-btn icon="add" @click="addDoc.state = !addDoc.state" title="Generar Manualmente" flat round dense size="lg"
        :disable="documentHigh.state" />
    </q-toolbar>

    <q-separator spaced inset vertical dark />

    <q-table :rows="data" :columns="table.columns" :loading="loading">
      <template v-slot:top v-if="documentHigh.state">
        <div>
          <div class="text-caption">
            {{ documentHigh.autor.staff.complete_name }}
            <q-separator />
            {{ documentHigh.date }}
          </div>
          <div class="text-bold"> {{ documentHigh.nameDoc }} </div>
        </div>
        <q-space />
        <q-btn color="primary" icon="cloud_sync" @click="sendProducts" :disable="data.length === 0">
        </q-btn>
      </template>

      <template v-slot:body-cell-code="props">
        <q-td :props="props">
          <q-badge :color="props.row.ESTADO === 'COLOR YA EXISTE' ? 'warning' : 'blue-grey-10'" :label="props.value" />
        </q-td>
      </template>

    </q-table>

    <q-dialog v-model="addDoc.state" persistent>
      <q-card style="width: 450px">
        <q-card-section class="text-bold text-h6 bg-primary text-white"> Generar colores </q-card-section>
        <q-card-section class="q-gutter-md">
          <q-input v-model="formManual.modelo" label="Modelo Base" outlined dense autofocus />
          <q-input v-model="formManual.colores" label="Colores (Separados por coma)" outlined dense
            hint="ROJO, AZUL, NEGRO" @keyup.enter="generatePreviewManual" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="warning"  v-close-popup />
          <q-btn flat label="Generar Vista Previa"  @click="generatePreviewManual" :loading="loading"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dataResponse.state" persistent>
      <q-card style="width: 400px">
        <q-card-section class="text-center text-bold text-h6">
          {{ dataResponse.data?.mysql?.insert?.goal?.length || 0 }} Variantes Insertadas pero aun no sirve
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="FINALIZAR" color="primary" @click="reload" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <input type="file" ref="inputFile" @input="readFile" hidden accept=".xlsx" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useVDBStore } from 'stores/VDB';
import productApi from 'src/API/productsApi.js';
import dayjs from 'dayjs';
import { useQuasar } from 'quasar';
import ExcelJS from 'exceljs';

const VDB = useVDBStore();
const $q = useQuasar();

const loading = ref(false);
const data = ref([]);

const dataResponse = ref({ state: false, data: null });
const inputFile = ref(null);
const addDoc = ref({ state: false });
const formManual = ref({ modelo: '', colores: '' });

const documentHigh = ref({
  state: false,
  autor: VDB.session.credentials,
  nameDoc: null,
  date: null,
});
const table = ref({
  columns: [
    // El JSON usa "CODIGO", no "code"
    { name: 'code', label: 'Código Gen', field: 'CODIGO', align: 'left', sortable: true },
    // El JSON usa "DESCRIPCION"
    { name: 'description', label: 'Descripción', field: 'DESCRIPCION', align: 'left' },
    // El JSON usa "COSTO"
    { name: 'cost', label: 'Costo', field: 'COSTO', align: 'right', format: val => `$${parseFloat(val).toFixed(2)}` }
  ]
});

const clickFile = () => inputFile.value.click();

const readFile = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  $q.loading.show({ message: 'Leyendo Excel...' });
  loading.value = true;

  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);
    const worksheet = workbook.getWorksheet(1);
    const tempProducts = [];

    // acuerdate del let chowi
  for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const modeloValue = row.getCell(1).value?.toString().trim();
      const coloresValue = row.getCell(2).value?.toString().trim();

  if (modeloValue && coloresValue) {
        const payload = {
          modelo: [modeloValue.toUpperCase()],
          colores: coloresValue.split(',').map(c => c.trim().toUpperCase())
        };

        const response = await productApi.generatePreviewManual(payload);
        if (response.productos) {
          tempProducts.push(...response.productos);
      }
    }
  }

    data.value = tempProducts;
    documentHigh.value.state = true;
    documentHigh.value.nameDoc = `Archivo: ${file.name}`;
    documentHigh.value.date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    $q.notify({ message: 'Excel procesado con éxito', type: 'positive' });
    console.log('Productos generados:', tempProducts);

  } catch (e) {
    $q.notify({ message: 'Error al leer el archivo', color: 'negative' });
  } finally {
    $q.loading.hide();
    loading.value = false;
    event.target.value = '';
  }
};

const generatePreviewManual = async () => {
  if (!formManual.value.modelo || !formManual.value.colores) {
    $q.notify({ message: 'Llena ambos campos', color: 'warning' });
    return;
  }

  loading.value = true;
  console.log("Enviando a API:", formManual.value); // RASTREO 1

  try {
    const payload = {
      modelo: [formManual.value.modelo.toUpperCase()],
      colores: formManual.value.colores.split(',').map(c => c.trim().toUpperCase())
    };

    const response = await productApi.generatePreviewManual(payload);
    console.log("Respuesta completa de la API:", response); // RASTREO 2

    // Verificamos si la respuesta trae la propiedad 'productos'
    if (response && response.productos) {
      data.value = response.productos;
      documentHigh.value.state = true;
      documentHigh.value.nameDoc = `Carga Manual: ${formManual.value.modelo}`;
      documentHigh.value.date = dayjs().format('YYYY-MM-DD HH:mm:ss');
      addDoc.value.state = false;
      $q.notify({ message: 'Vista previa generada', type: 'positive' });
    } else {
      console.error("La API no mandó la propiedad 'productos':", response);
      $q.notify({ message: 'La API respondió pero no traía productos', color: 'orange' });
    }

  } catch (err) {
    console.error('Error fatal en la petición:', err); // RASTREO 3
    $q.notify({ message: 'Error de conexión con el servidor', color: 'negative' });
  } finally {
    loading.value = false;
  }
};

const sendProducts = async () => {
  $q.loading.show({ message: 'mandar' });
  try {
    const resp = await productApi.highProducts({ head: documentHigh.value, data: data.value });
    dataResponse.value.state = true;
    dataResponse.value.data = resp;
  } catch (err) {
    $q.notify({ message: 'Error al guardar', color: 'negative' });
  } finally {
    $q.loading.hide();
  }
};

const reload = () => window.location.reload();
</script>
