<script setup lang="ts">
defineProps<{
  percentage: number;
}>();
</script>

<template>
  <div class="h-3 sm:h-4 w-full overflow-hidden stripes rounded-lg">
    <div
      class="h-full w-full bg-gray-300 transition-all duration-300 origin-right"
      :style="{ transform: 'scaleX(' + (100 - percentage) / 100 + ')' }"
    ></div>
  </div>
</template>

<style scoped>
.stripes {
  background-image: repeating-linear-gradient(
    45deg,
    oklch(54.6% 0.245 262.881) 0,
    oklch(54.6% 0.245 262.881) 10px,
    oklch(70.7% 0.165 254.624) 10px,
    oklch(70.7% 0.165 254.624) 20px
  );
  background-size: 28px 28px;
  animation: moveStripes 1s linear infinite;
}

/* Animacja przesuwania pasków */
@keyframes moveStripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 28px 0;
  }
}
</style>
