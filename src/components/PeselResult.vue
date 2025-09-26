<script setup lang="ts">
defineProps<{
  pesel: string;
}>();

const emit = defineEmits<{
  (e: 'return'): void;
  (e: 'wrong'): void;
}>();
</script>

<template>
  <div class="h-full flex flex-col gap-8 items-center">
    <div class="flex flex-col gap-4">
      <h2 class="text-4xl text-center">Your pesel is...</h2>
      <p class="text-6xl text-center">{{ pesel }}</p>
    </div>

    <div class="flex w-full justify-center gap-4">
      <button
        class="rounded-lg bg-red-600 p-4 text-white text-xl cursor-pointer w-fit"
        @click="emit('wrong')"
      >
        Not my pesel
      </button>

      <button
        class="rounded-lg bg-blue-600 p-4 text-white text-xl cursor-pointer w-fit"
        @click="emit('return')"
      >
        Return
      </button>
    </div>
  </div>
</template>
