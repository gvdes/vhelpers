<template>
  <q-page padding>
    <q-table :rows="filteredProducts" row-key="id" grid :pagination="table.pagination" :filter="table.filter"
      v-model:pagination="table.pagination">
      <template v-slot:top>
        <div class="row justify-end q-gutter-sm full-width">
          <q-select v-model="stocks.val" :options="stocks.opts" label="Stocks" dense outlined class="col-auto"
            style="width:200px; max-width: 200px;">
            <template v-slot:append>
              <q-icon v-if="stocks.val !== null" name="close" @click.stop.prevent="stocks.val = null"
                class="cursor-pointer" />
            </template>
          </q-select>
          <q-select v-model="categories.val" :options="categories.opts" option-label="name" label="Categorías" dense
            outlined class="col-auto" style="width:200px; max-width: 200px;">
            <template v-slot:append>
              <q-icon v-if="categories.val !== null" name="close" @click.stop.prevent="categories.val = null"
                class="cursor-pointer" />

            </template></q-select>
          <q-input dense debounce="300" v-model="table.filter" placeholder="Buscar" class="col-auto" outlined>
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>



      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4" v-touch-swipe.horizontal="handleSwipe">

          <!-- <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4"> -->
          <q-card flat bordered>
            <q-card-section class="text-center row ">
              <div class="col">
                Codigo: <span class="text-bold">{{ props.row.code }}</span>
              </div>
              <div class="col">
                CCO: <span class="text-bold">{{ props.row.name }}</span>
              </div>
              <div class="col">
                <div> STOCK: <span class="text-bold"
                    :class="props.row.stocks.find(e => e.id == VDB.session.store.id_viz).pivot.stock <= 0 ? 'text-red' : ''">{{
                      props.row.stocks.find(e => e.id == VDB.session.store.id_viz).pivot.stock <= 0 ? 'Agotado' :
                        props.row.stocks.find(e => e.id == VDB.session.store.id_viz).pivot.stock}}</span></div>
                <div class="row">
                  <div class="text-caption">{{props.row.stocks.find(e => e.id == 1).alias}}
                    <div class="text-caption">{{props.row.stocks.find(e => e.id == 1).pivot.stock}}</div>
                  </div>
                  <q-separator spaced inset vertical dark />
                  <div class="text-caption">{{props.row.stocks.find(e => e.id == 2).alias}}
                    <div class="text-caption">{{props.row.stocks.find(e => e.id == 2).pivot.stock}}</div>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="row items-stretch" tyle="min-height: 260px;">



              <div class="col-6 flex flex-center bg-grey-2" v-if="props.row.imgcover" @click="openMedia(props.row)"
                style="height: 100%;">
                <q-img :src="`${vizmedia}/Products/${props.row.id}/${props.row.imgcover}`" spinner-color="primary"
                  style="width: 100%; height: 100%; max-height: 250px; object-fit: contain;" />
              </div>

              <div v-else class="col-6 flex flex-center bg-grey-2" style="height: 100%;">
                <q-img :src="`${vizmedia}/Products/sinpicture.png`" spinner-color="primary"
                  style="width: 100%; height: 100%; max-height: 250px; object-fit: contain;" />
              </div>


              <div class="col-6 q-pa-sm flex flex--column justify-between">
                <div class="text-center text-bold text-red-10">{{ props.row.description }}</div>
                <q-separator spaced inset vertical dark />
                <div class="q-mt-md">
                  <div v-for="(price, index) in props.row.prices" :key="index">
                    <q-list bordered dense>
                      <q-item>
                        <q-item-section>
                          <q-item-label class="text-center text-bold">{{ price.name }}</q-item-label>
                          <q-item-label class="text-center">$ {{ price.pivot.price }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>
                <q-separator spaced inset vertical dark />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="text-center row ">
              <div class=" col ">
                Piezas X Caja:
                <span class="text-bold">{{ props.row.pieces }}</span>
              </div>
              <div class=" col " v-if="props.row.large">
                MED:
                <span class="text-bold">{{ props.row.large }}</span>
              </div>
              <div class="col" v-if="$catalogStore.orderState || $catalogStore.requisitionState">
                <div class="col " v-if="!props.row.pivot">
                  <q-btn
                    :color="props.row.stocks.reduce((a, v) => a + Number(v.pivot.stock), 0) <= 0 ? 'negative' : 'primary'"
                    rounded
                    :label="props.row.stocks.reduce((a, v) => a + Number(v.pivot.stock), 0) <= 0 ? 'Agotado' : 'Agregar'"
                    @click="$catalogStore.orderState ? addProduct(props.row) : addProductRequisition(props.row)"
                    size="sm" :disable="props.row.stocks.reduce((a, v) => a + Number(v.pivot.stock), 0) <= 0" />
                </div>
                <div class="col " v-else>
                  <q-btn-group rounded class="bg-primary">
                    <q-btn size="sm" color="primary" icon="remove"
                      @click="$catalogStore.orderState ? decreaseAmount(props.row) : decreaseAmountRequisition(props.row)" />
                    <div class="q-ml-md q-mr-md text-white bg-primary">{{ props.row.pivot.amount }}</div>
                    <q-btn size="sm" color="primary" icon="add"
                      @click="$catalogStore.orderState ? increaseAmount(props.row) : increaseAmountRequisition(props.row)" />
                  </q-btn-group>
                </div>
              </div>

            </q-card-section>
          </q-card>
        </div>
      </template>

      <template v-slot:bottom="scope">
        <q-page-sticky position="bottom" class="full-width" :offset="[0, 18]">
          <div class="row q-pt-xs">
            <q-btn-group rounded class="">
              <q-btn v-if="scope.pagesNumber > 2" icon="first_page" round dense flat :disable="scope.isFirstPage"
                @click="scope.firstPage" class="q-px-sm" />
              <q-btn icon="chevron_left" round dense flat :disable="scope.isFirstPage" @click="scope.prevPage"
                class="q-px-sm" />
              <q-btn flat disable no-caps>{{ scope.pagination.page }} / {{ scope.pagesNumber }}</q-btn>
              <q-btn icon="chevron_right" round dense flat :disable="scope.isLastPage" @click="scope.nextPage"
                class="q-px-sm" />
              <q-btn v-if="scope.pagesNumber > 2" icon="last_page" round dense flat @click="scope.lastPage"
                class="q-px-sm" />
            </q-btn-group>
          </div>
        </q-page-sticky>
      </template>
    </q-table>


    <q-dialog v-model="mediaDialog" persistent>
      <q-card class="media-card">
        <q-bar>
          <div class="text-bold ellipsis">
            {{ currentProduct?.code }} — {{ currentProduct?.description }}
          </div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section class="q-pa-none media-content">
          <q-spinner v-if="mediaLoading" size="50px" color="primary" class="absolute-center" />
          <q-carousel v-else-if="mediaItems.length" v-model="mediaSlide" animated arrows navigation infinite  swipeable
            class="media-carousel">
            <q-carousel-slide v-for="(item, i) in mediaItems" :key="i" :name="i" class="flex flex-center">
              <q-img v-if="item.type === 'image'" :src="item.url" spinner-color="primary" class="media-img" />
              <video v-else autoplay loop muted playsinline autobuffer class="media-video">
                <source :src="item.url" type="video/mp4" />
              </video>
            </q-carousel-slide>
          </q-carousel>
          <div v-else class="text-grey absolute-center">
            Sin archivos disponibles
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';
import catalogApi from 'src/API/catalogApi'
import { useVDBStore } from 'stores/VDB';
import { catalogStore } from 'stores/catalogStore';
import { useQuasar } from 'quasar';
import UserToolbar from "src/components/UserToolbar.vue";
import { $sktRestock } from 'boot/socket';
import PrinterSelect from 'src/components/Restock/PrinterSelect.vue';
import { vizmedia } from "boot/axios"
const $route = useRoute();
const $router = useRouter();
const $catalogStore = catalogStore();
const $q = useQuasar();
const VDB = useVDBStore()
const mediaDialog = ref(false)
const mediaLoading = ref(false)
const mediaItems = ref([])
const mediaSlide = ref(0)
const currentProduct = ref(null)


const image = ref({
  state: false,
  val: null
})
const products = ref([])
const table = ref({
  pagination: { rowsPerPage: 12, page: 1 },
  filter: ''
})
const stocks = ref({
  val: { id: 2, label: 'Mayor a 1' },
  opts: [{ id: 1, label: 'Agotados' },
  { id: 2, label: 'Mayor a 1' },
  { id: 3, label: 'Mayor a 25' },
  { id: 4, label: 'Mayor a 50' },
  { id: 5, label: 'Mayor a 100' },]
})

const categories = ref({
  val: null,
  opts: []
});


const pagesNumber = computed(() => Math.ceil(products.value.length / table.value.pagination.rowsPerPage));
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchCategory = categories.value.val
      ? product._category === categories.value.val.id
      : true

    let matchStock = true
    if (stocks.value.val) {
      const stock = product.stocks.reduce((a, v) => a + Number(v.pivot.stock), 0) ?? 0

      switch (stocks.value.val.id) {
        case 1: matchStock = stock === 0; break
        case 2: matchStock = stock > 1; break
        case 3: matchStock = stock > 25; break
        case 4: matchStock = stock > 50; break
        case 5: matchStock = stock > 100; break
      }
    }
    return matchCategory && matchStock
  })
})

