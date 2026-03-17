<template>
  <div >
    <div v-for="(nivel, index) in niveles" :key="index" >
      <q-select v-model="nivel.selected" :options="nivel.options" :label="`Nivel ${ index + 1 }`" option-value="id"
        option-label="name" emit-value map-options @update:model-value="val => onSelectChange(val, index)" dense filled />
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

const  onSelectChange = (val, index) => {
  // console.log(val)
  niveles.value.splice(index + 1)
  const children = getChildren(val)
  if (children.length) {
    niveles.value.push({
      options: children,
      selected: null
    })
  }
}
const obtenerProductos = () => {
  const seleccionados = niveles.value.filter(n => n.selected !== null)
  const ultimoNivel = seleccionados[seleccionados.length - 1]
  emit('obtProducts',ultimoNivel)
}
</script>
