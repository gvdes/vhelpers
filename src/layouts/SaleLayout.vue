<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <q-page padding>

      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida

import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import saleApi from 'src/API/saleApi';
import dayjs from 'dayjs';
const $router = useRouter();
const VDB = useVDBStore();
const $q = useQuasar();
dayjs.locale('es')
const firstDay = dayjs().startOf('month').format('YYYY-MM-DD')
const today = dayjs().format('YYYY-MM-DD')


const index = async () => {
  let dates = {
    to:firstDay,
    from:today
  }
  const resp = await saleApi.index(dates)
  console.log(resp)
}

index()
</script>
