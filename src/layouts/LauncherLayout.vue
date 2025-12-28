<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->

    <q-header bordered class="bg-grey-3 ">
      <UserToolbar />
    </q-header>

    <q-page-container>
      <!-- This is where pages get injected -->
      <q-page class="flex flex-center" padding>
        <canvas ref="canvas" class="overlay"></canvas>
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
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import UserToolbar from 'src/components/UserToolbar.vue';
import authsApi from "src/API/auth.js";
// import { requestPermission } from 'boot/firebase'
import { exportFile, useQuasar } from 'quasar';

const VDB = useVDBStore();
const $router = useRouter();
const user = VDB.session;
const $q = useQuasar();
const canvas = ref(null)
const icons = ['❄️']
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
    'avatar26.png',
    'avatar27.png',
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
  $q.loading.show({ message: 'Cambiando Avatar :)' })
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
    $q.notify({ type: 'positive', icon: 'check' })
    $q.loading.hide()
  }
}

onMounted(() => {
  const c = canvas.value
  const ctx = c.getContext('2d')

  c.width = window.innerWidth
  c.height = window.innerHeight

  let items = Array.from({ length: 30 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    s: Math.random() * 24 + 18,
    d: Math.random() * 1.5 + 0.5,
    icon: icons[Math.floor(Math.random() * icons.length)]
  }))

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height)
    items.forEach(i => {
      ctx.font = `${i.s}px serif`
      ctx.fillText(i.icon, i.x, i.y)
      i.y += i.d
      if (i.y > c.height) {
        i.y = -20
        i.x = Math.random() * c.width
      }
    })
    requestAnimationFrame(draw)
  }

  draw()
})
// onMounted(async () => {
//   await requestPermission()
// })

</script>
<style>
.overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

.content {
  position: relative;
  z-index: 20;
}
</style>
