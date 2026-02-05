<template>
  <div>
    <q-toolbar>
      <q-btn flat round dense icon="upload_file" size="lg" @click="clickFile" title="Subir Archivo"
        :disable="documentHigh.state" />
      <q-separator spaced inset vertical dark />
      <q-btn icon="add" @click="addDoc.state = !addDoc.state" title="Crear Documento" flat round dense size="lg"
        :disable="documentHigh.state" />
    </q-toolbar>
    <q-separator spaced inset vertical dark />
    <q-table :rows="data" :columns="columns">
      <template v-slot:top v-if="documentHigh.state">
        <div>
          <div class="text-caption"> {{ `${documentHigh.autor.name} ${documentHigh.autor.surnames}` }} <q-separator />
            {{ documentHigh.date }}
          </div>
          <div class="text-bold"> {{ documentHigh.nameDoc }} </div>
        </div>
        <q-space />
        <q-btn color="primary" icon="inventory" flat @click="mosformProduct = !mosformProduct" />
        <q-btn color="primary" icon="cloud_sync" flat @click="sendProducts" />
      </template>
    </q-table>
  </div>

  <q-dialog v-model="mosformProduct" persistent position="right" full-height>
    <formProduct :documentHigh="documentHigh" @closePopup="cancel" @addingProduct="addProduct" />
  </q-dialog>


  <q-dialog v-model="addDoc.state" persistent>
    <q-card>
      <q-card-section class="text-bold text-h6">
        Nombre de el nuevo Documento
      </q-card-section>
      <q-card-section>
        <q-input v-model="addDoc.val" type="text" label="Nombre" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="Crear" color="primary" @click="addDocument" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="errores.state" persistent>
    <q-card style="width: 500px; max-width: 80vw;">
      <q-card-section class="text-h6 text-center text-bold">
        Errores de Archivo
      </q-card-section>
      <q-card-section>
        <q-table :rows="errores.data" :columns="errores.columns" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="dataResponse.state" persistent>
    <q-card style="width: 500px; max-width: 80vw;">
      <q-card-section class="text-center text-bold text-h4">
        {{ dataResponse.data.message.toUpperCase() }}
      </q-card-section>
      <q-card-section class=" text-h6">
        <div>
          INSERTADOS: <span class="text-bold">{{ dataResponse.data.summary.created }}</span>
        </div>
        <div>
          ACTUALIZADOS: <span>{{ dataResponse.data.summary.updated }}</span>
        </div>
        <div>
          ERRORES: <span>{{ dataResponse.data.summary.errors }}</span>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="reload" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".xlsx,.xls" />
</template>

<script setup>
import { useProductStore } from 'stores/ProductsStore';
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useVDBStore } from 'stores/VDB';
import { useRoute, useRouter } from 'vue-router';
import formProduct from 'components/Products/formProduct.vue'
import dayjs from 'dayjs';
import ExcelJS from 'exceljs';
import { useQuasar, date } from 'quasar';
import { $sktRestock } from 'boot/socket';
import productApi from 'src/API/productsApi.js';
const VDB = useVDBStore();
const $q = useQuasar();
const layoutProduct = useProductStore();
layoutProduct.setTitle('Alta Productos')
const mosformProduct = ref(false);

const inputFile = ref(null)
const data = ref([]);
const dataResponse = ref({
  state: false,
  data: null,
});
const errors = ref([])
const errores = ref({
  data: [],
  state: false,
  columns: [
    { name: 'row', label: 'Linea', field: r => r.row, align: 'center' },
    { name: 'code', label: 'Codigo', field: r => r.code, align: 'left' },
    { name: 'field', label: 'Campo', field: r => r.field, align: 'left' },
    { name: 'value', label: 'Valor', field: r => r.value, align: 'left' },
    { name: 'message', label: 'Error', field: r => r.message, align: 'left' }
  ]
})
const addDoc = ref({
  state: false,
  val: null
})
const attributeColumns = computed(() => {
  const map = new Map()
  data.value.forEach(p => {
    p.attributes?.forEach(a => {
      if (!map.has(a.id)) {
        map.set(a.id, {
          name: `attr_${a.id}`,
          label: `${a.name.toUpperCase()}`,
          align: 'left',
          field: row => {
            const found = row.attributes?.find(x => x.id === a.id)
            return found ? found.value : ''
          }
        })
      }
    })
  })
  return Array.from(map.values())
})


const columns = computed(() => [
  { name: 'code', label: 'Codigo', field: r => r.code, align: 'left' },
  { name: 'cb', label: 'CB', field: r => r.cb, align: 'left' },
  { name: 'short_code', label: 'CCO', field: r => r.short_code, align: 'left' },
  { name: 'description', label: 'Descripcion', field: r => r.description, align: 'left' },
  { name: 'section', label: 'Seccion', field: r => r.section.alias, align: 'left' },
  { name: 'family', label: 'Familia', field: r => r.familia.alias, align: 'left' },
  { name: 'category', label: 'Categoria', field: r => r.categoria.alias, align: 'left' },
  { name: 'provider', label: 'Proveedor', field: r => r.provider.name, align: 'left' },
  { name: 'reference', label: 'Referencia', field: r => r.reference, align: 'left' },
  { name: 'makers', label: 'Fabricante', field: r => r.makers.name, align: 'left' },
  { name: 'cost', label: 'Costo', field: r => r.cost, align: 'left' },
  { name: 'pxc', label: 'PXC', field: r => r.pxc, align: 'left' },
  { name: 'unit_measures', label: 'UMC', field: r => r.umc.name, align: 'left' },
  { name: 'resurtible', label: 'P.Resurtible', field: r => r.pr, align: 'left' },
  ...attributeColumns.value
])


