<template>
  <q-page padding>
    <q-toolbar class="q-mb-md">
      <q-btn
        flat round dense
        icon="download"
        size="lg"
        title="Generar Excel para Sistema"
        color="positive"
        :disable="listaProductos.length === 0"
        @click="downloadFile(listaProductos)"/>
      <q-separator spaced inset vertical />
      <q-btn
        flat round dense
        icon="api"
        size="lg"
        title="Consultar Nuevos Modelos"
        color="primary"
        @click="ventanaConsulta.abierta = true"/>
      <q-toolbar-title class="text-subtitle text-bold">
        Productos Cargados: {{ listaProductos.length }}
      </q-toolbar-title>
    </q-toolbar>
    <q-table
      :rows="listaProductos"
      :columns="columnasTabla"
      row-key="CODIGO"
      flat
      bordered
      :pagination="{ rowsPerPage: 15 }"/>
    <q-dialog v-model="ventanaConsulta.abierta" persistent>
      <q-card style="min-width: 450px;">
        <q-card-section class="bg-primary text-white text-bold text-h6">
          Consultar Modelos a la API
        </q-card-section>
        <q-card-section class="q-gutter-md q-pt-lg">
          <q-input
            v-model="ventanaConsulta.modeloEscrito"
            outlined
            label="MODELO (ej: JL1014)"
            @keyup.enter="buscarEnServidor"/>
          <q-input
            v-model="ventanaConsulta.coloresEscritos"
            outlined
            label="Colores (separados por coma: ROJO, AZUL)"
            hint="Escribe los colores exactamente como los necesites"
            @keyup.enter="buscarEnServidor"/>
        </q-card-section>
        <q-card-actions align="right" class="q-pb-md q-pr-md">
          <q-btn flat label="Cancelar" color="grey" v-close-popup />
          <q-btn label="Buscar Modelos" color="primary" @click="buscarEnServidor" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import ExcelJS from 'exceljs';
