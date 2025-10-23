-<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />

    </q-header>


    <q-page-container>
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Producto X Seccion</span>
        </div>
        <q-btn color="primary" icon="delete" flat @click="reset" :disable="!secciones.val" />
      </q-toolbar>
      <q-page padding>
        <q-card class="my-card">
          <q-card-section class="row">
            <!-- <q-select class="col" v-model="secciones.val" :options="secciones.opts" label="Seccion" option-label="name"
              multiple filled @update:model-value="familys" dense /> -->
            <q-separator spaced inset vertical dark />
            <q-select class="col" v-model="categories.familias.val" :options="categories.familias.opts" label="Familia"
              filled option-label="name"  @update:model-value="categorys" dense multiple
              use-chips>
              <template v-if="categories.familias.val" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="categories.familias.val = null" class="cursor-pointer" />
              </template>
            </q-select>
            <q-separator spaced inset vertical dark />
            <q-select class="col" v-model="categories.categorias.val" :options="categories.categorias.opts"
              label="Categoria" option-label="name" :disable="!categories.familias.val" filled dense>
              <template v-if="categories.categorias.val" v-slot:append>
                <q-icon name="cancel" @click.stop.prevent="categories.categorias.val = null" class="cursor-pointer" />
              </template>
            </q-select>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <q-select class="col" v-model="supply.val" :options="supply.opts" label="Surtir Por" option-label="name"
                filled />
              <q-item class="col">
                <q-item-section>
                  <q-radio dense v-model="condition.state" val="percentage" label="Porcentaje"
                    @update:model-value="processProduct" />
                  <q-input dense v-model="percentage.val" type="number" filled label="Porcentaje"
                    :disable="condition.state == 'minmax'" />
                </q-item-section>
                <!-- <q-item-label><q-radio v-model="condition.state" val="percentage" label="Porcentaje" /></q-item-label> -->
                <q-item-section caption v-if="condition.state == 'percentage'"></q-item-section>
                <q-item-section></q-item-section>
              </q-item>
              <q-radio dense class="col" v-model="condition.state" val="minmax" label="Minimo y Maximo"
                @update:model-value="processProduct" />
              <q-radio dense class="col" v-model="condition.state" val="query" label="Consultas"
                @update:model-value="processProduct" />
            </div>
          </q-card-section>
          <q-card-section>
            <q-btn color="primary" icon-right="send" flat @click="newNotes.state = !newNotes.state"
              :disable="bascket.length == 0" v-if="condition.state !== 'query'" />
            <q-btn color="primary" icon="print" flat @click="impre" :disable="bascket.length == 0" />
            <q-btn color="primary" icon-right="archive" flat @click="exportTable" :disable="bascket.length <= 0" />
          </q-card-section>
          <q-card-section>
            <q-table v-if="bascket" :rows="bascket" :columns="table.columns"
              :pagination="table.pagination" />
            <!-- <q-separator spaced inset vertical dark />
            <q-table title="Pedido Cedis BR"  v-if="bascketBra" :rows="bascketBra" :columns="table.columns"
              :pagination="table.pagination" />
            <q-separator spaced inset vertical dark />
            <q-table title="Pedido Cedis TX"  v-if="bascketTex" :rows="bascketTex" :columns="table.columns"
              :pagination="table.pagination" /> -->
          </q-card-section>

        </q-card>
        <q-separator spaced inset vertical dark />
        <q-dialog v-model="newNotes.state" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <q-radio left-label v-model="pedidos.statue" val="cedis" label="Cedis" />
              <q-radio left-label v-model="pedidos.statue" val="texcoco" label="Texcoco" />
              <q-radio left-label v-model="pedidos.statue" val="brasil" label="Brasil" />
            </q-card-section>
            <q-card-section>
              <div class="text-h6">Agrega una nota</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input dense v-model="notes" autofocus @keyup.enter="prompt = false" />
            </q-card-section>
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancelar" v-close-popup @click="notes = null" />
              <q-btn flat label="Enviar Pedido" v-close-popup @click="newRequi" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="printers.state">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h6 text-center">Impresora</div>
            </q-card-section>
            <q-card-section>
              <q-form @submit="print" class="q-gutter-md">
                <q-select dense option-label="name" v-model="printers.val" :options="printers.body" label="Impresora"
                  filled autofocus style="width: 200px" />
                <div>
                  <q-btn label="Enviar" type="submit" color="primary" style="width: 200px"
                    :disable="printers.val === null" />
                </div>
              </q-form>
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
import dbCompare from 'src/API/productSeason'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import { assist } from "src/boot/axios";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import dbCompareOne from 'src/API/resoursesApi'

