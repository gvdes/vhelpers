<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <template v-if="!cashLYT.showtoolbar">
      <q-header class="bg-grey-3 text-dark" bordered>
        <UserToolbar />
        <q-separator />
      </q-header>
      <q-page-container>
        <q-toolbar class="justify-between">
          <div>
            <span class="text-grey">Helpers</span>
            <q-icon name="navigate_next" color="primary" />
            <span class="text-h6">Ventas Sucursales</span>
          </div>
        </q-toolbar>
        <router-view />
      </q-page-container>
    </template>
    <template v-else>
      <q-header class="transparent text-dark" reveal elevated bordered v-if="cashLYT.showtoolbar">
        <q-toolbar class="text-primary">
          <q-btn flat round dense @click="leftDrawerOpen = !leftDrawerOpen">
            <q-icon name="menu" />
          </q-btn>
          <q-toolbar-title class="text-black text-bold">
            {{ cashLYT.title }}
          </q-toolbar-title>
          <span class="text-black text-bold q-px-md">{{ cashLYT.date }}</span>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" side="left" elevated bordered reveal class="bg-grey-2">
        <q-separator spaced inset vertical dark />
        <div class="flex justify-start"><q-btn color="primary" icon="arrow_back" flat @click="exitLayout" /></div>
        <q-separator spaced inset vertical dark />
        <!-- <q-scroll-area class="fit q-pa-sm"> -->
        <q-list bordered v-for="(route, index) in modulesApp" :key="index">
          <q-item clickable v-ripple @click="cashLYT.openDialogModule(route.id)">
            <q-item-section avatar>
              <q-icon color="primary" :name="route.icon" />
            </q-item-section>
            <q-item-section>{{ route.name }}</q-item-section>
          </q-item>
        </q-list>
        <!-- </q-scroll-area> -->
      </q-drawer>
      <q-page-container>
        <q-tabs v-model="tab" class="bg-grey-11" dense>
          <q-route-tab name="prevent" icon="receipt_long" label="Preventa"
            :to="`/cashRegisters/${cashLYT.cash.id}/automate`" />
          <q-route-tab name="manual" icon="keyboard" label="Capturado"
            :to="`/cashRegisters/${cashLYT.cash.id}/standar`" />
        </q-tabs>
        <q-dialog v-model="openWithdrawal" persistent>
          <withdrawal />
        </q-dialog>

        <q-dialog v-model="openIngress" persistent>
          <Ingress />
        </q-dialog>

        <q-dialog v-model="openReprint" persistent>
          <reprintTCK />
        </q-dialog>

        <q-dialog v-model="openReutiliza" persistent>
          <reuse />
        </q-dialog>

        <q-dialog v-model="openCloseCash" persistent>
          <closeCash />
        </q-dialog>

        <q-dialog v-model="openRefunds" persistent>
          <Refunds />
        </q-dialog>

        <q-dialog v-model="openModify" persistent>
          <Modify />
        </q-dialog>

        <q-dialog v-model="openQuery" persistent>
          <Query />
        </q-dialog>

        <q-dialog v-model="openVouchers" persistent>
          <Vouchers />
        </q-dialog>
        <router-view />
      </q-page-container>
    </template>
  </q-layout>
</template>


<script setup>
import { useVDBStore } from 'stores/VDB';
import { useLayoutCash } from 'stores/cashLYT';
import UserToolbar from 'src/components/UserToolbar.vue';
import closeCash from 'src/components/Cash/closeCash.vue';
import withdrawal from 'src/components/Cash/withdrawal.vue';
import reprintTCK from 'src/components/Cash/reprintTCK.vue';
import reuse from 'src/components/Cash/reuse.vue';
import Ingress from 'src/components/Cash/Ingress.vue';
import Refunds from 'src/components/Cash/Refunds.vue';
import Modify from 'src/components/Cash/Modify.vue';
import Query from 'src/components/Cash/Query.vue';
import Vouchers from 'src/components/Cash/Voucher.vue';

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


const WSD = ref({ state: false });
const leftDrawerOpen = ref(false)
const tab = ref('prevent')

const exitLayout = () => {
  $router.push('/cashRegisters')
  leftDrawerOpen.value = false
}

const openWithdrawal = computed(() => cashLYT.dialogModule === 1);
const openIngress = computed(() => cashLYT.dialogModule === 2);
const openReprint = computed(() => cashLYT.dialogModule === 3);
const openReutiliza = computed(() => cashLYT.dialogModule === 4);
const openCloseCash = computed(() => cashLYT.dialogModule === 5);

const openRefunds = computed(() => cashLYT.dialogModule === 6);
const openModify = computed(() => cashLYT.dialogModule === 7);
const openQuery = computed(() => cashLYT.dialogModule === 8);
const openVouchers = computed(() => cashLYT.dialogModule === 9);

const modulesApp = computed(() => {
  if (VDB.session.rol == 'caj') {
    return cashLYT.modulesCashier
  } else if (VDB.session.rol == 'aud' || VDB.session.rol == 'root') {
    return cashLYT.modulesRoot
  } else if (VDB.session.rol == 'aud' || VDB.session.rol == 'root' || VDB.session.rol == 'gen' || VDB.session.rol == 'aux') {
    return cashLYT.modulesAdmin
  }
})


const init = async () => {
  $q.loading.show({ message: 'Obteniendo Caja' })
  let data = {
    uid: VDB.session.credentials.id,
    cash: $route.params.cid,
    sid: VDB.session.store.id
  }
  const resp = await cashApi.getCash(data);
  if (resp.fail) {
    if (resp.fail.status == 401) {
      $router.push('/cashRegisters')
      $q.loading.hide()
      $q.notify({ message: 'No tienes acceso a la caja', type: 'negative', position: 'center' })
    } else {
      console.log(resp)
    }
  } else {
    console.log(resp);
    cash.value = resp.cash
    cashLYT.setTitle(`${VDB.session.store.alias} - ${resp.cash.name}`)
    cashLYT.setDate(dayjs(resp.cash.cahier?.open_date).format('YYYY-MM-DD'))
    cashLYT.setshowtoolbar(true)
    cashLYT.setCash(resp.cash);
    cashLYT.setMethods(resp.methods);
    cashLYT.setProviders(resp.providers);
    cashLYT.setClients(resp.clientIngress);
    $q.loading.hide()
  }
}


const index = async () => {
  const resp = await orderApi.getRules();
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    cashLYT.setRules(resp);
  }
}

onMounted(() => {
  if (cashLYT.cash && $route.params.cid) {
    init()
    index()
  }
  if (!cashLYT.showtoolbar && $route.params.cid) {
    init()
    index()
  }
})

watch(() => $route.params.cid, (newVal) => {
  if (newVal) {
    init()
    index()
  }
})

</script>
