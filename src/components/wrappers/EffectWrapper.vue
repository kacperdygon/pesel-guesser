<script setup lang="ts">
import { ref } from 'vue';
import { Mode } from '../../types';

import BasicWrapper from './BasicWrapper.vue';
import TuffWrapper from './TuffWrapper.vue';

const props = defineProps<{
  mode: Mode;
}>();

function applyEffects() {
  switch (props.mode) {
    case Mode.BASIC:
      basicWrapperRef.value?.applyEffects();
      return;
    case Mode.TUFF:
      tuffWrapperRef.value?.applyEffects();
      return;
  }
}

function removeEffects() {
  switch (props.mode) {
    case Mode.BASIC:
      basicWrapperRef.value?.removeEffects();
      return;
    case Mode.TUFF:
      tuffWrapperRef.value?.removeEffects();
      return;
  }
}

defineExpose({
  applyEffects,
  removeEffects,
});

const basicWrapperRef = ref<InstanceType<typeof BasicWrapper> | null>(null);
const tuffWrapperRef = ref<InstanceType<typeof TuffWrapper> | null>(null);
</script>

<template>
  <BasicWrapper v-show="mode === Mode.BASIC" ref="basicWrapperRef">
    <slot />
  </BasicWrapper>
  <TuffWrapper v-show="mode === Mode.TUFF" ref="tuffWrapperRef">
    <slot />
  </TuffWrapper>
</template>
