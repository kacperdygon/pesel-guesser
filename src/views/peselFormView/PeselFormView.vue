<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { ref } from 'vue';
import { type FormData } from '@/stores/appStore';
import { getPesel } from '@/helpers/getPesel';

const formData = ref<FormData>({
  date: undefined,
  gender: 'man',
});

const errorMessage = ref<string>('');

function handleSubmit() {
  if (formData.value.date && isDateValid(formData.value.date)) {
    const store = useAppStore();

    store.setCurrentView('loading');

    store.pesel = getPesel(formData.value);
  } else {
    errorMessage.value = 'Enter a valid date dumbass';
  }
}

function isDateValid(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}
</script>

<template>
  <h1 class="text-4xl sm:text-6xl">Pesel Guesser 😎</h1>
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
    <p class="text-red-500">{{ errorMessage }}</p>
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
</template>
