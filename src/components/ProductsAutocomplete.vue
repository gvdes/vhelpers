<template>
  <div class="QuickRegular row items-center">
    <!-- Busqueda Por Codigo de Barras -->
    <template v-if="data.read_barcode">
      <q-input ref="iptatc" :loading="data.iptsearch.processing" :disable="data.iptsearch.processing"
        v-model="data.target" dense filled color="blue-13" class="text-uppercase col" @keypress.enter="search"
        autocomplete="off" autofocus placeholder="Codigo Barras">
        <template v-slot:prepend>
          <q-btn dense flat :color="data.read_barcode ? 'light-blue-13' : 'blue-13'"
            :icon="data.read_barcode ? 'far fa-keyboard' : 'fas fa-barcode'" @click="switchMode()" />
          <q-btn dense flat icon="camera" @click="openScanner" />
        </template>
      </q-input>
    </template>
    <template v-else-if="!data.read_barcode">
      <!-- Busqueda por autocompletado -->
      <q-select dense filled color="blue-13" class="text-uppercase col" ref="iptatc" use-input hide-dropdown-icon
        option-value="id" option-label="id" hide-selected behavior="menu" v-model="data.target" :input-debounce="400"
        autofocus :options="data.options" :type="data.iptsearch.type" @filter="autocomplete"
        popup-content-class="bg-darkl1" :placeholder="data.iptsearch.type == 'text' ? 'Codigo Largo' : 'Codigo Corto'">
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey QuickRegular">Nada por aqui...</q-item-section>
          </q-item>
        </template>
        <template v-slot:prepend>
          <q-btn dense flat :color="data.read_barcode ? 'light-blue-13' : 'blue-13'"
            :icon="data.read_barcode ? 'far fa-keyboard' : 'fas fa-barcode'" @click="switchMode()" />
          <q-btn type="button" dense size="sm" flat @click="toogleIptSearch" :icon="data.iptsearch.icon"
            color="grey-6" />
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" @click="emite(scope.opt)" :disable="block(scope.opt.stateToVal)">
            <q-item-section>
              <div class="row items-center justify-between no-wrap QuickRegular">
                <div class="col">
                  <div>{{ scope.opt.code }} <span class="text-grey-4 q-pl-md"> {{ scope.opt.short_code }}</span></div>
                  <div class="text--2 text-grey-5">{{ scope.opt.description }}</div>
                  <div class="text--3">{{ scope.opt.stateToVal.name }}</div>
                </div>
                <q-icon name="fas fa-circle" class="q-pl-md" :class="`bullet-${scope.opt.stateToVal.id + 1}`"
                  size="10px" />
              </div>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </template>
    <q-dialog v-model="scanner.open" persistent>
      <q-card style="width: 90%; ">
        <q-card-section class="row items-center justify-between">
          <q-btn flat dense icon="close" @click="closeScanner" />
        </q-card-section>
        <q-card-section>
          <div id="qr-reader" style="width:100%"></div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import dbproduct from 'src/API/Product'
import { ref, onMounted, computed, onUnmounted, nextTick } from 'vue'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode"
import { exportFile, useQuasar } from 'quasar';
import { useVDBStore } from 'src/stores/VDB';
const $q = useQuasar();
const $user = useVDBStore();

const props = defineProps({
  "limit": { default: 30, type: Number },
  "_category": { default: null, type: Boolean },
  "_status": { default: null, type: Boolean },
  "_location": { default: null, type: Boolean },
  "_celler": { default: null, type: Boolean },
  "check_stock": { default: null, type: Boolean },
  "with_locations": { default: null, type: Boolean },
  "with_image": { default: null, type: Boolean },
  "with_prices": { default: null, type: Boolean },
  "with_prices_label": { default: null, type: Boolean },
  "with_prices_Invoice": { default: null, type: Boolean },
  "with_stock": { default: null, type: Boolean },
  "with_stock_cedis": { default: null, type: Number },
  "checkState": { default: true, type: Boolean },
  "workpointStatus": { default: null, type: [Array, String] },
  "withHistoric": { default: null, type: Boolean },
  "wkpToVal": { default: null, type: Number },
  "with_locations_loc": { default: null, type: Number },
  "blockStates": { type: Array, default: () => [4, 5, 6] }
})

