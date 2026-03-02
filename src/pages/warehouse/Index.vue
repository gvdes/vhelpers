<template>
  <q-page padding>
    <q-table :rows="warehouses" , grid :columns="table.columns" :pagination="table.pagination">
      <template v-slot:item="props">
        <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <q-card class="cursor-pointer">
            <q-card-section>
              <div class="text-h6">{{ props.row.name }}</div>
              <div class="text-caption">{{ props.row.alias }}</div>
            </q-card-section>
            <q-menu>
              <q-list style="min-width: 150px">
                <q-item clickable v-close-popup @click="$router.push(`/warehouse/${props.row.id}/minmax`)">
                  <q-item-section>Minimos Y Maximos</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="$router.push(`/warehouse/${props.row.id}/locations/sections`)">
                  <q-item-section>Ubicaciones</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-card>
        </div>
      </template>
    </q-table>
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
import dbproduct from 'src/API/Product'
import Product from 'src/API/Product';

const VDB = useVDBStore();
const $q = useQuasar();
const warehousStore = useWarehouse()
warehousStore.setTitle('Almacenes')
warehousStore.setshowReportLocations(false);
warehousStore.setshowReportMinMax(false);
warehousStore.setshowOptions(true);

const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: r => r.id },
    { name: 'name', label: 'Nombre', field: r => r.name },
    { name: 'alias', label: 'Alias', field: r => r.alias },
    { name: 'type', label: 'Tipo', field: r => r.type.name },
    { name: 'state', label: 'Estado', field: r => r.state.name }
  ],
  pagination: { rowsPerPage: 0 }
})

const warehouses = computed(() => warehousStore.warehouses)



</script>
