<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center  bg-dark text-white">
        <div class="notfound-wrapper ">
          <q-card flat bordered class="card-404">
            <div class="card-body">
              <div class="scene">
                <div class="space">
                  <!-- Big 404 -->
                  <div class="numbers">404</div>

                  <!-- Floating astronaut -->
                  <div class="astronaut" aria-hidden>
                    <svg viewBox="0 0 64 64" width="160" height="170" role="img">
                      <g transform="translate(2,2) scale(0.9)">
                        <circle cx="32" cy="20" r="12" fill="#ffffff" opacity="0.95" />
                        <rect x="18" y="30" width="28" height="20" rx="4" ry="4" fill="#f5f5f5" />
                        <circle cx="28" cy="18" r="3" fill="#333" />
                        <path d="M10 48 C18 42, 46 42, 54 48" stroke="#ddd" stroke-width="2" fill="none" />
                      </g>
                    </svg>
                  </div>

                  <!-- Little comet -->

                  <div class="comet" />



                </div>
              </div>

              <div class="content q-mt-md">
                <h2 class="title">¡Ups! Página no encontrada</h2>
                <p class="subtitle">
                  Parece que este rincón del espacio todavía está en construcción.
                </p>

                <div class="actions q-mt-md text-center">
                  <q-btn
                    color="primary"
                    unelevated
                    @click="goHome"
                    icon="home"
                    label="Ir al inicio"
                    class="q-mr-sm"
                  />
                  <!-- <q-btn
                    color="secondary"
                    flat
                    @click="openDocs"
                    icon="auto_awesome"
                    label="Ver docs"
                  /> -->
                </div>

                <div class="search q-mt-lg">
                  <q-input
                    dense
                    outlined
                    v-model="query"
                    placeholder="Buscar en el sitio..."
                    @keyup.enter="searchSite"
                  >
                    <template #append>
                      <q-btn flat round dense @click="searchSite" icon="search" />
                    </template>
                  </q-input>
                  <!-- <p class="hint q-mt-sm">
                    O prueba:
                    <a @click.prevent="randomTip">ir a la página principal</a> ·
                    <a @click.prevent="randomTip">ver proyectos</a>
                  </p> -->
                </div>
              </div>
            </div>
          </q-card>

          <!-- <footer class="credits q-mt-md">
            ¿Eres desarrollador? Prueba <kbd>quasar dev</kbd> otra vez —
            ¡quizá el servidor se durmió!
          </footer> -->
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const query = ref('')

function goHome() {
  router.push({ path: '/' }).catch(() => {})
}

function openDocs() {
  window.open('https://quasar.dev', '_blank')
}

function searchSite() {
  if (!query.value) {
    goHome()
    return
  }
  router.push({ name: 'search', query: { q: query.value } }).catch(() => {})
}

function randomTip() {
  goHome()
}
</script>

<style scoped>
.notfound-wrapper {
  max-width: 70%;
  width: 100%;
}
.card-404 {
  background: linear-gradient(180deg, rgba(18, 18, 30, 0.95), rgba(10, 10, 20, 0.9));
  border-radius: 16px;
  padding: 28px;
}
.card-body {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}
.scene {
  flex: 1 1 360px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  flex: 1 1 360px;
}
.numbers {
  font-size: 110px;
  font-weight: 800;
  letter-spacing: -6px;
  color: rgba(255, 255, 255, 0.08);
  position: absolute;
  transform: translateY(-10px);
  user-select: none;
}
.astronaut {
  animation: float 5s ease-in-out infinite;
  z-index: 2;
}
@keyframes float {
  0% {
    transform: translateY(0) rotate(-2deg);
  }
  50% {
    transform: translateY(-18px) rotate(2deg);
  }
  100% {
    transform: translateY(0) rotate(-2deg);
  }
}
.comet {
  width: 150px;
  height: 8px;
  border-radius: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.05)
  );
  position: absolute;
  top: 30%;
  right: -10%;
  transform: rotate(-20deg);
  filter: blur(4px);
  animation: sweep 8s linear infinite;
}
@keyframes sweep {
  0% {
    right: -10%;
    opacity: 0;
  }
  40% {
    right: 30%;
    opacity: 1;
  }
  100% {
    right: 120%;
    opacity: 0;
  }
}
.title {
  font-size: 28px;
  margin: 0 0 6px 0;
}
.subtitle {
  color: rgba(255, 255, 255, 0.75);
  margin: 0 0 12px 0;
}
.hint a {
  color: var(--q-primary);
  cursor: pointer;
}
.credits {
  color: rgba(255, 255, 255, 0.35);
  font-size: 13px;
  text-align: center;
}
kbd {
  background: rgba(255, 255, 255, 0.06);
  padding: 4px 8px;
  border-radius: 6px;
}
/* Responsive tweaks */
@media (max-width: 720px) {
  .numbers {
    font-size: 72px;
  }
  .scene {
    padding: 8px;
  }
}
</style>
