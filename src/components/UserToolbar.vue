<template>
  <div class="q-pa-sm transparent text-dark row items-center">
    <q-btn color="primary" icon="home" flat dense class="q-mr-sm" @click="$router.push('/')"/>
    <div class="col"><span class="text-h6 text-pink">{{ user.credentials.nick }}</span></div>
    <div class="col text-center fs-inc1 text-primary fw-sbold">{{ user.store.name }}</div>
    <div class="col text-right">
      <q-btn color="pink" icon="logout" no-caps flat @click="WSD.state=true" />
    </div>
  </div>

  <q-dialog v-model="WSD.state" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
        <span class="q-ml-sm">Estas por cerrar sesion</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Nope!" color="primary" v-close-popup />
        <q-btn flat label="Simon!" color="primary" @click="sessionDestroy" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { useVDBStore } from 'src/stores/VDB'
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const VDB = useVDBStore();
  const user = VDB.session;
  const $router = useRouter();

  const WSD = ref({ state:false });

  const sessionDestroy = () => {
    VDB.sessionDestroy();

    $router.replace('/auth');
  }

</script>
