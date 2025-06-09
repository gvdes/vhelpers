<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->

    <q-header bordered class="bg-grey-3 ">
      <UserToolbar />
    </q-header>

    <q-page-container>
      <!-- This is where pages get injected -->


      <q-page class="flex flex-center" padding>


        <div class="row q-pa-md q-gutter-md">
          <div class="col">
            <div class="text-h4 text-grey-8 text-center">
              <div>Hola</div>
              <div class="text-primary">{{ VDB.session.name }}</div>
              <span class="text-primary"></span>
            </div>

            <div class="text-center anek-lg text-h5 text-grey-6">{{ greeting }}</div>

            <div class="q-py-lg text-center">
              <q-img :src="`/public/avatares/avatar${avatar}.png`" style="width: 170px;" />
            </div>
          </div>
        </div>

      </q-page>
      <!-- <router-view /> -->
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'src/stores/VDB'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import UserToolbar from 'src/components/UserToolbar.vue';
import authsApi from "src/API/auth.js";
import { exportFile, useQuasar } from 'quasar';

const VDB = useVDBStore();
const $router = useRouter();
const user = VDB.session;
const $q = useQuasar();
// const modules = ref ([]);
// const stores = ref({
//   val:VDB.session,
//   opts:[]
// })
// const init = async  () => {
//   $q.loading.show({message:'Obteniendo Informacion'})
//   const resp = await authsApi.getResources(user.credentials.id)
//   if(resp.fail){
//   console.log(resp)
//   }else{
//     // console.log(resp)
//     stores.value.opts = resp.stores
//     modules.value = resp.rol.modules
//     $q.loading.hide()
//   }


// }

// const changeStore = () => {
//   $q.loading.show({ message: 'Cambiando sucursal' })
//   VDB.session.store = stores.value.val.store
//   VDB.setSession({
//     ...VDB.session,
//     store: stores.value.val.store
//   })
//   console.log(VDB.session)
//   $q.loading.hide()
// }

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
const avatar  = computed(() => Math.floor(Math.random() * 6));


</script>
