<script setup lang="ts">
import FlowingNumbers from '@/components/FlowingNumbers.vue';
import { useAppStore } from '@/stores/appStore';

function onNumberClicked(number: string) {
  const store = useAppStore();

  store.pesel = number;
  store.setCurrentView('confirm');
}
</script>

<template>
  <div class="w-full h-full flex-1 overflow-hidden flex flex-col h-full">
    <h2 class="text-3xl sm:text-4xl text-center p-8">Find your pesel🕵</h2>
    <FlowingNumbers class="flex-1" @number-clicked="onNumberClicked" />
  </div>
</template>
