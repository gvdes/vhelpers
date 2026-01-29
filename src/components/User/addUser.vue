<template>
  <q-form ref="formRef" @submit.prevent="addForm">
    <q-card-section>
      <q-tabs v-model="tab">
        <q-tab name="personal" icon="person" label="Datos Personales" />
        <q-tab name="work" icon="work" label="Datos Laborales" />
      </q-tabs>
    </q-card-section>
    <q-tab-panels v-model="tab" animated keep-alive transition-prev="scale" transition-next="scale">
      <q-tab-panel name="personal">
        <q-card-section v-if="form.profile?.url">
          <div class="row">
            <div class="col"> <q-img :src="form.profile?.url" style="height: 140px; max-width: 200px" /></div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="form.name" type="text" label="Nombre(s)" filled dense clearable :rules="[required]"
            debounce="300" />
          <q-separator spaced inset vertical dark />
          <q-input v-model="form.surnames" type="text" label="Apellidos" filled dense clearable
            :rules="[validFullName, required]" debounce="300" />
          <q-separator spaced inset vertical dark />
          <q-input v-model="form.nick" type="text" label="Alias" filled dense clearable :rules="[validNick]"
            debounce="300" />
          <q-separator spaced inset vertical dark />
          <q-input v-model="form.dob" type="date" label="Fecha Nacimiento" filled dense clearable debounce="300" :rules="[
            val => !!val || 'La fecha es obligatoria',
            val => isOlderThan15(val) || 'Debe ser mayor de 15 años'
          ]" />
          <q-separator spaced inset vertical dark />
          <q-input v-model="form.celphone" type="number" label="Celular" filled dense clearable :rules="[validCelphone]"
            debounce="300" />
          <q-separator spaced inset vertical dark />
          <q-input v-model="form.email" type="text" label="Correo" filled dense clearable :rules="[validEmail]"
            debounce="300" />
          <q-separator spaced inset vertical dark />
          <q-select v-model="form.gender" :options="genders" label="Genero" filled dense clearable />
          <q-separator spaced inset vertical dark />
          <q-btn color="primary" icon="attach_file" label="Fotografia" outline class="full-width" @click="clickFile"
            debounce="300" :disable="form.profile.url != null" />
        </q-card-section>
      </q-tab-panel>

      <q-tab-panel name="work">
        <q-card-section>
          <q-select v-model="form.area" :options="areas" label="Area" filled dense clearable option-label="name"
            :rules="[val => !!val || 'Área obligatoria']" />
          <q-separator spaced inset vertical dark />
          <q-select v-if="form.area" v-model="form.rol" :options="positions" label="Puesto" filled dense clearable
            option-label="name" :rules="[val => !!val || 'Puesto obligatorio']" />
          <q-separator spaced inset vertical dark />
          <q-select v-model="form.stores.pincipal" :options="stores" label="Sucursal Principal" filled dense clearable
            option-label="name" @update:model-value="insfo" :rules="[val => !!val || 'Sucursal principal obligatoria']">
            <template v-slot:after v-if="form.stores.pincipal">
              <q-btn dense round flat icon="store" @click="addWorkpoints = !addWorkpoints">
                <q-badge color="positive" floating transparent>
                  {{ form.stores.val.length }}
                </q-badge>
              </q-btn>
            </template>
          </q-select>
        </q-card-section>
      </q-tab-panel>
    </q-tab-panels>
    <q-card-actions align="center">
      <q-btn flat label="Agregar" color="positive" @click="addForm" />
      <q-btn flat label="Cancelar" color="negative" v-close-popup />
    </q-card-actions>
  </q-form>
  <q-dialog v-model="addWorkpoints">
    <q-card>
      <q-card-section>
        <q-option-group v-model="form.stores.val" :options="storeOptions" color="primary" type="toggle" dense />
      </q-card-section>
    </q-card>
  </q-dialog>
  <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept="image/*" />
</template>

