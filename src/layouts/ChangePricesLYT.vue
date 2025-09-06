<template>
  <q-layout view="hHh Lpr fFf">

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />

    </q-header>


    <q-page-container>
      <q-page padding>
        <q-toolbar class="justify-between">
          <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Cambios de precio</span>
          </div>
          <div class="text-bold"> Cambio de Precios : {{ typeof (fechas.date) == 'object' ? `Del ${fechas.date.from} a
            ${fechas.date.to}` : fechas.date }}</div>

          <div class="row">
            <q-btn color="primary" icon="event" flat @click="fechas.state = !fechas.state" />
            <q-separator spaced inset vertical dark />
            <q-btn class="col" flat color="primary" icon="download" rounded title="Importar Excel"
              @click="exportTable" />
            <q-separator spaced inset vertical dark />
            <q-btn class="col" flat color="primary" icon="label" rounded title="Crear Etiquetas"
              @click="mosPDF.state = !mosPDF.state" />
          </div>
        </q-toolbar>
        <q-card class="my-card">
          <q-card-section class="row">

            <q-select class="col" v-model="categories.seccion.val" :options="categories.seccion.opts" label="SECCION"
              filled option-label="name">
              <template v-if="categories.seccion.val" v-slot:append>
                <q-btn round dense flat icon="close"
                  @click="categories.seccion.val = null; categories.familias.val = null; categories.categorias.val = null" />
              </template>
            </q-select>

            <q-separator spaced inset vertical dark />

            <q-select class="col" v-model="categories.familias.val" :options="famiCat" label="FAMILIA" filled
              option-label="name" :disable="!categories.seccion.val">
              <template v-if="categories.familias.val" v-slot:append>
                <q-btn round dense flat icon="close"
                  @click="categories.familias.val = null; categories.categorias.val = null" />
              </template>
            </q-select>

            <q-separator spaced inset vertical dark />

            <q-select class="col" v-model="categories.categorias.val" :options="cateGa" label="CATEGORIA" filled
              option-label="name" :disable="!categories.familias.val">
              <template v-if="categories.categorias.val" v-slot:append>
                <q-btn round dense flat icon="close" @click="categories.categorias.val = null" />
              </template>
            </q-select>

            <q-separator spaced inset vertical dark />
          </q-card-section>
        </q-card>
        <q-separator spaced inset vertical dark />

        <q-table :rows="bascket" :columns="table.columns" />

        <q-dialog v-model="mosPDF.state" persistent>
          <optionLabels :products="products" :prices="prices" />
        </q-dialog>

        <q-dialog v-model="fechas.state">
          <q-card class="my-card">
            <q-card-section>
              <div class="q-pa-md">
                <div class="q-pb-sm">
                  <!-- Desde: {{ fechas.from }} : Hasta {{ fechas.to }} -->
                </div>
                <q-date v-model="fechas.date" range minimal />
              </div>
            </q-card-section>
            <q-card-section>
              <q-card-actions align="right">
                <q-btn flat icon="close" color="negative" @click="fechas.state = !fechas.state" />
                <q-btn flat icon="check" color="positive" @click="buscas" />
              </q-card-actions>
            </q-card-section>
          </q-card>
        </q-dialog>


      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import optionLabels from 'src/components/Labels/OptionsLabels.vue';// encabezado aoiida
import pricesProduct from 'src/API/pricesProduct.js'
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import dayjs from "dayjs";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';

const VDB = useVDBStore();
const $q = useQuasar();

const products = ref([]);

const fechas = ref({
  state: false,
  date: null
})
const priceColumns = ref([]);
const stocksColumns = ref([
  {
    name: 'stock_exh',
    label: 'EXHIBICION',
    field: row => row.stocks?.find(s => s.pivot)?.pivot?.exh || 0,
    align: 'center',
    sortable: true
  },
  {
    name: 'stock_gen',
    label: 'GENERAL',
    field: row => row.stocks?.find(s => s.pivot)?.pivot?.gen || 0,
    align: 'center',
    sortable: true
  }
])
const categories = ref({
  seccion: {
    val: null,
    opts: []
  },
  familias: {
    val: null,
    opts: []
  },
  categorias: {
    val: null,
    opts: []
  },
})

const table = ref({
  columns: [
    { name: 'code', label: 'CODIGO', field: row => row.code, align: 'left', sortable: true },
    { name: 'barcode', label: 'CB', field: row => row.barcode, align: 'left', sortable: true },
    { name: 'description', label: 'DESCRIPCION', field: row => row.description, align: 'left', sortable: true },
    { name: 'section', label: 'SECCION', field: row => row.categories.familia.seccion.name, align: 'left', sortable: true },
    { name: 'family', label: 'FAMILIA', field: row => row.categories.familia.name, align: 'left', sortable: true },
    { name: 'category', label: 'CATEGORIA', field: row => row.categories.name, align: 'left', sortable: true },
    { name: 'locations', label: 'UBICACION', field: row => row.locations?.map(e => e.path).join('/'), align: 'center', sortable: true },
    ...priceColumns.value,
    ...stocksColumns.value
  ]
})

const mosPDF = ref({
  state: false,
})

const prices = ref({
  val: [0, 1, 2, 4],
  opts: [
    { label: 'Menudeo', value: 1 },
    { label: 'Mayoreo', value: 2 },
    { label: 'Docena', value: 3 },
    { label: 'Caja', value: 4 },
  ]
})

const filterPrices = computed(() => products.value.filter(e => e.prices.some(i => i.pivot.price != 0)))


