<script setup lang="ts">
import PeselForm from './components/PeselForm.vue';
import PeselDialog from './components/PeselDialog.vue';
import { getPesel } from './peselCalculator';
import { ref, watch } from 'vue';
import { useLoadingSteps, type LoadingStep } from './helpers/useLoadingSteps';
import { fireConfetti } from './helpers/fireConfetti';
import PeselResult from './components/PeselResult.vue';

const pesel = ref<string>('');

const lastFormData = ref<{ date: Date; isFemale: boolean } | null>(null);

const peselDialogRef = ref<InstanceType<typeof PeselDialog> | null>(null);

function handleLoadResult(formData: { date: Date; isFemale: boolean }) {
  startLoading();

  watch(
    loading,
    (newVal) => {
      if (!newVal) {
        fireConfetti();
        pesel.value = getPesel(formData.date, formData.isFemale);
        lastFormData.value = formData;
      }
    },
    { once: true },
  );
}

const loadingSteps: LoadingStep[] = [
  {
    message: 'Counting atoms in the universe...',
    duration: 1350,
    percentage: 5,
  },
  {
    message: 'Doing something very important...',
    duration: 850,
    percentage: 27,
  },
  {
    message: 'Calculating mass of the sun...',
    duration: 1500,
    percentage: 46,
  },
  {
    message: 'Solving Schrödinger equation...',
    duration: 1200,
    percentage: 78,
  },
  {
    message: 'Debating on the meaning of life...',
    duration: 1000,
    percentage: 61,
  },
  {
    message: 'Consulting the Oracle of Delphi...',
    duration: 800,
    percentage: 88,
  },
  {
    message: 'Finalizing...',
    duration: 500,
    percentage: 100,
  },
];

const { currentStep, loading, startLoading } = useLoadingSteps(loadingSteps);
</script>

<template>
  <div
    id="container"
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4"
  >
    <PeselResult
      :pesel="pesel"
      v-if="pesel"
      @return="
        () => {
          pesel = '';
          lastFormData = null;
        }
      "
      @wrong="lastFormData ? handleLoadResult(lastFormData) : null"
    />
    <PeselForm @submit="handleLoadResult" v-else />
    <PeselDialog :step="currentStep" ref="peselDialogRef" :show="loading" />
  </div>
</template>
