<template>
  <q-page padding>
    <div v-if="loading">
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </div>
    <div v-else>
      <q-table :rows="cash" grid hide-bottom :pagination="table.pagination" :columns="table.columns">
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card flat bordered>
              <q-card-section class="text-center">
                <div class="row">
                  <div class="col"></div>
                  <div class="text-bold col text-h5">Caja</div>
                  <div class="col">
                    <q-btn color="pink" icon="print" flat dense  v-if="props.row.corte?.movimientos.MOVIMIENTOS != 0" >
                      <q-menu>
                        <div style="min-width: 200px">
                          <q-select  v-model="printer" :options="$counter.printers" label="Impresora" filled dense
                            option-label="name">
                            <template v-slot:after>
                              <q-btn round dense flat icon="send" @click="imprimir(props.row)" />
                            </template>
                          </q-select>
                        </div>
                      </q-menu>
                    </q-btn>
                    <q-icon name="circle" :color="props.row.cashier ? 'positive' : 'negative'" />
                  </div>
                </div>
                <br>
                <strong>{{ props.row.name }}</strong>
                <q-space />
              </q-card-section>

              <div v-if="props.row.corte?.movimientos.MOVIMIENTOS > 0">
                <q-card-section class="flex flex-center" >
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label class="q-ml-lg text-center" text-caption>Ingresos</q-item-label>
                        <q-item-label class="q-ml-lg text-bold text-center">{{ money(props.row.corte?.INGRESOS)
                          }}</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="q-ml-lg text-center" text-caption>Retiradas</q-item-label>
                        <q-item-label class="q-ml-lg text-bold text-center">{{ money(props.row.corte?.RETIRADAS)
                          }}</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="q-ml-lg text-center" text-caption>SInicial</q-item-label>
                        <q-item-label class="q-ml-lg text-bold text-center">{{
                          money(parseFloat(props.row.corte?.SINATE)) }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
                <q-card-section>
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label class=" q-ml-lg text-center" text-caption>Ventas</q-item-label>
                        <q-item-label class="q-ml-lg text-bold text-center">{{ money(props.row.corte?.VENTASEFE)
                          }}</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="q-ml-lg text-center" text-caption>Descuadre</q-item-label>
                        <q-item-label class="q-ml-lg text-bold text-center"
                          :class="(props.row.corte?.RETIRADAS - (props.row.corte?.VENTASEFE + props.row.corte?.INGRESOS)) != 0 ? 'text-negative' : 'text-positive'">{{
                            money(props.row.corte?.RETIRADAS - (props.row.corte?.VENTASEFE + props.row.corte?.INGRESOS))
                          }}</q-item-label>
                      </q-item-section>
                      <q-item-section v-if="props.row.receipt == null">
                        <q-item-label class="q-ml-lg text-center" text-caption>Entregado</q-item-label>
                        <q-item-label class="q-ml-lg text-bold text-center cursor-pointer">
                          {{ props.row.receipt ? money(props.row.receipt.cash_receipt) : money(0) }}
                          <q-popup-edit v-if="props.row.receipt == null" v-model.number="modelReceipt"
                            :validate="receiptRangeValidation" @hide="receiptRangeValidation" v-slot="scope"
                            @save="(val) => updateReceipt(val, props.row)">
                            <q-input type="number" v-model.number="scope.value" hint="Ingresa la recepcion"
                              :error="errorReceipt" :error-message="errorMessageReceipt" dense autofocus
                              @keyup.enter="scope.set">
                              <template v-slot:after>
                                <q-btn flat dense color="negative" icon="cancel" @click.stop.prevent="scope.cancel" />
                                <q-btn flat dense color="positive" icon="check_circle" @click.stop.prevent="scope.set"
                                  :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                              </template></q-input>
                          </q-popup-edit>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
                <q-card-section v-if="props.row.receipt">
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <q-item-label class=" q-ml-lg text-center" text-caption>Enviado</q-item-label>
                        <q-item-label class="q-ml-lg text-bold text-center">{{ money(props.row.receipt.cash_send)
                          }}</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="q-ml-lg text-center" text-caption>Recibido</q-item-label>
                        <q-item-label class="q-ml-lg text-bold text-center">{{
                          money(props.row.receipt.cash_receipt)
                          }}</q-item-label>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="q-ml-lg text-center" text-caption>Diferencia</q-item-label>
                        <q-item-label class="q-ml-lg text-bold text-center"
                          :class="props.row.receipt.discrepancy != 0 ? 'text-negative' : 'text-positive'">
                          {{ money(props.row.receipt.discrepancy) }}

                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </div>
              <div v-else>
                <q-card-section class="text-center text-h6">
                  Caja Sin Movimientos
                </q-card-section>
              </div>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeMount } from "vue";
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { AppFullscreen, useQuasar } from "quasar";
import Chart from 'chart.js/auto';
import { debounce } from 'lodash'
import dayjs from "dayjs";
import ExcelJS from 'exceljs';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import UserToolbar from "src/components/UserToolbar.vue";
import ApiAssist from "src/API/assistApi";
import { useVDBStore } from "src/stores/VDB";
import { useCounterStore } from "src/stores/countingCash";
import axios from "axios"; //para dirigirme bro
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const $user = useVDBStore();
const $counter = useCounterStore();
const cash = ref([])
const store = computed(() => {
  return $counter.tabs.opts.find(e => e.id == $counter.tabs.val)
});
const loading = ref(false)
const table = ref({
  pagination: { rowsPerPages: 0 },
  columns: [
    // { name: 'terminal', label: 'Terminal', field: r => r._terminal },
    { name: 'name', label: 'Nombre', field: r => r.name },
    { name: 'Ingresos', label: 'Ingresos', field: r => r.corte?.INGRESOS },
    { name: 'Retiradas', label: 'Retiradas', field: r => r.corte?.RETIRADAS },
    { name: 'Ventas', label: 'VentasEfe', field: r => r.corte?.VENTASEFE },
    { name: 'Inicial', label: 'Saldo Inicial', field: r => parseFloat(r.corte?.SINATE) },
  ]
})
const printer = ref(null)
const modelReceipt = ref(0)
const errorReceipt = ref(false)
const errorMessageReceipt = ref('')

