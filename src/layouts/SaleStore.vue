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
          <q-btn dense flat color="primary" icon="autorenew" @click="init" />
        </q-toolbar>
      </q-header>
      <q-separator spaced inset vertical dark />

      <div :class="ismobile ? '' : 'row'">
        <q-card class="my-card col" bordered dense v-if="!ismobile">
          <q-card-section>
            <div class="text-h6 text-center">Ventas 2023</div>
            <div class="text-h4 text-center">
              {{
                Number(
                  stores.reduce((accumulator, store) => {
                    return (
                      accumulator + Number(store.sales?.salesant * 1.1 || 0)
                    );
                  }, 0)
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              }}
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
              {{
                Number(
                  stores.reduce((accumulator, store) => {
                    return accumulator + Number(store.sales?.salesact || 0);
                  }, 0)
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              }}
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
              {{
                Number(
                  stores.reduce((accumulator, store) => {
                    return (
                      accumulator +
                      Number(
                        store.sales?.salesact - store.sales?.salesant * 1.1 || 0
                      )
                    );
                  }, 0)
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")
              }}
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
              {{
                Number(stores.reduce((accumulator, store) => {return accumulator + Number(store.sales?.saleshoy || 0);}, 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
              }}
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

      <q-table
        title="Sucursales"
        :rows="stores"
        row-key="id"
        :pagination="table.pagination"
        :filter="table.filter"
        hide-header
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="table.filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:body="props">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          >
            <q-list bordered dense >
              <q-item>
                <q-item-section>

                  <q-item-label overline>{{ props.row.name }}</q-item-label>
                  <q-item-label caption>{{ props.row.alias }}</q-item-label>
                  <div ></div>
                </q-item-section>
                <q-item-section class="text-right" v-if="!props.expand">
                  <q-item-label overline
                    >$
                    {{
                      Number(props.row.sales?.saleshoy)
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                    }}</q-item-label
                  >
                  <q-item-label caption
                    >tickets: {{ props.row.sales?.hoytck }}</q-item-label
                  >
                </q-item-section>
                <q-item-section avatar v-if="!ismobile">
                  <q-btn
                    color="grey"
                    flat
                    dense
                    :icon="
                      props.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                    "
                    @click="props.expand = !props.expand"
                  />
                </q-item-section>
              </q-item>
              <q-slide-transition>
                <div class="" v-show="props.expand" v-if="props.row.sales">
                  <q-separator />
                  <q-item class="text-center" dense>
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

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup >
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AppFullscreen, useQuasar } from "quasar";
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

const ismobile = computed(() => $q.platform.is.mobile);

const init = async () => {
  $q.loading.show({ message: "Cargando Informacion" });
  console.log("se inicia el init");
  const resp = await ApiAssist.index();
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    stores.value = resp;
    getSale(stores.value);
  }
};

const getSale = async (sucursales) => {
  sucursales.forEach((e) => {
    let host = e.ip_address;
    let sale = `http://${host}/access/public/reports/getSales`;
    axios
      .get(sale)
      .then((done) => {
        e.sales = done.data == undefined ? null : done.data;
        // console.log(e);
      })
      .catch((fail) => {
        console.log(fail.response.data.message);
      });
  });
  $q.loading.hide();
};



init();
</script>
<!-- <style scoped>
.q-item {
  transition: background-color 0.3s ease;
}
</style> -->
