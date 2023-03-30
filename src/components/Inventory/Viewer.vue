<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="row justify-between">
        <div class="text-h6">Inventario {{ folio }}</div>
        <div><q-btn color="primary" label="descargar" @click="exportAsExcel" /></div>
      </div>
      <div class="text-subtitle2">Creado por: <b>{{ by ? by.names : "Nobody" }}</b></div>
      <div class="text-subtitle2">Realizado por: <b>{{ responsables }}</b></div>
      <div class="text-subtitle2">Estado: <b>{{ cstate }}</b></div>
    </q-card-section>
      <q-tabs v-model="tab" >
        <q-tab name="log" label="Log" />
        <q-tab name="body" label="Resumen" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="log">
          <div class="text-h6">Log</div>
          <div v-for="(det,idx) in log" :key="idx">
            <pre>{{ det }}</pre>
          </div>
        </q-tab-panel>
        <q-tab-panel name="body">
          <q-table flat
            :rows="productsdb"
            :columns="tproducts.cols"
            row-key="name"
            ref="rowsproducts"
          />
        </q-tab-panel>
      </q-tab-panels>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import CDB from 'src/API/cicsdb';
import XLSX from 'exceljs';
import fsaver from "file-saver";
import dayjs from 'dayjs';

const $props = defineProps({
  folio:Number,
  store:[String, Number],
});

const folio = $props.folio;
const store = $props.store;

const inv = ref(null);
const tab = ref("body");
const rowsproducts = ref(null);
const tproducts = ref({
  cols:[
    { name:"id", field:"id", label:"ID", align:"left" },
    { name:"lcode", field:"code", label:"Codigo" },
    { name:"scode", field:"name", label:"Codigo C." },
    { name:"descr", field:"description", label:"Articulo", align:"left", classes:"fs-dec4" },
    { name:"sai", field:row => row.ordered.stocks, label:"SAI", align:"center" },
    { name:"counteds", field:row => row.ordered.stocks_acc, label:"UC", align:"center" },
    { name:"sat", field:row => row.ordered.stocks_end ?? '--', label:"SAT", align:"center" },
    { name:"ufus", field:row => (row.ordered.stocks_acc-row.ordered.stocks), label:"UF/US", align:"center" },
    { name:"locs", field:row => row.locations.map( l => l.path ).join(', '), label:"Ubicacion (es)", align:"left" },
  ]
});

const by = computed(() => inv.value ? inv.value.created_by : null );
const log = computed(() => inv.value ? inv.value.log : [] );
const responsables = computed(() => (inv.value && inv.value.responsables && inv.value.responsables.length) ? inv.value.responsables.map( r => r.nick ).join(",") : "" );
const productsdb = computed(() => (inv.value&&inv.value.products&&inv.value.products.length) ? inv.value.products : []);
const cstate = computed(() => inv.value ? inv.value.status.name:"");
const startsat = computed(() => "");
const endsat = computed(() => "");

const findInv = async() => {
  const response = await CDB.find(folio, store);
  console.log(response);
  inv.value = response.inventory;
}

findInv();

const exportAsExcel = (evt) => {
  let filename = `INV_${inv.value.id}_${inv.value.workpoint.alias}.xlsx`;
  console.log(filename);

  let workbook = new XLSX.Workbook();
  let worksheet = workbook.addWorksheet("Sheet1");

  worksheet.columns = [
    { header:"ID", key:"id" },
    { header:"Codigo", key:"lcode" },
    { header:"Codigo C.", key:"scode" },
    { header:"Articulo", key:"description" },
    { header:"SAI", key:"sai" },
    { header:"UC", key:"uc" },
    { header:"SAT", key:"sat" },
    { header:"UF/US", key:"ufus" },
    { header:"Ubicacion(es)", key:"locs" },
  ];

  productsdb.value.forEach( row => {
    worksheet.addRow({
      id:row.id,
      lcode:row.code,
      scode:row.name,
      description:row.description,
      sai:parseInt(row.ordered.stocks),
      uc:parseInt(row.ordered.stocks_acc),
      sat:parseInt(row.ordered.stocks_end),
      ufus:(parseInt(row.ordered.stocks_acc)-parseInt(row.ordered.stocks)),
      locs: row.locations.map( l => l.path ).join(', '),
    });
  });

  worksheet.getCell('L2').value = "Folio:";         worksheet.getCell('M2').value = inv.value.id;
  worksheet.getCell('L3').value = "Sucursal:";      worksheet.getCell('M3').value = inv.value.workpoint.name;
  worksheet.getCell('L4').value = "Estado:";        worksheet.getCell('M4').value = cstate.value;
  worksheet.getCell('L5').value = "Creado por:";    worksheet.getCell('M5').value = by.value ? by.value.names : "";
  worksheet.getCell('L6').value = "Realizado por:"; worksheet.getCell('M6').value = responsables.value;
  worksheet.getCell('L7').value = "Inicio:";        worksheet.getCell('M7').value = "";
  worksheet.getCell('L8').value = "Termino:";      worksheet.getCell('M8').value = "";

  workbook.xlsx.writeBuffer().then( buffer => fsaver(new Blob([buffer], { type: "application/octet-stream" }), filename));

}

</script>
