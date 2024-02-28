<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Apertura de Cajas</span></div>
      </q-toolbar>
    </q-header>
    <q-separator spaced inset vertical dark />
    <q-page-container>
      <q-page>

        <div class="flex justify-center">
          <q-form class="q-gutter-md">
            <q-card class="my-card" square bordere>
              <q-card-section>
                <div class="text-h4 text-center">APERTURA DE CAJA</div>
                <div class="text-subtitle2 text-center">Movimientos en cajas despues de el corte</div>
              </q-card-section>
              <q-card-section>
                <q-select v-model="cajas" :options="[1, 2, 3, 4, 5, 6, 7, 8, 9]" label="Caja" outlined dense />
              </q-card-section>
              <q-card-section>
                <q-select v-model="cashiers.val" :options="cashiers.opts" label="Cajero" option-label="complete_name"
                  outlined dense />
              </q-card-section>
              <q-card-section>
                <q-select v-model="motivos" :options="['Desctuadre', 'Mal Devolucion', 'Retirada Mal']" label="Motivo"
                  outlined dense />
              </q-card-section>
              <div v-if="motivos == 'Desctuadre'">
                <q-card-section>
                  <q-input v-model="text" type="Number" label="Monto de descuadre" outlined dense />
                </q-card-section>
                <q-card-section>
                  <q-input v-model="text" type="text" label="Motivo de descuadre" outlined dense />
                </q-card-section>
              </div>


              <div v-if="motivos == 'Mal Devolucion'">
                <q-card-section>
                  <q-input v-model="text" type="text" label="Cual es el numero de ticket original" outlined dense />
                </q-card-section>
                <q-card-section>
                  <q-input v-model="text" type="text" label="Cual es el numero de devolucion original" outlined dense />
                </q-card-section>
                <q-card-section>
                  <q-input v-model="text" type="text" label="Especifica por que se creara una devolucion nueva" outlined
                    dense />
                </q-card-section>
              </div>

              <div v-if="motivos == 'Retirada Mal'">
                <q-card-section>
                  <q-input v-model="text" type="Number" label="Numero de retirada" outlined dense />
                </q-card-section>
                <q-card-section>
                  <q-select v-model="camret" :options="['Modificar', 'Eliminar']" label="Que se la hara?" outlined dense />
                </q-card-section>
                <div v-if="camret == 'Modificar'">
                  <q-card-section>
                    <q-input v-model="text" type="Number" label="Monto a modificar" outlined dense />
                  </q-card-section>
                </div>
                <q-card-section>
                  <q-input v-model="text" type="text" label="Especifica por que el cambio de la retirada" outlined
                    dense />
                </q-card-section>
              </div>
              <q-card-section>
                <div class="col flex justify-center">
                  <q-uploader :hide-upload-btn="true" ref="uploaderRefprov"  color="primary"
                     label="Corte Actual">
                  </q-uploader>
                </div>

              </q-card-section>


            </q-card>
            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
          </q-form>
        </div>



      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';
import { ref } from 'vue';
import { assist } from "src/boot/axios";
import axios from 'axios';//para dirigirme bro
import { useQuasar } from 'quasar';
const VDB = useVDBStore();
const $q = useQuasar();

const forms = ref(null);
const cajas = ref(null);
const cashiers = ref({
  val: null,
  opts: null
});
const motivos = ref(null);
const camret = ref(null);


// const index = async () => {
//   let host = VDB.session.store.ip;
//   let impr = `http://${host}/access/public/modify/getPrinter`;
//   axios.get(impr)
//     .then(done => {
//       impresoras.value.body = done.data
//       console.log("Impresoras listas :)")
//     })
//     .catch(fail => {
//       console.log(fail.response.data.message);
//     });
// }

const index = async () => {
  let idstore = VDB.session.store.id;
  console.log(idstore)
  assist.get(`/cashier/getStaff/${idstore}`)
    .then(e => {
      console.log(e.data);
      cashiers.value.opts = e.data
    })


  // axios.get(impr)
  //   .then(done => {
  //     impresoras.value.body = done.data
  //     console.log("Impresoras listas :)")
  //   })
  //   .catch(fail => {
  //     console.log(fail.response.data.message);
  //   });
}


index();


</script>

<style lang="scss">
.seeme {
  border: 2px solid green !important;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
</style>

