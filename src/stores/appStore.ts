import { defineStore } from 'pinia';
import PeselFormView from '@/views/peselFormView/PeselFormView.vue';
import PeselResultView from '@/views/peselResultView/PeselResultView.vue';
import LoadingView from '@/views/loadingView/LoadingView.vue';
import { computed, ref } from 'vue';
import HintView from '@/views/hintView/HintView.vue';
import PeselListView from '@/views/peselListView/PeselListView.vue';
import PeselConfirmationView from '@/views/peselConfirmationView/PeselConfirmationView.vue';

export interface FormData {
  date?: Date;
  gender: 'man' | 'woman';
}

export const useAppStore = defineStore('app', () => {
  const currentViewString = ref('form');
  const currentView = computed(() => {
    switch (currentViewString.value) {
      case 'form':
        return PeselFormView;
      case 'loading':
        return LoadingView;
      case 'result':
        return PeselResultView;
      case 'hint':
        return HintView;
      case 'list':
        return PeselListView;
      case 'confirm':
        return PeselConfirmationView;
      default:
        return PeselFormView;
    }
  });

  const formData = ref<FormData>({ date: undefined, gender: 'man' });
  function setFormData(payload: FormData): void {
    formData.value = payload;
  }

  const pesel = ref<string>('');
  const isPeselConfirmed = ref<boolean>(false);

  function setCurrentView(view: string) {
    currentViewString.value = view;
  }

  return {
    currentView,
    setCurrentView,
    formData,
    setFormData,
    pesel,
    isPeselConfirmed: isPeselConfirmed,
  };
});
