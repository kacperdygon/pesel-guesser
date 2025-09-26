import { ref } from 'vue';

export interface LoadingStep {
  message: string;
  duration: number;
  percentage: number;
}

export function useLoadingSteps(steps: LoadingStep[]) {
  const currentStep = ref<LoadingStep | null>(null);
  const loading = ref(false);

  async function startLoading() {
    loading.value = true;
    for (const step of steps) {
      currentStep.value = step;

      await new Promise((resolve) => setTimeout(resolve, step.duration));

      currentStep.value = null;
    }

    console.log('dxdd');

    loading.value = false;
  }

  return { currentStep, loading, startLoading };
}
