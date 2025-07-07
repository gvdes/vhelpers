<template>
  <div class="q-pa-sm bg-grey-2 text-bold row justify-between items-center" style="min-width:250px;">
    <div>Impresion</div>
    <div class="row justify-between items-center" v-if="wkp">
      <q-btn-group flat>
        <q-btn flat color="positive" icon="add" dense/>
        <template v-if="printer">
          <q-btn flat color="negative" icon="delete" dense/>
          <q-btn flat color="orange" icon="edit" dense/>
        </template>
      </q-btn-group>
    </div>
  </div>
  <q-separator />

  <div class="q-mt-sm q-pa-sm">
    <q-select v-model="wkp" :options="storePrinters" label="Sucursal" filled option-label="alias" option-value="id" @update:model-value="printer=null"/>
  </div>

  <div class="q-pa-sm" v-if="wkp">
    <q-select v-model="printer" :options="wkp_printers" label="Impresora" filled option-value="id" option-label="name">
      <template v-slot:option="scope">
        <q-item clickable v-ripple v-bind="scope.itemProps">
          <q-item-section class="text-center" side>
            <q-icon color="primary" text-color="white" name="print" size="30px"/>
            <span class="text--3">ID:{{scope.opt.id}}</span>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{scope.opt.name}}</q-item-label>
            <q-item-label caption lines="2">{{scope.opt.ip}}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
  <div class="q-pa-sm text-right">
    <q-btn color="primary" icon="print" v-if="wkp&&printer && !partition" @click="selected"/>
    <q-btn color="secondary" icon="print" v-if="wkp&&printer && partition" @click="selectedPartition"/>

  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { useRestockStore } from 'stores/Restock';
  import { useQuasar } from 'quasar';

  const $q = useQuasar();
  const $restockStore = useRestockStore();
  const $emit = defineEmits(["selected","selectedPartition"]);
  const props = defineProps({
    partition:{type:Boolean}
  })

  const wkp = ref(null);
  const printer = ref(null);

  const storePrinters = computed(() => $restockStore.printers);
  const wkp_printers = computed(() => wkp.value ? wkp.value.printers:[]);

  const selected = () => {
    $q.localStorage.set("LUP",{ wkp:wkp.value, printer:printer.value });
    $emit("selected", printer.value);
  };

  const selectedPartition = () => {
    $q.localStorage.set("LUP",{ wkp:wkp.value, printer:printer.value });
    $emit("selectedPartition", printer.value);
  };


  const LUP = $q.localStorage.getItem("LUP");
  if(LUP){
    wkp.value = LUP.wkp;
    printer.value = LUP.printer;
  }
</script>
