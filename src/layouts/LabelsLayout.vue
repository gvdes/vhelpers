<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>

    <q-page-container>
      <q-page padding>
        <q-toolbar>
          <q-toolbar-title>
            <div>Helpers <q-icon name="navigate_next" color="primary" /> <span class="text-h6">Etiquetas</span> </div>
          </q-toolbar-title>
        </q-toolbar>
        <q-separator />
        <q-tabs v-model="tab" class="text-primary">
          <q-route-tab name="products" icon="add_box" label="Productos"  to="/labels/products"  />
          <q-route-tab name="locations" icon="location_on" label="Ubicaciones"  to="/labels/locations" />
        </q-tabs>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useVDBStore } from 'stores/VDB';
import UserToolbar from 'src/components/UserToolbar.vue';// encabezado aoiida
import { computed, ref } from 'vue';
import { assist } from "src/boot/axios";
import ExcelJS from 'exceljs';
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode';
import labels from 'src/Pdf/labels/labels.js'

const tab = ref('products')

</script>
