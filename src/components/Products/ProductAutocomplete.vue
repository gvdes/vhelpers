<template>
  <div class="QuickRegular row items-center text-black">
    <q-select v-model="types.val" class="flex items-center justify-center" options-dense :options="types.opts" filled
      style="width: 60px;" hide-dropdown-icon @update:model-value="changeMod">
      <template v-slot:selected>
        <q-avatar v-if="types.val" size="xl" text-color="primary" class="text-left flex items-left justify-left"
          :icon="types.val.icon" />
        <q-badge v-else>*no hay :{*</q-badge>
      </template>
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps" class="flex items-center justify-center">
          <q-item-section avatar class="text-center">
            <q-icon :name="scope.opt.icon" />
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <div class="col">
      <div v-if="types.val.id == 1">
        <q-select v-model="data.buscar" hide-selected behavior="menu" :options="data.options" filled hide-dropdown-icon
          use-input class="text-uppercase" input-class="text-h6 text-bold" @filter="autoComplete" :input-debounce="400"
          autofocus>
          <template v-slot:prepend>
            <q-btn size="md" flat padding="none" @click="toogleIptSearch" :icon="data.iptsearch.icon" color="grey-6" />
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps"   @click="selItem(scope.opt)">
              <q-item-section>
                <div class="row items-center justify-between no-wrap QuickRegular">
                  <div class="col">
                    <div>{{ scope.opt.code }} <span class="text-grey-4 q-pl-md"> {{ scope.opt.name }}</span></div>
                    <div class="text--2 text-grey-5">{{ scope.opt.description }}</div>
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>


      <div v-if="types.val.id == 2">
        <q-form @submit="exactSearch" class="q-gutter-md">
          <q-input v-model="data.buscar" type="text" filled class="text-uppercase" input-class="text-h6 text-bold"
            autofocus />
        </q-form>

      </div>

      <div v-if="types.val.id == 3" class="flex flex-center q-pa-md">
        <q-card class="camera-card">
          <q-card-section class="flex flex-center">
            <div id="reader" class="qr-reader"></div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import dbproduct from 'src/API/productsApi'
import { ref, onMounted, computed, nextTick } from 'vue'
import { exportFile, useQuasar } from 'quasar';
import { useVDBStore } from 'src/stores/VDB';
import { Html5Qrcode } from 'html5-qrcode';
const $q = useQuasar();
const $user = useVDBStore();


const props = defineProps({
  "limit": { default: 30, type: Number }, //cantidad por devolver
  // "_category": { default: null, type: Boolean }, //retornar categorias
  // "_status": { default: null, type: Boolean }, //retorar status
  // "_location": { default: null, type: Boolean },//retornar Ubicaciones // aqui se tiene que poner la de el rooll si es vendedor, solo mandar los de exhibicion si es almacenista poner solo almacen si es mas alto poner los dos//
  // "_celler": { default: null, type: Boolean },//
  // "check_stock": { default: null, type: Boolean },//
  "with_locations": { default: null, type: Boolean },//
  "with_image": { default: null, type: Boolean },//
  "with_prices": { default: null, type: Boolean },//
  "with_prices_Invoice": { default: null, type: Boolean },//
  "with_stock": { default: null, type: Boolean },//
  // "checkState": { default: true, type: Boolean },//
  // "workpointStatus": { default: null, type: [Array, String] },//
  // "wkpToVal": { default: null, type: Number },//
  // "blockStates": { type: Array, default: () => [4, 5, 6] }//
})

const emit = defineEmits(['input', 'similarcodes', 'agregar']);
let html5QrCode = null;
const cameraActive = ref(false);
const scanning  = ref(false)
const types = ref({
  val: { id: 1, label: 'Autocomplete', icon: 'keyboard' },
  opts: [
    { id: 1, label: 'Autocomplete', icon: 'keyboard' },
    { id: 2, label: 'barcode', icon: 'fas fa-barcode' },
    { id: 3, label: 'qr_code', icon: 'qr_code' },
  ]
})


const data = ref({
  buscar: "",
  iptsearch: { processing: false, type: "number", icon: 'fas fa-font' },
  options: undefined,
  read_barcode: true
})

const attrs = computed(() => {
  return {
    "search": data.value.buscar,
    // "_category": props._category,
    // "_status": props._status,
    // "_location": props._location,
    "with_locations": props.with_locations,
    "with_stock": props.with_stock,
    // "check_stock": props.check_stock,
    "with_prices": props.with_prices,
    // "withHistoric": props.withHistoric,
    // "_celler": props._celler,
    "limit": props.limit,
    // "_workpoint_status": props.workpointStatus,
    "_workpoint": $user.session.store.id_viz,
    "rol": $user.session.credentials.rol
  }
})

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
}

