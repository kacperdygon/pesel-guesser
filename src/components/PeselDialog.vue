<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import type { LoadingStep } from '@/helpers/useLoadingSteps';
import ProgressBar from './ProgressBar.vue';

const props = defineProps<{
  step: LoadingStep | null;
  show: boolean;
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);

onMounted(() => {
  watch(props, (newVal) => {
    if (newVal.show) {
      dialogRef.value?.showModal();
    } else {
      dialogRef.value?.close();
    }
  });
});
</script>

<template>
  <dialog
    ref="dialogRef"
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-128 p-8 rounded-lg"
  >
    <div>
      <h2 class="text-3xl text-center mb-4">{{ step?.message }}</h2>
      <ProgressBar :percentage="step ? step.percentage : 0" />
    </div>
  </dialog>
</template>
