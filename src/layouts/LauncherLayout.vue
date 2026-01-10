<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->

    <q-header bordered class="bg-grey-3 ">
      <UserToolbar />
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center" padding>
        <animateStudio ref="robot" />
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'src/stores/VDB'
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import UserToolbar from 'src/components/UserToolbar.vue';
import authsApi from "src/API/auth.js";
// import { requestPermission } from 'boot/firebase'
import { exportFile, useQuasar } from 'quasar';
import animateStudio from 'src/components/animateStudio.vue';

const VDB = useVDBStore();
const $router = useRouter();
const user = VDB.session;
const $q = useQuasar();
// const canvas = ref(null)
const robot = ref(null)
const isDesktop = !('ontouchstart' in window)
// const icons = ['✈️', '🚗', '💫', '⭐', '🎈', '🎎', '🎁']
const greetings = ref([
  "Que gusto verte!",
  "Excelente dia!",
  "Que sea un gran dia!",
  "Paciencia crack, paciencia.",
  "Como va todo?",
  "Empecemos...",
  "Manos a la obra!",
  "Exito!",
  "Vacaciones??... pff...",
  "Si buscas resultados distintos, no hagas siempre lo mismo.",
  "Quien tiene claro un porque? Puede superar casi cualquier cómo"
]);


const greeting = computed(() => greetings.value[Math.floor(Math.random() * greetings.value.length)]);

onMounted(() => {

  robot.value.setIdle()
})
</script>
<style>
.overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.content {
  position: relative;
  z-index: 20;
}
</style>