import dayjs from 'dayjs';
import apiProductos from 'src/API/productsApi.js';
import { useProductStore } from 'stores/ProductsStore';
const layoutProduct = useProductStore();
layoutProduct.setTitle('Gestión de Modelos');
const $q = useQuasar();
const listaProductos = ref([]);
const ventanaConsulta = ref({
  abierta: false,
  modeloEscrito: null,
  coloresEscritos: ''
});
const columnasTabla = [
  { name: 'code', label: 'Código', field: 'CODIGO', align: 'left', sortable: true },
  { name: 'cb', label: 'C. Barras', field: 'CB', align: 'left' },
  { name: 'familia', label: 'Familia', field: 'FAMILIA', align: 'left' },
  { name: 'description', label: 'Descripción', field: 'DESCRIPCION', align: 'left' },
  { name: 'shortCode', label: 'Código Corto', field: 'CODIGO CORTO', align: 'left' },
  { name: 'provider', label: 'Proveedor', field: 'PROVEEDOR', align: 'left' },
  { name: 'reference', label: 'Referencia', field: 'REFERENCIA', align: 'left' },
  { name: 'manufacturer', label: 'Fabricante', field: 'FABRICANTE', align: 'left' },
  { name: 'cost', label: 'Costo', field: 'COSTO', align: 'right', format: val => `$${val.toFixed(2)}` },
  { name: 'pxc', label: 'PXC', field: 'PXC', align: 'right' },
  { name : 'category', label: 'Categoría', field: 'CATEGORIA', align: 'left' },
  { name: 'lights', label: '#Luces', field: '#LUCES', align: 'right' },
  { name: 'unitPurchase', label: 'Unid. Med. Compra', field: 'UNIDA MED COMPRA', align: 'right' },
  { name: 'proRes', label: 'Pro Res', field: 'PRO RES', align: 'right' },
  { name: 'navMeasures', label: 'Medidas Nav.', field: 'MEDIDAS NAV', align: 'right' },
  { name: 'aaa', label: 'AAA', field: 'AAA', align: 'right', format: val => `$${val}` },
  { name: 'centro', label: 'Centro', field: 'CENTRO', align: 'right', format: val => `$${val}` },
  { name: 'especial', label: 'Especial', field: 'ESPECIAL', align: 'right', format: val => `$${val}` },
  { name: 'caja', label: 'Caja', field: 'CAJA', align: 'right', format: val => `$${val}` },
  { name: 'docena', label: 'Docena', field: 'DOCENA', align: 'right', format: val => `$${val}` },
  { name: 'mayoreo', label: 'Mayoreo', field: 'MAYOREO', align: 'right', format: val => `$${val}` },
  { name: 'menudeo', label: 'Menudeo', field: 'MENUDEO', align: 'right', format: val => `$${val}` },
];
const buscarEnServidor = async () => {
  const modelo = ventanaConsulta.value.modeloEscrito?.trim();
  const coloresRaw = ventanaConsulta.value.coloresEscritos?.trim();
  if (!modelo || !coloresRaw) {
    $q.notify({ message: 'Escribe el modelo y colores', color: 'orange', icon: 'warning' });
    return;
  }
  const listaColores = coloresRaw.split(',')
    .map(c => c.trim().toUpperCase())
    .filter(c => c !== '');
  $q.loading.show({ message: 'Consultando base de datos...' });
  try {
    const respuesta = await apiProductos.generatePreviewModels({
      modelo: [modelo],
      colores: listaColores
    });
    const listaApi = respuesta?.productos;
    if (listaApi && listaApi.length > 0) {
      listaApi.forEach(p => {
        // Procesar array de precios a objeto plano
        let preciosRelacion = { AAA: 0, CENTRO: 0, ESPECIAL: 0, CAJA: 0, DOCENA: 0, MAYOREO: 0, MENUDEO: 0 };
        if (p.PRECIOS) {
          p.PRECIOS.forEach(pre => {
            let lista = pre.LISTA.toUpperCase();
            if (preciosRelacion.hasOwnProperty(lista)) {
              preciosRelacion[lista] = parseFloat(pre.PRECIO) || 0;
            }
          });
        }
        const palabras = p.DESCRIPCION?.split(' ') || [];
        const colorDetectado = palabras.length > 0 ? palabras[palabras.length - 1] : 'N/A';
        const articuloBase = p.CODIGO?.split('-')[0] || 'N/A';
        listaProductos.value.push({
          'CODIGO': p.CODIGO,
          'CB': p.CB,
          'FAMILIA': p.FAMILIA,
          'DESCRIPCION': p.DESCRIPCION,
          'CODIGO CORTO': p["CODIGO CORTO"],
          'PROVEEDOR': p.PROVEEDOR,
          'REFERENCIA': p.REFERENCIA,
          'FABRICANTE': p.FABRICANTE,
          'COSTO': parseFloat(p.COSTO) || 0,
          'PXC': p.PXC,
          'CATEGORIA': p.CATEGORIA,
          '#LUCES': p["#LUCES"],
          'UNIDA MED COMPRA': p["UNIDA MED COMPRA"],
          'PRO RES': p["PRO RES"],
          'MEDIDAS NAV': p["MEDIDAS NAV"],
          ...preciosRelacion,
          'CODIGO DEL COMPUESTO': p.CODIGO,
          'CODIGO DE ARTICULO': articuloBase,
          'TALLA': '',
          'COLOR': colorDetectado,
          'COSTO UNIDAD': parseFloat(p.COSTO) || 0,
          'UNIDADES': 1,
          'MODELO PARA DRIVE': p.CODIGO,
          'COLOR PARA DRIVE': colorDetectado,
        });
      });
      $q.notify({ message: `${listaApi.length} Modelos cargados`, color: 'positive', icon: 'check' });
      ventanaConsulta.value.abierta = false;
    } else {
      $q.notify({ message: 'No se encontraron resultados', color: 'warning' });
    }
  } catch (error) {
    console.error("Error API:", error);
    $q.notify({ message: 'Fallo la conexión con el servidor', color: 'negative' });
  } finally {
    $q.loading.hide();
  }
};
const downloadFile = async (datosExport) => {
  if (!datosExport || datosExport.length === 0) return;
  $q.loading.show({ message: 'Generando archivo Excel...' });
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte_Alta');
    const keys = Object.keys(datosExport[0]);
    const columns = keys.map(key => ({
      name: key.toUpperCase(),
      filterButton: true
    }));
    worksheet.addTable({
      name: 'TablaModelos',
      ref: 'A1',
      headerRow: true,
      style: { showRowStripes: true },
      columns: columns,
      rows: datosExport.map(row => keys.map(k => row[k]))
    });
    worksheet.columns.forEach(column => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) maxLength = columnLength;
      });
      column.width = maxLength < 12 ? 12 : maxLength + 2;
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `COMPUESTOS.xlsx`;
    document.body.appendChild(anchor);
    anchor.click();
    setTimeout(() => {
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(url);
    }, 150);
    $q.notify({ message: 'Descarga completada', color: 'positive', icon: 'file_download' });
  } catch (error) {
    console.error("Error Excel:", error);
    $q.notify({ message: 'Error al crear el archivo', color: 'negative' });
  } finally {
    $q.loading.hide();
  }
};
</script>
