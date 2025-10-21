<script setup lang="ts">
import FlowingNumbers from '@/components/FlowingNumbers.vue';
import { useAppStore } from '@/stores/appStore';
import { getRandomValidPesel } from '@/helpers/getRandomValidPesel';
import { calculatePesel } from '@/helpers/calculatePesel';

const store = useAppStore();
const { wrongData, formData } = store;

function onNumberClicked(number: string) {
  store.pesel = number;
  store.setCurrentView('confirm');
}
</script>

<template>
  <div class="w-full h-full flex-1 overflow-hidden flex flex-col h-full">
    <h2 class="text-3xl sm:text-4xl text-center p-8">Find your pesel🕵</h2>
    <FlowingNumbers
      class="flex-1"
      @number-clicked="onNumberClicked"
      :random-string="wrongData ? getRandomValidPesel : () => calculatePesel(formData)"
    />
  </div>
</template>
