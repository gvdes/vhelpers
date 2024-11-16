<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Resurtido</span>
        </div>
        <!-- <q-btn color="primary" icon="add" @click="newRequistion.status = !newRequistion.status" /> -->
      </q-toolbar>
    </q-header>

    <q-dialog v-model="printers.state">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">Impresora</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="print" class="q-gutter-md">
            <q-select dense option-label="name" v-model="printers.val" :options="printers.body" label="Impresora" filled
              autofocus style="width: 200px" />
            <div>
              <q-btn label="Enviar" type="submit" color="primary" style="width: 200px"
                :disable="printers.val === null" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>


    <q-page-container>
      <q-page padding>
        <div class="row">
          <q-select class="col" v-model="locations.val" :options="locations.opts" label="Ubicacion" option-label="name"
            filled multiple use-chips @blur="reportLocations" :disable="families.val?.length > 0" v-if=" VDB.session.store.id_viz == 4" />
          <q-separator spaced inset vertical dark />
          <q-select class="col" v-model="families.val" :options="families.opts" label="Familia" option-label="name"
            filled multiple use-chips @blur="report" :disable="locations.val?.length > 0" />
          <q-separator spaced inset vertical dark />
          <q-select class="col" v-model="categories.val" :options="categories.opts" label="Categoria" filled
            :disable="!families.val" multiple use-chips />
        </div>

        <q-separator spaced inset vertical dark />

        <q-table :rows="bascket" :columns="table.columns" separator="cell" :filter="table.filter">
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <q-btn color="primary" icon-right="send" flat @click="newNotes.state = !newNotes.state"
              :disable="suggested.length == 0" />
            <q-btn color="primary" icon="print" flat @click="impre" :disable="suggested.length == 0" />
            <q-btn color="primary" icon="download" flat @click="download" :disable="suggested.length == 0" />
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <!-- <q-td key="short_code" :props="props">
                {{ props.row.name }}
              </q-td> -->
              <q-td key="codigo" :props="props">
                {{ props.row.code }}
              </q-td>
              <q-td key="description" :props="props">
                {{ props.row.description }}
              </q-td>
              <!-- <q-td key="Seccion" :props="props">

                {{ props.row.categories.familia.seccion.name }}

              </q-td> -->
              <q-td key="Familia" :props="props">

                {{ props.row.categories.familia.name }}

              </q-td>
              <q-td key="Categoria" :props="props">

                {{ props.row.categories.name }}

              </q-td>
              <q-td key="pieces" :props="props">

                {{ props.row.pieces }}

              </q-td>
              <q-td key="cedis" :props="props">

                {{ props.row.cedis }}

              </q-td>
              <q-td key="texcoco" :props="props">

                {{ props.row.texcoco }}

              </q-td>
              <q-td key="Sucursal" :props="props">

                {{ props.row.sucursal }}

              </q-td>
              <!-- <q-td key="min" :props="props">

                {{ props.row.min }}

              </q-td>
              <q-td key="max" :props="props">

                {{ props.row.max }}

              </q-td> -->
              <!-- <q-td key="Percentge" :props="props">

                {{ props.row.percentage }} %

              </q-td> -->
              <q-td key="action" :props="props">

                <q-btn color="negative" icon="delete" @click="delProduct(props.row)" flat />

              </q-td>
            </q-tr>
          </template>

        </q-table>

        <q-dialog v-model="newNotes.state" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Agrega una nota</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input dense v-model="notes" autofocus @keyup.enter="prompt = false" />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancelar" v-close-popup @click="notes = null" />
              <q-btn flat label="Enviar Pedido" v-close-popup @click="newRequsition" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import dbCompare from 'src/API/resoursesApi'
import { assist } from "src/boot/axios";
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

const newNotes = ref({
  status: false
})

const families = ref({
  val: null,
  opts: []
})
const categories = ref({
  val: [],
  opts: []
})
const products = ref([]);
const notes = ref(null);
const printers = ref({
  state: false,
  val: null,
  body: []
})
const locations = ref({
  val: null,
  opts: []
})

