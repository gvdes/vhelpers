<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section class="row">
        <q-btn icon="download" flat @click="exportData" title="descargar Estructura" />
        <q-separator spaced inset vertical dark />
        <q-select dense class="col" v-model="type.val" :options="type.types" label="Tipo" filled />
        <q-separator spaced inset vertical dark v-if="type.val?.id == 2" />
        <q-select dense v-if="type.val?.id == 2" class="col" v-model="errorTypes.val" :options="errorTypes.opts"
          label="MEDIO" filled />
      </q-card-section>
      <q-card-section v-if="type.val">
        <div v-if="type.val.id == 1">
          <q-btn icon="upload" label="Exportar Excel" class="full-width" color="black"
            @click="() => refCreate.click()" />
        </div>
        <div v-else-if="type.val.id == 2">
          <div v-if="errorTypes.val">
            <div v-if="errorTypes.val?.id == 1" class="row"><!-- por categoria-->
              <q-select class="col" v-model="categories.seccion.val" :options="seccions" label="Seccion" filled dense
                option-label="name" multiple use-chips />
              <q-separator spaced inset vertical dark />
              <q-select class="col" v-model="categories.familias.val" :options="families" label="Familia" filled dense
                option-label="name" multiple use-chips :disable="categories.seccion.val.length == 0" />
              <q-separator spaced inset vertical dark />
              <q-select class="col" v-model="categories.categories.val" :options="caty" label="Categoria" filled dense
                option-label="name" multiple use-chips
                :disable="categories.seccion.val.length == 0 || categories.familias.val.length == 0" />
              <q-separator spaced inset vertical dark />
              <q-btn color="primary" :label="categories.seccion.val.length > 0 ? 'Obtener' : 'Todos'" flat
                @click="getReport" />

            </div>
            <div v-else-if="errorTypes.val?.id == 2"><!-- por ubicacion-->
              <div v-if="sections.length > 0">
                <q-select v-model="selectedUbicacion" :options="sections" label="ALMACÉN" filled option-label="name"
                  dense @update:model-value="initLevels" />
                <q-separator spaced inset vertical dark />
                <div v-for="(nivel, index) in niveles" :key="index">
                  <div>
                    <q-select v-model="nivel.selected" :options="nivel.options" :label="`Nivel ${index + 1}`"
                      option-value="id" option-label="name" emit-value map-options
                      @update:model-value="val => onSelectChange(val, index)" dense filled />
                    <q-separator spaced inset vertical dark />
                  </div>
                </div>
              </div>
              <div class="text-left">
                <q-btn icon="delete" flat @click="clearSection" :disable="selectedUbicacion ? false : true" />
              </div>
            </div>
            <div v-else-if="errorTypes.val?.id == 3"> <!-- por excel-->
              <q-btn icon="upload" label="Exportar Excel" class="full-width" color="black"
                @click="() => refDelete.click()" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-dialog v-model="productSection.status" persistent>
      <q-card>
        <q-card-section class="row items-center">
          Vaciar Seccion {{lvellast.options.find(e => e.id == lvellast.selected).name}}
        </q-card-section>
        <q-card-section>
          <q-table title="Productos" :rows="productSection.val" :columns="table.columns" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Vaciar Seccion" color="negative" @click="deleteSectionProducts" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="productCategories.status" persistent>
      <q-card>
        <q-card-section class="row items-center">
          Eliminar Ubicaciones de los Articulos
        </q-card-section>
        <q-card-section>
          <q-table title="Productos" :rows="productCategories.val" :columns="table.columns" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Eliminar Ubicacion" color="negative" @click="deleteCategoriesLocations" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="massiveCreate.state" persistent>
      <q-card>
        <q-card-section class="text-bold text-center text-h6">
          Resultados de Importacion
        </q-card-section>
        <q-card-section>
          <q-table :rows="massiveCreate.val.goals" :columns="massiveCreate.table.columns" />
        </q-card-section>
        <q-card-section>
          <q-table :rows="massiveCreate.val.fails" :columns="massiveCreate.table.columns" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="massiveDelete.state" persistent>
      <q-card>
        <q-card-section class="text-bold text-center text-h6">
          Resultados de Importacion Eliminado Masivo
        </q-card-section>
        <q-card-section>
          <q-table :rows="massiveDelete.val" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <input type="file" ref="refCreate" id="refCreate" @input="readFileCreate" hidden accept=".xlsx,.xls" />
    <input type="file" ref="refDelete" id="refDelete" @input="readFileDelete" hidden accept=".xlsx,.xls" />
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import { useWarehouse } from 'src/stores/warehousStore';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import dbCompare from 'src/API/compareApi'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import productsApi from 'src/API/productsApi';
import locationsApi from 'src/API/locationsApi';
import dbproduct from 'src/API/Product'

