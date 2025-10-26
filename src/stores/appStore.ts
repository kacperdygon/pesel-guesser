import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import PeselFormView from '@/modules/peselForm/PeselFormView.vue';
import PeselResultView from '@/modules/peselResult/PeselResultView.vue';
import LoadingView from '@/modules/loading/LoadingView.vue';
import HintView from '@/modules/hint/HintView.vue';
import PeselListView from '@/modules/peselList/PeselListView.vue';
import PeselConfirmationView from '@/modules/peselConfirmation/PeselConfirmationView.vue';
import ConfirmDateView from '@/modules/dataConfirmation/DataConfirmationView.vue';
import PolicyView from '@/modules/policy/PolicyView.vue';
import WordleView from '@/modules/wordle/WordleView.vue';

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
