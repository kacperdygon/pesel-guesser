<script setup lang="ts">
import FlowingNumbers from '@/modules/peselList/FlowingNumbers.vue';
import { useAppStore } from '@/stores/appStore';
import { getRandomValidPesel } from '@/utils/pesel/getRandomValidPesel';
import { calculatePesel } from '@/utils/pesel/calculatePesel';
import { usePeselStore } from '@/stores/peselStore';

const appStore = useAppStore();
const peselStore = usePeselStore();
const { wrongData, formData } = peselStore;

function onNumberClicked(number: string) {
  peselStore.pesel = number;
  appStore.setCurrentView('confirm');
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
