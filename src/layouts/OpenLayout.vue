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
          <q-form class="q-gutter-md" @submit="envi">
            <q-card class="my-card" square bordere>
              <q-card-section>
                <div class="text-h4 text-center">APERTURA DE CAJA</div>
                <div class="text-subtitle2 text-center">Movimientos en cajas despues de el corte</div>
              </q-card-section>
              <q-card-section>
                <q-select v-model="form.cash" :options="[1, 2, 3, 4, 5, 6, 7, 8, 9]" label="Caja" outlined dense />
              </q-card-section>
              <q-card-section>
                <q-select v-model="form._cashier" :options="cashiers.opts" label="Cajero" option-label="complete_name"
                  outlined dense />
              </q-card-section>
              <q-card-section>
                <q-select v-model="form._type" :options="types" label="Motivo"
                  outlined dense />
              </q-card-section>


              <div v-if="form._type.label == 'Descuadre'">
                <q-card-section>
                  <q-input v-model="form.unsquare" type="Number" label="Monto de descuadre" outlined dense />
                </q-card-section>
                <q-card-section>
                  <q-input v-model="form.mismatch_reason" type="text" label="Motivo de descuadre" outlined dense />
                </q-card-section>
              </div>


              <div v-if="form._type.label == 'Mal Devolucion'">
                <q-card-section>
                  <q-input v-model="form.ticket" type="text" label="Cual es el numero de ticket original" outlined dense />
                </q-card-section>
                <q-card-section>
                  <q-input v-model="form.refund_ticket" type="text" label="Cual es el numero de devolucion original" outlined dense />
                </q-card-section>
                <q-card-section>
                  <q-input v-model="form.refund_reason" type="text" label="Especifica por que se creara una devolucion nueva" outlined
                    dense />
                </q-card-section>
              </div>

              <div v-if="form._type.label == 'Retirada Mal'">
                <q-card-section>
                  <q-input v-model="form.withdrawal_number" type="Number" label="Numero de retirada" outlined dense />
                </q-card-section>
                <q-card-section>
                  <q-select v-model="form.movement_type_id" :options="movement" label="Que se la hara?" outlined dense />
                </q-card-section>
                <div v-if="form.movement_type_id.label == 'Modificar'">
                  <q-card-section>
                    <q-input v-model="form.withdrawal_mount" type="Number" label="Monto a modificar" outlined dense />
                  </q-card-section>
                </div>
                <q-card-section>
                  <q-input v-model="form.reason_modify" type="text" label="Especifica por que el cambio de la retirada" outlined
                    dense />
                </q-card-section>
              </div>



              <q-card-section>
                <div class="col flex justify-center">
                  <q-uploader :hide-upload-btn="true" ref="uploaderRef" :url="getUrl"  color="primary"
                     label="Corte Actual" @added="insertimage">
                  </q-uploader>
                </div>

              </q-card-section>


            </q-card>
            <div>
              <q-btn label="Enviar" type="submit" color="primary" class="full-width" :disable="validform"/>
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
import { computed, ref } from 'vue';
import { assist } from "src/boot/axios";
import axios from 'axios';//para dirigirme bro
import { useQuasar } from 'quasar';
const VDB = useVDBStore();
const $q = useQuasar();

const uploaderRef = ref(null);


const types = [
{id:1, label:'Descuadre'},
{id:2, label:'Mal Devolucion'},
{id:3, label:'Retirada Mal'},
]

const movement = [
{id:1, label:'Eliminar'},
{id:2, label:'Modificar'},
]
const cashiers = ref({
  val: null,
  opts: null
});

const form = ref({
  _store:null,
  cash:null,
  _created_by:null,
  _cashier:null,
  _type:{id:0, label:'Ninguno'},
  unsquare:null,//descuadre
  mismatch_reason:null,//motivodescuadre
  current_cut:null,//corte actual
  ticket:null,//ticket original
  refund_ticket:null,//ticket de devolucion original
  refund_reason:null,//rason de devolucion de el ticket
  withdrawal_number:null,//numero de retirada
  movement_type_id:{id:0, label:'Ninguno'},//tipo movimiento
  reason_modify:null,//razon de la modificacion o eliminacion
  withdrawal_mount:null//monto real de modificiacion
})

