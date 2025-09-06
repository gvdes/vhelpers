<template>
  <q-page padding>
    <!-- content -->
  </q-page>
</template>

<script setup>
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import { useProductStore } from 'stores/ProductsStore';
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useVDBStore } from 'stores/VDB';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import RestockApi from 'src/API/RestockApi.js';
import { useQuasar, date } from 'quasar';
import { $sktRestock } from 'boot/socket';
const layoutProduct = useProductStore();
layoutProduct.setTitle('Modificacion de Tickets')

</script>
