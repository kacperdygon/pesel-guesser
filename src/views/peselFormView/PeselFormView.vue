<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { ref } from 'vue';
import { type Payload } from '@/stores/appStore';
import { calculatePesel } from '@/helpers/calculatePesel';
import { usePeselStore } from '@/stores/peselStore';

const formData = ref<Payload>({
  date: undefined,
  gender: 'man',
});

const errorMessage = ref<string>('');

const appStore = useAppStore();
const peselStore = usePeselStore();

function handleSubmit() {
  if (formData.value.date && isDateValid(formData.value.date)) {
    appStore.setCurrentView('loading');
    peselStore.setFormData(formData.value);

    peselStore.pesel = calculatePesel(formData.value);
  } else {
    errorMessage.value = 'Enter a valid date dumbass';
  }
}

function isDateValid(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}

function onShowPolicy() {
  peselStore.wrongData = false;
  appStore.setCurrentView('policy');
}
</script>

<template>
  <div class="h-full flex flex-col justify-center gap-4">
    <h1 class="text-4xl sm:text-6xl text-center" v-if="!peselStore.wrongData">Pesel Guesser 😎</h1>
    <h1 class="text-3xl sm:text-4xl text-center" v-else>
      Our
      <button class="cursor-pointer text-blue-600" @click="onShowPolicy">policy</button>
      requires you to input real data
    </h1>
    <form
      class="flex flex-col gap-4 justify-center items-center text-xl"
      @submit.prevent="handleSubmit"
    >
      <label class="flex gap-2 items-center text-xl">
        Birth date
        <input
          type="date"
          class="p-2 rounded-lg outline-gray-400 outline-solid outline-1 focus:outline-blue-600"
          @input="(e) => (formData.date = new Date((e.target as HTMLInputElement).value))"
        />
      </label>
      <p class="text-red-500" v-show="errorMessage">{{ errorMessage }}</p>
      <div class="flex gap-4 items-center">
        <h3>Gender</h3>
        <div class="flex gap-2 text-xl flex-col">
          <label>
            <input type="radio" name="gender" :value="'man'" v-model="formData.gender" checked />
            Woman🤰🏿
          </label>
          <label>
            <input type="radio" name="gender" :value="'woman'" v-model="formData.gender" />
            Man🫃
          </label>
        </div>
      </div>
      <input
        type="submit"
        value="Calculate pesel"
        class="rounded-lg bg-blue-600 p-4 text-white text-xl cursor-pointer"
      />
    </form>
  </div>
</template>
