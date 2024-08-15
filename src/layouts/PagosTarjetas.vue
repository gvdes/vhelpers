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

        <div class="q-mb-lg row">
          <q-card class="my-card col" bordered>
            <q-card-section>
              <div class="text-h6">Bauchers</div>
            </q-card-section>
            <q-card-section>
              <div class="text-center text-h6">$ {{ tarjSuc.reduce((a, b) => Number(Number(a) + Number(b)).toFixed(2), 0)
                }}</div>
            </q-card-section>
          </q-card>
          <q-separator spaced inset vertical dark />
          <q-card class="my-card col">
            <q-card-section>
              <div class="text-h6">Cobros</div>
            </q-card-section>
            <q-card-section>
              <div class="text-center text-h6">$ {{ tertar.reduce((a, b) =>
                Number(Number(a) + Number(b.TARJETAS)).toFixed(2), 0) }}</div>
            </q-card-section>
          </q-card>
          <q-separator spaced inset vertical dark />
          <q-card class="my-card col">
            <q-card-section>
              <div class="text-h6">Diferencia</div>
            </q-card-section>
            <q-card-section>
              <div class="text-center text-h6">$ {{ Number(Number(tarjSuc.reduce((a, b) =>
                Number(Number(a) + Number(b)).toFixed(2), 0)) - Number(tertar.reduce((a, b) =>
                  Number(Number(a) + Number(b.TARJETAS)).toFixed(2), 0))).toFixed(2) }}</div>
            </q-card-section>
          </q-card>
        </div>

        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input v-model="text" type="number" label="IMPORTE" outlined autofocus :min="0.00" step="any" dense
            input-class="q-pl-md" :disable="terminales.val == 'SELECCIONA CAJA'" />
        </q-form>

        <q-separator spaced inset vertical dark />
        <div class="row">
          <div>
            <q-table title="LISTA" :rows="tarjSuc" row-key="name" :columns="columns" :pagination="{ rowsPerPage: 9 }" hide-bottom />
          </div>
          <q-separator spaced inset vertical dark />
          <div class="col">
            <div class="row">
              <q-table title="Bauchers Faltantes" :rows="sobrantes" row-key="name" class="col" :columns="columns">
                <template v-slot:top-right>
                  <div class="row">
                    <q-separator spaced inset vertical dark />
                    <div class="col"> <q-btn color="primary" icon="archive" dense no-caps flat round
                        @click="exportTable" :disable="sobrantes.length > 0 ? false : true" />
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
          </div>
        </div>


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


// const onSubmit = () => {

//   if (text.value) {
//     tarjSuc.value.push(text.value)
//     text.value = null
//     const resultado = verificarCoincidencias(sobrantes.value, faltantes.value);

//     if (resultado.length > 0) {
//       console.log('Se encontraron coincidencias con las siguientes combinaciones:');
//       resultado.forEach(coincidencia => {
//         console.log(`Combinación: ${coincidencia.combinacion.join(' + ')} = ${coincidencia.monto}, Ticket: ${coincidencia.ticket}`);
//       });
//     } else {
//       console.log('No se encontraron coincidencias.');
//     }
//   }

// }
const onSubmit = () => {
  if (text.value) {
    tarjSuc.value.unshift(text.value); // Agregar el nuevo baucher a tarjSuc
    text.value = null; // Limpiar el input

    // Encontrar coincidencias
    const coincidencia = verificarCoincidencias(sobrantes.value, faltantes.value);

    if (coincidencia.length > 0) {
      // coincidencias.forEach(coincidencia => {
      // console.log(`Se encontró una coincidencia: Combinación: ${coincidencia[0].combinacion.map(obj => obj).join(' + ')} = ${coincidencia[0].monto}, Ticket: ${coincidencia[0].ticket}`);
      $q.notify({
        message: `Se encontró una coincidencia: Combinación: ${coincidencia[0].combinacion.map(obj => obj).join(' + ')} = ${coincidencia[0].monto}, Ticket: ${coincidencia[0].ticket}`,
        type: 'positive',
        position: 'center'
      })
      tarjSuc.value.unshift(coincidencia[0].monto)

      coincidencia[0].combinacion.forEach(baucher => {
        const indexSobrantes = tarjSuc.value.findIndex(s => s == baucher);
        if (indexSobrantes !== -1) {
          tarjSuc.value.splice(indexSobrantes, 1);
        }
      });
      // });
    } else {
      console.log('No se encontraron coincidencias.');
    }
  }
};

const index = async () => {
  console.log("Recibiendo Datos :)")
  $q.loading.show({ message: 'Obteniendo datos' });
  let host = VDB.session.store.ip;
  let riwo = `http://${host}/access/public/reports/getCashCard`;
  axios.get(riwo)
    .then(r => {
      console.log(r)
      tarjetas.value = r.data.formaspagos
      terminales.value.opts = r.data.terminales
      $q.loading.hide()

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



// const verificarCoincidencias = (bouchers, cobros) => {
//   const combinaciones = generarCombinaciones(bouchers);
//   console.log(combinaciones);

//   const coincidencias = [];

//   combinaciones.forEach(combinacion => {
//     const sumaCombinacion = combinacion.reduce((a, b) => Number(a) + Number(b), 0);

//     cobros.forEach(cobro => {
//       if (cobro.TARJETAS == sumaCombinacion) {
//         coincidencias.push({
//           combinacion: combinacion,
//           ticket: cobro.TICKET,
//           monto: cobro.TARJETAS
//         });
//       }
//     });
//   });

//   return coincidencias;
// }



const verificarCoincidencias = (bouchers, cobros) => {
  const combinaciones = generarCombinaciones(bouchers);
  const coincidencias = [];

  combinaciones.forEach(combinacion => {
    const sumaCombinacion = combinacion.reduce((a, b) => Number(a) + Number(b), 0); // Sumamos las propiedades TARJETAS

    cobros.forEach(cobro => {
      if (cobro.TARJETAS == sumaCombinacion) {
        coincidencias.push({
          combinacion: combinacion, // La combinación de objetos completos
          ticket: cobro.TICKET,
          monto: cobro.TARJETAS
        });
      }
    });
  });

  return coincidencias;
};

const generarCombinaciones = (array) => {
  const resultado = [];

  for (let i = 0; i < (1 << array.length); i++) {
    const combinacion = [];
    for (let j = 0; j < array.length; j++) {
      if (i & (1 << j)) {
        combinacion.push(array[j]);
      }
    }
    if (combinacion.length > 0) {
      resultado.push(combinacion);
    }
  }

  return resultado;
}

index()
</script>
