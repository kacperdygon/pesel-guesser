import { ref } from 'vue';

export interface LoadingStep {
  message: string;
  duration: number;
  percentage: number;
}

export function useLoadingSteps() {
  const currentStep = ref<LoadingStep | null>(null);
  const loading = ref(false);

  async function startLoading(steps: LoadingStep[]) {
    loading.value = true;
    for (const step of steps) {
      currentStep.value = step;

      await new Promise((resolve) => setTimeout(resolve, step.duration));

      currentStep.value = null;
    }

    loading.value = false;
  }

  return { currentStep, loading, startLoading };
}
