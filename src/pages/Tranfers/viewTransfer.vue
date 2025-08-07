<template>
  <q-page padding v-if="traspaso">
    <q-header reveal bordered class="bg-white text-black">
      <q-toolbar class="justify-between">
        <q-btn color="primary" icon="arrow_back" flat @click="$router.push('/transfers')" round />
        <div>{{ traspaso.store.name }} </div>
        <div class="row items-center">
          <div class="col"> {{ traspaso.origin.name }}</div> <q-icon name="arrow_forward" class="col" />
          <div class="col"> {{ traspaso.destiny.name }}</div>
        </div>
        <div>{{ traspaso.created_by }} </div>
        <div>Traspaso <q-icon name="navigate_next" color="primary" /> <span class="text-h6">{{ traspaso.code_fs
        }}</span>
        </div>
      </q-toolbar>
      <q-separator />
      <div class="text-center text-bold">{{ traspaso.notes }}
      </div>
      <q-separator />
      <div class="text-center text-bold row ">
        <div class="col"><q-btn color="primary" icon="publish" label="Importar Excel" flat @click="clickFile" /></div>
        <div class="col"><q-btn color="primary" icon="apps" label="Preventas" flat @click="clickFilePreventa" /></div>
        <div class="col"><q-btn color="primary" icon="picture_as_pdf" label="PDF" flat @click="pdfTransfer" /></div>

        <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
        <input type="file" ref="inputFilePreventa" id="inputFilePreventa" @input="readFilePreventa" hidden
          accept=".xlsx,.xls" />
      </div>
    </q-header>

    <q-separator spaced inset vertical dark />


    <q-list bordered>
      <q-item>
        <q-item-section> Producto </q-item-section>
        <q-item-section> Descripcion </q-item-section>
        <q-item-section class="text-center"> Cantidad </q-item-section>
      </q-item>
    </q-list>

    <q-list bordered v-for="(product, index) in products" :key="index">

      <q-item clickable v-ripple @click="viewProduct(product)">
        <q-item-section>{{ product.product }}</q-item-section>
        <q-item-section>{{ product.description }}</q-item-section>
        <q-item-section class="text-center">{{ product.amount }}</q-item-section>
      </q-item>
      <q-separator />
    </q-list>

    <q-dialog v-model="product.state" persistent :position="'bottom'">
      <q-card style="width: 300; max-width: 40vw;">
        <q-card-section>
          <div class="text-center text-h4">{{ product.val.product }}</div>
          <div class="text-center text-h6 text-grey-14">{{ product.val.description }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-center">
            <div class="q-pa-xs">
              <div class="text-bold text-h6">Cantidad:</div>
              <div class="row">
                <q-btn flat color="negative" icon="remove" class="text-h5 col"
                  @click="product.val.amount > 1 ? product.val.amount-- : ''" />
                <div class=" col column q-py-md">
                  <input type="number" min="1" v-model="product.val.amount" class="text-center exo"
                    style=" width: 100px; font-size: 3em; margin: auto auto; border: none;" />
                </div>
                <q-btn flat color="positive" icon="add" class="text-h5 col" @click="product.val.amount++" />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center" v-if="!existProduct">
          <q-btn flat label="Cancelar" color="negative" @click="reset" />
          <q-btn flat label="Agregar" color="positive" @click="addProduct" />
        </q-card-actions>
        <q-card-actions align="center" v-else>
          <q-btn flat icon="close" color="red-10" @click="reset" />
          <q-btn flat label="Eliminar" color="negative" @click="deleteProduct" />
          <q-btn flat label="Editar" color="blue-10" @click="editProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="excelImport.state">
      <q-card>
        <q-card-section class="row text-bold text-overline text-center">
          Resultados de la importacion :O
        </q-card-section>
        <q-card-section>
          <q-list bordered>
            <q-item>
              <q-item-section>Productos Encontrados</q-item-section>
              <q-item-section>{{ excelImport.wndGetRows }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Productos Sin Datos</q-item-section>
              <q-item-section>{{ excelImport.wndNotExist }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="orderImport.state">
      <q-card>
        <q-card-section class="row text-bold text-overline text-center">
          Resultados de la importacion :O
        </q-card-section>
        <q-card-section>
          <q-list bordered>
            <q-item>
              <q-item-section>Pedidos Encontrados</q-item-section>
              <q-item-section>{{ orderImport.encontrados }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Pedidos Sin Encontrar</q-item-section>
              <q-item-section>{{ orderImport.faltantes }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Productos Encontrados</q-item-section>
              <q-item-section>{{ orderImport.products }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-footer reveal elevated bordered class="bg-white">
      <q-card class="q-mb-md" flat bordered dense>
        <q-card-section class="row">
          <ProductAutocomplete class="col" :checkState="false" @input="add" @agregar="agregar" />
          <q-btn v-if="products.length > 0" color="primary" flat icon="east" @click="endTransfer" round />
        </q-card-section>
      </q-card>
    </q-footer>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import dayjs from 'dayjs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import tranApi from "src/API/transferApi";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import dbproduct from 'src/API/Product'
import { useRoute, useRouter } from "vue-router";
const $router = useRouter();
const $route = useRoute();


const VDB = useVDBStore();
const $q = useQuasar();
const traspaso = ref(null);
const product = ref({
  val: null,
  state: false
})
const products = ref([]);

const excelImport = ref({
  state: false,
  wndGetRows: [],
  wndNoDataFound: [],
  wndTotal: [],
  wndGetAdded: [],
  _supply_by: 0,
  message: "",
  messageRepeat: "",
  wndNotExist: [],
  repeat: []
})

const orderImport = ref({
  state: false,
  encontrados: [],
  faltantes: [],
  products: null
})

const inputFile = ref(null)
const inputFilePreventa = ref(null)



const existProduct = computed(() => products.value?.filter(e => e.product == product.value.val?.product).length > 0)

const init = async () => {
  const transfer = $route.params.oid;
  const resp = await tranApi.getTransfer(transfer)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    if (VDB.session.rol == 'aud' || VDB.session.rol == 'root' || VDB.session.rol == 'audc') {
      traspaso.value = resp
      products.value = resp.bodie
      console.log(traspaso.value)
    } else if ((VDB.session.rol == 'aux' || VDB.session.rol == 'gen') && (resp.origin.id !== 4 && resp.destiny.id !== 4)) {
      traspaso.value = resp
      products.value = resp.bodie
      console.log(traspaso.value)
    } else if (VDB.session.rol == 'alm' || VDB.session.rol == 'vld' && ([5, 6].includes(resp.destiny.id) || [5, 6].includes(resp.origin.id))) {
      traspaso.value = resp
      products.value = resp.bodie
      console.log(traspaso.value)
    } else {
      $router.push(`/transfers`);
      $q.notify({
        message: 'No tienes acceso a este traspaso',
        type: 'negative',
        position: 'center'
      });
    }

  }
}

const add = (opt) => {
  console.log(opt)
}

const agregar = (ops) => {
  let inx = products.value.findIndex(e => e.product == ops.code)
  console.log(inx);
  if (inx >= 0) {
    $q.notify({ message: 'El Producto ya esta agregado', type: 'negative', position: 'center' })
  } else {
    product.value.val = {
      "product": ops.code,
      "description": ops.description,
      "amount": 1
    };
    product.value.state = true
    console.log(ops);

  }
}

const addProduct = async () => {
  $q.loading.show({ message: 'Insertando Producto' })
  console.log(product.value.val)
  product.value.val._transfer = $route.params.oid
  const resp = await tranApi.addProduct(product.value.val)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    products.value.push(product.value.val);
    product.value = {
      val: null,
      state: false
    }
    $q.loading.hide()
  }
}

const editProduct = async () => {
  $q.loading.show({ message: 'Editando Producto' })
  console.log(product.value.val)
  product.value.val._transfer = $route.params.oid
  const resp = await tranApi.editProduct(product.value.val)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    let inx = products.value.findIndex(e => e.product == product.value.val.product)
    if (inx >= 0) {
      products.value[inx].amount = product.value.val.amount
      $q.notify({ type: 'positive', position: 'center' })
      product.value = {
        val: null,
        state: false
      }
      $q.loading.hide()
    }

  }
}
const deleteProduct = async () => {
  $q.loading.show({ message: 'Eliminando Producto' })
  console.log(product.value.val)
  product.value.val._transfer = $route.params.oid
  const resp = await tranApi.removeProduct(product.value.val)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    let inx = products.value.findIndex(e => e.product == product.value.val.product)
    if (inx >= 0) {
      products.value.splice(inx, 1)
      $q.notify({ type: 'positive', position: 'center' })
      product.value = {
        val: null,
        state: false
      }
      $q.loading.hide()
    }

  }
}

const viewProduct = (val) => {
  product.value.state = true
  product.value.val = val
}

const reset = () => {
  product.value = {
    val: null,
    state: false
  }
}

const endTransfer = async () => {
  $q.loading.show({ message: 'Terminando Traspaso' })
  let data = {
    user: VDB.session.name,
    traspaso: traspaso.value,
    products: products.value
  }
  const resp = await tranApi.endTransfer(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.notify({ message: resp, position: 'center', type: 'positive' })
    console.log(resp)
    $q.loading.hide();

    $router.push('/transfers')

  }
}


const clickFile = () => {
  inputFile.value.click()
}

const readFile = async () => {

  let inputFile = document.getElementById("inputFile").files[0];
  // console.log(inputFile)
  let workbook = new ExcelJS.Workbook();
  let codesToSend = [];
  let diference = [];
  let convert = 0;
  let datos = {};


  workbook.xlsx.load(inputFile).then((data) => {
    let worksheet = workbook.worksheets[0];
    // console.log(worksheet.getColumn("A"))
    // console.log(worksheet.getColumn("B"))
    let codigos = worksheet.getColumn("A");
    let cantidades = worksheet.getColumn("B");



    codigos.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      let codigo = cell.value;
      let cantidadCell = worksheet.getCell(`B${rowNumber}`);
      let cantidad = parseFloat(cantidadCell.value);
      if (datos[codigo]) {
        datos[codigo] += cantidad;
      } else {
        datos[codigo] = cantidad;
      }
    });
    let Diferencia = Object.keys(datos).map(codigo => ({
      codigo: codigo,
      cantidad: datos[codigo]
    }));
    Diferencia.forEach(e => codesToSend.push(e.codigo))
    // console.log(Diferencia)
    // console.log(codesToSend.length)
    if (codesToSend.length) {
      let data = { codes: codesToSend, _workpoint: VDB.session.store.id_viz };
      // console.log(data)
      // wndImportJSON.wndTotal  = codesToSend.length;
      $q.loading.show({ message: "Procesando archivo, espera.." });

      dbproduct.getMassive(data)
        .then((success) => {

          let resp = success.data;
          resp.fails.notFound.map(e => excelImport.value.wndNotExist.push(e))
          resp.fails.repeat.map(e => excelImport.value.repeat.push(e))
          let products = success.data.products
          excelImport.value.wndGetRows = products.length;
          excelImport.value.state = !excelImport.value.state;
          console.log(products)
          let dat = products.map(product => {
            let cantidad = Diferencia.find(item => item.codigo === product.code);
            return {
              product: product.code,
              description: product.description,
              amount: cantidad ? cantidad.cantidad : 0,
              "_transfer": $route.params.oid
            };
          });
          addingMasive(dat)
          $q.loading.hide();
        })
        .catch((fail) => {
          console.log(fail);
          $q.notify({
            message: "Hay un problema con obtener los datos :/.",
            icon: "fas fa-grin-beam-sweat",
            color: "negative",
          });
        });
    } else {
      $q.notify({
        message: "Vaya!! Al parecer este archivo esta vacio.",
        icon: "fas fa-grin-beam-sweat",
        color: "negative",
      });
    }

  });
}

