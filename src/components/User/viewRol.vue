<template>
  <q-card class="my-card" style="width: 520px; max-width: 80vw;">
    <q-card-section>
      <div class="text-center text-h5">{{ area.name }}</div>
      <div class="text-center text-h6">{{ edit ? 'Actualizar Puesto' : 'Agregar Puesto ' }}</div>
    </q-card-section>
    <q-tabs v-model="tab" class="text-teal">
      <q-tab name="info" icon="info" label="Informacion" />
      <q-tab name="permissions" icon="settings" label="Permisos" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="info">
        <q-card-section>
          <q-input v-model="rol.name" type="text" label="Nombre" filled />
          <q-separator spaced inset vertical dark />
          <q-input v-model="rol.alias" type="text" label="Alias" filled />
          <q-separator spaced inset vertical dark />
          <q-select v-model="rol.type" :options="typeRol" label="Tipo de puesto" filled option-label="name" />
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
        </q-card-section>
      </q-tab-panel>
      <q-tab-panel name="permissions">
        <!-- <q-input dense v-model="search" type="text" label="Buscar" /> -->
        <q-list bordered>
          <q-expansion-item v-for="parent in treePermissions" :key="parent.id" expand-separator>
            <template #header>
              <q-toggle v-model="parent.allowed" :label="parent.name" @update:model-value="toggleParent(parent)" />
            </template>
            <q-item v-for="child in parent.children" :key="child.id" class="q-ml-lg">
              <q-item-section>
                <q-toggle v-model="child.allowed" :label="child.name"
                  @update:model-value="toggleChild(parent, child)" />
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>

    <q-card-actions v-if="edit" align="center">
      <q-btn flat icon="close" color="negative" @click="emit('reset')" />
      <q-btn flat icon="edit" color="warning" @click="modify" />
    </q-card-actions>
    <q-card-actions v-else align="center">
      <q-btn flat icon="close" color="negative" @click="emit('reset')" />
      <q-btn flat icon="check" color="positive" @click="adding" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import UserApi from 'src/API/UserApi';
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { exportFile, useQuasar, date } from 'quasar';
const $q = useQuasar();
const tab = ref('info')
const rolePermissions = ref([])

const props = defineProps({
  edit: { type: Boolean, default: false },
  area: { type: Object, default: {} },
  rol: { type: Object, defaul: {} },
  typeRol: { type: Array, defaul: [] },
  roles: { type: Array, default: [] },
  permissions: { type: Array, default: [] }
})
const emit = defineEmits(['termino', 'reset'])
const search = ref(null)
const treePermissions = ref([])




const optionHierarchy = computed(() => {
  if (props.rol.deepP) {
    return props.rol.deepP.deep < 1 ? ['Igual', 'Menor'] : ['Menor', 'Igual', 'Mayor']
  }
  return ['Menor', 'Igual', 'Mayor']
})


const toggleParent = (parent) => {
  if (!parent.allowed) {
    parent.children.forEach(c => c.allowed = false)
  }
}

const toggleChild = (parent, child) => {
  if (child.allowed) {
    parent.allowed = true
  }
}

const collectPermissions = () => {
  const permissions = []

  treePermissions.value.forEach(parent => {
    if (parent.allowed === true) {
      permissions.push(parent.id)
    }

    if (Array.isArray(parent.children)) {
      parent.children.forEach(child => {
        if (child.allowed === true) {
          permissions.push(child.id)
        }
      })
    }
  })

  return permissions
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
  const assigned = new Set(
    props.rol?.modules?.map(m => m.pivot?._module) ?? []
  )

  treePermissions.value = props.permissions.map(parent => ({
    ...parent,
    allowed: assigned.has(parent.id),
    children: parent.children.map(child => ({
      ...child,
      allowed: assigned.has(child.id)
    }))
  }))
})
</script>
