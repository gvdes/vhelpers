<template>
  <q-card>
    <q-card-section class="text-center text-bold text-h6">
      Reutilizar Documento
    </q-card-section>
    <q-card-section>
      <q-select v-model="optionsReutiliza.val" :options="optionsReutiliza.opts" label="Tipo de Documento" filled
        dense />
    </q-card-section>
    <q-card-section>
      <q-input v-model="optionsReutiliza.document" type="text" label="Documento" filled dense />
    </q-card-section>
    <q-card-actions>
      <q-btn flat icon="close" color="negative" @click="cashLYT.closeDialogModule()" />
      <q-space />
      <q-btn flat icon="send" color="positive" @click="Reutiliza" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import { useLayoutCash } from 'stores/cashLYT';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { exportFile, useQuasar, date } from 'quasar';
import dayjs from 'dayjs';
import { computed, ref, onMounted, watch } from 'vue';
import cashApi from 'src/API/cashApi';
import orderApi from 'src/API/orderApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const cashLYT = useLayoutCash();


const optionsReutiliza = ref({
  val: null,
  opts: [
    { value: 1, label: 'Presupuesto' },
    { value: 2, label: 'Ticket' },
    // {value:3, label:'Salida'},
  ],
  document: null
})

const Reutiliza = () => {

}



</script>
