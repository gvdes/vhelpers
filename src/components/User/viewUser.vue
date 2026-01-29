<template>
  <div class="q-pa-md">
    <q-card flat bordered>
      <q-card-section class="row items-center q-gutter-md">
        <q-avatar size="96px">
          <img :src="avatarUrl" @click="mediaDialog = !mediaDialog" />
        </q-avatar>

        <div class="col">
          <div class="text-h6 text-weight-bold">
            {{ fullName }}
          </div>
          <div class="text-grey-6">
            @{{ editableUser.nick }} · {{ editableUser.rol?.name }} <q-space /> <span><q-btn color="primary" icon="lock"
                title="reestablecer contrasena" @click="resetPass" outline dense
                :disable="editableUser._state == 1" /></span>
          </div>

        </div>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="q-mt-md">
      <q-tabs v-model="tab" dense>
        <q-tab name="personal" icon="person" label="Personales" />
        <q-tab name="work" icon="work" label="Laborales" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="personal">
          <q-card-section class="q-gutter-sm">
            <q-input v-model="editableUser.name" label="Nombre(s)" filled dense :rules="rules.name"
              :class="changedClass('name')" :disable="canView" />
            <q-input v-model="editableUser.surnames" label="Apellidos" filled dense :rules="rules.surnames"
              :class="changedClass('surnames')" :disable="canView" />
            <q-input v-model="editableUser.nick" label="Alias" filled dense :rules="rules.nick"
              :class="changedClass('nick')" :disable="canView" />
            <q-input v-model="editableUser.celphone" label="Teléfono" filled dense mask="##########"
              :rules="rules.celphone" :class="changedClass('celphone')" v-if="!canView" />
            <q-input v-model="editableUser.email" label="Correo" filled dense :rules="rules.email"
              :class="changedClass('email')" v-if="!canView"  />
            <q-select v-model="editableUser.gender" label="Género" filled dense emit-value map-options
              :options="genders" :rules="rules.gender" :class="changedClass('gender')" v-if="!canView"  />
          </q-card-section>
        </q-tab-panel>

        <q-tab-panel name="work">
          <q-card-section class="q-gutter-sm">
            <q-input dense filled v-model="editableUser.rc_id" type="text" label="Id Reloj Checador" :disable="true"
              class="col" v-if="editableUser.rc_id || canView"  />
            <q-btn outline color="primary" label="Id Reloj Checador" @click="checador = !checador" v-else
              class="full-width"  />
            <q-select v-model="editableUser.enterprise" :options="enterprises" option-label="name" label="Empresa"
              filled dense :class="changedClass('state')" :disable="editableUser.state.id == 1" v-if="!canView"  />
            <q-select v-model="editableUser.state" :options="states" option-label="name" label="Estado" filled dense
              :class="changedClass('state')" :disable="editableUser.state.id == 1 || canView"
              :option-disable="(val) => optionDisabled(val)"  />
            <q-select v-model="editableUser.area" :options="areas" option-label="name" label="Área" filled dense
              :class="changedClass('area')" @update:model-value="editableUser.rol = null" :disable="canView" />
            <q-select v-model="editableUser.rol" :options="positions" option-label="name" label="Rol" filled dense
              :class="changedClass('rol')" :disable="canView" />
            <q-select v-model="editableUser.store" :options="stores" option-label="name" label="Sucursal principal"
              filled dense @update:model-value="insfo" :class="changedClass('store')" :disable="canView">
              <template #after>
                <q-btn dense flat round icon="store" @click="addWorkpoints = true"
                  :class="storesChanged ? 'changed-store-btn' : ''" :disable="canView">
                  <q-badge floating color="positive">
                    {{ editableUser.stores.length }}
                  </q-badge>
                </q-btn>
              </template>
            </q-select>

          </q-card-section>
        </q-tab-panel>

      </q-tab-panels>
      <q-card-actions align="center">
        <q-btn color="positive" icon="check" label="Confirmar" :disable="!hasChanges || !isValid"
          @click="confirm = !confirm" v-if="!canView"/>
      </q-card-actions>
    </q-card>

    <q-dialog v-model="addWorkpoints">
      <q-card style="min-width:320px">
        <q-card-section class="text-weight-bold">
          Sucursales asignadas
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-option-group v-model="selectedStores" :options="storeOptions" type="toggle" dense color="primary" />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Guardar" @click="saveStores" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="dark" />
          <span class="q-ml-sm">Estas Seguro de modificar el usuario?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn flat label="OK" color="positive" @click="confirmChanges" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="mediaDialog" persistent>
      <q-card class="media-card">
        <q-bar>
          <div class="text-bold ellipsis">
            {{ editableUser?.nick }} — {{ editableUser?.name }}
          </div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section class="q-pa-none media-content">
          <q-img v-if="avatarUrl" :src="avatarUrl" spinner-color="primary" class="media-img" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="checador" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Cual es el id?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="editableUser.rc_id" autofocus @keyup.enter="prompt = false" :error="idrcvalid"
            error-message="El id ya esta en uso" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" @click="resetchecador" />
          <q-btn flat label="Ingresar" v-close-popup :disable="idrcvalid" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { exportFile, useQuasar, date } from 'quasar';