const VDB = useVDBStore();
const $q = useQuasar();

const pedidos = ref({
  statue: 'todos'
})

const secciones = ref({
  val: null,
  opts: []
})
const newNotes = ref({
  status: false
})
const notes = ref(null);
const supply = ref({
  val: { id: 3, name: 'Cajas' },
  opts: [
    { id: 1, name: 'Piezas' },
    { id: 3, name: 'Cajas' },
  ]
})
const condition = ref({ state: 'percentage' })
const percentage = ref({
  val: 0
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
const printers = ref({
  state: false,
  val: null,
  body: []
})

const suggested = computed(() => {
  return products.value.map((product) => {
    let CajasCedis = Math.round(Number(product.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)) / Number(product.pieces));
    let CajasTexcoco = Math.round(Number(product.stocks.filter(e => e.id == 2).map(e => e.pivot.stock)) / Number(product.pieces));
    let CajasBrasil = Math.round(Number(product.stocks.filter(e => e.id == 16).map(e => e.pivot.stock)) / Number(product.pieces));
    let Sucursal = Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock + e.pivot.in_transit));
    let SucCaj = Math.round(Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.in_transit)) / Number(product.pieces));
    let Porcentaje = Math.round(Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock)) * 100 / Number(product.pieces))
    return {
      id: product.id,
      name: product.name,
      code: product.code,
      cost: product.cost,
      description: product.description,
      category: product.category,
      pieces: product.pieces,
      min: Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.min)),
      max: Number(product.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.max)),
      stocks: product.stocks,
      cedis: CajasCedis,
      texcoco: CajasTexcoco,
      brasil: CajasBrasil,
      sucursal: Sucursal,
      sucCaj: SucCaj,
      percentage: Porcentaje,
      required: product.required,
      locations: product.locations
    }

  }).filter(e => {
    if (condition.value.state == 'percentage') {
      if (VDB.session.store.id_viz == 1) {
        return (e.texcoco) > 0 && e.percentage <= percentage.value.val
      } else {
        return (e.cedis + e.texcoco) > 0 && e.percentage <= percentage.value.val && e.sucCaj == 0
      }
    } else if (condition.value.state == 'minmax') {
      if (VDB.session.store.id_viz == 1) {
        return (e.texcoco) > 0 && (e.sucursal <= e.min) && (e.min > 0)
      } else {
        return (e.cedis + e.texcoco) > 0 && (e.sucursal <= e.min) && (e.min > 0)
      }
    } else if (condition.value.state == 'query') {
      return e
    }

  })
})

const bascket = computed(() => {
  // if (secciones.value.val && !categories.value.familias.val && !categories.value.categorias.val) {
  //   return suggested.value.filter(e => e.category.familia.seccion.name == secciones.value.val)
  // } else
   if (categories.value.familias.val && !categories.value.categorias.val) {
    return suggested.value.filter(e => categories.value.familias.val.includes(e.category.familia.name))

  } else if (categories.value.familias.val && categories.value.categorias.val) {
    return suggested.value.filter(e => e.category.familia.name == categories.value.familias.val && e.category.name == categories.value.categorias.val)
  }
  else {
    return suggested.value
  }
})

// const surtirEn = (product) => {
//   const piezas = Number(product.pieces) || 1

//   const stock1 = product.stocks
//     .filter(s => s.id === 1)
//     .reduce((sum, s) => sum + s.pivot.stock, 0)

//   const stock2 = product.stocks
//     .filter(s => s.id === 2)
//     .reduce((sum, s) => sum + s.pivot.stock, 0)

//   const stock3 = product.stocks
//     .filter(s => s.id === 21)
//     .reduce((sum, s) => sum + s.pivot.stock, 0)

//   if (stock1 === 0 && stock2 === 0) return 'Cedis'
//   if ((stock1 / piezas) < 1 && (stock2 / piezas) >= 1) return 'Texcoco'
//   return 'Cedis'
// }

