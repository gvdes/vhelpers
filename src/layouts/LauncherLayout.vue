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
          <q-select v-model="stores.val" :options="stores.opts" label="Selecciona Sucursal" option-label="name" filled
            @update:model-value="changeStore" v-if="VDB.session.rol == 'aud' || VDB.session.rol == 'root'" />
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
import { exportFile, useQuasar } from 'quasar';

const VDB = useVDBStore();
const $router = useRouter();
const user = VDB.session;
const $q = useQuasar();




// const appmodules = VDB.modules;

const stores = ref({
  val: VDB.session.store,
  opts: [
    {
      "id": 1,
      "name": "CEDIS SP",
      "alias": "CDS",
      "ip": "192.168.10.53:1619",
      "id_viz": 1
    },
    {
      "id": 3,
      "name": "San Pablo 1",
      "alias": "SP1",
      "ip": "192.168.100.250:1619",
      "id_viz": 3
    },
    {
      "id": 4,
      "name": "San Pablo 2",
      "alias": "SP2",
      "ip": "192.168.60.253:1619",
      "id_viz": 4
    },
    {
      "id": 6,
      "name": "San Pablo C",
      "alias": "SPC",
      "ip": "192.168.60.249:1619",
      "id_viz": 17
    },
    {
      "id": 7,
      "name": "Sotano",
      "alias": "SOT",
      "ip": "192.168.150.253:1619",
      "id_viz": 19
    },
    {
      "id": 8,
      "name": "Correo 1",
      "alias": "CR1",
      "ip": "192.168.30.253:1619",
      "id_viz": 5
    },
    {
      "id": 9,
      "name": "Correo 2",
      "alias": "CR2",
      "ip": "192.168.50.253:1619",
      "id_viz": 6
    },
    {
      "id": 10,
      "name": "Ramon C 1",
      "alias": "RA1",
      "ip": "192.168.10.46:1619",
      "id_viz": 9
    },
    {
      "id": 11,
      "name": "Ramon C 2",
      "alias": "RA2",
      "ip": "192.168.10.232:1619",
      "id_viz": 10
    },
    {
      "id": 12,
      "name": "Bolivia",
      "alias": "BOL",
      "ip": "192.168.10.92:1619",
      "id_viz": 13
    },
    {
      "id": 13,
      "name": "Brasil 1",
      "alias": "BR1",
      "ip": "192.168.10.177:1619",
      "id_viz": 11
    },
    {
      "id": 16,
      "name": "Apartado 1",
      "alias": "AP1",
      "ip": "192.168.10.55:1619",
      "id_viz": 7
    },
    {
      "id": 17,
      "name": "Apartado 2",
      "alias": "AP2",
      "ip": "192.168.20.249:1619",
      "id_viz": 8
    },
    {
      "id": 18,
      "name": "Puebla",
      "alias": "PUE",
      "ip": "192.168.90.253:1619",
      "id_viz": 18
    },
    {
      "id": 20,
      "name": "Corregidora",
      "alias": "CRG",
      "ip": "192.168.130.2:1619",
      "id_viz": 23
    },
    {
      "id": 19,
      "name": "Ecommerce",
      "alias": "ECO",
      "ip": "192.168.10.191:1619",
      "id_viz": 20
    }
  ]
})

const appmodules = computed(() => {
  // return  user.rol == 'caj' ? VDB.authsCashiers : VDB.modules
  if (user.rol == 'caj') {
    return VDB.authsCashiers
  } else if (user.rol == 'aux') {
    return VDB.authsAux
  } else if (user.rol == 'gen') {
    return VDB.authGen
  } else if (user.rol == 'adm') {
    return VDB.authAdm
  } else if (user.rol == 'root') {
    return VDB.autRoot
  } else if (user.rol == 'aud') {
    return VDB.autAud
  } else if (user.rol == 'ven') {
    return VDB.authsSeller
  } else if (user.rol == 'floor') {
    return VDB.authsFloor
  }else if (user.rol == 'dir') {
    return VDB.authdir
  }
})

if (appmodules.length > 1) {
  console.log("vamo a seleccionar modulo");
} else {
  console.log(appmodules.length)
  const mod = appmodules[0];
  if (mod) {
    $router.replace(mod.path);
  }

}

const changeStore = () => {
  $q.loading.show({ message: 'Cambiando sucursal' })
  VDB.session.store = stores.value.val
  VDB.setSession({
    ...VDB.session,
    store: stores.value.val
  })

  console.log(VDB.session)
  $q.loading.hide()

}

</script>
