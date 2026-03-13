<template>
  <q-page padding>
    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary">
      <q-tab name="global" label="Global" />
      <q-tab name="seller" label="Vendedores" />
      <q-tab name="cashier" label="Cajeros" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="global">
        <q-card class="q-pa-md q-mb-md text-center">
          <div class="text-subtitle1">Satisfacción</div>
          <q-rating :model-value="stats.average" size="2em" readonly color="amber" />
          <div class="text-h6">
            {{ stats.average }}
          </div>
        </q-card>
        <q-card class="q-pa-md q-mb-md">
          <div class="text-subtitle1">Recomendación</div>
          <div>
            Si: {{ stats.recommend.si }}%
          </div>
          <div>
            No: {{ stats.recommend.no }}%
          </div>
        </q-card>


        <q-card class="q-pa-md q-mb-md">
          <div>Encuestas</div>
          <div>{{ stats.total }}</div>
          <div>Servicio</div>
          <q-rating :model-value="stats.questions.service" readonly color="amber" />
          <div>Agilidad</div>
          <q-rating :model-value="stats.questions.speed" readonly color="amber" />
          <div>Información del personal</div>
          <q-rating :model-value="stats.questions.info" readonly color="amber" />
        </q-card>
        <q-card class="q-pa-md">
          <div class="text-subtitle1 q-mb-md">
            Comentarios recientes
          </div>
          <q-list bordered>
            <q-item v-for="c in stats.comments" :key="c.id">
              <q-item-section>
                {{ c.sixth }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-tab-panel>
      <q-tab-panel name="seller">
        <q-list bordered>
          <q-item v-for="s in stats.sellers" :key="s.id">
            <q-item-section>
              {{ s.name }}
            </q-item-section>
            <q-item-section side>
              <q-rating :model-value="s.score" readonly size="1.5em" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
      <q-tab-panel name="cashier">
        <q-list bordered>
          <q-item v-for="c in stats.cashiers" :key="c.id">
            <q-item-section>
              {{ c.name }}
            </q-item-section>
            <q-item-section side>
              <q-rating :model-value="c.score" readonly size="1.5em" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { exportFile, useQuasar } from 'quasar';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import quizApi from 'src/API/quizApi';
import { useVDBStore } from 'stores/VDB';
const VDB = useVDBStore();
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const tab = ref('global')

const stats = ref({
  average: 0,
  recommend: { si: 0, no: 0 },
  questions: {
    service: 0,
    speed: 0,
    info: 0
  },
  comments: [],
  sellers: [],
  cashiers: [],
  total:0
})

const init = async () => {
  $q.loading.show({message:'Obteniendo Datos'})
  const resp = await quizApi.getStats({ store: VDB.session.store.id })
  if (resp.fail) {
    console.log(resp)
  } else {
    stats.value = resp
    $q.loading.hide()
    console.log(resp)
  }
}
init()

</script>
