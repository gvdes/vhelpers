<template>
  <div >
    <div v-for="(nivel, index) in niveles" :key="index" >
      <q-select class="col" v-model="nivel.selected" :options="nivel.options" :label="`Nivel ${ index + 1 }`" option-value="id"
        option-label="name" emit-value map-options @update:model-value="val => onSelectChange(val, index)" dense filled multiple
        use-chips />
        <q-separator spaced inset vertical dark />
    </div>
    <div class="text-right">
          <q-btn flat icon="send" :disable="!niveles[0].selected" @click="obtenerProductos" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  "sections": { default: [], type:Array },
})
const emit = defineEmits(['obtProducts'])

const getChildren = (rootId) => {
  return props.sections.filter(s => s.root === rootId)
}
const niveles = ref([
  {
    options: props.sections.filter(s => s.root === 0),
    selected: null
  }
])

const onSelectChange = (val, index) => {
  // val ahora es un array de IDs
  const lastSelected = val[val.length - 1]
  niveles.value.splice(index + 1)
  const children = getChildren(lastSelected)
  if (children.length) {
    niveles.value.push({
      options: children,
      selected: []
    })
  }
}
const obtenerProductos = () => {
  const seleccionados = niveles.value.filter(e => e.selected.length > 0)
  const ultimoNivel = seleccionados[seleccionados.length - 1]
  emit('obtProducts',ultimoNivel)
}
</script>
