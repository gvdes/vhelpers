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
          <!-- <q-btn color="primary" icon="download" @click="crearPdf" flat round /> -->
          <q-btn color="primary" icon="calculate" @click="calculate" flat round />
        </div>
      </q-toolbar>
      <q-tabs v-model="$counter.tabs.val">
        <q-route-tab v-for="store in $counter.tabs.opts" :key="store.id" :label="store.alias" :name="store.id"
          :class="store.hasIssue ? 'text-negative' : 'text-positive'" icon="store" class="text-caption"
          :to="`/openBox/${store.id}`" />
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
  // $counter.setDate(dayjs(date).format("YYYY-MM-DD"))
  $counter.setDate(dayjs('2026-03-19').format("YYYY-MM-DD"))

  const resp = await ApiAssist.getOpenCash({ date: $counter.date, sid: $user.session.store.id });
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    $counter.setTabVal(resp.stores.length > 0 ? resp.stores[0].id : null)
    if ($counter.tabs.val) {
      $router.push(`/openBox/${$counter.tabs.val}`)
    }
    resp.stores.forEach(store => {
      store.hasIssue = store.cashs?.some(cash =>
        cash?.corte?.movimientos?.MOVIMIENTOS > 0 &&
        cash?.receipt == null
      ) || false
    })
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
  $q.loading.show({ message: 'Descargando Info' })
  console.log($counter.tabs.opts)
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Cajas');
  worksheet.columns = [
    { header: 'Sucursal', key: 'sucursal', width: 25 },
    { header: 'Caja', key: 'caja', width: 20 },
    { header: 'Cajero', key: 'cajero', width: 20 },
    { header: 'Retiradas', key: 'retiradas', width: 15 },
    { header: 'Descuadre', key: 'descuadre', width: 15 },
    { header: 'ObservacionDescuadre', key: 'commentsMismatch', width: 15 },
    { header: 'Enviado', key: 'enviado', width: 15 },
    { header: 'Recibido', key: 'recibido', width: 15 },
    { header: 'Diferencia', key: 'diferencia', width: 15 },
    { header: 'Gastos', key: 'gastos', width: 15 },
    { header: 'TarjetasEnv', key: 'card_send', width: 15 },
    { header: 'TarjetasRec', key: 'card_rec', width: 15 },
    { header: 'TarjetasDif', key: 'card_dis', width: 15 },
    { header: 'TarjetasCom', key: 'card_obs', width: 15 },


  ]
  let currentRow = 2
  $counter.tabs.opts.forEach(store => {
    const validCashs = store.cashs.filter(c =>
      Number(c?.corte?.movimientos?.MOVIMIENTOS) > 0
    )
    if (!validCashs.length) return
    const startRow = currentRow
    validCashs.forEach(cash => {
      const retiradas = cash.corte?.RETIRADAS
      const enviado = cash.receipt?.cash_send || 0
      const recibido = cash.receipt?.cash_receipt || 0
      const diferencia = cash.receipt?.discrepancy || 0
      const descuadre = (cash.corte?.RETIRADAS - (cash.corte?.VENTASEFE + cash.corte?.INGRESOS))
      const gastos = cash.receipt?.cash_expenses || 0
      worksheet.addRow({
        sucursal: store.name,
        caja: cash.name,
        cajero:cash.cashier?.user?.staff?.complete_name || 'N/A',
        retiradas,
        descuadre,
        commentsMismatch:cash.receipt?.mismatch_observation,
        enviado,
        recibido,
        diferencia,
        gastos,
        card_send:cash.receipt?.card_send,
        card_rec:cash.receipt?.card_receipt,
        card_dis:cash.receipt?.card_discrepancy,
        card_obs:cash.receipt?.card_observation
      })
      currentRow++
    })
    const endRow = currentRow - 1
    if (endRow > startRow) {
      worksheet.mergeCells(`A${startRow}:A${endRow}`)
    }
  })
  worksheet.getRow(1).font = { bold: true }
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
    resp.stores.forEach(store => {
      store.hasIssue = store.cashs?.some(cash =>
        cash?.corte?.movimientos?.MOVIMIENTOS > 0 &&
        cash?.receipt == null
      ) || false
    })
    $counter.setPrinters(resp.printers);
    $counter.setTabOpts(resp.stores);
    console.log(resp.stores)
  }

  $q.loading.hide();
});
</script>
