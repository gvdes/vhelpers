<template>
  <q-page padding>

  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { UserStore } from 'stores/UsersStore';
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { exportFile, useQuasar, date } from 'quasar';
import userApi from "src/API/UserApi.js";
import reportExcel from 'src/Excel/Reports/users.js'
import viewRol from 'src/components/User/viewRol.vue';
const VDB = useVDBStore();
const $q = useQuasar();
const userLYT = UserStore();
userLYT.setTitle('Usuarios')




</script>
