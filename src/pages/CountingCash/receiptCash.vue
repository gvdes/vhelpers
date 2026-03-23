<template>
  <q-page padding>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <q-table v-if="!loading" :rows="cash" grid hide-bottom :pagination="table.pagination" :columns="table.columns">
      <template v-slot:item="props">
        <div class="q-pa-sm col-xs-12 col-sm-6 col-md-4">
          <q-card class="q-pa-sm shadow-2 rounded-borders">
            <q-card-section class="row items-center justify-between">
              <div class="column">
                <div class="text-subtitle2 text-grey-7">Caja</div>
                <div class="text-h6 text-weight-bold">
                  {{ props.row.name }}
                </div>
              </div>
              <div class="row items-center q-gutter-sm">
                <q-icon name="circle" size="12px" :color="props.row.cashier ? 'positive' : 'negative'" />
                <q-btn flat round icon="print" color="primary" v-if="props.row.corte?.movimientos.MOVIMIENTOS != 0">
                  <q-menu>
                    <div class="q-pa-sm" style="min-width: 200px">
                      <q-select v-model="printer" :options="$counter.printers" label="Impresora" dense filled
                        option-label="name">
                        <template v-slot:after>
                          <q-btn round dense flat icon="send" @click="imprimir(props.row)" />
                        </template>
                      </q-select>
                    </div>
                  </q-menu>
                </q-btn>
              </div>

            </q-card-section>

            <q-separator />
            <div v-if="props.row.corte?.movimientos.MOVIMIENTOS > 0">
              <q-card-section class="row justify-around text-center">
                <div>
                  <div class="text-caption text-grey">Ingresos</div>
                  <div class=" text-weight-bold">
                    {{ money(props.row.corte?.INGRESOS) }}
                  </div>
                </div>
                <div>
                  <div class="text-caption text-grey">Retiradas</div>
                  <div class=" text-weight-bold">
                    {{ money(props.row.corte?.RETIRADAS) }}
                  </div>
                </div>
                <div>
                  <div class="text-caption text-grey">Inicial</div>
                  <div class="text-weight-bold">
                    {{ money(parseFloat(props.row.corte?.SINATE)) }}
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section class="row justify-around text-center">
                <div>
                  <div class="text-caption text-grey">Ventas</div>
                  <div class="text-weight-bold">
                    {{ money(props.row.corte?.VENTASEFE) }}
                  </div>
                </div>
                <div>
                  <div class="text-caption text-grey">Descuadre</div>
                  <div class="text-weight-bold"
                    :class="(props.row.corte?.RETIRADAS - (props.row.corte?.VENTASEFE + props.row.corte?.INGRESOS)) != 0 ? 'text-negative' : 'text-positive'">
                    {{
                      money(
                        props.row.corte?.RETIRADAS -
                        (props.row.corte?.VENTASEFE + props.row.corte?.INGRESOS)
                      )
                    }}
                  </div>
                </div>
                <div v-if="props.row.receipt == null">
                  <div class="text-caption text-grey">Entregado</div>
                  <q-chip clickable color="blue-1" text-color="primary" icon="edit">
                    {{ money(0) }}
                    <q-popup-edit v-model="models" v-slot="scope" @save="(val) => updateReceipt(val, props.row)">
                      <q-input dense outlined type="number" label="Ingreso" v-model.number="scope.value.ingreso"
                        @keyup.enter="scope.set" />
                      <q-input dense outlined type="number" label="Gasto" v-model.number="scope.value.gasto"
                        @keyup.enter="scope.set" />
                    </q-popup-edit>

                  </q-chip>
                </div>
              </q-card-section>
              <q-card-section v-if="props.row.receipt">
                <div class="row justify-around text-center">
                  <div>
                    <div class="text-caption text-grey">Enviado</div>
                    <div class="text-weight-bold">
                      {{ money(props.row.receipt.cash_send) }}
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-grey">Recibido</div>
                    <div class="text-weight-bold">
                      {{ money(props.row.receipt.cash_receipt) }}
                    </div>
                    <q-popup-edit v-model="props.row.receipt.cash_receipt" v-slot="scope"
                      @save="(val) => ModifyReceipt(val, props.row)">
                      <q-input dense outlined type="number" label="Ingreso" v-model.number="scope.value"
                        @keyup.enter="scope.set" />
                    </q-popup-edit>
                  </div>

                  <div>
                    <div class="text-caption text-grey">Gastos</div>
                    <div class="text-weight-bold">
                      {{ money(props.row.receipt.cash_expenses) }}
                    </div>
                    <q-popup-edit v-model="props.row.receipt.cash_expenses" v-slot="scope"
                      @save="(val) => ModifyExpense(val, props.row)">
                      <q-input dense outlined type="number" label="Gasto" v-model.number="scope.value"
                        @keyup.enter="scope.set" />
                    </q-popup-edit>

                  </div>

                  <div>
                    <div class="text-caption text-grey">Diferencia</div>
                    <q-badge :color="props.row.receipt.discrepancy != 0 ? 'negative' : 'positive'">
                      {{ money(props.row.receipt.discrepancy) }}
                    </q-badge>
                  </div>

                </div>

              </q-card-section>

            </div>
            <q-card-section v-else class="text-center text-grey">
              Sin movimientos
            </q-card-section>

          </q-card>
        </div>
      </template>
    </q-table>

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
const models = ref({
  ingreso: 0,
  gasto: 0
})
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
    models.value = { ingreso: 0, gasto: 0 }
    row.receipt = resp
  }
}
const ModifyReceipt = async (val, row) => {
  $q.loading.show({ message: 'Editando Registro' })
  let data = {
    "val": val,
    "receipt": row.receipt.id
  };
  console.log(data);
  const resp = await ApiAssist.ModifyReceipt(data)
  console.log(resp)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide()
    models.value = { ingreso: 0, gasto: 0 }
    row.receipt = resp
  }
}
const ModifyExpense = async (val, row) => {
  $q.loading.show({ message: 'Editando Registro' })
  let data = {
    "val": val,
    "receipt": row.receipt.id
  };
  console.log(data);
  const resp = await ApiAssist.ModifyExpense(data)
  console.log(resp)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $q.loading.hide()
    models.value = { ingreso: 0, gasto: 0 }
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
