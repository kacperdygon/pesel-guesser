import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import PeselFormView from '@/views/peselFormView/PeselFormView.vue';
import PeselResultView from '@/views/peselResultView/PeselResultView.vue';
import LoadingView from '@/views/loadingView/LoadingView.vue';
import HintView from '@/views/hintView/HintView.vue';
import PeselListView from '@/views/peselListView/PeselListView.vue';
import PeselConfirmationView from '@/views/peselConfirmationView/PeselConfirmationView.vue';
import ConfirmDateView from '@/views/dataConfirmationView/DataConfirmationView.vue';
import PolicyView from '@/views/policyView/PolicyView.vue';
import WordleView from '@/views/wordleView/WordleView.vue';

export interface Payload {
  date?: Date;
  gender: 'man' | 'woman';
}

export const useAppStore = defineStore('app', () => {
  const viewList = {
    form: PeselFormView,
    loading: LoadingView,
    result: PeselResultView,
    hint: HintView,
    list: PeselListView,
    confirm: PeselConfirmationView,
    confirmData: ConfirmDateView,
    policy: PolicyView,
    wordle: WordleView,
  } as const;

  const currentViewString = ref<keyof typeof viewList>('wordle');
  const currentView = computed(() => viewList[currentViewString.value]);

  function setCurrentView(view: keyof typeof viewList) {
    currentViewString.value = view;
  }

  return {
    currentView,
    setCurrentView,
  };
});
