<template>
  <q-card-section>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-select v-model="justification.user" :options="optsUser" label="Colaborador" option-label="complete_name" filled
        use-input @filter="filterFn" dense />
      <div class="row">
        <q-input dense v-model="justification.start_date" type="date" class="col" filled label="Fecha Inicio"
          :stack-label=true :error="validfech" error-message="La fecha de inicio es mayor que la fecha de fin" />
        <q-separator spaced inset vertical dark />
        <q-input dense v-model="justification.final_date" type="date" class="col" filled hint="Fecha Fin" label="Fecha Fin"
          :stack-label=true :error="validfech" error-message="La fecha de inicio es mayor que la fecha de fin" />
      </div>
      <q-select v-model="justification._type" dense :options="types" label="Tipo de justificacion" filled
        option-label="name" />
      <q-input dense v-model="justification.notes" type="text" label="Motivo(especificar)" filled />

      <q-card class="my-card">
        <q-card-section class="text-left text-h6 text-bold">
          Evidencia
        </q-card-section>
        <q-card-section>
          <q-uploader dense hide-upload-btn :color="dark ? 'dark' : 'white'" :text-color="dark ? 'white' : 'dark'"
            style="height: auto; width: 100%" label="Evidencia" accept="image/*" ref="reference" @added="insertimage"
            field-name="file" multiple flat @rejected="onRejected" max-files="3">

            <template v-slot:header="scope">
              <div class="row no-wrap items-center q-pa-sm q-gutter-xs text-center "
                style="border-radius: 8px; padding: 16px;" @click="scope.pickFiles">
                Haz clic para subir los archivos o arrastra y suelta los archivos aquí
                <q-uploader-add-trigger />
              </div>
            </template>

            <template v-slot:list="scope">

              <q-table :rows="scope.files" grid hide-bottom :pagination="{ rowsPerPage: 0 }">
                <template v-slot:item="props">
                  <div style="position: relative; border: 1px solid #EEEEEE;
                       border-radius: 10px;
                       width: 100px;
                       height: 100px;
                       margin: 5px
                       ">
                    <div @mouseover="hoveredItem = props.row" @mouseleave="hoveredItem = null"
                      :style="hoveredItem == props.row ? 'opacity: 0.7;' : null" style="margin:12px;">
                      <q-avatar size="75px" square>
                        <q-img :src="props.row.__img.src" style="height: 75px; width: 75px">
                        </q-img>
                      </q-avatar>
                      <q-btn size="sm" icon="delete" color="white" class="absolute" text-color="black"
                        style="top: 5px; left: 5px; z-index: 10; width: 10px; "
                        v-if="hoveredItem == props.row ? true : false" @click="removeEvidence(scope, props)" />
                    </div>
                  </div>
                </template>
              </q-table>
            </template>
          </q-uploader>
        </q-card-section>
      </q-card>
      <div>
        <q-btn label="Enviar" type="submit" color="positive" flat :disable="!validform" />
        <q-btn label="Cancelar" type="reset" color="negative" flat class="q-ml-sm" />
        <div class="text-red text-bold" v-if="exostJusti.length > 0"> {{ ` Esta semana ya existe ${exostJusti.length}
          justificacion con los mismos parametros`}} </div>
      </div>
    </q-form>
  </q-card-section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import dayjs from 'dayjs';
import { useVDBStore } from 'src/stores/VDB';
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const VDB = useVDBStore();
const emit = defineEmits(['create', 'reset'])
const props = defineProps({
  "types": { default: [], type: Array },
  "users": { default: [], type: Array },
  "justifications": { default: [], type: Array },
  "justification": { default: {}, type: Object }
})
const optsUser = ref(props.users)
const justification = ref(props.justification)
const hoveredItem = ref(null)
const reference = ref(null)



const validform = computed(() => (justification.value.user && justification.value.start_date && justification.value.final_date && justification.value._type && justification.value.notes && justification.value.evidence?.length > 0 && !validfech.value) && exostJusti.value.length <= 0)
const exostJusti = computed(() => { return props.justifications.filter(e => e.user.id == justification.value.user?.id && e.start_date == justification.value.start_date && e.final_date == justification.value.final_date) })


const validfech = computed(() => {
  const start = new Date(justification.value.start_date);
  const final = new Date(justification.value.final_date)
  return start > final
})

const dark = computed(() => $q.dark.isActive)

const onSubmit = () => {
  emit('create',justification.value)
}

const onReset = () => {
  emit('reset')
}

const filterFn = (val, update, abort) => {
  update(() => {
    const needle = val.toLowerCase()
    optsUser.value = props.users.filter(v => `${v.complete_name}`.toLowerCase().indexOf(needle) > -1)
  })
}

const onRejected = () => {
  $q.notify({ message: 'No se acepta este archivo', type: 'negative', position: 'center' })
};

const insertimage = (file) => {
  justification.value.evidence = file;
}
const removeEvidence = (scope, rows) => {
  scope.removeFile(rows.row);
  let inx = justification.value.evidence.findIndex(e => e.__key == rows.row.__key);

  if (inx >= 0) {
    justification.value.evidence.splice(inx, 1);
  }
}
watch(() => props.justification, (val) => {
  justification.value = val
}, { deep: true })


</script>
