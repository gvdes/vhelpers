<template>
  <q-page padding>
    <q-table v-if="AssistLYT.Justifications.length > 0" :rows="filRow" row-key="id" :rows-per-page-options="[0]"
      separator="cell" :columns="table.columns" class="rounded-borders shadow-1">
      <template v-slot:top-right>
        <div class="row q-col-gutter-sm items-center">
          <q-input dense filled rounded v-model="filter" placeholder="Buscar colaborador..." style="min-width: 220px"
            clearable>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-select dense filled rounded v-model="optsVal" :options="AssistLYT.justificationTypes" option-label="name"
            label="Tipo" style="min-width: 180px" clearable />
          <q-select dense filled rounded v-model="stateVal" :options="AssistLYT.states" option-label="name"
            label="Estado" style="min-width: 180px" clearable />
        </div>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" class="transition-all">
          <q-td key="user">
            <div class="row items-center q-gutter-sm">
              <div>
                <div class="text-bold">
                  {{ props.row.user.complete_name }}
                </div>
                <div class="text-caption text-grey">
                  ID: {{ props.row.id }}
                </div>
              </div>
            </div>
          </q-td>
          <q-td key="creacion" :props="props">
            <div class="text-bold text-left"> {{ dayjs(props.row.created_at).format('YYYY-MM-DD HH:mm') }}</div>
          </q-td>
          <q-td key="start_date">
            <q-badge color="blue-1" text-color="blue-10">
              {{ props.row.start_date }}
            </q-badge>
          </q-td>

          <q-td key="final_date">
            <q-badge color="orange-1" text-color="orange-10">
              {{ props.row.final_date }}
            </q-badge>
          </q-td>
          <q-td key="notes" :props="props">
            <div class="text-bold text-left">{{ props.row.notes }}</div>
          </q-td>
          <q-td key="evidence" @click="mosimage(props.row)">
            <div class="row q-gutter-xs">
              <q-img v-for="(img, i) in props.row.files.slice(0, 3)" :key="i" :src="img.url"
                style="width: 40px; height: 40px; border-radius: 8px" />

              <div v-if="props.row.files.length > 3" class="text-caption text-grey">
                +{{ props.row.files.length - 3 }}
              </div>
            </div>
          </q-td>
          <q-td key="type" :props="props">
            <q-select v-model="props.row.type" :options="AssistLYT.justificationTypes" label="Justificacion" outlined
              option-label="name" dense :disable="!isRH" />
          </q-td>
          <q-td key="paymen" :props="props">
            <q-select v-model="props.row.paymen" :options="AssistLYT.payments" label="%" outlined
              option-label="percentage" dense :disable="!props.row.type || !isRH" />
          </q-td>
          <q-td key="state" :props="props">
            <q-select v-model="props.row.state" :options="AssistLYT.states" label="Confirmacion" outlined
              option-label="name" dense @update:model-value="change(props.row)" :disable="!props.row.paymen || !isRH" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="image">
      <q-card class="media-card">
        <q-bar>
          <div class="text-bold ellipsis">
            {{ row.complete_name }} — <span class="text-overline">{{ row.nick }}</span>
          </div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section>
          <div class="q-pa-md">
            <q-spinner v-if="mediaLoading" size="50px" color="primary" class="absolute-center" />
            <q-carousel v-else-if="row.files.length" v-model="slide" animated arrows navigation infinite swipeable
              class="media-carousel" control-color="dark">
              <q-carousel-slide v-for="(item, i) in row.files" :key="i" :name="i" class="flex flex-center">
                <q-img :src="item.url" spinner-color="primary" class="media-img" />
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue';
import assistApi from "src/API/colabAPI.js";
import { exportFile, useQuasar, date } from 'quasar';
import addDeviceCm from "src/components/Assist/addDevice.vue";
import dayjs from 'dayjs';
import { AssistStore } from 'stores/AssistStore';
const AssistLYT = AssistStore();

const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
AssistLYT.setTitle('Justificaciones')
AssistLYT.setShowBtns(true);
const mediaLoading = ref(false)
const slide = ref(0)
const image = ref(false);
const row = ref(null);
const filter = ref('');
const optsVal = ref(null);
const stateVal = ref(null);
const init = async () => {
  $q.loading.show({message:'Obteniendo Datos'})
  let data = {
    sid: VDB.session.store.id,
    uid: VDB.session.credentials.id,
    zone: VDB.session.credentials.zone ? VDB.session.credentials.zone.stores.map(e => e.id) : null
  }
  const resp = await assistApi.Resourcesform(data)
  if (resp.fail) {
    console.log(resp.fail)
  } else {
    $q.loading.hide()
    console.log(resp)
    AssistLYT.setJustifications(resp.justifications)
    AssistLYT.setTypeJST(resp.types)
    AssistLYT.setUsers(resp.users)
    AssistLYT.setPayments(resp.payments)
    AssistLYT.setStates(resp.states)
  }
}

const isRH = computed(() => {
  return ['rrhh', 'root'].includes(VDB.session.credentials.rol.alias)
})

const bascket = computed(() => AssistLYT.Justifications.filter(e =>
  e.user.complete_name.toLowerCase().includes(filter.value.toLowerCase())
))
const filRow = computed(() => {
  return bascket.value.filter(bs => {
    if (optsVal.value && bs._type !== optsVal.value.id) return false;
    if (stateVal.value && bs._state !== stateVal.value.id) return false;
    return true
  })
})
const table = ref({
  columns: [
    { name: 'user', label: 'Colaborador', field: row => row.user, sortable: true, align: 'left' },
    { name: 'creacion', label: 'Creacion', field: row => row.created_at, sortable: true, align: 'center' },
    { name: 'start_date', label: 'Fecha Inicio', field: row => row.start_date, sortable: true, align: 'center' },
    { name: 'final_date', label: 'Fecha Final', field: row => row.final_date, sortable: true, align: 'center' },
    { name: 'notes', label: 'Motivo', field: row => row.notes, sortable: true, align: 'center' },
    { name: 'evidence', label: 'Comprobante', field: row => row.evidence, sortable: true, align: 'center' },
    { name: 'type', label: 'Tipo', field: row => row.type, sortable: true, align: 'center' },
    { name: 'paymen', label: 'Porcetaje', field: row => row.paymen, sortable: true, align: 'center' },
    { name: 'state', label: 'Estado', field: row => row.state, sortable: true, align: 'center' },
  ]
})
const mosimage = (a) => {
  image.value = true
  console.log(a);
  row.value = a
}

const change = async (a) => {
  $q.loading.show({ message: 'Cambiando Status' });
  console.log(a)
  const resp = await assistApi.changeStatus(a);
  if (resp.error) {
    console.log(resp)
  } else {
    console.log(resp)
    AssistLYT.updateJustification(resp)
    $q.loading.hide();
    $q.notify({ message: `Justificacion ${resp.state.name}`, type: resp.state.id == 1 ? 'positive' : 'negative', position: 'center' })
  }
}
init()
</script>
<style>
.media-card {
  width: 90vw;
  max-width: 900px;
  height: 85vh;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}

.media-content {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.media-carousel {
  height: 100%;
}

.media-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.media-video {
  max-width: 100%;
  max-height: 100%;
}
</style>
