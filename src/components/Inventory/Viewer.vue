<template>
  <q-card class="my-card" v-if="inv">
    <q-card-section>
      <div class="row justify-between">
        <div class="text-h6">Inventario {{ folio }}</div>
        <div><q-btn color="primary" label="descargar" @click="exportAsExcel" /></div>
      </div>
      <div class="text-subtitle2">Creado por: <b>{{ by ? by.name : "Nobody" }}</b></div>
      <div class="text-subtitle2">Realizado por: <b>{{ responsables }}</b></div>
      <div class="text-subtitle2">Estado: <b>{{ cstate }}</b></div>
    </q-card-section>
    <q-tabs v-model="tab">
      <q-tab name="log" label="Log" />
      <q-tab name="body" label="Resumen" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="log">
        <div class="text-h6">Log</div>
        <q-table :rows="log" :columns="tproducts.columnsLog" />
      </q-tab-panel>
      <q-tab-panel name="body">
        <q-table flat :rows="productsdb" :columns="columnsProducts" row-key="name" ref="rowsproducts" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
  <q-card v-if="errorsearch" class="bg-negative">
    <q-card-section>
      <pre class="text-white">{{ errorsearch }}</pre>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import CDB from 'src/API/cicsdb';
import XLSX from 'exceljs';
import fsaver from "file-saver";
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { exportFile, useQuasar } from 'quasar';
const $q = useQuasar();
const $route = useRoute();
const $props = defineProps({
  folio: [String, Number],
  store: [String, Number],
});

const $emit = defineEmits(['errorsearch']);

const folio = $props.folio;
const store = $route.params.wid;

const inv = ref(null);
const errorsearch = ref(null);
const tab = ref("body");
const rowsproducts = ref(null);


const by = computed(() => inv.value ? inv.value.created_by : null);
const log = computed(() => inv.value ? inv.value.log : []);
const responsables = computed(() => (inv.value && inv.value.responsables && inv.value.responsables.length) ? inv.value.responsables.map(r => r.nick).join(",") : "");
const productsdb = computed(() => (inv.value && inv.value.products && inv.value.products.length) ? inv.value.products : []);

const cstate = computed(() => inv.value ? inv.value.state.name : "");
const startsat = computed(() => "");
const endsat = computed(() => "");

const findInv = async () => {
  $q.loading.show({ message: 'Obteniendo Informacion' })
  const response = await CDB.find(folio, store);
  console.log(response)
  if (response.fail) {
    errorsearch.value = response.fail
  } else {
    inv.value = response.inventory;
    $q.loading.hide()
  }
}

const dynamicCols = computed(() => {
  if (!productsdb.value.length) return []

  const warehouses = new Map()

  productsdb.value.forEach(p => {
    p.stocks.forEach(s => {
      if (!warehouses.has(s.id)) {
        warehouses.set(s.id, {
          id: s.id,
          alias: s.alias ?? s.name ?? `ALM-${s.id}`
        })
      }
    })
  })

  return Array.from(warehouses.values()).map(w => ({
    name: `wh_${w.id}`,
    label: w.alias,
    align: "center",
    field: row =>
      row.stocks
        .filter(e => e.id === w.id)
        .reduce((a, v) => a + v.pivot._current, 0)
  }))
})
const dynamicExcelCols = computed(() => dynamicCols.value.map(col => ({
  header: col.label,
  key: col.name
})))
const baseCols = ref([
  { name: "id", field: "id", label: "ID", align: "left" },
  { name: "lcode", field: "code", label: "Codigo" },
  { name: "scode", field: "name", label: "Codigo C." },
  { name: "descr", field: "description", label: "Articulo", align: "left", classes: "fs-dec4" },
  { name: "sai", field: row => row.pivot.stock, label: "SAI", align: "center" },
  { name: "counteds", field: row => row.pivot.stock_acc, label: "UC", align: "center" },
  { name: "sat", field: row => row.pivot.stock_end ?? '--', label: "SAT", align: "center" },
  { name: "precision", field: row => {
    const acc = row.pivot.stock_acc
    const end = row.pivot.stock_end

    if (!end) return '--'

  return ((1 - (Math.abs(acc - end) / end)) * 100).toFixed(2) + '%'
  } , label: "Precision", align: "center" },


  { name: "ufus", field: row => (row.pivot.stock_acc - row.pivot.stock_end), label: "UF/US", align: "center" },
  { name: "locs", field: row => row.locations.map(l => l.path).join(', '), label: "Ubicacion (es)", align: "left" },
  ...dynamicCols.value
])
const columnsProducts = computed(() => [
  ...baseCols.value,
  ...dynamicCols.value
])
const tproducts = ref({
  columnsLog: [
    { name: "id", field: "id", label: "ID", align: "left" },
    { name: "name", field: "name", label: "Nombre", align: "left" },
    { name: "responsable", field: r => JSON.parse(r.pivot.details).responsable, label: "Responsable", align: "left" },
    { name: "fecha", field: r => dayjs(r.pivot.created_at).format('YYYY-MM-DD H:m:s'), label: "Fecha", align: "left" },

  ]
});

