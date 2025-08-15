<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="bg-grey-3 text-dark" bordered>
      <UserToolbar />
      <q-separator />

    </q-header>
    <q-page-container>
      <q-page padding>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import dbproduct from 'src/API/Product'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { assist } from "src/boot/axios";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import labels from 'src/Pdf/labels/labels.js'
import { BarcodeReader } from 'capacitor-plugin-dynamsoft-barcode-reader';

const VDB = useVDBStore();
const $q = useQuasar();

</script>
