<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />

    </q-header>

    <q-page-container>
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Depositos</span>
        </div>
      </q-toolbar>

      <q-tabs v-model="tab" class="text-primary">
        <q-route-tab name="confirm" icon="list" label="Confirmaciones" to="/depositsap/confirm" />
        <!-- <q-route-tab name="deposit" icon="grid_view" label="Depositos" to="/deposits/verified" /> -->
      </q-tabs>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import dbCompare from 'src/API/compareApi'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';

const VDB = useVDBStore();
const $q = useQuasar();

const tab = ref('confirm')


</script>
