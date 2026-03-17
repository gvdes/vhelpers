<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>

    <q-page-container>
      <!-- This is where pages get injected -->
      <!-- <router-view /> -->
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">TICKETS</span></div>
        <q-btn color="primary" icon="add">
          <q-menu>
            <div class="q-pa-md  text-primary">Buscar Folio</div>
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


      <q-page class="" padding>
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
                <q-item class="" :class="$q.dark.isActive ? 'text-white bg-indigo' : 'text-dark bg-indigo-2'">
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
                  <q-btn flat icon="arrow_forward" @click="envia" :disable="datenv" />
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

              <q-card class="my-card">
                <q-card-section>
                  <q-item>
                    <q-item-section>
                      <q-form @submit="searchproduct" class="q-gutter-md">
                        <div>
                          <q-input v-model="sarchpro" type="text" label="Agregar Modelo" />
                        </div>
                      </q-form>

                    </q-item-section>
                  </q-item>
                </q-card-section>
              </q-card>
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
                    <q-item class="border" v-for="(product, index) in productos" :key="index"
                      @click="seleccionart(product)" clickable v-ripple>
                      <q-item-section>{{ product.ARTICULO }}</q-item-section>
                      <q-item-section>{{ product.DESCRIPCION }}</q-item-section>
                      <q-item-section>{{ Number.parseFloat(product.CANTIDAD).toFixed(2) }}</q-item-section>
                      <q-item-section>$ {{ Number.parseFloat(product.PRECIO).toFixed(2) }}</q-item-section>
                      <q-item-section>$ {{ Number.parseFloat((product.PRECIO *
                        product.CANTIDAD)).toFixed(2) }}</q-item-section>
                    </q-item>
                  </q-scroll-area>
                </q-card-section>
              </q-card>

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
            </q-list>
          </q-card>
        </transition>

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
              <div class="text-subtitle2">Total : {{ Number.parseFloat((editprod.body.PRECIO *
                editprod.body.CANTIDAD)).toFixed(2) }}</div>
            </q-card-section>
            <q-card-actions class="row justify-between">
              <q-btn flat icon="delete" color="negative" @click="deleteprod" />
              <q-btn flat icon="arrow_forward_ios" :disable="editprod.body.CANTIDAD.length <= 0" @click="edpro"
                v-close-popup />
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
              <div class="text-subtitle2">Total : {{ Number.parseFloat((addproduct.body.PRELTA *
                addproduct.account)).toFixed(2) }}</div>
            </q-card-section>
            <q-card-actions class="row justify-between">
              <q-btn flat icon="close" color="positive" v-close-popup />
              <q-btn flat icon="arrow_forward_ios" :disable="addproduct.account <= 0" v-close-popup @click="addpr" />
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

        <q-dialog v-model="pag">
          <q-card class="my-card" style="width: 700px; max-width: 80vw;">
            <div class="bg-primary row items-center justify-between q-pa-md text-white">
              <div>
                <div class="fs-dec3">TICKET</div>
                <div class="text-h4">{{ tickmod.body.ticket.ticket }}</div>
              </div>
              <div class="text-center">
                <div class="fs-dec3">Total Anterior</div>
                <div class="fw-bold text-h6">$ {{ ticket.body.total }}</div>
              </div>
              <div class="text-right">
                <div class="fs-dec3">Total Actual</div>
                <div class="fw-bold text-h4">$ {{ totm }}</div>
              </div>
            </div>
            <div>
              <q-form @submit="mosimp" class="q-gutter-md">
                <q-card-section>
                  <div class="row text-center items-center">
                    <div class="col"> Forma de pago: </div>
                    <div class="col"> <q-select class="col-3" v-model="modes.EFE.id" :options="paymeths"
                        option-value="id" option-label="desc" dense filled label="Forma de pago"
                        :option-disable="(val) => optionDisabled(val)">
                      </q-select> </div>
                  </div>
                  <q-separator spaced inset vertical dark />
                  <div class="row text-center items-center ">
                    <div class="col"> {{ modes.EFE.id?.id == 'EFE' ? 'Efectivo' : 'Importe Cobrado' }}</div>
                    <div class="col"> <q-input class="col" v-model="modes.EFE.val" type="number" autofocus :min="0.00"
                        step="any" dense input-class="q-pl-md fw-sbold fs-inc4" filled>
                        <template v-slot:after>
                          <q-btn color="primary" icon="backspace" flat dense round v-if="parseFloat(modes.EFE.val)"
                            @click="modes.EFE.val = 0" />
                        </template>
                      </q-input>

                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="row flex justify-center ">
                    <div class="col flex justify-center">
                      <q-btn color="primary" label="2ª Forma de pago"
                        @click="() => { dafpa = !dafpa; modes.DIG.val = 0; modes.DIG.id = null; }" outline rounded dense
                        size="md" style="width: 70%;" />
                    </div>
                    <div class="col" v-if="dafpa">
                      <q-select class="col-3" v-model="modes.DIG.id" :options="paymeths" label="Forma Pago"
                        option-value="id" option-label="desc" dense filled
                        :option-disable="(val) => optionDisable(val)">
                      </q-select>
                    </div>
                  </div>
                  <q-separator spaced inset vertical dark />
                  <div class="row flex justify-center text-center" v-if="dafpa">
                    <div class="col"> {{ modes.DIG.id?.id == 'EFE' ? 'Efectivo' : 'Importe Cobrado' }}</div>
                    <div class="col"> <q-input class="col" v-model="modes.DIG.val" type="number" autofocus :min="0.00"
                        step="any" dense input-class="q-pl-md fw-sbold fs-inc4" filled>
                        <template v-slot:after>
                          <q-btn color="primary" icon="backspace" flat dense round v-if="parseFloat(modes.DIG.val)"
                            @click="modes.DIG.val = 0" />
                        </template>
                      </q-input>

                    </div>
                  </div>
                </q-card-section>
                <div>

                  <q-card-section>
                    <q-select v-model="valecli.val" :options="valecli.opts" label="Descontar Vale" filled
                      @update:model-value="buscarvales" />
                  </q-card-section>
                  <q-card-section v-if="valecli.val == 'SI'">
                    <div class="row items-center">
                      <div class="col-3">No. Vale</div>
                      <q-select v-model="enval.prc" :options="enval.body" option-label="CODANT" label="Descontar Vale"
                        filled style="width: 250px" @update:model-value="val1 = enval.prc.IMPANT" />
                      <q-separator spaced inset vertical dark />
                      <div class="col-3 bg-blue-grey-2" v-if="enval.prc"> $ {{
                        Number.parseFloat(enval.prc.IMPANT).toFixed(2) }}</div>
                    </div>
                  </q-card-section>
                  <q-card-section v-if="retirada">
                    <div class="fs-dec3 row items-center justify-end q-pa-xs text-black">
                      <q-checkbox left-label v-model="checkretirada" label="Hacer Retirada de el sobrante" />
                    </div>
                  </q-card-section>
                </div>
              </q-form>
            </div>
            <div class="bg-deep-purple-3 row items-center justify-between q-pa-md text-black">
              <div>
                <div class="fs-dec3">Cambio</div>
                <div class="text-h5"> $ {{ cambio }}</div>
              </div>
              <div class="text-center" v-if="valpag">
                <q-btn color="primary" icon="payment" label="Pagar" @click="mosimp" />
              </div>
            </div>
            <q-dialog v-model="stateimp">
              <q-card class="my-card">
                <q-card-section>
                  <div class="text-h6 text-center">Impresora</div>
                </q-card-section>
                <q-card-section>
                  <q-form @submit="terminar" class="q-gutter-md">
                    <q-select dense option-label="name" v-model="impresoras.val" :options="impresoras.body"
                      label="Impresora" filled autofocus style="width: 200px" />
                    <div>
                      <q-btn label="Enviar" type="submit" color="primary" style="width: 200px" />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
          </q-card>
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
import { assist } from "src/boot/axios";