findInv();

const exportAsExcel = (evt) => {
  let filename = `INV_${inv.value.id}_${inv.value.warehouse.alias}.xlsx`;
  console.log(filename);
  let workbook = new XLSX.Workbook();
  let worksheet = workbook.addWorksheet("Hoja1");

  worksheet.columns = [
    { header: "ID", key: "id" },
    { header: "Codigo", key: "lcode" },
    { header: "Codigo C.", key: "scode" },
    { header: "Articulo", key: "description" },
    { header: "SAI", key: "sai" },
    { header: "UC", key: "uc" },
    { header: "SAT", key: "sat" },
    { header: "UF/US", key: "ufus" },
    { header: "Presicion", key: "presition" },

    { header: "Ubicacion(es)", key: "locs" },
    ...dynamicExcelCols.value
  ]

  productsdb.value.forEach(row => {
    const baseRow = {
      id: row.id,
      lcode: row.code,
      scode: row.short_code,
      description: row.description,
      sai: parseInt(row.pivot.stock),
      uc: parseInt(row.pivot.stock_acc ?? 0),//unidades Contadas
      sat: parseInt(row.pivot.stock_end ?? 0), // stock al termino
      ufus: (parseInt(row.pivot.stock_acc ?? 0) - parseInt(row.pivot.stock_end ?? 0)), //diferencia
      presition: ((1 - (Math.abs(row.pivot.stock_acc - row.pivot.stock_end ?? 0) / row.pivot.stock_end ?? 0)) * 100).toFixed(2) + '%',
      locs: row.locations.map(l => l.path).join(', ')
    }
    dynamicCols.value.forEach(col => {
      baseRow[col.name] = col.field(row)
    })
    worksheet.addRow(baseRow)
  })
  worksheet.getCell('O2').value = "Folio:"; worksheet.getCell('P2').value = inv.value.id;
  worksheet.getCell('O3').value = "Almacen:"; worksheet.getCell('P3').value = inv.value.warehouse.name;
  worksheet.getCell('O4').value = "Estado:"; worksheet.getCell('P4').value = cstate.value;
  worksheet.getCell('O5').value = "Creado por:"; worksheet.getCell('P5').value = by.value ? by.value.nick : "";
  worksheet.getCell('O6').value = "Realizado por:"; worksheet.getCell('P6').value = responsables.value;
  worksheet.getCell('O7').value = "Inicio:"; worksheet.getCell('P7').value = dayjs(inv.value.log.find(e => e.id == 2)?.pivot.created_at).format('YYYY-MM-DD H:m:s') ?? '' ;
  worksheet.getCell('O8').value = "Termino:"; worksheet.getCell('P8').value = dayjs(inv.value.log.find(e => e.id == 3)?.pivot.created_at).format('YYYY-MM-DD H:m:s') ?? '' ;
  workbook.xlsx.writeBuffer().then(buffer => fsaver(new Blob([buffer], { type: "application/octet-stream" }), filename));

}

</script>
