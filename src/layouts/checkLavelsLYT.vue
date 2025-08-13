<template>
  <q-layout>
    <q-header class="transparent text-dark" bordered>
      <UserToolbar />
      <q-separator />
    </q-header>

    <q-page-container>
      <q-page padding>
        <q-btn label="Tomar Foto y Analizar" color="primary" @click="capturePhoto" />

        <div style="position: relative; display: inline-block; margin-top: 16px;">
          <video ref="video" autoplay playsinline style="width: 100%;"></video>
          <canvas ref="canvas" style="position: absolute; top: 0; left: 0;"></canvas>
        </div>

        <div v-if="codes.length" style="margin-top: 16px;">
          <h5>Códigos detectados:</h5>
          <ul>
            <li v-for="(code, index) in codes" :key="index">
              {{ code.code }} (v{{ code.version }})
              <span :style="{ color: code.valid ? 'green' : 'red' }">
                ({{ code.valid ? 'Válido' : 'No válido' }})
              </span>
            </li>
          </ul>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'
import UserToolbar from 'src/components/UserToolbar.vue'

const video = ref(null)
const canvas = ref(null)
const codes = ref([])
let ctx = null
let codeReader = null

// Lista de códigos válidos
const validCodes = [
  { code: 61732, version: 287 },
  { code: 12345, version: 1 }
]

// Inicializar cámara trasera si es posible
const initCamera = async () => {
  if (!video.value) return
  let stream
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: "environment" }, width: 1920, height: 1080 }
    })
  } catch {
    stream = await navigator.mediaDevices.getUserMedia({ video: true })
  }

  video.value.srcObject = stream
  await new Promise(resolve => {
    video.value.onloadedmetadata = () => resolve()
  })
}

// Inicializar cámara al montar
onMounted(async () => {
  await nextTick()
  try {
    await initCamera()
  } catch (err) {
    console.error("No se pudo acceder a la cámara", err)
  }
})

// Función para capturar la foto y analizar
const capturePhoto = async () => {
  if (!video.value || !canvas.value) return

  ctx = canvas.value.getContext('2d')
  canvas.value.width = video.value.videoWidth
  canvas.value.height = video.value.videoHeight
  ctx.drawImage(video.value, 0, 0)

  const imageData = canvas.value.toDataURL('image/png')

  if (!codeReader) codeReader = new BrowserMultiFormatReader()

  try {
    const result = await codeReader.decodeFromImage(undefined, imageData)

    let codeObj
    try {
      codeObj = JSON.parse(result.getText())
    } catch {
      console.warn("Código no es JSON válido:", result.getText())
      return
    }

    const exists = codes.value.some(c => c.code === codeObj.code && c.version === codeObj.version)
    if (!exists) {
      const isValid = validCodes.some(vc =>
        vc.code === codeObj.code && vc.version === codeObj.version
      )
      codes.value.push({ ...codeObj, valid: isValid })
    }

    // Dibujar recuadro
    const points = result.getResultPoints()
    if (points && points.length > 0) {
      ctx.beginPath()
      ctx.moveTo(points[0].getX(), points[0].getY())
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].getX(), points[i].getY())
      }
      ctx.closePath()
      ctx.lineWidth = 3
      ctx.strokeStyle = validCodes.some(vc =>
        vc.code === codeObj.code && vc.version === codeObj.version
      ) ? 'lime' : 'red'
      ctx.stroke()
    }

  } catch (err) {
    if (err instanceof NotFoundException) {
      alert("No se detectaron códigos en la foto")
    } else {
      console.error(err)
    }
  }
}
</script>