const VDB = useVDBStore();
const $q = useQuasar();
const warehousStore = useWarehouse()
warehousStore.setTitle('Acciones Masivas')

const sections = ref([]);
const categories = ref({
  all: [],
  seccion: {
    val: [],
  },
  familias: {
    val: [],
  },
  categories: {
    val: [],
  }
})

const selectedUbicacion = ref(null);
const refCreate = ref(null);
const refDelete = ref(null);
const labels = ref([]);
const niveles = ref([]);
const deepMax = ref(0);
const lvellast = ref(null);
const productSection = ref({
  val: [],
  status: false
});
const productCategories = ref({
  val: [],
  status: false
});

const type = ref({
  val: null,
  types: [
    { id: 1, label: 'CREAR' },
    { id: 2, label: 'ELIMINAR' },
  ]
})
const errorTypes = ref({
  val: null,
  opts: [
    { id: 1, label: 'CATEGORIAS' },
    { id: 2, label: 'UBICACION' },
    { id: 3, label: 'EXCEL' },
  ]
})
const massiveCreate = ref({
  state: false,
  val: true,
  table: {
    columns: [
      { name: 'product', label: 'Producto', field: r => r.product, align: 'left' },
      { name: 'success', label: 'Estado', field: r => r.success ? 'Creado' : ':0', align: 'center' },
      { name: 'locations', label: '', field: r => r.success ? (r.locations ?? []).map(e => e.path).join('/') : r.error, align: 'left' },
    ]
  }
})
const massiveDelete = ref({
  state: false,
  val: true,
  table: {
    columns: [
      { name: 'product', label: 'Producto', field: r => r.product, align: 'left' },
      { name: 'success', label: 'Estado', field: r => r.success ? 'Creado' : ':0', align: 'center' },
      { name: 'locations', label: '', field: r => r.success ? (r.locations ?? []).map(e => e.path).join('/') : r.error, align: 'left' },
    ]
  }
})
const table = ref({
  columns: [
    { name: 'code', label: 'Codigo', field: r => r.code, align: 'left' },
    { name: 'description', label: 'Descripcion', field: r => r.description, align: 'left' },
    { name: 'locations', label: 'Ubicacion', field: r => r.locations.map(e => e.path).join('/'), align: 'left' },
  ]
})

const seccions = computed(() => categories.value.all.filter(e => e.deep == 0))
const families = computed(() => {
  if (categories.value.seccion.val.length > 0) {
    return categories.value.all.filter(e => e.deep == 1 && categories.value.seccion.val.map(e => e.id).includes(e.root))
  } else {
    return categories.value.all.filter(e => e.deep == 1)
  }
})
const caty = computed(() => {
  if (categories.value.seccion.val.length > 0 && categories.value.familias.val.length == 0) {
    let familias = categories.value.all.filter(e => e.deep == 1 && categories.value.seccion.val.map(e => e.id).includes(e.root)).map(e => e.id);
    return categories.value.all.filter(e => e.deep == 2 && familias.includes(e.root))
  } else if (categories.value.familias.val.length > 0) {
    return categories.value.all.filter(e => e.deep == 2 && categories.value.familias.val.map(e => e.id).includes(e.root))
  } else {
    return categories.value.all.filter(e => e.deep == 2)
  }
})


