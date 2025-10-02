<script setup lang="ts">
import ProgressBar from '@/components/ProgressBar.vue';
import { loadingStepMessages } from '@/data';
import { shuffleLoadingSteps } from '@/helpers/shuffleLoadingSteps';
import { useLoadingSteps } from '@/helpers/useLoadingSteps';
import { useAppStore } from '@/stores/appStore';
import { onMounted, watch } from 'vue';

const { currentStep, isLoading, startLoading } = useLoadingSteps();

onMounted(() => {
  const loadingSteps = shuffleLoadingSteps(loadingStepMessages);
  startLoading(loadingSteps);

  watch(isLoading, (newVal) => {
    if (!newVal) {
      useAppStore().setCurrentView('result');
    }
  });
});
</script>

<template>
  <div class="w-144">
    <h2 class="text-xl sm:text-3xl text-center mb-4">
      {{ currentStep?.message }}
    </h2>
    <ProgressBar :percentage="currentStep ? currentStep.percentage : 0" />
  </div>
</template>
