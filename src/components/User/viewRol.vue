<template>
  <q-card class="my-card" style="width: 520px; max-width: 80vw;">
    <q-card-section>
      <div class="text-center text-h5">{{ area.name }}</div>
      <div class="text-center text-h6">
        {{ edit ? 'Actualizar Puesto' : 'Agregar Puesto' }}
      </div>
    </q-card-section>

    <q-tabs v-model="tab" class="text-teal">
      <q-tab name="info" icon="info" label="Información" />
      <q-tab name="permissions" icon="settings" label="Permisos" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>

      <q-tab-panel name="info">
        <q-input v-model="rol.name" label="Nombre" filled />
        <q-input v-model="rol.alias" label="Alias" filled class="q-mt-sm" />
        <q-select v-model="rol.type" :options="typeRol" option-label="name" label="Tipo de puesto" filled
          class="q-mt-sm" />
        <q-separator spaced inset vertical dark />
        <div class="row" v-if="area.roles.length > 0 && !edit">
          <q-select v-model="rol.deepP" :options="area?.roles" label="Puesto" filled class="col" option-label="name">
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.name }}</q-item-label>
                  <q-item-label caption class="text-overline">Jerarquia {{ scope.opt.deep }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-separator spaced inset vertical dark />
          <q-select v-model="rol.deepR" :options="optionHierarchy" label="Rango" filled class="col"
            :disable="rol.deepP ? false : true" />
        </div>

      </q-tab-panel>

      <q-tab-panel name="permissions">
        <q-list bordered separator>
          <q-expansion-item v-for="parent in treePermissions" :key="parent.id" expand-separator>
            <template #header>
              <div class="column full-width">
                <div class="text-weight-medium">{{ parent.name }}</div>
                <div class="row q-gutter-sm q-mt-xs">
                  <q-radio v-model="parent.permission" :val="1" label="CT" dense
                    @update:model-value="onParentChange(parent)" />
                  <q-radio v-model="parent.permission" :val="2" label="V" dense
                    @update:model-value="onParentChange(parent)" />
                  <q-radio v-model="parent.permission" :val="null" label="S/A" dense
                    @update:model-value="onParentChange(parent)" />
                </div>
              </div>
            </template>
            <q-separator />
            <q-item v-for="child in parent.children" :key="child.id" class="q-ml-lg">
              <div class="column full-width">
                <div class="text-wieght-medium">{{ (child.name).toUpperCase() }}</div>
                <div class="row q-gutter-sm q-mt-xs">
                  <q-radio v-model="child.permission" :val="1" label="CT" dense
                    @update:model-value="onChildChange(parent, child)" />
                  <q-radio v-model="child.permission" :val="2" label="V" dense
                    @update:model-value="onChildChange(parent, child)" />
                  <q-radio v-model="child.permission" :val="null" label="S/A" dense
                    @update:model-value="onChildChange(parent, child)" />
                </div>
                <q-separator />
              </div>
            </q-item>

          </q-expansion-item>
        </q-list>
      </q-tab-panel>


    </q-tab-panels>

    <q-card-actions align="center">
      <q-btn flat icon="close" color="negative" @click="emit('reset')" />
      <q-btn flat :icon="edit ? 'edit' : 'check'" :color="edit ? 'warning' : 'positive'"
        @click="edit ? modify() : adding()" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import UserApi from 'src/API/UserApi'

const $q = useQuasar()
const tab = ref('info')

const props = defineProps({
  edit: Boolean,
  area: Object,
  rol: Object,
  typeRol: Array,
  permissions: Array,
})

const emit = defineEmits(['termino', 'reset'])
const treePermissions = ref([])




const mobil = computed(() => $q.platform.is.mobile)
const optionHierarchy = computed(() => {
  if (props.rol.deepP) {
    return props.rol.deepP.deep < 1 ? ['Igual', 'Menor'] : ['Menor', 'Igual', 'Mayor']
  }
  return ['Menor', 'Igual', 'Mayor']
})


const onParentChange = (parent) => {
  if (parent.permission === null) {
    parent.children.forEach(c => c.permission = null)
  }
}

const onChildChange = (parent, child) => {
  if (child.permission !== null && parent.permission === null) {
    parent.permission = child.permission
  }
}

const collectPermissions = () => {
  const out = {}

  treePermissions.value.forEach(p => {
    if (p.permission !== null) {
       out[p.id] = { _permission: p.permission }
    }
    p.children.forEach(c => {
      if (c.permission !== null) {
         out[c.id] = { _permission: c.permission }
      }
    })
  })

  return out
}


const adding = async () => {

  const permissions = collectPermissions()
  if (permissions.length === 0) {
    $q.notify({
      type: 'negative',
      message: 'Debes seleccionar al menos un permiso',
      position: 'center'
    })
    return
  }
  $q.loading.show({ message: 'Creando Puesto' })

  if (props.rol.deepR == 'Mayor') {
    props.rol.deep = props.rol.deepP.deep - 1
  } else if (props.rol.deepR == 'Igual') {
    props.rol.deep = props.rol.deepP.deep
  } else if (props.rol.deepR == 'Menor') {
    props.rol.deep = props.rol.deepP.deep + 1
  } else {
    props.rol.deep = 0
  }
  let data = {
    rol: {
      name: props.rol.name,
      alias: props.rol.alias,
      _type: props.rol.type.id,
      deep: props.rol.deep,
      _area: props.area.id,
    },
    permissions
  }
  console.log(data);

  const resp = await UserApi.addRol(data)
  if (resp.error) {
    alert('No se pudo generar el area')
  } else {
    console.log(resp)
    $q.notify({
      message: resp.message,
      type: 'positive',
      position: 'center'
    })
    $q.loading.hide()
    emit('termino', resp.rol)
  }
}

const modify = async () => {
  $q.loading.show({ message: 'Modificando Puesto' })
  const permissions = collectPermissions()
  let data = {
    rol: {
      id: props.rol.id,
      name: props.rol.name,
      alias: props.rol.alias ? props.rol.alias : '',
      _type: props.rol.type.id,
    },
    permissions
  }
  console.log(data);

  const resp = await UserApi.modifyRol(data)
  if (resp.fail) {
    alert('No se modifico el puesto')
  } else {
    console.log(resp)
    $q.notify({
      message: resp.message,
      type: 'positive',
      position: 'center'
    })
    $q.loading.hide()
    emit('termino', resp.rol)
  }
}

onMounted(() => {
  const assigned = new Map(
    props.rol?.modules?.map(m => [m.id, m.pivot?._permission]) ?? []
  )

  treePermissions.value = props.permissions.map(p => ({
    ...p,
    permission: assigned.get(p.id) ?? null,
    children: p.children.map(c => ({
      ...c,
      permission: assigned.get(c.id) ?? null
    }))
  }))
})
</script>