const clickFilePreventa = () => {
  inputFilePreventa.value.click()
}


const readFilePreventa = async () => {

  let inputFile = document.getElementById("inputFilePreventa").files[0];
  // console.log(inputFile)
  let workbook = new ExcelJS.Workbook();
  let codesToSend = [];


  workbook.xlsx.load(inputFile).then(async (data) => {
    let worksheet = workbook.worksheets[0];
    let codigos = worksheet.getColumn("A");


    $q.loading.show({ message: "Procesando archivo, espera.." });
    codigos.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      cell.value ? codesToSend.push(cell.value) : null
    });
    if (codesToSend.length) {
      let data = { codes: codesToSend, _workpoint: VDB.session.store.id_viz };
      console.log(data)
      const resp = await tranApi.transferPreventa(data);
      if (resp.fail) {
        alert(resp)
      } else {
        orderImport.value.encontrados = resp.Encontrados
        orderImport.value.faltantes = resp.Faltantes
        orderImport.value.products = resp.products.length
        orderImport.value.state = !orderImport.value.state
        resp.products.forEach(e => e._transfer = $route.params.oid)
        let dat = resp.products
        console.log(dat);
        addingMasive(dat)
        $q.loading.hide()

      }


    } else {
      $q.notify({
        message: "Vaya!! Al parecer este archivo esta vacio.",
        icon: "fas fa-grin-beam-sweat",
        color: "negative",
      });
    }

  });
}