const getSale = async () => {
  if (!store.value) return;

  loading.value = true;

  cash.value = store.value.cashs || [];

  const resp = await ApiAssist.OpenBoxes(
    store.value.ip_address,
    { filt: $counter.date, cash: cash.value }
  );

  if (!resp.fail) {
    cash.value = resp;
  }

  loading.value = false;
};
const money = (value) =>
  '$' + (value || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })

const getSaleDebounced = debounce(getSale, 300)


const receiptRangeValidation = (val) => {
  if (val <= 0) {
    errorReceipt.value = true
    errorMessageReceipt.value = 'No puedes Validar en 0 '
    return false
  }
  errorReceipt.value = false
  errorMessageReceipt.value = ''
  return true
}

const imprimir = async (cash) => {
  console.log(store.value.ip_address)
  console.log(cash)
  console.log(printer.value)
  let data = {
    print: printer.value.ip_address,
    fecha: $counter.date,
    terminal: cash._terminal
  }
  console.log(data)
  $q.loading.show({ message: 'Obteniendo Registros' });
  // console.log(fechas.value);
  let host = store.value.ip_address;
  // let host = '192.168.10.160:1619'
  let url = `http://${host}/storetools/public/api/reports/printCut`;
  const resp = await axios.post(url, data);
  if (resp.status != 200) {
    console.log(resp);
  } else {
    console.log(resp.data)
    $q.loading.hide();
  }
}

const updateReceipt = async (val, row) => {
  $q.loading.show({ message: 'Guardando Registro' })
  let data = {
    "val": val,
    "cash": row
  };
  console.log(data);
  const resp = await ApiAssist.updateReceipt(data)
  console.log(resp)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide()
    row.receipt = resp
  }
}

watch(() => $counter.tabs.val, getSaleDebounced);
watch(() => $counter.date, getSaleDebounced);
watch(
  () => $counter.tabs.opts,
  () => {
    getSaleDebounced()
  }
);
</script>
