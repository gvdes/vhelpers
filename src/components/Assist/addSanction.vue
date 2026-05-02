<template>
  <q-card class="my-card">
    <q-card-section>

      <q-select v-model="sanction.user" :options="optsUser" label="Colaborador" option-label="complete_name" filled
        use-input @filter="filterFn" dense />
      <q-separator spaced inset vertical dark />
      <q-select v-model="sanction.sanction" :options="sanctions" label="Sancion" filled dense option-label="name"
        :option-disable="optionDisabled" />
      <q-separator spaced inset vertical dark />
    </q-card-section>
    <q-card-section v-if="sanction.sanction?.id == 1">
      <q-input v-if="sanction.user" v-model="sanction.user.store.name" type="text" label="Sucursal" :disable="true"
        dense filled />
      <q-separator spaced inset vertical dark />
      <q-input v-if="sanction.user" v-model="sanction.user.rol.name" type="text" label="Puesto" :disable="true" dense
        filled />
      <q-separator spaced inset vertical dark />
      <q-input v-model="sanction.notes.reason" type="textarea" label="Motivo de Acta Administrativa" filled dense />
      <q-separator spaced inset vertical dark />
      <q-input v-model="sanction.notes.conclusion" type="textarea" label="Conclusion" filled dense />

    </q-card-section>
    <q-card-section v-if="sanction.sanction?.id == 2">
      SUSPENCION
    </q-card-section>
    <q-card-section v-if="sanction.sanction?.id == 3">
      <q-input v-model="sanction.notes.motivo" type="textarea" label="Motivo" filled dense />
    </q-card-section>
    <q-card-actions  align="center">
        <q-btn label="Enviar" @click="onSubmit" color="positive" flat  />
        <q-btn label="Cancelar" @click="onReset" color="negative" flat class="q-ml-sm" />
    </q-card-actions>
  </q-card>
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
const props = defineProps({
  "users": { default: [], type: Array },
  "sanction": { default: {}, type: Object },
  "sanctions": { defualt: [], type: Array }
})
const emit = defineEmits(['create', 'reset'])
const sanction = ref(props.sanction)
const optsUser = ref(props.users)


const filterFn = (val, update, abort) => {
  update(() => {
    const needle = val.toLowerCase()
    optsUser.value = props.users.filter(v => `${v.complete_name}`.toLowerCase().indexOf(needle) > -1)
  })
}

const optionDisabled = (val) => {
  let isRoot = VDB.session.rol == "root" || VDB.session.rol == "rrhh"
  if (!isRoot && val.id == 1) {
    return true
  }
  if (val.id == 2) {
    return true
  }
  return false
}

const onSubmit = () => {
  emit('create',sanction.value)
}

const onReset = () => {
  emit('reset')
}
watch(() => props.sanction, (val) => {
  sanction.value = val
}, { deep: true })



</script>
