<template>
  <q-layout view="hHh Lpr fFf">

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Cambios de precio</span>
        </div>
        <div class="row">
          <q-btn color="primary" icon="event" flat @click="fechas.state = !fechas.state" />
          <q-separator spaced inset vertical dark />
          <q-btn class="col" flat color="primary" icon="download" rounded title="Importar Excel" @click="exportTable" />
          <q-separator spaced inset vertical dark />
          <q-btn class="col" flat color="primary" icon="label" rounded title="Crear Etiquetas"
            @click="mosPDF.state = !mosPDF.state" />
        </div>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <q-page padding>
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
          <q-card>
            <q-card-section>
              <div>
                <q-separator spaced inset vertical dark />
                <div class="text-center text-bold">Precios</div>
                <div class="q-pa-md">
                  <q-option-group :options="prices.opts" type="checkbox" v-model="prices.val" inline />
                </div>
              </div>
            </q-card-section>
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
  state:false,
  date:null
})
const priceColumns = ref([]);
const stocksColumns = ref([
  {
    name: 'stock_exh',
    label: 'EXHIBICION',
    field: row => row.stocks?.find(s => s.pivot)?.pivot?.exh || 0,
    align: 'center'
  },
  {
    name: 'stock_gen',
    label: 'GENERAL',
    field: row => row.stocks?.find(s => s.pivot)?.pivot?.gen || 0,
    align: 'center'
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
    { name: 'code', label: 'CODIGO', field: row => row.code, align: 'left' },
    { name: 'barcode', label: 'CB', field: row => row.barcode, align: 'left' },
    { name: 'description', label: 'DESCRIPCION', field: row => row.description, align: 'left' },
    { name: 'section', label: 'SECCION', field: row => row.categories.familia.seccion.name, align: 'left' },
    { name: 'family', label: 'FAMILIA', field: row => row.categories.familia.name, align: 'left' },
    { name: 'category', label: 'CATEGORIA', field: row => row.categories.name, align: 'left' },
    { name: 'locations', label: 'UBICACION', field: row => row.locations?.map(e => e.path).join('/'), align: 'center' },
    ...priceColumns.value,
    ...stocksColumns.value
  ]
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
    { id: 12, label: 'Rectangular 2x4' },

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
  const resp = await pricesProduct.getData(sid,{fechas:fechas.value.date});
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
            align: 'center'
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
  const resp = await pricesProduct.getData(sid,{fechas:fechas.value.date});
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
            align: 'center'
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

const pdf = () => {
  $q.loading.show({ message: 'Generando Etiquetas' })
  if (mosPDF.value.val.id == 1) {
    xtralargeLabel(bascket.value)
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
        alert('Hubo un error al descargar las etiquetas')
      })

  } else if (mosPDF.value.val.id == 2) {
    largeLabel(bascket.value)
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
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 3) {
    mediumLabel(bascket.value)
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
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 4) {
    smallLabel(bascket.value)
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
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 5) {
    verticalLabel(bascket.value)
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
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 6) {
    toyBoys(bascket.value)
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
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 7) {
    toyGirls(bascket.value)
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
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 8) {
    xlargenina(bascket.value)
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
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 9) {
    xlargenino(bascket.value)
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
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 10) {
    Hlargenino(bascket.value)
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
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 11) {
    Hlargenina(bascket.value)
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
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 12) {
    plainMedium(bascket.value)
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
        console.log(r)
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
      const image = "/icons/Navidad/Navidad6(2).png";
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
      console.log(products)
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Navidad/Navidad6(2).png";
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
        doc.text(`${product.pieces} PZS`, x + 185, y + 23, { align: 'right' }); // piezas por caja
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

const verticalLabel = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Navidad/NavidadVer(2).png";
      const type = "PNG";
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 48; // Ancho de cada etiqueta
      const labelHeight = 85; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 4; // Número de etiquetas por fila
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
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 20, y + 80); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 15; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 5, y + 22); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        let ypri = y + 35
        let yprincrement = 7
        product.usedPrices.filter(item => prices.value.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 5, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(26);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 10, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 5, ypri + i * yprincrement);// alias de el precio
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 20, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 24, y + 17, { align: 'center' }); // codigo de el producto
        doc.text(product.large, x + 20, y + 68); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 20, y + 73); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 81); //ubicacion de exhibicion de el producto
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
            doc.text(e.alias, x + 2, ypri + i * yprincrement);// alias de el precio
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
            doc.text(e.alias, x + 15, ypri + i * yprincrement);// alias de el precio
            doc.text(`$${Number(e.pivot.price).toFixed(0)}`, x + 32, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 62, y + 70, { align: 'right' }); // codigo de el producto
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

const xlargenina = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Juguete/xlargeninia.png";
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
        doc.text(`${product.pieces} PZS`, x + 185, y + 23, { align: 'right' }); // piezas por caja
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

