<template>
  <q-card class="q-pa-lg" v-if="billing">
    <div class="row justify-between items-center q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Factura / Solicitud</div>
        <div class="text-caption text-grey-6">
          Creado el: {{ dayjs(billing.created_at).format("DD MMM YYYY - HH:mm") }}
        </div>
      </div>
      <div v-if="billing.constancia">
        <q-btn color="primary" icon="download" label="Descargar Constancia" @click="downloadPDF" />
      </div>
      <q-chip size="md" color="primary" text-color="white">
        {{ billing.status.name }}
      </q-chip>
    </div>
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-4">
        <q-card flat bordered class="q-pa-md">
          <div class="text-grey-7 text-caption">Ticket</div>
          <div class="text-h6 text-weight-medium">{{ billing.ticket }}</div>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card flat bordered class="q-pa-md">
          <div class="text-grey-7 text-caption">Total</div>
          <div class="text-h6 text-weight-medium">$ {{ billing.total }}</div>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card flat bordered class="q-pa-md">
          <div class="text-grey-7 text-caption">Sucursal</div>
          <div class="text-h6 text-weight-medium">{{ billing.store.name }}</div>
        </q-card>
      </div>
    </div>

    <q-card-section>
      <div class="text-subtitle1 text-weight-bold q-mb-sm">Datos de Contacto</div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <div class="text-caption text-grey-7">Nombre</div>
          <div class="text-body1">{{ billing.name }}</div>
        </div>

        <div class="col-12 col-sm-6">
          <div class="text-caption text-grey-7">Email</div>
          <div class="text-body1">{{ billing.email }}</div>
        </div>

        <div class="col-12 col-sm-6">
          <div class="text-caption text-grey-7">Teléfono</div>
          <div class="text-body1">{{ billing.celphone }}</div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="text-caption text-grey-7">Notas</div>
          <div class="text-body1">{{ billing.notes }}</div>
        </div>

      </div>
      <q-separator spaced inset vertical dark />
      <q-separator />
      <q-separator spaced inset vertical dark />
      <div class="text-subtitle1 text-weight-bold q-mb-sm">Datos Fiscales</div>
      <div class="row q-col-gutter-md">
        <div class="col">
          <div class="text-caption text-grey-7">RFC</div>
          <div class="text-body1">{{ billing.rfc }}</div>
        </div>

        <div class="col">
          <div class="text-caption text-grey-7">Razón Social</div>
          <div class="text-body1">{{ billing.razon_social }}</div>
        </div>
        <div v-for="p in billing.payments" :key="p.id" class="col">
          <div class="text-caption text-grey-7">{{ p.payment }}</div>
          <div class="text-body1">$ {{ p.import }}</div>
          <div class="text-caption"> {{ clavePayment(p.payment) }} </div>

        </div>
        <div class="col">
          <div class="text-caption text-grey-7">Numero Registro</div>
          <div class="text-body1 " :class="billing.nclient ? '' : 'text-red'">{{ billing.nclient ? billing.nclient :
            "Sin Registro" }}</div>
        </div>
        <div class="col-12">
          <div class="text-caption text-grey-7">Uso de CFDI</div>
          <div class="text-body1">
            {{ billing.cfdi.name }}
          </div>
        </div>
        <div class="col-12">
          <div class="text-caption text-grey-7">Dirección</div>
          <div class="text-body1">
            {{ fullAddress }}
          </div>
        </div>
        <div class="col-12">
          <div class="text-caption text-grey-7">Regimen</div>
          <div class="text-body1">
            {{ `${JSON.parse(billing.regimen).clave}` }} - {{ `${JSON.parse(billing.regimen).descripcion}` }}
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-subtitle1 text-weight-bold q-mb-sm">Productos</div>
      <q-table flat bordered dense :rows="billing.ticketSuc.products" :columns="cols" row-key="ARTLFA"
        class="q-mb-xl" />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn color="primary" :label="billing._state == 1 ? 'Continuar' : 'Terminar'" @click="nextStatus"
        v-if="billing._state != 4" />
      <q-btn color="negative" flat label="Cancelar" v-close-popup />
    </q-card-actions>
  </q-card>