const documentHigh = ref({
  state: false,
  autor: VDB.session.credentials,
  nameDoc: null,
  date: null,
})

const clickFile = () => {
  inputFile.value.click();
}

const readFile = async () => {
  $q.loading.show({ message: 'Revisando Archivo' })
  const inputFile = document.getElementById("inputFile").files[0];
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(inputFile);
  documentHigh.value.state = true;
  documentHigh.value.nameDoc = inputFile.name;
  documentHigh.value.date = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const worksheet = workbook.worksheets[0];
  const headers = worksheet.getRow(1).values
  const rows = []
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return
    const rwd = {}
    row.eachCell((cell, col) => {
      rwd[headers[col]] = cell.value
    })
    rows.push(rwd)
  })
  await validateBatch(rows)
  $q.loading.hide();
};

// const validateBatch = async (rows) => {
//   const codes = rows.map(r => r.Codigo).filter(Boolean)
//   const barcodes = rows.map(r => r.CB).filter(Boolean)
//   const resp = await productApi.checkCodesBatch({
//     codes,
//     barcodes
//   })
//   const validProducts = []
//   const invalidProducts = []
//   rows.forEach(row => {
//     const codeInfo = resp.codes[row.Codigo]
//     const barcodeExists = resp.barcodes[row.CB]
//     if (codeInfo?.exist || barcodeExists) {
//       invalidProducts.push({
//         row,
//         reason: {
//           codeExist: codeInfo?.exist,
//           barcodeExist: barcodeExists
//         }
//       })
//     } else {
//       row.short_code = resp.codes[row.Codigo].short_code
//       validProducts.push(mapProduct(row))
//     }
//   })
//   data.value = validProducts
//   errors.value = invalidProducts
// }
const validateBatch = async (rows) => {
  const codes = rows.map(r => r.Codigo).filter(Boolean)
  const barcodes = rows.map(r => r.CB).filter(Boolean)

  const resp = await productApi.checkCodesBatch({ codes, barcodes })

  const validProducts = []
  const errorRows = []

  rows.forEach((row, index) => {
    const codeInfo = resp.codes[row.Codigo]
    const barcodeExists = resp.barcodes[row.CB]
    if (codeInfo?.exist) {
      errorRows.push({
        row: index + 2,
        code: row.Codigo,
        field: 'Codigo',
        value: row.Codigo,
        message: 'El código ya existe'
      })
    }

    if (barcodeExists) {
      errorRows.push({
        row: index + 2,
        code: row.Codigo,
        field: 'CB',
        value: row.CB,
        message: 'El código de barras ya existe'
      })
    }
    if (codeInfo?.exist || barcodeExists) return
    row.short_code = codeInfo.short_code
    validProducts.push(mapProduct(row))
  })
  data.value = validProducts
  errores.value.data = errorRows
  errores.value.state = errorRows.length > 0
}



const mapProduct = (row) => {
  return {
    code: row.Codigo,
    cb: row.CB,
    short_code: row.short_code,
    description: row.Descripcion,
    cost: row.Costo,
    pxc: row.PxC,
    pr: row.Resurtible,
    section: findCategory(layoutProduct.categories, row.Seccion),
    familia: findCategory(layoutProduct.categories, row.Familia),
    categoria: findCategory(layoutProduct.categories, row.Categoria),
    provider: findProvider(layoutProduct.providers, row.Proveedor),
    makers: findProvider(layoutProduct.makers, row.Fabricante),
    umc: findProvider(layoutProduct.unitsMeasure, row.UnidadMedida),
    reference: row.Referencia,
    attributes: mapAttributes(row)
  }
}
const findCategory = (list, value) => {
  return list.find(e =>
    e.alias?.toLowerCase() === String(value).toLowerCase()
  ) || null
}
const findProvider = (list, value) => {
  return list.find(e =>
    e.id === value
  ) || null
}

const mapAttributes = (row) => {
  return layoutProduct.attributes
    .filter(attr => row[attr.name])
    .map(attr => ({
      id: attr.id,
      name: attr.name,
      value: row[attr.name]
    }))
}

const addDocument = () => {
  addDoc.value.state = false
  documentHigh.value.state = true,
    documentHigh.value.nameDoc = addDoc.value.val
  documentHigh.value.date = dayjs().format('YYYY-MM-DD HH:mm:ss')
  mosformProduct.value = true
}

const cancel = () => {
  mosformProduct.value = false;
}
const addProduct = (value) => {
  let inx = data.value.findIndex(e => e.code == value.code);
  if (inx >= 0) {
    $q.notify({ message: 'El Producto ya esta en la lista', type: 'negative', position: 'center' });
  } else {
    console.log(data.value)
    data.value.push(value);
  }
}

const sendProducts = async () => {
  $q.loading.show({ message: 'Insertando datos' })
  let sendData = {
    head: documentHigh.value,
    data: data.value
  }
  // console.log(sendData);
  const resp = await productApi.highProducts(sendData);
  console.log(resp);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    dataResponse.value.state = true
    dataResponse.value.data = resp
    // reload()
    $q.loading.hide();
  }
}

const reload = () => {
  window.location.reload()
}
</script>
