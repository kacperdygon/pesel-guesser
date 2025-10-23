import { calculatePesel } from '@/helpers/calculatePesel';
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
    return calculatePesel(formData.value);
  }

  function getRandomPeselWithRegex(regex: RegExp) {
    let pesel;
    do {
      pesel = getRandomFormDataPesel();
    } while (!regex.test(pesel));

    return pesel;
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
    getRandomPeselWithRegex,
  };
});
