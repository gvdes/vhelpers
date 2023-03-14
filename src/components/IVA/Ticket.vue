<template>
  <q-card style="min-width: 400px;" flat bordered>
    <q-list bordered>
      <q-item>
        <q-item-section>Ticket</q-item-section>
        <q-item-section>{{ ticket.ticket }}</q-item-section>
      </q-item>

      <q-item>
        <q-item-section>Cliente</q-item-section>
        <q-item-section>{{ ticket.cliente }}</q-item-section>
      </q-item>

      <q-item>
        <q-item-section>Fecha</q-item-section>
        <q-item-section>{{ ticket.fecha }}</q-item-section>
      </q-item>

      <q-item>
        <q-item-section>Total</q-item-section>
        <q-item-section>$ {{ ticket.total }}</q-item-section>
      </q-item>
      <q-separator />
      <q-item class="bg-deep-purple-1">
        <q-item-section>IVA</q-item-section>
        <q-item-section>
          <q-select dense v-model="iva" :options="ivas" label="Seleccione" filled autofocus/>
        </q-item-section>
      </q-item>

      <q-item class="bg-deep-purple-1" v-if="inc">
        <q-item-section>Total</q-item-section>
        <q-item-section>
          <q-item-label class="fc-bluegrey  text-h4 fw-sbold">$ {{ inc }}</q-item-label>
          <q-item-label caption>$ {{ (parseFloat(ticket.total)+parseFloat(inc)).toFixed(2) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-card-actions v-if="iva" align="between">
      <q-btn color="primary" label="Cancelar" flat no-caps/>
      <q-btn color="primary" label="Cobrar" @click="openCashDesk"/>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, computed, onUnmounted, onDeactivated } from 'vue';

  const $props = defineProps({
    data:{ type:Object, default:null }
  });

  const $emit = defineEmits([ 'openCashDesk' ]);

  const ticket = ref($props.data);
  const iva = ref(null);
  const ivas = [ "6%", "8%", "16%" ];
  const incops = { "6%":.06, "8%":.08, "16%":.16 };

  const inc = computed(() => {
    if(iva.value && ticket.value){

        let _inc = incops[iva.value];
        let _total = parseFloat(ticket.value.total).toFixed(2);

        return parseFloat((_total*_inc).toFixed(2));
    } return 0;
  });

  const openCashDesk = () => {
    $emit('openCashDesk', { _inc:inc.value, _iva:iva.value });
  }

  onUnmounted(() => {
    console.log("El componente ha muerto!!");
  });

</script>
