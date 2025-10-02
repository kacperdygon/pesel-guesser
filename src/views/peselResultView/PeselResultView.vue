<script setup lang="ts">
import { fireConfetti } from '@/helpers/fireConfetti';
import { useAppStore } from '@/stores/appStore';
import { onMounted } from 'vue';

const { setCurrentView, pesel } = useAppStore();

onMounted(fireConfetti);
</script>

<template>
  <div class="h-full flex flex-col gap-8 items-center">
    <div class="flex flex-col gap-4">
      <h2 class="text-3xl sm:text-4xl text-center">Your pesel is...</h2>
      <p class="text-4xl sm:text-6xl text-center">{{ pesel }}</p>
    </div>

    <div class="flex w-full justify-center gap-4 items-center flex-col sm:flex-row">
      <button
        class="rounded-lg bg-red-600 p-4 sm:p-4 text-white text-xl cursor-pointer w-fit"
        @click="setCurrentView('hint')"
      >
        Not my pesel
      </button>

      <button
        class="rounded-lg bg-blue-600 p-4 sm:p-4 text-white text-xl cursor-pointer w-fit"
        @click="setCurrentView('form')"
      >
        Return
      </button>
    </div>
  </div>
</template>
