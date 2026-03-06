<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <q-page padding>
        <div class="row">
          <div class="q-mb-lg col">
            <div class="text-h6">Venta</div>
            <q-linear-progress :value="progress / 100" color="positive" size="15px" rounded />
            <div class="text-subtitle2 q-mt-sm">
              {{ money(totalCurrent) }} /
              {{ money(goal) }}
              ({{ progress.toFixed(1) }}%)
            </div>
            <div v-if="remaining > 0" class="text-negative">
              Faltan {{ money(remaining) }}
            </div>
          </div>
          <!-- {{ totalLastYear }} -->
          <q-separator spaced inset vertical dark />
          <div class="col">
            <div class="text-h6">Tickets</div>
            <q-linear-progress :value="progressTcks / 100" size="15px" rounded />
            <div class="text-subtitle2 q-mt-sm">
              {{ totalCurrentTcks.toFixed(0) }} /
              {{ goalTcks.toFixed(0) }}
              ({{ progressTcks.toFixed(1) }}%)
            </div>
            <div v-if="remainingtcks > 0" class="text-negative">
              Faltan {{ remainingtcks.toFixed(0) }}
            </div>
          </div>
          <q-separator spaced inset vertical dark />
          <div class="col">
            <div class="text-center text-h6">Crecimiento de Sucursal</div>
            <div class="text-center">
              <span class="text-h3">{{ growth.toFixed(1) }}%</span>
              <q-icon :name="growth < 0 ? 'arrow_downward' :'arrow_upward' " class="q-mb-md" size="md" :color="growth < 0 ? 'negative' :'positive' "/>
            </div>
          </div>
        </div>
        <q-separator spaced inset vertical dark />
        <q-card class="my-card" @click="mosHoy">
          <q-card-section class="row">
            <div class="text-h6 col text-center">
              <div>Venta Hoy</div>
              <div>{{ money(totalToday) }}</div>
              <div class="text-caption text-grey">
                LY: {{ money(totalTodayLY) }}
              </div>
            </div>

            <div class="text-h6 col text-center">
              <div>Tickets Hoy</div>
              <div>{{ ticketsToday }}</div>
              <div class="text-caption text-grey">
                LY: {{ ticketsTodayLY.toFixed(0) }}
              </div>
            </div>
          </q-card-section>
        </q-card>
        <q-separator spaced inset vertical dark />
        <div class="row">
          <q-card class="q-mt-xl col">
            <q-card-section>
              <div class="text-h6">Venta por Sección</div>
            </q-card-section>
            <q-table :rows="sectionTable" :columns="sectionColumns" row-key="section" flat dense />
          </q-card>
          <q-separator spaced inset vertical dark />
          <q-card class="q-mt-xl col">
            <q-card-section>
              <div class="text-h6">Venta por Dependiente</div>
            </q-card-section>
            <q-table :rows="DependienteTable" :columns="clientColumns" row-key="client" flat dense />
          </q-card>
        </div>

        <div class="row">
          <q-card class="q-mt-xl col">
            <q-card-section>
              <div class="text-h6">Venta por Cliente (Comparativo)</div>
            </q-card-section>
            <q-card-section style="height: 500px; overflow-y: auto;">
              <div :style="{ height: clientChartHeight + 'px' }">
                <Bar :data="clientBarData" :options="{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: 'top' },
                    datalabels: {
                      align: 'right',
                      formatter: (value) => money(value),
                      color: () => $q.dark.isActive ? 'white' : 'black',
                      font: { weight: 'bold', size: 11 }
                    }
                  },
                  scales: {
                    y: {
                      ticks: {
                        align: 'start',
                        font: { weight: 'bold' }
                      }
                    },
                    x: {
                      beginAtZero: true,
                      ticks: {
                        callback: (value) => '$' + value.toLocaleString()
                      }
                    }
                  }
                }" />
              </div>
            </q-card-section>
          </q-card>
          <q-separator spaced inset vertical dark />
          <q-card class="q-mt-xl col">
            <q-card-section>
              <div class="text-h6">Ventas por Día</div>
            </q-card-section>
            <q-card-section style="height:500px">
              <Bar :data="ventaPorDia" :options="{
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  datalabels: {
                    // anchor: 'end',
                    align: 'center',
                    formatter: (value) => money(value),
                    color: () => $q.dark.isActive ? 'white' : 'black',

                    font: { weight: 'bold' }
                  }
                },
                scales: {
                  y: {
                    ticks: {
                      align: 'start',
                      padding: 5
                    }
                  },
                  x: {
                    beginAtZero: true
                  }
                }
              }" />
            </q-card-section>
          </q-card>
        </div>
        <!-- {{ $q.dark.isActive }} -->
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import { Line } from 'vue-chartjs'
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import saleApi from 'src/API/saleApi';
import dayjs from 'dayjs';
const $router = useRouter();
const VDB = useVDBStore();
const $q = useQuasar();
import { Bar } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
)
dayjs.locale('es')
const firstDay = dayjs().startOf('month').format('YYYY-MM-DD')
const endDay = dayjs().endOf('month').format('YYYY-MM-DD')

