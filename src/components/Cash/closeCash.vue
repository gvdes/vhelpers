<template>
  <q-card>
    <q-card-section class="row text-center  text-bold">
      Indica la declaracion de efectivo en terminal y procede con el cierre
    </q-card-section>
    <q-card-section class="text-center text-bold text-h4">
      $ {{total}}
    </q-card-section>
    <q-card-section class="row">
      <div class="col">
        <div class="text-center text-bold text-overline">Monedas</div>
        <q-separator spaced inset vertical dark />
        <div v-for="(mone, index) in closeBox.Monedas" class="">
          <div class="row flex justify-center">
            <div class="col text-overline">$ {{ mone.key }}</div>
            <div class="col"><q-input v-model="mone.val" type="number" dense outlined /></div>
            <q-separator spaced inset vertical dark />
            <div class="col text-overline text-bold"> ${{ mone.key * mone.val }} </div>
            <q-separator spaced inset vertical dark />
          </div>
          <q-separator spaced inset vertical dark />
        </div>
      </div>
      <div class="col">
        <div class="text-center text-bold text-overline">Billetes</div>
        <q-separator spaced inset vertical dark />
        <div v-for="(mone, index) in closeBox.Billetes" class="">
          <div class="row flex justify-center">
            <div class="col text-overline">$ {{ mone.key }}</div>
            <div class="col"><q-input v-model="mone.val" type="number" dense outlined /></div>
            <q-separator spaced inset vertical dark />
            <div class="col text-overline text-bold"> ${{ mone.key * mone.val }} </div>
            <q-separator spaced inset vertical dark />
          </div>
          <q-separator spaced inset vertical dark />
        </div>
      </div>

    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Cancelar" color="negative" @click="cashLYT.closeDialogModule()" />
      <q-btn flat label="Cerrar Caja" color="positive" @click="boxClose" />
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
const cash = ref(null)


const closeBox = ref({
  state: false,
  Monedas: [
    { key: 10, val: 0 },
    { key: 5, val: 0 },
    { key: 2, val: 0 },
    { key: 1, val: 0 },
    { key: .50, val: 0 },
  ],
  Billetes: [
    { key: 20, val: 0 },
    { key: 50, val: 0 },
    { key: 100, val: 0 },
    { key: 200, val: 0 },
    { key: 500, val: 0 },
  ]
})

const total = computed(() => closeBox.value.Monedas.reduce((a = 0, v) => a + v.key * v.val, 0) + closeBox.value.Billetes.reduce((a = 0, v) => a + v.key * v.val, 0))

const boxClose = async () => {
  $q.loading.show({message:'Cerrando Caja'})
  let data = {
    close:closeBox.value,
    cash:cashLYT.cash,
    total:total.value,
    uid: VDB.session.credentials.id
  }
  console.log(data)
  const resp = await cashApi.closeCash(data)
  console.log(resp)
  if(resp.fail){
    console.log(resp);
  }else{
    console.log(resp);
    $router.push('/cashRegisters')
    cashLYT.closeDialogModule()
    $q.loading.hide();
  }
}


</script>
