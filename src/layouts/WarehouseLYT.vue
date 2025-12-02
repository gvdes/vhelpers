<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">{{ title }}</span>
        </div>
        <div class="row" v-if="warehousStore.showReportLocations">
          <q-btn color="primary" title="Sin Stock Con Ubicacion" icon="show_chart" outline>
            <q-menu @show="obtSections">
              <q-list style="min-width: 250px">
                <q-item>
                  <q-select v-model="report.type.val" :options="report.type.opts" label="Tipo Reporte" filled dense />
                </q-item>
                <q-separator />
                <q-item>
                  <q-select v-model="report.seccion.val" :options="report.seccion.opts" label="Seccion"
                    option-label="name" filled dense style="width:200px" />
                </q-item>
                <q-separator />
                <q-item>
                  <q-btn label="Obtener" @click="obtReport" flat :disable="!report.seccion.val" />
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div class="row" v-if="warehousStore.showReportMinMax">
          <q-btn color="primary" title="Sin Stock Con Ubicacion" icon="show_chart" outline>
            <q-menu @show="obtSectionsmm">
              <q-list style="min-width: 250px">
                <q-item>
                  <q-select v-model="reportmm.type.val" :options="reportmm.type.opts" label="Tipo Reporte" filled
                    dense />
                </q-item>
                <q-separator />
                <q-item>
                  <q-select v-model="reportmm.seccion.val" :options="reportmm.seccion.opts" label="Seccion"
                    option-label="name" filled dense style="width:200px" />
                </q-item>
                <q-separator />
                <q-item>
                  <q-btn label="Obtener" @click="obtReportmm" flat :disable="!reportmm.seccion.val" />
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import { useWarehouse } from 'src/stores/warehousStore';
import dbCompare from 'src/API/compareApi'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import reportApi from "src/API/reportApi";
import locationsApi from 'src/API/locationsApi';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import reportExc from "src/Excel/reports.js";
import Report from 'src/pages/Distribute/report.vue';
const VDB = useVDBStore();
const $q = useQuasar();
const warehousStore = useWarehouse()

const report = ref({
  type: {
    val: { id: 1, label: 'Con Stock Sin Ubicacion', alias: 'CSSU' },
    opts: [
      { id: 1, label: 'Con Stock Sin Ubicacion', alias: 'CSSU' },
      { id: 2, label: 'Sin Stock Con Ubicacion', alias: 'SSCU' },
      { id: 3, label: 'Con Stock Con Ubicacion', alias: 'CSCU' },
    ]
  },
  seccion: {
    val: null,
    opts: [],
  }
})

const reportmm = ref({
  type: {
    val: { id: 2, label: 'Con Stock Sin Min y Max', alias: 'CSCMM' },
    opts: [
      { id: 1, label: 'Con Stock Con Min y Max', alias: 'CSCMM' },
      { id: 2, label: 'Con Stock Sin Min y Max', alias: 'CSSMM' },
      { id: 3, label: 'Sin Stock Con Min y Max', alias: 'SSCMM' },
    ]
  },
  seccion: {
    val: null,
    opts: [],
  }
})

const obtSections = async () => {
  $q.loading.show({ message: 'Obteniendo Secciones' })
  const resp = await reportApi.index();
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.loading.hide();
    report.value.seccion.opts = resp.seccion
  }
}
const obtSectionsmm = async () => {
  $q.loading.show({ message: 'Obteniendo Secciones' })
  const resp = await reportApi.index();
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.loading.hide();
    reportmm.value.seccion.opts = resp.seccion
  }
}

const obtReport = async () => {
  $q.loading.show({ message: 'Obteniendo Reporte' })
  console.log(report.value)
  let data = {
    _rol: VDB.session.credentials._rol,
    workpoint: VDB.session.store.id_viz,
    _type: report.value.type.val.id,
    section: report.value.seccion.val.id,
  }
  console.log(data)
  const resp = await locationsApi.reportLocations(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.loading.hide();
    if (resp.length > 0) {
      let impor = {
        key: report.value.type.val.alias,
        value: resp
      }
      console.log(impor);
      switch (report.value.type.val.id) {
        case 1:
          reportExc.conStockSinUbicar(impor)
          break;
        case 2:
          reportExc.sinStockUbicados(impor)
          break;
        case 3:
          reportExc.conStockUbicados(impor)
          break;
      }
    } else {
      $q.notify({ message: 'No hay productos por mostrar', type: 'positive', position: 'top' })
    }
  }


}

const obtReportmm = async () => {
  $q.loading.show({ message: 'Obteniendo Reporte' })
  console.log(report.value)
  let data = {
    _rol: VDB.session.credentials._rol,
    workpoint: VDB.session.store.id_viz,
    _type: reportmm.value.type.val.id,
    section: reportmm.value.seccion.val.id,
  }
  console.log(data)
  const resp = await locationsApi.reportMinMax(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.loading.hide();
    console.log(resp)
    if (resp.length > 0) {
      let impor = {
        key: reportmm.value.type.val.alias,
        value: resp
      }
      console.log(impor);
      switch (reportmm.value.type.val.id) {
        case 1:
          reportExc.conMaximos(impor)
          break;
        case 2:
          reportExc.sinMaximos(impor)
          break;
        case 3:
          reportExc.conMaximos(impor)
          break;
      }
    } else {
      $q.notify({ message: 'No hay productos por mostrar', type: 'positive', position: 'top' })
    }
  }
}


const title = computed(() => warehousStore.title)

</script>
