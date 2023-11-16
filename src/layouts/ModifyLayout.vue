<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">TICKETS</span></div>
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
    </q-header>
    <q-page-container>
      <!-- This is where pages get injected -->
      <!-- <router-view /> -->


      <q-page class="bg-grey-3" padding>
        <!-- comienza div de opciones hacia el ticket contiene el envio de reimpresion y la devolucion -->
        <div class="row justify-center">
          <transition name="bounce">
            <q-card v-if="ticket.state" style="min-width: 400px;" flat bordered>
              <q-list bordered>
                <q-item>
                  <q-item-section>Ticket : </q-item-section>
                  <q-item-section>{{ ticket.body.ticket }}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>Cliente : </q-item-section>
                  <q-item-section>{{ ticket.body.cliente }}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>Fecha : </q-item-section>
                  <q-item-section>{{ ticket.body.fecha }}</q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>Total : </q-item-section>
                  <q-item-section>$ {{ ticket.body.total }}</q-item-section>
                </q-item>
                <q-separator />
                <q-item class="bg-indigo-2">
                  <q-item-section>Movimiento</q-item-section>
                  <q-item-section>
                    <q-select dense v-model="mod" :options="listmod" label="Seleccione" filled autofocus />
                  </q-item-section>
                </q-item>

                <q-item v-if="mod == 'Devolucion' || mod == 'Reimpresion'">
                  <q-item-section>Impresora</q-item-section>
                  <q-item-section v-if="!impresoras.body">
                    <q-spinner-hourglass color="purple" size="2em" />
                    <q-tooltip :offset="[0, 8]">Obteniendo Impresoras</q-tooltip>
                  </q-item-section>
                  <q-item-section v-else>
                    <q-select dense option-label="name" v-model="impresoras.val" :options="impresoras.body"
                      label="Impresora" filled autofocus />
                  </q-item-section>
                </q-item>
                <div v-if="mod == 'Devolucion'">
                  <q-item>
                    <q-item-section>Motivo de la devolucion</q-item-section>
                    <q-item-section>
                      <q-input v-model="motivo" type="text" label="describe el motivo" />
                    </q-item-section>
                  </q-item>
                </div>
              </q-list>
              <div v-if="ala">
                <q-card-actions align="between">
                  <q-btn flat icon="cancel" />
                  <q-btn flat icon="arrow_forward" @click="envia" />
                </q-card-actions>
              </div>
            </q-card>
          </transition>
        </div>


        <!-- comienza el editado de el ticket jeje -->
        <transition name="bounce">

          <q-card class="my-card" v-if="tickmod.state" style="min-width: 400px;" flat bordered>
            <q-list bordered>
              <q-card class="my-card">
                <q-card-section>
                  <q-item class="text-center">
                    <q-item-section>
                      <q-item-label caption lines="2">Ticket</q-item-label>
                      <q-item-label class="text-h4">{{ tickmod.body.ticket.ticket }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption lines="2">Fecha</q-item-label>
                      <q-item-label class="text-h6">{{ tickmod.body.ticket.fecha }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label caption lines="2">Total</q-item-label>
                      <q-item-label class="text-h6">{{ Number.parseFloat(totm).toFixed(2) }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>

              <q-separator spaced inset vertical dark />

              <q-card class="my-card">
                <q-card-section>
                  <q-item class="text-h6 ">
                    <q-item-section>
                      <q-item-label lines="2">Cliente</q-item-label>
                      <q-item-label>
                        <q-form @submit="cambiocliente" class="q-gutter-md q-display-flex q-justify-center">
                          <q-input v-model="clifac" type="number" style="max-width: 100px;" />
                        </q-form>
                      </q-item-label>
                    </q-item-section>
                    <q-item-section>{{ tickmod.body.ticket.cliente }}</q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
              <q-separator spaced inset vertical dark />

              <q-item>
                <q-item-section>
                  <q-card class="my-card">
                    <q-card-section>
                      <q-form @submit="searchproduct" class="q-gutter-md">
                        <div>
                          <q-input v-model="sarchpro" type="text" label="Agregar Modelo" />
                        </div>
                      </q-form>
                    </q-card-section>
                  </q-card>
                </q-item-section>
              </q-item>
              <q-separator spaced inset vertical dark />

              <q-card class="my-card">
                <q-card-section>
                  <q-item>
                    <q-item-section>ARTICULO</q-item-section>
                    <q-item-section>DESCRIPCION</q-item-section>
                    <q-item-section>CANTIDAD</q-item-section>
                    <q-item-section>PRECIO</q-item-section>
                    <q-item-section>TOTAL</q-item-section>
                  </q-item>
                  <q-scroll-area style="height: 300px; max-width: 1700px;">
                    <q-item v-for="(product, index) in productos" :key="index" @click="seleccionart(product)" clickable
                      v-ripple>
                      <q-item-section>{{ product.ARTICULO }}</q-item-section>
                      <q-item-section>{{ product.DESCRIPCION }}</q-item-section>
                      <q-item-section >{{ Number.parseFloat(product.CANTIDAD).toFixed(2) }}</q-item-section>
                      <q-item-section>$ {{ Number.parseFloat(product.PRECIO).toFixed(2) }}</q-item-section>
                      <q-item-section>$ {{ Number.parseFloat((product.PRECIO * product.CANTIDAD)).toFixed(2) }}</q-item-section>
                    </q-item>
                  </q-scroll-area>
                </q-card-section>
              </q-card>

              <q-item>
                <q-item-section>
                </q-item-section>
              </q-item>


              <q-separator spaced inset vertical dark />

              <q-card class="my-card">
                <q-card-section>
                  <q-item>
                    <q-item-section>
                      <q-item-label>Observaciones</q-item-label>
                    </q-item-section>
                    <q-item-section side top>
                      <q-input v-model="obs1" type="text" label="observaciones" style="max-width: 100%;" />
                    </q-item-section>
                  </q-item>

                </q-card-section>
              </q-card>





              <q-btn class="full-width" color="primary" icon="receipt" label="PAGAR" @click="cobros" />

              <q-dialog v-model="editprod.state" :position="'right'" persistent>
                <q-card class="my-card">
                  <q-card-section>
                    <div class="text-h6">Articulo : {{ editprod.body.ARTICULO }}</div>
                    <div class="text-subtitle2">Descripcion : {{ editprod.body.DESCRIPCION }}</div>
                  </q-card-section>
                  <q-card-section class="row ">
                    <div class="row justify-between">
                      <q-input v-model="editprod.body.CANTIDAD" type="number" label="Cantidad" style="max-width: 50%;" />
                    </div>
                  </q-card-section>
                  <q-card-section class="row justify-between">
                    <div class="text-subtitle2">Precio : {{ Number.parseFloat(editprod.body.PRECIO).toFixed(2) }}</div>
                    <div class="text-subtitle2">Total : {{ Number.parseFloat((editprod.body.PRECIO * editprod.body.CANTIDAD)).toFixed(2) }}</div>
                  </q-card-section>
                  <q-card-actions class="row justify-between">
                    <q-btn flat icon="delete" color="negative" @click="deleteprod" />
                    <q-btn flat icon="arrow_forward_ios" :disable="editprod.body.CANTIDAD.length <= 0" @click="edpro" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <q-dialog v-model="addproduct.state" :position="'left'" persistent>
                <q-card class="my-card">
                  <q-card-section>
                    <div class="text-h6">Articulo : {{ addproduct.body.CODART }}</div>
                    <div class="text-subtitle2">Descripcion : {{ addproduct.body.DESART }}</div>
                  </q-card-section>
                  <q-card-section class="row ">
                    <div class="row justify-between">
                      <q-input v-model="addproduct.account" type="number" label="Cantidad" style="max-width: 50%;" />
                    </div>
                  </q-card-section>
                  <q-card-section class="row justify-between">
                    <div class="text-subtitle2">Precio : {{ Number.parseFloat(addproduct.body.PRELTA).toFixed(2) }}</div>
                    <div class="text-subtitle2">Total : {{ Number.parseFloat((addproduct.body.PRELTA * addproduct.account)).toFixed(2) }}</div>
                  </q-card-section>
                  <q-card-actions class="row justify-between">
                    <q-btn flat icon="close" color="positive" v-close-popup />
                    <q-btn flat icon="arrow_forward_ios" :disable="addproduct.account <= 0" v-close-popup
                      @click="addpr" />
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <q-dialog v-model="climod.state">
                <q-card>
                  <q-card-section class=" items-center">
                    <div class="text-h5">Se cambiara el cliente a:</div>
                    <q-separator spaced inset vertical dark />
                    <div class="text-h6 text-center text-bold ">{{ climod.body.NOFCLI }}</div>
                    <q-separator spaced inset vertical dark />
                    <div class="q-ml-sm text-center">Desea recalcular el ticket ?</div>
                  </q-card-section>
                  <q-card-actions align="center">
                    <q-btn flat icon="close" color="primary" v-close-popup />
                    <q-btn flat icon="check" color="positive" v-close-popup @click="recalcular" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-list>
          </q-card>
        </transition>

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

const VDB = useVDBStore();
const $q = useQuasar();

const cashdesks = VDB.series;
const clifac = ref(null);
const cashdesk = ref(null);
const folio = ref("");
const ticket = ref({
  state: false,
  body: null
});

const tickmod = ref({
  state: false,
  body: null
})

const impresoras = ref({
  val: null,
  body: null
})
const sarchpro = ref(null);
const obs1 = ref(null)
const editprod = ref({
  state: false,
  body: null
})
const addproduct = ref({
  state: false,
  body: null,
  account: 0
})

const climod = ref({
  state: false,
  body: null
})

const recl = ref(null)

let totm =  ref(null)

const mod = ref(null);//guarda el movimiento
const listmod = ["Devolucion", "Modificacion", "Reimpresion"]//listado de movimiento
const cansearch = computed(() => (cashdesk.value && folio.value.length));//para enviar a buscar
const productos = computed(() => tickmod.value.body.product)
const ala = computed(() => (((impresoras.value.val) && ((mod.value == "Devolucion" && motivo.value.length > 10) || (mod.value == "Reimpresion"))) || mod.value == "Modificacion"))
const motivo = ref('');

const index = async () => {
  let host = VDB.session.store.ip;
  let impr = `http://${host}/access/public/modify/getPrinter`;
  axios.get(impr)
    .then(done => {
      impresoras.value.body = done.data
      console.log("Impresoras listas :)")
    })
    .catch(fail => {
      console.log(fail.response.data.message);
    });
}

const search = async () => {
  ticket.value.body = null;
  let ser = cashdesk.value;
  let fol = folio.value;
  let host = VDB.session.store.ip;
  let url = `http://${host}/access/public/modify/getTicket?serie=${ser}&folio=${fol}`;


  axios.get(url)
    .then(done => {
      ticket.value.state = true
      ticket.value.body = done.data;
    })
    .catch(fail => {
      console.log(fail.response.data.message);
      $q.notify({
        html: true,
        message: fail.response.data.message,
        color: "negative",
        position: "center"
      });
    });
}

const envia = async () => {
  let host = VDB.session.store.ip;
  let by = `${VDB.session.name} - ${VDB.session.store.alias}`;
  if (mod.value == "Devolucion") {
    let impdat = {
      type: mod.value,
      serie: cashdesk.value,
      folio: folio.value,
      mot: motivo.value,
      create: by,
      print: impresoras.value.val.ip
    }
    console.log(impdat);
    let url = `http://${host}/access/public/modify/newmod`;
    axios.post(url, impdat)
      .then(r => {
        ticket.value.state = false
        console.log(r)
        mod.value = null;
        motivo.value = '';
        impresoras.value.val = null;
        cashdesk.value = null;
        folio.value = "";

        $q.notify({
          html: true,
          message: r.data.mssg,
          color: "positive",
          position: "center"

        });

      })
      .catch(fail => {
        console.log(fail.response.data.message);
        $q.notify({
          html: true,
          message: fail.response.data.message,
          color: "negative",
          position: "center"
        });
      });

  } else if (mod.value == "Reimpresion") {
    let impdat = {
      type: mod.value,
      serie: cashdesk.value,
      folio: folio.value,
      print: impresoras.value.val.ip
    }
    let url = `http://${host}/access/public/modify/newmod`;
    axios.post(url, impdat)
      .then(r => {
        ticket.value.state = false
        console.log(r)
        mod.value = null;
        impresoras.value.val = null;
        cashdesk.value = null;
        folio.value = "";

      })
      .catch(r => r);
  } else if (mod.value == "Modificacion") {
    console.log("modificado")
    let impdat = {
      type: mod.value,
      serie: cashdesk.value,
      folio: folio.value,
    }
    let url = `http://${host}/access/public/modify/newmod`;
    axios.post(url, impdat)
      .then(r => {
        console.log(r)
        tickmod.value.state = true;
        ticket.value.state = false;
        tickmod.value.body = r.data;
        totm.value = Number(r.data.ticket.total)
        clifac.value = r.data.ticket.codcli;
        obs1.value = r.data.ticket.observacion;
      })
      .catch(r => r);
  }
}
const cambiocliente = async () => {
  console.log("cambio de cliente");
  let client = clifac.value;
  console.log(client)
  let host = VDB.session.store.ip;
  let rux = `http://${host}/access/public/modify/getClient?client=${client}`;
  axios.get(rux)
    .then(done => {
      console.log(done.data)
      climod.value.body = done.data
      tickmod.value.body.ticket.cliente = done.data.NOFCLI
      climod.value.state = true;
    })
    .catch(fail => {
      console.log(fail.response.data);
      $q.notify({
        html: true,
        message: fail.response.data,
        color: "negative",
        position: "center"
      });

    });


}

const seleccionart = (a) => {
  console.log(`Mostrando Articulo ${a.ARTICULO}`)
  editprod.value.state = true
  editprod.value.body = a

}
const searchproduct = async () => {
  console.log("Buscando Producto Y propiedades");
  let envl = {
    product: sarchpro.value,
    price: clifac.value
  }
  let bpec = tickmod.value.body.product.findIndex((a) => a.ARTICULO == sarchpro.value)
  if (bpec == -1) {
    let host = VDB.session.store.ip;
    let impr = `http://${host}/access/public/modify/getProduct`;
    axios.get(impr, { params: envl })
      .then(done => {
        console.log(done.data)
        addproduct.value.body = done.data
        addproduct.value.state = true
      })
      .catch(fail => {
        console.log(fail.response.data);
        $q.notify({
          html: true,
          message: fail.response.data,
          color: "negative",
          position: "center"
        });
      });

  } else {
    $q.notify({
      html: true,
      message: `El productos ${sarchpro.value} ya esta en el ticket`,
      color: "negative",
      position: "center"
    });

  }

}

const cobros = () => console.log("Pasa a cobros")

const deleteprod = () => {
  console.log("Se eliminara el articulo");
  let art = editprod.value.body.ARTICULO
  let inx = tickmod.value.body.product.findIndex((a) => a.ARTICULO == art)
  console.log(inx);
  tickmod.value.body.product.splice(inx, 1);
  editprod.value.state = false;
  totm.value = tickmod.value.body.product.reduce((a,e) =>  a + Number(e.TOTAL),0)
};

const addpr = () => {
  let ardpr = {
    ARTICULO: addproduct.value.body.CODART,
    DESCRIPCION: addproduct.value.body.DESART,
    CANTIDAD: addproduct.value.account,
    PRECIO: addproduct.value.body.PRELTA,
    TOTAL: addproduct.value.account * addproduct.value.body.PRELTA
  };

  tickmod.value.body.product.push(ardpr);
  totm.value = tickmod.value.body.product.reduce((a,e) => a + Number(e.TOTAL),0)
  addproduct.value.account = 0;
  sarchpro.value = null
}

const recalcular = () => {
  console.log("recalculando ticket");
  let prmod = tickmod.value.body.product;
  let clmd = clifac.value
  let envm = {
    cliente: clmd,
    productos: prmod
  }
  let host = VDB.session.store.ip;
  let riwo = `http://${host}/access/public/modify/getPrices`;
  axios.get(riwo, { params: envm })
    .then(done => {
      console.log(done.data)
      recl.value = done.data
      recl.value.forEach(e => {
        let inx = tickmod.value.body.product.findIndex((is) => is.ARTICULO == e.CODART);
        tickmod.value.body.product[inx].PRECIO = e.PRELTA
      });
      totm.value = tickmod.value.body.product.reduce((a,e) => a + (Number(e.CANTIDAD) * Number(e.PRECIO)),0)
    })
    .catch(fail => {
      console.log(fail.response.data);
      $q.notify({
        html: true,
        message: fail.response.data,
        color: "negative",
        position: "center"
      });
    });
}

const edpro = () =>{
  totm.value = tickmod.value.body.product.reduce((a,e) => a + (Number(e.CANTIDAD) * Number(e.PRECIO)),0)
}

index();
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