const init = async () => {
  $q.loading.show({ message: 'Obteniendo Hijos' })
  console.log($route.params.fid);
  const data = {
    family: $route.params.fid,
    workpoint: VDB.session.store.id_viz
  }

  const resp = await catalogApi.getFamilysProducts(data)
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp)
    $catalogStore.setTitle(`Catálogo ${resp.family.name}`)
    categories.value.opts = resp.categories;
    const baseProducts = resp.family.products.map(p => ({ ...p, order: 0 }))

    if ($catalogStore.orderState) {
      for (const product of baseProducts) {
        const inOrder = $catalogStore.order.products.find(p => p.id === product.id)
        if (inOrder) {
          product.pivot = inOrder.pivot
        }
      }
    }
    if ($catalogStore.requisitionState) {
      for (const product of baseProducts) {
        const inRequisition = $catalogStore.requisition.products.find(p => p.id === product.id)
        if (inRequisition) {
          product.pivot = inRequisition.pivot
        }
      }
    }
    products.value = baseProducts
    $q.loading.hide()
  }
}



// const mosImage = (url) => {
//   image.value.state = true,
//     image.value.val = url
// }

const openMedia = async (product) => {
  mediaDialog.value = true
  mediaLoading.value = true
  mediaItems.value = []
  mediaSlide.value = 0
  currentProduct.value = product
  const resp = await catalogApi.getProductMedia({ id: product.id })
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    mediaItems.value = resp
    mediaLoading.value = false
  }
}

