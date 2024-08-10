<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-page-container>
      <q-page padding>
      <q-header class="bg-grey-3 text-dark " bordered>
        <UserToolbar />
        <q-separator />
        <q-toolbar class="justify-between">
          <div>
            <span class="text-grey">Helpers</span>
            <q-icon name="navigate_next" color="primary" />
            <span class="text-h6">Tarjetas</span>
          </div>
          <div class="row">
            <q-select v-model="terminales.val" :options="terminales.opts" option-label="DESTER" label="Caja" outlined
              dense />
          </div>
        </q-toolbar>

      </q-header>

          <q-separator spaced inset vertical dark />
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input v-model="text" type="number" label="IMPORTE" outlined />
        </q-form>

        <q-separator spaced inset vertical dark />
        <div class="row">
          <q-table title="Bauchers Faltantes" :rows="sobrantes" row-key="name" class="col" :columns="columns">
            <template v-slot:top-right>
              <div class="row">
                <q-separator spaced inset vertical dark />
                <div class="col"> <q-btn color="primary" icon="archive" dense no-caps flat round @click="exportTable"
                    :disable="sobrantes.length > 0 ? false : true" />
                </div>
              </div>
            </template>
          </q-table>

          <q-separator spaced inset vertical dark />
          <q-table title="Cobros Faltantes" :rows="faltantes" row-key="name" class="col" :columns="tables">
            <template v-slot:top-right>
              <div class="row">
                <q-separator spaced inset vertical dark />
                <div class="col"> <q-btn color="primary" icon="archive" dense no-caps flat round
                    @click="exportFaltantes" :disable="faltantes.length > 0 ? false : true" />
                </div>
              </div>

            </template>
          </q-table>
        </div>

        <q-separator spaced inset vertical dark />

        <q-table title="Cobros Encontrados" :rows="encontrar" row-key="name" :columns="tables">
          <template v-slot:top-right>
            <div class="row">
              <q-separator spaced inset vertical dark />
              <div class="col"> <q-btn color="primary" icon="archive" dense no-caps flat round
                  @click="exportEncontrados" :disable="encontrar.length > 0 ? false : true" />
              </div>
            </div>

          </template>
        </q-table>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import axios from 'axios';//para dirigirme bro
import { exportFile, useQuasar } from 'quasar';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
import { computed, ref } from 'vue';
import { assist } from "src/boot/axios";
import { enc } from 'crypto-js';


const VDB = useVDBStore();
const $q = useQuasar();

const text = ref(null)
const tarjSuc = ref([])
const tarjetas = ref([])
const terminales = ref({
  val: 'SELECCIONA CAJA',
  opts: []
});
const columns = ref([
  { name: 'bauchers', label: 'Baucher', field: row => row }
])

const tables = ref([
  { name: 'terminal', label: 'Caja', align: 'left', field: row => row.TERMINAL },
  { name: 'ticket', label: 'Ticket', field: row => row.TICKET },
  { name: 'total', label: 'Total', field: row => row.TARJETAS },
  { name: 'fecha', label: 'Fecha', field: row => row.FECHA },
  { name: 'hora', label: 'Hora', field: row => row.HORA },
  { name: 'cliente', label: 'Cliente', align: 'left', field: row => row.CLIENTE },

])

const tertar = computed(() => {
  if (terminales.value.val) {
    return tarjetas.value.filter(e => e.TERMINAL == terminales.value.val.DESTER)
  } else {
    return []
  }
})

const encontrar = computed(() => {
  if (tarjSuc.value.length > 0) {
    let copiaTarjSuc = [...tarjSuc.value]; // Copia del arreglo original

    return tertar.value.filter(e => {
      const index = copiaTarjSuc.indexOf(e.TARJETAS);
      if (index !== -1) {
        // Si se encuentra, eliminar esa ocurrencia y no incluir en el resultado
        copiaTarjSuc.splice(index, 1);
        return true;
      }
      return false; // Incluir en el resultado si no se encuentra en la copia
    });
  } else {
    return []
  }
})

const faltantes = computed(() => {
  if (tarjSuc.value.length > 0) {
    let copiaTarjSuc = [...tarjSuc.value]; // Copia del arreglo original

    return tertar.value.filter(e => {
      const index = copiaTarjSuc.indexOf(e.TARJETAS);
      if (index !== -1) {
        // Si se encuentra, eliminar esa ocurrencia y no incluir en el resultado
        copiaTarjSuc.splice(index, 1);
        return false;
      }
      return true; // Incluir en el resultado si no se encuentra en la copia
    });
  } else {
    return tertar.value
  }

})

const sobrantes = computed(() => {
  let copiaTertar = [...tertar.value]; // Copia del arreglo original

  return tarjSuc.value.filter(tarjeta => {
    const index = copiaTertar.findIndex(e => e.TARJETAS === tarjeta);
    if (index !== -1) {
      // Si se encuentra, eliminar esa ocurrencia de la copia
      copiaTertar.splice(index, 1);
      return false; // No incluir en noEncontrados si se encuentra en tertar
    }
    return true; // Incluir en noEncontrados si no se encuentra en tertar
  });
})

const onSubmit = () => {
  if (text.value) {
    tarjSuc.value.push(text.value)
    text.value = null
  }

}

const index = async () => {
  console.log("Recibiendo Datos :)")
  let host = VDB.session.store.ip;
  let riwo = `http://${host}/access/public/reports/getCashCard`;
  axios.get(riwo)
    .then(r => {
      console.log(r)
      tarjetas.value = r.data.formaspagos
      terminales.value.opts = r.data.terminales

    })
    .catch(r => console.log(r))
}


const exportTable = () => {
  // naive encoding to csv format
  const content = [columns.value.map(col => wrapCsvValue(col.label))].concat(
    sobrantes.value.map(row => columns.value.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[col.field === void 0 ? col.name : col.field],
      col.format,
      row
    )).join(','))
  ).join('\r\n')

  const status = exportFile(
    'SobrantesBauchers.csv',
    content,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  } else {
    $q.notify({
      message: 'Descarga Completa :)',
      color: 'positive',
      icon: 'check',
      position: 'center'
    })
  }
}


const exportFaltantes = () => {
  // naive encoding to csv format
  const content = [tables.value.map(col => wrapCsvValue(col.label))].concat(
    faltantes.value.map(row => tables.value.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[col.field === void 0 ? col.name : col.field],
      col.format,
      row
    )).join(','))
  ).join('\r\n')

  const status = exportFile(
    'BucherFaltantes.csv',
    content,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  } else {
    $q.notify({
      message: 'Descarga Completa :)',
      color: 'positive',
      icon: 'check',
      position: 'center'
    })
  }
}

const exportEncontrados = () => {
  // naive encoding to csv format
  const content = [tables.value.map(col => wrapCsvValue(col.label))].concat(
    encontrar.value.map(row => tables.value.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[col.field === void 0 ? col.name : col.field],
      col.format,
      row
    )).join(','))
  ).join('\r\n')

  const status = exportFile(
    'BauchersEncontrados.csv',
    content,
    'text/csv'
  )

  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  } else {
    $q.notify({
      message: 'Descarga Completa :)',
      color: 'positive',
      icon: 'check',
      position: 'center'
    })
  }
}

const wrapCsvValue = (val, formatFn, row) => {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  if (/^\d{1,2}-\d{4}$/.test(formatted)) {
    formatted = `'${formatted}`
  }
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

index()
</script>
