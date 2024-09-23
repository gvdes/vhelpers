<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <q-btn flat @click="drawer.state = !drawer.state" round dense icon="menu" />
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Creacion de Etiquetas</span>
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <q-card class="my-card">

          <ProductAutocomplete :checkState="false" @input="add" with_prices @agregar="agregar" with_locations />
        </q-card>

        <q-separator spaced inset vertical dark />

        <q-drawer v-model="drawer.state" show-if-above :width="200" :breakpoint="500" bordered
          :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
          <div>
            <q-separator spaced inset vertical dark />
            <div class="text-center text-bold">Precios</div>
            <div class="q-pa-md">
              <q-option-group :options="prices.opts" type="checkbox" v-model="prices.val" />
            </div>
          </div>
          <q-separator spaced inset vertical dark />
          <div class="text-center text-bold">
            Opciones
          </div>
          <div class="q-pa-md">
            <q-btn-group spread>
              <q-btn color="primary" icon="upload_file" flat title="Subir Etiquetas" @click="clickFile" />
              <template v-if="products.length">
                <q-btn color="primary" icon="delete" flat title="Eliminar Etiquetas"
                  @click="deltb.state = !deltb.state" />
                <q-btn color="primary" icon="download" flat title="Descargar Etquetas"
                  @click="mosPDF.state = !mosPDF.state" />
              </template>

            </q-btn-group>
            <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
          </div>
        </q-drawer>

        <q-table :rows="products" row-key="name" grid :filter="table.filter" :pagination="table.pagination"
          no-data-label="''">
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card class="my-card">
                <q-card-section>
                  <q-chip size="sm" class="
                          fixed-right
                          absolute-right
                          text-bold text-white text-uppercase
                        " :color="colorLabel(props.row.type)">{{ props.row.type }}</q-chip>
                  <div class="text-h5 text-bold text-center">{{ props.row.code }}</div>
                  <div class="text-subtitle2 text-bold text-center">{{ props.row.name }}</div>
                  <div class="text-subtitle2 text-bold text-center">{{ props.row.label }}</div>
                  <div class="text-subtitle2 text-bold text-center">Longitud: {{ props.row.large }}</div>
                  <div class="text-subtitle2 text-bold text-center">Ubicacion: {{ props.row.locations?.map(location =>
                    location.path).join('/') }}</div>

                  <q-separator spaced inset vertical dark />
                  <div class="row">
                    <div class="col items-start"
                      v-for="(price, index) in props.row.usedPrices.filter(item => prices.val.includes(item.id))"
                      :key="index">
                      <div class="text-center">{{ price.alias }}</div>
                      <div class="text-center">{{ price.pivot.price }}</div>
                    </div>
                  </div>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn flat icon="delete" color="negative" @click="delrow(props.row)" />

                  <q-btn flat icon="add" @click="props.row._copies++" />
                  <div>
                    <div class="text-caption text--2">copias</div>
                    <div class="text-bold q-pb-sm text-center">
                      {{ props.row._copies }}
                    </div>
                  </div>
                  <q-btn flat icon="remove" @click=" props.row._copies <= 1 ? '' : props.row._copies--" />
                </q-card-actions>
              </q-card>
            </div>
          </template>

          <template v-slot:bottom="scope">
            <q-page-sticky position="bottom" class="full-width" :offset="[0, 18]">
              <div class="row q-pt-xs">
                <q-btn-group rounded flat color="primary">
                  <q-btn v-if="scope.pagesNumber > 2" icon="first_page" round dense flat :disable="scope.isFirstPage"
                    @click="scope.firstPage" class="q-px-sm" />
                  <q-btn icon="chevron_left" round dense flat :disable="scope.isFirstPage" @click="scope.prevPage"
                    class="q-px-sm" />
                  <q-btn flat disable no-caps>{{ scope.pagination.page }} /
                    {{ scope.pagesNumber }}</q-btn>
                  <q-btn icon="chevron_right" round dense flat :disable="scope.isLastPage" @click="scope.nextPage"
                    class="q-px-sm" />
                  <q-btn v-if="scope.pagesNumber > 2" icon="last_page" round dense flat @click="scope.lastPage"
                    class="q-px-sm" />
                </q-btn-group>
              </div>
            </q-page-sticky>
          </template>
          <template v-slot:no-data>
            <!-- <div class="text-center">
              <q-avatar size="300px" font-size="200px" color="white"  text-color="primary" icon="sentiment_dissatisfied" />
            </div> -->
          </template>

        </q-table>

        <q-dialog v-model="deltb.state" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="white" text-color="negative" />
              <div class="q-ml-sm">Se eliminaran todos los articulos de la lista </div>

            </q-card-section>
            <q-card-section>
              <div class="q-ml-sm">Deseas Continuar?</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="No" color="positive" v-close-popup />
              <q-btn flat label="Si" color="negative" @click="delTable" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="mosPDF.state" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="picture_as_pdf" color="white" text-color="red" />
              <div class="q-ml-sm">En que Formato deseas las etiquetas?</div>
            </q-card-section>
            <q-card-section>
              <q-select v-model="mosPDF.val" :options="mosPDF.opts" label="Etiquetas" filled />
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="negative" v-close-popup />
              <q-btn flat label="Generar" color="positive" @click="pdf" :disable="mosPDF.val == null" />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="wndImportJSON.state">

          <q-card class="my-card " style="width: 70%;">
            <q-card-section class=" items-center">
              <div class="text-center text-bold">Repetidos</div>
              <div class="text-negative">{{ wndImportJSON.messageRepeat }}</div>
            </q-card-section>
            <q-card-section>
              <div class="text-center">Productos Sin Precio</div>
              <q-list>
                <q-item v-for="(list, index) in wndImportJSON.wndNoDataFound" :key="index">
                  <q-item-section>
                    <q-item-label overline>{{ list.code }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>{{ list.description }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-section>
              <div class="text-center">Productos Sin Existencia</div>
              <q-list>
                <q-item v-for="(list, index) in wndImportJSON.wndNotExist" :key="index">
                  <q-item-section>
                    <q-item-label overline>{{ list }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
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
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import dbproduct from 'src/API/Product'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import { assist } from "src/boot/axios";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';

const VDB = useVDBStore();
const $q = useQuasar();

const products = ref([])



const table = ref({
  filter: '',
  pagination: { rowsPerPage: 9 }
})
const deltb = ref({
  state: false
})
const mosPDF = ref({
  state: false,
  val: null,
  opts: [
    { id: 1, label: 'Navidad Extra Grande' },
    { id: 2, label: 'Navidad Grande' },
    { id: 3, label: 'Navidad Mediano' },
    { id: 4, label: 'Navidad Pequeno' },
    { id: 5, label: 'Juguete Niño' },
    { id: 6, label: 'Juguete Niña' },

  ]
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

const inputFile = ref(null)

const wndImportJSON = ref({
  state: false,
  wndGetRows: [],
  wndNoDataFound: [],
  wndTotal: [],
  wndGetAdded: [],
  _supply_by: 0,
  message: "",
  messageRepeat: "",
  wndNotExist: [],
})



const checkPrices = (data) => {
  let notFound = [];
  let add = [];
  let resp = new Object();
  data.products.map((item) => {
    return getPrices(item.prices) ? notFound.push(item) : add.push(item);
  });
  console.log(data);
  resp.notFound = notFound;
  resp.add = add;
  return resp;

}
const getPrices = (prices) => {
  let flag = true;
  prices.map((item, id) => {
    flag = item.pivot.price == 0 ? true : false;
  });
  return flag;

}

const add = (opt) => {
  console.log(opt)
}
const drawer = ref({
  state: false
})

const agregar = (ops) => {
  let inx = products.value.findIndex(e => e.id == ops.id)
  console.log(inx);
  if (inx >= 0) {
    $q.notify({ message: 'El Producto ya esta agregado', type: 'negative', position: 'center' })
  } else {
    let _labelType = labelType(ops.prices, ops.pieces);
    ops._copies = 1;
    ops.type = _labelType.type;
    ops.usedPrices = _labelType.prices;
    ops._copies = 1;
    products.value.push(ops)
    console.log(ops)
  }
}

const delrow = (row) => {
  let inx = products.value.findIndex(e => e.id == row.id)
  products.value.splice(inx, 1)
}

const delTable = () => {
  products.value = []
  deltb.value.state = false
}


const clickFile = () => {
  inputFile.value.click()
}

const readFile = async () => {
  let inputFile = document.getElementById("inputFile").files[0];
  let workbook = new ExcelJS.Workbook();
  let codesToSend = [];
  let diference = [];
  let convert = 0;


  workbook.xlsx.load(inputFile).then((data) => {
    // console.log(data)
    let worksheet = workbook.worksheets[0];


    let column = worksheet.getColumn("A");
    column.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      // console.log(cell.value)
      cell.value ? codesToSend.push(cell.value) : null;
    });
    diference = codesToSend.filter((item, pos, self) => {
      return self.indexOf(item) == pos;
    });
    // console.log(codesToSend.length)
    if (codesToSend.length) {
      let data = { codes: codesToSend, _workpoint:VDB.session.store.id_viz };
      console.log(data)
      // wndImportJSON.wndTotal  = codesToSend.length;
      $q.loading.show({ message: "Procesando archivo, espera.." });

      dbproduct.getMassive(data)
        .then((success) => {
          // console.log(success.data)
          let resp = success.data;
          let addeds = 0;
          let _data = checkPrices(resp);
          resp.fails.notFound.map(e => wndImportJSON.value.wndNotExist.push(e))
          wndImportJSON.value.wndGetRows = _data.add.length;
          wndImportJSON.value.state = !wndImportJSON.value.state;
          wndImportJSON.value.wndGetAdded = _data.add;
          wndImportJSON.value.wndNoDataFound = _data.notFound;
          if (wndImportJSON.value.wndNoDataFound.length > 0) {
            let long = wndImportJSON.value.wndNoDataFound.length;
            wndImportJSON.value.message = long <= 1 ? "El producto no contiene precios." : "Los productos no contienen precios."
          }
          _data.add.map((item) => {
            let _labelType = labelType(item.prices, item.pieces);
            item._copies = 1;
            item.type = _labelType.type;
            item.usedPrices = _labelType.prices;
            products.value.push(item);
            // this.labelsPage.unshift(item);
            // this.add(item);
            // this.wndImport.goals.unshift(item);
            addeds++;
          });

          //al menos una etiqueta fue agregada, y no hay errores
          if (
            addeds &&
            !resp.fails.notFound.length &&
            diference.length == codesToSend.length
          ) {
            $q.notify({
              message: `Etiquetas generadas: ${addeds}`,
              color: "positive",
              icon: "done",
              timeout: 1000,
            });
            // this.updateCacheLabels();
          } else {
            convert = codesToSend.length - diference.length;
            wndImportJSON.value.messageRepeat = convert <= 1 ? `${convert} producto se repitio. Favor de validar su documento antes de subirlo.` : `${convert} productos se repitieron. Favor de validar su documento antes de subirlo.`
            // this.updateCacheLabels();
          }

          console.log(wndImportJSON.value)

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

const colorLabel = (type) => {

  switch (type) {
    case "off":
      return "orange-9";
      break;
    case "std":
      return "green-9";
      break;
  }

}


const pdf = () => {
  $q.loading.show({ message:'Generando Etiquetas' })
  if (mosPDF.value.val.id == 1) {
    xtralargeLabel(products.value)
    .then(r => {
      $q.notify({
        message:`Se Descargo las etiquetas Correctamente`,
        type:`positive`,
        position:`center`,
      })
     mosPDF.value.state= false,
     mosPDF.value.val =  null,
      $q.loading.hide()
    })
    .catch(r => {
      alert('Hubo un error al descargar las etiquetas')
    })

  } else if (mosPDF.value.val.id == 2) {
    largeLabel(products.value)
    .then(r => {
      $q.notify({
        message:`Se Descargo las etiquetas Correctamente`,
        type:`positive`,
        position:`center`,
      })
     mosPDF.value.state= false,
     mosPDF.value.val =  null,
      $q.loading.hide()
    })
    .catch(r => {
      alert('Hubo un error al descargar las etiquetas')
    })
  } else if (mosPDF.value.val.id == 3) {
    mediumLabel(products.value)
    .then(r => {
      $q.notify({
        message:`Se Descargo las etiquetas Correctamente`,
        type:`positive`,
        position:`center`,
      })
     mosPDF.value.state= false,
     mosPDF.value.val =  null,
      $q.loading.hide()
    })
    .catch(r => {
      alert('Hubo un error al descargar las etiquetas')
    })
  } else if (mosPDF.value.val.id == 4) {
    smallLabel(products.value)
    .then(r => {
      $q.notify({
        message:`Se Descargo las etiquetas Correctamente`,
        type:`positive`,
        position:`center`,
      })
     mosPDF.value.state= false,
     mosPDF.value.val =  null,
      $q.loading.hide()
    })
    .catch(r => {
      alert('Hubo un error al descargar las etiquetas')
    })
  } else if (mosPDF.value.val.id == 5) {
    toyBoys(products.value)
    .then(r => {
      $q.notify({
        message:`Se Descargo las etiquetas Correctamente`,
        type:`positive`,
        position:`center`,
      })
     mosPDF.value.state= false,
     mosPDF.value.val =  null,
      $q.loading.hide()
    })
    .catch(r => {
      alert('Hubo un error al descargar las etiquetas')
    })
  } else if (mosPDF.value.val.id == 6) {
    toyGirls(products.value)
    .then(r => {
      $q.notify({
        message:`Se Descargo las etiquetas Correctamente`,
        type:`positive`,
        position:`center`,
      })
     mosPDF.value.state= false,
     mosPDF.value.val =  null,
      $q.loading.hide()
    })
    .catch(r => {
      alert('Hubo un error al descargar las etiquetas')
    })
  }
}

const largeLabel = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Navidad/Navidad6(1).png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 100; // Ancho de cada etiqueta
      const labelHeight = 85; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 2; // Número de etiquetas por fila
      const labelsPerColumn = 3; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(30);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 61, y + 77); // se agrega codigo corto

        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 10, y + 25); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 10, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        let ypri = y + 39
        let yprincrement = 7
        product.usedPrices.filter(item => prices.value.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 30, ypri + i * yprincrement + 5);// alias de el precio
            doc.setFontSize(28);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 34, ypri + i * yprincrement + 20);// valor de el precio
          } else {
            doc.setFontSize(22);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 23, ypri + i * yprincrement);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 45, ypri + i * yprincrement);// valor de el precio
          }
        })
        //CONTINUA CODIGO
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 10, y + 12); // codigo de el producto
        doc.text(product.large, x + 18, y + 74); // largo de el producto
        doc.setFont('helvetica', 'normal');
        doc.text(`${product.pieces} PZS`, x + 70, y + 12); // piezas por caja
        doc.setFontSize(6)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 19, y + 77); //ubicacion de exhibicion de el producto
      });
      doc.save(`${VDB.session.credentials.nick} etiquetas ${mosPDF.value.val.label}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const xtralargeLabel = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Navidad/Navidad6(1).png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 205; // Ancho de cada etiqueta
      const labelHeight = 125; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 1; // Número de etiquetas por fila
      const labelsPerColumn = 2; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(70);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 120, y + 112); // se agrega codigo corto

        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 18, y + 31); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 10, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        let ypri = y + 39
        let yprincrement = 12
        product.usedPrices.filter(item => prices.value.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(35);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 60, ypri + i * yprincrement + 10);// alias de el precio
            doc.setFontSize(50);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 64, ypri + i * yprincrement + 35);// valor de el precio
          } else {
            doc.setFontSize(35);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 60, ypri + i * yprincrement + 15);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 93, ypri + i * yprincrement + 15);// valor de el precio
          }
        })
        //CONTINUA CODIGO
        doc.setFontSize(45);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 18, y + 23); // codigo de el producto
        doc.text(product.large, x + 35, y + 112); // largo de el producto
        doc.setFont('helvetica', 'normal');
        doc.text(`${product.pieces} PZS`, x + 185, y + 23,{align:'right'} ); // piezas por caja
        doc.setFontSize(6)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 38, y + 114); //ubicacion de exhibicion de el producto
      });
      doc.save(`${VDB.session.credentials.nick} etiquetas ${mosPDF.value.val.label}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const mediumLabel = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Navidad/Navidad9(1).png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 65; // Ancho de cada etiqueta
      const labelHeight = 85; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 3; // Número de etiquetas por fila
      const labelsPerColumn = 3; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 37, y + 77); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 5, y + 25); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        let ypri = y + 40
        let yprincrement = 7
        product.usedPrices.filter(item => prices.value.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 13, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(26);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 13, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 10, ypri + i * yprincrement);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 30, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 25, y + 20); // codigo de el producto
        doc.text(product.large, x + 18, y + 77); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 20, y + 73); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 79); //ubicacion de exhibicion de el producto
      });
      doc.save(`${VDB.session.credentials.nick} etiquetas ${mosPDF.value.val.label}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const smallLabel = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Navidad/NaviSan(1).png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 67; // Ancho de cada etiqueta
      const labelHeight = 63; // Alto de cada etiqueta
      const spacingX = 0; // Espaciado horizontal entre etiquetas
      const spacingY = 3; // Espaciado vertical entre etiquetas
      const labelsPerRow = 3; // Número de etiquetas por fila
      const labelsPerColumn = 4; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        // doc.setTextColor(255, 51, 97);
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }

        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        //   // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        //   // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 23, y + 37); // se agrega codigo corto

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(product.label.substring(0, 25), x + 15, y + 43); // descripcion de el producto
        doc.setFontSize(10);
        let ypri = y + 36
        let yprincrement = 12
        product.usedPrices.filter(item => prices.value.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 23, ypri + i * yprincrement + 12);// alias de el precio
            doc.setFontSize(14);
            doc.text(`$ ${Number(e.pivot.price).toFixed(0)}`, x + 27, ypri + i * yprincrement + 17);// valor de el precio
          } else {
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + i * yprincrement + 10, ypri + 12);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(0)}`, x + i * yprincrement + 10, ypri + 16);// valor de el precio
          }
        })
        //   //CONTINUA CODIGO
        doc.setFontSize(6);
        doc.setFont('helvetica', 'bold');
        doc.text(`(${product.code})`, x + 28, y + 40); // codigo de el producto
        doc.text(product.large, x + 40, y + 55); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 40, y + 57); // piezas por caja
        //   doc.setFontSize(6)
        //   doc.setFont('helvetica', 'normal');
        //   doc.text(product.locations ?  product.locations.map(location =>location.path).join('/') : '' , x + 19, y + 77); //ubicacion de exhibicion de el producto

      });
      doc.save(`${VDB.session.credentials.nick} etiquetas ${mosPDF.value.val.label}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const toyBoys = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Juguete/Ninio.png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 65; // Ancho de cada etiqueta
      const labelHeight = 85; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 3; // Número de etiquetas por fila
      const labelsPerColumn = 3; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 15, y + 10); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 3, y + 25); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        let ypri = y + 40
        let yprincrement = 7
        product.usedPrices.filter(item => prices.value.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 5, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(20);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 5, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x +2, ypri + i * yprincrement);// alias de el precio
            doc.text(`$${Number(e.pivot.price).toFixed(0)}`, x + 19, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 45, y + 40); // codigo de el producto
        doc.text(product.large, x + 45, y + 52); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 45, y + 46); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 84); //ubicacion de exhibicion de el producto
      });
      doc.save(`${VDB.session.credentials.nick} etiquetas ${mosPDF.value.val.label}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const toyGirls = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Juguete/Ninia.png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 65; // Ancho de cada etiqueta
      const labelHeight = 85; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 3; // Número de etiquetas por fila
      const labelsPerColumn = 3; // Número de etiquetas por columna
      const totalLabelsPerPage = labelsPerRow * labelsPerColumn;
      expandedProducts.forEach((product, index) => {
        const currentPageIndex = Math.floor(index / totalLabelsPerPage); // Página actual
        const indexInPage = index % totalLabelsPerPage; // Índice dentro de la página
        const row = Math.floor(indexInPage / labelsPerRow); // Calcula la fila
        const col = indexInPage % labelsPerRow; // Calcula la columna
        const x = marginX + col * (labelWidth + spacingX); // Calcula la posición X
        const y = marginY + row * (labelHeight + spacingY); // Calcula la posición Y
        // Si el índice es un múltiplo del totalLabelsPerPage, agrega una nueva página
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 15, y + 20); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 5, y + 25); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        let ypri = y + 40
        let yprincrement = 7
        product.usedPrices.filter(item => prices.value.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 15, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(20);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 15, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x +15, ypri + i * yprincrement);// alias de el precio
            doc.text(`$${Number(e.pivot.price).toFixed(0)}`, x + 32, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 62, y + 70, {align:'right'}); // codigo de el producto
        doc.setFont('helvetica', 'normal');
        doc.text(product.large, x + 15, y + 65); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 15, y + 70); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 84); //ubicacion de exhibicion de el producto
      });
      doc.save(`${VDB.session.credentials.nick} etiquetas ${mosPDF.value.val.label}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

const barcode = (text) => {
  const qrData = text;
  const qrOptions = {
    margin: 0,
    width: 1,
    height: 1
  }
  const canvas = document.createElement('canvas');
  QRCode.toCanvas(canvas, qrData, qrOptions);
  return canvas.toDataURL("image/png");
}

</script>