const table = ref({
  columns: [
    // { name: 'short_code', label: 'Codigo Corto', align: 'left', sortable: true, field: row => row.name },
    { name: 'codigo', label: 'Codigo', align: 'left', sortable: true, field: row => row.code },
    { name: 'description', label: 'Descripcion', align: 'left', sortable: true, field: row => row.description },
    // { name: 'Seccion', label: 'Seccion', align: 'left', sortable: true, field: row => row.categories.familia.seccion.name },
    { name: 'Familia', label: 'Familia', align: 'left', sortable: true, field: row => row.categories.familia.name },
    { name: 'Categoria', label: 'Categoria', align: 'left', sortable: true, field: row => row.categories.name },
    { name: 'pieces', label: 'PXC', align: 'center', sortable: true, field: row => row.pieces },
    { name: 'cedis', label: 'Ced CJ', align: 'center', sortable: true, field: row => row.cedis },
    { name: 'texcoco', label: 'Tex CJ', align: 'center', sortable: true, field: row => row.texcoco },
    { name: 'Sucursal', label: `${VDB.session.store.name}`, align: 'center', sortable: true, field: row => row.sucursal },
    // { name: 'min', label: `Minimo`, align: 'center', sortable: true, field: row => row.min },
    // { name: 'max', label: `Maximo`, align: 'center', sortable: true, field: row => row.max },

    // { name: 'Percentge', label: `${VDB.session.store.name} % `, align: 'center', sortable: true, field: row => row.percentage },
    { name: 'action', align: 'center' }
  ],
  filter: ''
}

)


const suggested = computed(() => {
  return products.value.map((product) => {
    let CajasCedis = Math.round(Number(product.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)) / Number(product.pieces));
    let CajasTexcoco = Math.round(Number(product.stocks.filter(e => e.id == 2).map(e => e.pivot.stock)) / Number(product.pieces));
    let Sucursal = Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock));
    let Porcentaje = Math.round(Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock)) * 100 / Number(product.pieces))
    return {
      id: product.id,
      name: product.name,
      code: product.code,
      cost: product.cost,
      description: product.description,
      categories: product.categories,
      pieces: product.pieces,
      min: Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.min)),
      max: Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.max)),
      cedis: CajasCedis,
      texcoco: CajasTexcoco,
      sucursal: Sucursal,
      percentage: Porcentaje
    }

  }).filter(e => {
    if (VDB.session.store.id_viz == 4) {
      return (e.cedis + e.texcoco) > 0 && e.percentage <= 20
    } else {
      return (e.cedis + e.texcoco) > 0 && (e.percentage <= 20 && e.min > 0)
    }

  })
})

const bascket = computed(() => {
  if (categories.value.val.length > 0) {
    return suggested.value.filter(e => categories.value.val.includes(e.categories.name))
  } else {
    return suggested.value
  }
})

const init = async () => {
  let sid = VDB.session.store.id_viz;
  $q.loading.show({ message: 'Obteniendo secciones' })
  const resp = await dbCompare.getSeccion(sid)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    families.value.opts = resp.families
    locations.value.opts = resp.locations ? resp.locations[0].sections : null
    $q.loading.hide();
  }
  console.log(resp)
}

const report = async () => {

  if (families.value.val) {
    $q.loading.show({ message: 'Obteniendo Reporte' })
    console.log(families.value.val.map(e => e.id))
    let sid = VDB.session.store.id_viz
    let data = families.value.val.map(e => e.id)
    const resp = await dbCompare.getProductsCompare(sid, { data })
    if (resp.fail) {
      console.log(resp);
    } else {
      $q.loading.hide()
      console.log(resp);
      products.value = resp
      products.value.forEach(e => {
        const categorias = e.categories.name
        if (categorias && !categories.value.opts.includes(categorias)) {
          categories.value.opts.push(categorias)
        }
      })
    }
  }
}

