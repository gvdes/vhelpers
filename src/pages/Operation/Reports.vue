<template>
  <q-page padding>
    <q-tabs v-model="tab" class="text-teal">
      <q-route-tab v-for="zone in tabsOpe" :key="zone.id" :name="zone.name" :icon="zone.icon" :label="zone.name"
        :to="zone.path" :title="zone.title" />
    </q-tabs>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </q-page>
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
const tab = ref('RCG');

const tabsOpe = ref([
  { id: 1, name: 'RCG', icon: 'bar_chart', path: '/operation/reports/rcg', title:'Reporte' },
  { id: 2, name: 'EOE', icon: 'settings', path: '/operation/reports/eoe', title:'Reporte' },
  { id: 3, name: 'CIP', icon: 'inventory', path: '/operation/reports/cip', title:'Reporte' },
  { id: 4, name: 'GPL', icon: 'groups', path: '/operation/reports/gpl' , title:'Reporte'},
  { id: 5, name: 'ECM', icon: 'sentiment_satisfied', path: '/operation/reports/ecm', title:'Reporte' },
  { id: 6, name: 'DACI', icon: 'admin_panel_settings', path: '/operation/reports/daci', title:'Reporte' },
  { id: 7, name: 'MCT', icon: 'autorenew', path: '/operation/reports/mct', title:'Reporte' },
])

</script>
