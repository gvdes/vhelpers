<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <q-header class="bg-grey-3 text-dark" bordered>
        <UserToolbar />
        <q-separator />
        <q-toolbar class="justify-between">
          <div>
            <span class="text-grey">Helpers</span>
            <q-icon name="navigate_next" color="primary" />
            <span class="text-h6">Cajas Abiertas</span>
          </div>
          <div class="row">
            <q-btn color="primary" icon="event" @click="date = !date" flat round />
          </div>

        </q-toolbar>
      </q-header>



      <q-table
      title="Sucursales"
      :rows="stores"
      hide-header
      :pagination=table.pagination
      :filter="table.filter"
    >
    <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="table.filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

    <template v-slot:body="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
            <q-list bordered dense>
              <q-item>
                <q-item-section>
                  <q-item-label class="flex justify-between">
                    <div class="text-bold">{{ props.row.name }}</div>
                    <div class="text-overline">{{ props.row.sales?.length }}
                      <q-btn color="grey" flat dense :icon="props.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                        " @click="props.expand = !props.expand" />
                    </div>
                  </q-item-label>
                </q-item-section>

              </q-item>
              <q-slide-transition>
                <div class="" v-show="props.expand" v-if="props.row.sales">
                  <q-separator />
                  <q-item class="text-center">
                    <q-item-section >
                      CAJA
                    </q-item-section>
                    <q-item-section>
                      TICKETS
                    </q-item-section>
                  </q-item>
                  <q-item class="text-center" dense clickable v-ripple v-for="(sales, index) in (props.row.sales) ">
                    <q-item-section>
                      {{ sales.DESTER }}
                    </q-item-section>
                    <q-item-section>
                      {{ sales.TICKETS }}
                    </q-item-section>
                  </q-item>
                </div>
              </q-slide-transition>
            </q-list>
            <q-separator spaced inset vertical dark />
          </div>
        </template>
  </q-table>



      <q-dialog v-model="date">
      <q-card class="my-card">
        <q-card-section>
          <div class="q-pa-md">
            <div class="q-pb-sm">
              <!-- Desde: {{ fechas.from }} : Hasta {{ fechas.to }} -->
               <!-- {{ fechas }} -->
            </div>
            <q-date v-model="fechas" range minimal />
          </div>
        </q-card-section>
        <q-card-section>
          <q-card-actions align="right">
            <q-btn flat icon="close" color="negative" @click="date = !date" />
            <q-btn flat icon="check" color="positive" @click="buscas" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>





      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { AppFullscreen, useQuasar } from "quasar";
import Chart from 'chart.js/auto';
import dayjs from "dayjs";
import UserToolbar from "src/components/UserToolbar.vue";
import ApiAssist from "src/API/assistApi";
import { useVDBStore } from "src/stores/VDB";
import axios from "axios"; //para dirigirme bro
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const $user = useVDBStore();


const date = ref(false);

const fechas = ref(null);
const stores = ref([]);
const table = ref({
  pagination: { rowsPerPage: 0 },
  filter: "",
});


const ismobile = computed(() => $q.platform.is.mobile);


const init = async () => {

  // smonth.value.val = meses.filter(e => e.id === mes)[0]
  $q.loading.show({ message: "Cargando Informacion" });
  console.log("se inicia el init");
  const resp = await ApiAssist.index();
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    stores.value = resp;
    let date = new Date();
  let fecha =  dayjs(date).format("YYYY/MM/DD")
  fechas.value = fecha
  console.log(fecha);
    getSale(stores.value, fechas.value).finally(()=> {
    $q.loading.hide();
  });
  }
};

// const getSale = async (sucursales,date) => {
//   console.log(date)
//   sucursales.forEach((e, index) => {
//     setTimeout(() => {
//       let host = e.ip_address;
//       // let sale = `http://${host}/access/public/reports/getSalesPerMonth/${mes}`;
//       let sale = `http://192.168.10.160:1619/access/public/reports/OpenCash`;
//       axios
//         .post(sale,{filt: date})
//         .then((done) => {
//           e.sales = done.data == undefined ? null : done.data;
//           console.log(done);
//         })
//         .catch((fail) => {
//           console.log(fail.response.data.message);
//         });
//     }, index * 1000)
//   });
//   $q.loading.hide();
// };
const getSale = async (sucursales, date) => {
  console.log(date);

  // Creamos un array de promesas para manejar las solicitudes
  const promises = sucursales.map((e, index) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let host = e.ip_address;
        let sale = `http://${host}/access/public/reports/OpenCash`;
        //let sale = `http://192.168.10.160:1619/access/public/reports/OpenCash`;
        axios
          .post(sale, { filt: date })
          .then((done) => {
            e.sales = done.data == undefined ? null : done.data;
            console.log(done);
            resolve(done);
          })
          .catch((fail) => {
            console.log(fail.response.data.message);
            reject(fail);
          });
      }, index * 1000);
    });
  });

  try {
    await Promise.all(promises);
  } catch (error) {
    console.error("Error en alguna de las solicitudes:", error);
  }
};



if ($user.session.rol === 'adm') {
  init()
} else {
  $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
  $router.replace('/');
}

const buscas = () => {
  date.value = false

  $q.loading.show({message:'Obteniendo Datos'})
  getSale(stores.value, fechas.value).finally(()=> {
    $q.loading.hide();
  })



}

</script>
