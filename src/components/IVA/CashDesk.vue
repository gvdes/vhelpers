<template>
  <q-card v-if="ticket">
    <div class="bg-primary row items-center justify-between q-pa-md text-white">
      <div>
        <div class="fs-dec3">TICKET</div>
        <div class="text-h4">{{ ticket.ticket }}</div>
      </div>
      <div class="text-right">
        <div class="fs-dec3">IVA</div>
        <div class="fw-bold text-h4">$ {{ inc }}</div>
      </div>
    </div>

    <q-form class="q-pa-none" @submit="pay">
      <q-card-section>
        <div class="row items-center">
          <div class="col-3">Efectivo</div>
          <q-input class="col" v-model="modes.EFE" type="number" autofocus :min="0.00" step="any" dense input-class="q-pl-md fw-sbold fs-inc4"/>
          <q-btn color="primary" icon="backspace" flat dense round v-if="parseFloat(modes.EFE)" @click="modes.EFE=0" />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <q-select class="col-3" v-model="modes.DIG.id" :options="paymeths" label="Terminal" option-value="id" emit-value option-label="id" dense>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label class="text-bold">{{ scope.opt.id }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.desc }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input class="col" v-model="modes.DIG.val" type="number" :min="0.00" step="any" dense input-class="q-pl-md fw-sbold fs-inc4"/>
          <q-btn color="primary" icon="backspace" flat dense round v-if="parseFloat(modes.DIG.val)" @click="modes.DIG.val=0; modes.DIG.id=null"/>
        </div>
      </q-card-section>

      <q-separator />

      <div class="bg-grey-2 row items-stretch justify-between q-pa-sm">
        <div>
          <template v-if="totalPayment>=inc">
            <div class="fs-dec1">Cambio:</div>
            <div class="text-h5 fw-sbold fc-primary">$ {{ (totalPayment-inc).toFixed(2) }}</div>
          </template>
          <template v-else>
            <div class="fs-dec1">Falta:</div>
            <div class="text-h6 fs-inc3 fw-bold fc-negative">$ {{ (inc - totalPayment).toFixed(2) }}</div>
          </template>
        </div>
        <div><q-btn color="positive" icon="fas fa-dollar-sign" label="Pagar" v-if="totalPayment>=inc" type="submit" class="full-height" /></div>
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue';

  const paymeths = [
    { id:"TBA", desc:"Tarjeta Credito/Debito BBVA (Bancomer)" },
    { id:"TDB", desc:"Transferencia/Deposito BBVA (Bancomer)" },
    { id:"TSA", desc:"Tarjeta Credito/Debito Santander" },
    { id:"TDA", desc:"Transferencia/Deposito Santander" },
    // { id:"TSC", desc:"Tarjeta Credito/Debito Scotiabank" },
    // { id:"TDS", desc:"Transferencia/Deposito Scotiabank" },
  ];

  const $props = defineProps({
    data:{ type:Object, default:null },
    inc:{ type:Number, default:0.00 }
  });

  const $emit = defineEmits([ 'pay' ]);

  const modes = ref({ "EFE":0, "DIG":{ id:null, val:0 } });
  const ticket = ref($props.data);
  const inc = ref($props.inc);

  const totalPayment = computed(() => (parseFloat(modes.value.EFE)+parseFloat(modes.value.DIG.val)).toFixed(2) );

  const pay = () => {
    $emit('pay', modes.value);
  }
</script>
