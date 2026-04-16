<template>
  <q-layout view="hHh Lpr fFf">
    <q-header bordered class="bg-grey-3 ">
      <UserToolbar />
    </q-header>

    <q-page-container>
      <q-page class="flex flex-center column" padding>
        <div>
          <animateStudio ref="robot" />
        </div>
        <div style="width: 70%;">
          <q-table v-if="favorites.items.length" @row-click="(a, b) => $router.push(`/${b.path}`)"
            :rows="favorites.items" grid flat bordered :columns="[
              { name: 'name', label: '', field: r => r.name, align: 'left' }
            ]" dense hide-bottom />
        </div>
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
import { useFavoritesStore } from 'src/stores/favorites'
const favorites = useFavoritesStore()

const VDB = useVDBStore();
const $router = useRouter();
const user = VDB.session;
const $q = useQuasar();
const robot = ref(null)
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