const surtirEn = (product) => {
  const piezas = Number(product.pieces) || 1
  const stock1 = product.stocks.filter(s => s.id === 1).reduce((sum, s) => sum + s.pivot.stock, 0)
  const stock2 = product.stocks.filter(s => s.id === 2).reduce((sum, s) => sum + s.pivot.stock, 0)
  const stock3 = product.stocks.filter(s => s.id === 16).reduce((sum, s) => sum + s.pivot.stock, 0)
  if (stock1 >= 0 && stock2 === 0 && stock3 === 0) return 'Cedis'
  if (stock1 >= 0 && stock2 === 0 && stock3 >= 1) return 'Brasil'
  if ((stock1 / piezas) < 1 && (stock2 / piezas) >= 1) return 'Texcoco'
  return 'Cedis'
}

const bascketCed = computed(() => {
  if (!bascket.value) return []
  return bascket.value.filter(product => surtirEn(product) === 'Cedis')
})

const bascketTex = computed(() => {
  if (!bascket.value) return []
  return bascket.value.filter(product => surtirEn(product) === 'Texcoco')
})
const bascketBra = computed(() => {
  if (!bascket.value) return []
  return bascket.value.filter(product => surtirEn(product) === 'Brasil')
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
    { name: 'brasil', label: 'Brasil', align: 'center', field: row => row.stocks.filter(e => e.id == 16).map(e => e.pivot.stock) },
    { name: 'texcoco', label: 'Texcoco', align: 'center', field: row => row.stocks.filter(e => e.id == 2).map(e => e.pivot.stock) },
    { name: 'total', label: 'Total', align: 'center', field: row => Number(row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)) + Number(row.stocks.filter(e => e.id == 2).map(e => e.pivot.stock)) },
    { name: 'totalcj', label: 'Total Cajas', align: 'center', sortable: true, field: row => Math.round((Number(row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)) + Number(row.stocks.filter(e => e.id == 2).map(e => e.pivot.stock))) / Number(row.pieces)) },
    { name: 'Sucursal', label: `${VDB.session.store.name}`, align: 'center', field: row => row.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock) },
    { name: 'min', label: `Minimo`, align: 'center', sortable: true, field: row => row.min },
    { name: 'max', label: `Maximo`, align: 'center', sortable: true, field: row => row.max },
    { name: 'SucursalINTRANSIT', label: `${VDB.session.store.alias} en TRA`, align: 'center', field: row => row.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.in_transit) },
    { name: 'Percentge', label: `${VDB.session.store.name} % `, align: 'center', sortable: true, field: row => row.percentage },
    { name: 'required', label: 'Solicitado CJ', align: 'center', sortable: true, field: row => row.required },
    {
      name: 'cediss', label: `Surtir En`, align: 'center', field: row => surtirEn(row)
    },
    { name: 'action', label: 'Accion', align: 'center' },
  ],
  pagination: {
    rowsPerPage: 5
  }
})

const init = async () => {
  $q.loading.show({ message: 'Obteniendo secciones' })
  let sid = VDB.session.store.id_viz
  const resp = await dbCompare.index(sid)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    products.value = resp.product_season
    products.value.forEach(e => {
      // console.log(i)
      const seccion = e.category.familia.seccion.name
      // console.log(seccion);
      if (seccion && !secciones.value.opts.includes(seccion)) {
        secciones.value.opts.push(seccion)
      }
      const familia = e.category.familia.name

      if (familia && !categories.value.familias.opts.includes(familia)) {
                    console.log(familia);
        categories.value.familias.opts.push(familia)
      }

    })
    $q.loading.hide();
        processProduct()
  }
  console.log(resp)
}

const categorys = () => {
  categories.value.categorias.val = null
  if (categories.value.familias.val) {
    categories.value.categorias.opts = bascket.value.map(e => e.category.name).filter((v, i, s) => s.indexOf(v) === i)
  } else {
    return []
  }
}

