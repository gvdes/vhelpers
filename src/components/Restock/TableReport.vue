<template>
  <q-table
    row-key="ID"
    :rows="rows"
    :columns="table.columns"
    :filter="table.filter"
    @row-click="actionRow"
  >
    <template v-slot:top>
      <div class="text-h6">{{ name }}</div>
      <div class="row q-mt-md">
        <q-btn :color="actionBtn.c" icon="warning" :label="actionBtn.l" @click="displayWndConfirm"/>
        <q-input v-model="table.filter" dense type="text" icon="search" label="Buscar">
          <template v-slot:prepend><q-icon name="search" /></template>
        </q-input>
      </div>
    </template>
  </q-table>

  <q-dialog v-model="wndConfirm.state" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" :color="wndConfirm.action.c" text-color="white" />
        <span class="q-ml-sm text-h6">{{wndConfirm.action.l}}</span>
      </q-card-section>
      <q-card-section>{{wndConfirm.action.desc}}</q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="cancelar" color="primary" v-close-popup />
        <q-btn flat label="continuar" color="primary" @click="confirmAction" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>

  import { computed, ref } from 'vue';
  import { useQuasar } from 'quasar';
  import RestockApi from 'src/API/RestockApi';
  import { useRestockStore } from 'stores/Restock';

  const $restockStore = useRestockStore();
  const $q = useQuasar();

  const wndConfirm = ref({ state:false, action:null });

  const table = ref({
    columns:[
      { name:'ID', field:'ID', label:'ID', align:'center', },
      { name:'code', field:'CODIGO', label:'Codigo', align:'center', sortable:true },
      { name:'desc', field:'DESCRIPCION', label:'Descripcion', align:"left" },
      { name:'stockcedis', field:'CEDIS', label:'Stock (CEDIS)', align:"center", sortable:true },
      { name:'stockpan', field:'PANTACO', label:'Stock (PAN)', align:"center", sortable:true },
    ],
    filter:""
  });

  const ask = {
    "pndcs":{ "l":"Habilitar todo", "c":"indigo-13", desc:"Los productos en esta lista se habilitaran y podran ser solicitados por cuaqluier tienda." },
    "pdss":{ "l":"Deshabilitar todo", "c":"pink-13", desc:"Los productos en esta lista se deshabilitaran y no podran ser solicitados." }
  }

  const $emit = defineEmits(["cardResumeActived"]);

  const props = defineProps({
    rows:{ type:Array, default:[] },
    name:{ type:String, default:"" },
    type:{ type:String, default:"" },
  });

  const rows = ref(props.rows);
  const name = ref(props.name);
  const type = ref(props.type);

  const actionBtn = computed(() => type.value ? ask[type.value] : {"l":"","c":""});

  const displayWndConfirm = () => {
    const opt = ask[type.value];
    wndConfirm.value.action = opt;
    wndConfirm.value.state = true;
  }

  const confirmAction = async () => {
    $q.loading.show({ message:"Espera..." });

    const response = await RestockApi.massiveAction({action:type.value});
    console.log(response);

    if(response.status==200){
      let data = response.data;
      wndConfirm.value.state=false;
      wndConfirm.value.action=null;
      $q.loading.hide();
      $q.notify({ position:"center", color:"positive", icon:"done" });
      $emit("cardResumeActived");
    }else{
      console.error(response.data);
      alert(`Error ${response.status}: ${response.data.msg}`);
    }
  }

  const actionRow = (a,b,c) => {
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(type.value);
  }
</script>
