import { defineStore } from 'pinia';
import PeselFormView from '@/views/peselFormView/PeselFormView.vue';
import PeselResultView from '@/views/peselResultView/PeselResultView.vue';
import LoadingView from '@/views/loadingView/LoadingView.vue';
import { computed, ref, watch } from 'vue';
import HintView from '@/views/hintView/HintView.vue';
import PeselListView from '@/views/peselListView/PeselListView.vue';
import PeselConfirmationView from '@/views/peselConfirmationView/PeselConfirmationView.vue';
import ConfirmDateView from '@/views/dataConfirmationView/DataConfirmationView.vue';
import PolicyView from '@/views/policyView/PolicyView.vue';

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
  } as const;

  const currentViewString = ref<keyof typeof viewList>('form');
  const currentView = computed(() => viewList[currentViewString.value]);

  const formData = ref<Payload>({ date: undefined, gender: 'man' });
  function setFormData(payload: Payload): void {
    formData.value = payload;
  }

  const pesel = ref<string>('');
  const isPeselConfirmed = ref<boolean>(false);

  function setCurrentView(view: keyof typeof viewList) {
    currentViewString.value = view;
  }

  watch(
    formData,
    (newValue, oldValue) => {
      console.log(newValue);
      console.log(oldValue);
    },
    { deep: true },
  );

  const wrongData = ref<boolean>(false);

  function resetData() {
    pesel.value = '';
    isPeselConfirmed.value = false;
    wrongData.value = false;
    formData.value = { date: undefined, gender: 'man' };
  }

  return {
    currentView,
    setCurrentView,
    formData,
    setFormData,
    pesel,
    isPeselConfirmed: isPeselConfirmed,
    wrongData,
    resetData,
  };
});
