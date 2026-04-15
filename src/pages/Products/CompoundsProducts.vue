<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title> Alta de Productos </q-toolbar-title>
      <q-separator spaced inset vertical dark />
      <q-btn flat round dense icon="upload_file" size="lg" @click="clickFile" title="Subir Archivo Excel" :disable="documentHigh.state" />
      <q-separator spaced inset vertical dark />
      <q-btn icon="add" @click="addDoc.state = !addDoc.state" title="Crear Documento" flat round dense size="lg" :disable="documentHigh.state" />
      <q-separator spaced inset vertical dark />

      <q-btn color="secondary" icon="library_add" @click="compoundManual.state = true" title="Crear Compuesto Manual" flat round dense size="lg" />
    </q-toolbar>

    <q-separator spaced inset vertical dark />

    <q-table :rows="data" :columns="table.columns">
      <template v-slot:top v-if="documentHigh.state">
        <div>
          <div class="text-caption"> {{ documentHigh.autor.staff.complete_name }} <q-separator /> {{ documentHigh.date }} </div>
          <div class="text-bold"> {{ documentHigh.nameDoc }} </div>
        </div>
        <q-space />
        <q-btn color="primary" icon="inventory" flat @click="mosformProduct = !mosformProduct" />
        <q-btn color="primary" icon="cloud_sync" flat @click="sendProducts" />
      </template>
    </q-table>

    <q-dialog v-model="compoundManual.state" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="text-bold text-h6"> Crear Compuesto Manual </q-card-section>
        <q-card-section class="q-gutter-md">
          <q-input v-model="compoundManual.baseModel" type="text" label="Modelo Base (Ej: JL1014)" outlined autofocus />
          <q-select v-model="compoundManual.colors" label="Colores" outlined use-input use-chips multiple hide-dropdown-icon input-debounce="0" new-value-mode="add-unique" hint="Escribe el color y presiona Enter" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Generar" color="secondary" @click="generateManualCompound" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="errores.state" persistent>
      <q-card style="width: 600px; max-width: 90vw;">
        <q-card-section class="text-h6 text-center text-bold text-negative"> Errores de Validación </q-card-section>
        <q-card-section>
          <q-table :rows="errores.data" :columns="errores.columns" flat bordered />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
  </q-page>
</template>

<script setup>
import { useProductStore } from 'stores/ProductsStore';
import { ref } from 'vue';
import { useVDBStore } from 'stores/VDB';
import formProduct from 'components/Products/formProduct.vue';
import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import { useQuasar } from 'quasar';
import productApi from 'src/API/productsApi.js';

const VDB = useVDBStore();
const $q = useQuasar();
const layoutProduct = useProductStore();
layoutProduct.setTitle('Alta Productos');

const data = ref([]);
const mosformProduct = ref(false);
const inputFile = ref(null);
const addDoc = ref({ state: false, val: null });

// Estado para el modal de compuesto manual
const compoundManual = ref({
  state: false,
  baseModel: null,
  colors: []
});

const errores = ref({
  data: [],
  state: false,
  columns: [
    { name: 'row', label: 'Origen', field: r => r.row, align: 'center' },
    { name: 'code', label: 'Modelo/Código', field: r => r.code, align: 'left' },
    { name: 'field', label: 'Error', field: r => r.field, align: 'left' },
    { name: 'value', label: 'Valor Recibido', field: r => r.value, align: 'left' },
  ]
});

const documentHigh = ref({
  state: false,
  autor: VDB.session.credentials,
  nameDoc: null,
  date: null,
});

const table = ref({
  columns: [
    { name: 'code', label: 'Codigo', field: r => r.code, align: 'left' },
    { name: 'cb', label: 'CB', field: r => r.cb, align: 'left' },
    { name: 'description', label: 'Descripcion', field: r => r.description, align: 'left' },
    { name: 'section', label: 'Seccion', field: r => r.section?.alias, align: 'left' },
    { name: 'family', label: 'Familia', field: r => r.familia?.alias, align: 'left' },
    { name: 'category', label: 'Categoria', field: r => r.categoria?.alias, align: 'left' },
    { name: 'cost', label: 'Costo', field: r => r.cost, align: 'left' },
  ]
});

/* =========================================
   LÓGICA DE ENVÍO Y PROCESAMIENTO (CON LOGS)
   ========================================= */

