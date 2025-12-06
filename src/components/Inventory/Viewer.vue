<template>
  <q-card class="my-card" v-if="inv">
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
          <q-table
            :rows="log"
            :columns="tproducts.columnsLog"
          />
          <!-- <div v-for="(det,idx) in log" :key="idx">
            <pre>{{ det }}</pre>
          </div> -->
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

  <q-card v-if="errorsearch" class="bg-negative">
    <q-card-section>
      <pre class="text-white">{{errorsearch}}</pre>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import CDB from 'src/API/cicsdb';
import XLSX from 'exceljs';
import fsaver from "file-saver";
import dayjs from 'dayjs';
import { exportFile, useQuasar } from 'quasar';
const $q = useQuasar();
const $props = defineProps({
  folio:[String, Number],
  store:[String, Number],
});

const $emit = defineEmits(['errorsearch']);

const folio = $props.folio;
const store = $props.store;

const inv = ref(null);
const errorsearch = ref(null);
const tab = ref("body");
const rowsproducts = ref(null);
const tproducts = ref({
  cols:[
    { name:"id", field:"id", label:"ID", align:"left" },
    { name:"lcode", field:"code", label:"Codigo" },
    { name:"scode", field:"name", label:"Codigo C." },
    { name:"descr", field:"description", label:"Articulo", align:"left", classes:"fs-dec4" },
    { name:"sai", field:row => row.pivot.stock, label:"SAI", align:"center" },
    { name:"counteds", field:row => row.pivot.stock_acc, label:"UC", align:"center" },
    { name:"sat", field:row => row.pivot.stock_end ?? '--', label:"SAT", align:"center" },
    { name:"ufus", field:row => (row.pivot.stock_acc - row.pivot.stock), label:"UF/US", align:"center" },
    { name:"locs", field:row => row.locations.map( l => l.path ).join(', '), label:"Ubicacion (es)", align:"left" },
    { name:"gen", field:row => row.stocks[0]?.pivot.gen, label:"GEN", align:"left" },
    { name:"exh", field:row => row.stocks[0]?.pivot.exh, label:"EXH", align:"left" },
    { name:"fdt", field:row => row.stocks[0]?.pivot.fdt, label:"FDT", align:"left" },

  ],
  columnsLog:[
    { name:"id", field:"id", label:"ID", align:"left" },
    { name:"name", field:"name", label:"Nombre", align:"left" },
    { name:"responsable", field:r=> r.details.responsable, label:"Responsable", align:"left" },
    { name:"fecha", field:"created_at", label:"Fecha", align:"left" },

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
  $q.loading.show({message:'Obteniendo Informacion'})
  const response = await CDB.find(folio, store);
  console.log(response);
  response.fail ? errorsearch.value=response.fail : inv.value=response.inventory;
  $q.loading.hide()
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
    { header:"GEN", key:"gen" },
    { header:"EXH", key:"exh" },
    { header:"FDT", key:"fdt" },
  ];

  productsdb.value.forEach( row => {
    worksheet.addRow({
      id:row.id,
      lcode:row.code,
      scode:row.name,
      description:row.description,
      sai:parseInt(row.pivot.stock),
      uc:parseInt(row.pivot.stock_acc),
      sat:parseInt(row.pivot.stock_end),
      ufus:(parseInt(row.pivot.stock_acc)-parseInt(row.pivot.stock)),
      locs: row.locations.map( l => l.path ).join(', '),
      gen:row.stocks[0]?.pivot.gen,
      exh:row.stocks[0]?.pivot.exh,
      fdt:row.stocks[0]?.pivot.fdt,
    });
  });

  worksheet.getCell('N2').value = "Folio:";         worksheet.getCell('O2').value = inv.value.id;
  worksheet.getCell('N3').value = "Sucursal:";      worksheet.getCell('O3').value = inv.value.workpoint.name;
  worksheet.getCell('N4').value = "Estado:";        worksheet.getCell('O4').value = cstate.value;
  worksheet.getCell('N5').value = "Creado por:";    worksheet.getCell('O5').value = by.value ? by.value.names : "";
  worksheet.getCell('N6').value = "Realizado por:"; worksheet.getCell('O6').value = responsables.value;
  worksheet.getCell('N7').value = "Inicio:";        worksheet.getCell('O7').value = "";
  worksheet.getCell('N8').value = "Termino:";      worksheet.getCell('O8').value = "";

  workbook.xlsx.writeBuffer().then( buffer => fsaver(new Blob([buffer], { type: "application/octet-stream" }), filename));

}

</script>
