<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->
    <q-page-container>
      <q-page class="flex flex-center" padding>
        <div>
          <animateStudio ref="robot" />
          <div class="text-center q-gutter-md q-mb-md text-h5">
            <div>
              <div class="text-primary text-bold">
                {{ VDB.session.credentials.nick.toUpperCase() }}
              </div>
              <span class="text-grey-7"> Bienvenid@ a</span>
              <span class="text-bold text-red-3">VHelpers</span>
            </div>
          </div>

          <q-card flat style="max-width: 500px">
            <q-card-section> Configura una nueva contraseña: </q-card-section>

            <q-card-section>
              <q-list dense>
                <q-item v-for="rule in rules" :key="rule.label">
                  <q-item-section side>
                    <q-icon
                      :name="rule.ok ? 'check_circle' : 'cancel'"
                      :color="rule.ok ? 'positive' : 'negative'"
                    />
                  </q-item-section>
                  <q-item-section>{{ rule.label }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>

            <q-form
              @submit="setFirstLogin"
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
            >
              <q-card-section>
                <div class="text-center q-pb-md">
                  <q-btn
                    color="negative"
                    flat
                    rounded
                    :icon="inputs.icon"
                    @click="toggleInputs"
                    :disable="btnNext.l"
                  />
                </div>
                <q-input
                  v-model.trim="pass"
                  :type="inputs.type"
                  label="Nueva contraseña"
                  ref="iptpass"
                  input-class="text-center"
                  autofocus
                  :readonly="btnNext.l"
                />
                <q-input
                  v-model.trim="passconfirm"
                  :type="inputs.type"
                  label="Confirmar contraseña"
                  input-class="text-center"
                  ref="iptpassconfirm"
                  :readonly="btnNext.l"
                />
              </q-card-section>

              <q-btn
                v-if="canSubmit"
                label="continuar"
                class="q-py-md full-width"
                unelevated
                type="submit"
                color="positive"
                :loading="btnNext.l"
                :disable="btnNext.d"
              />
            </q-form>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useVDBStore } from "stores/VDB";
import authsApi from "src/API/auth.js";
import animateStudio from "src/components/animateStudio.vue";
const VDB = useVDBStore();
const $q = useQuasar();
const $router = useRouter();

// const piniaAccount = useAccountStore();

const iptpass = ref(null);
const iptpassconfirm = ref(null);
const btnNext = ref({ l: false, d: false });

const pass = ref(null);
const passconfirm = ref(null);

const inputs = ref({ type: "password", icon: "fas fa-eye" });

const hasMinLength = computed(() => pass.value?.length >= 5);
const hasUpper = computed(() => /[A-Z]/.test(pass.value));
const hasLower = computed(() => /[a-z]/.test(pass.value));
const hasNumber = computed(() => /\d/.test(pass.value));
// const hasSymbol = computed(() => /[@$!%*?&#._-]/.test(pass.value));
const samePass = computed(() => pass.value === passconfirm.value && pass.value);

const rules = computed(() => [
  { label: "Mínimo 5 caracteres", ok: hasMinLength.value },
  { label: "Una mayúscula", ok: hasUpper.value },
  { label: "Una minúscula", ok: hasLower.value },
  { label: "Un número", ok: hasNumber.value },
  // { label: "Un símbolo", ok: hasSymbol.value },
  { label: "Coinciden", ok: samePass.value },
]);

const canSubmit = computed(
  () =>
    hasMinLength.value &&
    hasUpper.value &&
    hasLower.value &&
    hasNumber.value &&
    // hasSymbol.value &&
    samePass.value
);

const toggleInputs = () => {
  if (inputs.value.type == "password") {
    inputs.value.type = "text";
    inputs.value.icon = "far fa-eye-slash";
  } else {
    inputs.value.type = "password";
    inputs.value.icon = "far fa-eye";
  }
  iptpass.value.focus();
};

const setFirstLogin = async () => {
  console.log("Guardando cambios...");
  btnNext.value.l = true;
  btnNext.value.d = true;
  const resp = await authsApi.chagePassword({ newpass: passconfirm.value });
  console.log(resp);

  if (resp.fail) {
    console.log(resp.fail);
    console.log(resp.fail.response.data);
  } else {
    $q.notify({
      message: "Contraseña modificada",
      color: "positive",
      icon: "done",
      position: "center",
    });
    $router.replace(`/`);
  }
};
</script>
