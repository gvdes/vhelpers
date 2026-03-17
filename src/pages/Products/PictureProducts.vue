<template>
  <q-page padding>


    <div class="row justify-center">
      <transition name="bounce">
        <div v-if="product.state">
          <q-card flat bordered>
            <q-card-section class="text-center row ">
              <div class="col">
                Codigo: <span class="text-bold">{{ product.val.code }}</span>
              </div>
              <div class="col">
                CCO: <span class="text-bold">{{ product.val.name }}</span>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="row items-stretch">
              <div class="col-6 flex flex-center" v-if="product.val.imgcover">
                <q-img :src="`${vizmedia}/Products/${product.val.id}/${product.val.imgcover}`" spinner-color="primary"
                  style="max-height: 250px; max-width: 100%; object-fit: contain;" :ratio="1" />
              </div>
              <div v-else class="col-6 flex flex-center">
                <q-img v-if="previewUrl == null" :src="`${vizmedia}/Products/sinpicture.png`" spinner-color="primary"
                  style="max-height: 250px; max-width: 100%; object-fit: contain;" :ratio="1" @click="openUploader" />
                <q-uploader ref="uploader" accept=".jpg, .png, .jpeg" @added="insertimageExist" hide-upload-btn
                  style="display: none;" field-name="file" />
                <div v-if="previewUrl">
                  <q-img :src="previewUrl" :key="previewUrl" spinner-color="primary"
                    style="max-height: 250px; max-width: 100%; width: 200px; max-width: 100%;  object-fit: contain;"
                    :ratio="1" />
                </div>
              </div>
              <div class="col-6 q-pa-sm flex flex--column justify-between">
                <div class="text-center text-bold text-red-10">{{ product.val.description }}</div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="text-center row ">
              <div class=" col ">
                Piezas X Caja:
                <span class="text-bold">{{ product.val.pieces }}</span>
              </div>
              <div class=" col " v-if="product.val.large">
                MED:
                <span class="text-bold">{{ product.val.large }}</span>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="negative" @click="onRejectedExist" />
              <q-btn flat label="Enviar" color="positive" :disable="!product.val.imgcoverExist" @click="updateImage" />
            </q-card-actions>
          </q-card>
        </div>
      </transition>
    </div>


    <q-dialog v-model="massive.result.state" persistent transition-show="scale" transition-hide="scale">
      <q-card style="min-width: 400px; max-height: 80vh;">
        <q-card-section class="text-center text-bold text-primary">
          Resultados de la carga masiva
        </q-card-section>
        <q-card-section v-if="massive.result.val.actualizados?.length">
          <div class="text-green text-subtitle2 q-mb-sm">Actualizados correctamente ({{
            massive.result.val.actualizados.length }})</div>
          <q-list bordered separator>
            <q-item v-for="(item, index) in massive.result.val.actualizados" :key="'ok-' + index">
              <q-item-section>
                <q-item-label><b>{{ item.Codigo }}</b></q-item-label>
                <q-item-label caption>{{ item.mssg }}</q-item-label>
              </q-item-section>
              <q-item-section side v-if="item.image">
                <q-img :src="`${vizmedia}/Products/${item.id}/${item.image}`" :alt="item.Codigo"
                  style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-section v-if="massive.result.val.error?.length">
          <div class="text-negative text-subtitle2 q-mb-sm">Errores ({{ massive.result.val.error.length }})</div>
          <q-list bordered separator>
            <q-item v-for="(err, index) in massive.result.val.error" :key="'err-' + index">
              <q-item-section>
                <q-item-label><b>{{ err.Codigo || '—' }}</b></q-item-label>
                <q-item-label caption>{{ err.mssg }}</q-item-label>
              </q-item-section>
              <q-item-section side v-if="err.image">
                <q-img :src="`${vizmedia}/Products/${err.id}/${err.image}`" :alt="err.Codigo"
                  style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>





    <q-footer reveal elevated bordered>
      <q-separator spaced inset vertical dark />
      <div class="row q-ml-sm">
        <div>
          <q-btn icon="upload" flat @click="clickFile" />
        </div>
        <q-separator spaced inset vertical dark />
        <q-card class="col" v-if="!massive.state">
          <ProductAutocomplete :checkState="false" @input="add" @agregar="agregar" />
        </q-card>
        <q-separator spaced inset vertical dark />
      </div>
      <q-separator spaced inset vertical dark />
    </q-footer>
    <input type="file" ref="inputFile" id="inputFile" @input="readFile" hidden accept=".jpg, .jpeg, .png" multiple />

  </q-page>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import ExcelJS from 'exceljs';
