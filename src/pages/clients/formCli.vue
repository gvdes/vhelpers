<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-toolbar class="justify-between">
          <div>
            <span class="text-grey">Helpers</span>
            <q-icon name="navigate_next" color="primary" />
            <span class="text-h6">Formulario Clientes</span>
          </div>
          <div class="row">
            <q-btn flat round icon="search" color="teal" @click="sar.state = !sar.state" title="Buscar" />
          </div>
        </q-toolbar>
      </q-card-section>
    </q-card>
    <q-separator spaced inset vertical dark />
    <div class="flex flex-center">

      <q-card flat style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <q-form @submit="saveQuote" class="q-gutter-md ">
            <div>
              <q-card-section class="">
                <div class="text-h4 text-center text-bold" style=" text-decoration: underline;">Datos cliente</div>
              </q-card-section>
              <q-input rounded outlined v-model="form.name" label="Nombre del Cliente" class="q-my-sm"> </q-input>
              <div class="row q-my-sm">
                <q-input rounded outlined v-model="form.address.cp" label="Codigo Postal" mask="#####" class="col">
                </q-input>
                <q-input rounded outlined v-model="form.address.state" label="Estado" class="col"> </q-input>
              </div>
              <q-input rounded outlined v-model="form.address.colinia" label="Colonia" class="q-my-sm"> </q-input>
              <q-input rounded outlined v-model="form.address.mun" label="Municipio" class="q-my-sm"> </q-input>
              <q-input rounded outlined v-model="form.address.street" label="Calle" class="q-my-sm"> </q-input>
              <div class="row  q-my-sm">
                <q-input rounded outlined v-model="form.address.numint" label="Num INT" class="col"> </q-input>
                <q-input rounded outlined v-model="form.address.numext" label="Num EXT" class="col"> </q-input>
              </div>
              <q-input rounded outlined v-model="form.phone" label="Telefono" mask="##-####-####" class="q-my-sm"
                :error="validPhone != null" :error-message="`Ya existe el numero con otro cliente ${validPhone?.name}`">
              </q-input>
              <q-input rounded outlined v-model="form.email" label="Correo Electronico" class="q-my-sm"
                :error="validMail != null" :error-message="`Ya existe el correo con otro cliente ${validMail?.name}`">
              </q-input>
              <q-separator spaced inset vertical dark />
              <q-uploader dense hide-upload-btn label="Fotografia" color="primary" accept=".jpg" @added="insertImage"
                @removed="() => form.picture = null" ref="refe" class="full-width" max-file-size="2097152"
                @rejected="Reject" />
              <q-card-section class="">
                <div class="text-h4 text-center " style=" text-decoration: underline;">Datos Sucursal</div>
              </q-card-section>
              <q-input rounded outlined v-model="form.ticket" label="Ticket" mask="#-######" class="q-my-sm"> </q-input>
              <q-select rounded outlined v-if="form.branch" option-label="complete_name" v-model="form.agent.val"
                :options="fillAgents" label="Quien atendio" class="q-my-sm" />
              <q-select rounded outlined v-model="form.priceList.val" :options="form.priceList.opts"
                label="Precio Otorgado" class="q-my-sm" />
              <q-input rounded outlined v-model="form.notes" label="Notas" class="q-my-sm"> </q-input>
            </div>
            <div v-if="isFormValid">
              <q-btn label="Enviar" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="sar.state">
      <q-card class="my-card" style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h4">
            <q-icon name="search" class="q-mr-xs" />
            Buscador de Clientes
          </div>
          <q-card-section>
            <div class="row justify-between">
              <q-input class="col" v-model="cl_finder.val" type="text" label="Buscar" />
            </div>
            <q-separator spaced inset vertical dark />
            <div>
              <q-table :rows="clients" :columns="cl_finder.table.cols" row-key="name"
                :no-data-label="cl_finder.table.noresults" :filter="cl_finder.val"
                @row-click="(a, b) => { moscli.state = !moscli.state; moscli.val = b }" />
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="moscli.state" persistent>
      <q-card style="width: 900px; max-width: 100vw;">
        <q-card-section class="text-center text-bold text-h5">
          {{ moscli.val.name }}
          <q-space />
          <div v-if="moscli.val.picture">
            <q-avatar size="150px"> <img :src="`${vizmedia}/client/${moscli.val.picture}`"> </q-avatar>
          </div>
          <div v-else>
            <q-btn v-if="!moscli.val.pictureExist" color="teal" flat icon="person_add" @click="openUploader"
              size="52px" />
            <q-uploader ref="uploader" accept=".jpg" @added="insertimageExist" hide-upload-btn style="display: none;"
              field-name="file" />
            <div v-if="previewUrl" class="q-mt-md">
              <q-avatar size="150px"> <q-img :src="previewUrl" /></q-avatar>
            </div>
          </div>

        </q-card-section>
        <q-card-section>
          <q-list bordered>
            <q-item>
              <q-item-section class="text-center">
                <q-item-label>Celular</q-item-label>
                <q-item-label>{{ moscli.val.phone }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-center">Correo</q-item-label>
                <q-item-label>{{ moscli.val.email }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="onRejectedExist" />
          <q-btn flat label="Enviar" color="primary" :disable="!moscli.val.pictureExist" @click="updateImage" />
        </q-card-actions>
      </q-card>
    </q-dialog>


  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import clientApi from 'src/API/clientApi.js';
import { useQuasar } from 'quasar';
import { vizmedia } from "boot/axios"
import { useVDBStore } from 'stores/VDB';
import axios from 'axios'

const VDB = useVDBStore();
const $q = useQuasar();
const uploader = ref(null)
const previewUrl = ref(null)
const sar = ref({ state: false });
const clients = ref([]);
const refe = ref(null)
const moscli = ref({
  state: false,
  val: null
})
const cl_finder = ref({
  state: false,
  table: {
    cols: [
      { name: 'Fs_id', label: 'Codigo', field: 'id', align: 'center' },
      { name: 'Nombre', label: 'Nombre', field: 'name', align: 'left' },
      { name: 'Email', label: 'Correo', field: 'email', align: 'left' },
      { name: 'Telefono', label: 'Telefono', field: 'phone', align: 'left' },
      { name: 'Tarifa', label: 'Precio', field: '_price_list', align: 'center' },
    ],
    noresults: "><"
  }
});


const form = ref({
  branch: VDB.session.store.id,
  name: null,
  ticket: null,
  address: {
    street: null,
    numint: null,
    numext: null,
    cp: null,
    colinia: null,
    mun: null,
    state: null
  },
  phone: null,
  email: null,
  priceList: {
    val: null, opts: [
      { id: 2, label: "Mayoreo" },
      { id: 3, label: "Docena" },
      { id: 4, label: "Caja" },
      { id: 5, label: "Especial" },
      { id: 6, label: "Centro" }]
  },
  agent: {
    db: [], val: null, opts: []
  },
  notes: null,
  state: false,
  picture: null
});

const isFormValid = computed(() => (form.value.priceList.val && (form.value.name && form.value.name.length > 4) && ((form.value.phone && form.value.phone.length == 12) || (form.value.email)) && form.value.agent && form.value.ticket && form.value.address.street && form.value.address.state && form.value.address.mun && form.value.picture))
const fillAgents = computed(() => form.value.agent.db.filter(e => e._store == VDB.session.store.id))
const validMail = computed(() => clients.value.find(e => e.email == form.value.email));
const validPhone = computed(() => clients.value.find(e => e.phone == form.value.phone?.split("-").join("")));


const insertImage = (file) => {
  console.log(file)
  if (file.length > 0) {
    form.value.picture = file[0]
  }
}

const Reject = (e) => {
  console.log(e)
  $q.notify({ message: `${e[0].failedPropValidation}`, type: 'negative', position: 'center' })
}

const index = async () => {
  $q.loading.show({ message: 'Obteniendo Datos' })
  const resp = await clientApi.index()
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp);
    clients.value = resp.clients
    form.value.agent.db = resp.agents
    $q.loading.hide();
  }
}