const addProduct = (row) => {
  const newPivot = {
    order: $catalogStore.order.id,
    _product: row.id,
    units: 1,
    price: row.prices.find(e => e.id == 1).pivot.price,
    total: row.prices.find(e => e.id == 1).pivot.price,
    amount: 1,
    amountDelivered: 0,
    toDelivered: 0,
    _price_list: 1,
    _supply_by: 1
  }

  row.pivot = { ...newPivot }
  $catalogStore.pushProduct(row)
}

const increaseAmount = (row) => {
  row.pivot.amount++
  row.pivot.units++
  row.pivot.total = row.pivot.amount * row.pivot.price
  $catalogStore.updateProduct(row)
}

const decreaseAmount = (row) => {
  row.pivot.amount--
  row.pivot.units--
  if (row.pivot.amount <= 0) {
    delete row.pivot
    $catalogStore.removeProduct(row.id)
  } else {
    row.pivot.total = row.pivot.amount * row.pivot.price
    $catalogStore.updateProduct(row)
  }
}



const addProductRequisition = (row) => {
  const newPivot = {
    _requisition: $catalogStore.requisition.id,//ok
    _product: row.id,//ok
    amount: 1,//ook
    _supply_by: 1,//ok
    units: 1,//ok
    cost: row.prices.find(e => e.id == 1).pivot.price,//ok
    total: row.prices.find(e => e.id == 1).pivot.price,//ok
    comments: null,
    stock: row.stocks.find(e => e.id == 1).pivot.stock,//ok
    ipack: null,
  }

  row.pivot = { ...newPivot }
  $catalogStore.pushProductRequisition(row)
}

const increaseAmountRequisition = (row) => {
  row.pivot.amount++
  row.pivot.units++
  row.pivot.total = row.pivot.amount * row.pivot.price
  $catalogStore.updateProductRequisition(row)
}

const decreaseAmountRequisition = (row) => {
  row.pivot.amount--
  row.pivot.units--
  if (row.pivot.amount <= 0) {
    delete row.pivot
    $catalogStore.removeProductRequisition(row.id)
  } else {
    row.pivot.total = row.pivot.amount * row.pivot.price
    $catalogStore.updateProductRequisition(row)
  }
}


const handleSwipe = ({ evt, ...newInfo }) => {
  let min = 1;
  let max = pagesNumber.value
  if (newInfo.direction == 'left' && table.value.pagination.page < max) {
    table.value.pagination.page++
  } else if (newInfo.direction == 'right' && table.value.pagination.page > min) {
    table.value.pagination.page--
  }
}
onMounted(() => {
  init()
})

</script>
<style>
.media-card {
  width: 90vw;
  max-width: 900px;
  height: 85vh;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
}

.media-content {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.media-carousel {
  height: 100%;
}

.media-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.media-video {
  max-width: 100%;
  max-height: 100%;
}
</style>