const today = dayjs().format('YYYY-MM-DD')
const currentSales = ref([]);
const lastSales = ref([])


const onlyToday = ref(false)

const sectionColumns = [
  { name: 'section', label: 'Sección', field: 'section', align: 'left' },
  { name: 'qty', label: 'Cantidad', field: 'qty', align: 'right' },
  {
    name: 'total',
    label: 'Total',
    field: row => money(row.total),
    align: 'right'
  }
]
const clientColumns = [
  { name: 'client', label: 'Dependiente', field: 'client', align: 'left' },
  { name: 'tickets', label: 'Tickets', field: 'tickets', align: 'right' },
  {
    name: 'total',
    label: 'Total',
    field: row => money(row.total),
    align: 'right'
  }
]
// obtener dias anteriores y dias de hoy
const todayStr = computed(() =>
  dayjs().format('YYYY-MM-DD')
)
const todayLYStr = computed(() =>
  dayjs().subtract(1, 'year').format('YYYY-MM-DD')
)
//base de las ventas
const baseSales = computed(() =>
  onlyToday.value ? salesToday.value : currentSales.value
)
const baseSalesLY = computed(() =>
  onlyToday.value ? salesTodayLY.value : lastSales.value
)
// ventas hou
const salesToday = computed(() =>
  currentSales.value.filter(e =>
    dayjs(e.created_at).format('YYYY-MM-DD') === todayStr.value
  )
)
// total hoy
const totalToday = computed(() =>
  salesToday.value.reduce((sum, s) => sum + s.total, 0)
)
// tickets hoy
const ticketsToday = computed(() =>
  salesToday.value.length
)
// ventas hoy anio pasado
const salesTodayLY = computed(() =>
  lastSales.value.filter(e =>
    dayjs(e.created_at).format('YYYY-MM-DD') === todayLYStr.value
  )
)
// total ventas hoy anio pasado
const totalTodayLY = computed(() =>
  salesTodayLY.value.reduce((sum, s) => sum + s.total, 0) * VDB.session.store.increment
)
// tickets hoy anio pasado
const ticketsTodayLY = computed(() =>
  salesTodayLY.value.length * VDB.session.store.increment
)
// total actual
const totalCurrent = computed(() =>
  baseSales.value.reduce((sum, s) => sum + s.total, 0)
)
//  total anio pasado
const totalLastYear = computed(() =>
  baseSalesLY.value.reduce((sum, s) => sum + s.total, 0)
)
// meta real anio actual
const goal = computed(() =>
  totalLastYear.value * VDB.session.store.increment
)
// faltante
const remaining = computed(() =>
  goal.value - totalCurrent.value
)

// progreso venta
const progress = computed(() =>
  goal.value > 0
    ? (totalCurrent.value / goal.value) * 100
    : 0
)
// total tickets
const totalCurrentTcks = computed(() =>
  baseSales.value.length
)
// total tickets anio anterior
const totalLastYearTcks = computed(() =>
  baseSalesLY.value.length
)
// meta de tickets
const goalTcks = computed(() =>
  totalLastYearTcks.value * VDB.session.store.increment
)
// tickets faltantes
const remainingtcks = computed(() =>
  goalTcks.value - totalCurrentTcks.value
)
//progreso de tickets
const progressTcks = computed(() =>
  goal.value > 0
    ? (totalCurrentTcks.value / goalTcks.value) * 100
    : 0
)
const growth = computed(() => (((totalCurrent.value - totalLastYear.value) / totalLastYear.value) * 100))
// tabla de las secciones
const sectionTable = computed(() => {
  const grouped = {}

  baseSales.value.forEach(sale => {
    sale.products.forEach(prod => {
      const sectionName =
        prod.category?.familia?.seccion?.name || 'SIN SECCIÓN'

      if (!grouped[sectionName]) {
        grouped[sectionName] = {
          section: sectionName,
          total: 0,
          qty: 0
        }
      }

      grouped[sectionName].total += prod.pivot.total
      grouped[sectionName].qty += prod.pivot.amount
    })
  })

  return Object.values(grouped)
    .sort((a, b) => b.total - a.total)
})
// tabla dependientes
const DependienteTable = computed(() => {
  const grouped = {}

  baseSales.value.forEach(sale => {
    const dependientName = sale.staff?.complete_name || 'SIN DEPENDIENTE'

    if (!grouped[dependientName]) {
      grouped[dependientName] = {
        client: dependientName,
        total: 0,
        tickets: 0
      }
    }

    grouped[dependientName].total += sale.total
    grouped[dependientName].tickets += 1
  })

  return Object.values(grouped)
    .sort((a, b) => b.total - a.total)
})



