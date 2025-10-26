import { calculatePesel } from '@/utils/pesel/calculatePesel';
import { getRandomValidPesel } from '@/utils/pesel/getRandomValidPesel';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Payload {
  date?: Date;
  gender: 'man' | 'woman';
}

export const usePeselStore = defineStore('pesel', () => {
  const formData = ref<Payload>({ date: undefined, gender: 'woman' });
  function setFormData(payload: Payload): void {
    formData.value = payload;
  }

  const pesel = ref<string>('');
  const isPeselConfirmed = ref<boolean>(false);

  const wrongData = ref<boolean>(false);

  function getRandomFormDataPesel() {
    if (formData.value.date && formData.value.gender) return calculatePesel(formData.value);
    else return getRandomValidPesel();
  }

  function resetData() {
    pesel.value = '';
    isPeselConfirmed.value = false;
    wrongData.value = false;
    formData.value = { date: undefined, gender: 'man' };
  }

  return {
    formData,
    setFormData,
    pesel,
    isPeselConfirmed: isPeselConfirmed,
    wrongData,
    resetData,
    getRandomFormDataPesel,
  };
});
