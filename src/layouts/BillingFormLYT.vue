<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-page-container>
      <q-card class="q-pa-xl q-mx-auto shadow-4" style="max-width: 700px; border-radius: 22px">

        <q-card-section class="text-h5 text-primary text-weight-bold text-center q-mb-md">
          Solicitud de Factura · Grupo Vizcarra
        </q-card-section>

        <q-card-section>
          <q-expansion-item v-model="expands.data" label="Datos de la Compra" icon="shopping_cart"
            header-class="text-h6 text-primary text-weight-bold" expand-separator>

            <div class="q-gutter-md q-mt-sm">

              <q-select v-model="form.store" :options="stores" label="Sucursal" filled dense option-label="name"
                disable />
              <q-input v-model="form.folio" type="text" label="Folio del Ticket" filled dense mask="#-######"
                :disable="!btnValid.show">
                <template v-slot:after v-if="btnValid.show">
                  <q-btn dense color="primary" label="Validar" @click="validateTck" :loading="btnValid.load"
                    :disable="!form.folio || !form.store || form.folio.length < 8" />
                </template>
              </q-input>

            </div>
            <q-expansion-item v-if="showExpands.ticket" v-model="expands.ticket" icon="receipt_long"
              label="Detalle del Ticket" header-class="text-h6 text-primary text-weight-bold" class="q-mt-md">

              <q-form ref="formTicket" class="q-mt-md">

                <div class="text-subtitle1 q-mb-xs">Fecha:</div>
                <div class="text-h6 text-bold q-mb-sm">{{ form.fecha }}</div>

                <div class="text-subtitle1 q-mb-xs">Total:</div>
                <div class="text-h6 text-bold q-mb-md">$ {{ form.total }}</div>

                <q-list bordered separator class="rounded-borders">

                  <q-item v-for="(payment, index) in form.payments" :key="index">

                    <q-item-section>
                      <q-item-label caption>Forma de Pago</q-item-label>
                      <q-item-label class="text-bold">
                        <span v-if="['TAR', 'TBA', 'TCD', 'TSA', 'TSC'].includes(payment.payment)">Tarjeta</span>
                        <span v-else>{{ payment.concept }}</span>
                      </q-item-label>
                    </q-item-section>

                    <q-item-section class="text-center">
                      <q-item-label caption>Importe</q-item-label>
                      <q-item-label class="text-bold">$ {{ Number(payment.import) }}</q-item-label>
                    </q-item-section>

                    <q-item-section v-if="['TAR', 'TBA', 'TCD', 'TSA', 'TSC'].includes(payment.payment)">
                      <q-item-label caption class="text-center">Tipo Tarjeta</q-item-label>
                      <q-select v-model="payment.type_card" :options="opts_card" filled dense label="Selecciona..."
                        class="q-mt-xs" :rules="[val => !!val || 'Selecciona un tipo']" />
                    </q-item-section>

                  </q-item>

                </q-list>


                <q-select filled dense class="q-mt-md" label="Uso de CFDI" v-model="form.cfdi" :options="cfdiOptions"
                  option-label="name" emit-value map-options :rules="[val => !!val || 'Obligatorio']" />

                <q-input v-model="form.notes" type="textarea" autogrow filled dense label="Comentarios opcionales"
                  class="q-mt-md" />

              </q-form>

            </q-expansion-item>

          </q-expansion-item>
        </q-card-section>
        <q-card-section>
          <q-expansion-item v-if="showExpands.client" v-model="expands.client"
            header-class="text-h6 text-primary text-weight-bold" label="Datos del Cliente" icon="person"
            expand-separator>

            <div class="q-gutter-md q-mt-md">

              <q-uploader label="Subir Constancia Fiscal (PDF)" accept=".pdf" @added="leerConstancia" class="full-width"
                dense hide-upload-btn />

              <q-input filled dense label="Nombre de Contacto" v-model="form.nombre"
                :rules="[v => !!v || 'Obligatorio']" />
              <q-input filled dense label="Correo Electrónico" v-model="form.email" :rules="[validEmail]"
                type="email" />
              <q-input filled dense label="Teléfono" v-model="form.telefono" mask="##########" />

              <q-input filled dense label="RFC" v-model="form.rfc" :rules="[validRFC]" />
              <q-input filled dense label="Razón Social" v-model="form.razonSocial"
                :rules="[v => !!v || 'Obligatorio']" />

              <q-input filled dense label="Calle" v-model="form.address.calle" />
              <q-input filled dense label="Colonia" v-model="form.address.colonia" />

              <div class="row ">
                <div class="col "><q-input filled dense label="Num Ext" v-model="form.address.numExt" /></div>
                <q-separator spaced inset vertical dark />
                <div class="col "><q-input filled dense label="Num Int" v-model="form.address.numInt" /></div>
                <q-separator spaced inset vertical dark />
                <div class="col "><q-input filled dense label="Municipio" v-model="form.address.municipio" /></div>
              </div>

              <div class="row ">
                <div class="col "><q-input filled dense label="Ciudad" v-model="form.address.ciudad" /></div>
                <q-separator spaced inset vertical dark />
                <div class="col "><q-input filled dense label="C.P." v-model="form.address.cp" mask="#####" /></div>
              </div>

            </div>

          </q-expansion-item>
        </q-card-section>

        <q-card-actions align="right" class="q-mt-md">
          <q-btn label="Limpiar" flat color="primary" @click="onReset" />
          <q-btn label="Enviar Solicitud" color="primary" unelevated @click="onSubmit" />
        </q-card-actions>

      </q-card>

      <q-dialog v-model="showFinally.state" persistent>
        <q-card class="q-pa-lg" style="min-width: 350px">
          <q-card-section class="text-center text-h5 text-primary">Solicitud Generada</q-card-section>
          <q-card-section class="text-subtitle1">
            Folio: <span class="text-bold">{{ showFinally.val.id }}</span><br>
            Contacto: <span class="text-bold">{{ showFinally.val.name }}</span><br>
            Teléfono: <span class="text-bold">{{ showFinally.val.celphone }}</span>
          </q-card-section>
          <q-card-section class="text-center">
            <a class="text-positive"
              :href="`https://wa.me/5573461022?text=Cual%20es%20el%20estado%20de%20mi%20solicitud?%20Folio:%20${showFinally.val.id}`">
              Consultar por WhatsApp
            </a>
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog v-model="showExist.state" persistent>
        <q-card class="q-pa-lg" style="min-width: 420px; max-width: 760px; border-radius: 12px">
          <q-card-section class="text-h6 text-primary text-weight-bold">
            Folio Solicitud: <span class="text-bold">{{ showExist.val.id }}</span>
          </q-card-section>
          <q-card-section class="text-subtitle2">
            <div>Contacto: <span class="text-bold">{{ showExist.val.name }}</span></div>
            <div>Teléfono: <span class="text-bold">{{ showExist.val.celphone }}</span></div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="text-h6 q-mb-sm text-bold">Historial de Proceso</div>
            <q-list bordered separator class="rounded-borders">
              <q-item v-if="!showExist.val.log || !showExist.val.log.length">
                <q-item-section class="text-center">No hay movimientos registrados</q-item-section>
              </q-item>
              <q-item v-for="(lov, index) in showExist.val.log" :key="index" class="row items-center">
                <q-item-section class="col">
                  <q-item-label class="text-bold">{{ lov.name }}</q-item-label>
                  <q-item-label caption>{{ dayjs(lov.pivot.created_at).format('YYYY-MM-DD HH:mm') }}</q-item-label>
                </q-item-section>
                <q-item-section class="col-auto">
                  <q-item-label class="text-caption">Usuario</q-item-label>
                  <q-item-label class="text-bold">{{ lov.pivot._user }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-separator />
          <q-card-section class="text-center">
            <div class="text-h6 text-primary q-mb-sm">¿Dudas o seguimiento?</div>
            <a class="text-positive"
              :href="`https://wa.me/5573461022?text=Cual%20es%20el%20estado%20de%20mi%20solicitud?%20Folio:%20${showExist.val.id}`"
              target="_blank" rel="noopener">
              Enviar Whatsapp al soporte
            </a>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" @click="$router.go(0)" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import billingApi from 'src/API/billingApi.js';//para dirigirme bro
import { useBillingStore } from 'stores/BillingStore';
import { exportFile, useQuasar } from 'quasar';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
const $billing = useBillingStore();
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const disableWatch = ref(false)
const formTicket = ref(null)
const opts_card = ref([
  { id: 1, label: 'Credito', value: 'CRE' },
  { id: 2, label: 'Debito', value: 'DBT' },
])
const expands = ref({
  client: false,
  ticket: false,
  data: true
})
const btnValid = ref({
  load: false,
  show: true
});
const showExpands = ref({
  ticket: false,
  client: false,
})
const showFinally = ref({
  state: false,
  val: null
})
const showExist = ref({
  state: false,
  val: null
})

const stores = ref([]);
const cfdiOptions = ref([])

const form = ref({
  store: null,
  folio: null,
  fecha: null,
  total: '',
  payments: [],
  cfdi: '',
  nombre: '',
  rfc: '',
  razonSocial: '',
  email: '',
  telefono: '',
  address: {
    calle: '',
    colonia: '',
    ciudad: '',
    cp: '',
    municipio: '',
    numInt: '',
    numExt: '',
  },
})

const leerConstancia = async (files) => {
  $q.loading.show(({ message: 'Obteniendo Datos' }))
  const file = files[0]
  const formData = new FormData()
  formData.append('file', file)
  const resp = await billingApi.readCostancy(formData)
  if (resp.fail) {
    $q.notify({
      type: 'negative',
      message: 'No se pudieron extraer los datos'
    })
  } else {
    console.log(resp)
    form.value.rfc = resp.rfc
    form.value.razonSocial = resp.razonSocial
    form.value.address.cp = resp.cp
    form.value.address.calle = resp.calle
    form.value.address.colonia = resp.colonia
    form.value.address.numInt = resp.numInt
    form.value.address.numExt = resp.numExt
    form.value.address.municipio = resp.municipio
    form.value.address.ciudad = resp.entFederativa
    $q.loading.hide()
    $q.notify({
      type: 'positive',
      message: 'Datos extraídos correctamente'
    })
  }
}

const validRFC = (val) => {
  const rfcRegex = /^([A-ZÑ&]{3,4})(\d{6})([A-Z0-9]{3})$/
  return rfcRegex.test(val?.toUpperCase()) || 'RFC inválido'
}

const validEmail = (val) => {
  const exp = /\S+@\S+\.\S+/
  return exp.test(val) || 'Correo inválido'
}


const onSubmit = async () => {
  if (!form.value.total || !form.value.fecha || !form.value.payments.length) {
    return $q.notify({
      type: 'negative',
      message: 'Primero valida el ticket'
    })
  }
  if (!form.value.cfdi) {
    return $q.notify({
      type: 'negative',
      message: 'Selecciona un uso CFDI'
    })
  }
  if (!form.value.nombre ||
    !form.value.email ||
    !form.value.rfc ||
    !form.value.razonSocial ||
    !form.value.address.cp ||
    !form.value.address.calle ||
    !form.value.address.colonia ||
    !form.value.address.ciudad ||
    !form.value.address.municipio) {
    return $q.notify({
      type: 'negative',
      message: 'Todos los datos del cliente son obligatorios'
    })
  }
  for (let p of form.value.payments) {

    if (['TAR', 'TBA', 'TCD', 'TSA', 'TSC'].includes(p.payment)) {
      if (!p.type_card) {
        return $q.notify({
          type: 'negative',
          message: 'Selecciona el tipo de tarjeta para todos los pagos con tarjeta'
        })
      }
    }
  }
  sendBilling(form.value)
}

const onReset = () => {
  disableWatch.value = true

  form.value = {
    store: form.value.store,
    folio: null,
    fecha: null,
    total: '',
    payments: [],
    cfdi: form.value.cfdi,
    nombre: '',
    rfc: '',
    razonSocial: '',
    email: '',
    telefono: '',
    address: {
      calle: '',
      colonia: '',
      ciudad: '',
      cp: '',
      municipio: '',
      numInt: '',
      numExt: '',
    },
  }

  expands.value = {
    data: true,
    ticket: false,
    client: false
  }

  showExpands.value = {
    ticket: false,
    client: false
  }

  btnValid.value = {
    load: false,
    show: true
  }

  if (formTicket.value) formTicket.value.resetValidation()

  setTimeout(() => {
    disableWatch.value = false   // ⬅ Volvemos a activar el watcher
  }, 300)

  $q.notify({
    type: 'info',
    message: 'Formulario limpiado'
  })
}

const sendBilling = async (dataform) => {
  $q.loading.show({ message: 'Enviando Formulario' })
  console.log(dataform)
  const paymentsToSend = dataform.payments.map(e => {

    const typeCard = e.type_card?.value || null;
    let payment = null;

    switch (e.payment) {
      case 'CHE':
      case 'EFE':
        payment = e.payment;
        break;

      case 'TDB':
      case 'TDS':
      case 'TDA':
      case 'TRA':
        payment = 'TRA';
        break;

      case 'TSA':
      case 'TSC':
      case 'TAR':
      case 'TBA':
      case 'TCD':
        if (typeCard === 'CRE') payment = 'TDC';
        else if (typeCard === 'DBT') payment = 'TDD';
        else payment = 'TAR';
        break;

      default:
        payment = 'EFE';
        break;
    }
    return {
      ...e,
      payment,
      type_card: typeCard
    };
  });
  const payload = {
    ...dataform,
    payments: paymentsToSend
  };
  console.log(payload)
  const resp = await billingApi.sendBilling(payload)
  if (resp.fail) {
    console.log(fail)
  } else {
    console.log(resp)
    showFinally.value.state = true
    showFinally.value.val = resp;
    $q.loading.hide();
    $q.notify({ message: `Solicitud Creada`, type: 'positive', position: 'top' })
    setTimeout(() => {
      showFinally.value.state = false
      onReset()
      // $router.go(0)
    }, 10000)
  }
}

const validateTck = async () => {
  btnValid.value.load = true
  let data = {
    workpoint: form.value.store?.id,
    folio: form.value.folio
  }
  console.log(data)
  const resp = await billingApi.validTicket(data);
  if (resp.fail) {

    if (resp.fail.status == 403) {
      console.log(resp.fail.response.data)
      showExist.value.state = true,
        showExist.value.val = resp.fail.response.data
    } else {
      console.log(resp)
    }
  } else {
    console.log(resp);
    form.value.total = Number(resp.Total)
    form.value.fecha = dayjs(resp.fecha).format('YYYY-MM-DD')
    form.value.payments = resp.fpas?.map(e => {
      return {
        payment: e.FPALCO,
        concept: e.CPTLCO,
        import: e.IMPLCO,
        type_card: null
      }
    })
    btnValid.value.load = false
    btnValid.value.show = false
    expands.value.ticket = true
    showExpands.value.ticket = true
    expands.value.client = true
    showExpands.value.client = true

  }
}

const init = async () => {
  $q.loading.show({ message: 'Cargando....' })
  const resp = await billingApi.index()
  if (resp.fail) {
    console.log(resp.fail)
  } else {
    console.log(resp)
    $q.loading.hide();
    stores.value = resp.stores;
    form.value.store = stores.value.find(e => e.id == $route.params.sid)
    cfdiOptions.value = resp.cfdi;
    form.value.cfdi = cfdiOptions.value.find(e => e.id == 2)
  }
}
init()

watch(
  () => form.value.payments,
  async () => {
    if (disableWatch.value) return

    if (!formTicket.value) return
    const valid = await formTicket.value.validate()
    if (valid) {
      expands.value.data = false
      expands.value.ticket = false
      expands.value.client = true
      showExpands.value.client = true
    }
  },
  { deep: true }
)
</script>