import { cloneDeep, isEqual } from 'lodash-es'
import { useRouter, useRoute } from "vue-router";
import { vizmedia } from 'boot/axios'
import { useVDBStore } from "stores/VDB";
import UserApi from 'src/API/UserApi';
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const props = defineProps({
  users: Array,
  user: Object,
  stores: Array,
  states: Array,
  areas: Array,
  enterprises: Array,
})
const emit = defineEmits(['termino'])
const tab = ref('personal')
const addWorkpoints = ref(false)
const confirm = ref(false)
const mediaDialog = ref(false)
const checador = ref(false)
const selectedStores = ref([])
const mainStoreId = ref(null)
const editableUser = ref(cloneDeep(props.user))
const originalUser = ref(cloneDeep(props.user))
const genders = [
  { label: 'Indefinido', value: 'I' },
  { label: 'Masculino', value: 'M' },
  { label: 'Femenino', value: 'F' }
]
const rules = {
  name: [v => !changed('name') || !!v || 'Requerido'],
  surnames: [v => !changed('surnames') || !!v || 'Requerido'],
  nick: [v => !changed('nick') || v.length >= 3 || 'Min 3'],
  celphone: [v => !changed('celphone') || /^\d{10}$/.test(v) || 'Teléfono inválido'],
  email: [v => !changed('email') || /.+@.+\..+/.test(v) || 'Correo inválido'],
  gender: [v => !changed('gender') || !!v || 'Selecciona género'],
  enterprise: [v => !changed('enterprice') || !!v || 'Selecciona género'],
  rc_id: [v => !changed('rc_id') || !!v || 'Selecciona género'],

}
const canView = computed(() =>
  VDB.permission($route.meta.moduleId)
)

const fullName = computed(() =>
  `${editableUser.value.name} ${editableUser.value.surnames}`
)
const avatarUrl = computed(() => {
  const a = editableUser.value.media?.find(m => m._type === 1)
  return a
    ? `${vizmedia}/users/${a._user}/${a.id}/${a.path}`
    : '/avatares/avatar1.png'
})
const positions = computed(() =>
  props.areas.find(a => a.id === editableUser.value.area?.id)?.roles || []
)
const idrcvalid = computed(() => {
  let arr = props.users.filter((e) => e.id != editableUser.value.id);
  let nkmil = arr.filter((e) => e.rc_id == editableUser.value.rc_id);
  return nkmil.length >= 1 ? true : false;
});
const isValid = computed(() => {
  return Object.entries(rules).every(([k, r]) =>
    !changed(k) || r.every(fn => fn(editableUser.value[k]) === true)
  )
})
const hasChanges = computed(() => {
  const e = editableUser.value
  const o = originalUser.value

  return (
    e.name !== o.name ||
    e.surnames !== o.surnames ||
    e.nick !== o.nick ||
    e.email !== o.email ||
    e.celphone !== o.celphone ||
    e.gender !== o.gender ||
    e.rc_id !== o.rc_id ||
    e.enterprise?.id !== o.enterprise?.id ||

    e.store?.id !== o.store?.id ||
    e.rol?.id !== o.rol?.id ||
    e.state?.id !== o.state?.id ||
    storesChanged.value
  )
})

