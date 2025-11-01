<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>

    <q-page-container>
      <q-toolbar class="justify-between">
        <div class="row items-center">
          Helpers
          <q-icon name="navigate_next" color="primary" class="q-mx-sm" />
          <span class="text-h6">Ficha Atencion </span>
        </div>
      </q-toolbar>
      <div class="text-center">
        <!-- {{ VDB.session.credentials.staff.complete_name }} -->
      </div>
      <q-separator spaced inset vertical dark />
      <div class=" q-ml-lg q-mr-lg">
        <q-select v-model="dependients.val" :options="dependients.opts" label="Colaborador" option-label="complete_name" filled />
      </div>
      <q-separator spaced inset vertical dark />
      <div class=" q-ml-lg q-mr-lg row">
        <q-select class="col" v-model="impresoras.val" :options="impresoras.opts" label="Impresora" filled option-label="name"
          @update:model-value="selected" />
          <q-separator spaced inset vertical dark />
          <q-input v-model="number" type="number" label="Cantidad" filled :min="1" />
      </div>
      <q-separator spaced inset vertical dark />
      <div class="flex justify-center">
        <q-btn rounded flat color="primary" icon="print" size="xl" :disabled="!impresoras.val" @click="printFich"  />
      </div>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import dayjs from 'dayjs';
import { computed, ref } from 'vue';
import { useLayoutStore } from 'stores/layoutStore.js'; // ✅ Ahora solo importas
import printApi from "src/API/print";


const VDB = useVDBStore();
const layout = useLayoutStore();
const $router = useRouter();
const $route = useRoute();
const $q = useQuasar();

const impresoras = ref({
  val: null,
  opts: []
});
const number = ref(1)
const dependients = ref({
  opts:[],
  val:VDB.session.credentials.staff
});

const impre = async () => {
  let idstore = VDB.session.store.id;
  console.log(idstore)
  // console.log(host);
  // let impr = `http://${host}/access/public/modify/getPrinter`;
  const resp = await printApi.getPrints(idstore)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    impresoras.value.opts = resp
    console.log("Impresoras listas :)")
  }
}

const init = async () => {
  $q.loading.show({message:'OBTENIENDO COLABORADORES'})
  let idstore = VDB.session.store.id;
  console.log(idstore)
  const resp = await printApi.getColab(idstore)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    dependients.value.opts = resp
    console.log("Impresoras listas :)")
    $q.loading.hide()
  }
}

const printFich = async () => {
  $q.loading.show({message:'Imprimiendo'})
  let data = {
    print:impresoras.value.val.ip_address,
    staff:dependients.value.val,
    amount:number.value
  }
  const resp = await printApi.PrintAttention(data)
  if(resp.fail){
    console.log(resp)
  }else{
  console.log(resp)
  $q.loading.hide();
  $q.notify({type:'positive',icon:'check'})
  }

}

const selected = () => {
  $q.localStorage.set("LUP", { wkp: VDB.session.store, printer: impresoras.value.val });
};
const LUP = $q.localStorage.getItem("LUP");
if (LUP) {
  // wkp.value = LUP.wkp;
  impresoras.value.val = LUP.printer;
}
impre()
init()
</script>
