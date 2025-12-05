<template>
  <q-page padding>
    <q-table grid :rows="meCyclecount" :pagination="table.pagination"  >
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4" @click="click(props.row)">
          <q-card flat bordered>
            <q-card-section class="flex flex-left">
              <div class="text-h4 text-primary">{{ props.row.id }}</div>
              <q-space />
              <div><q-badge rounded :color="colors[props.row._status - 1].name" /></div>
            </q-card-section>
            <q-card-section>
              <q-list bordered>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-center">Almacen:</q-item-label>
                    <q-item-label class="text-center">{{ JSON.parse(props.row.settings).warehouse.name }}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-center">Creacion:</q-item-label>
                    <q-item-label class="text-center">{{ dayjs(props.row.created_at).format('YYYY-MM-DD H:m:s')}}</q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-center">Creacion:</q-item-label>
                    <q-item-label class="text-center">{{ props.row.created_by.names }} </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-separator />
            <q-card-section class="flex flex-left">
              <div>{{ props.row.products_count }} Modelos</div>
              <q-space />
              <div>{{ props.row.responsables.length }} Responsables</div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>

  </q-page>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import dayjs from 'dayjs';
import UserToolbar from 'src/components/UserToolbar.vue';
import CDB from 'src/API/cicsdb';
import { cyclecountStore } from 'stores/cyclecountStore';
import { useVDBStore } from 'src/stores/VDB';
import InvViewer from 'src/components/Inventory/Viewer.vue'

const folio = ref("");
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const $user = useVDBStore();
const cycleStore = cyclecountStore()
cycleStore.settitle('Conteo')
cycleStore.setshowBtns(false)

const table = ref({
  filter: null,
  pagination: { rowsPerPage: 0 }
})

const meCyclecount = computed(() => {
  let rol = $user.session.credentials._rol
  if([1,2,5,6,12,22,18].includes(rol)){
    return cycleStore.cyclecounts
  }else{
    return cycleStore.cyclecounts.filter(e => e.responsables.some(i => i.id == $user.session.credentials.staff.id_va))
  }
})

const click = row => {
  console.log(row)
  $router.push(`/ciclicos/counted/${row.id}`)
}

const colors = ref([
  { name: 'red' },
  { name: 'yellow' },
  { name: 'green' },
  { name: 'orange' },
])


</script>
