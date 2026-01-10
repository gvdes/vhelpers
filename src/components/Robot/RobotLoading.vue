<template>
  <div class="flex flex-center" >
    <animateStudio ref="robot"  />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import animateStudio from 'src/components/animateStudio.vue'

const props = defineProps({
  message: {
    type: String,
    default: 'Cargando...'
  }
})
const robot = ref(null)

onMounted(() => {
  robot.value?.setLoading()
})
</script>
