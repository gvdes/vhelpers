<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->

    <q-header bordered class="bg-grey-3 ">
      <UserToolbar />
    </q-header>

    <q-page-container>
      <!-- This is where pages get injected -->


      <q-page class="flex flex-center" padding>
        <q-list separator>
          <q-select v-model="stores.val" :options="stores.opts" label="Selecciona Sucursal" :option-label="opt => opt.store.name" filled
            @update:model-value="changeStore" v-if="stores.opts.length > 1" />
          <div class="q-py-md text-center">
            <div class="text-h4 text-indigo-10">Menu</div>
            <div class="text-grey-5">Vhelpers</div>
          </div>

          <q-item clickable v-ripple v-for="(module, idx) in modules" :key="idx" :to="module.module.path">
            <q-item-section>
              <q-item-label class="text-h6">{{ module.module.name }}</q-item-label>
              <q-item-label caption>{{ module.module.desc }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-avatar flat color="transparent" text-color="primary" icon="arrow_forward" />
            </q-item-section>
          </q-item>
        </q-list>
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
const modules = ref ([]);
const stores = ref({
  val:VDB.session,
  opts:[]
})
const init = async  () => {
  $q.loading.show({message:'Obteniendo Informacion'})
  const resp = await authsApi.getResources(user.credentials.id)
  if(resp.fail){
  console.log(resp)
  }else{
    console.log(resp)
    stores.value.opts = resp.stores
    modules.value = resp.rol.modules
    $q.loading.hide()
  }


}

const changeStore = () => {
  $q.loading.show({ message: 'Cambiando sucursal' })
  VDB.session.store = stores.value.val.store
  VDB.setSession({
    ...VDB.session,
    store: stores.value.val.store
  })
  console.log(VDB.session)
  $q.loading.hide()
}

init();

</script>