<script setup>
import UserApi from 'src/API/UserApi';
import { computed, ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue';
import { exportFile, useQuasar, date } from 'quasar';
const $q = useQuasar();
const props = defineProps({
  users: { type: Array, default: [] },
  stores: { type: Array, default: [] },
  states: { type: Array, default: [] },
  areas: { type: Array, default: [] },
  mobile: { type: Boolean, default: false }
})
const emit = defineEmits(['termino'])
const inputFile = ref(null);
const tab = ref('personal')
const addWorkpoints = ref(false)
const formRef = ref(null)
const genders = ref([
  { id: 'I', label: 'Indefinido' },
  { id: 'M', label: 'Maculino' },
  { id: 'F', label: 'Femenino' },
])

const form = ref({
  nick: null,
  name: null,
  surnames: null,
  dob: null,
  celphone: null,
  email: null,
  gender: { id: 'I', label: 'Indefinido' },
  profile: {
    file: null,
    url: null
  },
  rol: null,
  stores: {
    pincipal: null,
    val: []
  },
})

const positions = computed(() => props.areas.find(e => e.id == form.value.area?.id)?.roles)
const storeOptions = computed(() =>
  props.stores.map(s => ({
    label: s.name,
    value: s.id,
    disable: isDisabled(s.id)
  }))
)
const required = val => !!val || 'Campo obligatorio'
const existsBy = (key, value) => {
  if (!value) return 'Campo Obligatorio'
  return props.users.some(u => u[key]?.toString().toLowerCase() === value.toString().toLowerCase())
}
const validNick = val => {
  if (!val) return 'Campo Obligatorio'
  return !existsBy('nick', val) || 'El alias ya existe'
}
const validCelphone = val => {
  if (!val) return 'Campo Obligatorio'
  if (val.length < 10) return 'Debe tener al menos 10 dígitos'
  return !existsBy('celphone', val) || 'El número ya existe'
}
const validEmail = val => {
  if (!val) return 'Campo Obligatorio';
  const exp = /\S+@\S+\.\S+/
  if (!exp.test(val)) return 'Correo inválido'

  return !existsBy('email', val) || 'El correo ya existe'
}
const validFullName = () => {
  if (!form.value.name || !form.value.surnames) return true
  const full = `${form.value.name} ${form.value.surnames}`.toLowerCase()
  const exists = props.users.some(u =>
    `${u.name} ${u.surnames}`.toLowerCase() === full
  )
  return !exists || 'Ya existe una persona con este nombre'
}

const isOlderThan15 = (date) => {
  if (!date) return false
  const birthDate = new Date(date)
  const today = new Date()
  const minDate = new Date(
    birthDate.getFullYear() + 15,
    birthDate.getMonth(),
    birthDate.getDate()
  )
  return today >= minDate
}


const insfo = () => {
  form.value.stores.val = []
  if (form.value.stores.pincipal) {
    form.value.stores.val.push(form.value.stores.pincipal.id)
  }
}
const isDisabled = val => val === form.value.stores.pincipal.id

const clickFile = () => {
  inputFile.value.click();
};

const readFile = () => {
  const file = inputFile.value.files
  console.log(file)
  if (file.length > 0) {
    form.value.profile.file = file[0]
    form.value.profile.url = URL.createObjectURL(file[0])
  }
}

const addForm = async () => {
  $q.loading.show({ message: 'Creando Usuario' });
  await nextTick()
  const valid = await formRef.value.validate()
  if (!valid) {
    $q.notify({
      type: 'negative',
      message: 'Hay errores en el formulario'
    })
    $q.loading.hide();
    return
  }
  if (form.value.rol === null) {
    $q.notify({
      type: 'negative',
      message: 'Debes tener un rol'
    })
    $q.loading.hide();

    return
  }
  if (!form.value.stores.pincipal) {
    $q.notify({
      type: 'negative',
      message: 'Debes seleccionar una sucursal principal'
    })
    $q.loading.hide();

    return
  }
  if (form.value.stores.val.length === 0) {
    $q.notify({
      type: 'negative',
      message: 'Debes tener al menos una sucursal'
    })
    $q.loading.hide();

    return
  }
  if (!form.value.profile.file) {
    $q.notify({
      type: 'negative',
      message: 'Debes de subir al menos una foto'
    })
    $q.loading.hide();
    return
  }
  console.log(form.value)
  const data = new FormData()
  data.append('nick', form.value.nick)
  data.append('name', form.value.name)
  data.append('surnames', form.value.surnames)
  data.append('dob', form.value.dob)
  data.append('celphone', form.value.celphone)
  data.append('email', form.value.email)
  data.append('gender', form.value.gender.id)
  data.append('rol', form.value.rol.id)
  data.append('stores[principal][id]', form.value.stores.pincipal.id)
  form.value.stores.val.forEach((id, i) => {
    data.append(`stores[val][${i}]`, id)
  })
  data.append('profile', form.value.profile.file)
  const resp = await UserApi.addUsser(data)
  if (resp.fail) {
    $q.notify({
      type: 'negative',
      message: 'Error al crear usuario'
    })
    console.error(resp)
  } else {
    $q.notify({
      type: 'positive',
      message: 'Usuario creado correctamente'
    })
    $q.loading.hide();
    // props.users.push(resp);
    console.log(resp)
    emit('termino', resp)

  }
}
</script>
