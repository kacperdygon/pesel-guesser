<script setup lang="ts">
import { isPeselValid } from '@/helpers/isPeselValid';
import { useAppStore } from '@/stores/appStore';
import { ref } from 'vue';

const headerTextIndex = ref(0);

const peselInput = ref('');
const errorMessage = ref('');

function onSubmit() {
  if (!isPeselValid(peselInput.value)) {
    errorMessage.value = "No way that's your pesel";
    return;
  }

  errorMessage.value = '';
  const store = useAppStore();
  store.pesel = peselInput.value;
  store.setCurrentView('loading');
}

const headerTextOptions = [
  'Please give me a hint🙏🙏',
  'Are you sure?',
  'You should probably reconsider it...',
  'Stop clicking okay??',
  "This button doesn't do anything",
  'It was a lie all along',
  'So a hint maybe??',
];
</script>

<template>
  <h2 class="text-3xl sm:text-4xl text-center">{{ headerTextOptions[headerTextIndex] }}</h2>
  <input
    class="p-2 rounded-lg outline-gray-400 outline-solid outline-1 focus:outline-blue-600 text-center text-xl"
    placeholder="Your pesel"
    v-model="peselInput"
  />

  <p class="text-red-500 text-xl">{{ errorMessage }}</p>

  <div class="flex w-full justify-center gap-4 items-center flex-col sm:flex-row">
    <button
      class="rounded-lg bg-red-600 p-4 sm:p-4 text-white text-xl cursor-pointer w-fit"
      @click="headerTextIndex < headerTextOptions.length - 1 ? headerTextIndex++ : null"
      v-if="headerTextIndex < headerTextOptions.length - 1"
    >
      No way💀🥀
    </button>

    <button class="rounded-lg bg-blue-600 p-4 text-white text-xl cursor-pointer" @click="onSubmit">
      That's my pesel🗿
    </button>
  </div>
</template>
