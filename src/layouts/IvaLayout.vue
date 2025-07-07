<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <!-- <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">IVA</span></div>
        <q-btn color="primary" icon="add">
          <q-menu>
            <div class="q-pa-md bg-grey-2 text-primary">Buscar Folio</div>
            <q-separator />
            <q-form dense @submit="search" class="q-gutter-md q-pa-md">
              <q-select v-model="cashdesk" :options="cashdesks" label="Serie" autofocus/>
              <q-input v-model="folio" type="number" label="Folio"/>
              <div class="text-right" v-if="cansearch">
                <q-btn type="submit" color="primary" icon="search"/>
              </div>
            </q-form>
          </q-menu>
        </q-btn>
      </q-toolbar> -->
    </q-header>


    <q-page-container>
      <!-- This is where pages get injected -->
      <!-- <router-view /> -->

      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">IVA</span></div>
        <q-btn color="primary" icon="add">
          <q-menu>
            <div class="q-pa-md bg-grey-2 text-primary">Buscar Folio</div>
            <q-separator />
            <q-form dense @submit="search" class="q-gutter-md q-pa-md">
              <q-select v-model="cashdesk" :options="cashdesks" label="Serie" autofocus />
              <q-input v-model="folio" type="number" label="Folio" />
              <div class="text-right" v-if="cansearch">
                <q-btn type="submit" color="primary" icon="search" />
              </div>
            </q-form>
          </q-menu>
        </q-btn>
      </q-toolbar>
      <q-page class="bg-grey-3" padding>

        <div class="row justify-center">
          <transition name="bounce">
            <TicketIva v-if="ticket" :data="ticket" @openCashDesk="openCashDesk" />
          </transition>
        </div>

        <q-dialog v-model="wndPayment.state">
          <CashDeskIva :data="ticket" :inc="inc" @pay="pay" />
        </q-dialog>

      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import TicketIva from 'src/components/IVA/Ticket.vue';
import CashDeskIva from 'src/components/IVA/CashDesk.vue';
import { assist } from "src/boot/axios";
import { useRoute, useRouter } from "vue-router";
const $router = useRouter();

import { computed, ref } from 'vue';

const VDB = useVDBStore();
const $q = useQuasar();

const cashdesks = VDB.series;
const cashdesk = ref(null);
const folio = ref("");
const ticket = ref(null);
const inc = ref(0.00);
const iva = ref(0.00);
const monto = ref(0.00);
const wndPayment = ref({ state: false });
const impresoras = ref(null);

const cansearch = computed(() => (cashdesk.value && folio.value.length));


const search = async () => {
  ticket.value = null;
  inc.value = 0.00;

  let ser = cashdesk.value;
  let fol = folio.value;
  let host = VDB.session.store.ip_address;
  let url = `http://${host}/access/public/iva/ticket?serie=${ser}&folio=${fol}`;

  axios.get(url)
    .then(done => {
      ticket.value = done.data;
    })
    .catch(fail => {
      console.log(fail);
      let status = fail.response.status;
      let response = fail.response.data;
      console.log(status);
      console.log(response);

      $q.notify({
        html: true,
        message: response.message,
        color: "negative",
        position: "center"
      });
    });
}

const openCashDesk = ({ _inc, _iva, impresora, _monto }) => {
  console.log(_inc, _iva, impresora, _monto);
  impresoras.value = impresora
  inc.value = parseFloat(_inc);
  iva.value = parseFloat(_iva);
  monto.value = parseFloat(_monto)
  wndPayment.value.state = true;
}

const pay = (modes) => {
  console.log("pagando...");
  console.log(modes);

  let host = VDB.session.store.ip_address;
  let by = `${VDB.session.name} - ${VDB.session.store.alias}`;
  let url = `http://${host}/access/public/iva/create`;
  // console.log(url)

  let data = {
    modes, by,
    ticket: ticket.value.ticket,
    iva: iva.value,
    monto: monto.value,
    impresora: impresoras.value
  }
  console.log(data);
  $q.loading.show({ message: "Imprimiendo..." });
  console.log(data);

  axios.post(url, data).then(done => {
    console.log(done.data);
    let resp = done.data;

    $q.loading.hide();
    wndPayment.value.state = false;
    ticket.iva = null;
    ticket.value = null;

    $q.notify({
      html: true,
      color: "positive",
      position: "center",
      message: `<span class="fs-inc2"> El ticket <b>${resp.ticket}</b> fue generado! </span>`,
    });

    if (!resp.printed) {
      $q.notify({
        html: true,
        color: "negative",
        position: "top",
        icon: "fas fa-bugs",
        message: `<span class="fs-inc2"> No se pudo emitir el ticket, la conexion a la impresora no esta disponible! </span>`,
      });
    }
  }).catch(fail => { console.log(fail); $q.loading.hide(); });
}

// if (VDB.session.rol == 'aux' || VDB.session.rol == 'gen' || VDB.session.rol == 'aud' || VDB.session.rol == 'root' || VDB.session.rol == 'caj') {
  // index()
  console.log(VDB.session)

// } else {
//   $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
//   $router.replace('/');
//   console.log(VDB.session)

// }

</script>

<style lang="scss">
.seeme {
  border: 2px solid green !important;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
</style>
