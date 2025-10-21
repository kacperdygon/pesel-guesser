<script setup lang="ts">
import { useAppStore } from '@/stores/appStore.ts';

const store = useAppStore();

function onDecline() {
  store.wrongData = true;
  store.setCurrentView('form');
}

function onConfirm() {
  store.wrongData = false;
  store.setCurrentView('hint');
}
</script>

<template>
  <div class="h-full flex flex-col justify-center items-center gap-4">
    <div class="flex flex-col gap-4">
      <h2 class="text-3xl sm:text-4xl text-center">Did you input correct data?</h2>
    </div>

    <div class="flex w-full justify-center gap-4 items-center flex-col sm:flex-row">
      <button
        class="rounded-lg bg-red-600 p-4 sm:p-4 text-white text-xl cursor-pointer w-fit"
        @click="onDecline"
      >
        No
      </button>

      <button
        class="rounded-lg bg-blue-600 p-4 sm:p-4 text-white text-xl cursor-pointer w-fit"
        @click="onConfirm"
      >
        Yes
      </button>
    </div>
  </div>
</template>

<style scoped></style>
