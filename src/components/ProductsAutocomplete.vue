<template>
  <div class="QuickRegular row items-center">
    <template v-if="data.read_barcode">
      <q-input ref="iptatc" :loading="data.iptsearch.processing" :disable="data.iptsearch.processing"
        v-model="data.target" dense filled color="blue-13" class="text-uppercase col" @keypress.enter="search"
        autocomplete="off" autofocus>
        <template v-slot:prepend>
          <q-btn dense flat :color="data.read_barcode ? 'light-blue-13' : 'blue-13'"
            :icon="data.read_barcode ? 'far fa-keyboard' : 'fas fa-barcode'" @click="switchMode()" />
        </template>
      </q-input>

    </template>

    <template v-else>
      <q-select dense filled color="blue-13" class="text-uppercase col" ref="iptatc" use-input hide-dropdown-icon
        option-value="id" option-label="id" hide-selected behavior="menu" v-model="data.target" :input-debounce="400"
        autofocus :options="data.options" :type="data.iptsearch.type" @filter="autocomplete"
        popup-content-class="bg-darkl1">
        <template v-slot:no-option>
          <q-item>
            <!-- <q-item-section avatar><q-img src="~/assets/chihuacry.png" width="50px" /></q-item-section> -->
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
          <!-- <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" > -->
          <q-item
          v-bind="scope.itemProps"
          @click="emite(scope.opt)"
           :disable="block(scope.opt.stateToVal)">
            <!-- <q-item-section avatar v-if="with_image">
              <q-img src="~/assets/_boxprod.png" width="35px" />
            </q-item-section> -->

            <q-item-section>
              <div class="row items-center justify-between no-wrap QuickRegular">
                <div class="col">
                  <div>{{ scope.opt.code }} <span class="text-grey-4 q-pl-md"> {{ scope.opt.name }}</span></div>
                  <div class="text--2 text-grey-5">{{ scope.opt.description }}</div>
                  <div class="text--3">{{ scope.opt.stateToVal.state.name }}</div>
                  <div class="text--3 text-amber-13" v-if="!scope.opt.stateToVal.own">Producto en conflicto con status
                  </div>
                  <!-- <div class="text--3">State branch: {{scope.opt.status}}</div>
                                  <div class="text--3">StateToVal: {{scope.opt.stateToVal}}</div>
                                  <div>{{block(scope.opt.stateToVal)}}</div> -->
                </div>

                <q-icon name="fas fa-circle" class="q-pl-md" :class="`bullet-${scope.opt.stateToVal.state.id}`"
                  size="10px" />
              </div>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </template>
  </div>
</template>


<script setup>
import dbproduct from 'src/API/Product'
import { ref, onMounted, computed } from 'vue'
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
  "with_prices_Invoice": { default: null, type: Boolean },
  "with_stock": { default: null, type: Boolean },
  "with_stock_cedis": { default: null, type: Number },
  "checkState": { default: true, type: Boolean },
  "workpointStatus": { default: null, type: [Array, String] },
  "withHistoric":{ default: null, type: Boolean },
  "wkpToVal": { default: null, type: Number },
  "blockStates": { type: Array, default: () => [4, 5, 6] }
})

const emit = defineEmits(['input', 'similarcodes','agregar']);

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
    "_category": props._category,
    "_status": props._status,
    "_location": props._location,
    "with_locations": props.with_locations,
    "with_stock": props.with_stock,
    "check_stock": props.check_stock,
    "with_prices": props.with_prices,
    "withHistoric": props.withHistoric,
    "_celler": props._celler,
    "limit": props.limit,
    "with_stock_cedis":props.with_stock_cedis,
    "_workpoint_status": props.workpointStatus,
    "_workpoint":$user.session.store.id_viz
  }
})
const block = computed(() => { return st => props.checkState ? props.blockStates.some(e => e == st.state.id) : false; })


onMounted(() => {
  data.value.read_barcode = JSON.parse(localStorage.getItem('barcodereader'));
  let keyboard = JSON.parse(localStorage.getItem('typeiptsearch'));

  if (keyboard) {
    data.value.iptsearch.type = keyboard.type;
    data.value.iptsearch.icon = keyboard.icon;
  }
})

const switchMode = () => {
  data.value.read_barcode = !data.value.read_barcode;
  data.value.target = '';
  localStorage.setItem('barcodereader', data.value.read_barcode);
}
const autocomplete = (val, update, abort) => {
  console.log(attrs.value)
  if (val.trim().length > 1) {
    data.value.target = val.toUpperCase().trim();
    console.log(data.value.target)
    console.log(attrs.value)
    dbproduct.autocomplete(attrs.value).then(done => {
      console.log(done);
      let options = done.data.map(p => {
        if (props.checkState) {
          if (props.wkpToVal) {
            let wkp = p.stocks.find(s => s._workpoint == props.wkpToVal);
            p.stateToVal = wkp ? { own: wkp, state: wkp.status } : { own: null, state: p.status };
          } else { p.stateToVal = { own: true, state: p.status }; }
        } else { p.stateToVal = { own: true, state: p.status }; }

        return p;
      });
      update(
        () => { data.value.options = options; },
        ref => {
          ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
          ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
        }
      );
    }).catch(fail => { console.log(fail); });
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
const selItem = (opt) => {
  data.value.target = '';
  emit('input', opt);
}
const similarCodes = (opts) => {
  data.value.target = '';
  emit('similarcodes', opts);
}
const search = () => {
  data.value.target.trim().toUpperCase();

  if (data.value.target.length) {
    data.value.iptsearch.processing = true;

    dbproduct.autocomplete(attrs.value).then(done => {
      console.log(attrs.value)
      let resp = done.data;

      switch (resp.length) {
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
          console.log(resp[0])
          selItem(resp[0]);
          break;

        // default:
        //   console.log(resp);
        //   similarCodes(resp);
        //   break;
      }
      data.value.target = "";
      data.value.iptsearch.processing = false;
    }).catch(fail => { console.log(fail); });
  }
}
const clear = () => { data.value.target = ""; }
const putFocus = () => {
  console.log("putFocus ejecutada!!");
  iptatc.value.focus();
}

defineExpose({ focus: () => iptatc.value?.focus?.() })

const emite = (a) => {
  emit('agregar',a)
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
