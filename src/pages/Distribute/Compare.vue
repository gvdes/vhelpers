<template>
  <q-page padding>

    <q-table dense v-if="orderByDifference?.length > 0" title="Modificacion Sucursales" :rows="orderByDifference"
      :columns="table.columnsPrimary" :pagination="table.pagination" hide-bottom @row-click="mosPartition" />

    <q-dialog v-model="partition.state" persistent>
      <q-card style="width: 800px; max-width: 80vw;">
        <q-card-section class="items-center">
          <div class="text-bold text-center text-h6">Particion - {{ partition.val.id }}</div>
          <q-list bordered>
            <q-item>
              <q-item-section>
                <q-item-label class="text-center" :caption="partition.val.invoice ? true : false"><q-btn
                    :flat="partition.val.invoice ? true : false" @click="determinationInvoice"
                    :disable="partition.val.invoice ? true : false">{{ partition.val.requisition.from._type == 2 ?
                      'Factura' : 'Traspaso' }}</q-btn></q-item-label>
                <q-item-label class="text-center text-bold">{{ partition.val.invoice }}</q-item-label>
              </q-item-section>
              <q-separator spaced inset vertical dark />
              <q-item-section>
                <q-item-label class="text-center" :caption="partition.val.invoice_received ? true : false"> <q-btn
                    :flat="partition.val.invoice_received ? true : false" @click="determinationEntry"
                    :disable="partition.val.invoice_received ? true : false">{{ partition.val.requisition.from._type ==
                      2
                      ? 'Entrada' : 'Traspaso' }}</q-btn></q-item-label>
                <q-item-label class="text-center text-bold">{{ partition.val.invoice_received }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list bordered>
            <q-item>
              <q-item-section>
                <q-item-label class="text-center" caption>Surtidor</q-item-label>
                <q-item-label class="text-center text-caption">{{ partition.val._suplier }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-center" caption>Verificador</q-item-label>
                <q-item-label class="text-center text-caption">{{ partition.val.verified?.complete_name
                  }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-center" caption>Chofer</q-item-label>
                <q-item-label class="text-center text-caption">{{ partition.val.driving?.complete_name }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-center" caption>Recibo</q-item-label>
                <q-item-label class="text-center text-caption">{{ partition.val.receipt?.complete_name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section>
          <q-table :rows="partition.val.products" :columns="table.columnsProduct" :pagination="table.pagination"
            hide-bottom>
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
                <q-th auto-width />
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td>
                  {{ props.row.code }}
                </q-td>
                <q-td>
                  {{ props.row.description }}
                </q-td>
                <q-td class="text-center">
                  {{ props.row.pivot.toDelivered * mult(props.row.pivot._supply_by, props.row) }}
                  <q-popup-edit v-model="props.row.pivot.toDelivered" v-slot="scope">
                    <q-input type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set()" :min="1" />
                    <div class="text-caption"> Surtido Por {{ supply_by(props.row.pivot._supply_by) }}</div>
                    Piezas: {{ scope.value * mult(props.row.pivot._supply_by, props.row) }}
                  </q-popup-edit>
                </q-td>
                <q-td class="text-center">
                  {{ props.row.pivot.toReceived * mult(props.row.pivot._supply_by, props.row) }}
                  <q-popup-edit v-model="props.row.pivot.toReceived" v-slot="scope">
                    <q-input type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set()" :min="1" />
                    <div class="text-caption"> Surtido Por {{ supply_by(props.row.pivot._supply_by) }}</div>
                    Piezas: {{ scope.value * mult(props.row.pivot._supply_by, props.row) }}
                  </q-popup-edit>
                </q-td>
                <q-td class="text-center">
                  {{ Number(props.row.pivot.toDelivered - props.row.pivot.toReceived) * mult(props.row.pivot._supply_by,
                    props.row) }}
                </q-td>
                <q-td auto-width>
                  <q-btn
                    :color="props.row.pivot.toDelivered >= 0 && props.row.pivot.toReceived > 0 ? 'grey' : 'negative'"
                    icon="delete" @click="delProd(props.row)"
                    :disable="props.row.pivot.toDelivered >= 0 && props.row.pivot.toReceived > 0" flat />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Guardar" color="primary" @click="modifyInvoices = !modifyInvoices" />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="modifyInvoices" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="white" text-color="negative" />
          <span class="q-ml-sm text-bold text-h6">Se realizara las modificaciones correspondientes</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Enviar" color="primary" @click="sendSave" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="mosModigy.state" persistent>
      <q-card>
        <q-card-section class="text-center text-bold text-h6">
          Resultado de la Modificacin
        </q-card-section>
        <q-card-section>
          <div class="text-center text-bold"><span class="text-center q-mr-md">Elminar :</span>{{
            mosModigy.val.res.Eliminar.message ?
              mosModigy.val.res.Eliminar.message : '' }}<q-icon class="q-mb-sm" size="sm"
              :color="mosModigy.val.res.Eliminar.success ? 'positive' : 'negative'"
              :name="mosModigy.val.res.Eliminar.success ? 'check' : 'close'" /></div>

          <div class="text-center text-bold"><span class="text-center q-mr-md">Salida :</span>{{
            mosModigy.val.res.Salida.message ?
              mosModigy.val.res.Salida.message : '' }} <q-icon class="q-ml-md q-mb-sm" size="sm"
              :color="mosModigy.val.res.Salida.success ? 'positive' : 'negative'"
              :name="mosModigy.val.res.Salida.success ? 'check' : 'close'" /></div>

          <div class="text-center text-bold"><span class="text-center q-mr-md">Entrada :</span>{{
            mosModigy.val.res.Entrada.message ?
              mosModigy.val.res.Entrada.message : '' }}<q-icon class=" q-ml-md q-mb-sm" size="sm"
              :color="mosModigy.val.res.Entrada.success ? 'positive' : 'negative'"
              :name="mosModigy.val.res.Entrada.success ? 'check' : 'close'" /></div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>



  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import RestockApi from 'src/API/RestockApi.js';
import invApi from 'src/API/invoicesApi.js';

import { useVDBStore } from 'stores/VDB';
import { useRestockStore } from 'stores/Restock';
import { useQuasar } from 'quasar';
import { $sktRestock } from 'boot/socket';
import PrinterSelect from 'src/components/Restock/PrinterSelect.vue';
import InvoicePdf from 'src/Pdf/Invoices/invoices.js';
const $route = useRoute();
const $router = useRouter();
const $restockStore = useRestockStore();
const $q = useQuasar();
const VDB = useVDBStore()

const partition = ref({
  state: false,
  val: null
})

const mosModigy = ref({
  state: false,
  val: null
})

const originalProducts = ref([]); // copia segura para rollback



const modifyInvoices = ref(false)
const ordersdb = computed(() => $restockStore.partitions.filter(o => o._status == 10 && o.requisition._workpoint_to == VDB.session.store.id_viz))
const orderByDifference = computed(() => ordersdb.value.filter(order => order.products.some(product => product.pivot.toReceived !== product.pivot.toDelivered) || (!order.invoice) || (!order.invoice_received)))

const init = async () => {
  $restockStore.setShowLYT(true)
  $restockStore.setTitle('Modificaciones')
  $restockStore.setButtonShow(true)
  $restockStore.setButtonShowAdd(false)
}

const table = ref({
  columnsPrimary: [
    { name: 'name', align: 'left', label: 'Sucursal', field: r => r.requisition.from.name, },
    { name: 'order', align: 'center', label: 'Pedido', field: r => r.requisition.id },
    { name: 'partition', align: 'center', label: 'Particion', field: r => r.id },
    { name: 'notes', align: 'center', label: 'Notas', field: r => r.requisition.notes },
    { name: 'invoice', align: 'center', label: 'Salida', field: r => r.invoice },
    { name: 'entry', align: 'center', label: 'Entrada', field: r => r.invoice_received },
    { name: 'modified', align: 'center', label: 'Diferencias', field: r => r.products.filter(product => product.pivot.toReceived !== product.pivot.toDelivered).length }
  ],
  columnsProduct: [
    { name: 'code', align: 'left', label: 'Codigo', field: r => r.code },
    { name: 'description', align: 'left', label: 'Descripcion', field: r => r.description },
    { name: 'toDelivered', align: 'center', label: 'Salida', field: r => r.pivot.toDelivered * mult(r.pivot._supply_by, r) },
    { name: 'toReceived', align: 'center', label: 'Entrada', field: r => r.pivot.toReceived * mult(r.pivot._supply_by, r) },
    { name: 'Diference', align: 'center', label: 'Diferencia', field: r => Number(r.pivot.toDelivered - r.pivot.toReceived) * mult(r.pivot._supply_by, r) },
  ],
  pagination: { rowsPerPage: 0 }
})

const sendSave = async () => {
  $q.loading.show({ message: 'Realizando Cambios' })
  const originalToReceived = originalProducts.value.products.map(p => ({ id: p.id, toReceived: p.pivot.toReceived }));
  const originalToDelivered = originalProducts.value.products.map(p => ({ id: p.id, toDelivered: p.pivot.toDelivered }));
  console.log(partition.value.val)

  try {
    const resp = await RestockApi.correction(partition.value.val)
    // console.log(resp);
    if (resp.status != 200) {
      console.log(resp)
      partition.value.val.products = JSON.parse(JSON.stringify(originalProducts.value.products));
    } else {
      console.log(resp.data);
      mosModigy.value.val = resp.data
      mosModigy.value.state = true
      if (resp.data.res.Eliminar.success) {
        const deletedIds = resp.data.deleted.map(p => p);
        // partition.value.val.products.filter(p => !deletedIds.includes(p.id));
        partition.value.val.products = partition.value.val.products.filter(p => !deletedIds.includes(p.id));
      } else {
        console.log(originalProducts)
        partition.value.val.products = JSON.parse(JSON.stringify(originalProducts.value.products));
      }
      if (resp.data.res.Entrada.success) {
        resp.data.toReceived.forEach(update => {
          const prod = partition.value.val.products.find(p => p.id === update._product);
          if (prod) {
            prod.pivot.toReceived = update.toReceived;
          }
        });
      } else {
        originalToReceived.forEach(orig => {
          const prod = partition.value.val.products.find(p => p.id === orig.id);
          if (prod) prod.pivot.toReceived = orig.toReceived;
        });
      }
      if (resp.data.res.Salida.success) {
        resp.data.toDelivered.forEach(update => {
          const prod = partition.value.val.products.find(p => p.id === update._product);
          if (prod) {
            prod.pivot.toDelivered = update.toDelivered;
          }
        });
      } else {
        originalToDelivered.forEach(orig => {
          const prod = partition.value.val.products.find(p => p.id === orig.id);
          if (prod) prod.pivot.toDelivered = orig.toDelivered;
        });
      }
    }
  } catch (error) {
    partition.value.val.products = JSON.parse(JSON.stringify(originalProducts.value.products));
    console.error('Error al guardar:', error);
  } finally {
    $sktRestock.emit("orderpartition_refresh", { order: partition.value.val })
    partition.value.val.products.forEach(e => {
      e.pivot.units = e.pivot.toDelivered * mult(e.pivot._supply_by, e);
      console.log(e.pivot.toDelivered * mult(e.pivot._supply_by, e))
    })
    console.log(partition.value.val)
    InvoicePdf.invoiceFormat(partition.value.val)
    modifyInvoices.value = false
    $q.loading.hide();
    partition.value = {
      state: false,
      val: null
    }
    // createFS(resp.partition)
    originalProducts.value = []; // copia segura para rollback
  }
}


const delProd = (product) => {
  let inx = partition.value.val.products.findIndex(p => p.id == product.id);
  // partition.value.val.products.findIndex(a => a.id == product.id)
  partition.value.val.products.splice(inx, 1)
  console.log(product.pivot)
}

const mosPartition = (a, b) => {
  partition.value.state = !partition.value.state;
  partition.value.val = JSON.parse(JSON.stringify(b));
  originalProducts.value = JSON.parse(JSON.stringify(b));

}


const determinationInvoice = () => {
  const traspaso = partition.value.val.requisition.from._type == 1;
  if (traspaso) {
    createTransferFS(partition.value.val, true);
  } else {
    createInvoiceFS(partition.value.val)
  }
}

const determinationEntry = () => {
  const traspaso = partition.value.val.requisition.from._type == 1;
  if (traspaso) {
    createTransferFS(partition.value.val, false);
  } else {
    createEntryFS(partition.value.val)
  }
}

const createEntryFS = async (partition) => {
  $q.loading.show({ message: 'generando entrada' });
  const resp = await invApi.addEntryFS(partition);
  if (resp.fail) {
    if (resp.fail.status == 503) {
      $q.notify({ message: 'No hubo conexion a cedis, Intentarlo mas tarde', type: 'negative', position: 'bottom' });

      $q.loading.hide();
    } else {
      console.log(resp);
    }
  } else {
    console.log(resp);
    $q.notify({ message: `Entrada Creada ${resp.invoice_received}`, type: 'positive', position: 'bottom' })
    // partition.invoice_received = resp;
    $sktRestock.emit("orderpartition_refresh", { order: resp })
    $q.loading.hide();
  }
}

const createInvoiceFS = async (partition) => {
  $q.loading.show({ message: 'salida' });
  const resp = await invApi.addInvoiceFS(partition);
  if (resp.fail) {
    if (resp.fail.status == 503) {
      $q.notify({ message: 'No hubo conexion a cedis, Intentarlo mas tarde', type: 'negative', position: 'bottom' });
      $q.loading.hide();
    } else {
      console.log(resp);
    }
  } else {
    console.log(resp);
    $q.notify({ message: `Salida Creada ${resp.invoice}`, type: 'positive', position: 'bottom' })
    // partition.invoice = resp;
    $sktRestock.emit("orderpartition_refresh", { order: resp })
    $q.loading.hide();
  }
}

const createTransferFS = async (partition, origen) => {
  $q.loading.show({ message: 'generando traspaso' });
  if (origen) {
    const resp = await invApi.addTransferFS(partition);
    if (resp.fail) {
      if (resp.fail.status == 503) {
        $q.notify({ message: 'No hubo conexion a cedis, Intentarlo mas tarde', type: 'negative', position: 'bottom' });
        $q.loading.hide();
      } else {
        console.log(resp);
      }
    } else {
      console.log(resp);
      $q.notify({ message: `Traspaso Creado ${resp.invoice}`, type: 'positive', position: 'bottom' })
      // partition.invoice = resp;
      $sktRestock.emit("orderpartition_refresh", { order: resp })
      $q.loading.hide();
    }
  } else {
    const resp = await invApi.endTransferFS(partition);
    if (resp.fail) {
      if (resp.fail.status == 503) {
        $q.notify({ message: 'No hubo conexion a cedis, Intentarlo mas tarde', type: 'negative', position: 'bottom' });
        $q.loading.hide();
      } else {
        console.log(resp);
      }
    } else {
      console.log(resp);
      $q.notify({ message: `Traspaso Creado ${resp.invoice_received}`, type: 'positive', position: 'bottom' })
      // partition.invoice_received = resp;
      $sktRestock.emit("orderpartition_refresh", { order: resp })
      $q.loading.hide();
    }
  }
}



const mult = (surtido, product) => {
  let mul;
  switch (surtido) {
    case 1:
      mul = 1
      break;
    case 2:
      mul = 12
      break;
    case 3:
      mul = product.pivot.ipack
  }
  return mul;
}
const supply_by = (surtido) => {
  let mul;
  switch (surtido) {
    case 1:
      mul = 'Pieza'
      break;
    case 2:
      mul = 'Docena'
      break;
    case 3:
      mul = 'Caja'
  }
  return mul;
}


init()
</script>
