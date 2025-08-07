<template>
  <q-card class="my-card" style="width: 700px; max-width: 80vw;">
    <div class="bg-primary row items-center justify-between q-pa-md text-white">
      <div>
        <div class="text-bold text-h4">Cobro Documento</div>
      </div>
      <div class="text-right">
        <div class="fs-dec3">Total Actual</div>
        <div class="fw-bold text-h4">$ {{ Number(total).toFixed(2) }}</div>
      </div>
    </div>
    <q-card-section>
      <div class="row text-center items-center">
        <div class="col"> Forma de pago: </div>
        <div class="col">
          <q-select class="col-3" v-model="modes.PFPA.id" :options="paymeths" option-value="id" option-label="name"
            dense filled label="Forma de pago" :option-disable="(val) => optionDisabled(val)">
          </q-select>
        </div>
      </div>
      <q-separator spaced inset vertical dark />
      <div class="row text-center items-center ">
        <div class="col"> {{ modes.PFPA.id?.id == 2 ? 'Efectivo' : 'Importe Cobrado' }}</div>
        <div class="col"> <q-input class="col" v-model="modes.PFPA.val" type="number" autofocus :min="0.00" step="any"
            dense input-class="q-pl-md fw-sbold fs-inc4 text-center" filled>
            <template v-slot:after>
              <q-btn color="primary" icon="backspace" flat dense round v-if="parseFloat(modes.PFPA.val)"
                @click="modes.PFPA.val = 0" />
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row flex justify-center ">
        <div class="col flex justify-center">
          <q-btn color="primary" label="2ª Forma de pago"
            @click="() => { pagos.dafpa = !pagos.dafpa; modes.SFPA.val = 0; modes.SFPA.id = null; }" outline rounded
            dense size="md" style="width: 70%;" />
        </div>
        <div class="col" v-if="pagos.dafpa">
          <q-select class="col-3" v-model="modes.SFPA.id" :options="paymeths" label="Forma Pago" option-value="id"
            option-label="name" dense filled :option-disable="(val) => optionDisable(val)">
          </q-select>
        </div>
      </div>
      <q-separator spaced inset vertical dark />
      <div class="row flex justify-center text-center" v-if="pagos.dafpa">
        <div class="col"> {{ modes.SFPA.id?.id == 2 ? 'Efectivo' : 'Importe Cobrado' }}</div>
        <div class="col"> <q-input class="col" v-model="modes.SFPA.val" type="number" autofocus :min="0.00" step="any"
            dense input-class="q-pl-md fw-sbold fs-inc4 text-center" filled>
            <template v-slot:after>
              <q-btn color="primary" icon="backspace" flat dense round v-if="parseFloat(modes.SFPA.val)"
                @click="modes.SFPA.val = 0" />
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row flex justify-center ">
        <div class="col flex justify-center">
          <q-btn color="primary" label="Cobrar Vale" @click="buscarvales" outline rounded dense size="md"
            style="width: 70%;" />
        </div>
        <div class="col" v-if="pagos.vales">
          <div class="row">
            <q-select class="col" v-model="modes.VALE" :options="valecli.opts" label="Vale"
              :option-label="r => (`Vale : ${r.id ? r.id.code : ''}`)" dense filled>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.id.code }}</q-item-label>
                    <q-item-label caption>$ {{ Number(scope.opt.val).toFixed(2) }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-separator spaced inset vertical dark />
            <q-input v-if="modes.VALE.id" v-model="modes.VALE.val" type="Number" label="Monto" disable filled dense />
          </div>

        </div>
      </div>
    </q-card-section>
    <q-card-section class="flex justify-end" v-if="superaTotalYNoEsEfe">
      <q-checkbox v-model="modes.conditions.createWithdrawal" label="Crear Retirada por la diferencia" />
    </q-card-section>
    <q-card-actions class="bg-deep-purple-3 row items-center justify-between q-pa-md text-black">
      <div>
        <div class="fs-dec3">Cambio</div>
        <div class="text-h5"> $ {{ cambio }}</div>
      </div>
      <div class="text-center" v-if="valpag">
        <q-btn color="primary" icon="payment" label="Pagar" @click="finallyTck" />
      </div>
    </q-card-actions>
  </q-card>

</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar, date } from 'quasar';
import { computed, defineProps, ref, onMounted, onBeforeUnmount } from 'vue';
const VDB = useVDBStore();
const $q = useQuasar();
const pagos = ref({
  dafpa: false,
  vales: false
})
// const createWithdrawal = ref(false)
const props = defineProps({
  total: { type: Number, default: 0.0 },
  paymeths: { type: Array, default: [] },
  client: { type: Number, default: 0 }
})