import { computed, ref } from 'vue';

const VDB = useVDBStore();
const $q = useQuasar();

// let fechaActual = new Date();
// let dia = fechaActual.getDate();
// let mes = (fechaActual.getMonth() + 1).toString().padStart(2, 0);
// let anio = fechaActual.getFullYear()

// let fecha = dia + '/' + mes + '/' + anio
const checkretirada = ref(false);
const cashdesks = VDB.series;
const clifac = ref(null);
const pag = ref(false);
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
const stateimp = ref(false);
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
const totm = ref(null)
const valecli = ref({
  val: null,
  opts: ["SI", "NO"]
})
const enval = ref({
  prc: null,
  body: null,
})
const val1 = ref(0)
const motivo = ref('');
const datenv = ref(null);


const modes = ref({ "EFE": { id: null, val: 0 }, "DIG": { id: null, val: 0 } });
const paymeths = [
  { id: "EFE", desc: "CONTADO EFECTIVO" },
  { id: "TBA", desc: "TARJETA C/D BANCOMER" },
  { id: "TSA", desc: "TARJETA C/D SANTANDER" },
  { id: "TDB", desc: "TRA/DEP BANCOMER" },
  { id: "TDA", desc: "TRA/DEP Santander" },
  // { id: "TDS", desc: "TRA/DEP Scotiabank" },
  { id: "C30", desc: "CREDITO" },
]

