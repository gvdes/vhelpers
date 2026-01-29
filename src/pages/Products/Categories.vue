<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-4">
        <q-card>
          <q-card-section class="row items-center justify-between">
            <div class="text-h6">Categorías</div>
            <q-btn icon="add" flat round @click="createSection" />
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-tree :nodes="tree" node-key="id" label-key="name" default-expand-all v-model:selected="selectedId"
              @update:selected="onSelect">
              <template #default-header="prop">
                <div class="row items-center full-width">
                  <div class="col">
                    {{ prop.node.name }}
                    <q-badge dense class="q-ml-sm" color="grey-6">
                      {{ levelLabel(prop.node.deep) }}
                    </q-badge>
                  </div>
                  <q-btn v-if="prop.node.deep < 2" dense flat icon="add" size="sm"
                    @click.stop="createChild(prop.node)" />
                </div>
              </template>
            </q-tree>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-8">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              {{ form.id ? 'Editar' : 'Crear' }} {{ levelName }}
            </div>
            <q-space />
            <div class="text-caption" v-if="form._root">
              {{categories.find(e => e.id == form._root).name}} => {{ form.name }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-gutter-md">
            <q-input v-model="form.name" label="Nombre" filled dense />
            <q-input v-model="form.alias" label="Alias" filled dense />
            <q-input v-model="form.prefix" label="Prefijo" filled dense />
            <q-input v-model="form.num" label="Número" filled dense />
            <q-input v-if="form.deep > 0" :model-value="parentName" label="Pertenece a" filled readonly dense disable />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" @click="resetForm" />
            <q-btn color="primary" label="Guardar" @click="save" />
          </q-card-actions>
        </q-card>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Notify } from 'quasar'
import { useProductStore } from 'stores/ProductsStore'
import productApi from 'src/API/productsApi.js';
import { useQuasar, date } from 'quasar';
const $q = useQuasar();
const productStore = useProductStore()
productStore.setTitle('Categorias');

const categories = computed(() => productStore.categories)
const selectedId = ref(null)

const emptyForm = () => ({
  id: null,
  name: '',
  alias: '',
  prefix: '',
  num: '',
  deep: 0,
  _root: null
})

const form = ref(emptyForm())

const buildTree = (list, root = null) =>
  list
    .filter(i => i._root === root)
    .map(i => ({
      ...i,
      children: buildTree(list, i.id)
    }))

const tree = computed(() => buildTree(categories.value))


const levelName = computed(() => {
  if (form.value.deep === 0) return 'Sección'
  if (form.value.deep === 1) return 'Familia'
  return 'Categoría'
})
const parentName = computed(() => {
  const p = categories.value.find(c => c.id === form.value._root)
  return p ? p.name : ''
})

const levelLabel = (deep) =>
  deep === 0 ? 'S' : deep === 1 ? 'F' : 'C'

const onSelect = (id) => {
  const item = categories.value.find(i => i.id === id)
  if (!item) return
  form.value = { ...item }
}

const createSection = () => {
  form.value = emptyForm()
  form.value.deep = 0
}

const createChild = (parent) => {
  form.value = emptyForm()
  form.value.deep = parent.deep + 1
  form.value._root = parent.id
}

const save = async () => {
  if (!form.value.name) {
    $q.notify({message:'El nombre es obligatorio',type:'warning'})
    return
  }
  $q.loading.show({ message: `Creando ${levelName}` })
  const resp = await productApi.addCategory(form.value);
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.loading.hide()
    console.log(resp)
    productStore.createOrUpdateCategory(resp)
    resetForm()
  }
}

const resetForm = () => {
  form.value = emptyForm()
  selectedId.value = null
}

watch(() => form.value._root, (val) => {
  if (val && val === form.value.id) {
    Notify.warning('No puede ser su propio padre')
    form.value._root = null
  }
})
</script>
