<template>
  <q-page padding class="bg-grey-2">

    <q-card class="q-pa-lg q-mx-auto shadow-3" style="max-width: 700px; border-radius: 20px">
      <div class="text-h5 text-primary text-weight-bold q-mb-md">
        Solicitud de Factura
      </div>
      <q-form @submit="onSubmit">
        <q-uploader label="Subir Constancia Fiscal (PDF)" accept=".pdf" @added="leerConstancia" auto-upload :url="null"
          class="q-mb-lg" >
          <template v-slot:header></template>
        </q-uploader>
        <q-input filled label="RFC" v-model="form.rfc" class="q-mb-md" />
        <q-input filled label="Nombre / Razón Social" v-model="form.nombre" class="q-mb-md" />
        <q-input filled label="Régimen Fiscal" v-model="form.regimen" class="q-mb-md" />
        <q-input filled label="Código Postal" v-model="form.cp" class="q-mb-md" />
        <q-btn label="Enviar" color="primary" type="submit" />
      </q-form>

    </q-card>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
// import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const form = ref({
  rfc: '',
  nombre: '',
  regimen: '',
  cp: '',
})

const leerConstancia = async (files) => {
  const file = files[0]

  const formData = new FormData()
  formData.append('file', file)

  try {
    // const { data } = await api.post('/facturacion/leer-constancia', formData)

    // AUTOCOMPLETA EL FORMULARIO
    form.value.rfc = data.rfc
    form.value.nombre = data.nombre
    form.value.regimen = data.regimen
    form.value.cp = data.cp

    $q.notify({
      type: 'positive',
      message: 'Datos extraídos correctamente'
    })

  } catch (e) {
    $q.notify({
      type: 'negative',
      message: 'Error al procesar la constancia'
    })
  }
}

const onSubmit = () => {
  console.log("Datos finales:", form.value)
}
</script>
