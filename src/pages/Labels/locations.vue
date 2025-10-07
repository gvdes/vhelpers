<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="row" v-if="sections.length > 0">
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
            <!-- <q-btn class="col" flat icon="send" :disable="niveles.length === 0 || !niveles[0].selected" @click="obtenerProductos" /> -->
            <q-btn  icon="picture_as_pdf" flat  @click="createPdf" :disable="labels <= 0" />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-separator spaced inset vertical dark />
    <q-table
      :rows="labels"
      :columns="table.columns"
    />
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import locationsApi from 'src/API/locationsApi';
import { ref, computed, watch } from 'vue';
import { useQuasar } from 'quasar';
import labelsPDF from 'src/Pdf/labels/labels.js'


const VDB = useVDBStore();
const $q = useQuasar();

const sections = ref([]);
const selectedUbicacion = ref(null);
const labels = ref([]);
const niveles = ref([]);
const deepMax = ref(0);
const table = ref({
  columns:[
    {name:'id',label:'ID',field: r=> r.id, align:'center'},
    {name:'name',label:'NOMBRE',field: r=> r.name, align:'left'},
    {name:'alias',label:'ALIAS',field: r=> r.alias, align:'left'},
    {name:'path',label:'PATH',field: r=> r.path, align:'left'},
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

const createPdf = () => {
  labelsPDF.locationsWarehouse(labels.value,VDB.session.credentials.nick)
}

init();
watch(
  niveles,
  (newNiveles) => {
    const seleccionados = newNiveles.filter(n => n.selected !== null);
    if (seleccionados.length) {
      const ultimoNivel = seleccionados[seleccionados.length - 1];
      const children = getChildren(ultimoNivel.selected);
      labels.value = children;
    }
  },
  { deep: true }
);
</script>
