<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="bg-transparent" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <q-toolbar class="justify-between">
        <div>
          <span class="text-grey">Helpers</span>
          <q-icon name="navigate_next" color="primary" />
          <span class="text-h6">{{ title }}</span>
        </div>
        <div class="row">
          <div v-if="AssistLYT.showBtns" class="row">
            <q-btn color="primary" icon="add" class="col" outline @click="newJust.state = !newJust.state"
              title="Nueva Justificacion" />
            <q-separator spaced inset vertical dark />
            <q-btn color="primary" icon="event" class="col" outline title="Fechas de Justificacion">
              <q-menu>
                <q-card class="my-card">
                  <q-card-section>
                    <div>
                      <div class="q-pb-sm text-center">
                      </div>
                      <q-date v-model="dateranges" range minimal />
                    </div>
                  </q-card-section>
                  <q-card-actions vertical align="center">
                    <q-btn flat label="Obtener" color="positive" @click="buscas" />
                  </q-card-actions>
                </q-card>
              </q-menu>
            </q-btn>
          </div>

          <div v-if="AssistLYT.showSanctBtns" class="row">
            <q-btn color="primary" icon="add" class="col" outline @click="newSanct.state = !newSanct.state"
              title="Nueva Sancion" />
            <!-- <q-separator spaced inset vertical dark /> -->
            <!-- <q-btn color="primary" icon="event" class="col" outline>
              <q-menu>
                <q-card class="my-card">
                  <q-card-section>
                    <div>
                      <div class="q-pb-sm text-center">
                      </div>
                      <q-date v-model="dateranges" range minimal />
                    </div>
                  </q-card-section>
                  <q-card-actions vertical align="center">
                    <q-btn flat label="Obtener" color="positive" @click="buscas" />
                  </q-card-actions>
                </q-card>
              </q-menu>
            </q-btn> -->
          </div>


        </div>
      </q-toolbar>

      <q-dialog v-model="newJust.state" persistent :maximized="maximizedToggle" transition-show="slide-up"
        transition-hide="slide-down">
        <q-card>
          <q-bar>
            <div class="text-center text-h6">Nueva Justificacion</div>
            <q-space />
            <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
              <q-tooltip v-if="maximizedToggle">Minimize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
              <q-tooltip v-if="!maximizedToggle">Maximize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="close" @click="reset">
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
          <JustCreate :justifications="AssistLYT.Justifications" :types="AssistLYT.justificationTypes"
            :users="AssistLYT.users" @reset="reset" @create="addJustification" />
        </q-card>
      </q-dialog>



      <q-dialog v-model="newJust.state" persistent :maximized="maximizedToggle" transition-show="slide-up"
        transition-hide="slide-down">
        <q-card>
          <q-bar>
            <div class="text-center text-h6">Nueva Justificacion</div>
            <q-space />
            <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
              <q-tooltip v-if="maximizedToggle">Minimize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
              <q-tooltip v-if="!maximizedToggle">Maximize</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="close" @click="reset">
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>
          <JustCreate :justifications="AssistLYT.Justifications" :types="AssistLYT.justificationTypes"
          :justification="newJust.justification"   :users="AssistLYT.users" @reset="reset" @create="addJustification" />
        </q-card>
      </q-dialog>

      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import assistApi from "src/API/colabAPI.js";
import { exportFile, useQuasar, date } from 'quasar';
import dayjs from 'dayjs';
import { AssistStore } from 'stores/AssistStore';
import JustCreate from 'src/components/Assist/addJustification.vue'
import storeTurn from 'src/components/Assist/turns.vue'

const AssistLYT = AssistStore();

const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const maximizedToggle = ref(false);
const dateranges = ref({ from: null, to: null });
const newJust = ref({
  state: false,
  justification: {
    user: null,
    start_date: null,
    final_date: null,
    _type: null,
    notes: null,
    evidence: [],
  }
})
const newSanct = ref({
  state: false,
  sanction: {
    user: null,
    start_date: null,
    final_date: null,
    _type: null,
    notes: null,
    evidence: [],
  }
})
const title = computed(() => AssistLYT.title)


const addJustification = async (form) => {
  $q.loading.show({ message: 'Enviando formulario' })
  const formData = new FormData();
  formData.append('user', form.user.id);
  formData.append('_created_by', VDB.session.id);
  formData.append('start_date', form.start_date);
  formData.append('final_date', form.final_date);
  formData.append('_type', form._type.id);
  formData.append('notes', form.notes);
  form.evidence.forEach((file, index) => {
    formData.append(`evidence[${index}]`, file);
  });
  console.log(formData);

  const resp = await assistApi.addForm(formData)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    AssistLYT.addJustification(resp)
    $q.notify({ message: 'Formulario Enviado', type: 'positive', position: 'center' })
    $q.loading.hide()
    reset();
  }
}
const buscas = async () => {
  $q.loading.show({ message: "Obteniendo Datos..." });
  let data = {
    sid: VDB.session.store.id,
    uid: VDB.session.credentials.id,
    zone: VDB.session.credentials.zone ? VDB.session.credentials.zone.stores.map(e => e.id) : null,
    date: dateranges.value
  }
  const resp = await assistApi.getJustifications(data)
  if (resp.fail) {
    console.log(resp.fail)
  } else {
    $q.loading.hide()
    console.log(resp)
    AssistLYT.setJustifications(resp)
  }
}

const reset = () => {
  newJust.value = {
    state: false,
    justification: {
      user: null,
      start_date: null,
      final_date: null,
      _type: null,
      notes: null,
      evidence: [],
    }
  }
}

</script>