const emit = defineEmits(['input', 'similarcodes', 'agregar']);
const scanner = ref({
  open: false,
  instance: null
})
const data = ref({
  target: "",
  iptsearch: { processing: false, type: "number", icon: 'fas fa-font' },
  options: undefined,
  read_barcode: true
})
const iptatc = ref(null)
const attrs = computed(() => {
  return {
    "autocomplete": !data.value.read_barcode,
    "target": data.value.target,
    "_category": props._category,
    "_status": props._status,
    "_location": props._location,
    "with_locations": props.with_locations,
    "with_locations_loc": props.with_locations_loc,
    "with_stock": props.with_stock,
    "check_stock": props.check_stock,
    "with_prices_label": props.with_prices_label,
    "with_prices": props.with_prices,
    "with_prices_Invoice":props.with_prices_Invoice,
    "withHistoric": props.withHistoric,
    "_celler": props._celler,
    "limit": props.limit,
    "with_stock_cedis": props.with_stock_cedis,
    "_workpoint_status": props.workpointStatus,
    "_workpoint": $user.session.store.id_viz
  }
})
const block = computed(() => { return st => props.checkState ? props.blockStates.some(e => e == st) && ![1, 2, 5, 6, 12, 18, 19, 21, 22, 24].includes($user.session.credentials._rol) : false; })



const switchMode = () => {
  data.value.read_barcode = !data.value.read_barcode;
  data.value.target = '';
  localStorage.setItem('barcodereader', data.value.read_barcode);
}


const autocomplete = async (val, update, abort) => {//autocompletado
  console.log(attrs.value)
  if (val.trim().length > 1) {
    data.value.target = val.toUpperCase().trim();
    const resp = await dbproduct.autocomplete(attrs.value);
    if (resp.fail) {
      console.log(resp);
    } else {
      console.log(resp);
      let options = resp.map(p => {
        // console.log(p)
        if (props.checkState) {
          if (props.wkpToVal) {
            const stock = p.stocks?.find(s => s.id == props.wkpToVal)
            p.stateToVal = stock?.pivot?.state_data ?? p.state
          } else { p.stateToVal = p.state; }
        } else { p.stateToVal = p.state; }
        return p;
      });
      update(
        () => { data.value.options = options; },
        ref => {
          ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
          ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
        }
      );

    }
  }
}
const toogleIptSearch = () => {
  switch (data.value.iptsearch.type) {
    case "text":
      data.value.iptsearch.type = "number";
      data.value.iptsearch.icon = "fas fa-font";
      break;
    case "number":
      data.value.iptsearch.type = "text";
      data.value.iptsearch.icon = "fas fa-hashtag";
      break;
  }
  localStorage.setItem('typeiptsearch', JSON.stringify(data.value.iptsearch));
}

const similarCodes = (opts) => {
  data.value.target = '';
  emit('similarcodes', opts);
}
const search = async () => {//busqueda exacta
  data.value.target.trim().toUpperCase();
  if (data.value.target.length) {
    data.value.iptsearch.processing = true;
    console.log(attrs.value)
    const resp = await dbproduct.autocomplete(attrs.value);
    if (resp.fail) {
      console.log(resp);
    } else {
      console.log(resp)
      if (resp.id) {
        selItem(resp);
        putFocus();
      } else {
        $q.notify({ message: 'No existe el producto', type: 'negative', position: 'top' })
      }
      data.value.target = "";
      data.value.iptsearch.processing = false;

    }
  }
}

const clear = () => { data.value.target = ""; }
const putFocus = () => {
  console.log("putFocus ejecutada!!");
  iptatc.value.focus();
}

defineExpose({ focus: () => iptatc.value?.focus?.() })

const emite = (a) => {
  emit('agregar', a)
}
const selItem = (opt) => {
  data.value.target = '';
  emit('agregar', opt);
}

const openScanner = async () => {
  scanner.value.open = true
  await nextTick()
  scanner.value.instance = new Html5Qrcode("qr-reader")
  try {
    await scanner.value.instance.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 180,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E
        ]
      },
      (decodedText) => {
        const text = JSON.parse(decodedText)
        navigator.vibrate?.(100)
        let code = null
        if (text.modelo) {
          code = text.modelo
        } else {
          code = text
        }
        data.value.target = JSON.stringify(code)
        console.log(data.value.target)
        closeScanner()
        search()
      },
      () => { }
    )
  } catch (err) {
    console.error(err)
    $q.notify({
      message: "No se pudo abrir la cámara",
      color: "negative"
    })
  }
}
const closeScanner = async () => {
  if (scanner.value.instance) {
    await scanner.value.instance.stop()
    await scanner.value.instance.clear()
    scanner.value.instance = null
  }
  scanner.value.open = false
}
onUnmounted(() => {
  closeScanner()
})

onMounted(() => {
  data.value.read_barcode = JSON.parse(localStorage.getItem('barcodereader'));
  let keyboard = JSON.parse(localStorage.getItem('typeiptsearch'));
  if (keyboard) {
    data.value.iptsearch.type = keyboard.type;
    data.value.iptsearch.icon = keyboard.icon;
  }
})


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
