import { ref } from 'vue';

export interface LoadingStep {
  message: string;
  duration: number;
  percentage: number;
}

export function useLoadingSteps() {
  const currentStep = ref<LoadingStep | null>(null);
  const isLoading = ref(false);

  async function startLoading(steps: LoadingStep[]) {
    isLoading.value = true;
    for (const step of steps) {
      currentStep.value = step;

      await new Promise((resolve) => setTimeout(resolve, step.duration));

      currentStep.value = null;
    }

    isLoading.value = false;
  }

  return { currentStep, isLoading, startLoading };
}