const dafpa = ref(false);
const mod = ref(null);//guarda el movimiento
const listmod = ["Devolucion", "Modificacion", "Reimpresion"]//listado de movimiento
const cansearch = computed(() => (cashdesk.value && folio.value.length));//para enviar a buscar
const productos = computed(() => tickmod.value.body.product)
const ala = computed(() => (((impresoras.value.val) && ((mod.value == "Devolucion" && motivo.value.length > 10) || (mod.value == "Reimpresion"))) || mod.value == "Modificacion"))
const cambio = computed(() => (Number.parseFloat(modes.value.DIG.val) + Number.parseFloat(modes.value.EFE.val) + Number.parseFloat(val1.value)) - totm.value)
const retirada = computed(() => {
  if ((modes.value.DIG.id?.id != 'EFE' && Number.parseFloat(modes.value.DIG.val) && (Number.parseFloat(modes.value.DIG.val) > totm.value) && Number.parseFloat(modes.value.EFE.val) == 0) || (modes.value.EFE.id?.id != 'EFE' && Number.parseFloat(modes.value.EFE.val) && (Number.parseFloat(modes.value.EFE.val) > totm.value) && Number.parseFloat(modes.value.DIG.val) == 0)) {
    return true
  } else {
    return false
  }
})

const valpag = computed(() => cambio.value >= 0 && ((modes.value.EFE.id?.id && modes.value.EFE.val > 0) || (modes.value.DIG.id?.id && modes.value.DIG.val > 0)))


const index = async () => {
  let idstore = VDB.session.store.id;
  console.log(idstore)
  // console.log(host);
  // let impr = `http://${host}/access/public/modify/getPrinter`;
  try {
    let resp = await assist.get(`/cashier/getPrinters/${idstore}`)
    if (resp.status == 200) {
      impresoras.value.body = resp.data
      console.log("Impresoras listas :)")
    }

  } catch (err) {
    console.log(err);
    $q.notify({
      message: 'No se pudiron obtener las impresoras',
      type: 'negative',
      position: 'center',
      icon: 'error'
    })
  }
}