import { useQuasar } from 'quasar';
import dayjs from 'dayjs';
import productApi from 'src/API/productsApi.js';
import { useVDBStore } from 'stores/VDB';
import { useProductStore } from 'stores/ProductsStore';
import ProductAutocomplete from 'src/components/ProductsAutocomplete.vue';// encabezado aoiida
import { vizmedia } from "boot/axios"

const $q = useQuasar();
const VDB = useVDBStore();
const layoutProduct = useProductStore();
layoutProduct.setTitle('Imagenes Productos');
const uploader = ref(null)
const previewUrl = ref(null)
const massive = ref({
  state: false,
  result: {
    state: false,
    val: null
  }
})
const product = ref({
  state: false,
  val: null
})



const inputFile = ref(null);

const clickFile = () => {
  massive.value.state = true
  inputFile.value.click();
};
const openUploader = () => {
  uploader.value.pickFiles()
}
const onRejectedExist = () => {
  if (uploader.value) {
    uploader.value.reset()
  }
  previewUrl.value = null
  product.value.state = false
}

const readFile = async () => {
  $q.loading.show({ message: 'Subiendo Imagenes' })
  const files = inputFile.value?.files;
  if (!files?.length) {
    console.warn("No se seleccionó ningún archivo.");
    massive.value.state = false;
    return;
  }
  const images = Array.from(files).map(file => {
    const [code] = file.name.split('.');
    return {
      code,
      file
    };
  });

  console.log(images)

  const formData = new FormData();
  images.forEach(img => {
    formData.append('codes[]', img.code);
    formData.append('files[]', img.file);
  });

  const resp = await productApi.massiveUpdateImg(formData)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    inputFile.value = null;
    massive.value.result.state = true
    massive.value.result.val = resp
    $q.notify({
      message: `✅ ${resp.actualizados.length} actualizadas, ⚠️ ${resp.error.length} con error`,
      type: 'info'
    })
    $q.loading.hide();
  }
};

const insertimageExist = (file) => {
  previewUrl.value = URL.createObjectURL(file[0])
  product.value.val.imgcoverExist = file[0]

}

const add = (opt) => {
  console.log(opt)
  product.value.state = true;
  product.value.val = opt;
}

const agregar = (ops) => {
  console.log(ops)
  product.value.state = true;
  product.value.val = ops;
}

const updateImage = async () => {
  $q.loading.show({ message: 'Actualizando Imagen' })
  const formData = new FormData();
  formData.append('id', product.value.val.id)
  formData.append('code', product.value.val.code)
  formData.append('picture', product.value.val.imgcoverExist)
  const resp = await productApi.updateImgProduct(formData)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    uploader.value.reset();
    previewUrl.value = null
    product.value.val.imgcoverExist = null
    product.value.val.imgcover = resp.image
    $q.notify({ message: resp.mssg, type: 'positive', position: 'bottom' })
    $q.loading.hide();
  }
}
watch(() => massive.value.result.state, (val) => {
  if (!val) {
    massive.value.result.val = { actualizados: [], error: [] };
    massive.value.state = false
  }
});


</script>
<style lang="scss">
.seeme {
  border: 2px solid green !important;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
</style>
