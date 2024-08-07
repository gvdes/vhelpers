<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->

    <q-header bordered class="bg-grey-3 ">
      <UserToolbar />
    </q-header>

    <q-page-container>
      <!-- This is where pages get injected -->


      <q-page class="flex flex-center" padding>
        <q-list separator>
          <div class="q-py-md text-center">
            <div class="text-h4 text-indigo-10">Menu</div>
            <div class="text-grey-5">Herramientas rapiditas</div>
          </div>

          <q-item clickable v-ripple v-for="(module, idx) in appmodules" :key="idx" :to="module.path">
            <!-- <q-item-section top avatar>
              <q-avatar color="primary" text-color="white" icon="bluetooth" />
            </q-item-section> -->
            <q-item-section>
              <q-item-label class="text-h6">{{ module.name }}</q-item-label>
              <q-item-label caption>{{ module.desc }}</q-item-label>
            </q-item-section>
            <q-item-section avatar>
              <q-avatar flat color="transparent" text-color="primary" icon="arrow_forward" />
            </q-item-section>
            <!-- <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section> -->
          </q-item>
        </q-list>
      </q-page>
      <!-- <router-view /> -->
    </q-page-container>

  </q-layout>
</template>

<script setup>
  import { useVDBStore } from 'src/stores/VDB'
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router';
  import UserToolbar from 'src/components/UserToolbar.vue';

  const VDB = useVDBStore();
  const $router = useRouter();
  const user = VDB.session;

  // const appmodules = VDB.modules;

  const appmodules = computed(() => {
    // return  user.rol == 'caj' ? VDB.authsCashiers : VDB.modules
    if(user.rol == 'caj' ){
      return VDB.authsCashiers
    }else if(user.rol == 'aux'){
      return VDB.authsAux
    }else if(user.rol == 'gen'){
      return VDB.authGen
    }else if(user.rol == 'root'){
      return VDB.autRoot

    }
  })

  if(appmodules.length>1){
      console.log("vamo a seleccionar modulo");
  }else{
    console.log(appmodules.length)
    const mod = appmodules[0];
    if(mod){
      $router.replace(mod.path);
    }

  }

</script>
