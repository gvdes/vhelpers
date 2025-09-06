<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-separator />
    </q-header>
    <q-separator spaced inset vertical dark />
    <q-page-container class=" q-ml-sm">
      <q-page padding>
        <q-card class="my-card">
          <q-card-section>
            <q-toolbar>
              <q-toolbar-title>
                <div><span class="text-grey">Helpers</span> <q-icon name="navigate_next" color="primary" /> <span
                    class="text-h6">Reportes Auditoria</span></div>
              </q-toolbar-title>
              <q-btn flat round dense icon="apps" class="q-mr-xs">
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item tag="label" v-ripple v-for="(param, index) in times" :key="index">
                      <q-item-section>
                        <q-item-label>{{ param.label }}</q-item-label>
                      </q-item-section>
                      <q-item-section side top>
                        <q-toggle color="primary" v-model="param.active" val="friend"
                          :disable="disableToggle && !param.active" />
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <q-btn flat round dense icon="event" :disable="times.find(e => e.active)?.id != 1">
                <q-menu>
                  <q-date v-model="fechas" range minimal />
                </q-menu>
              </q-btn>
            </q-toolbar>
            <q-separator spaced inset vertical dark />
            <q-toolbar class="row">
              <q-select class="col" v-model="filters.seccion" :options="secciones" label="Seccion" option-label="name"
                filled dense @update:model-value="clearData">
                <template v-if="filters.seccion" v-slot:append>
                  <q-icon name="cancel"
                    @click.stop.prevent="() => { filters.familia = null; filters.categoria = null; filters.seccion = null }"
                    class="cursor-pointer" />
                </template></q-select>
              <q-separator spaced inset vertical dark />
              <q-select class="col" v-model="filters.familia" :options="familias" label="Familia" option-label="name"
                filled dense :disable="!filters.seccion">
                <template v-if="filters.familia" v-slot:append>
                  <q-icon name="cancel" @click.stop.prevent="() => { filters.familia = null; filters.categoria = null }"
                    class="cursor-pointer" />
                </template></q-select>
              <q-separator spaced inset vertical dark />
              <q-select class="col" v-model="filters.categoria" :options="categorias" label="Categoria"
                option-label="name" filled dense :disable="!filters.familia">
                <template v-if="filters.categoria" v-slot:append>
                  <q-icon name="cancel" @click.stop.prevent="() => { filters.categoria = null }"
                    class="cursor-pointer" />
                </template>
              </q-select>
              <q-separator spaced inset vertical dark />
              <q-btn color="primary" icon="send" flat :disabled="!filters.seccion" @click="obtReporte" />
            </q-toolbar>
          </q-card-section>
        </q-card>
        <q-table :rows="report" :columns="table.columns">
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar"
              :disable="report.length <= 0">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn color="primary" icon="download" @click="descargar" flat :disable="report.length <= 0" />
          </template>

        </q-table>

      </q-page>

    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import reportApi from "src/API/reportApi";
import ExcelJS from 'exceljs';
import { useRoute, useRouter } from "vue-router";
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import Index from 'src/pages/Refunds/Index.vue';
const $router = useRouter();

const VDB = useVDBStore();
const $q = useQuasar();
const date = new Date();

const hoy = ref(dayjs(date).format('YYYY/MM/DD'))

const times = ref([
  { id: 1, label: "PERSONALIZADA", active: true },
  { id: 2, label: "DIA", active: false },
  { id: 3, label: "SEMANA", active: false },
  { id: 4, label: "MES", active: false },
])
const fechas = ref(dayjs(date).format('YYYY/MM/DD'));
const categories = ref([])
const filters = ref({
  seccion: null,
  familia: null,
  categoria: null
})
const report = ref([]);
const table = ref({
  columns: [
    { name: 'code', label: "Codigo", field: r => r.code, align: 'left' },
    { name: 'description', label: "Descripcion", field: r => r.description, align: 'left' },
    { name: 'cb', label: "CB", field: r => r.barcode, align: 'left' },
    { name: 'section', label: "Seccion", field: r => r.category.familia.seccion.name, align: 'left' },
    { name: 'family', label: "Familia", field: r => r.category.familia.name, align: 'left' },
    { name: 'category', label: "Categoria", field: r => r.category.name, align: 'left' },
    { name: 'provider', label: "Proveedor", field: r => r.providers.name, align: 'left' },
    { name: 'pxc', label: "PXC", field: r => r.pieces, align: 'center' },
    { name: 'ultll', label: "Ultima_LL", field: r => r.purchases.length ? dayjs(r.purchases?.reduce((max, item) => new Date(item.created_at) > new Date(max) ? item.created_at : max, r.purchases[0]?.created_at)).format('YYYY/MM/DD') : null, align: 'left' },
    { name: 'purchase', label: "Compras", field: r => r.purchases.reduce((a, item) => a + Number(item.pivot?.amount), 0), align: 'center' },
    { name: 'purchasexc', label: "Compras X C", field: r => Number(Number(r.purchases.reduce((a, item) => a + Number(item.pivot?.amount), 0)) / Number(r.pieces)).toFixed(2), align: 'center' },
    { name: 'sales', label: "Ventas", field: r => Number(r.sales.reduce((a, item) => a + Number(item.pivot?.amount), 0)), align: 'center' },
    { name: 'salesxc', label: "Ventas X C", field: r => Number(Number(r.sales.reduce((a, item) => a + Number(item.pivot?.amount), 0)) / Number(r.pieces)).toFixed(2), align: 'center' },
    { name: 'stock', label: "Stock", field: r => r.stocks[0]?.pivot?.stock, align: 'center' },
    { name: 'stockxc', label: "Stock X C", field: r => Number(Number(r.stocks[0]?.pivot?.stock) / Number(r.pieces)).toFixed(2), align: 'center' },
    { name: 'min', label: "Minimo", field: r => r.stocks[0]?.pivot?.min, align: 'center' },
    { name: 'max', label: "Maximo", field: r => r.stocks[0]?.pivot?.max, align: 'center' },
    { name: 'in_transit', label: "En Transito", field: r => r.stocks[0]?.pivot?.in_transit, align: 'center' },
    { name: 'centro', label: "Centro", field: r => r.prices.find(e => e.id == 6).pivot?.price, align: 'center' },
    { name: 'especial', label: "Especial", field: r => r.prices.find(e => e.id == 5).pivot?.price, align: 'center' },
    { name: 'caja', label: "Caja", field: r => r.prices.find(e => e.id == 4).pivot?.price, align: 'center' },
    { name: 'docena', label: "Docena", field: r => r.prices.find(e => e.id == 3).pivot?.price, align: 'center' },
    { name: 'mayoreo', label: "Mayoreo", field: r => r.prices.find(e => e.id == 2).pivot?.price, align: 'center' },
    { name: 'menudeo', label: "Menudeo", field: r => r.prices.find(e => e.id == 1).pivot?.price, align: 'center' },
  ],
  filter: null
})
const disableToggle = computed(() => times.value.filter(a => a.active).length > 0);
const secciones = computed(() => categories.value.filter(e => e.deep == 0))
const familias = computed(() => {
  let families = categories.value.filter(e => e.deep == 1)
  if (filters.value.seccion) {
    return families.filter(e => e.root == filters.value.seccion.id)
  } else {
    return families
  }
})
const categorias = computed(() => {
  let category = categories.value.filter(e => e.deep == 2)
  if (filters.value.familia) {
    return category.filter(e => e.root == filters.value.familia.id)
  } else {
    return category
  }
})