const emits = defineEmits(['sendTicket'])

const valecli = ref({
  opts: []
})
const modes = ref({ "PFPA": { id: props.paymeths[1], val: Math.round(props.total) }, "SFPA": { id: null, val: 0 }, "VALE": { id: null, val: 0 }, conditions: { createWithdrawal: false, super: null } });
const cambio = computed(() => (Number(Number.parseFloat(modes.value.SFPA.val) + Number.parseFloat(modes.value.PFPA.val)) + Number.parseFloat(modes.value.VALE.val) - Number.parseFloat(props.total)).toFixed(2))
const valpag = computed(() => cambio.value >= 0 && ((modes.value.PFPA.id?.id && modes.value.PFPA.val > 0) || (modes.value.SFPA.id?.id && modes.value.SFPA.val > 0) || (modes.value.VALE.id?.id && modes.value.VALE.val > 0)))

const superaTotalYNoEsEfe = computed(() => {
  const modesList = Object.values(modes.value)
  const hayEfectivo = modesList.some(mode => mode.id && mode.id.alias === 'EFE' && mode.val > 0)
  if (hayEfectivo) return false
  const tieneAliasDistintoDeEFE = modesList.some(mode => mode.id && mode.id.alias !== 'EFE')
  const sumaValores = modesList.reduce((sum, mode) => {
    return sum + Number(mode.val || 0)
  }, 0)
  return tieneAliasDistintoDeEFE && sumaValores > props.total
})

const optionDisabled = (val) => {
  if (val.id == modes.value.SFPA.id?.id) {
    return true
  }
  return false
}
const optionDisable = (val) => {
  if (val.id == modes.value.PFPA.id?.id) {
    return true
  }
  return false
}
const buscarvales = async () => {
  $q.loading.show({ message: 'Buscando Vales' })

  console.log("Buscando vales");
  // let host = VDB.session.store.ip_address;
  let host = '192.168.10.160:1619';

  let impr = `http://${host}/access/public/modify/vales?price=${props.client}`;
  axios.get(impr)
    .then(done => {
      console.log(done.data)
      $q.loading.hide();
      let vales = done.data.map(r => { return { id: { id: 5, alias: '[V]', name: 'VALE', code: r.CODANT }, val: Number(r.IMPANT) } })
      valecli.value.opts = vales
      pagos.value.vales = true
    })
    .catch(fail => {
      console.log(fail.response.data);
      $q.notify({
        html: true,
        message: fail.response.data,
        color: "negative",
        position: "bottom"
      });
      $q.loading.hide();
    });
}

const handleKeydown = (e) => {
  if (e.key === 'Enter' && valpag.value) {
    e.preventDefault();
    finallyTck();
  }
}

const finallyTck = () => {
  // console.log(modes.value)
  modes.value.conditions.super = superaTotalYNoEsEfe.value
  modes.value.change = cambio.value
  emits('sendTicket', modes.value)
  valecli.value = ref({
    opts: []
  })
  modes.value = { "PFPA": { id: null, val: 0 }, "SFPA": { id: null, val: 0 }, "VALE": { id: null, val: 0 } };
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
})

</script>
