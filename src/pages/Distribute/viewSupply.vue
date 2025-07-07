<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header bordered class="bg-white text-dark">
      <q-toolbar>
        <q-btn flat round dense icon="arrow_back" @click="$router.replace('/distribute/supply');" />
        <q-toolbar-title>
          Pedido {{ $route.params.sup }} <span class="text--3" v-if="from">- {{from.alias}} </span>
        </q-toolbar-title>
        {{ supply.val?._suplier }}
        <q-space />
        {{ order.notes}}
        <q-space />
        <q-btn color="pink-5" icon="sync" @click="init" round dense flat />
      </q-toolbar>
      <q-separator />
      <div class="q-px-md q-py-sm">
        <div class="col text-dark row justify-between ">
          <div>Productos: <b>{{productsdb.length}}</b></div>
          <div>Piezas: <b>{{totalpieces}}</b> </div>
        </div>
        <div class="row items-center justify-between q-pt-sm" v-if="ostate&&ostate.id>=3">
          <div><span class="text--2">Contados:</span> <b>{{ counteds.length }}</b></div>
          <div><span class="text--2">Por contar:</span> <b>{{ uncounteds.length }}</b></div>
          <div><span class="text--2">Agotados:</span> <b>{{ soldout.length }}</b></div>
          <div><span class="text--2">Con stock:</span> <b>{{ wstock.length }}</b></div>
        </div>
      </div>
    </q-header>


    <q-page-container>
      <q-page padding>
        <q-table row-key="id" flat
          :rows="basket"
          :columns="table.columns"
          :pagination="table.pagination"
          :filter="table.filter"
          :visible-columns="viewcols"
          @row-click="rowClicked"
         v-if="supply.val">
          <template v-slot:top>
            <div class="full-width row items-center justify-between">
              <q-input dense v-model="table.filter" placeholder="Buscar" input-class="text-uppercase" color="pink-5">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-btn color="secondary" icon="fas fa-eye" no-caps>
                <q-menu style="min-width: 200px">
                  <q-list >
                    <q-item tag="label" v-ripple v-for="(col,idx) in table.columns" :key="idx">
                      <q-item-section>
                        <q-item-label>{{col.label}}</q-item-label>
                        <q-item-label caption>{{col.coldesc}}</q-item-label>
                      </q-item-section>
                      <q-item-section side top>
                        <q-toggle color="pink-5" v-model="viewcols" :val="col.name" @update:model-value="persistViewCols"/>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </template>
        </q-table>

        <q-dialog v-model="wndCounter.state" position="bottom" @hide="iptfinder.focus()">
          <q-card v-if="wndCounter.item">
            <q-card-section>
              <div class="row justify-between">
                <div class="text-left">
                  <div class="text--3">ID: {{ wndCounter.item.id }}</div>
                  <div class="text-h6">{{ wndCounter.item.code }}</div>
                </div>
                <div class="text-right">
                  <div class="text-bold">{{ wndCounter.item.name }}</div>
                  <div class="text--2">{{ wndCounter.item.barcode }}</div>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>{{ wndCounter.item.description }}</q-card-section>

            <q-card-section class="row justify-around items-center">
              <div  class="text-center">
                <div class="text-h6">{{wndCounter.item.pieces}}</div>
                <div class="text--2">Embalaje (org)</div>
              </div>
              <div v-for="stock in wndCounter.item.stocks" :key="stock.id" class="text-center">
                <div class="text-h6">{{stock.pivot.gen}}</div>
                <div class="text--2">{{stock.alias}}</div>
              </div>
            </q-card-section>

            <q-form @submit.prevent="setDeliveryProduct">
              <q-card-section>
                <div class="row items-start justify-between">
                  <div class="text-center col">
                    <div>Solicitud</div>
                    <div class="text-bold">
                      {{ wndCounter.item.pivot.amount }} {{ wndCounter.item.pivot._supply_by==3? `Caja${wndCounter.item.pivot.amount!=1?'s':''}`: wndCounter.item.pivot._supply_by==2? `Docena${wndCounter.item.pivot.amount!=1?'s':''}` : `Pieza${wndCounter.item.pivot.amount!=1?'s':''}` }}</div>
                  </div>

                  <div class="text-center col">
                    <div>Conteo</div>
                    <q-input dense borderless v-model="wndCounter.form.count" type="number" min="0" input-class="text-h6 text-center" ref="iptcounter"/>
                  </div>

                  <div class="text-center col">
                    <div>PxC</div>
                    <q-input dense borderless v-model="wndCounter.form.ipack" type="number" input-class="text-h6 text-center"  />
                  </div>

                  <div class="text-center col">
                    <div>Piezas</div>
                    <div class="text-bold">{{ wndCounter.item.pivot._supply_by==3 ? (wndCounter.form.count*wndCounter.form.ipack) : wndCounter.item.pivot._supply_by==2 ? (wndCounter.form.count*12) :wndCounter.form.count}}</div>
                  </div>
                </div>
              </q-card-section>

              <q-btn color="primary" type="submit" square icon="check" no-caps class="q-mt-md q-py-md full-width"/>
            </q-form>
          </q-card>
        </q-dialog>

        <q-dialog v-model="wndNextState.state">
          <q-card>
            <q-card-section class="row items-start">
              <q-avatar icon="warning" color="orange-14" text-color="white" />
              <div class="q-ml-md">
                <div class="text-h6">Deseas terminar el surtido?</div>
                <div>La orden se encolara para verificacion</div>
              </div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="No" color="primary" v-close-popup no-caps/>
              <q-btn flat label="Si" color="primary" @click="nextState" />
            </q-card-actions>
          </q-card>
        </q-dialog>


        <q-dialog v-model="selsupply" persistent>
          <q-card style="width: 400px;">
            <q-card-section class="row items-center">
            <div>Quien eres?</div>
            </q-card-section>
            <q-card-section>
              <q-select v-model="supply.val" :options="supply.opts" label="Surtidor" option-label="_suplier" option-value="_suplier_id" filled @update:model-value="setPartition" :option-disable="(i) => i._status != 3 ? true : false" >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q-item-label>{{ scope.opt._suplier }}</q-item-label>
                      <q-item-label caption lines="2">{{scope.opt.status.name}}</q-item-label>
                    </q-item-section>
                  </q-item>

                </template>
              </q-select>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Continuar" color="primary" v-close-popup :disable="supply.val ? false : true"  />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>



      <q-footer bordered class="bg-primary text-dark q-pa-sm row" elevated v-if="partition?._status == 3">
        <q-input color="white" v-model="finder" type="text" class="col" input-class="text-white text-h6 text-center text-uppercase" autofocus dense @keypress.enter="searchToSet" ref="iptfinder">
          <template v-slot:prepend>
            <q-icon name="fas fa-barcode" color="white" />
          </template>
          <template v-slot:append>
            <q-btn flat icon="fas fa-eraser" color="white" dense @click="finder=''" :disabled="!finder.length"/>
          </template>
        </q-input>
        <q-btn color="white" text-color="cyan-9" label="Terminar" icon="done" @click="wndNextState.state=true" v-if="counteds.length>0" no-caps/>
      </q-footer>
      <q-footer v-if="partition?._status != 3" bordered class="bg-orange-9 text-white">
        <div class="q-pa-md text-bold text-uppercase text-center">{{ partition?.status.name }}</div>
      </q-footer>
    </q-page-container>

  </q-layout>
