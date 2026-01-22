<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div
        v-for="user in users"
        :key="user.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card flat bordered class="full-height">
          <q-card-section class="row items-center no-wrap">
            <q-avatar size="48px">
              <img :src="avatarUrl(user.avatar)" />
            </q-avatar>

            <div class="q-ml-sm">
              <div class="text-weight-medium">
                {{ user.name }} {{ user.surnames }}
              </div>
              <div class="text-caption text-grey">@{{ user.nick }}</div>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-caption text-grey">
              {{ user.email }}
            </div>

            <div class="row q-mt-sm">
              <q-chip dense color="primary" text-color="white">
                {{ user.rol.name }}
              </q-chip>

              <q-chip
                dense
                class="q-ml-xs"
                :color="user.state.name === 'Activo' ? 'green' : 'grey'"
                text-color="white"
              >
                {{ user.state.name }}
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVDBStore } from "stores/VDB";
import { UserStore } from "stores/UsersStore";
import { computed, ref, onMounted, watch, onBeforeUnmount } from "vue";
import { exportFile, useQuasar, date } from "quasar";
import userApi from "src/API/UserApi.js";
import reportExcel from "src/Excel/Reports/users.js";
import viewRol from "src/components/User/viewRol.vue";
const VDB = useVDBStore();
const $q = useQuasar();
const userLYT = UserStore();
userLYT.setTitle("Usuarios");

const users = ref([]);
const columns = [
  { name: "user", label: "Usuario", field: "name", align: "left" },
  { name: "rol", label: "Rol", field: (row) => row.rol.name },
  { name: "state", label: "Estado", field: (row) => row.state.name },
  { name: "actions", label: "", align: "right" },
];
const avatarUrl = (avatar) => {
  return avatar ? `/avatares/${avatar}` : "/avatares/default.png";
};

const init = async () => {
  const resp = await userApi.getUsers();
  if (resp.fail) {
    console.log(resp);
  } else {
    console.log(resp);
    users.value = resp;
  }
};

init();
</script>
<style scoped>
.q-table td {
  vertical-align: middle;
}
</style>
