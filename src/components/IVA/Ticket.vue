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
      <q-item >
        <q-item-section>Impresora</q-item-section>
        <q-item-section>
          <q-select dense v-model="impresoras.val" :options="impresoras.body" label="Impresora" option-label="name" filled autofocus/>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item >
        <q-item-section>Monto</q-item-section>
        <q-item-section>
            <q-input dense v-model="monto" type="number" label="Monto" filled autofocus error-message="El Monto a facturar es mayor que el total de el ticket :x" :error="mayor" />
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item class="bg-deep-purple-1" v-if="impresoras.val && !mayor">
        <q-item-section>IVA</q-item-section>
        <q-item-section>
          <q-select dense v-model="iva" :options="ivas" label="Seleccione" filled autofocus/>
        </q-item-section>
      </q-item>

      <q-item class="bg-deep-purple-1" v-if="inc && !mayor">
        <q-item-section>Total</q-item-section>
        <q-item-section>
          <q-item-label class="fc-bluegrey  text-h4 fw-sbold">$ {{ inc }}</q-item-label>
          <q-item-label caption>$ {{ (parseFloat(ticket.total)+parseFloat(inc)).toFixed(2) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-card-actions v-if="iva && !mayor" align="between">
      <q-btn color="primary" label="Cancelar" flat no-caps/>
      <q-btn color="primary" label="Cobrar" @click="openCashDesk"/>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, computed, onUnmounted, onDeactivated } from 'vue';
import { useVDBStore } from 'stores/VDB';
import { assist } from "src/boot/axios";

  const $props = defineProps({
    data:{ type:Object, default:null }
  });
  const VDB = useVDBStore();

  const $emit = defineEmits([ 'openCashDesk' ]);

  const ticket = ref($props.data);
  const iva = ref(null);
  const ivas = [ "6%", "8%", "16%" ];
  const incops = { "6%":.06, "8%":.08, "16%":.16 };
  const impresoras = ref({
    body:null,
    val:null
  })
  const monto = ref($props.data.total)

  const inc = computed(() => {
    if(iva.value && ticket.value){

        let _inc = incops[iva.value];
        let _total = parseFloat(monto.value).toFixed(2);
        return parseFloat((_total*_inc).toFixed(2));
    } return 0;
  });

  const mayor = computed(() => {
    if(monto.value > $props.data.total){
      return true
    }else{
      return false
    }
  })

  const openCashDesk = () => {
    $emit('openCashDesk', { _inc:inc.value, _iva:incops[iva.value], impresora:impresoras.value.val.ip_address, _monto:monto.value });
    console.log(monto.value);
  }

  onUnmounted(() => {
    console.log("El componente ha muerto!!");
  });

  const impre = async () => {
  let idstore = VDB.session.store.id;
  console.log(idstore)
  // console.log(host);
  // let impr = `http://${host}/access/public/modify/getPrinter`;
  try {
    let resp = await assist.get(`/cashier/getPrinters/${idstore}`)
    if (resp.status == 200) {
      impresoras.value.body = resp.data
      console.log("Impresoras listas :)")
    }

  } catch (err) {
    console.log(err);
    $q.notify({
      message: 'No se pudiron obtener las impresoras',
      type: 'negative',
      position: 'center',
      icon: 'error'
    })
  }
}
impre()

</script>