const addingMasive = async (prd) => {
  const resp = await tranApi.addProductMasive(prd)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    prd.map(e => { products.value.push(e); })
    $q.loading.hide()
  }
}

const pdfTransfer = async () => {
  // console.log(data.folio);
  const transfer = $route.params.oid;
  const resp = await tranApi.getTransfer(transfer);
  console.log(resp);
  if (!resp.error) {
    const doc = new jsPDF({format:'letter'});
    let chunks = [];
    const arreglo = resp.bodie.map(producto => Object.values([producto.product,producto.description,producto.amount]));
    console.log(typeof resp.code_fs);
    const paginas = Math.ceil(arreglo.length / 20);
    for (var i = 0; i < arreglo.length; i += 20) {

      // console.log(arreglo[i])

      chunks.push(arreglo.slice(i, i + 20));
    }
    console.log(chunks);
    for (let i = 0; i < 2; i++) {
      let copias = 'ORIGINAL'
      if (i > 0) {
        copias = 'COPIA'
        doc.addPage();
      }
      chunks.forEach(function (chunk, index) {
        if (index > 0) {
          doc.addPage();
        }

        let sumaBullfa = 0;
        let totcan = 0;
        for (let i = 0; i < chunk.length; i++) {
          chunk[i][0] = chunk[i][0];
          chunk[i][1] = chunk[i][1];
          chunk[i][2] = parseFloat(chunk[i][2]);
          // chunk[i][4] = chunk[i][4].replace(/\n/g, " ");
          // sumaBullfa += parseFloat(chunk[i][1]); // Sumar al total la propiedad 'BULLFA' convertida a número
          totcan += parseFloat(chunk[i][2]);
        }


        for (let i = 0; i < chunk.length; i++) {
          // Sumar al total la propiedad 'BULLFA' convertida a número
        }

        doc.setFontSize(25)
        doc.setFont('helvetica', 'bold')
        doc.text('GRUPO VIZCARRA', 105, 10, "center");
        doc.setFontSize(8)
        // doc.text('NUMERO PEDIDO:', 10, 10, 'left')
        // console.log(pedido);
        // doc.text(`P-${pedido.toString()}`, 10, 15, 'left');
        doc.setFontSize(12)
        doc.text(copias, 185, 10, 'left');
        // doc.text(dat.data.heades.DENEMP, 10, 25, 'left')
        doc.text('LLUVIA LIGTH SA DE CV', 10, 25, 'left')
        doc.setFontSize(8)
        doc.text(resp.created_by, 10, 30, 'left')
        doc.text(resp.notes, 10, 35, 'left')
        doc.text('DELEG, CUAUHTEMOC CDMX', 10, 40, 'left')
        doc.text('DOCUMENTO', 10, 55, 'left')
        doc.text('TRASPASO', 10, 60, 'left')
        doc.text('NUMERO', 32, 55, 'left')
        doc.text(String(resp.code_fs), 32, 60, 'left')
        doc.text('PAGINA', 54, 55, 'left')
        doc.text(`${index + 1} de ${paginas}`, 54, 60, 'left')
        doc.text('FECHA', 76, 55, 'left')
        const fecha = dayjs(resp.created_at).format("YYYY-MM-DD")
        doc.text(fecha, 76, 60, 'left')
        autoTable(doc, {
          startX: 10,
          startY: 65,
          theme: 'plain',
          styles: { cellPadding: 1, fontSize: 12, halign: 'center' },
          head: [['Almacen de Origen', 'Almacen de Destino']],
          body: [
            [ `(${resp.origin.alias}) ${resp.origin.name}`, `(${resp.destiny.alias}) ${resp.destiny.name}`],
          ],
        })

        autoTable(doc, {
          startX: 10,
          startY: 80,
          theme: 'striped',
          styles: { cellPadding: .6, fontSize: 8, halign: 'center' },
          head: [['ARTICULO', 'DESCRIPCION', 'CANTIDAD']],
          body: chunk,
          columnStyles: {
            0: { fontStyle: 'bold', halign: 'left' },
            1: { fontStyle: 'bold', halign: 'left' },
            4: { halign: 'center' },
          },

        })

        doc.setFontSize(11)
        // doc.text('TOTAL CAJAS:', 100, 200, 'left')
        // doc.text(sumaBullfa.toString(), 130, 200, 'left')
        doc.text('TOTAL UNIDDADES:', 150, 200, 'left')
        doc.text(totcan.toString(), 190, 200, 'left')
        doc.text('Firma Almacen Origen',12, 224)
        doc.text('Firma Almacen Destino',82, 224)
        doc.text('Firma Chofer',152, 224)


        doc.rect(10, 220, 60, 40);
        doc.rect(80, 220, 60, 40);
        doc.rect(150, 220, 60, 40);
        // doc.addImage(imgData, 'PNG', 95, 25, 20, 20);
      })
    }
    doc.save(`Traspaso${resp.code_fs}`)

  } else {
    console.error('No se logro imprimir la factura');
  }

}



init()
</script>
