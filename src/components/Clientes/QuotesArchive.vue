<template>
  <q-card-section class="col">
    <q-table title="Rechazadas" :rows="$props.quotes" row-key="name" :columns="table.cols">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <q-td key="client" :props="props">{{ props.row.nom_cli }}</q-td>
          <q-td key="address" :props="props">{{ `${props.row.street}, ${props.row.num_ext}` }}</q-td>
          <q-td key="celphone" :props="props">{{ props.row.celphone }}</q-td>
          <q-td key="email" :props="props">{{ props.row.email }}</q-td>
          <q-td key="price" :props="props">{{ props.row.price }}</q-td>
          <q-td key="tickets" :props="props">{{ props.row.tickets }}</q-td>
          <q-td key="status" :props="props" :class="qstates[props.row._status].color">{{ qstates[props.row._status].label
          }}</q-td>
          <q-td key="store" :props="props">{{ props.row.sucursal }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn flat round icon="settings_backup_restore" color="primary" @click="restore(props.row.id)"
              title="Restaurar" />
            <q-btn flat round icon="delete_forever" color="negative" @click="destroy(props.row.id)"
              title="Eliminar permanentemente" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-card class="my-card">
      <q-card-section>
        <q-card-actions>
          <q-btn flat label="Cancelar" v-close-popup>
          </q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>

  </q-card-section>
</template>

<script setup>
import { ref, computed } from 'vue';

let qstates = {
  0: { label: "Nueva", color: "text-pink" },
  1: { label: "Aprobada", color: "text-light-green-10" },
  2: { label: "Rechazada", color: "text-red-14" }
}

let table = ref({
  cols: [
    { name: 'id', label: 'ID' },
    { name: 'client', label: 'Cliente' },
    { name: 'address', label: 'Domicilio', field: r => `${r.street}, ${r.num_ext}` },
    { name: 'celphone', label: 'Telefono' },
    { name: 'email', label: 'Correo' },
    { name: 'price', label: 'Precio' },
    { name: 'tickets', label: 'Ticket' },
    {
      name: 'status', label: 'Estado',
      field: row => qstates[row._status].label,
      classes: row => qstates[row._status].color
    },
    { name: 'store', label: 'Sucursal' },
    { name: 'actions', label: 'Actions' }
    // { name:'idFactusol', label:'Factusol', field:'_fsid'},

  ]
});

let $emit = defineEmits(['restore', 'destroy'])


let $props = defineProps({
  quotes: { default: [], type: Array },
});

const restore = (id) => {
  $emit('restore', id);
}

const destroy = (id) => {
  $emit('destroy', id);
}

</script>