const init = async () => {
  $q.loading.show({ message: 'Obteniendo Secciones' });
  const resp = await locationsApi.getInit(VDB.session.store.id_viz);
  if (!resp.fail) {
    console.log(resp)
    sections.value = resp.celler;
    categories.value.all = resp.categories
    // exportData(sections.value)
  } else {
    console.log(resp);
  }
  $q.loading.hide();
};

const initLevels = () => {
  const allSections = selectedUbicacion.value.sections || [];
  deepMax.value = Math.max(...allSections.map(s => s.deep));
  niveles.value = [
    {
      options: allSections.filter(s => s.root === 0),
      selected: null
    }
  ];
  // console.log(niveles.value[0].options)
  labels.value = niveles.value[0].options;
};

const getChildren = rootId => {
  return selectedUbicacion.value.sections?.filter(s => s.root === rootId) || [];
};

const onSelectChange = (val, index) => {
  niveles.value.splice(index + 1);
  const children = getChildren(val);
  if (children.length > 0) {
    niveles.value.push({
      options: children,
      selected: null
    });
  }
};

const clearSection = async () => {
  $q.loading.show({ message: 'Obeniendo Productos' })
  let data = {
    workpoint: VDB.session.store.id_viz,
    section: lvellast.value.selected
  }
  const resp = await locationsApi.obtProduct(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    productSection.value.status = true
    productSection.value.val = resp
    $q.loading.hide()
  }
}
const deleteSectionProducts = async () => {
  $q.loading.show({ message: 'Eliminando Ubicaciones' })
  let data = {
    products: productSection.value.val.map(e => e.id),
    section: lvellast.value.selected,
    id_viz: VDB.session.credentials.staff.id_va,
  }
  console.log(data);
  const resp = await locationsApi.deleteSectionProducts(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    productSection.value = {
      val: [],
      status: false
    };
    $q.loading.hide()
  }
}

const getReport = async () => {
  $q.loading.show({ message: 'El reporte puede tardar unos minutos' })
  // loading.value = true
  let data = {
    workpoint: VDB.session.store.id_viz,
    sections: categories.value.seccion.val?.map(e => e.id),
    familys: categories.value.familias.val?.map(e => e.id),
    categories: categories.value.categories.val?.map(e => e.id),
  }
  console.log(data);
  const resp = await locationsApi.obtProductCategories(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.loading.hide();
    console.log(resp)
    productCategories.value.status = true
    productCategories.value.val = resp

  }
}

const deleteCategoriesLocations = async () => {
  $q.loading.show({ message: 'Eliminando Ubicaciones' })
  let data = {
    products: productCategories.value.val.map(e => {
      return {
        product: e.id,
        locations: e.locations.map(i => i.id)
      }
    }),
    id_viz: VDB.session.credentials.staff.id_va,
  }
  const resp = await locationsApi.deleteCategoriesLocations(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    console.log(resp)
    productCategories.value = {
      val: [],
      status: false
    };
    $q.loading.hide()
  }
}