const xlargenino = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const image = "/icons/Juguete/xlargeninio.png";
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
        doc.text(`${product.pieces} PZS`, x + 185, y + 23, { align: 'right' }); // piezas por caja
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

const Hlargenino = (data) => {
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
      const labelWidth = 100; // Ancho de cada etiqueta
      const labelHeight = 60; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 2; // Número de etiquetas por fila
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
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 5, y + 10); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 5, y + 15); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        let ypri = y + 25
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
            doc.text(e.alias, x + 15, ypri + i * yprincrement);// alias de el precio
            doc.text(`$${Number(e.pivot.price).toFixed(0)}`, x + 32, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 70, y + 25); // codigo de el producto
        doc.text(product.large, x + 45, y + 52); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 70, y + 30); // piezas por caja
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

const Hlargenina = (data) => {
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
      const labelWidth = 100; // Ancho de cada etiqueta
      const labelHeight = 60; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 2; // Número de etiquetas por fila
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
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 5, y + 20); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label, maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 5, y + 25); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        let ypri = y + 32
        let yprincrement = 7
        product.usedPrices.filter(item => prices.value.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 20, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(20);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 20, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 20, ypri + i * yprincrement);// alias de el precio
            doc.text(`$${Number(e.pivot.price).toFixed(0)}`, x + 37, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 70, y + 32); // codigo de el producto
        doc.text(product.large, x + 45, y + 52); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 70, y + 37); // piezas por caja
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

const plainMedium = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const products = data
      const expandedProducts = [];
      products.forEach(product => {
        for (let i = 0; i < product._copies; i++) {
          expandedProducts.push(product);
        }
      });
      const doc = new jsPDF({ format: 'letter' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 5; // Margen izquierdo
      const marginY = 10; // Margen superior
      const labelWidth = 100; // Ancho de cada etiqueta
      const labelHeight = 60; // Alto de cada etiqueta
      const spacingX = 5; // Espaciado horizontal entre etiquetas
      const spacingY = 5; // Espaciado vertical entre etiquetas
      const labelsPerRow = 2; // Número de etiquetas por fila
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
        if (index > 0 && indexInPage === 0) {
          doc.addPage(); // Agrega una nueva página cuando el índice es un múltiplo de totalLabelsPerPage
        }
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.rect(x, y, labelWidth, labelHeight);
        // doc.addImage(image, type, x, y, labelWidth, labelHeight); // Agrega la imagen
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text('Grupo Vizcarra', x + 40, y + 5)
        // // doc.addImage(barcode(product.name), type, x + 75, y + 8, 15, 15); // Agrega el código de barras
        doc.setFontSize(33);
        doc.setFont('helvetica', 'bold');
        // doc.text(product.name, x + 10, y + 22); // se agrega codigo corto
        doc.text(product.name, x + 5, y + 15); // se agrega codigo corto

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');

        // Dividir el texto de la descripción para ajustarlo dentro de la etiqueta
        const maxLineWidth = labelWidth - 20; // Ancho máximo para el texto
        const textLines = doc.splitTextToSize(product.label.toUpperCase(), maxLineWidth); // Divide el texto en líneas
        doc.text(textLines, x + 5, y + 20); // Dibuja el texto dividido en la etiqueta
        // doc.text(product.label.substring(0, 34), x + 6, y + 25); // descripcion de el producto
        doc.setFontSize(12);
        let ypri = y + 32
        let yprincrement = 7
        product.usedPrices.filter(item => prices.value.val.includes(item.id)).forEach((e, i) => {
          if (e.alias == "OFERTA") {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Unico Precio', x + 15, ypri + i * yprincrement);// alias de el precio
            doc.setFontSize(25);
            doc.text(`$ ${Number(e.pivot.price).toFixed(2)}`, x + 20, ypri + i * yprincrement + 15);// valor de el precio
          } else {
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(e.alias, x + 15, ypri + i * yprincrement);// alias de el precio
            doc.text(`$${Number(e.pivot.price).toFixed(0)}`, x + 37, ypri + i * yprincrement);// valor de el precio
          }
        })
        // //CONTINUA CODIGO
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(`${product.code}`, x + 66, y + 32); // codigo de el producto
        doc.text(product.large, x + 45, y + 52); // largo de el producto
        doc.text(`${product.pieces} PZS`, x + 70, y + 37); // piezas por caja
        doc.setFontSize(4)
        doc.setFont('helvetica', 'normal');
        doc.text(product.locations ? product.locations.map(location => location.path).join('/') : '', x + 18, y + 55); //ubicacion de exhibicion de el producto
      });

      doc.save(`${VDB.session.credentials.nick} etiquetas ${mosPDF.value.val.label}`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });

}


init()
</script>