const index = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  let dates = {
    from: firstDay,
    to: endDay,
    id_viz: VDB.session.store.id_viz
  }
  // let dates = {
  //   from: dayjs('2026-02-01').format('YYYY-MM-DD'),
  //   to: dayjs('2026-02-28').format('YYYY-MM-DD'),
  //   id_viz: VDB.session.store.id_viz
  // }
  console.log(dates);
  const resp = await saleApi.index(dates)
  if (resp.fail) {
    console.log(resp)

  } else {
    currentSales.value = resp.current_sales;
    lastSales.value = resp.last_sales
    console.log(resp)
    $q.loading.hide();
  }
}

//para mostrar hoy
const mosHoy = () => {
  console.log('solo se debe de mostrar en todo lo de hoy ')
  onlyToday.value = !onlyToday.value
}
//datos de clientes
// const clientBarData = computed(() => {

//   const group = (sales) => {
//     const g = {}
//     sales.forEach(s => {
//       const name = s.client?.name || 'PÚBLICO GENERAL'
//       if (!g[name]) g[name] = 0
//       g[name] += s.total
//     })
//     return g
//   }

//   const current = group(baseSales.value)
//   const last = group(baseSalesLY.value)

//   const allClients = Array.from(
//     new Set([...Object.keys(current), ...Object.keys(last)])
//   )

//   return {
//     labels: allClients,
//     datasets: [
//       {
//         label: 'Actual',
//         data: allClients.map(c => current[c] || 0),
//         backgroundColor: '#6367FF'
//       },
//       {
//         label: 'Año Pasado',
//         data: allClients.map(c => last[c] || 0),
//         backgroundColor: '#FF5A5A'
//       }
//     ]
//   }
// })
const clientChartHeight = computed(() => {
  const totalClients = clientBarData.value.labels.length
  const barHeight = 55
  return totalClients * barHeight
})
// const clientBarData = computed(() => {
//   const group = (sales) => {
//     const g = {}
//     sales.forEach(s => {
//       const name = s.client?.name || 'PÚBLICO GENERAL'
//       if (!g[name]) g[name] = 0
//       g[name] += s.total
//     })
//     return g
//   }
//   const current = group(baseSales.value)
//   const last = group(baseSalesLY.value)
//   const allClients = Array.from(
//     new Set([...Object.keys(current), ...Object.keys(last)])
//   )

//   const sorted = allClients.sort(
//     (a, b) => (current[b] || 0) - (current[a] || 0)
//   )

//   return {
//     labels: sorted,
//     datasets: [
//       {
//         label: 'Actual',
//         data: sorted.map(c => current[c] || 0),
//         backgroundColor: '#6367FF'
//       },
//       {
//         label: 'Año Pasado',
//         data: sorted.map(c => last[c] || 0),
//         backgroundColor: '#FF5A5A'
//       }
//     ]
//   }
// })

const clientBarData = computed(() => {

  const group = (sales) => {
    const g = {}
    sales.forEach(s => {
      const name = s.client?.name || 'PÚBLICO GENERAL'
      if (!g[name]) g[name] = 0
      g[name] += s.total
    })
    return g
  }

  const current = group(baseSales.value)
  const last = group(baseSalesLY.value)

  const allClients = Array.from(
    new Set([...Object.keys(current), ...Object.keys(last)])
  )

  const sorted = allClients
    .map(name => ({
      name,
      total: Math.max(current[name] || 0, last[name] || 0)
    }))
    .sort((a, b) => b.total - a.total)
  // .slice(0, 5)

  const labels = sorted.map(c => c.name)

  return {
    labels,
    datasets: [
      {
        label: 'Actual',
        data: labels.map(c => current[c] || 0),
        backgroundColor: '#6367FF',
        borderRadius: 6,
        barThickness: 20
      },
      {
        label: 'Año Pasado',
        data: labels.map(c => last[c] || 0),
        backgroundColor: '#FF5A5A',
        borderRadius: 6,
        barThickness: 20
      }
    ]
  }
})
const money = (value) =>
  '$' + (value || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })
//datos acumulados por dia

const ventaPorDia = computed(() => {
  const todayDay = dayjs().date()

  const group = (sales) => {
    const g = {}

    sales.forEach(s => {
      const day = parseInt(dayjs(s.created_at).format('DD'))
      if (!g[day]) g[day] = 0
      g[day] += s.total
    })

    return g
  }

  const current = group(baseSales.value)
  const last = group(baseSalesLY.value)
  const allDays = Array.from({ length: todayDay }, (_, i) => i + 1)

  return {
    labels: allDays.map(d => d.toString().padStart(2, '0')),
    datasets: [
      {
        label: 'Actual',
        data: allDays.map(d => current[d] || 0),
        backgroundColor: '#6367FF'
      },
      {
        label: 'Año Pasado',
        data: allDays.map(d => last[d] * VDB.session.store.increment || 0),
        backgroundColor: '#FF5A5A'
      }
    ]
  }
})

index()
</script>
