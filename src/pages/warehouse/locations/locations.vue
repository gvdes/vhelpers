<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="row" v-if="sections.length > 0">
          <q-btn color="primary" icon="download" @click="downloadProducts" flat
            :disable="selectedUbicacion ? false : true" />
          <q-separator spaced inset vertical dark />
          <q-select class="col" v-model="selectedUbicacion" :options="sections" label="ALMACÉN" filled
            option-label="name" dense @update:model-value="initLevels" />
          <q-separator spaced inset vertical dark />
          <div v-for="(nivel, index) in niveles" :key="index" class="col">
            <div class="row">
              <q-select class="col" v-model="nivel.selected" :options="nivel.options" :label="`Nivel ${index + 1}`"
                option-value="id" option-label="name" emit-value map-options
                @update:model-value="val => onSelectChange(val, index)" dense filled :disable="index == deepMax" />
              <q-separator spaced inset vertical dark />
            </div>
          </div>
          <div class="text-right row">
            <q-btn icon="add" flat @click="createSection" :disable="selectedUbicacion ? false : true" />
          </div>
        </div>
        <q-separator spaced inset vertical dark />
        <q-table :rows="labels" :columns="table.columns">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.value }}
              </q-td>
              <q-td auto-width>
                <q-btn size="sm" color="negative" flat round dense @click="clickDelete(props.row)" icon="delete" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <q-dialog v-model="create.state" persistent>
      <q-card>
        <q-card-section class="text-center">
          NUEVA SECCION EN ALMACEN <span class="text-bold "> {{ create.val.name.toUpperCase() }}</span>
        </q-card-section>
        <q-card-section class="row">
          <q-input class="col" v-model="create.create.name" type="text" label="Name" filled dense />
          <q-separator spaced inset vertical dark />
          <q-input class="col" v-model="create.create.alias" type="text" label="Alias" filled dense />
          <q-separator spaced inset vertical dark />
          <q-input v-if="create.secuence" class="col" v-model="create.create.elementos" type="Number" label="Elementos"
            filled dense />
        </q-card-section>
        <q-card-section>
          <q-radio v-model="create.secuence" :val="false" label="No Usar Secuencia" />
          <q-radio v-model="create.secuence" :val="true" label="Usar Secuencia" />
        </q-card-section>
        <q-card-section v-if="create.create.name && create.create.alias">
          <q-table :rows="create.defaultView" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn flat label="Crear" color="positive" @click="sendCreateSection"
            :disable="!create.create.name || !create.create.alias" />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="deleteLc.state" persistent>
      <q-card>
        <q-card-section class="text-center text-bold text-h5 ">
          ELIMINAR SECCION ?
        </q-card-section>
        <q-card-section class="text-center text-bold text-h6 ">
          {{ deleteLc.val.name }}
        </q-card-section>
        <q-card-section class="text-left text-bold">
          Recuerda que se eliminaran tambien todos los hijos de la seccion
        </q-card-section>
        <q-card-section>
          <q-table :rows="deleteLc.val.pivot" :columns="table.columns">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
                <q-td auto-width v-if="props.row.pivot.length > 0">
                  <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand"
                    :icon="props.expand ? 'remove' : 'add'" />
                </q-td>
              </q-tr>
              <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                  <div class="text-left" v-for="(pivot, index) in props.row.pivot" :key="index">{{ pivot.name }}</div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Eliminar" color="negative" @click="deleteLocations" />
        </q-card-actions>
      </q-card>
    </q-dialog>


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
warehousStore.setTitle('Ubicaciones Estructura')
const exportProducts = ref([]);
const sections = ref([]);
const selectedUbicacion = ref(null);
const lvellast = ref(null);
const create = ref({
  state: false,
  val: null,
  type: false,
  secuence: true,
  create: {
    name: null,
    alias: null,
    elementos: 1
  },
  defaultView: []
})
const deleteLc = ref({
  state: false,
  val: null
})
const labels = ref([]);
const niveles = ref([]);
const deepMax = ref(0);
const table = ref({
  columns: [
    { name: 'id', label: 'ID', field: r => r.id, align: 'center' },
    { name: 'name', label: 'NOMBRE', field: r => r.name, align: 'left' },
    { name: 'alias', label: 'ALIAS', field: r => r.alias, align: 'left' },
    { name: 'path', label: 'PATH', field: r => r.path, align: 'left' },
  ]
})
const init = async () => {
  $q.loading.show({ message: 'Obteniendo Secciones' });
  const resp = await locationsApi.index(VDB.session.store.id_viz);
  if (!resp.fail) {
    sections.value = resp;
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

const createSection = () => {
  const seleccionados = niveles.value.filter(n => n.selected !== null);
  if (!seleccionados.length) {
    console.log('crear una raiz')
    create.value.state = true;
    create.value.val = selectedUbicacion.value
    create.value.type = true;
  } else {
    console.log('crear hijos')
    const ultimoNivel = seleccionados[seleccionados.length - 1];
    const lastSelectedId = ultimoNivel.selected;
    const lastSelectedObj = ultimoNivel.options.find(opt => opt.id === lastSelectedId);
    create.value.state = true;
    create.value.val = lastSelectedObj
    create.value.type = false;
  }
}


const sendCreateSection = async () => {
  $q.loading.show({ message: 'Enviando Datos' })
  create.value.defaultView.forEach(e => {
    e.root = create.value.type ? 0 : create.value.val.id;
    e.deep = create.value.type ? 0 : Number(create.value.val.deep) + 1;
    e._celler = create.value.type ? create.value.val.id : create.value.val._celler;
    e.details = { create: VDB.session.credentials.nick }
  })
  console.log(create.value)
  let data = {
    sections: create.value.defaultView
  }
  const resp = await locationsApi.insertSection(data)
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    let sect = resp
    sect.forEach(e => {
      console.log(e);
      create.value.type ? labels.value.push(e) : selectedUbicacion.value.sections.push(e)
    })
    $q.notify({ message: 'Secciones Creadas', type: 'positive', position: 'bottom' })
    $q.loading.hide();
    create.value = {
      state: false,
      val: null,
      type: false,
      secuence: true,
      create: {
        name: null,
        alias: null,
        elementos: 1
      },
      defaultView: []
    }
  }
}

const buildTree = (row) => {
  const children = getChildren(row.id)
  return {
    ...row,
    pivot: children.map(child => buildTree(child)) // recursivo
  }
}


const clickDelete = (row) => {
  let seccion = buildTree(row)
  console.log(seccion)
  deleteLc.value.state = true
  deleteLc.value.val = seccion
}
const deleteLocations = async () => {
  $q.loading.show({ message: 'eliminando Seccion' })
  console.log(deleteLc.value.val)
  console.log(selectedUbicacion.value)
  const resp = await locationsApi.deleteSection(deleteLc.value.val)
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    selectedUbicacion.value.sections = selectedUbicacion.value.sections.filter(e => !resp.ids.includes(e.id))
    initLevels()
    deleteLc.value = {
      state: false,
      val: null
    }
    $q.loading.hide()

  }
}

