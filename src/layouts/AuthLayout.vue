<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-page-container>
      <q-header class="bg-transparent">
        <q-toolbar>
          <q-toolbar-title>
            Accesso
          </q-toolbar-title>
          <div class="text-primary text-bold">VH v.2.0</div>
        </q-toolbar>
      </q-header>

      <q-page padding class="flex flex-center">
        <q-card flat class="bg-transparent">
          <q-card-section>
            <q-card-section class="q-pb-sm q-pt-sm flex flex-center">
              <animateStudio ref="robot" />
            </q-card-section>
            <q-card-section>

              <q-form @submit="trySignin" class="q-gutter-lg" @focusout="onFocusOut">
                <q-input outlined rounded standout="text-primary" placeholder="nick" input-class="fs-inc2 text-center"
                  v-model="auths.nick" type="text" autocapitalize="off" autocomplete="off" @focus="activeField = 'user'"
                  @update:model-value="robot?.typing($event)" />
                <q-input outlined rounded placeholder="nip" input-class="fs-inc2 text-center" v-model="auths.pass"
                  type="password" @focus="activeField = 'password'" />
                <div class="text-center" v-if="canSignin">
                  <q-btn label="Entrar" rounded outline type="submit" color="primary" />
                </div>
              </q-form>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-page>
      <q-footer class="text-center text-caption text-grey bg-transparent">Grupo Vizcarra 2026</q-footer>
      <div> </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useVDBStore } from 'stores/VDB'
import { LocalStorage, useQuasar } from 'quasar';
import authsApi from "src/API/auth.js";
import { useRouter } from 'vue-router';
import animateStudio from 'src/components/animateStudio.vue';
const robot = ref(null)
const activeField = ref(null)
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();


const auths = ref({
  nick: "",
  pass: ""
});

const canSignin = computed(() => (auths.value.nick && auths.value.pass));

const trySignin = async () => {
  console.log("Iniciando sesion ...", auths.value);
  robot.value.setLoading()
  const user = await authsApi.trySignin(auths.value);
  // console.log(user)
  if (user.fail) {
    if (user.fail.status == 404) {
      robot.value.setError()
      $q.notify({ message: "Credenciales erroneas", color: "negative", icon: "fas fa-bugs" });
    }
    console.log(user);
  } else {
    let u = JSON.parse(JSON.stringify(user));
    console.log(u)
    // delete u.credentials.pass;
    robot.value.setSuccess()
    LocalStorage.set("auth", u);
    VDB.setSession(u);
    $router.replace('/');
  }
}

const onFocusOut = e => {
  if (!e.currentTarget.contains(e.relatedTarget)) {
    activeField.value = null
  }
}
watch(activeField, val => {
  if (!robot.value) return

  if (val === 'user') robot.value.setUser()
  else if (val === 'password') robot.value.setPassword()
  else robot.value.setIdle()
})
</script>
