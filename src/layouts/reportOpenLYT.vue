<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="bg-grey-3 text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between row">
        <div class="col">
          <span class="text-grey">Helpers</span>
          <q-icon name="navigate_next" color="primary" />
          <span class="text-h6">Rerporte Aperturas de Cajas</span>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <!-- <q-table :rows="descuadre" /> -->
      <q-separator spaced inset vertical dark />
      <!-- <q-table :rows="devolucion" /> -->
      <q-separator spaced inset vertical dark />
      <!-- <q-table :rows="retiradas" /> -->

    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { AppFullscreen, useQuasar } from "quasar";
import Chart from 'chart.js/auto';
import dayjs from "dayjs";
import ExcelJS from 'exceljs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import OpenApi from 'src/API/OpenCash.js';
import UserToolbar from "src/components/UserToolbar.vue";
import ApiAssist from "src/API/assistApi";
import { useVDBStore } from "src/stores/VDB";
import axios from "axios"; //para dirigirme bro
import { assist } from "src/boot/axios";
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const $user = useVDBStore();
const VDB = useVDBStore();

const cuts = ref([]);


const descuadre = computed(() => cuts.value._type == 1);
const devolucion = computed(() => cuts.value._type == 2);
const retiradas = computed(() => cuts.value._type == 3);


const init = async () => {
  let sid = VDB.session.store.id;
  const resp = await OpenApi.getCutsBoxes(sid)
  if (resp.fail) {
    console.log(resp)
  } else {
    cuts.value = resp
    console.log(resp)
  }
}

init();
// if ($user.session.rol === 'adm' || $user.session.rol === 'root') {
//   init()
// } else {
//   $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
//   $router.replace('/');
// }
</script>