const readFileCreate = () => {
  let inputFile = document.getElementById("refCreate")?.files[0];
  let workbook = new ExcelJS.Workbook();
  let datos = {};
  $q.loading.show({ message: 'Importando Datos' })
  workbook.xlsx.load(inputFile).then(async (data) => {
    let worksheet = workbook.worksheets[0];
    let codigos = worksheet.getColumn("A");//modelos
    let cantidades = worksheet.getColumn("B");//locaciones
    // console.log(codigos);
    codigos.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber === 1) return;
      let codigo = cell.value;
      let location = worksheet.getCell(`B${rowNumber}`).value;
      if (!codigo) return;
      if (!datos[codigo]) {
        datos[codigo] = [];
      }
      if (!datos[codigo].includes(location)) {
        datos[codigo].push(location || cantidad);
      }
    })
    let sendData = Object.keys(datos).map(codigo => ({
      _product: codigo,
      _location: datos[codigo],
      _workpoint: VDB.session.store.id_viz
    }))
    console.log(sendData)
    let sendDb = {
      products: sendData,
      id_viz: VDB.session.credentials.staff.id_va,
    }

    const resp = await locationsApi.addMassiveLocation(sendDb)
    if (resp.fail) {
      console.log(resp);
    } else {
      console.log(resp);
      massiveCreate.value.state = true
      massiveCreate.value.val = resp
      $q.loading.hide()
    }
  })
}

const readFileDelete = () => {
  let inputFile = document.getElementById("refDelete")?.files[0];
  let workbook = new ExcelJS.Workbook();
  let datos = {};
  $q.loading.show({ message: 'Importando Datos' })
  workbook.xlsx.load(inputFile).then(async (data) => {
    let worksheet = workbook.worksheets[0];
    let codigos = worksheet.getColumn("A");//modelos
    // let cantidades = worksheet.getColumn("B");//locaciones
    // console.log(codigos);
    codigos.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
      if (rowNumber === 1) return;
      let codigo = cell.value;
      if (!codigo) return;
      datos[codigo] = true;
    })
    let sendData = Object.keys(datos).map(codigo => ({
      _product: codigo,
      _workpoint: VDB.session.store.id_viz
    }))
    console.log(sendData)
    let sendDb = {
      products: sendData,
      id_viz: VDB.session.credentials.staff.id_va,
    }
    if (sendData.length) {
      const resp = await locationsApi.deleteMassiveLocation(sendDb)
      if (resp.fail) {
        console.log(resp);
      } else {
        console.log(resp);
        massiveDelete.value.state = true
        massiveDelete.value.val = resp
        $q.loading.hide()
      }
    } else {
      $q.notify({
        message: "Vaya!! Al parecer este archivo esta vacio.",
        icon: "fas fa-grin-beam-sweat",
        color: "negative",
      });
    }

  })
}


const exportData = async () => {
  const workbook = new ExcelJS.Workbook()

  sections.value.forEach((e, i) => {
    const sheet = workbook.addWorksheet(`${e.name}_${i}`)
    const allSections = e.sections || []
    const maxLevel = Math.max(...allSections.map(s => s.deep || 1))

    const headers = []
    for (let i = 0; i <= maxLevel; i++) {
      headers.push(`NOMBRE_${i}`, `PATH_${i}`, `ID_${i}`)
    }
    sheet.addRow(headers)

    const buildRows = (node, row) => {
      const newRow = Array(maxLevel * 3).fill("");
      // Copiar los valores de row anterior (padres)
      for (let i = 0; i < row.length; i++) {
        newRow[i] = row[i];
      }
      newRow[node.deep * 3] = node.name;
      newRow[node.deep * 3 + 1] = node.path;
      newRow[node.deep * 3 + 2] = node.id;

      sheet.addRow(newRow);

      const children = allSections.filter(s => s.root === node.id);
      children.forEach(child => buildRows(child, newRow));
    }

    allSections
      .filter(s => s.deep === 0)
      .forEach(root => buildRows(root, [root.name, root.path, root.path]))
    sheet.columns?.forEach(column => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });
  })

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'almacenes.xlsx'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

init()

watch(
  niveles,
  (newNiveles) => {
    const seleccionados = newNiveles.filter(n => n.selected !== null);
    if (seleccionados.length) {
      const ultimoNivel = seleccionados[seleccionados.length - 1];
      const children = getChildren(ultimoNivel.selected);
      lvellast.value = ultimoNivel;
    }
  },
  { deep: true }
);
</script>
