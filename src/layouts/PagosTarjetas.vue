<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Consulta de Tarjetas</span>
        </div>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
        <q-input v-model="text" type="number" label="Total" filled />
        </q-form>
        
       {{ tarjSuc}}


      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import {exportFile ,useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import { assist } from "src/boot/axios";


const VDB = useVDBStore();
const $q = useQuasar();

const text = ref(null)
const tarjSuc = ref([])

const onSubmit = () => {
  tarjSuc.value.push(text.value)
  text.value = null
}

</script>
