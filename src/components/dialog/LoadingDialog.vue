<script setup lang="ts">
import type { LoadingStep } from '@/helpers/useLoadingSteps';
import ProgressBar from '../ProgressBar.vue';

defineProps<{
  step: LoadingStep | null;
}>();
</script>

<template>
  <div>
    <h2 class="text-xl sm:text-3xl text-center mb-4">
      {{ step?.message }}
    </h2>
    <ProgressBar :percentage="step ? step.percentage : 0" />
  </div>
</template>
