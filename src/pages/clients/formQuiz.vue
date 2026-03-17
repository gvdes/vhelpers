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
          <q-circular-progress :value="stats.average * 20" size="100px" show-value class="q-my-md">
            {{ stats.average }}
          </q-circular-progress>
          <q-rating :model-value="stats.average" size="2em" readonly color="amber" />
        </q-card>
        <q-card class="q-pa-md q-mb-md">
          <div class="text-subtitle1 q-mb-sm">Recomendación</div>
          <div class="q-mb-sm">
            <q-linear-progress :value="stats.recommend.si / 100" color="positive" />
            <div>Si: {{ stats.recommend.si }}%</div>
          </div>
          <div>
            <q-linear-progress :value="stats.recommend.no / 100" color="negative" />
            <div>No: {{ stats.recommend.no }}%</div>
          </div>
        </q-card>
        <q-card class="q-pa-md q-mb-md">
          <div class="text-subtitle1">Encuestas</div>
          <div class="text-h6 q-mb-md">{{ stats.total }}</div>

          <div v-for="(value, key) in stats.questions" :key="key" class="q-mb-sm">
            <div>{{ questionLabels[key] || key }}</div>
            <q-rating :model-value="value" readonly color="amber" />
          </div>
        </q-card>
        <q-card class="q-pa-md">
          <div class="text-subtitle1 q-mb-md">
            Motivos de No recomendación
          </div>
          <q-list bordered>
            <q-item v-for="c in stats.comments" :key="c.id">
              <q-item-section avatar>
                <q-icon name="warning" color="negative" />
              </q-item-section>
              <q-item-section>
                {{ c.comment }}
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
import { computed, ref, watch, onMounted } from 'vue';
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
  questions: {},
  sellers: [],
  cashiers: [],
  total: 0
})

const questionLabels = {
  first: 'Amabilidad del personal',
  second: 'Ayuda para encontrar productos',
  third: 'Disponibilidad de productos',
  fourth: 'Orden y limpieza',
  fifth: 'Rapidez en caja',
  sixth: 'Experiencia general',
  seventh: 'Volvería a comprar'
}
const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos...' })
  try {
    const resp = await quizApi.getStats({
      store: VDB.session.store.id
    })
    if (!resp.fail) {
      console.log(resp)
      stats.value = resp
    }
  } catch (error) {
    console.error(error)
  } finally {
    $q.loading.hide()
  }
}

onMounted(init)
</script>