const storeOptions = computed(() =>
  props.stores.map(s => ({
    label: s.name,
    value: s.id,
    disable: s.id === editableUser.value.store?.id
  }))
)
const changedPayload = computed(() => {
  const p = {}
  const e = editableUser.value
  const o = originalUser.value

  if (e.name !== o.name) p.name = e.name
  if (e.surnames !== o.surnames) p.surnames = e.surnames
  if (e.nick !== o.nick) p.nick = e.nick
  if (e.email !== o.email) p.email = e.email
  if (e.celphone !== o.celphone) p.celphone = e.celphone
  if (e.gender !== o.gender) p.gender = e.gender
  if (e.rc_id !== o.rc_id) p.rc_id = e.rc_id
  if (e.enterprise?.id !== o.enterprise?.id) p._enterprise = e.enterprise.id
  if (e.dob !== o.dob) p.dob = e.dob
  if (e.store?.id !== o.store?.id) p._store = e.store.id
  if (e.rol?.id !== o.rol?.id) p._rol = e.rol.id
  if (e.state?.id !== o.state?.id) p._state = e.state.id
  if (!sameIds(e.stores, o.stores)) {
    p.stores = e.stores.map(s => s.id)
  }
  return p
})

const insfo = () => {
  selectedStores.value = []
  editableUser.value.stores = []
  if (editableUser.value.store) {
    selectedStores.value.push(editableUser.value.store.id)
    editableUser.value.stores.push(editableUser.value.store)

  }
}

const sameIds = (a = [], b = []) => {
  const aa = a.map(e => e.id).sort()
  const bb = b.map(e => e.id).sort()
  return aa.length === bb.length && aa.every((v, i) => v === bb[i])
}

const changed = field =>
  !isEqual(editableUser.value[field], originalUser.value[field])

const changedClass = field =>
  changed(field) ? 'changed-field' : ''

const storesChanged = computed(() =>
  !sameIds(editableUser.value.stores, originalUser.value.stores)
)

const saveStores = () => {
  editableUser.value.stores = props.stores.filter(s =>
    selectedStores.value.includes(s.id)
  )
  addWorkpoints.value = false
}

const optionDisabled = (val) => {
  if (val.id == 1 || val.id == 5) {
    return true
  }
  return false
}

const confirmChanges = async () => {
  $q.loading.show({ message: 'Modificando Usuario' })
  let data = {
    user: editableUser.value.id,
    modify: changedPayload.value
  }
  console.log(data)
  const resp = await UserApi.modifyUser(data)
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp)
    editableUser.value = resp.user
    originalUser.value = resp.user
    emit('termino', resp.user)
    $q.loading.hide()
  }
}

const resetchecador = () => {
  editableUser.value.rc_id = null
  checador.value = !checador.value
}
const resetPass = () => {
  $q.dialog({
    title: 'Confirm',
    message: 'Se Mofidficara la contrasena a 12345',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    console.log('>>>> OK')
    $q.loading.show({ message: 'Cambiando Contrasena' })
    const resp = await UserApi.resetpass({ user: editableUser.value.id });
    if (resp.fail) {
      console.log(resp)

    } else {
      console.log(resp)
      $q.loading.hide()
      $q.notify({
        message: 'Contrasena Actualizada',
        type: 'positive',
        position: 'bottom'
      })
    }
  })
}

watch(addWorkpoints, v => {
  if (v) {
    selectedStores.value = editableUser.value.stores.map(s => s.id)
  }
})
watch(
  () => props.user,
  (user) => {
    if (!user) return

    const cloned = cloneDeep(user)
    const mainStore = cloned.store || null

    const storesWithMain = Array.isArray(cloned.stores) ? [
      ...(cloned.stores.some(s => s.id === mainStore?.id))
        ? cloned.stores
        : [...cloned.stores, mainStore]
    ].filter(Boolean)
      : mainStore
        ? [mainStore]
        : []

    editableUser.value = {
      ...cloned,
      store: mainStore,
      stores: storesWithMain,
      area: user.rol?.area || null,
      rol: user.rol || null,
    }

    originalUser.value = cloneDeep(editableUser.value)
  },
  { immediate: true }
)

watch(
  () => props.user,
  u => {
    editableUser.value = cloneDeep(u)
    originalUser.value = cloneDeep(u)
  },
  { deep: true }
)
</script>

<style scoped>
.changed-field {
  border-left: 4px solid #21ba45;
  animation: pulse 0.4s ease-in-out;
}

.media-card {
  width: 90vw;
  max-width: 900px;
  height: 85vh;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}


.changed-store-btn {
  animation: pulse 0.4s ease-in-out;
}

.media-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.media-content {
  flex: 1;
  position: relative;
  overflow: hidden;
}

@keyframes pulse {
  0% {
    background-color: #e8f5e9;
  }

  100% {
    background-color: transparent;
  }
}
</style>