</template>

<script setup>
  import { ref, onMounted, computed, watch, nextTick } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import dayjs from 'dayjs';
  import RestockApi from 'src/API/RestockApi.js';
  // import AssistApi from 'src/API/AssistApi.js';
  import { useQuasar } from 'quasar';
  import { $sktRestock, usrSkt } from 'boot/socket';

  const $route = useRoute();
  const $router = useRouter();
  const $q = useQuasar();

  const user_socket = usrSkt;

  const wndNextState = ref({
    state:false
  })

  const prodschecks = ref([]);
  const order = ref([]);
  const selsupply  = ref(true);
  const supply = ref({
    val:null,
    opts:[]
  });
  const viewcols = ref(["code", "notes","locs", "request", "uspply", "stocks", "delivery"]);
  const from = ref(null);
  const productsdb = ref([]);
  const finder = ref("");
  const iptfinder = ref(null);
  const ostate = ref(null);
  const iptcounter = ref(null);
  const table = ref({
    columns:[
      { name:'id', label:'ID', field:'id', align:"left", coldesc:"Identificador del producto (MySQL)" },
      { name:'code', label:'Codigo', field:'code', align:"left", coldesc:"Codigo principal del producto" },
      { name:'assocs', label:'Asociados', field: row => row.variants.length ? row.variants.map( p => p.barcode).join(', ') : null, align:"left", coldesc:"Codigos relacionados al codigo principal" },
      { name:'bcode', label:'Codigo de Barras', field:'barcode', align:"center", coldesc:"Codigo de barras principal" },
      { name:'notes', label:'Notas', field: row => row.pivot.comments, align:"left" },
      { name:'locs', label:'Ubicacion', field: row => row.locations.length ? row.locations.map( l => l.path ).join(", ") :'--', align:"left", coldesc:"Ubicaciones en almacen general", sortable:true},
      { name:'ipack', label:'PxC', field: row => typeof row.pivot.ipack=="number" ? row.pivot.ipack:row.pieces, align:"center", coldesc:"Unidades x Embalaje" },
      { name:'request', label:'Solicitud', field: row => row.pivot.amount, align:"center", coldesc:"Embalaje solicitado" },
      { name:'uspply', label:'Unidad', field: row => row.pivot._supply_by==3? 'Cajas' : row.pivot._supply_by==2? 'Docenas': 'Piezas', align:'left', coldesc:"Unidad de embalaje del producto"},
      { name:'stocks', label:'Stock (pzs)', field: row => row.stocks.reduce((am,s) => am+(s.pivot.stock),0), sortable:true, classes:row => row.stocks.reduce((am,s) => am+(s.pivot.stock),0)<=0?'text-red text-bold':'text-bold text-primary', align:'center', coldesc:"Stock total en almacenes GENERALES (CEDIS+PAN)" },
      { name:'delivery', label:'Conteo', field: row => row.pivot.toDelivered, align:'center', coldesc:"Embalaje surtido"},
      {
        name:'reqinpzs',
        label:'Piezas',
        field: row => row.pivot._supply_by==3 ?
          ((typeof row.pivot.ipack=="number" ? row.pivot.ipack:row.pieces)*(typeof row.pivot.ipack=="number" ? row.pivot.toDelivered:row.pivot.amount)) : (typeof row.pivot.ipack=="number" ? row.pivot.toDelivered:row.pivot.amount),
        align:'center',
        coldesc:"Unidades totales en embalaje"
      },
      { name:'checkout', label:'Checkout', 'field':row => row.pivot.checkout, coldesc:"Revision del Administrador"},
      { name:'descr', label:'Descripcion', field:'description', align:"left" },
      { name:'section', label:'Seccion', field:'section', align:"left" },
      { name:'family', label:'Familia', field:'family', align:"left" },
      { name:'category', label:'Categoria', field:'category', align:"left" },

    ],
    filter:'',
    pagination:{
      sortBy: 'locs',
      descending:false,
      rowsPerPage:20
    }
  });

  const wndCounter = ref({
    state:false,
    item:null,
    form:{ count:0, ipack:null, setting:false }
  });

  const partition = ref(null)


  const enabledEditor = computed(() => ostate.value ? ostate.value.id==3 : false );// status de la particion
  const totalpieces = computed(() => basketSupply.value.reduce( (am,p) => (am + (p.pivot._supply_by==3 ? (p.pivot.amount*p.pieces): p.pivot.amount)) ,0));
  const uncounteds = computed(() => basketSupply.value.filter( p => typeof p.pivot.toDelivered != "number"));
  const counteds = computed(() => basketSupply.value.filter( p => typeof p.pivot.toDelivered == "number"));
  const soldout = computed(() => counteds.value.filter( p => p.pivot.toDelivered==0));
  const wstock = computed(() => counteds.value.filter( p => p.pivot.toDelivered>0));
  const basketSupply = computed(() => supply.value.val ?  productsdb.value.filter(e => e.pivot._suplier_id == supply.value.val._suplier_id) :[])
  const basket = computed(() => {
    let target = finder.value.toUpperCase().trim();
    return target.length ? basketSupply.value.filter( p => (p.code.match(target) || (p.barcode && p.barcode.match(target)) ) ) : basketSupply.value;
  });

  const init = async() => {
    $q.loading.show({ message:"Cargando..." });
    console.log("Iniciando...");
    console.log($route.params.sup)
    const response = await RestockApi.order($route.params.sup);
    console.log(response);
    $sktRestock.connect();
    $sktRestock.emit("joinat", user_socket);

    if(response.status==200){
      productsdb.value = response.data.products;
      supply.value.opts = response.data.partition
      order.value = response.data
      ostate.value = response.data.status;
      from.value = response.data.from;
      $q.loading.hide()
    }else{ alert(`Error ${response.status}: ${response.data}`);  }
  }

  const setPartition = (a) => {
    partition.value = a
  }

  const rowClicked = (a,row,b) => partition.value._status == 3 ? openEditor(row):null;

  const openEditor = (item) => {
    wndCounter.value.item = item;
    wndCounter.value.form.count = typeof item.pivot.toDelivered=="number" ? item.pivot.toDelivered:0;
    wndCounter.value.form.ipack = typeof item.pivot.ipack=="number" ? item.pivot.ipack:item.pieces;
    wndCounter.value.state = true;

    nextTick(() => {
      iptcounter.value.focus();
      iptcounter.value.select();
    });
  }

  const searchToSet = () => {
    let target = finder.value.toUpperCase().trim();
    if(target.length){
      let item = basket.value.length == 1 ? basket.value[0] : basket.value.find( p => (p.code==target||p.barcode==target));
      if(item){ openEditor(item); }else{
        $q.notify({
          message:`Sin coincidencias para <b>${target}</b>`,
          color:"pink-5", position:"center", html:true
        });
      }
    }
  }

  const setDeliveryProduct = async () => {
    const toDelivery = parseInt(wndCounter.value.form.count);
    const ipack = parseInt(wndCounter.value.form.ipack);

    const data = {
      "order":$route.params.sup,
      "product":wndCounter.value.item.id,
      "delivery":toDelivery,
      "ipack":ipack,
      "checkout":false
    }

    const response = await RestockApi.setDeliveryProduct(data);
    console.log(response);

    if(response.status==200){
      let idx = productsdb.value.findIndex( p => p.id == wndCounter.value.item.id );
      productsdb.value[idx].pivot.toDelivered = toDelivery;
      productsdb.value[idx].pivot.ipack = ipack;
      wndCounter.value.state=false;
      finder.value = "";

      $q.notify({ color:"positive", icon:"done", position:"right", message:"", timeout:1000 });

    }else{ alert(`Error ${response.status}: ${response.data}`); }
  }

  const persistViewCols = () => {
    console.log("Hola");
  }


  const nextState = async () => {//cambiar status solo a la particion // tambien no se te olvide que lo puedes poner en por surtir cuando seleccionen al validador para que cuando muestren se ponga en el 3 y pueda quitarse el surtidor
    console.log("Finalizando particion");
    console.log(order.value.id);

    let _id = order.value.id;

    $q.loading.show({ message: "Terminando, espera..." });
    wndNextState.value.state = false;

    let data = {id:$route.params.sup,state:4,suply: supply.value.val._suplier_id };
    console.log(data);
    const response = await RestockApi.nextStatePartition(data);
    console.log(response);
    partition.value._status = response.data.partition._status
    partition.value.status.name = response.data.partition.name
    if(response.data.partitionsEnd > order.value._status){
      let nes = {id:$route.params.sup,state:response.data.partitionsEnd};
      const nxt = await RestockApi.nextState(nes);
      console.log(nxt);
    }
    $sktRestock.emit("orderpartition_refresh", { order: _id });

    if(response.status==200){
      init();
    }

    $q.loading.hide();
  }

  init();

</script>
