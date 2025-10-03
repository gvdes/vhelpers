<template>
  <q-page padding>

    <div :class="!ismobile ? 'row' : ''">
      <q-card :class="!ismobile ? 'col my-card' : 'my-card'">
        <q-card-section>
          <div v-if="sections.length > 0">
            <q-select v-model="selectedUbicacion" :options="sections" label="ALMACÉN" filled option-label="name" dense
              @update:model-value="initLevels" />
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
        </q-card-section>
      </q-card>

      <q-separator spaced inset vertical dark />

      <q-card :class="!ismobile ? 'col my-card' : 'my-card'">
        <q-card-section>
          <ProductAutocomplete @input="add" @agregar="agregar" with_locations />
        </q-card-section>
        <div v-if="product">
          <q-card-section class="item-center">
            <div class="row">
              <div class="text-subtitle2 col text-bold text-left text-grey text-overline">
                {{ product.categories.familia.seccion.name }}
              </div>
              <div class="text-subtitle2 col text-bold text-center text-grey text-overline">
                {{ product.categories.familia.name }}
              </div>
              <div class="text-subtitle2 col text-bold text-right text-grey text-overline">
                {{ product.categories.name }}
              </div>
            </div>
          </q-card-section>
          <q-card-section class="item-center">
            <div class="row">
              <div class="text-h6 col text-bold text-left">
                {{ product.code }}
              </div>
              <div class="text-h6 col text-bold text-right">
                {{ product.name }}
              </div>
            </div>
            <div class="text-subtitle2 col">{{ product.description }}</div>
            <div>
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-caption text-center">GEN</q-item-label>
                    <q-item-label class="text-center">{{ product.stocks[0].pivot.gen }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-caption text-center">EXH</q-item-label>
                    <q-item-label class="text-center">{{ product.stocks[0].pivot.exh }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-caption text-center">FDT</q-item-label>
                    <q-item-label class="text-center">{{ product.stocks[0].pivot.fdt }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>
          <q-card-section v-if="product.locations.length > 0">
            <div class="text-center text-bold text-h6">Ubicaciones</div>
            <q-separator spaced inset vertical dark />
            <q-table :rows="product.locations" :columns="table.columns" :pagination="table.paginate" hide-bottom
              hide-header>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td v-for="col in props.cols" :key="col.name" :props="props">
                    {{ col.value }}
                  </q-td>
                  <q-td auto-width>
                    <q-btn size="sm" color="negative" flat round dense @click="deleteLocation(props.row.id)"
                      icon="delete" />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </div>
      </q-card>
    </div>
    <q-separator spaced inset vertical dark />
    <q-card class="my-card" v-if="lvellast?.selected && product?.id && !valid">
      <q-card-section>
        <q-btn color="primary" icon="add_link" @click="addLocations" />
      </q-card-section>
    </q-card>






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
warehousStore.setTitle('Ubicaciones Productos')

const sections = ref([]);
const selectedUbicacion = ref(null);
const labels = ref([]);
const niveles = ref([]);
const deepMax = ref(0);
const product = ref(null)
const lvellast = ref(null);
const table = ref({
  columns: [
    // { name: 'id', label: 'ID', field: r => r.id, align: 'center' },
    { name: 'name', label: 'NOMBRE', field: r => r.name, align: 'left' },
    { name: 'alias', label: 'ALIAS', field: r => r.alias, align: 'left' },
    { name: 'path', label: 'PATH', field: r => r.path, align: 'left' },
  ],
  paginate: { rowsPerPage: 0 }
})


const ismobile = computed(() => $q.platform.is.mobile);
const valid = computed(() => product.value?.locations?.find(e => e.id == lvellast.value?.selected))


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

const add = (ops) => {
  product.value = ops
  console.log(ops)
}

const agregar = (ops) => {
  product.value = ops
  console.log(ops)
}

const addLocations = async () => {
  console.log(VDB.session)
  $q.loading.show({ message: 'Agregando Ubicacion' });
  console.log(lvellast.value)
  let data = {
    id_viz: VDB.session.credentials.staff.id_va,
    _location: lvellast.value.selected,
    _product: product.value.id
  }
  const resp = await locationsApi.addLocations(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    const seleccionados = niveles.value.filter(n => n.selected !== null);
    if (seleccionados.length) {
      const ultimoNivel = seleccionados[seleccionados.length - 1];
      const lastSelectedObj = ultimoNivel.options.find(opt => opt.id === lvellast.value.selected);
      // console.log(lastSelectedObj)
      // let ins = lastSelectedObj.pivot = data;
      // console.log(ins)
      product.value.locations.push(lastSelectedObj)
    }
    $q.notify({ message: 'Ubicacion Agregada', type: 'positive', position: 'bottom' })
    $q.loading.hide();
  }
}
const deleteLocation = async (_location) => {
    console.log(VDB.session)
  $q.loading.show({ message: 'Eliminando Ubicacion' });
  let data = {
    id_viz: VDB.session.credentials.staff.id_va,
    _location: _location,
    _product: product.value.id
  }
  console.log(data)
  const resp = await locationsApi.addLocations(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.notify({ message: 'Ubicacion Eliminada', type: 'positive', position: 'bottom' })
    let inx = product.value.locations.findIndex(e => e.id == _location);
    product.value.locations.splice(inx, 1)
    $q.loading.hide();
  }
}
init();
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
