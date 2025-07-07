<template>
  <q-page padding>
    <div>
      <q-table title="Sucursales" :rows="stores" row-key="id" :columns="table.cols" :pagination="{ rowsPerPage: 20 }">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
            <q-td key="alias" :props="props">{{ props.row.alias }}</q-td>
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td key="actions" :props="props">
              <q-btn flat rounded icon-right="arrow_circle_right" label="Crear Pedido" color="primary"
                @click="notes(props.row.id)" :disable="block" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-dialog v-model="prompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <q-select v-model="read.cats" :options="sections.opts" label="Seccion" option-label="name" filled multiple use-chips />
          </q-card-section>
          <q-card-section>
            <q-select v-model="read._workpoint_to" :options="cedis" label="Destino" option-label="name" filled
              :option-disable="(val) => optionDisable(val)" />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-bold">Notas</div>
            <q-input dense v-model="read.notes" autofocus />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" @click="reset" />
            <q-btn flat label="Continuar" @click="createPedido" :disable="!valid" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="order.state"  full-width>
        <q-card>
          <q-table :rows="order.val.products" :columns="productTable.columns" :filter="productTable.filter">
            <template v-slot:top="props">
              <div class="col-2 q-table__title q-mr-xl">Pedido : {{ order.val.id }}</div>
              <div class="text-overline">Notas : {{ order.val.notes }}</div>
              <q-space />
              <q-separator spaced inset vertical />
              <q-btn color="primary" icon="send" @click="changeStatus" flat round title="Enviar Pedido" />
              <q-separator spaced inset vertical />
              <q-btn color="primary" icon="download" @click="exportTable" flat round title="Descargar" />
              <q-separator spaced inset vertical />
              <q-input borderless dense debounce="300" v-model="productTable.filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
          </q-table>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
// import AssitApi from 'src/api/AssistApi.js';
import restockApi from 'src/API/RestockApi.js';
import { useQuasar } from 'quasar';
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';
import ExcelJS from 'exceljs';
import { $sktRestock } from 'boot/socket';


const $q = useQuasar();
const $route = useRoute();

const order = ref({
  state: false,
  val: null
})

const productTable = ref({
  columns: [
    { name: 'code', label: 'Codigo', align: 'left', field: row => row.code },
    { name: 'shortcode', label: 'Codigo Corto', align: 'left', field: row => row.name },
    { name: 'section', label: 'Seccion', align: 'left', field: row => row.categories.familia.seccion.name },
    { name: 'family', label: 'Familia', align: 'left', field: row => row.categories.familia.name },
    { name: 'category', label: 'Categoria', align: 'left', field: row => row.categories.name },
    { name: 'description', label: 'Descripcion', align: 'left', field: row => row.description },
    { name: 'supplyby', label: 'Surtir por ', align: 'left', field: row => { return row.pivot._supply_by == 1 ? 'Pieza' : row.pivot._supply_by == 3 ? 'Caja' : 'Docena' } },
    { name: 'amount', label: 'Cantidad', align: 'left', field: row => row.pivot.amount },
    { name: 'piezas', label: 'Cantidad en Piezas', field: row => row.pivot.units }
  ],
  filter: ''
})


const stores = ref([])
const sections = ref({
  opts: []
})
const block = ref(false);
const prompt = ref(false);
const notas = ref('');
const sucursal = ref(null);

const table = ref({
  cols: [
    { name: 'id', label: 'ID', align: 'center' },
    { name: 'alias', label: 'ALIAS', align: 'center' },
    { name: 'name', label: 'SUCURSAL', align: 'left' },
    { name: 'actions', label: '', align: 'left' }
  ]
});

const read = ref({
  cats: [],
  _workpoint_from: null,
  _workpoint_to: null,
  _type: 2,
  notes: null
})

const valid = computed(() => (read.value.cats.length > 0 && read.value._workpoint_to))
const cedis = computed(() => stores.value.filter(e => e._type == 1));

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Sucursales' })
  const resp = await restockApi.getStoresAutomate()
  if (resp.status == 200) {
    console.log(resp.data)
    stores.value = resp.data.stores
    sections.value.opts = resp.data.sections
    $q.loading.hide()
  } else {
    alert('Problemas con la obtencion de datos');
  }
}

const notes = (a) => {
  prompt.value = true
  sucursal.value = a
}

const createPedido = async (a) => {
  block.value = true
  $q.loading.show({ message: "Creando Pedido" })
  let data = {
    cats: read.value.cats.map(e => "'" + e.name + "'").join(),
    _workpoint_from: sucursal.value,
    _workpoint_to: read.value._workpoint_to.id,
    _type: 2,
    notes: read.value.notes
  }
  console.log(data)
  const resp = await restockApi.createAutomate(data)
  if (resp.status == 200) {
    console.log(resp.data)
    block.value = false
    $q.loading.hide()
    $q.notify({
      type: 'positive',
      message: `Pedido ${resp.data.order.id} creado`,
      position: 'center'
    })
    order.value.state = true;
    order.value.val = resp.data.order
    console.log(resp);
    $sktRestock.emit('creating',  {order: resp.data.order} )
    read.value = {
      cats: [],
      _workpoint_from: null,
      _workpoint_to: null,
      _type: 2,
      notes: null
    }
    prompt.value = false
  } else {
    alert('Nosegeneroelpedido')
  }

}

const optionDisable = (val) => {
  if (val.id == sucursal.value) {
    return true
  }
  return false
}

const reset = () => {
  read.value = {
    cats: [],
    _workpoint_from: null,
    _workpoint_to: null,
    _type: 2,
    notes: null
  }
  prompt.value = false
}

const exportTable = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Comparativo');
  worksheet.addRow(productTable.value.columns.map(e => e.label));
  order.value.val.products.forEach((row) => {
    worksheet.addRow([
      row.code,
      row.name,
      row.categories.familia.seccion.name,
      row.categories.familia.name,
      row.categories.name,
      row.description,
      row.pivot._supply_by == 1 ? 'Pieza' : row.pivot._supply_by == 3 ? 'Caja' : 'Docena',
      row.pivot.amount,
      row.pivot.units
    ])
  });

  const downloadExcel = async () => {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `Pedido${order.value.val.id}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  downloadExcel();
}

const changeStatus = async () => {
  $q.loading.show({message:'Enviando Pedido'});
  const resp = await restockApi.nextStep({ id: order.value.val.id })
  console.log(resp)
  if (resp.status == 200) {
    console.log(resp)
    $q.notify({ message: 'Pedido Enviado :)', type: 'positive', position: 'center' })
    order.value = {
      state: false,
      val: null
    }
    $sktRestock.emit('order_refresh',  {order: resp.data.requisition} )
    $q.loading.hide();
  } else {
    alert('Problema con el envio de el pedido ')
  }
}
init()
</script>
