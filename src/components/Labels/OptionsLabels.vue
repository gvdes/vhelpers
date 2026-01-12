<template>
  <q-card>
    <q-card-section class="row items-center">
      <q-avatar icon="picture_as_pdf" color="white" text-color="red" />
      <div class="q-ml-sm">En que Formato deseas las etiquetas?</div>
    </q-card-section>
    <q-card-section>
      <q-select v-model="typeLabels.val" :options="typeLabels.opts" label="Formatos" filled />
    </q-card-section>
    <q-card-section v-show="typeLabels.val">
      <q-table :rows="pdfMost" grid :pagination="{ rowsPerPage: 0 }">
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card @click="pdf(props.row)">
              <q-card-section>
                <strong>{{ props.row.label }}</strong>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-img :src="props.row.icon" />
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>

    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="negative" v-close-popup />
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
  products: { type: Array, default: [] },
  prices: { type: Object, default: {} },
})

const products = ref(props.products)
const prices = ref(props.prices)

const typeLabels = ref({
  val: { id: 3, label: 'Plano' },
  opts: [
    { id: 1, label: 'Navidad' },
    { id: 2, label: 'Juguete' },
    { id: 3, label: 'Plano' },
    { id: 4, label: 'Mochila' },
    { id: 5, label: 'Almacen' },

  ]
})


const mosPDF = ref({
  val: null,
  opts: [
    { id: 1, label: 'Navidad Extra Grande', icon: '/icons/Navidad/Navidad6(2).png', type: 1 },//OK
    { id: 2, label: 'Navidad Grande', type: 1, icon: '/icons/Navidad/Navidad6(2).png' },//OK
    { id: 3, label: 'Navidad Mediano', type: 1, icon: '/icons/Navidad/Navidad9(1).png' },//OK
    { id: 4, label: 'Navidad Pequeno', type: 1, icon: '/icons/Navidad/NaviSan(1).png' }, // OKP
    { id: 5, label: 'Navidad Vertical', type: 1, icon: '/icons/Navidad/NavidadVer(2).png' },//OK
    { id: 6, label: 'Juguete Niño', type: 2, icon: '/icons/Juguete/Ninio.png' },//OK
    { id: 7, label: 'Juguete Niña', type: 2, icon: '/icons/Juguete/Ninia.png' },//OK
    { id: 8, label: 'Juguete Extra Niña', type: 2, icon: '/icons/Juguete/xlargeninia.png' },//OK
    { id: 9, label: 'Juguete Extra Niño', type: 2, icon: '/icons/Juguete/xlargeninio.png' },//OK
    { id: 10, label: 'Juguete Horizontal Niño', type: 2, icon: '/icons/Juguete/Ninio.png' },//OK
    { id: 11, label: 'Juguete Horizontal Niña', type: 2, icon: '/icons/Juguete/Ninia.png' },//OK
    { id: 12, label: 'Rectangular 9 x 2', type: 3, icon: '/icons/Mochila/rectangular.png' },//OK
    { id: 15, label: 'Horizontal 9 x 2', type: 3, icon: '/icons/Mochila/horizontal.png' },
    { id: 13, label: 'Exhibicion Nino Mochila', type: 4, icon: '/icons/Mochila/ExhNINO.png' },//OK
    { id: 14, label: 'Exhibicion Nina Mochila', type: 4, icon: '/icons/Mochila/ExhNINA.png' },//OK
    { id: 16, label: 'Paquetes Mochila', type: 4, icon: '/icons/Mochila/STAR12_1.png' },//OK
    { id: 17, label: 'Almacen', type: 5, icon: '/icons/Mochila/horizontal.png' },
    { id: 18, label: 'Calculadora', type: 3, icon: '/icons/Mochila/rectangular.png' },
    { id: 19, label: 'Rectangular 4 X 3', type: 3, icon: '/icons/Mochila/rectangular.png' },


  ]
})

const pdfMost = computed(() => mosPDF.value.opts.filter(e => e.type == typeLabels.value.val.id))

const pdf = (b) => {
  mosPDF.value.val = b;
  // console.log(b.label);
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
  } else if (mosPDF.value.val.id == 17) {
    labels.HorizontalLabelwarehouse(products.value, VDB.session.credentials.nick, mosPDF.value.val.label)
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
  } else if (mosPDF.value.val.id == 18) {
    labels.VerticalLabelCalc(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
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
  } else if (mosPDF.value.val.id == 19) {
    labels.VerticalLabelLap(products.value, VDB.session.credentials.nick, mosPDF.value.val.label, prices.value)
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
