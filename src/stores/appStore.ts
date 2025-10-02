import { defineStore } from 'pinia';
import PeselFormView from '@/views/peselFormView/PeselFormView.vue';
import PeselResultView from '@/views/peselResultView/PeselResultView.vue';
import LoadingView from '@/views/loadingView/LoadingView.vue';
import { computed, ref } from 'vue';
import HintView from '@/views/hintView/HintView.vue';

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
      default:
        return PeselFormView;
    }
  });

  const formData = ref<FormData>({ date: undefined, gender: 'man' });
  function setFormData(payload: FormData): void {
    formData.value = payload;
  }

  const pesel = ref<string>('');

  function setCurrentView(view: string) {
    currentViewString.value = view;
    console.log('Current view set to:', view, currentView.value);
  }

  return { currentView, setCurrentView, formData, setFormData, pesel };
});