</template>



<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import billingApi from 'src/API/billingApi.js';//para dirigirme bro
import { useBillingStore } from 'stores/BillingStore';
import axios from 'axios'
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import dayjs from 'dayjs';
import Billers from 'src/pages/Billing/Billers.vue';
import { vizmedia } from "boot/axios"
const VDB = useVDBStore();
const $billing = useBillingStore();
const $q = useQuasar();
const billing = ref(null)

const cols = [
  { name: 'ARTLFA', label: 'Código', field: 'ARTLFA', align: 'left' },
  { name: 'DESLFA', label: 'Descripción', field: 'DESLFA', align: 'left' },
  { name: 'CANLFA', label: 'Cantidad', field: 'CANLFA', align: 'center' },
  { name: 'PRELFA', label: 'Precio', field: 'PRELFA', align: 'right' },
  { name: 'TOTLFA', label: 'Total', field: 'TOTLFA', align: 'right' },
  { name: 'UNIDAD', label: 'UNIDAD', field: r => r.sat.unidad, align: 'right' },
  { name: 'CLAVE', label: 'CLAVE', field: r => r.sat.clave, align: 'right' },
]

const fullAddress = computed(() => {
  try {
    const a = JSON.parse(billing.value.address)
    return `${a.calle} ${a.numExt} ${a.numInt ? 'Int. ' + a.numInt : ''}, ${a.colonia}, ${a.ciudad}, ${a.municipio}, CP ${a.cp}`
  } catch (e) {
    return ''
  }
})
const props = defineProps({
  "id": { default: null, type: Number },
})
const emit = defineEmits(['nextState']);

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  let data = {
    id: props.id
  }
  const resp = await billingApi.getBilling(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    $q.loading.hide();
    billing.value = resp;
  }
}

const clavePayment = (payment) => {
  let clave = null;
  switch (payment) {
    case 'EFE':
      clave = '01'
      break;
    case 'TDD':
      clave = '28'
      break;
    case 'TDC':
      clave = '04'
      break;
    case 'TRA':
      clave = '03'
      break;
    case 'CHE':
      clave = '11'
      break;
    default:
      clave = '01'
      break;
  }
  return clave
}


const nextStatus = () => {
  // console.log(billing.value)
  if (billing.value._state == 1) {// este es para que cambie de status a proceso, y para que descargue el layout en excel
    if (!billing.value.nclient) {
      return $q.notify({
        title: 'Cliente sin registro',
        type: 'negative',
        position: 'center',
        message: 'El cliente no cuenta con número de registro',
      })
    }
    const invalidProducts = billing.value.ticketSuc.products.filter(p => {
      return !p.sat?.clave || !p.sat?.unidad;
    });

    if (invalidProducts.length > 0) {
      const list = invalidProducts.map(p => `• ${p.DESLFA} (${p.ARTLFA})`).join('<br>');
      return $q.notify({
        message: `Los siguientes productos no tienen clave o unidad SAT:<br><br>${list}`,
        html: true,
        type: 'negative',
        position: 'center',
      });
    }
    billing.value.payments.forEach(e => {
      e.sat = clavePayment(e.payment)
    });
    emit('nextState', billing.value);
  } else if (billing.value._state == 2) {//este es para pasarlo a pausa en caso de algun problema o anotacion
    emit('nextState', billing.value);
  } else if (billing.value._state == 3) {// este es para quitarlo de pausa a creado o de nuevo a en proceso
    //algun momento se pausara
  } else if (billing.value._state == 4) {// aqui pues solo se deshabilita el boton
    console.log('este ya se acabo')
  } else if (billing.value._state == 5) {// solo en caso de que alguno este eliminado
    emit('nextState');
  }


}

const downloadPDF = async () => {
  window.open(
    `${vizmedia}/Constances/${billing.value.id}/${billing.value.constancia}`,
    '_blank'
  )
}

init()

</script>
