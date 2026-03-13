<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <q-page class="flex flex-center">
        <div class="full-width">
          <q-card class="shadow-6 rounded-borders">
            <q-form @submit="enviar">
              <q-card-section class="text-center">
                <div class="text-h5 text-weight-bold">
                  Encuesta de Satisfacción
                </div>
                <div class="text-subtitle1 text-grey-7">
                  Tu opinión nos ayuda a mejorar
                </div>
              </q-card-section>
              <q-card-section v-for="(item, i) in form" :key="item.name" class="q-px-md q-pb-lg">
                <template v-if="item.name === 'first'">
                  <div class=" text-center q-mb-md">
                    {{ item.label }}
                  </div>
                  <q-btn-toggle v-model="item.value" spread rounded toggle-color="primary" :options="[
                    { label: 'Sí', value: 'Si' },
                    { label: 'No', value: 'No' }
                  ]" />
                </template>
                <template v-else-if="['second', 'third', 'fourth',].includes(item.name)">
                  <div class=" text-center q-mb-md">
                    {{ item.label }}
                  </div>
                  <div class="flex flex-center">
                    <q-rating v-model="item.value" :max="5" size="3em" :color="ratingColors"
                      :color-selected="ratingColors" :icon="icons" />
                  </div>
                </template>
                <template v-else-if="item.name === 'fifth'">
                  <div class=" text-center q-mb-md">
                    {{ item.label }}
                  </div>
                  <q-btn-toggle v-model="item.value" spread rounded toggle-color="primary" :options="[
                    { label: 'Sí', value: 'Si' },
                    { label: 'No', value: 'No' }
                  ]" />
                </template>
                <template v-else-if="item.name === 'fifthno'">
                  <div v-if="fifthAnswer === 'No'">
                    <div class=" text-center q-mb-md">
                      {{ item.label }}
                    </div>
                    <q-input v-model="item.value" filled type="textarea" autogrow label="Cuéntanos qué podemos mejorar"
                      dense />
                  </div>
                </template>
                <template v-else-if="item.name === 'sixth'">
                  <div class=" text-center q-mb-md">
                    {{ item.label }}
                  </div>
                  <q-input dense v-model="item.value" filled type="textarea" autogrow label="Escribe tu comentario" />
                </template>
              </q-card-section>
              <q-card-section>
                <q-btn label="Enviar encuesta" type="submit" color="primary" rounded unelevated class="full-width" />
              </q-card-section>
            </q-form>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { exportFile, useQuasar } from 'quasar';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import quizApi from 'src/API/quizApi';
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();

const sucursal = $route.query.s
const cajero = $route.query.c ?? null
const vendedor = $route.query.v ?? null
const ticket = $route.query.tck ?? null

const form = ref([
  { name: 'first', label: "1 .Conocias GRUPO VIZCARRA?", value: 'No' },
  { name: 'second', label: "2 .Como consideras nuestro servicio?", value: 0 },
  { name: 'third', label: "3 .Que tan agil a sido tu compra?", value: 0 },
  { name: 'fourth', label: "4 .El personal le brindo informacion clara y util sobre el articulo? ", value: 0 },
  { name: 'fifth', label: "5 .Nos recomendarias con tus amigos o conocidos?", value: 'Si' },
  { name: 'fifthno', label: "Por que ?", value: null },
  { name: 'sixth', label: "6 .¿Que podriamos mejorar para que tu experiencia sea mejor?", value: null }
])
const icons = ref([
  'sentiment_very_dissatisfied',
  'sentiment_dissatisfied',
  'sentiment_neutral',
  'sentiment_satisfied',
  'sentiment_very_satisfied'
])

const fifthAnswer = computed(() => {
  return form.value.find(f => f.name === 'fifth')?.value
})
const isBadExperience = computed(() => {
  const ratings = form.value
    .filter(e => ['second', 'third', 'fourth'].includes(e.name))
    .map(e => e.value)

  return ratings.some(r => r <= 2)
})

const reset = () => {
  form.value = [
    { name: 'first', label: "1 .Conocias GRUPO VIZCARRA?", value: 'No' },
    { name: 'second', label: "2 .Como consideras nuestro servicio?", value: 0 },
    { name: 'third', label: "3 .Que tan agil a sido tu compra?", value: 0 },
    { name: 'fourth', label: "4 .El personal le brindo informacion clara y util sobre el articulo? ", value: 0 },
    { name: 'fifth', label: "5 .Nos recomendarias con tus amigos o conocidos?", value: 'Si' },
    { name: 'fifthno', label: "Por que ?", value: null },
    { name: 'sixth', label: "6 .¿Que podriamos mejorar para que tu experiencia sea mejor?", value: null }
  ]
}

const ratingColors = ref(['red-10', 'red-5', 'yellow-7', 'green-9', 'green-10'])

const enviar = async () => {
  $q.loading.show({ message: 'Enviando Encuesta' })
  const payload = {
    _store: sucursal,
    _cashier: cajero,
    _seller: vendedor,
    ticket: ticket,
    ...Object.fromEntries(
      form.value.map(e => [e.name, e.value])
    )
  }
  console.log(payload)
  const resp = await quizApi.addQuiz(payload)
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.loading.hide();
    if (isBadExperience.value) {
      $q.notify({
        type: 'warning',
        message: 'Lamentamos que tu experiencia no haya sido la mejor. Trabajaremos para mejorar.',
        timeout: 5000
      })
    } else {
      $q.notify({
        type: 'positive',
        message: '¡Gracias por tu opinión!',
        timeout: 5000
      })
    }
    $router.replace({
      path: $route.path,
      query: { s: sucursal }
    })
    // console.log(resp)
    reset();
  }
}

</script>
