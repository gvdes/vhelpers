<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row">
          <q-input class="col" filled dense v-model="table.filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-separator spaced inset vertical dark />
          <q-select class="col" v-model="table.store" :options="warehousStore.stores" label="Origen / Destion" filled
            dense option-label="name" clearable />
          <q-separator spaced inset vertical dark />
          <q-select class="col" v-model="table.status" :options="status" label="Estado" dense filled
            option-label="name" clearable />
          <q-separator spaced inset vertical dark />
          <q-btn color="primary" outline icon="event">
            <q-menu>
              <q-date v-model="table.fechas" landscape minimal />
            </q-menu>
          </q-btn>
          <q-separator spaced inset vertical dark />
          <q-btn color="primary" outline icon="add" title="traspaso entre sucursales"
            v-if="VDB.session.store._type != 1">
            <q-menu>
              <q-card style="width: 350px;">
                <q-card-section class="text-h6 text-bold text-center">
                  Traspaso Sucursal
                </q-card-section>
                <q-card-section class=" items-center">
                  <div class="row">
                    <div class="col">
                      <q-select v-model="VDB.session.store" :options="warehousStore.stores" label="Origen"
                        option-label="alias" :option-disable="(val) => optionDisable(val)" disable dense />
                      <q-separator spaced inset vertical dark />
                      <q-select v-model="nwStore._origin" :options="warehousStore.warehouses.filter(e => e._type == 1)"
                        label="Almacen" outlined dense emit-value option-value="id" map-options option-label="alias"
                        @update:model-value="nwStore._destiny = null" />
                    </div>
                    <q-icon name="arrow_forward" class="col" size="md" />
                    <div class="col">
                      <q-select v-model="storeDes" :options="userStores" label="Destino" option-label="alias" dense
                        :disable="!nwStore._origin" @update:model-value="nwStore._destiny = null" />
                      <q-separator spaced inset vertical dark />
                      <q-select v-if="storeDes" v-model="nwStore._destiny" :options="storeDes.warehouses"
                        label="Alamcen" outlined dense emit-value option-value="id" map-options option-label="alias" />
                    </div>
                  </div>
                  <q-input v-model="nwStore.notes" type="text" label="Notas" />
                </q-card-section>
                <q-card-actions align="center">
                  <!-- <q-btn flat label="Contultar" color="primary" @click="$router.push(`refunds`);" /> -->
                  <q-btn flat label="Crear" color="positive" @click="addingTransferStore"
                    :disable="!validTransferStore" />
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>
        </div>

      </q-card-section>
    </q-card>

    <q-separator spaced inset vertical dark />
    <div v-if="refunds">
      <q-card class="my-card" v-if="VDB.session.store.id != 1">
        <q-card-section class="text-center text-bold text-h6">
          <div class="row">
            <div class="col">Origen</div>
            <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded" />
          </div>
        </q-card-section>
        <q-card-section>
          <q-slide-transition>
            <div v-show="expanded">
              <viewRefund :refunds="filteredRefunds.to?.sort((a, b) => b.id - a.id)" :status="status" />
            </div>
          </q-slide-transition>

        </q-card-section>
      </q-card>

      <q-separator spaced inset vertical dark />
      <q-card class="my-card">
        <q-card-section class="text-center text-bold text-h6">
          <div class="row">
            <div class="col">Destino</div>
            <q-btn color="grey" round flat dense :icon="expandedfrom ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expandedfrom = !expandedfrom" />
          </div>
        </q-card-section>
        <q-card-section>
          <q-slide-transition>
            <div v-show="expandedfrom">
              <viewRefund :refunds="filteredRefunds.from?.sort((a, b) => b.id - a.id)" :status="status" />
            </div>
          </q-slide-transition>

        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import refundsApi from "src/API/refundsApi";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import { useRoute, useRouter } from "vue-router";
import dayjs from 'dayjs';
import viewRefund from 'src/components/Refunds/ViewRefunds.vue';// encabezado aoiida
const $router = useRouter();
import { useWarehouse } from 'src/stores/warehousStore';
const warehousStore = useWarehouse()
warehousStore.setTitle(`Devoluciones / Traspasos`)
warehousStore.setshowReportLocations(false);
warehousStore.setshowReportMinMax(false);
warehousStore.setshowOptions(false);


const VDB = useVDBStore();
const $q = useQuasar();
const types = ref([]);
const status = ref([]);
const providers = ref([]);
const refunds = ref(null)
const expanded = ref(false)
const expandedfrom = ref(false)

const storeDes = ref(null);
const nwStore = ref({
  _origin: null,
  _destiny: null,
  notes: null
})
const table = ref({
  filter: null,
  state: null,
  fechas: null,
  store: null,
})
const validTransferStore = computed(() => nwStore.value._origin && nwStore.value._destiny && nwStore.value.notes)
const userStores = computed(() => warehousStore.stores.filter(e => e.id != VDB.session.store.id))

const filteredRefunds = computed(() => {

  if (!refunds.value) return null

  const filterText = table.value.filter?.toLowerCase() || null
  const statusFilter = table.value.status?.id || null
  const dateFilter = table.value.fechas || null
  const storeFilter = table.value.store || null

  const applyFilters = (list) => {

    return list?.filter(item => {
      const matchText = !filterText ||
        item.id?.toString().includes(filterText) ||

        item.notes?.toLowerCase().includes(filterText) ||

        (Array.isArray(item.bodie) &&
          item.bodie.some(b =>
            b.code?.toLowerCase().includes(filterText)
          ))
      const matchStatus = !statusFilter ||
        item._state === statusFilter
      const matchDate = !dateFilter ||
        dayjs(item.created_at).format('YYYY/MM/DD') === dateFilter

      const matchStore =
        !storeFilter ||
        item.origin.store.id === storeFilter.id ||
        item.destiny.store.id === storeFilter.id
      return matchText && matchStatus && matchDate && matchStore
    })

  }
  return {
    to: applyFilters(refunds.value.to),
    from: applyFilters(refunds.value.from)
  }

})


const init = async () => {
  $q.loading.show({ message: 'Obteniendo Datos', type: 'positive', position: 'center' });
  const resp = await refundsApi.index()
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    types.value = resp.types;
    providers.value = resp.provider;
    refunds.value = resp.refunds
    status.value = resp.status
    $q.loading.hide()
  }

}

const addingTransferStore = async () => {
  $q.loading.show({ message: 'Creando Traspaso' })
  nwStore.value._type = 1;
  nwStore.value._state = 1;
  const resp = await refundsApi.addRefund(nwStore.value);
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    $router.push(`refunds/${resp.id}`);
    $q.loading.hide()
  }
}


init()
</script>