const saveQuote = async () => {
  $q.loading.show({message:'Creando Solicitud'})
  console.log(form.value)
  form.value.state = true;
  const formData = new FormData();
  formData.append('branch', form.value.branch)
  formData.append('name', form.value.name.toUpperCase())
  formData.append('ticket', form.value.ticket)
  formData.append('address', JSON.stringify(form.value.address))
  formData.append('phone', form.value.phone ? form.value.phone.split("-").join("") : null)
  formData.append('email', form.value.email ? form.value.email : null)
  formData.append('priceList', form.value.priceList.val.id)
  formData.append('agent', form.value.agent.val)
  formData.append('notes', form.value.notes)
  formData.append('picture', form.value.picture)
  const resp = await clientApi.create(formData);
  if (resp.fail) {
    console.log(resp)
  } else {
    clearForm();
    form.value.state = false;
    $q.loading.hide()
    $q.notify({
      message: "Formulario Enviado....",
      icon: 'check_circle',
      color: 'positive'
    });
    console.log(resp)
    clearForm();
  }
}
const clearForm = () => {
  form.value.ticket = null
  form.value.priceList.val = null
  form.value.name = null
  form.value.agent.val = null
  form.value.address = {
    street: null,
    numint: null,
    numext: null,
    cp: null,
    colinia: null,
    mun: null,
    state: null
  }
  form.value.phone = null
  form.value.email = null
  form.value.notes = null
  form.value.picture = null
  refe.value.reset()
}

const openUploader = () => {
  uploader.value.pickFiles() // método nativo del q-uploader
}

const insertimageExist = (file) => {
  previewUrl.value = URL.createObjectURL(file[0])
  moscli.value.val.pictureExist = file[0]
}

const onRejectedExist = () => {
  if (uploader.value) {
    uploader.value.reset()
  }
  previewUrl.value = null
  moscli.value.state = false
}

const updateImage = async () => {
  $q.loading.show({message:'Actualizando Imagen'})
  const formData = new FormData();
  formData.append('id', moscli.value.val.id)
  formData.append('picture', moscli.value.val.pictureExist)
  const resp = await clientApi.updateImageClient(formData)
  if (resp.fail) {
    console.log(resp)
  } else {
    console.log(resp)
    uploader.value.reset();
    previewUrl.value = null
    moscli.value.val.pictureExist = null
    moscli.value.val.picture = resp.image
    $q.notify({message:resp.mssg,type:'positive',position:'bottom'})
    $q.loading.hide();
  }
}

index();
</script>
