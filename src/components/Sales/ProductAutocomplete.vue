<template>
  <div class="QuickRegular row items-center">
      <q-input ref="iptatc" :loading="data.iptsearch.processing" :disable="data.iptsearch.processing"
        v-model="data.target" dense filled color="blue-13" class="text-uppercase col" @keypress.enter="search"
        autocomplete="off" autofocus label="Codigo...">
      </q-input>
  </div>
</template>


<script setup>
import dbproduct from 'src/API/productsApi'
import { ref, onMounted, computed } from 'vue'
import { exportFile, useQuasar } from 'quasar';
import { useVDBStore } from 'src/stores/VDB';
const $q = useQuasar();
const $user = useVDBStore();

const props = defineProps({
  "limit": { default: 30, type: Number },
  "_category": { default: null, type: Boolean },
  "_status": { default: null, type: Boolean },
  "with_prices": { default: null, type: Boolean },
  "checkState": { default: true, type: Boolean },
  "workpointStatus": { default: null, type: [Array, String] },
})

const emit = defineEmits(['input', 'similarcodes', 'agregar']);

const data = ref({
  target: "",
  iptsearch: { processing: false, type: "number", icon: 'fas fa-font' },
  options: undefined,
  read_barcode: true
})
const iptatc = ref(null)
const attrs = computed(() => {
  return {
    "autocomplete": data.value.target,
    "limit": props.limit,
    "_workpoint": $user.session.store.id_viz,
    "strict": data.value.read_barcode,
  }
})
onMounted(() => {
  data.value.read_barcode = JSON.parse(localStorage.getItem('barcodereader'));
  let keyboard = JSON.parse(localStorage.getItem('typeiptsearch'));

  if (keyboard) {
    data.value.iptsearch.type = keyboard.type;
    data.value.iptsearch.icon = keyboard.icon;
  }
})

const selItem = (opt) => {
  data.value.target = '';
  emit('input', opt);
}
const search = () => {
  data.value.target.trim().toUpperCase();
  if (data.value.target.length) {
    data.value.iptsearch.processing = true;
    console.log(attrs.value)
    dbproduct.autocomplete(attrs.value).then(done => {
      let resp = done.data;
      switch (Object.keys(resp).length) {
        case 0:
          let code = data.value.target;
          $q.notify({
            message: `Sin resultados para <b>${code}</b>`,
            color: 'negative',
            icon: 'fas fa-times',
            html: true,
            timeout: 1000,
            position: 'center'
          });
          putFocus();
          break;

        default:
          console.log("Perfecto, aqui esta tu producto");
          console.log(resp)
          selItem(resp);
          break;
      }
      data.value.target = "";
      data.value.iptsearch.processing = false;
    }).catch(fail => { console.log(fail); });
  }
}


const putFocus = () => {
  console.log("putFocus ejecutada!!");
  iptatc.value.focus();
}

defineExpose({ focus: () => iptatc.value?.focus?.() })

const emite = (a) => {
  // console.log('Opción seleccionada:', a);
  // data.value.target = a.id;       // asigna el valor al v-model
  // iptatc.value.hidePopup?.();
  emit('agregar', a)
}
</script>

<style lang="scss" scoped>
.bullet-1 {
  color: #2ed573;
}

// Disponible
.bullet-2 {
  color: #1e90ff;
}

// Reservado
.bullet-3 {
  color: #ffa502;
}

// Agotado
.bullet-4 {
  color: #ff4757;
}

// Bloqueado
.bullet-5 {
  color: #57606f;
}

// Descatalogado</style>
`
