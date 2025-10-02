<script setup lang="ts">
import { useAppStore } from '@/stores/appStore.ts';

const {pesel, setCurrentView} = useAppStore();
</script>

<template>
  <div class="h-full flex flex-col gap-8 items-center">

    <div class="flex flex-col gap-4">
      <h2 class="text-3xl sm:text-4xl text-center">Is this your pesel?</h2>
      <p class="text-4xl sm:text-6xl text-center">{{ pesel }}</p>
    </div>

    <div class="flex w-full justify-center gap-4 items-center flex-col sm:flex-row">
      <button
        class="rounded-lg bg-red-600 p-4 sm:p-4 text-white text-xl cursor-pointer w-fit"
        @click="setCurrentView('list')"
      >
        Nahh
      </button>

      <button
        class="rounded-lg bg-blue-600 p-4 sm:p-4 text-white text-xl cursor-pointer w-fit"
        @click="() => {
          setCurrentView('result');
          useAppStore().isPeselConfirmed = true;
        }"
      >
        Yes
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
