<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <q-header class="bg-grey-3 text-dark" bordered>
        <UserToolbar />
        <q-separator />
      </q-header>
      <q-toolbar class="justify-between">
        <div>
          <span class="text-grey">Helpers</span>
          <q-icon name="navigate_next" color="primary" />
          <span class="text-h6">Reporte Cajas</span>
        </div>
        {{ $counter.date }}
        <div class="row">
          <q-btn color="primary" icon="event" flat round>
            <q-menu>
              <!-- <div class="q-pa-md"> -->
              <q-date v-model="dateModel" minimal mask="YYYY-MM-DD" />
              <!-- </div> -->
            </q-menu>
          </q-btn>
          <q-btn color="primary" icon="download" @click="crearPdf" flat round />
          <q-btn color="primary" icon="calculate" @click="calculate" flat round />
        </div>
      </q-toolbar>
      <q-tabs v-model="$counter.tabs.val">
        <q-route-tab v-for="store in $counter.tabs.opts" :key="store.id" :label="store.alias" :name="store.id"
          icon="store" class="text-caption" :to="`/openBox/${store.id}`" />
      </q-tabs>

      <router-view v-slot="{ Component }">
        <!-- <keep-alive> -->
          <component :is="Component" />
        <!-- </keep-alive> -->
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { AppFullscreen, useQuasar } from "quasar";
import Chart from 'chart.js/auto';
import dayjs from "dayjs";
import ExcelJS from 'exceljs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import UserToolbar from "src/components/UserToolbar.vue";
import ApiAssist from "src/API/assistApi";
import { useVDBStore } from "src/stores/VDB";
import { useCounterStore } from "src/stores/countingCash";

import axios from "axios"; //para dirigirme bro
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const $user = useVDBStore();
const $counter = useCounterStore();


const date = ref(false);

const fechas = ref(null);
const stores = ref([]);

const ismobile = computed(() => $q.platform.is.mobile);
const dateModel = computed({
  get: () => $counter.date,
  set: (val) => $counter.setDate(val)
});

const init = async () => {
  $q.loading.show({ message: "Cargando Informacion" });
  console.log("se inicia el init");
  let date = new Date();
  $counter.setDate(dayjs(date).format("YYYY-MM-DD"))
  const resp = await ApiAssist.getOpenCash({date:$counter.date, sid:$user.session.store.id});
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    $counter.setTabVal(resp.stores.length > 0 ? resp.stores[0].id : null)
    if ($counter.tabs.val) {
      $router.push(`/openBox/${$counter.tabs.val}`)
    }
    $counter.setPrinters(resp.printers)
    $counter.setTabOpts(resp.stores);
    $q.loading.hide()
  }
};

const crearPdf = () => {
  return new Promise((resolve, reject) => {
    try {

      let body = [];
      stores.value.forEach((store, index) => {
        // Agregar el encabezado con `colSpan` que muestra el nombre de la tienda
        body.push([
          {
            content: store.name,
            colSpan: 3, // Combinar columnas
            styles: { halign: 'center', fillColor: [173, 216, 230], fontStyle: 'bold' },
          },
        ]);

        // Agregar las ventas como filas debajo del encabezado
        store.sales.forEach((sale) => {
          body.push([dayjs(sale.FECFAC).format('YYYY-MM-DD'), sale.DESTER, sale.TICKETS]);
        });
      });
      const doc = new jsPDF({ format: 'letter' });
      autoTable(doc, {
        head: [['Fecha', 'Caja', 'Tickets']],
        body: body
      });

      doc.save(`Reporte de Cajas`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const calculate = () => {
  $q.loading.show({ message: 'Importando Ticket' })
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Comparativo');


  worksheet.columns = [
    { header: 'Fecha', key: 'FECFAC', width: 20 },
    { header: 'Destino', key: 'DESTER', width: 30 },
    { header: 'Tickets', key: 'TICKETS', width: 10 },
  ];

  stores.value.forEach((store) => {
    const headerRow = worksheet.addRow([store.name]);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ADD8E6' }, // Azul claro
    };
    headerRow.alignment = { horizontal: 'center' };


    store.sales.forEach((sale) => {
      worksheet.addRow(sale);
    });
    worksheet.addRow([]);
  });



  const downloadExcel = async () => {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ReporteCajas.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  downloadExcel();
  $q.loading.hide()

}

init();

watch(() => $counter.date, async (newDate) => {
  if (!newDate) return;

  $q.loading.show({ message: "Actualizando cajas..." });

  const resp = await ApiAssist.getOpenCash({
    date: newDate,
    sid: $user.session.store.id
  });

  if (!resp.error) {
    $counter.setTabVal(resp.stores.length > 0 ? resp.stores[0].id : null);

    if ($counter.tabs.val) {
      $router.push(`/openBox/${$counter.tabs.val}`);
    }

    $counter.setPrinters(resp.printers);
    $counter.setTabOpts(resp.stores);
  }

  $q.loading.hide();
});
</script>