const autoComplete = async (val, update, abort) => {
  let search = val.trim().toUpperCase()
  if (search.length >= 3) {
    data.value.buscar = search
    console.log(attrs.value);
    const resp = await dbproduct.autoCompleteProduct(attrs.value)
    if (resp.fail) {
      console.log(resp)
    } else {
      console.log(resp);
      let options = resp;
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

const exactSearch = async () => {
  data.value.buscar.trim().toUpperCase();
  if (data.value.buscar.length) {
    const resp = await dbproduct.exactSearch(attrs.value)
    if (resp.fail) {
      console.log(resp);
    } else {
      console.log(resp);
      selItem(resp)
    }
  }
}

// const startCamera = async () => {
//   if (html5QrCode) {
//     console.log("La cámara ya está activa");
//     return;
//   }
//   cameraActive.value = true;
//   nextTick(() => {
//     html5QrCode = new Html5Qrcode("reader");
//     const config = {
//       fps: 20, qrbox: viewfinderWidth => {
//         const minEdgePercentage = 0.8; // 80% del ancho visible
//         const edgeSize = Math.floor(viewfinderWidth * minEdgePercentage);
//         return { width: edgeSize, height: edgeSize };
//       }
//     };

//     html5QrCode.start(
//       { facingMode: "environment" },
//       config,
//       async (decodedText) => {
//         try {
//           const qrdata = JSON.parse(decodedText);
//           console.log(qrdata);
//           if (qrdata.modelo) {
//             data.value.buscar = qrdata.modelo;
//             const resp = await dbproduct.scanSearch(attrs.value);
//             if (resp.fail) {
//               console.log(resp);
//             } else {
//               console.log(resp);
//               selItem(resp)
//             }

//           }
//         } catch (e) {
//           console.log("QR inválido: " + decodedText);
//         }
//       }
//     ).catch(err => console.log("Error al iniciar cámara: " + err.message));
//     console.log("Cámara iniciada");
//   });
// };

const startCamera = async () => {
  if (html5QrCode) {
    console.log("La cámara ya está activa");
    return;
  }
  cameraActive.value = true;

  nextTick(() => {
    html5QrCode = new Html5Qrcode("reader");

    const config = {
      fps: 20,
      qrbox: viewfinderWidth => {
        const minEdgePercentage = 0.8;
        const edgeSize = Math.floor(viewfinderWidth * minEdgePercentage);
        return { width: edgeSize, height: edgeSize };
      }
    };

    html5QrCode.start(
      { facingMode: "environment" },
      config,
      async (decodedText) => {
        if (scanning.value) return;
        scanning.value = true;

        try {
          const qrdata = JSON.parse(decodedText);
          console.log(qrdata);

          if (qrdata.modelo) {
            data.value.buscar = qrdata.modelo;
            const resp = await dbproduct.scanSearch(attrs.value);

            if (resp.fail) {
              console.log(resp);
            } else {
              console.log(resp);
              selItem(resp);
              // emit('item-scanned', resp);
            }
          }
        } catch (e) {
          console.log("QR inválido: " + decodedText);
        } finally {
          scanning.value = false;
        }
      }
    ).catch(err => console.log("Error al iniciar cámara: " + err.message));

    console.log("Cámara iniciada");
  });
};
const stopCamera = () => {
  if (!html5QrCode) {
    console.log("La cámara no estaba activa");
    return;
  }
  html5QrCode.stop().then(() => {
    html5QrCode.clear();
    html5QrCode = null;
    cameraActive.value = false;
    console.log("Cámara detenida");
  }).catch(err => console.log("Error al detener cámara: " + err.message));
};

const selItem = (opt) => {
  data.value.buscar = '';
  emit('input', opt);
}

const changeMod = (a, b) => {
  if (a.id == 3) {
    startCamera();
  } else {
    stopCamera();
  }
}

</script>

<style>
.camera-card {
  width: 410px;
  max-width: 90%;
  /* border-radius: 1rem; */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.qr-reader {
  width: 500px !important;
  height: 90px !important;
  /* border-radius: 1rem; */
  overflow: hidden;
  /* box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2); */
}
</style>