const familys = () => {
  categories.value.familias.val = null
  if (secciones.value.val) {
    categories.value.familias.opts = bascket.value.map(e => e.category.familia.name).filter((v, i, s) => s.indexOf(v) === i)
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
  bascket.value.forEach(row => {
    let surtirEn = 'Cedis'
    const piezas = Number(row.pieces) || 1 // para no dividir entre 0
    const stock1 = row.stocks
      .filter(s => s.id === 1)
      .reduce((sum, s) => sum + s.pivot.stock, 0)
    const stock2 = row.stocks
      .filter(s => s.id === 2)
      .reduce((sum, s) => sum + s.pivot.stock, 0)
    const stock3 = row.stocks
      .filter(s => s.id === 16)
      .reduce((sum, s) => sum + s.pivot.stock, 0)

    if (stock1 === 0 && stock2 === 0) {
      surtirEn = 'Cedis'
    }
    if ((stock1 / piezas) < 1 && (stock2 / piezas) >= 1) {
      surtirEn = 'Texcoco'
    }
    if (stock1 >= 0 && stock2 === 0 && stock3 >= 1) surtirEn = 'Brasil'
    worksheet.addRow([
      row.code,
      row.description,
      row.pieces,
      row.category.familia.seccion.name,
      row.category.familia.name,
      row.category.name,
      row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)[0],
      row.stocks.filter(e => e.id == 16).map(e => e.pivot.stock)[0],
      row.stocks.filter(e => e.id == 2).map(e => e.pivot.stock)[0],
      Number(row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)) + Number(row.stocks.filter(e => e.id == 2).map(e => e.pivot.stock)),
      Math.round((Number(row.stocks.filter(e => e.id == 1).map(e => e.pivot.stock)) + Number(row.stocks.filter(e => e.id == 2).map(e => e.pivot.stock))) / Number(row.pieces)),
      row.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock)[0],
      row.min,
      row.max,
      row.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.in_transit)[0],
      row.percentage,
      row.required,
      surtirEn
    ])
  });

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

const processProduct = async () => {
  // console.log(condition.value.state)
  if (products.value.length > 0) {
    if (condition.value.state == 'minmax') {
      if (supply.value.val.id == 3) {
        return products.value.forEach(e => {
          let CajasSucursal = Number(e.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock + e.pivot.in_transit)) / Number(e.pieces);
          let maxCajas = Number(e.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.max)) / Number(e.pieces)
          if ((maxCajas - CajasSucursal) > 0) {
            e.required = Math.round(maxCajas - CajasSucursal);
          } else {
            e.required = 1
          }
        })
      } else {
        return products.value.forEach(e => {
          let piezasSucursal = Math.round(Number(e.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.stock + e.pivot.in_transit)));
          let maxPiezas = Math.round(Number(e.stocks.filter(e => e.id == VDB.session.store.id_viz).map(e => e.pivot.max)))
          if ((maxPiezas - piezasSucursal) >= 1) {
            e.required = Math.round(maxPiezas - piezasSucursal);
          } else {
            e.required = 1
          }
        })
      }
    }
    else {
      return products.value.forEach(e => e.required = 1)
    }
  }
}

const newRequi = () => {
  console.log('holi')
  if (pedidos.value.statue == 'cedis') {
    newRequsition(1, bascket.value)
  } else if (pedidos.value.statue == 'texcoco') {
    newRequsition(2, bascket.value)
  } else if (pedidos.value.statue == 'brasil') {
    newRequsition(16, bascket.value)
    // newRequsition(2, bascketTex.value)
  }
}

const newRequsition = async (cedis, basProd) => {
  $q.loading.show({ message: 'Creando Pedido' })
  let dat = {
    workpoint_from: VDB.session.store.id_viz,
    workpoint_to: cedis,
    products: basProd,
    notes: notes.value,
    id_userviz: VDB.session.credentials.staff.id_va,
    type: 2,
    supply_by: supply.value.val.id
  }
  console.log(dat)
  const resp = await dbCompareOne.create(dat);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    $q.notify({ message: `Se creo el pedido ${resp.order.id}`, type: 'positive', position: 'center' })
    // products.value = []
    // notes.value = []
    // families.value.val = []
    // locations.value.val = []
    // categories.value.val = []
    $q.loading.hide()
  }
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
const print = async () => {
  console.log('aqui imprimo');
  let dat = {
    products: bascket.value,
    from: VDB.session.store,
    ip_address: printers.value.val.ip_address
  }
  const resp = await dbCompareOne.preview(dat);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.notify({ message: 'Impresion Correcta', type: 'positive', position: 'center' })
    printers.value.val = null,
      printers.value.state = false
  }
}
init()

</script>
