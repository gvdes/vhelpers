<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />

    </q-header>


    <q-page-container>
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Comparativo</span>
        </div>
        <q-btn color="primary" icon="delete" flat @click="reset" :disable="!secciones.val" />
      </q-toolbar>
      <q-page padding>
        <q-card class="my-card">
          <q-card-section class="row">
            <q-select class="col" v-model="secciones.val" :options="secciones.opts" label="Seccion" option-label="name"
              multiple filled @blur="report" />
            <q-separator spaced inset vertical dark />
            <q-select class="col" v-model="categories.familias.val" :options="categories.familias.opts" label="Familia"
              filled option-label="name" :disable="!secciones.val" @update:model-value="categorys">
              <template v-if="categories.familias.val" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="categories.familias.val = null" class="cursor-pointer" />
              </template>
            </q-select>
            <q-separator spaced inset vertical dark />
            <q-select class="col" v-model="categories.categorias.val" :options="categories.categorias.opts"
              label="Categoria" option-label="name" :disable="!categories.familias.val" filled>
              <template v-if="categories.categorias.val" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="categories.categorias.val = null" class="cursor-pointer" />
              </template>
            </q-select>
          </q-card-section>
        </q-card>
        <q-separator spaced inset vertical dark />

        <q-table :rows="bascket" :columns="table.columns" :pagination="table.pagination">
          <template v-slot:top-right>
            <q-btn color="primary" icon-right="archive" flat @click="exportTable" :disable="bascket.length <= 0" />
          </template>
        </q-table>

      </q-page>
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

const secciones = ref({
  val: null,
  opts: []
})

const categories = ref({
  categorias: {
    opts: [],
    val: null
  },
  familias: {
    opts: [],
    val: null
  }
})
const products = ref([])

const bascket = computed(() => {
  if (categories.value.familias.val && !categories.value.categorias.val) {
    return products.value.filter(e => e.category.familia.name == categories.value.familias.val)

  } else if (categories.value.familias.val && categories.value.categorias.val) {
    return products.value.filter(e => e.category.familia.name == categories.value.familias.val && e.category.name == categories.value.categorias.val)
  }
  else {
    return products.value
  }
})


const table = ref({
  columns: [
    { name: 'code', label: 'Codigo', align: 'left', field: row => row.code },
    { name: 'description', label: 'Descripcion', align: 'left', field: row => row.description },
    { name: 'pxc', label: 'PXC', align: 'center', field: row => row.pieces },
    { name: 'section', label: 'Seccion', align: 'left', field: row => row.category.familia.seccion.name },
    { name: 'family', label: 'Familia', align: 'left', field: row => row.category.familia.name },
    { name: 'category', label: 'Categoria', align: 'left', field: row => row.category.name },
    { name: 'cedis', label: 'Cedis', align: 'center', field: row => row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock) },
    { name: 'texcoco', label: 'Texcoco', align: 'center', field: row => row.stocks.filter(e => e.id == 2).map(e => e.pivot.stock) },
    { name: 'total', label: 'Total', align: 'center', field: row => Number(row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)) + Number(row.stocks.filter(e => e.id == 2).map(e => e.pivot.stock)) },
    { name: 'totalcj', label: 'Total Cajas', align: 'center', sortable: true, field: row => Math.round((Number(row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)) + Number(row.stocks.filter(e => e.id == 2).map(e => e.pivot.stock))) / Number(row.pieces)) },
    { name: 'Sucursal', label: `${VDB.session.store.name}`, align: 'center', field: row => row.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock) },
    { name: 'SucursalINTRANSIT', label: `${VDB.session.store.alias} en TRA`, align: 'center', field: row => row.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.in_transit) },

    { name: 'cediss', label: `Surtir En`, align: 'center', field: row => row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock) > 0 ? "Cedis" : "Texcoco" },

  ],
  pagination: {
    rowsPerPage: 20
  }
})

const init = async () => {
  $q.loading.show({ message: 'Obteniendo secciones' })
  const resp = await dbCompare.secciones()
  if (resp.fail) {
    console.log(resp)
  } else {
    secciones.value.opts = resp
    $q.loading.hide();
  }
  console.log(resp)
}

const report = async () => {
  $q.loading.show({ message: 'Obteniendo registros' })

  categories.value = {
    categorias: {
      opts: [],
      val: null
    },
    familias: {
      opts: [],
      val: null
    }
  }
  let sid = VDB.session.store.id_viz
  let section = []
  secciones.value.val.forEach(e => section.push(e.name))
  console.log(Array.isArray(section))
  const resp = await dbCompare.getData(sid, { sections: section })
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    products.value = resp
    products.value.forEach(e => {
      const familia = e.category.familia.name
      if (familia && !categories.value.familias.opts.includes(familia)) {
        categories.value.familias.opts.push(familia)
      }
    })
    $q.loading.hide();
  }
}

const categorys = () => {
  categories.value.categorias.val = null
  if (categories.value.familias.val) {
    categories.value.categorias.opts = bascket.value.map(e => e.category.name).filter((v, i, s) => s.indexOf(v) === i)
  } else {
    return []
  }
}

const reset = () => {
  categories.value = {
    categorias: {
      opts: [],
      val: null
    },
    familias: {
      opts: [],
      val: null
    }
  }
  products.value = []
  secciones.value.val = null
}

const exportTable = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Comparativo');
  worksheet.addRow(table.value.columns.map(e => e.label));
  bascket.value.forEach(row =>
    worksheet.addRow([
      row.code,
      row.description,
      row.pieces,
      row.category.familia.seccion.name,
      row.category.familia.name,
      row.category.name,
      row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)[0],
      row.stocks.filter(e => e.id == 2).map(e => e.pivot.stock)[0],
      Number(row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)) + Number(row.stocks.filter(e => e.id == 2).map(e => e.pivot.stock)),
      Math.round((Number(row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)) + Number(row.stocks.filter(e => e.id == 2).map(e => e.pivot.stock))) / Number(row.pieces)),
      row.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock)[0],
      row.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.in_transit)[0],
      row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)[0] > 0 ? "Cedis" : "Texcoco"
    ])
  );

  const downloadExcel = async () => {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `Comparativo${VDB.session.store.alias}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  downloadExcel();
}

// if (VDB.session.rol == 'aux' || VDB.session.rol == 'gen' || VDB.session.rol == 'aud' || VDB.session.rol == 'root') {
  init()
// } else {
//   $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
//   $router.replace('/');

// }

</script>
