<template>
  <q-page padding>

    <div class="q-mb-xl">
      <q-list bordered class="text-bold " dense>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="list" />
          </q-item-section>
          <q-item-section>Modulos</q-item-section>
        </q-item>
      </q-list>
      <div v-for="(config, index) in configs" :key="index">
        <q-list bordered dense>
          <q-item tag="label" clickable v-ripple>
            <q-item-section>{{ config.name }}</q-item-section>
            <q-item-section side>
              <q-toggle color="primary" v-model="config.config[0].pivot.active" :false-value="0" :true-value="1" @update:model-value="activeModules(config)"   />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <q-separator />


    <div class="q-mb-xl">
      <q-list bordered class="text-bold " dense>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="point_of_sale" />
          </q-item-section>
          <q-item-section>Cajas</q-item-section>
        </q-item>
      </q-list>
      <div v-for="(cash, index) in cashs" :key="index">
        <q-list  bordered dense>
          <q-item  tag="label" clickable v-ripple>
            <q-item-section>{{ cash.name }}</q-item-section>
            <q-item-section side>
              <q-toggle color="primary" v-model="cash._status" :false-value="2" :true-value="1" @update:model-value="changeStatus(cash)"   :disable="isLastActive(cash)"   />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>

</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import catalogApi from 'src/API/catalogApi'
import orderApi from 'src/API/orderApi'
import { vizmedia } from "boot/axios"
import { useVDBStore } from 'stores/VDB';
import { useOrderStore } from 'stores/OrderStore';
import { useQuasar } from 'quasar';
import UserToolbar from "src/components/UserToolbar.vue";
import { $sktOrders } from 'boot/socket';
import { $sktRestock } from 'boot/socket';
const $route = useRoute();
const $router = useRouter();
const $orderStore = useOrderStore();
$orderStore.setTitle('CONFIGURACION');
$orderStore.setshowLyt(true);
const $q = useQuasar();
const VDB = useVDBStore()


const configs = ref([])
const cashs = ref([])

const init = async () => {
  $q.loading.show({message:'Obteniendo Informacion'})
  const resp = await orderApi.getSettings(VDB.session.store.id_viz);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    configs.value = resp.config;
    cashs.value = resp.cash
    $q.loading.hide();
  }
}

const changeStatus = async (cash) => {
  console.log(cash)
  $q.loading.show({messsage:'Cambiando Estado Caja'})
  const resp = await orderApi.changeStatusCash(cash)
  if(resp.fail){
    console.log(resp);
  }else{
    console.log(resp);
    $q.loading.hide();
    let mssg = cash._status == 2 ? 'Desactivada' :'Activada'
    $q.notify({message:`${cash.name} ${mssg}`, type:`${cash._status == 2 ? 'negative': 'positive'}`, position:'top'})
  }
}

const isLastActive = (cash) =>  {
  const activos = cashs.value.filter(c => c._status == 1);
  return activos.length === 1 && cash._status == 1;
}

const activeModules = async (config) => {
  console.log(config.config[0].pivot)
  let cnfg = config.config[0].pivot
  $q.loading.show({message:'Cambiando Status'})
  const resp = await orderApi.changeConfig(cnfg)
  if(resp.fail){
    console.log(resp)
  }else{
    console.log(resp)
    $q.loading.hide();
    let mssg = cnfg.active == 0 ? 'Desactivada' :'Activada'
    $q.notify({message:`${config.name} ${mssg}`, type:`${cnfg.active == 0 ? 'negative': 'positive'}`, position:'top'})
  }
}


init()
</script>
