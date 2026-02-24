<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>
    <q-page-container>
      <q-toolbar class="justify-between">
        <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">{{ title }}</span>
        </div>
        <div class="row" v-if="warehousStore.showReportLocations">
          <q-btn color="primary" title="Sin Stock Con Ubicacion" icon="show_chart" outline>
            <q-menu @show="obtSections">
              <q-list style="min-width: 250px">
                <q-item>
                  <q-select v-model="report.type.val" :options="report.type.opts" label="Tipo Reporte" filled dense />
                </q-item>
                <q-separator />
                <q-item>
                  <q-select v-model="report.seccion.val" :options="report.seccion.opts" label="Seccion"
                    option-label="name" filled dense style="width:200px" />
                </q-item>
                <q-separator />
                <q-item>
                  <q-btn label="Obtener" @click="obtReport" flat :disable="!report.seccion.val" />
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div class="row" v-if="warehousStore.showReportMinMax">
          <q-btn color="primary" title="Sin Stock Con Ubicacion" icon="show_chart" outline>
            <q-menu @show="obtSectionsmm">
              <q-list style="min-width: 250px">
                <q-item>
                  <q-select v-model="reportmm.type.val" :options="reportmm.type.opts" label="Tipo Reporte" filled
                    dense />
                </q-item>
                <q-separator />
                <q-item>
                  <q-select v-model="reportmm.seccion.val" :options="reportmm.seccion.opts" label="Seccion"
                    option-label="name" filled dense style="width:200px" />
                </q-item>
                <q-separator />
                <q-item>
                  <q-btn label="Obtener" @click="obtReportmm" flat :disable="!reportmm.seccion.val" />
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div class="row" v-if="warehousStore.showOptions">
          <q-btn class="col" color="primary" outline icon="swap_horiz" title="traspaso entre almacenes">
            <q-menu>
              <q-card style="width: 350px;">
                <q-card-section class="text-h6 text-bold text-center">
                  Traspaso Almacen
                </q-card-section>
                <q-card-section class=" items-center">
                  <div class="row">
                    <q-select v-model="nwTransfer._origin" :options="warehousStore.warehouses" label="Origen"
                      class="col" option-label="name" emit-value option-value="id" map-options
                      @update:model-value="nwTransfer._destiny = null" :option-disable="(val) => optionDisable(val)" />
                    <q-icon name="arrow_forward" class="col" size="md" />
                    <q-select v-model="nwTransfer._destiny" :options="warehousStore.warehouses" label="Destino"
                      emit-value option-value="id" map-options class="col" option-label="name"
                      :option-disable="(val) => optionDisable(val)" :disable="nwTransfer._origin == null" />
                  </div>
                  <q-input v-model="nwTransfer.notes" type="text" label="Notas" />
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn flat label="Contultar" color="primary" @click=" $router.push(`transfers`);" />
                  <q-btn flat label="Crear" color="positive" @click="addingTransfer" :disable="!validTransfer" />
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>
          <q-separator spaced inset vertical dark />
          <q-btn class="col" color="primary" outline icon="cached" title="traspaso entre sucursales">
            <q-menu>
              <q-card style="width: 350px;">
                <q-card-section class="text-h6 text-bold text-center">
                  Traspaso Sucursal
                </q-card-section>
                <q-card-section class=" items-center">
                  <div class="row">
                    <q-select v-model="VDB.session.store" :options="warehousStore.stores" label="Origen"
                      class="col" option-label="alias" emit-value option-value="id" map-options
                      @update:model-value="nwStore._destiny = null" :option-disable="(val) => optionDisable(val)" disable />
                    <q-icon name="arrow_forward" class="col" size="md" />
                    <q-select v-model="nwStore._destiny" :options="userStores" label="Destino"
                      emit-value option-value="id" map-options class="col" option-label="alias"
                      :option-disable="(val) => optionDisable(val)" />
                  </div>
                  <q-input v-model="nwStore.notes" type="text" label="Notas" />
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn flat label="Contultar" color="primary" @click="mosTransfersStore = !mosTransfersStore" />
                  <q-btn flat label="Crear" color="positive" @click="addingTransferStore" :disable="!validTransferStore" />
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>
          <q-separator spaced inset vertical dark />
          <q-btn color="primary" icon="trolley" outline title="devolucion" class="col">
            <q-menu>
              <q-card style="width: 300px;">
                <q-card-section class="text-h6 text-bold text-center">
                  Devolucion
                </q-card-section>
                <q-card-section class=" items-center">
                  <div class="row">
                    <q-select v-model="newRefund._warehouse" :options="warehousStore.warehouses" label="Almacen"
                      class="col" option-label="name" emit-value option-value="id" map-options
                      :option-disable="(val) => optionDisableMov(val)" />
                  </div>
                  <q-input v-model="newRefund.notes" type="text" label="Notas" />
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn flat label="Contultar" color="primary" @click="mosRefunds = !mosRefunds" />
                  <q-btn flat label="Crear" color="positive" @click="addingRefund" :disable="!validRefund" />
                </q-card-actions>
              </q-card>
            </q-menu>
          </q-btn>

          <q-separator spaced inset vertical dark v-if="VDB.session.credentials.rol._type == 1" />
          <q-btn color="primary" icon="all_out" outline title="salida Interna" class="col"
            v-if="VDB.session.credentials.rol._type == 1" :option-disable="(val) => optionDisableMov(val)">
            <q-menu>
              <q-card style="width: 300px;">
                <q-card-section class="text-h6 text-bold text-center">
                  Salida Interna
                </q-card-section>
                <q-card-section class=" items-center">
                  <div class="row">
                    <q-select v-model="newOut._warehouse" :options="warehousStore.warehouses" label="Almacen"
                      class="col" option-label="name" emit-value option-value="id" map-options
                      :option-disable="(val) => optionDisableMov(val)" />
                  </div>
                  <q-input v-model="newOut.notes" type="text" label="Notas" />
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn flat label="Contultar" color="primary" @click="mosOuts = !mosOuts" />
                  <q-btn flat label="Crear" color="positive" @click="addingOut" :disable="!validOut" />
                </q-card-actions>
              </q-card>
            </q-menu></q-btn>
        </div>
      </q-toolbar>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import { useWarehouse } from 'src/stores/warehousStore';
