<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Apertura de Cajas</span>
        </div>
      </q-toolbar>
    </q-header>
    <q-separator spaced inset vertical dark />
    <q-page-container>
      <q-page>

        <div class="flex justify-center">
          <q-form class="q-gutter-md" @submit="envi">
            <q-card class="my-card" square bordere>
              <q-card-section>
                <div class="text-h4 text-center">APERTURA DE CAJA</div>
                <div class="text-subtitle2 text-center">Movimientos en cajas despues de el corte</div>
                <div class="text-center text-bold text-subtitle2 text-red">Recuerda que se tienen que guardar los cortes
                  anteriores</div>
              </q-card-section>
              <q-card-section>
                <q-select v-model="form.cash" :options="cash.opts" label="Caja" option-label="DESTER"
                  option-value="CODTER" outlined dense />
              </q-card-section>
              <q-card-section>
                <q-select v-model="form._cashier" :options="cashiers.opts" label="Cajero" option-label="complete_name"
                  outlined dense />
              </q-card-section>
              <q-card-section>
                <q-select v-model="form._type" :options="types" label="Motivo" outlined dense />
              </q-card-section>
              <div v-if="form._type.label == 'Descuadre'">
                <q-card-section>
                  <q-input v-model="form.unsquare" type="Number" label="Monto de descuadre" outlined dense />
                </q-card-section>
                <q-card-section>
                  <q-input v-model="form.mismatch_reason" type="text" label="Motivo de descuadre" outlined dense />
                </q-card-section>
              </div>
              <div v-if="form._type.label == 'Mal Devolucion'">
                <q-card-section>
                  <q-input v-model="form.ticket" type="text" label="Cual es el numero de ticket original" outlined
                    dense />
                </q-card-section>
                <q-card-section>
                  <q-input v-model="form.refund_ticket" type="text" label="Cual es el numero de devolucion original"
                    outlined dense />
                </q-card-section>
                <q-card-section>
                  <q-input v-model="form.refund_reason" type="text"
                    label="Especifica por que se creara una devolucion nueva" outlined dense />
                </q-card-section>
              </div>
              <div v-if="form._type.label == 'Retirada Mal'">
                <q-card-section>
                  <q-input v-model="form.withdrawal_number" type="Number" label="Numero de retirada" outlined dense />
                </q-card-section>
                <q-card-section>
                  <q-select v-model="form.movement_type_id" :options="movement" label="Que se la hara?" outlined
                    dense />
                </q-card-section>
                <div v-if="form.movement_type_id.label == 'Modificar'">
                  <q-card-section>
                    <q-input v-model="form.withdrawal_mount" type="Number" label="Monto a modificar" outlined dense />
                  </q-card-section>
                </div>
                <q-card-section>
                  <q-input v-model="form.reason_modify" type="text" label="Especifica por que el cambio de la retirada"
                    outlined dense />
                </q-card-section>
                <q-card-section>
                  <q-select v-model="impresoras.val" :options="impresoras.opts" label="Impresora" option-label="name"
                    outlined dense />
                </q-card-section>
              </div>
              <q-card-section>
                <div class="col flex justify-center">
                  <q-uploader hide-upload-btn style="height: auto; width: 100%" label="Evidencia" accept="image/*"
                    ref="reference" @added="insertimage" field-name="file" flat @rejected="onRejected">
                  </q-uploader>
                </div>
              </q-card-section>
            </q-card>
            <div>
              <q-btn label="Enviar" type="submit" color="primary" class="full-width" :disable="validform" />
            </div>
          </q-form>
        </div>



      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';
import OpenApi from 'src/API/OpenCash.js';

import { computed, ref } from 'vue';
import { assist } from "src/boot/axios";
import axios from 'axios';//para dirigirme bro
import { useQuasar } from 'quasar';
import OpneBoxesLYT from './OpneBoxesLYT.vue';
const VDB = useVDBStore();
const $q = useQuasar();

const reference = ref(null)
const cash = ref({
  val: null,
  opts: []
})
const types = [
  { id: 1, label: 'Descuadre' },
  { id: 2, label: 'Mal Devolucion' },
  { id: 3, label: 'Retirada Mal' },
]

const movement = [
  { id: 1, label: 'Eliminar' },
  { id: 2, label: 'Modificar' },
]
const cashiers = ref({
  val: null,
  opts: null
});

const impresoras = ref({
  val: null,
  opts: []
})

const form = ref({
  _store: null,
  cash: null,
  _created_by: null,
  _cashier: null,
  _type: { id: 0, label: 'Ninguno' },
  unsquare: null,//descuadre
  mismatch_reason: null,//motivodescuadre
  current_cut: null,//corte actual
  ticket: null,//ticket original
  refund_ticket: null,//ticket de devolucion original
  refund_reason: null,//rason de devolucion de el ticket
  withdrawal_number: null,//numero de retirada
  movement_type_id: { id: 0, label: 'Ninguno' },//tipo movimiento
  reason_modify: null,//razon de la modificacion o eliminacion
  withdrawal_mount: null//monto real de modificiacion
})