const search = async () => {
  ticket.value.body = null;
  let ser = cashdesk.value;
  let fol = folio.value;
  let host = VDB.session.store.ip_address;
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
  let host = VDB.session.store.ip_address;
  let by = `${VDB.session.name} - ${VDB.session.store.alias}`;
  if (mod.value == "Devolucion") {
    datenv.value = true
    let impdat = {
      type: mod.value,
      serie: cashdesk.value,
      folio: folio.value,
      mot: motivo.value,
      create: by,
      print: impresoras.value.val.ip_address
    }
    console.log(impdat);
    let url = `http://${host}/access/public/modify/newmod`;
    axios.post(url, impdat)
      .then(r => {

        ticket.value.state = false
        console.log(r)
        if (r.status == 200) {

          $q.notify({
            html: true,
            message: r.data.original.mssg,
            color: "positive",
            position: "center"

          });
        } else {
          $q.notify({
            html: true,
            message: r.data.original.message,
            color: "negative",
            position: "center"

          });
        }

        mod.value = null;
        motivo.value = '';
        impresoras.value.val = null;
        cashdesk.value = null;
        folio.value = "";
        datenv.value = false;


      })
      .catch(fail => {
        console.log(fail.response.data.original.message);
        datenv.value = false
        $q.notify({
          html: true,
          message: fail.response.data.original.message,
          color: "negative",
          position: "center"
        });
        ticket.value.state = false
        mod.value = null;
        motivo.value = '';
        impresoras.value.val = null;
        cashdesk.value = null;
        folio.value = "";
        datenv.value = false;
      });

  } else if (mod.value == "Reimpresion") {
    console.log(impresoras.value.val)
    datenv.value = true
    let impdat = {
      type: mod.value,
      serie: cashdesk.value,
      folio: folio.value,
      print: impresoras.value.val.ip_address
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
        datenv.value = false
      })
      .catch(r => r);
  } else if (mod.value == "Modificacion") {
    console.log("modificado")
    let impdat = {
      type: mod.value,
      serie: cashdesk.value,
      folio: folio.value,
    }
    datenv.value = true
    let url = `http://${host}/access/public/modify/newmod`;
    axios.post(url, impdat)
      .then(r => {
        console.log(r.data)
        tickmod.value.state = true;
        ticket.value.state = false;
        tickmod.value.body = r.data;
        totm.value = Number(r.data.ticket.total)
        clifac.value = r.data.ticket.codcli;
        obs1.value = r.data.ticket.observacion;
        datenv.value = false
      })
      .catch(r => {
        console.log(r.response.data.message);
        datenv.value = false
        $q.notify({
          html: true,
          message: r.response.data.message,
          color: "negative",
          position: "center"
        });
      });
  }
}

