<template>
  <q-page padding>
    <q-table
      :rows="warehouses",
      grid
      :columns="table.columns"
      :pagination="table.pagination"
      />

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
  columns:[
    {name:'id',label:'ID', field:r=>r.id},
    {name:'name',label:'Nombre', field:r=>r.name},
    {name:'alias',label:'Alias', field:r=>r.alias},
    {name:'type',label:'Tipo', field:r=>r.type.name},
    {name:'state',label:'Estado', field:r=>r.state.name}
  ],
  pagination:{rowsPerPage:0}
})

const warehouses = computed(() => warehousStore.warehouses)



</script>
