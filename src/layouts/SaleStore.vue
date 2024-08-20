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
            <span class="text-h6">Ventas Sucursales</span>
          </div>
          <div class="row">
            <q-select v-model="smonth.val" :options="meses" label="mes" outlined dense @update:model-value="ObtReport"
              v-if="!ismobile" />
            <q-btn dense flat color="primary" icon="autorenew" @click="init" />
          </div>

        </q-toolbar>
      </q-header>
      <q-separator spaced inset vertical dark />
      <div class="text-bold text-h6">{{ smonth.val.label }}</div>
      <q-separator spaced inset vertical dark />

      <div :class="ismobile ? '' : 'row'">
        <q-card class="my-card col" bordered dense v-if="!ismobile">
          <q-card-section>
            <div class="text-h6 text-center">Ventas 2023</div>
            <div class="text-h4 text-center">
              {{ ventAnt.replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-center">Tickets 2023</div>
            <div class="text-h4 text-center">
              {{
                Number(
                  stores.reduce((accumulator, store) => {
                    return accumulator + Number(store.sales?.tiketsant || 0);
                  }, 0)
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              }}
            </div>
          </q-card-section>
        </q-card>

        <q-separator spaced inset vertical dark />

        <q-card class="my-card col" bordered dense v-if="!ismobile">
          <q-card-section>
            <div class="text-h6 text-center">Ventas 2024</div>
            <div class="text-h4 text-center">
              {{ ventAct.replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-center">Tickets 2024</div>
            <div class="text-h4 text-center">
              {{
                Number(
                  stores.reduce((accumulator, store) => {
                    return accumulator + Number(store.sales?.tiketsact || 0);
                  }, 0)
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              }}
            </div>
          </q-card-section>
        </q-card>

        <q-separator spaced inset vertical dark />

        <q-card class="my-card col" bordered dense v-if="!ismobile">
          <q-card-section>
            <div class="text-h6 text-center">Diferencia</div>
            <div class="text-h4 text-center">
              {{ Diferencia.replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-center">Diferencia Tickets</div>
            <div class="text-h4 text-center">
              {{
                Number(
                  stores.reduce((accumulator, store) => {
                    return (
                      accumulator +
                      Number(
                        store.sales?.tiketsact - store.sales?.tiketsant || 0
                      )
                    );
                  }, 0)
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              }}
            </div>
          </q-card-section>
        </q-card>

        <q-separator spaced inset vertical dark />

        <q-card class="my-card col" bordered dense>
          <q-card-section>
            <div class="text-h6 text-center">VENTAS HOY</div>
            <div class="text-h4 text-center">
              {{ VentasHoy.replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-center">Tickets HOY</div>
            <div class="text-h4 text-center">
              {{
                stores.reduce((accumulator, store) => {
                  return accumulator + Number(store.sales?.hoytck || 0);
                }, 0)
              }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <q-separator spaced inset vertical dark />

      <q-table title="Sucursales" :rows="stores.sort((a, b) => b.sales?.saleshoy - a.sales?.saleshoy)" row-key="id"
        :pagination="table.pagination" :filter="table.filter" hide-header>
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
                    <div class="text-overline">{{ `Tickets ${props.row.sales?.hoytck}` }}
                      <q-btn color="grey" flat dense :icon="props.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                        " @click="props.expand = !props.expand" />
                    </div>
                  </q-item-label>
                  <q-item-label>
                    <div class="q-pa-sm flex justify-start">
                      <q-linear-progress :value="Number(props.row.sales?.saleshoy) / Number(VentasHoy)" :buffer="1"
                        size="20px">
                        <div class="absolute-full flex flex-center">
                          <q-badge color="white" text-color="accent"
                            :label="`$ ${Number(props.row.sales?.saleshoy).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`" />
                        </div>
                      </q-linear-progress>
                    </div>
                  </q-item-label>
                </q-item-section>

              </q-item>
              <q-slide-transition>
                <div class="" v-show="props.expand" v-if="props.row.sales">
                  <q-separator />
                  <q-item class="text-center" dense clickable v-ripple @click="mostInf(props.row)">
                    <q-item-section>
                      <q-item-label overline>VENTAS 2023</q-item-label>
                      <q-item-label caption>{{
                        Number(props.row.sales.salesant * 1.1)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      }}</q-item-label>
                      <q-separator spaced inset vertical dark />
                      <q-item-label overline>TICKETS 2023</q-item-label>
                      <q-item-label caption>{{
                        props.row.sales.tiketsant
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label overline>Promedio 2023</q-item-label>
                      <q-item-label caption>{{
                        Number(Number(props.row.sales.salesant * 1.1) / Number(props.row.sales.tiketsant)).toFixed(2)
                      }} </q-item-label>
                      <q-separator spaced inset vertical dark />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label overline>VENTAS 2024</q-item-label>
                      <q-item-label caption>{{
                        Number(props.row.sales.salesact)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      }}</q-item-label>
                      <q-separator spaced inset vertical dark />
                      <q-item-label overline>TICKETS 2024</q-item-label>
                      <q-item-label caption>{{
                        props.row.sales.tiketsact
                      }}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label overline>Promedio 2024
                      </q-item-label>
                      <q-item-label caption>{{
                        Number(Number(props.row.sales.salesact) / Number(props.row.sales.tiketsact)).toFixed(2)
                      }} </q-item-label>
                      <q-separator spaced inset vertical dark />
                    </q-item-section>



                    <q-item-section>
                      <q-item-label overline>DIFERENCIA</q-item-label>
                      <q-item-label caption>{{
                        (
                          Number(props.row.sales.salesact).toFixed(2) -
                          Number(props.row.sales.salesant * 1.1).toFixed(2)
                        )
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      }}</q-item-label>
                      <q-separator spaced inset vertical dark />
                      <q-item-label overline>DIFERENCIA TICKETS</q-item-label>
                      <q-item-label caption>{{
                        props.row.sales.tiketsact - props.row.sales.tiketsant
                      }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label overline>VENTA HOY </q-item-label>
                      <q-item-label caption>{{
                        Number(props.row.sales.saleshoy)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      }}</q-item-label>
                      <q-separator spaced inset vertical dark />
                      <q-item-label overline>TICKETS HOY</q-item-label>
                      <q-item-label caption>{{
                        props.row.sales.hoytck
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </q-slide-transition>
            </q-list>
            <q-separator spaced inset vertical dark />
          </div>
        </template>
      </q-table>

      <q-dialog v-model="viewSaleSuc.state"  full-width>
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">{{ viewSaleSuc.val.name }}</div>
            <div class="text-subtitle2">{{ viewSaleSuc.val.alias }}</div>
          </q-card-section>
          <q-card-section class="row">

            <q-card class="my-card col">
              <q-card-section>
                <div class="text-h6 text-center">Ventas 2023</div>
                <div class="text-h5 text-center">
                  {{ Number(viewSaleSuc.val.sales.salesant).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-center">Tickets 2023</div>
                <div class="text-h5 text-center">
                  {{ Number(viewSaleSuc.val.sales.tiketsant).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-center">Tickets Promedio 2023</div>
                <div class="text-h5 text-center">
                  {{ Number(viewSaleSuc.val.sales.salesant / viewSaleSuc.val.sales.tiketsant).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
                </div>
              </q-card-section>
            </q-card>

            <q-separator spaced inset vertical dark />

            <q-card class="my-card col">
              <q-card-section>
                <div class="text-h6 text-center">Ventas 2024</div>
                <div class="text-h5 text-center">
                  {{ Number(viewSaleSuc.val.sales.salesact).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-center">Tickets 2024</div>
                <div class="text-h5 text-center">
                  {{ Number(viewSaleSuc.val.sales.tiketsact).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-center">Tickets Promedio 2024</div>
                <div class="text-h5 text-center">
                  {{ Number(viewSaleSuc.val.sales.salesact / viewSaleSuc.val.sales.tiketsact).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
                </div>
              </q-card-section>
            </q-card>

            <q-separator spaced inset vertical dark />

            <q-card class="my-card col">
              <q-card-section>
                <div class="text-h6 text-center">Diferencias</div>
                <div class="text-h5 text-center">
                  {{ Number(viewSaleSuc.val.sales.salesact - viewSaleSuc.val.sales.salesant).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-center">Diferencia Tickts</div>
                <div class="text-h5 text-center">
                  {{ Number(viewSaleSuc.val.sales.tiketsact - viewSaleSuc.val.sales.tiketsant).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
                </div>
              </q-card-section>
            </q-card>

            <q-separator spaced inset vertical dark />

            <q-card class="my-card col">
              <q-card-section>
                <div class="text-h6 text-center">Ventas Hoy</div>
                <div class="text-h5 text-center">
                  {{ Number(viewSaleSuc.val.sales.saleshoy).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
                </div>
              </q-card-section>
              <q-card-section>
                <div class="text-h6 text-center">Tickets Hoy</div>
                <div class="text-h5 text-center">
                  {{ Number(viewSaleSuc.val.sales.hoytck).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}
                </div>
              </q-card-section>
            </q-card>
          </q-card-section>
          <q-card-section>
            <q-card class="my-card">
              <q-card-section>
                <q-list bordered>
                  <q-item>
                    <q-item-section avatar>
                      <!-- <q-icon color="primary" name="bluetooth" /> -->
                    </q-item-section>
                    <q-item-section>Caja</q-item-section>
                    <q-item-section>Venta</q-item-section>
                    <q-item-section>Tickets</q-item-section>
                    <q-item-section>Promedio</q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
              <q-card-section>
                <div class="text-h6">Resumen Dia</div>
                <q-list bordered>
                  <q-item v-for="(cajas,index) in viewSaleSuc.val.sales.ventasdepday" :key="index">
                    <q-item-section avatar>
                      <q-icon color="primary" name="point_of_sale" />
                    </q-item-section>
                    <q-item-section>{{ cajas.DESTER }}</q-item-section>
                    <q-item-section>{{ Number(cajas.VENTA).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}</q-item-section>
                    <q-item-section>{{ cajas.TCK }}</q-item-section>
                    <q-item-section>{{ Number(cajas.VENTA/ cajas.TCK).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}</q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
              <q-card-section>
                <div class="text-h6">Resumen Mensual</div>
                <q-list bordered>
                  <q-item v-for="(cajas,index) in viewSaleSuc.val.sales.ventasdepmonth" :key="index" >
                    <q-item-section avatar>
                      <q-icon color="primary" name="point_of_sale" />
                    </q-item-section>
                    <q-item-section>{{ cajas.DESTER }}</q-item-section>
                    <q-item-section>{{ Number(cajas.VENTA).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}</q-item-section>
                    <q-item-section>{{ cajas.TCK }}</q-item-section>
                    <q-item-section>{{ Number(cajas.VENTA/ cajas.TCK).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") }}</q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
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



const stores = ref([]);
const table = ref({
  pagination: { rowsPerPage: 0 },
  filter: "",
});

const viewSaleSuc = ref({
  state: false,
  val: null,
})

const smonth = ref({
  val: null
})

const meses = [
  { id: 1, label: 'Enero' },
  { id: 2, label: 'Febrero' },
  { id: 3, label: 'Marzo' },
  { id: 4, label: 'Abril' },
  { id: 5, label: 'Mayo' },
  { id: 6, label: 'Junio' },
  { id: 7, label: 'Julio' },
  { id: 8, label: 'Agosto' },
  { id: 9, label: 'Septiembre' },
  { id: 10, label: 'Octubre' },
  { id: 11, label: 'Noviembre' },
  { id: 12, label: 'Diciembre' },
]


const ismobile = computed(() => $q.platform.is.mobile);
const ventAnt = computed(() => {
  return Number(stores.value.reduce((accumulator, store) => { return (accumulator + Number(store.sales?.salesant * 1.1 || 0)); }, 0)).toFixed(2)
})
const ventAct = computed(() => {
  return Number(stores.value.reduce((accumulator, store) => { return accumulator + Number(store.sales?.salesact || 0); }, 0)).toFixed(2)
})

const Diferencia = computed(() => {
  return Number(stores.value.reduce((accumulator, store) => { return (accumulator + Number(store.sales?.salesact - store.sales?.salesant * 1.1 || 0)); }, 0)).toFixed(2)
})

const VentasHoy = computed(() => {
  return Number(stores.value.reduce((accumulator, store) => { return accumulator + Number(store.sales?.saleshoy || 0); }, 0)).toFixed(2)
})





const init = async () => {
  const date = new Date();
  const mes = date.getMonth() + 1
  smonth.value.val = meses.filter(e => e.id === mes)[0]
  $q.loading.show({ message: "Cargando Informacion" });
  console.log("se inicia el init");
  const resp = await ApiAssist.index();
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    stores.value = resp;
    getSale(stores.value, mes);
  }
};

const getSale = async (sucursales, mes) => {

  sucursales.forEach((e, index) => {
    setTimeout(() => {
      let host = e.ip_address;
      // let sale = `http://${host}/access/public/reports/getSalesPerMonth/${mes}`;
      let sale = `http://192.168.10.160:1619/access/public/reports/getSalesPerMonth/${mes}`;

      axios
        .get(sale)
        .then((done) => {
          e.sales = done.data == undefined ? null : done.data;
          console.log(done);
        })
        .catch((fail) => {
          console.log(fail.response.data.message);
        });
    }, index * 1000)
  });
  $q.loading.hide();
};

if ($user.session.rol == 'root') {
  init()
} else {
  $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
  $router.replace('/');
}

const ObtReport = () => {
  stores.value.map(e => e.sales = null);
  getSale(stores.value, smonth.value.val.id)
}

const mostInf = (rows) => {
  viewSaleSuc.value.state = true
  viewSaleSuc.value.val = rows
  console.log(rows)
}

</script>