const cambiocliente = async () => {
  console.log("cambio de cliente");
  let client = clifac.value;
  console.log(client)
  let host = VDB.session.store.ip_address;
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
    let host = VDB.session.store.ip_address;
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

const cobros = () => {
  pag.value = true;

}

const deleteprod = () => {
  console.log("Se eliminara el articulo");
  let art = editprod.value.body.ARTICULO
  let inx = tickmod.value.body.product.findIndex((a) => a.ARTICULO == art)
  console.log(inx);
  tickmod.value.body.product.splice(inx, 1);
  editprod.value.state = false;
  totm.value = tickmod.value.body.product.reduce((a, e) => a + (Number(e.CANTIDAD) * Number(e.PRECIO)), 0)
}

const addpr = () => {
  let ardpr = {
    ARTICULO: addproduct.value.body.CODART,
    DESCRIPCION: addproduct.value.body.DESART,
    CANTIDAD: addproduct.value.account,
    PRECIO: addproduct.value.body.PRELTA,
    TOTAL: addproduct.value.account * addproduct.value.body.PRELTA
  };

  tickmod.value.body.product.push(ardpr);
  totm.value = tickmod.value.body.product.reduce((a, e) => a + (Number(e.CANTIDAD) * Number(e.PRECIO)), 0)
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
  let host = VDB.session.store.ip_address;
  let riwo = `http://${host}/access/public/modify/getPrices`;
  axios.get(riwo, { params: envm })
    .then(done => {
      console.log(done.data)
      recl.value = done.data
      recl.value.forEach(e => {
        let inx = tickmod.value.body.product.findIndex((is) => is.ARTICULO == e.CODART);
        tickmod.value.body.product[inx].PRECIO = e.PRELTA
      });
      totm.value = tickmod.value.body.product.reduce((a, e) => a + (Number(e.CANTIDAD) * Number(e.PRECIO)), 0)
      $q.notify({
        html: true,
        message: "Total cambiado",
        color: "positive",
        position: "center"
      });
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

const edpro = () => {
  totm.value = tickmod.value.body.product.reduce((a, e) => a + (Number(e.CANTIDAD) * Number(e.PRECIO)), 0)
}

const buscarvales = async () => {
  if (valecli.value.val == "SI") {
    console.log("Buscando vales");
    let host = VDB.session.store.ip_address;
    let impr = `http://${host}/access/public/modify/vales?price=${clifac.value}`;
    axios.get(impr)
      .then(done => {
        console.log(done.data)
        enval.value.body = done.data
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
    console.log("No se buscan vales");
    enval.value.body = null
    val1.value = 0
  }

}

const mosimp = () => stateimp.value = true


const terminar = async () => {
  $q.loading.show({ message: 'Realizando Devolucion' })
  let host = VDB.session.store.ip_address;
  let by = `${VDB.session.name} - ${VDB.session.store.alias}`;
  console.log("Realizando proceso de modificacion de tickeet");
  let tickdev = {
    type: mod.value,
    serie: cashdesk.value,
    folio: folio.value,
    mot: motivo.value,
    create: by,
    print: impresoras.value.val.ip_address
  }
  let ticknw = {
    serdev: cashdesk.value,
    foldev: folio.value,
    fdp: {
      efedig: modes.value,
      vale: enval.value.prc,
    },
    total: totm.value,
    create: by,
    productos: tickmod.value.body.product,
    print: impresoras.value.val.ip_address,
    cliente: clifac.value,
    cambio: cambio.value
  }
  console.log(enval.value.prc)
  console.log(ticknw);
  let url = `http://${host}/access/public/modify/modificacion`;
  axios.post(url, tickdev)

    .then(r => {
      ticket.value.state = false
      console.log(r)
      mod.value = null;
      motivo.value = '';
      folio.value = "";
      stateimp.value = false,
        pag.value = false;
      tickmod.value.state = false;
      tickmod.value.body = null;
      $q.notify({
        html: true,
        message: r.data.mssg,
        color: "positive",
        position: "center"
      });
      $q.loading.hide()
      $q.loading.show({ message: 'Realizando Factura' })
      let nwtck = `http://${host}/access/public/modify/nwtck`;
      axios.post(nwtck, ticknw)
        // .then(r=> console.log(r));
        .then(p => {

          $q.notify({
            html: true,
            message: p.data.mssg,
            color: "positive",
            position: "center"
          });
          if (checkretirada.value == true) {
            let ret = `http://${host}/access/public/modify/retirada`;
            let retiro = {
              nota: p.data.mssg,
              retiro: cambio.value,
              serdev: cashdesk.value,
              print: impresoras.value.val.ip_address,
              create: by,
            }
            console.log(retiro);
            axios.post(ret, retiro)
              .then(p => {
                console.log(p);
                $q.notify({
                  html: true,
                  message: p.data.mssg,
                  color: 'positive',
                  postion: 'center'
                })
                impresoras.value.val = null;
                cashdesk.value = null;
                checkretirada.value = false;
                modes.value = { "EFE": { id: null, val: 0 }, "DIG": { id: null, val: 0 } };
                enval.value = { prc: null, body: null }
                dafpa.value = false;
              })
              .catch(p => {
                console.log(p);
                $q.notify({
                  html: true,
                  message: p.data,
                  color: "negative",
                  position: "center"
                })
              })
          }
          impresoras.value.val = null;
          cashdesk.value = null;
          checkretirada.value = false;
          modes.value = { "EFE": { id: null, val: 0 }, "DIG": { id: null, val: 0 } };
          enval.value = { prc: null, body: null }
          dafpa.value = false;
          $q.loading.hide()

        })
        .catch(p => {
          console.log(p);
          $q.notify({
            html: true,
            message: p.data,
            color: "negative",
            position: "center"
          });
        })
    })
    .catch(r => {
      $q.notify({
        html: true,
        message: r.data.mssg,
        color: "negative",
        position: "center"
      });
    })

}

const optionDisable = (val) => {
  if (val.id == modes.value.EFE.id?.id) {
    return true
  }
  return false
}

const optionDisabled = (val) => {
  if (val.id == modes.value.DIG.id?.id) {
    return true
  }
  return false
}

// if (VDB.session.rol == 'aux' || VDB.session.rol == 'gen' || VDB.session.rol == 'aud' || VDB.session.rol == 'root') {
  index()
// } else {
//   $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
//   $router.replace('/');

// }


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
