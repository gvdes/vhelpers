<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->

    <q-header bordered class="bg-grey-3 ">
      <UserToolbar />
    </q-header>

    <q-page-container>
      <!-- This is where pages get injected -->
      <q-page class="flex flex-center" padding>
        <div class="row q-pa-md q-gutter-md">
          <div class="col">
            <div class="text-h4 text-grey-8 text-center">
              <div>Hola</div>
              <div class="text-primary">{{ VDB.session?.name }}</div>
              <span class="text-primary"></span>
            </div>
            <div class="text-center anek-lg text-h5 text-grey-6">{{ greeting }}</div>
            <div class="q-py-lg text-center">
              <q-btn flat
                @click="() => { mosAvatar.state = !mosAvatar.state; mosAvatar.val = VDB.session.credentials.avatar }">
                <q-img :src="`/avatares/${VDB.session?.credentials.avatar}`" style="width: 170px;" />
              </q-btn>
            </div>
          </div>
        </div>
      </q-page>
      <!-- <router-view /> -->
      <q-dialog v-model="mosAvatar.state" persistent>
        <q-card>
          <q-card-section>
            <div class="row q-gutter-md justify-center q-pa-md">
              <div v-for="(avatar, index) in mosAvatar.opts" :key="index" class="relative-position"
                style="width: 100px; height: 100px; cursor: pointer" @click="selectAvatar(avatar)">
                <q-img :src="`/avatares/${avatar}`" :alt="avatar" style="width: 100px; height: 100px"
                  class="rounded-borders" />
                <q-icon v-if="mosAvatar.val === avatar" name="check_circle" color="" size="sm"
                  class="absolute-bottom-right q-mt-sm q-mr-sm" />
              </div>
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn flat label="OK" @click="changeAvatar" color="positive" />
            <q-btn flat label="Cancelar" v-close-popup color="negative" />
          </q-card-actions>
        </q-card>

      </q-dialog>

    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'src/stores/VDB'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import UserToolbar from 'src/components/UserToolbar.vue';
import authsApi from "src/API/auth.js";
import { exportFile, useQuasar } from 'quasar';

const VDB = useVDBStore();
const $router = useRouter();
const user = VDB.session;
const $q = useQuasar();
const mosAvatar = ref({
  val: null,
  state: false,
  opts: [
    'avatar0.png',
    'avatar1.png',
    'avatar2.png',
    'avatar3.png',
    'avatar4.png',
    'avatar5.png',
    'avatar6.png',
    'avatar7.png',
    'avatar8.png',
    'avatar9.png',
    'avatar10.png',
    'avatar11.png',
    'avatar12.png',
    'avatar13.png',
    'avatar14.png',
    'avatar15.png',
    'avatar16.png',
    'avatar17.png',
    'avatar18.png',
    'avatar19.png',
    'avatar20.png',
    'avatar21.gif',
    'avatar22.png',
    'avatar23.png',
    'avatar24.png',
    'avatar25.png',
  ]
})
const greetings = ref([
  "Que gusto verte!",
  "Excelente dia!",
  "Que sea un gran dia!",
  "Paciencia crack, paciencia.",
  "Como va todo?",
  "Empecemos...",
  "Manos a la obra!",
  "Exito!",
  "Vacaciones??... pff...",
  "Si buscas resultados distintos, no hagas siempre lo mismo.",
  "Quien tiene claro un porque? Puede superar casi cualquier cómo"
]);


const greeting = computed(() => greetings.value[Math.floor(Math.random() * greetings.value.length)]);
const avatar = computed(() => Math.floor(Math.random() * 6));

const selectAvatar = (avatar) => {
  mosAvatar.value.val = avatar
}


const changeAvatar = async () => {
  $q.loading.show({message:'Cambiando Avatar :)'})
  let data = {
    id: VDB.session.credentials.id,
    avatar: mosAvatar.value.val
  }
  const resp = await authsApi.changeAvatar(data);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    VDB.setSession({
      ...VDB.session,
      credentials: {
        ...VDB.session.credentials,
        avatar: mosAvatar.value.val
      }
    })
    mosAvatar.value.val = null
    mosAvatar.value.state = false
    $q.notify({type:'positive',icon:'check'})
    $q.loading.hide()
  }
}


</script>
