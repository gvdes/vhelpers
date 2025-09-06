<template>
  <q-page padding>
    <!-- <div style=" margin: auto;"> -->
    <!-- <ApexCharts type="donut" width="97%" height="300px" :options="donutOptions" :series="donutSeries" /> -->
    <ApexCharts type="bar" width="97%" height="300px" :options="optionsGlobal" :series="seriesGlobal" />
    <ApexCharts type="bar" width="97%" height="400px" :options="options" :series="series" />
    <ApexCharts type="donut" width="97%" height="200x" :options="donutOptions" :series="donutSeries" />

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
const selectedIndex = ref(null);
const donutOptions = ref({});
const donutSeries = ref([]);

const select = ref(null)
const ismobile = computed(() => $q.platform.is.mobile);
const filstores = computed(() => {
  if (select.value == null) {
    return storeST.stores
  } else {
    return storeST.stores.filter(e => e.sucursal.id == select.value.sucursal.id)
  }
})

const drawSucursalChart = () => {
  // const isMobile = ismobile.value;

  options.value = {
    chart: {
      id: 'stores',
      background: 'none',
      toolbar: { show: false },
      events: {
        dataPointSelection(event, chartContext, { dataPointIndex }) {
          if (dataPointIndex === selectedIndex.value) {
            // Doble clic en la misma → deselecciona
            selectedIndex.value = null;
            select.value = null;
            mosChart()
            drawDonutChart()
          } else {
            // Nueva selección
            selectedIndex.value = dataPointIndex;
            select.value = storeST.stores[dataPointIndex]
            mosChart()
            drawDonutChart()
            console.log(filstores.value)

          }
          // console.log('Seleccionado:', select.value?.sucursal?.name || 'ninguno');
        }
      }
    },
    tooltip: {
      y: {
        formatter: val => '$' + val.toLocaleString('es-MX')
      }
    },
    xaxis: {
      categories: storeST.stores.map(s => ismobile.value ? s.sucursal.alias : s.sucursal.name),
      labels: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '100%',
        barHeight: '90%'
      },
    },
    dataLabels: {
      formatter: val => '$ ' + val.toLocaleString('es-MX'),
      style: { colors: ['#333'] }
    }
  };

  series.value = [{
    name: `VENTA ${storeST.today}`,
    data: storeST.stores.map(s => s.data?.salesAct?.total || 0)
  }];
};

const drawDonutChart = () => {
  const acumulado = {};
  filstores.value.forEach(store => {
    store.data.salesAct.desglose.forEach(d => {
      if (!acumulado[d.FORMAPAGO]) {
        acumulado[d.FORMAPAGO] = parseFloat(d.TOTAL);
      } else {
        acumulado[d.FORMAPAGO] += parseFloat(d.TOTAL);
      }
    });
  });

  let acd = Object.entries(acumulado).map(([FORMAPAGO, TOTAL]) => ({
    FORMAPAGO,
    TOTAL
  }));

  console.log(acd)
  donutOptions.value = {
    chart: {
      type: 'donut',
      background: 'none',
      toolbar: { show: false }
    },
    labels: acd.map(d => d.FORMAPAGO),  // ← usa el array ya mapeado
    tooltip: {
      y: {
        formatter: val => '$' + val.toLocaleString('es-MX')
      }
    },
    legend: {
      position: 'bottom'
    }
  };
  donutSeries.value = acd.map(d => d.TOTAL);
};

const mosChart = () => {
  const totalDayActual = filstores.value.reduce((acc, s) => acc + (s.data.salesAct.total || 0), 0);
  const totalDayAnterior = filstores.value.reduce((acc, s) => acc + (s.data.salesAnt.total || 0), 0);
  const ticketsDayActual = filstores.value.reduce((acc, s) => acc + (s.data.salesAct.tickets || 0), 0);
  const ticketsDayAnterior = filstores.value.reduce((acc, s) => acc + (s.data.salesAnt.tickets || 0), 0);
  optionsGlobal.value = {
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
      formatter: (val, { dataPointIndex }) => {
        const money = '$ '+val.toLocaleString('es-MX');
        const tickets = dataPointIndex === 0 ? ticketsDayAnterior : ticketsDayActual;
        return `${money}\nTcks: ${tickets}`;
      },
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
    drawDonutChart();
  } else {
    watch(() => storeST.stores, (newVal) => {
      if (newVal.length > 0) {
        drawSucursalChart();
        mosChart();
        drawDonutChart();
      }
    }, { immediate: true });
  }
})


</script>