const validform = computed(() => {
   if(form.value._type.id == 1 && form.value.cash  && form.value._cashier && form.value.unsquare && form.value.mismatch_reason && form.value.current_cut){
    return false
  }else if(form.value._type.id == 2 && form.value.cash  && form.value._cashier && form.value.ticket && form.value.refund_reason && form.value.current_cut){
    return false
  }else if(form.value._type.id == 3 && form.value.cash  && form.value._cashier && form.value.current_cut && form.value.withdrawal_number && form.value.movement_type_id.id != 0 && form.value.reason_modify ){
    return false
  }else{
    return true
  }
})

const index = async () => {
  let idstore = VDB.session.store.id;

  console.log(idstore)
  assist.get(`/cashier/getStaff/${idstore}`)
    .then(e => {
      console.log(e.data);
      cashiers.value.opts = e.data
    })
}

const uploadFile = () => {
  uploaderRef.value.upload();
}


const envi = async() => {
  let cashierid = form.value._cashier.id;
  let type = form.value._type.id;
  let movement = form.value.movement_type_id.id != 0 ? form.value.movement_type_id.id : null;
  form.value.movement_type_id = movement;
  form.value._type = type;
  form.value._cashier = cashierid;
  form.value._store = VDB.session.store.id;
  form.value._created_by = VDB.session.id;
  let date = new Date();
  // console.log(date);
  const formattedDate = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  // console.log(formattedDate);
  let nombre = '/corte'+formattedDate+'_'+form.value._store+'_'+form.value._created_by+'.jpg';
  form.value.current_cut = nombre;
  uploadFile()
  console.log(form.value)
  assist.post('/cashier/Opening',form.value)
  .then(r => {
    console.log(r.data);
    $q.notify({
        type: 'positive',
        message: r.data,
        position: 'center'
      })
      form.value.cash=null
      form.value._cashier=null
      form.value._type={id:0, label:'Ninguno'}
      form.value.unsquare=null//descuadre
      form.value.mismatch_reason=null//motivodescuadre
      form.value.current_cut=null//corte actual
      form.value.ticket=null//ticket original
      form.value.refund_ticket=null//ticket de devolucion original
      form.value.refund_reason=null//rason de devolucion de el ticket
      form.value.withdrawal_number=null//numero de retirada
      form.value.movement_type_id={id:0, label:'Ninguno'}//tipo movimiento
      form.value.reason_modify=null//razon de la modificacion o eliminacion
      form.value.withdrawal_mount=null//monto real de modificiacion
  })
  .catch(e => {
    console.log(e.data)
    $q.notify({
        type: 'negative',
        message: e.data,
        position: 'center'
      })
  })
}

const insertimage = () => {
  form.value.current_cut = true;
}


const getUrl = (files) => {
  console.log(files)

  const formData = new FormData();
  formData.append('files', files[0]);

  let date = new Date();
  // console.log(date);
  const formattedDate = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
  // console.log(formattedDate);
  let nombre = 'corte'+formattedDate+'_'+form.value._store+'_'+form.value._created_by
  console.log(nombre);

  formData.append('__key', nombre +'.jpg');

  console.log(formData);

    axios.post('http://192.168.10.61:1619/Assist/public/api/cashier/AddFile', formData)

    .then(response => {
      console.log(response.data);
      uploaderRef.value.reset();
      $q.notify({
        type: 'positive',
        message: 'Imagen se subio con exito :' + response.data,
        position: 'center'
      })
    })
    .catch(error => {
      console.error('Error al subir archivos:', error);
      $q.notify({
        type: 'negative',
        message: '(I)Error al subir archivo:' + response.data,
        position: 'center'
      })
    });

  return 'http://192.168.10.61:1619/Assist/public/api/cashier/AddFile';

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

