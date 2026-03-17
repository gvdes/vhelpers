<template>
  <div class="candy">
    <animateStudio ref="robot" />
    <div v-if="robotStore.message" class="bubble">
      {{ robotStore.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRobotStore } from 'src/stores/robot'
import animateStudio from 'src/components/animateStudio.vue';


const robotStore = useRobotStore()
const robot = ref(null)

watch(() => robotStore.state, (val) => {
  if (!robot.value) return

  if (val === 'idle') robot.value.setIdle()
  if (val === 'loading') robot.value.setLoading()
  if (val === 'error') robot.value.setError()
  if (val === 'success') robot.value.setSuccess()
})
</script>
