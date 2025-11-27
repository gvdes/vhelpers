<template>
  <q-page padding>
    <router-view />
    <q-footer reveal elevated bordered>
      <q-tabs v-model="tab" :class="$q.dark.isActive ? 'text-white bg-dark' : 'text-dark bg-white'" dense>
        <q-route-tab name="locations" icon="device_hub" label="Estructura" to="/warehouse/locations/sections" />
        <q-route-tab name="products" icon="location_searching" label="Productos" to="/warehouse/locations/products" />
        <q-route-tab name="delete" icon="art_track" label="Masivo" to="/warehouse/locations/massive" v-if="mosMassisve" />
      </q-tabs>
    </q-footer>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import { useWarehouse } from 'src/stores/warehousStore';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import dbCompare from 'src/API/compareApi'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import productsApi from 'src/API/productsApi';
import locationsApi from 'src/API/locationsApi';
import dbproduct from 'src/API/Product'

const VDB = useVDBStore();
const $q = useQuasar();
const tab = ref('locations')

const mosMassisve =  computed(() => [1,2,5,6,12,22].includes(VDB.session.credentials._rol))
</script>
