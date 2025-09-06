<template>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar icon="picture_as_pdf" color="white" text-color="red" />
      <div class="q-ml-sm">En que Formato deseas las etiquetas?</div>
    </q-card-section>
    <q-card-section>
      <q-select v-model="mosPDF.val" :options="mosPDF.opts" label="Etiquetas" filled />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="negative" v-close-popup />
      <q-btn flat label="Generar" color="positive" @click="pdf" :disable="mosPDF.val == null" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import dbproduct from 'src/API/Product'
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { assist } from "src/boot/axios";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import labels from 'src/Pdf/labels/labels.js'

const VDB = useVDBStore();
const $q = useQuasar();
const props = defineProps({
    products:{ type:Array, default:[] },
    prices:{ type:Object, default:{} },
  })

const products = ref(props.products)
const prices = ref(props.prices)



const mosPDF = ref({
  val: null,
  opts: [
    { id: 1, label: 'Navidad Extra Grande' },
    { id: 2, label: 'Navidad Grande' },
    { id: 3, label: 'Navidad Mediano' },
    { id: 4, label: 'Navidad Pequeno' },
    { id: 5, label: 'Navidad Vertical' },
    { id: 6, label: 'Juguete Niño' },
    { id: 7, label: 'Juguete Niña' },
    { id: 8, label: 'Juguete Extra Niña' },
    { id: 9, label: 'Juguete Extra Niño' },
    { id: 10, label: 'Juguete Horizontal Niño' },
    { id: 11, label: 'Juguete Horizontal Niña' },
    { id: 12, label: 'Rectangular 9 x 2' },
    { id: 15, label: 'Horizontal 9 x 2' },
    { id: 13, label: 'Exhibicion Nino Mochila' },
    { id: 14, label: 'Exhibicion Nina Mochila' },
    { id: 16, label: 'Paquetes Mochila' },

  ]
})

const pdf = () => {
  // console.log(products.value);
  $q.loading.show({ message: 'Generando Etiquetas' })
  if (mosPDF.value.val.id == 1) {
    labels.xtralargeLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })

  } else if (mosPDF.value.val.id == 2) {
    labels.largeLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 3) {
    labels.mediumLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 4) {
    labels.smallLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 5) {
    labels.verticalLabelNavidad(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 6) {
    labels.toyBoys(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 7) {
    labels.toyGirls(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 8) {
    labels.xlargenina(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 9) {
    labels.xlargenino(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 10) {
    labels.Hlargenino(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);

        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 11) {
    labels.Hlargenina(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 12) {
    labels.VerticalLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 13) {
    labels.xlargeExhnino(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 14) {
    labels.xlargeExhnina(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 15) {
    labels.HorizontalLabel(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })
  } else if (mosPDF.value.val.id == 16) {
    labels.Paquetes(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
      .then(r => {
        $q.notify({
          message: `Se Descargo las etiquetas Correctamente`,
          type: `positive`,
          position: `center`,
        })
        mosPDF.value.state = false,
          mosPDF.value.val = null,
          $q.loading.hide()
      })
      .catch(r => {
        console.log(r);
        alert('Hubo un error al descargar las etiquetas')
      })
  }
}



</script>
