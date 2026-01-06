<template>
  <canvas ref="canvas" width="260" height="200" class="robot-canvas" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)
let ctx
let loadingPhase = 0
const state = ref('idle')
let eyeOffsetX = 0
let blink = false
let blinkTick = 0
let breatheTick = 0
let breatheOffset = 0
let headTilt = 0
let targetHeadTilt = 0
let headDown = 0
let targetHeadDown = 0
let bounce = 0
let bounceVelocity = 0

onMounted(() => {
  ctx = canvas.value.getContext('2d')
  requestAnimationFrame(loop)
})

const loop = () => {
  ctx.clearRect(0, 0, 220, 170)

  if (state.value === 'idle') {
    breatheTick += 0.03
    breatheOffset = Math.sin(breatheTick) * 2
  } else {
    breatheOffset *= 0.9
  }

  if (state.value === 'idle') {
    blinkTick += 0.02
    if (blinkTick > 3) {
      blink = true
      setTimeout(() => (blink = false), 120)
      blinkTick = 0
    }
  }
  if (state.value === 'user') {
    targetHeadTilt = 0.08
    targetHeadDown = 4
  } else if (state.value === 'password') {
    targetHeadTilt = 0.14
    targetHeadDown = 7
  } else {
    targetHeadTilt = 0
    targetHeadDown = 0
  }

  headTilt += (targetHeadTilt - headTilt) * 0.08
  headDown += (targetHeadDown - headDown) * 0.08
  bounceVelocity += -bounce * 0.15
  bounceVelocity *= 0.7
  bounce += bounceVelocity
  drawRobot()
  requestAnimationFrame(loop)
}

const drawRobot = () => {
  ctx.save()
  ctx.translate(0, breatheOffset)
  ctx.save()
  ctx.translate(110, 95 + headDown + bounce)
  ctx.rotate(headTilt)
  ctx.translate(-110, -95)
  drawAntenna()
  drawHead()
  drawEyes()
  ctx.restore()
  ctx.restore()
}

const drawAntenna = () => {
  ctx.strokeStyle = '#039be5'
  ctx.lineWidth = 3

  ctx.beginPath()
  ctx.moveTo(110, 18)
  ctx.lineTo(110, 50)
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(110, 15, 5, 0, Math.PI * 2)
  ctx.fillStyle = '#039be5'
  ctx.fill()
}

const drawHead = () => {
  ctx.fillStyle = '#039be5'
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 3

  ctx.beginPath()
  ctx.roundRect(30, 45, 160, 100, 18)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = '#fff'
  ctx.beginPath()
  ctx.roundRect(55, 70, 110, 55, 30)
  ctx.fill()
}

const drawEyes = () => {
  const x = 90
  const y = 85

  if (state.value === 'password' || blink) {
    drawClosedEyes(x, y)
    return
  }

  if (state.value === 'error') {
    drawErrorEyes(x, y)
    return
  }

  let offset = 0
  if (state.value === 'user') offset = eyeOffsetX
  if (state.value === 'loading') {
    drawLoadingEyes(x, y)
    return
  }
  ctx.fillStyle = '#039be5'
  ctx.fillRect(x + offset, y, 8, 24)
  ctx.fillRect(x + 35 + offset, y, 8, 24)
}



const drawLoadingEyes = (x, y) => {
  ctx.strokeStyle = '#039be5'
  ctx.lineWidth = 4
  ctx.lineCap = 'round'

  const radius = 9
  const gap = 35
  const cy = y + 10

  loadingPhase += 0.05
  if (loadingPhase > Math.PI * 2) loadingPhase = 0

  ctx.beginPath()
  ctx.arc(
    x,
    cy,
    radius,
    loadingPhase,
    loadingPhase + Math.PI * 1.5
  )
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(
    x + gap,
    cy,
    radius,
    loadingPhase + Math.PI,
    loadingPhase + Math.PI * 2.5
  )
  ctx.stroke()
}


const drawClosedEyes = (x, y) => {
  ctx.strokeStyle = '#039be5'
  ctx.lineWidth = 3
  ctx.lineCap = 'round'

  const eyeWidth = 10
  const eyeHeight = 12
  const gap = 35
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + eyeWidth, y + eyeHeight / 2)
  ctx.lineTo(x, y + eyeHeight)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x + gap + eyeWidth, y)
  ctx.lineTo(x + gap, y + eyeHeight / 2)
  ctx.lineTo(x + gap + eyeWidth, y + eyeHeight)
  ctx.stroke()
}

const drawErrorEyes = (x, y) => {
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 3

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + 8, y + 24)
  ctx.moveTo(x + 8, y)
  ctx.lineTo(x, y + 24)

  ctx.moveTo(x + 34, y)
  ctx.lineTo(x + 42, y + 24)
  ctx.moveTo(x + 42, y)
  ctx.lineTo(x + 34, y + 24)

  ctx.stroke()
}


const setUser = () => state.value = 'user'
const setPassword = () => state.value = 'password'
const setIdle = () => state.value = 'idle'
const setLoading = () => state.value = 'loading'

const setError = () => {
  state.value = 'error'
  setTimeout(() => state.value = 'idle', 1200)
}

const setSuccess = () => {
  blink = true
  setTimeout(() => blink = false, 600)
}

const typing = val => {
  eyeOffsetX = Math.min(val.length * 1.1, 10)
  bounceVelocity -= 2
}

defineExpose({
  setUser,
  setPassword,
  setIdle,
  setLoading,
  setError,
  setSuccess,
  typing
})
</script>


<style scoped>
.robot-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

canvas {
  max-width: 100%;
}
</style>
