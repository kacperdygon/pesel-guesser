<script setup lang="ts">
import { ref } from 'vue';

const shouldShake = ref(false);
const showEffects = ref(false);

function triggerShake() {
  shouldShake.value = true;
  setTimeout(() => {
    shouldShake.value = false;
  }, 50); // Duration of the shake animation
}

function applyEffects() {
  triggerShake();
  showEffects.value = true;
}

function removeEffects() {
  showEffects.value = false;
}

defineExpose({
  applyEffects,
  removeEffects,
});
</script>

<template>
  <div class="w-full h-full" :class="{ shake: shouldShake, vignette: showEffects }">
    <slot />
    <div
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <div
        class="flex transform translate-x-24 translate-y-32 -rotate-4 pointer-events-none"
        v-show="showEffects"
      >
        <img src="/skull-emoji.png" alt="" class="w-24 h-24 pointer-events-none" />
        <img src="/skull-emoji.png" class="w-24 h-24 pointer-events-none" />
      </div>
    </div>
  </div>
</template>

<style>
.shake {
  animation: shake 0.05s;
}

@keyframes shake {
  0% {
    transform: translate(0, 0) scale(1);
  }
  20% {
    transform: translate(-5px, 3px) scale(1.05);
  }
  40% {
    transform: translate(5px, -3px) scale(0.95);
  }
  60% {
    transform: translate(-4px, 2px) scale(1.05);
  }
  80% {
    transform: translate(4px, -2px) scale(0.98);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}

.vignette {
  position: relative;
}

.vignette::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.6) 100%);
  pointer-events: none; /* żeby nie blokować kliknięć */
}
</style>