const generateManualCompound = async () => {
  console.log("--- INICIO PROCESO COMPUESTO MANUAL ---");

  if (!compoundManual.value.baseModel || compoundManual.value.colors.length === 0) {
    console.warn("[Validación] Faltan datos: Modelo o Colores vacíos.");
    $q.notify({ message: 'Datos incompletos', type: 'warning' });
    return;
  }

  // Payload exacto según captura: {"modelo": ["..."], "colores": ["..."]}
  const payload = {
    modelo: [compoundManual.value.baseModel],
    colores: compoundManual.value.colors
  };

  console.log("[API Out] Enviando payload:", JSON.stringify(payload));
  $q.loading.show({ message: 'Generando modelos en servidor...' });

  try {
    const response = await productApi.generatePreviewModels(payload);
    console.log("[API In] Respuesta recibida:", response);

    if (response && response.productos && response.productos.length > 0) {
      console.log(`[Procesar] Iniciando carga de ${response.productos.length} productos.`);
      await processBackendPreview(response.productos, compoundManual.value.baseModel);

      // Limpiar al terminar éxito
      compoundManual.value.state = false;
      compoundManual.value.baseModel = null;
      compoundManual.value.colors = [];
    } else {
      console.error("[Error] El backend no devolvió el array 'productos'.", response);
      $q.notify({ message: 'No se generaron productos.', type: 'negative' });
    }
  } catch (error) {
    console.error("[Fatal] Error en la petición:", error);
    $q.notify({ message: 'Error de conexión con el servidor', type: 'negative' });
  } finally {
    $q.loading.hide();
  }
};

const processBackendPreview = async (backendProducts, baseModelName) => {
  console.log("[Mapeo] Validando códigos y CB en base de datos...");

  // Inicializar documento si está vacío
  if (!documentHigh.value.state) {
    documentHigh.value.state = true;
    documentHigh.value.nameDoc = "Compuestos Manuales";
    documentHigh.value.date = dayjs().format('YYYY-MM-DD HH:mm:ss');
  }

  const allCodes = backendProducts.map(p => p.CODIGO);
  const allBarcodes = backendProducts.map(p => p.CB);

  try {
    const validationResults = await productApi.checkCodesBatch({ codes: allCodes, barcodes: allBarcodes });
    console.log("[Mapeo] Resultados Batch:", validationResults);

    for (const [index, prod] of backendProducts.entries()) {
      const rowRef = `Manual: ${baseModelName} (${index + 1})`;
      console.log(`[Fila ${index}] Procesando: ${prod.CODIGO}`);

      let hasError = false;
      const rowObj = {
        code: prod.CODIGO,
        cb: prod.CB,
        description: prod.DESCRIPTION || prod.DESCRIPCION,
        cost: parseFloat(prod.COSTO) || 0,
        reference: prod.REFERENCIA,
        pxc: prod.PXC,
        nluces: prod["#LUCES"],
        mnp: { large: prod["MEDIDAS NAV"] }
      };

      // Validar Existencia
      if (validationResults.codes[prod.CODIGO]?.exist) {
        console.error(`[Fila ${index}] Código duplicado en BD: ${prod.CODIGO}`);
        errores.value.data.push({ row: rowRef, code: prod.CODIGO, field: 'Código duplicado', value: prod.CODIGO });
        hasError = true;
      }

      if (validationResults.barcodes[prod.CB]) {
        console.error(`[Fila ${index}] CB duplicado en BD: ${prod.CB}`);
        errores.value.data.push({ row: rowRef, code: prod.CODIGO, field: 'CB duplicado', value: prod.CB });
        hasError = true;
      }

      // Mapeo de Layout (Categorías/Familias)
      const familia = layoutProduct.categories.find(c => c.alias.toUpperCase() === prod.FAMILIA?.toUpperCase() && c.root !== null);
      if (!familia) {
        console.error(`[Fila ${index}] Familia no encontrada: ${prod.FAMILIA}`);
        errores.value.data.push({ row: rowRef, code: prod.CODIGO, field: 'Familia no encontrada', value: prod.FAMILIA });
        hasError = true;
      } else {
        rowObj.familia = familia;
        rowObj.section = layoutProduct.categories.find(s => s.id === familia.root);
        rowObj.categoria = layoutProduct.categories.find(c => c.alias.toUpperCase() === prod.CATEGORIA?.toUpperCase() && c.root === familia.id);
      }

      // Otros campos obligatorios
      rowObj.provider = layoutProduct.providers.find(p => p.id == prod.PROVEEDOR);
      rowObj.makers = layoutProduct.makers.find(m => m.id == prod.FABRICANTE);
      rowObj.umc = layoutProduct.unitsMeasure.find(u => u.name.toUpperCase() === prod["UNIDA MED COMPRA"]?.toUpperCase());

      if (!hasError) {
        console.log(`[Fila ${index}] OK. Insertando en tabla local.`);
        data.value.push(rowObj);
      }
    }
  } catch (e) {
    console.error("[Falla Mapeo] Error crítico durante el ciclo de procesamiento:", e);
  }

  if (errores.value.data.length > 0) errores.value.state = true;
};

/* --- FUNCIONES ORIGINALES (EXCEL Y ENVÍO FINAL) --- */
const clickFile = () => inputFile.value.click();
const sendProducts = async () => {
  $q.loading.show({ message: 'Sincronizando con servidor...' });
  const resp = await productApi.highProducts({ head: documentHigh.value, data: data.value });
  if (!resp.fail) window.location.reload();
  $q.loading.hide();
};
</script>
