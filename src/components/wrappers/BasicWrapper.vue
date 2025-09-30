<script setup lang="ts">
import { fireConfetti } from '@/helpers/fireConfetti';

function applyEffects() {
  fireConfetti();
}

function removeEffects() {}

defineExpose({
  applyEffects,
  removeEffects,
});
</script>

<template>
  <div class="w-full h-full">
    <slot />
  </div>
</template>