import { useRoute, useRouter } from "vue-router";
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import reportApi from "src/API/reportApi";
import warehouseApi from "src/API/warehouseApi";
import locationsApi from 'src/API/locationsApi';
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import reportExc from "src/Excel/reports.js";
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();

const warehousStore = useWarehouse()
const mosOuts = ref(false);
const mosRefunds = ref(false);
const mosTransfers = ref(false)
const mosTransfersStore = ref(false)
// {{ VDB.session.credentials.rol._type }}
const nwTransfer = ref({
  _origin: null,
  _destiny: null,
  notes: null
})
const nwStore = ref({
  _origin: null,
  _destiny: null,
  notes: null
})
const newRefund = ref({
  _warehouse: null,
  notes: null
})
const newOut = ref({
  _warehouse: null,
  notes: null
})
const report = ref({
  type: {
    val: { id: 1, label: 'Con Stock Sin Ubicacion', alias: 'CSSU' },
    opts: [
      { id: 1, label: 'Con Stock Sin Ubicacion', alias: 'CSSU' },
      { id: 2, label: 'Sin Stock Con Ubicacion', alias: 'SSCU' },
      { id: 3, label: 'Con Stock Con Ubicacion', alias: 'CSCU' },
    ]
  },
  seccion: {
    val: null,
    opts: [],
  }
})

const reportmm = ref({
  type: {
    val: { id: 2, label: 'Con Stock Sin Min y Max', alias: 'CSCMM' },
    opts: [
      { id: 1, label: 'Con Stock Con Min y Max', alias: 'CSCMM' },
      { id: 2, label: 'Con Stock Sin Min y Max', alias: 'CSSMM' },
      { id: 3, label: 'Sin Stock Con Min y Max', alias: 'SSCMM' },
    ]
  },
  seccion: {
    val: null,
    opts: [],
  }
})

const validTransfer = computed(() => nwTransfer.value._origin && nwTransfer.value._destiny && nwTransfer.value.notes)
const validRefund = computed(() => newRefund.value._warehouse && newRefund.value.notes)
const validOut = computed(() => newOut.value._warehouse && newOut.value.notes)
const validTransferStore = computed(() => nwStore.value._destiny && nwStore.value.notes)
const userStores = computed(() => warehousStore.stores.filter(e => e.id != VDB.session.store.id))

const title = computed(() => warehousStore.title)

const obtSections = async () => {
  $q.loading.show({ message: 'Obteniendo Secciones' })
  const resp = await reportApi.index();
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.loading.hide();
    report.value.seccion.opts = resp.seccion
  }
}
const obtSectionsmm = async () => {
  $q.loading.show({ message: 'Obteniendo Secciones' })
  const resp = await reportApi.index();
  if (resp.error) {
    console.log(resp);
  } else {
    console.log(resp);
    $q.loading.hide();
    reportmm.value.seccion.opts = resp.seccion
  }
}

