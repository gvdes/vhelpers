<template>
  <q-card>
    <q-card-section class="row items-center">
      <div class="col">
        Creacion: <span class="text-bold">{{ dayjs().format('YYYY-MM-DD') }}</span> <br>
        Creador: <span class="text-bold">{{ VDB.session.credentials.staff.complete_name }}</span>
      </div>
      <q-separator spaced inset vertical dark />
      <q-input v-model="config.notes" type="text" label="Notas" />
      <q-separator spaced inset vertical dark />
      <q-select class="" v-model="config.type.val" :options="config.type.opts" label="Tipo" disable />
      <q-separator spaced inset vertical dark />
      <q-select class="col" v-model="config.option.val" :options="config.option.opts" label="Seleccion"
        :disable="config.option.val ? true : false" @update:model-value="selectedOption" />
    </q-card-section>
  </q-card>
  <q-card bordered>
    <q-card-section>
      <q-expansion-item expand-separator icon="fas fa-users" label="Responsables" header-class="text-grey-5"
        v-model="expands.team" :caption="`Exh: ${config.resexh.length} -- Gen ${config.resgen.length}`">
        <q-card-section>
          <q-input v-model="tableUsers.filter" type="text" label="Buscar" />
          <q-separator spaced inset vertical dark />
          <div class="row">
            <div class="col">
              <q-table selection="multiple" v-model:selected="config.resexh" title="Ventas"
                :rows="cycleStore.users.filter(e => [8, 9].includes(e._rol))" :columns="tableUsers.columns"
                :filter="tableUsers.filter" :filter-method="customFilter" />
            </div>
            <q-separator spaced inset vertical dark />
            <div class="col">
              <q-table selection="multiple" v-model:selected="config.resgen" title="Almacen"
                :rows="cycleStore.users.filter(e => [4, 24].includes(e._rol))" :columns="tableUsers.columns"
                :filter="tableUsers.filter" :filter-method="customFilter" />
            </div>
          </div>
        </q-card-section>
      </q-expansion-item>
    </q-card-section>
  </q-card>
  <q-separator spaced inset vertical dark />


  <q-card class="my-card q-ml-md q-mr-md " bordered v-if="config.option.val">
    <div v-if="config.option.val.id == 1" class="row">
      <q-select class="col" v-model="selectedUbicacion" :options="cycleStore.locations" label="ALMACEN" filled
        optionLabel="name" dense />
      <q-separator spaced inset vertical dark />
      <selectsSections class="col" v-if="selectedUbicacion" :sections="selectedUbicacion.sections"
        @obtProducts="obtenerProductsSection" />
    </div>
  </q-card>
  <q-separator />

  <q-card class="my-card" bordered v-if="config.products.length">
    <q-card-section>
      <q-table :rows="config.products" :columns="tableProducts.columns">
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th auto-width v-if="config.option.val.id == 3" />
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
            <q-td auto-width v-if="config.option.val.id == 3">
              <q-btn size="sm" color="negative" round dense @click="deleteRow(props.row)" icon="delete" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
  <q-footer v-if="config.option.val">
    <q-card v-if="config.option.val.id == 3" class="row">
      <ProductAutocomplete class="col" :checkState="true" @input="add" @agregar="agregar"
        :with_locations_loc="VDB.session.credentials._rol" />
      <q-separator spaced inset vertical dark />
      <q-btn color="primary" icon="send" @click="createCyclico" />
    </q-card>
    <q-card v-if="config.option.val.id != 3">
      <q-btn class="full-width" color="primary" label="Crear Ciclico :p" @click="createCyclico" />
    </q-card>
  </q-footer>

  <q-dialog v-model="expands.selectSection" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Selecciona una Seccion</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-select v-model="config.section" :options="cycleStore.sections" label="Seccion" filled option-label="name" multiple use-chips />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat @click="obtener" icon="send" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';
