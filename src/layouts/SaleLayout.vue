<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />

    </q-header>


    <q-page-container>
      <q-page padding>
        <q-toolbar class="justify-between">
          <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Consulta Ventas</span>
          </div>
        </q-toolbar>
        <div class="row justify-between" v-if="informe">

          <q-card class="my-card" @click="mosant">

            <q-card-section>
              <div class="text-h6 text-center">Ventas 2024</div>
              <div class="text-h4 text-center">{{ Number(report.salesant / report.salesant * 100) + '%' }}</div>
              <!-- <div class="text-h4 text-center">{{ Number(report.salesant * 1.10).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</div> -->

            </q-card-section>

            <q-card-section>
              <div class="text-h6 text-center">Tickets 2024</div>
              <div class="text-h4 text-center">{{ Math.round(Number(report.tiketsant) * Number(VDB.session.store.increment),0)  }}</div>
            </q-card-section>
            {{ report.tiketsant }}
          </q-card>

          <q-card class="my-card" @click="mosant">
            <q-card-section>
              <div class="text-h6 text-center">Ventas 2025</div>
              <div class="text-h4 text-center">{{ Number(report.salesact / Number(report.salesant * VDB.session.store.increment) *
                100).toFixed(2) + '%' }}</div>
              <!-- <div class="text-h4 text-center">{{  Number(report.salesact).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}}</div> -->


            </q-card-section>

            <q-card-section>
              <div class="text-h6 text-center">Tickets 2025</div>
              <div class="text-h4 text-center">{{ report.tiketsact }}</div>
            </q-card-section>

          </q-card>
          <q-card class="my-card" @click="mosant">
            <q-card-section>
              <div class="text-h6 text-center">Diferencia</div>
              <div class="text-h4 text-center">{{ Number(Number(report.salesact / Number(report.salesant * 1.15) * 100) -
                Number(Number(report.salesant * 1.15) / Number(report.salesant * 1.15) * 100)).toFixed(2) + '%' }}</div>
              <!-- <div class="text-h4 text-center">{{  Number(report.salesact - Number(report.salesant *1.1)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}}</div> -->

            </q-card-section>

            <q-card-section>
              <div class="text-h6 text-center">Tickets Diferencia</div>
              <div class="text-h4 text-center">{{ report.tiketsact - Math.round(Number(report.tiketsant  * VDB.session.store.increment)) }}</div>
            </q-card-section>
          </q-card>

          <q-card class="my-card" @click="moshoy">
            <!-- <q-card-section>
                <div class="text-h6 text-center">VENTA HOY </div>
                <div class="text-h4 text-center">{{ Number.parseFloat(report.saleshoy).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</div>
              </q-card-section> -->
            <q-card-section>
              <div class="text-h6 text-center">Tickets Hoy</div>
              <div class="text-h4 text-center">{{ report.hoytck }}</div>
            </q-card-section>
          </q-card>

        </div>


        <div v-if="barras">
          <div class="q-pa-md" v-for="(depvent, index) in report.ventasdepmonth" :key="index">
            <q-linear-progress size="25px" stripe rounded :value="depvent.VENTA / report.salesact" color="primary">
              <div class="absolute-full flex flex-center">

                <!-- <q-badge color="white" text-color="accent" :label="depvent.NOMDEP + '   ( ' + Number.parseFloat(depvent.VENTA).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + ')'" /> -->
                <q-badge color="white" text-color="accent" :label="depvent.NOMDEP" />
                <q-badge color="white" text-color="accent"
                  :label="'   (% ' + Number.parseFloat(depvent.VENTA / report.salesact * 100).toFixed(2) + ')'" />
                <q-badge color="white" text-color="accent"
                  :label="'   (' + Number.parseFloat(depvent.TICKETS).toFixed(0) + ' tcks)'" />

              </div>
            </q-linear-progress>
          </div>
        </div>

        <div v-if="barrashoy">
          <div class="q-pa-md" v-for="(depvent, index) in report.ventasdepday" :key="index">
            <q-linear-progress size="25px" stripe rounded :value="depvent.VENTA / report.saleshoy" color="primary">
              <div class="absolute-full flex flex-center">
                <q-badge color="white" text-color="accent" :label="depvent.NOMDEP" />
                <!-- <q-badge color="white" text-color="accent" :label="depvent.NOMDEP + '   ( ' + Number(depvent.VENTA).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + ')'" /> -->
                <q-badge color="white" text-color="accent"
                  :label="'   (% ' + Number.parseFloat(depvent.VENTA / report.saleshoy * 100).toFixed(2) + ')'" />
                <q-badge color="white" text-color="accent"
                  :label="'   (' + Number.parseFloat(depvent.TICKETS).toFixed(0) + ' tcks)'" />


              </div>
            </q-linear-progress>
          </div>
        </div>

        <q-dialog v-model="load" persistent>
          <div v-if="load">
            <q-spinner-facebook color="primary" size="7.5em" />
            <q-tooltip :offset="[0, 8]">Cargando Informacion</q-tooltip>
          </div>
        </q-dialog>





      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
const $router = useRouter();

const VDB = useVDBStore();
const $q = useQuasar();

const informe = ref(false);
const barras = ref(false);
const barrashoy = ref(false);


const report = ref(null);

const load = ref(false);



const index = async () => {
  load.value = true
  let host = VDB.session.store.ip_address;
  // let host = '192.168.10.160:1619';
  let sale = `http://${host}/access/public/reports/getSales`;
  axios.get(sale)
    .then(done => {
      console.log(done.data)
      report.value = done.data
      console.log("datos obt")
      informe.value = true
      barras.value = true
      load.value = false
    })
    .catch(fail => {
      console.log(fail.response.data.message);
    });
}

const moshoy = () => {
  barras.value = false
  barrashoy.value = true
}

const mosant = () => {
  barras.value = true
  barrashoy.value = false
}

// if (VDB.session.rol == 'root' || VDB.session.rol == 'gen' || VDB.session.rol == 'aud' || VDB.session.rol == 'rrhh') {
  index()
// } else {
//   $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
//   $router.replace('/');

// }

</script>