const validform = computed(() => {
  if (form.value._type.id == 1 && form.value.cash && form.value._cashier && form.value.unsquare && form.value.mismatch_reason && form.value.current_cut) {
    return false
  } else if (form.value._type.id == 2 && form.value.cash && form.value._cashier && form.value.ticket && form.value.refund_reason && form.value.current_cut) {
    return false
  } else if (form.value._type.id == 3 && form.value.cash && form.value._cashier && form.value.current_cut && form.value.withdrawal_number && form.value.movement_type_id.id != 0 && form.value.reason_modify) {
    return false
  } else {
    return true
  }
})

const index = async () => {
  let idstore = VDB.session.store.id;
  const resp = await OpenApi.index(idstore)
  if (resp.fail) {
    console.log(resp);
  } else {
    cashiers.value.opts = resp
    impre()
  }
}

const init = async () => {
  let host = VDB.session.store.ip_address;
  let url = `http://${host}/access/public/modify/getCash`;
  const resp = await axios.get(url)
  if (resp.status == 200) {
    console.log(resp.data)
    cash.value.opts = resp.data
  } else {
    console.log(resp)
  }
}

const onRejected = () => {
  $q.notify({ message: 'No se acepta este archivo', type: 'negative', position: 'center' })
};

const insertimage = (file) => {
  form.value.current_cut = file[0];
}

const impre = async () => {
  let idstore = VDB.session.store.id;
  console.log(idstore)
  const resp = await OpenApi.getPrinters(idstore)
  if (resp.fail) {
    console.log(resp);
  } else {
    // console.log(resp)
    impresoras.value.opts = resp
    console.log("Impresoras listas :)")
  }
}


const envi = async () => {
  // $q.loading.show({ message: 'Enviando Datos' })
  let type = form.value._type.id;
  form.value._store = VDB.session.store.id;
  form.value._created_by = VDB.session.id;

  const formData = new FormData();
  formData.append('_store', form.value._store);
  formData.append('cash', form.value.cash.CODTER);
  formData.append('cash_name', form.value.cash.DESTER);
  formData.append('_created_by', form.value._created_by);
  formData.append('_cashier', form.value._cashier.id);
  formData.append('_type', form.value._type.id);
  formData.append('current_cut', form.value.current_cut);
  if (type == 1) {//descuadre
    formData.append('unsquare', form.value.unsquare);
    formData.append('mismatch_reason', form.value.mismatch_reason);
  } else if (type == 2) {//mal devolucion
    formData.append('ticket', form.value.ticket);
    formData.append('refund_ticket', form.value.refund_ticket);
    formData.append('refund_reason', form.value.refund_reason);
  } else if (type == 3) {//retirada mal
    formData.append('withdrawal_number', form.value.withdrawal_number);
    formData.append('movement_type_id', form.value.movement_type_id.id);
    formData.append('reason_modify', form.value.reason_modify);
    formData.append('print', impresoras.value.val.ip_address);
    if (form.value.movement_type_id.id == 2) {
      formData.append('withdrawal_mount', form.value.withdrawal_mount);
    }
  }
  const resp = await OpenApi.opening(formData)
  if (resp.fail) {
    console.log(resp)
    if (resp.fail.status == 400) {
      $q.notify({
        type: 'negative',
        message: resp.fail.response.data,
        position: 'center'
      })
      alert(resp.fail.response.data)
      $q.loading.hide();
    }else{
    console.log(resp)
    }
  } else {
    console.log(resp);
    $q.notify({
      type: 'positive',
      message: resp,
      position: 'center'
    })
    $q.loading.hide();
    reset();
  }
}

const reset = () => {
  form.value = {
    _store: null,
    cash: null,
    _created_by: null,
    _cashier: null,
    _type: { id: 0, label: 'Ninguno' },
    unsquare: null,//descuadre
    mismatch_reason: null,//motivodescuadre
    current_cut: null,//corte actual
    ticket: null,//ticket original
    refund_ticket: null,//ticket de devolucion original
    refund_reason: null,//rason de devolucion de el ticket
    withdrawal_number: null,//numero de retirada
    movement_type_id: { id: 0, label: 'Ninguno' },//tipo movimiento
    reason_modify: null,//razon de la modificacion o eliminacion
    withdrawal_mount: null//monto real de modificiacion
  }
  reference.value.reset();
  impresoras.value.val = null
}

if (VDB.session.rol == 'aux' || VDB.session.rol == 'gen' || VDB.session.rol == 'aud' || VDB.session.rol == 'root') {
  index()
} else {
  $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
  $router.replace('/');
}


index();
init();

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