import selectsSections from 'src/components/Inventory/Locations.vue';
import dayjs from 'dayjs';
import { useVDBStore } from 'src/stores/VDB';
import { cyclecountStore } from 'stores/cyclecountStore';
import locationsApi from 'src/API/locationsApi';
import CDB from 'src/API/cicsdb';
import Config from 'src/pages/Preorders/Config.vue';
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const VDB = useVDBStore();
const cycleStore = cyclecountStore()
const selectedUbicacion = ref(null)
const emit = defineEmits(['create'])
const props = defineProps({
  "config": { default: {}, type: Object },
})
const expands = ref({
  team: false,
  selectSection: false,
})
const tableUsers = ref({
  columns: [
    { name: 'name', label: 'Nombre', field: r => r.staff?.complete_name, align: 'left' },
  ],
  filter: null
})
const tableProducts = ref({
  columns: [
    { name: 'code', label: 'Codigo', field: r => r.code, align: 'left' },
    { name: 'description', label: 'Descripcion', field: r => r.description, align: 'left' },
    { name: 'locationExh', label: 'Exhibicion', field: r => r.locations?.filter(e => e.celler._type == 2)?.map(e => e.path).join('/'), align: 'left' },
    { name: 'locationGen', label: 'General', field: r => r.locations?.filter(e => e.celler._type == 1)?.map(e => e.path).join('/'), align: 'left' },
  ],
  filter: null
})

const validCiclico = computed(() =>
  props.config.type.val &&
  props.config.option.val &&
  props.config.notes &&
  props.config.resexh.length > 0 &&
  props.config.resgen.length > 0 &&
  props.config.products.length > 0)

const customFilter = (rows, terms) => {
  const t = terms.toUpperCase()
  return rows.filter(row => {
    const normalMatch = Object.values(row).some(val =>
      String(val ?? '').toUpperCase().includes(t)
    )
    const staffMatch =
      row.staff?.complete_name.toUpperCase().includes(t) ?? false
    return normalMatch || staffMatch
  })
}

const selectedOption = (selected) => {
  if (selected.id == 1) {
    expands.value.selectSection = true
  } else if (selected.id == 2) {
    expands.value.selectSection = true
  }
}

const agregar = (opt) => {
  console.log(opt)
  let inx = props.config.products.findIndex(e => e.id == opt.id)
  if (inx >= 0) {
    $q.notify({ message: 'El producto ya esta en la lista :)', type: 'warning', position: 'top' })
  } else {
    props.config.products.push(opt);
  }
}

const add = (opt) => {
  console.log(opt)
  let inx = props.config.products.findIndex(e => e.id == opt.id)
  if (inx >= 0) {
    $q.notify({ message: 'El producto ya esta en la lista :)', type: 'warning', position: 'top' })
  } else {
    props.config.products.push(opt);
  }
}

const obtener = async () => {
  if (props.config.option.val.id == 2) {
    $q.loading.show({ message: 'Obteniendo Datos' });
    let data = {
      workpoint: VDB.session.store.id_viz,
      seccion: props.config.section.map(e => e.id)
    };
    console.log(data);
    const resp = await CDB.obtProductSLocation(data)
    if (resp.fail) {
      console.log(resp)
    } else {
      console.log(resp);
      props.config.products = resp
      $q.loading.hide()
    }
  }
}

const obtenerProductsSection = async (nivel) => {
  $q.loading.show({ message: 'Obteniendo Productos' })
  let data = {
    ubicacion: nivel.selected,
    workpoint: VDB.session.store.id_viz,
    seccion: props.config.section.map(e => e.id)
  }
  console.log(data);
  const resp = await CDB.obtProductSections(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    props.config.products = resp
    $q.loading.hide()
  }
}

const deleteRow = (del) => {
  console.log(del)
  let inx = props.config.products.findIndex(e => e.id == del.id)
  if (inx >= 0) {
    props.config.products.splice(inx, 1);
  }
}

const createCyclico = () => {
  if (validCiclico.value) {
    emit('create')
  } else {
    if (!props.config.type.val) {
      $q.notify({ message: 'Falta un tipo', type: 'warning', position: 'left' })
    }
    if (!props.config.option.val) {
      $q.notify({ message: 'Falta una opción', type: 'warning', position: 'left' })
    }
    if (!props.config.notes) {
      $q.notify({ message: 'Faltan notas', type: 'warning', position: 'left' })
    }
    if (props.config.resexh.length === 0) {
      $q.notify({ message: 'Falta Responsable exhibición', type: 'warning', position: 'left' })
    }
    if (props.config.resgen.length === 0) {
      $q.notify({ message: 'Falta Responsable general', type: 'warning', position: 'left' })
    }
    if (props.config.products.length === 0) {
      $q.notify({ message: 'Debe agregar productos', type: 'warning', position: 'left' })
    }
  }

}


</script>