const downloadProducts = async () => {
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
    exportProducts.value = resp;
    await exportTableProducts(exportProducts.value)
    $q.loading.hide()
  }
}

const exportTableProducts = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Products');

  const columns = [
    { name: 'Codigo', filterButton: true },
    { name: 'Descripcion', filterButton: true },
    { name: 'Ubicaciones', filterButton: true },
  ]
  const rawData = exportProducts.value.map(e => {
      return [
      e.code,
      e.description,
      e.locations.map(e => e.path).join('|')
      ]
    })


  worksheet.addTable({
    name: 'Productos_Ubicados', // nombre interno de la tabla
    ref: 'A1', // desde dónde empieza
    headerRow: true,
    style: {
      theme: 'TableStyleMedium9', // estilo
      showRowStripes: true,
    },
    columns: columns,
    rows: rawData, // filas reales
  });
  worksheet.columns.forEach(column => {
    let maxLength = 0;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const columnLength = cell.value ? cell.value.toString().length : 10;
      if (columnLength > maxLength) {
        maxLength = columnLength;
      }
    });
    column.width = maxLength < 10 ? 10 : maxLength;
  });
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'almacenes.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link)
}

init();
watch(
  () => [
    niveles.value.map(n => n.selected),
    create.value.create.name,
    create.value.create.alias,
    create.value.create.elementos,
    create.value.secuence
  ],
  ([nivelesSeleccionados, name, alias, elementos, secuence]) => {
    const seleccionados = niveles.value.filter(n => n.selected !== null)
    if (seleccionados.length) {
      const ultimoNivel = seleccionados[seleccionados.length - 1]
      const children = getChildren(ultimoNivel.selected)
      labels.value = children
      lvellast.value = ultimoNivel;
    } else {
      labels.value = niveles.value[0]?.options || []
    }

    if (!name || !alias) {
      create.value.defaultView = []
      return
    }

    const rows = []
    if (secuence) {
      const normalizeBase = (str, base) =>
        str.replace(/\d+$/, '').trim() === base.trim()
      console.log(create.value.type)
      let existingChildren = null
      if (create.value.type) {
        existingChildren = selectedUbicacion.value.sections.filter(s => s.root == 0 && s.deep == 0) || [];
      } else {
        existingChildren = getChildren(create.value.val?.id)
      }
      // const
      // .filter(c => normalizeBase(c.name, name) && normalizeBase(c.alias, alias))
      // console.log(existingChildren)
      let maxIndex = 0
      existingChildren.forEach(c => {
        const numFromName = parseInt(c.name.replace(name, '').trim())
        // console.log(numFromName);
        const numFromAlias = parseInt(c.alias.replace(alias, '').trim())
        // console.log(numFromAlias);
        const candidate = Math.max(
          isNaN(numFromName) ? 0 : numFromName,
          isNaN(numFromAlias) ? 0 : numFromAlias
        )
        if (candidate > maxIndex) maxIndex = candidate
      })

      for (let i = 1; i <= (Number(elementos) || 1); i++) {
        const num = maxIndex + i
        rows.push({
          name: `${name} ${num}`,
          alias: `${alias}${num}`,
          path: `${create.value.val?.path || ''}${create.value.val?.path ? '-' : ''}${alias}${num}`
        })
      }
    } else {
      rows.push({
        name,
        alias,
        path: `${create.value.val?.path || ''}${create.value.val?.path ? '-' : ''} ${alias}`
      })
    }
    create.value.defaultView = rows
  },
  { deep: true }
)


</script>