const init = async () => {
  $q.loading.show({ message: "Obteniendo Categorias" })
  const resp = await reportApi.init();
  if (resp.fail) {
    console.log(resp)
  } else {
    categories.value = resp
    $q.loading.hide()
  }
}

const obtReporte = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  let range;
  let time = times.value.find(e => e.active);
  switch (time.id) {
    case 1:
      range = fechas.value
      break;
    case 2:
      range = hoy.value;
      break;
    case 3:
      range = dayjs(hoy.value).week()
      break;
    case 4:
      range = dayjs(hoy.value).month() + 1
      break;
  }
  let data = {
    workpoint: VDB.session.store,
    time: time,
    range: range,
    filters: filters.value
  }
  console.log(data)
  const resp = await reportApi.obtReport(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    report.value = resp
    $q.loading.hide()
  }

}

const clearData = () => {
  report.value = [];
  filters.value.familia = null;
  filters.value.categoria = null;

}

const descargar = () => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet(`Reporte`);


  let datExport = report.value.map(r => {
    return {
      "Codigo": r.code,
      "Descripcion": r.description,
      "CB": r.barcode,
      "Seccion": r.category.familia.seccion.name,
      "Familia": r.category.familia.name,
      "Categoria": r.category.name,
      "Proveedor": r.providers.name,
      "PXC": r.pieces,
      "Ultima_LL": r.purchases.length ? dayjs(r.purchases?.reduce((max, item) => new Date(item.created_at) > new Date(max) ? item.created_at : max, r.purchases[0]?.created_at)).format('YYYY/MM/DD') : null,
      "Compras": r.purchases.reduce((a, item) => a + Number(item.pivot?.amount), 0),
      "Compras X C": Number(Number(Number(r.purchases.reduce((a, item) => a + Number(item.pivot?.amount), 0)) / Number(r.pieces)).toFixed(2)),
      "Ventas": Number(r.sales.reduce((a, item) => a + Number(item.pivot?.amount), 0)),
      "Ventas X C": Number(Number(Number(r.sales.reduce((a, item) => a + Number(item.pivot?.amount), 0)) / Number(r.pieces)).toFixed(2)),
      "Stock": r.stocks[0]?.pivot?.stock,
      "Stock X C": Number(Number(Number(r.stocks[0]?.pivot?.stock) / Number(r.pieces)).toFixed(2)),
      "Minimo": r.stocks[0]?.pivot?.min,
      "Maximo": r.stocks[0]?.pivot?.max,
      "En Transito": r.stocks[0]?.pivot?.in_transit,
      "Centro": r.prices.find(e => e.id == 6)?.pivot?.price,
      "Especial": r.prices.find(e => e.id == 5)?.pivot?.price,
      "Caja": r.prices.find(e => e.id == 4)?.pivot?.price,
      "Docena": r.prices.find(e => e.id == 3)?.pivot?.price,
      "Mayoreo": r.prices.find(e => e.id == 2)?.pivot?.price,
      "Menudeo": r.prices.find(e => e.id == 1)?.pivot?.price,
    }
  })
  const columns = Object.keys(datExport[0]).map(key => ({
    name: key,
    filterButton: true
  }));
  const rows = datExport.map(obj => Object.values(obj));
  worksheet.addTable({
    name: `Reporte`,
    ref: 'A1',
    headerRow: true,
    // totalsRow: true,
    style: { showRowStripes: true },
    columns: columns,
    rows: rows
  });



  const downloadExcel = async () => {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reporte.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  downloadExcel();
}

init()
</script>
