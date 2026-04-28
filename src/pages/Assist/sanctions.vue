<template>
  <q-page padding>

  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import assistApi from "src/API/colabAPI.js";
import { exportFile, useQuasar, date } from 'quasar';
import addDeviceCm from "src/components/Assist/addDevice.vue";
import dayjs from 'dayjs';
import { AssistStore } from 'stores/AssistStore';
const AssistLYT = AssistStore();

const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
AssistLYT.setTitle('Sanciones')
AssistLYT.setShowBtns(false);
AssistLYT.setshowSanctBtns(true);

const init = async () => {
  let data = {
    sid: VDB.session.store.id,
    uid: VDB.session.credentials.id,
    zone: VDB.session.credentials.zone ? VDB.session.credentials.zone.stores.map(e => e.id) : null
  }
  const resp = await assistApi.resourcesSanctions(data)
  if(resp.fail){
    console.log(resp)
  }else{
    console.log(resp)
    AssistLYT.setUsers
  }

}

init()
</script>