const reportLocations = async () => {

  if (locations.value.val) {
    console.log(locations.value.val)
    $q.loading.show({ message: 'Obteniendo Reporte' })
    console.log(locations.value.val.map(e => e.id))
    let sid = VDB.session.store.id_viz
    let data = locations.value.val.map(e => e.id)
    const resp = await dbCompare.getProductsCompareLocation(sid, { data })
    console.log(resp)
    if (resp.fail) {
      console.log(resp);
    } else {
      $q.loading.hide()
      console.log(resp);
      products.value = resp
      products.value.forEach(e => {
        const categorias = e.categories.name
        if (categorias && !categories.value.opts.includes(categorias)) {
          categories.value.opts.push(categorias)
        }
      })
    }
  }
}

const newRequsition = async () => {
  $q.loading.show({ message: 'Creando Pedido' })
  let dat = {
    workpoint_from: VDB.session.store.id_viz,
    workpoint_to: 1,
    products: bascket.value,
    notes: notes.value,
    id_userviz: VDB.session.id,
    type: 2
  }
  console.log(dat)
  const resp = await dbCompare.create(dat);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    $q.notify({ message: `Se creo el pedido ${resp.order.id}`, type: 'positive', position: 'center' })
    products.value = []
    notes.value = []
    families.value.val = null
    locations.value.val = null
    categories.value.val = []
    $q.loading.hide()
  }
}

const delProduct = (product) => {
  console.log(product)
  let inx = products.value.findIndex(e => e.id === product.id);
  console.log(inx)
  if (inx >= 0) {
    products.value.splice(inx, 1);
  }
}

const print = async () => {
  console.log('aqui imprimo');
  let dat = {
    products: bascket.value,
    from: VDB.session.store,
    ip_address: printers.value.val.ip_address
  }
  const resp = await dbCompare.preview(dat);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.notify({ message: 'Impresion Correcta', type: 'positive', position: 'center' })
    printers.value.val = null,
      printers.value.state = false
  }
}


const download = async () => {
  const workbook = new ExcelJS.Workbook();


  const worksheet = workbook.addWorksheet(`Resurtido`);
  console.log()
  worksheet.addTable({
    name: 'Resurtido',
    ref: 'A1',
    headerRow: true,
    totalsRow: false,
    style: {
      // theme: 'TableStyleBlue2',
      showRowStripes: true,
    },
    columns: [
      { name: 'Codigo', filterButton: true },
      { name: 'Descripcion', filterButton: true },
      { name: 'Seccion', filterButton: true },
      { name: 'Familia', filterButton: true },
      { name: 'Categoria', filterButton: true },
      { name: 'PXC', filterButton: true },
      { name: 'Cedis', filterButton: true },
      { name: 'Texcoco', filterButton: true },
      { name: 'Sucursal', filterButton: true },
      // { name: 'MIN', filterButton: true },
      // { name: 'MAX', filterButton: true },
      { name: 'Porcentaje', filterButton: true },
    ],
    rows: bascket.value.map(e => { return [e.code, e.description, e.categories.familia.seccion.name, e.categories.familia.name, e.categories.name, e.pieces, e.cedis, e.texcoco, e.sucursal, e.percentage] }),
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



  const downloadExcel = async () => {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `Resurtido.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  downloadExcel();
}

const impre = async () => {
  let idstore = VDB.session.store.id;
  console.log(idstore)
  // console.log(host);
  // let impr = `http://${host}/access/public/modify/getPrinter`;
  try {
    let resp = await assist.get(`/cashier/getPrinters/${idstore}`)
    if (resp.status == 200) {
      printers.value.body = resp.data
      console.log(resp)
      printers.value.state = true
    }

  } catch (err) {
    console.log(err);
    $q.notify({
      message: 'No se pudiron obtener las impresoras',
      type: 'negative',
      position: 'center',
      icon: 'error'
    })
  }
}

init()

</script>
