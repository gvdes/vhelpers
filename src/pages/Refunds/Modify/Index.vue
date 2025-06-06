<template>
  <q-page padding>

  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import refundsApi from "src/API/refundsApi";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import { useRoute, useRouter } from "vue-router";
import dayjs from 'dayjs';
import viewRefund from 'src/components/Refunds/ViewRefunds.vue';// encabezado aoiida
const $router = useRouter();
const VDB = useVDBStore();
const $q = useQuasar();

const refunds = ref([]);

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos', type: 'positive', position: 'center' });
  let sid = VDB.session.store.id
  const resp = await refundsApi.getRefundDirerences(sid)
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    refunds.value = resp

    $q.loading.hide()
  }

}

init()

</script>
