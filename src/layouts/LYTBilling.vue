<template>

  <q-layout view="hHh Lpr fFf">
    <q-header class="bg-grey-3 text-dark" bordered v-show="$billing.showToolbar">
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import billingApi from 'src/API/billingApi.js';//para dirigirme bro
import { useBillingStore } from 'stores/BillingStore';
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import dayjs from 'dayjs';
import { store } from 'quasar/wrappers';
const VDB = useVDBStore();
const $billing = useBillingStore();
const $q = useQuasar();


</script>
