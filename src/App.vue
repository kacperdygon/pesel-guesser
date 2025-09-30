<script setup lang="ts">
import PeselForm from './components/PeselForm.vue';
import LoadingDialog from './components/dialog/LoadingDialog.vue';
import { getPesel } from './getPesel';
import { ref, watch } from 'vue';
import { useLoadingSteps } from './helpers/useLoadingSteps';
import PeselResult from './components/PeselResult.vue';
import { shuffleLoadingSteps } from './helpers/shuffleLoadingSteps';
import EffectWrapper from './components/wrappers/EffectWrapper.vue';
import { Mode } from './types';
import { loadingStepMessages } from './data';
import DialogWrapper from './components/dialog/DialogWrapper.vue';

const pesel = ref<string>('');

const lastFormData = ref<{ date: Date; isFemale: boolean } | null>(null);

const peselDialogRef = ref<InstanceType<typeof LoadingDialog> | null>(null);

function handleLoadResult(formData: { date: Date; isFemale: boolean }) {
  startLoading(shuffleLoadingSteps(loadingStepMessages));
  lastFormData.value = formData;

  currentMode.value = checkForNewMode(formData);

  watch(
    loading,
    (newVal) => {
      if (!newVal) {
        handleResultLoaded();
      }
    },
    { once: true },
  );
}

const currentMode = ref<Mode>(Mode.BASIC);

function checkForNewMode(formData: { date: Date; isFemale: boolean }): Mode {
  const date = formData.date;
  if (date.getFullYear() == 2067 && date.getDate() == 6 && date.getMonth() + 1 == 7) {
    return Mode.TUFF;
  }

  return Mode.BASIC;
}

function handleResultLoaded() {
  wrapperRef.value?.applyEffects();

  if (lastFormData.value)
    pesel.value = getPesel(lastFormData.value.date, lastFormData.value.isFemale);
}

const { currentStep, loading, startLoading } = useLoadingSteps();

const wrapperRef = ref<InstanceType<typeof EffectWrapper> | null>(null);
</script>

<template>
  <EffectWrapper ref="wrapperRef" :mode="currentMode">
    <div
      id="container"
      class="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4"
    >
      <PeselResult
        :pesel="pesel"
        v-if="pesel"
        @return="
          () => {
            pesel = '';
            lastFormData = null;
            wrapperRef?.removeEffects();
          }
        "
        @wrong="lastFormData ? handleLoadResult(lastFormData) : null"
      />
      <PeselForm @submit="handleLoadResult" v-else />
      <DialogWrapper :show="loading">
        <LoadingDialog :step="currentStep" ref="peselDialogRef" />
      </DialogWrapper>
    </div>
  </EffectWrapper>
</template>
