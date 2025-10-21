<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from './stores/appStore';

const { currentView } = storeToRefs(useAppStore());
</script>

<template>
  <div id="container" class="min-h-screen bg-gray-100 h-screen">
    <component :is="currentView" />
  </div>
</template>
