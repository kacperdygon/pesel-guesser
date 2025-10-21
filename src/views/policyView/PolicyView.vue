<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';

const { resetData, setCurrentView } = useAppStore();

function onReturn() {
  resetData();
  setCurrentView('form');
}
</script>

<template>
  <div class="w-full p-4 flex flex-col items-start">
    <ol class="list-decimal list-inside">
      <li>
        Putting incorrect/fake data that doesn't match the user using Pesel Guesser service is
        forbidden
      </li>
    </ol>
    <button class="text-blue-600 cursor-pointer" @click="onReturn">Return</button>
  </div>
</template>
