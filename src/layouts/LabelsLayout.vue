<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />

    </q-header>

    <q-page-container>
      <q-page padding>
        <div class="flex jutify-between row ">
          <div class="col">Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Creacion de
              Etiquetas</span>
          </div>
          <q-btn class=" flex justify-end" flat @click="drawer.state = !drawer.state" round dense icon="menu" />
        </div>
        <q-card class="my-card">
          <ProductAutocomplete :checkState="false" @input="add" with_prices @agregar="agregar" with_locations withHistoric />
        </q-card>

        <q-separator spaced inset vertical dark />

        <q-drawer v-model="drawer.state" :width="200" :breakpoint="500" bordered
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
                  <div class="text-subtitle2 text-bold text-center">Ubicacion: {{props.row.locations?.map(location =>
                    location.path).join('/')}}</div>

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
import { computed, ref } from 'vue';
import { assist } from "src/boot/axios";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import labels from 'src/Pdf/labels/labels.js'

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
    { id: 5, label: 'Navidad Vertical' },
    { id: 6, label: 'Juguete Niño' },
    { id: 7, label: 'Juguete Niña' },
    { id: 8, label: 'Juguete Extra Niña' },
    { id: 9, label: 'Juguete Extra Niño' },
    { id: 10, label: 'Juguete Horizontal Niño' },
    { id: 11, label: 'Juguete Horizontal Niña' },
    { id: 12, label: 'Rectangular 9 x 2' },
    { id: 15, label: 'Horizontal 9 x 2' },
    { id: 13, label: 'Exhibicion Nino Mochila' },
    { id: 14, label: 'Exhibicion Nina Mochila' },
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
  console.log(ops);
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
      let data = { codes: codesToSend, _workpoint: VDB.session.store.id_viz };
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
  // console.log(products.value);
  $q.loading.show({ message: 'Generando Etiquetas' })
  if (mosPDF.value.val.id == 1) {
    labels.xtralargeLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })

  } else if (mosPDF.value.val.id == 2) {
    labels.largeLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 3) {
    labels.mediumLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 4) {
    labels.smallLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 5) {
    labels.verticalLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 6) {
    labels.toyBoys(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 7) {
    labels.toyGirls(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 8) {
    labels.xlargenina(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 9) {
    labels.xlargenino(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 10) {
    labels.Hlargenino(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 11) {
    labels.Hlargenina(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 12) {
    labels.VerticalLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 13) {
    labels.xlargeExhnino(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 14) {
    labels.xlargeExhnina(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 15) {
    labels.HorizontalLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label,prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })
  }
}
</script>
