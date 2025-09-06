<template>
  <q-page padding>
    <!-- <div style=" margin: auto;"> -->
    <ApexCharts type="bar" width="97%" height="300px" :options="optionsGlobal" :series="seriesGlobal" />

    <ApexCharts type="bar" width="97%" height="400px" :options="options" :series="series" />
    <!-- </div> -->


  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QSelect, useQuasar } from "quasar";
import dayjs from "dayjs";
import UserToolbar from "src/components/UserToolbar.vue";
import resourse from "src/API/ResoursesDay";
import assistApi from "src/API/assistApi";
import { useVDBStore } from "src/stores/VDB";;
import { useCounterStore } from 'stores/SalesST';
import ApexCharts from 'vue3-apexcharts'

const $q = useQuasar();
const storeST = useCounterStore();

const $route = useRoute();
const $router = useRouter();
const $user = useVDBStore();
const options = ref({})
const series = ref([])
const optionsGlobal = ref({})
const seriesGlobal = ref([])

const ismobile = computed(() => $q.platform.is.mobile);

const drawSucursalChart = () => {
  const isMobile = ismobile.value;

  options.value = {
    chart: {
      id: 'stores',
      background: 'none',
      toolbar: { show: false },
    },
    tooltip: {
      y: {
        formatter: val => '$' + val.toLocaleString('es-MX')
      }
    },
    xaxis: {
      categories: storeST.stores.map(s => isMobile ? s.sucursal.alias : s.sucursal.name),
      labels: { show: true }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '100%',
        barHeight: '90%'
      },
    },
    dataLabels: {
      formatter: val => {return `$ ${val.toLocaleString('es-MX')}`},
      style: { colors: ['#333'] }
    }
  };

  series.value = [{
    name: `VENTA ${storeST.today}`,
    data: storeST.stores.map(s => s.data?.salesAct?.totalMonth || 0)
  }];
};


const mosChart = () => {
  const totalDayActual = storeST.stores.reduce((acc, s) => acc + (s.data.salesAct.totalMonth || 0), 0);
  const totalDayAnterior = storeST.stores.reduce((acc, s) => acc + (s.data.salesAnt.totalMonth || 0), 0);
  const ticketsDayActual = storeST.stores.reduce((acc, s) => acc + (s.data.salesAct.tickets || 0), 0);
  const ticketsDayAnterior = storeST.stores.reduce((acc, s) => acc + (s.data.salesAnt.tickets || 0), 0);
  optionsGlobal.value = optionsGlobal.value = {
    chart: {
      id: 'global',
      toolbar: { show: false },
      background: 'transparent'
    },
    colors: ['#4ECDC4', '#556270'],
    tooltip: {
      y: { formatter: val => '$' + val.toLocaleString('es-MX') }
    },
    xaxis: {
      categories: ['AÑO Anterior', 'AÑO Actual'],
    },
    yaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    dataLabels: {
      formatter: val => {return `$ ${val.toLocaleString('es-MX')}`},

      style: {
        colors: ['#333']
      }
    }
  }
  seriesGlobal.value = [{
    data: [totalDayAnterior, totalDayActual],
  }
  ]
}

onMounted(() => {
  if (storeST.stores.length > 0) {
    drawSucursalChart();
    mosChart();
  } else {
    watch(() => storeST.stores, (newVal) => {
      if (newVal.length > 0) {
        drawSucursalChart();
        mosChart();
      }
    }, { immediate: true });
  }
})


</script>
