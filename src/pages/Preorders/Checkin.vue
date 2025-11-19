<template>
  <q-page padding>
    <div>
      <div class="flex justify-center">
        <div class="text-center " :style="`width: 50%;`">
          <q-form @submit="nextState(order)">
            <q-input v-model="order" type="number" label="Pedido" autofocus rounded outlined />
          </q-form>
        </div>
      </div>
      <q-table :rows="checkin" grid :pagination="pagination" hide-bottom>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-2 col-sm-1">
            <q-list bordered>
              <q-item clickable v-ripple @dblclick="nextState(props.row.id)" >
                <q-item-section>
                  <q-item-label class="text-center text-bold text-h4">{{ props.row.id }}</q-item-label>
                  <q-item-label class="text-center text-overline text-caption"> <span class="text-bold text-h6">{{
                    props.row.name }} </span>
                    <span class="q-ml-md">{{ `P-${props.row.products_count}` }}</span> </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import catalogApi from 'src/API/catalogApi'
import orderApi from 'src/API/orderApi'
import { vizmedia } from "boot/axios"
import { useVDBStore } from 'stores/VDB';
import { useOrderStore } from 'stores/OrderStore';
import { useQuasar } from 'quasar';
import UserToolbar from "src/components/UserToolbar.vue";
import { $sktOrders } from 'boot/socket';
const $route = useRoute();
const $router = useRouter();
const $orderStore = useOrderStore();
const $q = useQuasar();
const VDB = useVDBStore()

const order = ref(null)
const pagination = ref({ rowsPerPage: [0] })
const checkin = computed(() => $orderStore.orders.filter(e => e._status == 3));

const nextState = (order) => {
  console.log(order)
}


</script>
