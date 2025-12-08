<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class=" row justify-between">
          <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Devoluciones </span>
          </div>
          <div class="row">
            <q-btn color="primary" icon="add" flat @click="addRefund.state = !addRefund.state" v-if="VDB.session.store.id != 1" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-separator spaced inset vertical dark />
    <div v-if="refunds">
      <q-card class="my-card">
        <q-card-section class="text-center text-bold text-h6">
          <div class="row">
            <div class="col">Destino</div>
            <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded" />
          </div>
        </q-card-section>
        <q-card-section>
          <q-slide-transition>
            <div v-show="expanded">
              <viewRefund :refunds="refunds.to?.sort((a,b) => b.id - a.id)" :status="status" />
            </div>
          </q-slide-transition>

        </q-card-section>
      </q-card>

      <q-separator spaced inset vertical dark />
      <q-card class="my-card" v-if="VDB.session.store.id != 1">
        <q-card-section class="text-center text-bold text-h6">
          <div class="row">
            <div class="col">Origen</div>
            <q-btn color="grey" round flat dense :icon="expandedfrom ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expandedfrom = !expandedfrom" />
          </div>
        </q-card-section>
        <q-card-section>
          <q-slide-transition>
            <div v-show="expandedfrom">
              <viewRefund :refunds="refunds.from?.sort((a,b) => b.id - a.id)" :status="status" />
            </div>
          </q-slide-transition>

        </q-card-section>
      </q-card>
    </div>
  </q-page>

  <q-dialog v-model="addRefund.state" persistent>
    <q-card>
      <q-card-section>
        <span class="text-center text-h6 text-bold">Nueva Devolucion</span>
      </q-card-section>
      <q-card-section>
        <q-input v-model="addRefund.reference" type="text" label="Referencia" filled dense />
        <q-separator spaced inset vertical dark />
        <q-select v-model="addRefund.type" :options="types" label="Tipo" filled dense option-label="name"
          @update:model-value="() => addRefund.provider = null" />
        <q-separator spaced inset vertical dark />
        <q-select v-model="addRefund.provider" :options="mosProvider" label="Destino" filled dense
          :disable="addRefund.type == null" option-label="name" />
        <q-separator spaced inset vertical dark />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="reset" />
        <q-btn flat label="Enviar" color="primary" @click="addingRefund" :disable="validForm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import refundsApi from "src/API/refundsApi";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import { useRoute, useRouter } from "vue-router";
import dayjs from 'dayjs';
import viewRefund from 'src/components/Refunds/ViewRefunds.vue';// encabezado aoiida
const $router = useRouter();


const VDB = useVDBStore();
const $q = useQuasar();
const types = ref([]);
const status = ref([]);
const providers = ref([]);
const refunds = ref(null)
const expanded = ref(false)
const expandedfrom = ref(false)

const addRefund = ref({
  state: false,
  reference: null,
  provider: null,
  _warehouse: 1,
  type: null,
  _status: 1,
  _store_from: VDB.session.store.id,
  store_to: null,
  _created_by: VDB.session.id,
})


const mosProvider = computed(() => {
  if (addRefund.value.type) {
    return addRefund.value.type.id == 1 ? providers.value.filter(e => e._type == 1) : providers.value.filter(e => e._type == 2)
  } else {
    return providers.value
  }
})

const validForm = computed(() => { if (addRefund.value.reference && addRefund.value.type && addRefund.value.provider) { return false } else { return true } })

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos', type: 'positive', position: 'center' });
  let sid = VDB.session.store.id
  const resp = await refundsApi.index(sid)
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    types.value = resp.types;
    providers.value = resp.provider;
    refunds.value = resp.refunds
    status.value = resp.status
    $q.loading.hide()
  }

}
const reset = async () => {
  addRefund.value = {
    state: false,
    reference: null,
    provider: null,
    _warehouse: 1,
    type: null,
    _status: 1,
    _store_from: VDB.session.store.id,
    store_to: null,
    _created_by: VDB.session.id,
  }

}

const addingRefund = async () => {
  addRefund.value.store_to = addRefund.value.provider._store
  console.log(addRefund.value)
  const resp = await refundsApi.addRefund(addRefund.value);
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.notify({ message: 'Se creo correctamente la devolucion', type: 'positive', position: 'center' })
    $router.push(`/refunds/${resp.id}`);
  }
}

// if (VDB.session.rol == 'aux' || VDB.session.rol == 'gen' || VDB.session.rol == 'aud' || VDB.session.rol == 'root' || VDB.session.rol == 'ref') {
  init()
// } else {
//   $q.notify({ message: 'No tienes acceso a esta pagina', type: 'negative', position: 'center' })
//   $router.replace('/');
// }



</script>
