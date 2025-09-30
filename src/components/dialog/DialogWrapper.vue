<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  show: boolean;
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);

onMounted(() => {
  watch(props, (newVal) => {
    if (newVal.show) {
      dialogRef.value?.showModal();
    } else {
      dialogRef.value?.close();
    }
  });
});
</script>

<template>
  <dialog
    ref="dialogRef"
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-48 w-128 p-8 rounded-lg"
  >
    <slot />
  </dialog>
</template>
