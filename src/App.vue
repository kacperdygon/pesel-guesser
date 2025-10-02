<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from './stores/appStore';

const { currentView } = storeToRefs(useAppStore());
</script>

<template>
  <div
    id="container"
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4"
  >
    <component :is="currentView" />
  </div>
</template>
