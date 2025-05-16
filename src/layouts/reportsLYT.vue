<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <div class=" row justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Reporteria</span>
        </div>
      </div>
      <q-separator />
    </q-header>

    <q-separator spaced inset vertical dark />
    <q-page-container>
      <q-card class="my-card">
        <q-card-section>
          <div class="row">
            <q-separator spaced inset vertical dark />
            <q-select dense class="col" v-model="filters.seccion" :options="categories.seccion" label="Seccion"
              option-label="name" filled multiple use-chips @blur="report" />
            <q-separator spaced inset vertical dark />
            <!-- <q-select dense class="col" v-model="filters.familia" :options="categories.familia" label="Familia"
              option-label="name" filled multiple use-chips :disable="!filters.seccion">
            </q-select>
            <q-separator spaced inset vertical dark />
            <q-select dense class="col" v-model="filters.categoria" :options="categories.categoria" label="Categorias"
              option-label="name" filled multiple use-chips :disable="!filters.familia">
            </q-select>
            <q-separator spaced inset vertical dark /> -->
          </div>
        </q-card-section>
      </q-card>

      <q-separator spaced inset vertical dark />
      <div class="row q-pl-sm" v-if="reports.length > 0">
        <div class="col-md-3 col-xs-6 q-pb-sm q-pr-sm" v-for="(report, idx) in reports" :key="idx"
          @click="genReport(report)">
          <q-card class="bg-darkl1 ">
            <q-card-section class="text-h4 text-left">
              <span>{{ report.value.length }}</span>
            </q-card-section>
            <div class="text--1 text-right q-pa-md">{{ report.key.toUpperCase() }}</div>
          </q-card>
        </div>
      </div>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import reportApi from "src/API/reportApi";
import ExcelJS from 'exceljs';
import reportExc from "src/Excel/reports.js";
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import { useRoute, useRouter } from "vue-router";
import dayjs from 'dayjs';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
const $router = useRouter();

const VDB = useVDBStore();
const $q = useQuasar();

const categories = ref([]);

const filters = ref({
  seccion: null,
  familia: null,
  categoria: null
})
const reports = ref([])

const init = async () => {
  const resp = await reportApi.index();
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    categories.value = resp
  }
}
const report = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' });
  let data = {
    workpoint: VDB.session.store.id_viz,
    secciones: filters.value.seccion.map(e => e.id)
  }
  const resp = await reportApi.getReport(data);
  if (resp.error) {
    console.log(resp)
  } else {
    console.log(resp);
    reports.value = Object.keys(resp).map(key => ({
      key,
      value: resp[key],
    }));
    $q.loading.hide();
  }

}

const genReport = (report) => {
  let sid = VDB.session.store.id_viz
  switch (report.key) {
    case "catalogo":
      reportExc.catalogo(report)
      break;
    case "conStock":
      reportExc.conStock(report)
      break;
    case "conStockUbicados":
      reportExc.conStockUbicados(report)
      break;
    case "conStockSinUbicar":
      reportExc.conStockSinUbicar(report)
      break;
    case "sinStock":
      reportExc.sinStock(report)
      break;
    case "sinStockUbicados":
      reportExc.sinStockUbicados(report)
      break;
    case "sinMaximos":
      reportExc.sinMaximos(report)
      break;
    case "generalVsExhibicion":
      reportExc.generalVsExhibicion(report)
      break;
    case "generalVsCedis":
      reportExc.generalVsCedis(report,sid)
      break;
    case "conMaximos":
      reportExc.conMaximos(report)
      break;
    case "negativos":
      reportExc.negativos(report)
      break;
    case "cedisStock":
      reportExc.cedisStock(report)
      break;
  }
}


init()
</script>
