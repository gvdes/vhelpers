<template>
  <q-card>
    <q-card-section class="text-center text-bold text-h6">
      Reimprecion de Tickets
    </q-card-section>
    <q-card-section>
      <q-form @submit="ReimpresionTck" class="q-gutter-md">
        <q-input v-model="impTck.val" type="text" label="Numero de Ticket" filled autofocus />
      </q-form>
    </q-card-section>
    <q-card-section>
      <q-btn class="full-width bg-black text-white" flat label="Reimprimir Ultimo Ticket" @click="reimprimirUltTck" />
    </q-card-section>
    <q-card-actions>
      <q-btn flat icon="close" color="negative" @click="reset" />
      <q-space />
      <q-btn flat icon="send" color="positive" @click="ReimpresionTck" />
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

const impTck = ref({
  type: null,
  val: null,
  cash: cashLYT.cash
});

const reimprimirUltTck = async () => {
  $q.loading.show({message:'Reimprimiendo ticket'})
  impTck.value.type = 2
  const resp = await cashApi.reprintSale(impTck.value)
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.loading.hide()
    console.log(resp)
    reset();
  }

}

const ReimpresionTck = async () => {
  $q.loading.show({message:'Reimprimiendo ticket'})
  impTck.value.type = 1
  const resp = await cashApi.reprintSale(impTck.value)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide()
    reset()
  }
}


const reset = () => {
  impTck.value = {
    type: null,
    val: null,
    cash: cashLYT.cash
  }
  cashLYT.closeDialogModule()
}

</script>
