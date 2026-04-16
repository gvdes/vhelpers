<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">{{ $store.title }}
          </span>
        </div>
        <q-select v-model="params.mes" :options="months" label="Mes" style="width: 200px;" dense outlined
          option-value="value" map-options emit-value v-if="[6, 10].includes(VDB.session.credentials.rol.id)" />
      </q-toolbar>
      <q-tabs v-model="$store.tab" class="text-teal">
        <q-tab v-if="isGlobal" name="all" icon="all_inclusive" label="Global" />
        <q-tab v-for="zone in visibleZones" :key="zone.id" :name="zone.id" icon="extension" class="text-caption ">
          <q-list>
            <q-item dense>
              <q-item-section>
                <!-- <q-item-label caption class=" text-bold text-teal ">{{ zone.name }}</q-item-label> -->
                <q-item-label caption class=" text-bold text-teal">{{ zone.gerente }} (z-{{ zone.id }})</q-item-label>
                <q-item-label caption class=" text-bold ">{{ zone.stores.join(',') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab>
      </q-tabs>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import 'dayjs/locale/es'
import { useVDBStore } from 'stores/VDB';
import { useQuasar } from 'quasar';
import { useOperationStore } from 'stores/OperationStore';
import UserToolbar from "src/components/UserToolbar.vue";
import operationApi from 'src/API/operationApi';
const $route = useRoute();
const $router = useRouter();
const $q = useQuasar();
const VDB = useVDBStore()
const $store = useOperationStore()
$store.setTitle('Reports')
dayjs.locale('es')
const zones = ref([
  { id: 1, name: 'Zona 1', gerente: 'Ruben M', stores: ['SP1', 'SP2'] },
  { id: 2, name: 'Zona 2', gerente: 'Fernando M', stores: ['SOT', 'CR1', 'CR2', 'CRG'] },
  { id: 3, name: 'Zona 3', gerente: 'Julio M', stores: ['RC1', 'RC2', 'PUE'] },
  { id: 4, name: 'Zona 4', gerente: 'Luis R', stores: ['BRA', 'BOL', 'AP1', 'AP2'] }
])
const params = ref({
  mes: dayjs().month() + 1
})
$store.setTab(VDB.session.credentials.zone?.id ?? 'all')
const months = Array.from({ length: 12 }, (_, i) => ({
  label: dayjs().month(i).format('MMMM').toUpperCase(),
  value: i + 1
}))
const isGlobal = computed(() => {
  return [6, 10, 35].includes(VDB.session.credentials.rol.id)
})
const visibleZones = computed(() => {
  if (isGlobal.value) return zones.value
  return zones.value.filter(z => z.id === VDB.session.credentials.zone?.id)
})

const init = async () => {
  let zone = isGlobal.value ? 'all' : VDB.session.credentials.zone?.id
  let data = {
    zone: zone,
    _month: params.value.mes
  }
  $store.setParams(data);
  console.log(data)
  const resp = await operationApi.index(data);
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp)
    $store.setZones(resp)
  }
}
init()

watch(
  () => [$store.tab, params.value.mes],
  () => {
    let zone = $store.tab === 'all' ? 'all' : $store.tab

    let data = {
      zone: zone,
      _month: params.value.mes
    }

    $store.setParams(data)
  }
)
</script>