const bascket = computed(() => {
  if (categories.value?.seccion?.val && !categories.value?.seccion?.familia?.val) {
    return filterPrices.value.filter(e => e.categories?.familia?.seccion?.id === categories.value.seccion.val.id);
  }
  else if (categories.value?.seccion?.val && categories.value?.seccion?.familia?.val && !categories.value?.seccion?.familia?.categorias?.val) {
    return filterPrices.value.filter(e => e.categories?.familia?.seccion?.id === categories.value.seccion.val.id);
  }
  else if (categories.value?.seccion?.val && categories.value?.seccion?.familia?.val && categories.value?.seccion?.familia?.categorias?.val) {
    return filterPrices.value.filter(e => e.categories?.familia?.seccion?.id === categories.value.seccion.val.id);
  }
  else {
    return filterPrices.value;
  }
});

const famiCat = computed(() => {
  if (categories.value?.seccion?.val) {
    return categories.value.familias.opts.filter(e => e.root == categories.value?.seccion?.val.id)
  } else {
    return categories.value.familias.opts
  }
})

const cateGa = computed(() => {
  if (categories.value?.familias?.val) {
    return categories.value.categorias.opts.filter(e => e.root == categories.value?.familias?.val.id)
  } else {
    return categories.value.categorias.opts
  }
})

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Informacion' });

  let date = new Date();
  fechas.value.date = dayjs(date).format("YYYY/MM/DD")

  let sid = VDB.session.store.id_viz
  const resp = await pricesProduct.getData(sid, { fechas: fechas.value.date });
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    products.value = resp
    products.value.forEach(e => {
      let _labelType = labelType(e.prices)
      e._copies = 1;
      e.type = _labelType.type;
      e.usedPrices = _labelType.prices;

      const seccion = e.categories.familia.seccion
      if (seccion && !categories.value.seccion.opts.map(e => e.id).includes(seccion.id)) {
        categories.value.seccion.opts.push(seccion)
      }
      const familia = e.categories.familia
      if (familia && !categories.value.familias.opts.map(e => e.id).includes(familia.id)) {
        categories.value.familias.opts.push(familia)
      }
      const categoria = e.categories
      if (categoria && !categories.value.categorias.opts.map(e => e.id).includes(categoria.id)) {
        categories.value.categorias.opts.push(categoria)
      }
    })


    if (products.value.length > 0) {
      const sampleProduct = products.value[0];
      if (sampleProduct.prices) {
        sampleProduct.prices.forEach(price => {
          priceColumns.value.push({
            name: `price_${price.id}`,
            label: price.name,
            field: row => row.prices.find(p => p.id === price.id)?.pivot?.price || 0,
            align: 'center',
            sortable: true
          });
        });
      }
      table.value.columns = [
        ...table.value.columns, ...priceColumns.value]
    }
    $q.loading.hide()
  }

}


const buscas = async () => {
  $q.loading.show({ message: 'Obteniendo Informacion' });

  // let date = new Date();
  // fechas.value.date = dayjs(date).format("YYYY/MM/DD")

  let sid = VDB.session.store.id_viz
  const resp = await pricesProduct.getData(sid, { fechas: fechas.value.date });
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    products.value = resp
    products.value.forEach(e => {
      let _labelType = labelType(e.prices)
      e._copies = 1;
      e.type = _labelType.type;
      e.usedPrices = _labelType.prices;

      const seccion = e.categories.familia.seccion
      if (seccion && !categories.value.seccion.opts.map(e => e.id).includes(seccion.id)) {
        categories.value.seccion.opts.push(seccion)
      }
      const familia = e.categories.familia
      if (familia && !categories.value.familias.opts.map(e => e.id).includes(familia.id)) {
        categories.value.familias.opts.push(familia)
      }
      const categoria = e.categories
      if (categoria && !categories.value.categorias.opts.map(e => e.id).includes(categoria.id)) {
        categories.value.categorias.opts.push(categoria)
      }
    })


    if (products.value.length > 0) {
      const sampleProduct = products.value[0];
      if (sampleProduct.prices) {
        sampleProduct.prices.forEach(price => {
          priceColumns.value.push({
            name: `price_${price.id}`,
            label: price.name,
            field: row => row.prices.find(p => p.id === price.id)?.pivot?.price || 0,
            align: 'center',
            sortable: true
          });
        });
      }
      table.value.columns = [
        ...table.value.columns, ...priceColumns.value]
    }
    $q.loading.hide()
    fechas.value.state = !fechas.value.state
  }
}

const exportTable = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Comparativo');

  worksheet.addRow(table.value.columns.map(e => e.label));

  bascket.value.forEach(row => {
    worksheet.addRow(table.value.columns.map(col => {
      return typeof col.field === 'function' ? col.field(row) : row[col.field] || '-';
    }));
  });

  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength; // Ajusta el ancho mínimo y máximo
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `Cambio_Precios.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const labelType = (_prices, ipack) => {
  let prices = [..._prices];
  const centro = prices.find(e => e.pivot._type == 4);
  const menudeo = prices.find(e => e.pivot._type == 1);
  if (centro.pivot.price == menudeo.pivot.price) {
    let _prices_ = {
      id: 0,
      alias: "OFERTA",
      name: "Oferta",
      pivot: { price: prices[0].pivot.price },
      used: true,
    };
    console.log('oferta')
    return { type: "off", prices: [_prices_] };

  } else {
    console.log('estandar')
    return {
      type: "std",
      prices: prices,
    }


  }
}


init()
</script>