const obtReport = async () => {
  $q.loading.show({ message: 'Obteniendo Reporte' })
  console.log(report.value)
  let data = {
    _rol: VDB.session.credentials._rol,
    workpoint: VDB.session.store.id_viz,
    _type: report.value.type.val.id,
    section: report.value.seccion.val.id,
  }
  console.log(data)
  const resp = await locationsApi.reportLocations(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.loading.hide();
    if (resp.length > 0) {
      let impor = {
        key: report.value.type.val.alias,
        value: resp
      }
      console.log(impor);
      switch (report.value.type.val.id) {
        case 1:
          reportExc.conStockSinUbicar(impor)
          break;
        case 2:
          reportExc.sinStockUbicados(impor)
          break;
        case 3:
          reportExc.conStockUbicados(impor)
          break;
      }
    } else {
      $q.notify({ message: 'No hay productos por mostrar', type: 'positive', position: 'top' })
    }
  }


}

const obtReportmm = async () => {
  $q.loading.show({ message: 'Obteniendo Reporte' })
  console.log(report.value)
  let data = {
    _rol: VDB.session.credentials._rol,
    workpoint: VDB.session.store.id_viz,
    _type: reportmm.value.type.val.id,
    section: reportmm.value.seccion.val.id,
  }
  console.log(data)
  const resp = await locationsApi.reportMinMax(data)
  if (resp.fail) {
    console.log(resp)
  } else {
    $q.loading.hide();
    console.log(resp)
    if (resp.length > 0) {
      let impor = {
        key: reportmm.value.type.val.alias,
        value: resp
      }
      console.log(impor);
      switch (reportmm.value.type.val.id) {
        case 1:
          reportExc.conMaximos(impor)
          break;
        case 2:
          reportExc.sinMaximos(impor)
          break;
        case 3:
          reportExc.conMaximos(impor)
          break;
      }
    } else {
      $q.notify({ message: 'No hay productos por mostrar', type: 'positive', position: 'top' })
    }
  }
}

const optionDisable = (val) => {
  return (
    val.id === nwTransfer.value._origin || ((VDB.session.credentials.rol._type !== 1) && val._type === 3)
  );
}

const optionDisableMov = (val) => {
  return val._type !== 1

}
const init = async () => {
  const resp = await warehouseApi.index();
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    warehousStore.setWarehouse(resp.warehouses)
    warehousStore.setStore(resp.stores)
  }
}


const addingTransfer = async () => {
  console.log(nwTransfer.value)
  $q.loading.show({message:'Creando Traspaso'})
  const resp = await warehouseApi.addingTransfer(nwTransfer.value);
  if(resp.fail){
    console.log(resp)
  }else{
    console.log(resp)
    $router.push(`transfers/${resp.id}`);
    $q.loading.hide()

  }
}
const addingOut = () => {
  console.log(newOut.value)

}
const addingRefund = () => {
  console.log(newRefund.value)

}
const addingTransferStore = () =>{
  nwStore.value._origin = VDB.session.store.id
    console.log(nwStore.value)
}



// const direct = (transfer) => {
//   console.log(transfer);
//   let oid = transfer.id
//   console.log((transfer.origin.id !== 4 && transfer.destiny.id !== 4))
//   if (
//     VDB.session.rol == 'aud' ||  VDB.session.rol == 'root' || VDB.session.rol == 'audc'
//   ) {
//     $router.push(`transfers/${oid}`);
//   } else if (
//     (VDB.session.rol == 'aux' || VDB.session.rol == 'gen') &&
//     (transfer.origin.id !== 4 && transfer.destiny.id !== 4)
//   ) {
//     $router.push(`transfers/${oid}`);
//   } else if (
//    ( VDB.session.rol == 'alm' || VDB.session.rol == 'vld' || VDB.session.rol == 'gce'   ) &&
//     ([5, 6,7].includes(transfer.destiny.id) || [5, 6,7].includes(transfer.origin.id))
//   ) {
//     $router.push(`transfers/${oid}`);
//   } else {
//     $q.notify({
//       message: 'No tienes acceso a este traspaso',
//       type: 'negative',
//       position: 'center'
//     });
//   }
//   // console.log(allowedIds.includes(transfer.origin.id) || allowedIds.includes(transfer.destiny.id));
// }

init()
</script>
