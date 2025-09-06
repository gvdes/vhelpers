<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-page-container>
      <!-- This is where pages get injected -->
      <!-- <router-view /> -->
      <q-page padding class="flex flex-center">
        <q-card flat class="bg-transparent">
          <q-card-section class="row items-center justify-between">
            <div class="fs-inc4">Acceso</div>
            <div class="text-right fw-xbold text-primary fs-dec2">VH v1.0</div>
          </q-card-section>

          <!-- <q-separator /> -->

          <q-card-section horizontal>
            <q-card-section>
              <q-form @submit="trySignin" class="q-gutter-lg">
                <q-input outlined rounded standout="text-primary" placeholder="nick" input-class="fs-inc2 text-center"
                  v-model="auths.nick" type="text" autofocus="" autocapitalize="off" autocomplete="off" />
                <q-input outlined rounded placeholder="nip" input-class="fs-inc2 text-center" v-model="auths.pass"
                  type="password" />
                <div class="text-center" v-if="canSignin">
                  <q-btn label="Entrar" type="submit" color="primary" />
                </div>
              </q-form>
            </q-card-section>
          </q-card-section>
        </q-card>
      </q-page>

    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useVDBStore } from 'stores/VDB'
import { LocalStorage, useQuasar } from 'quasar';
import authsApi from "src/API/auth.js";
import { useRouter } from 'vue-router';
import CryptoJS from 'crypto-js';

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
  const user = await authsApi.trySignin(auths.value);
  // console.log(user)
  if (user.fail) {
    if (user.fail.status == 404) {
      $q.notify({ message: "Credenciales erroneas", color: "negative", icon: "fas fa-bugs" });
    }
    console.log(user);
  } else {
    let u = JSON.parse(JSON.stringify(user));
    console.log(u)
    // delete u.credentials.pass;

    LocalStorage.set("auth", u);
    VDB.setSession(u);
    $router.replace('/');
  }
}
</script>
