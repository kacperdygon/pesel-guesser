<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { rand11 } from '@/helpers/getPesel.ts';
import { useAppStore } from '@/stores/appStore.ts';

const rowsNumber = 15;

const pesels = ref<
  Array<
    Array<{
      pesel: string;
      id: number;
    }>
  >
>(Array.from({ length: rowsNumber }, () => []));

let currentId = 0;
function createNewNumbers() {
  const id = currentId++;

  for (const innerArr of pesels.value) {
    innerArr.unshift({ pesel: rand11(), id: id });

    setTimeout(() => {
      const index = innerArr.findIndex((item) => item.id === id);
      if (index !== -1) innerArr.splice(index, 1);
    }, 10000);
  }

  setTimeout(createNewNumbers, 1200);
}

function onPeselClicked(pesel: string) {
  const store = useAppStore();
  store.pesel = pesel;
  store.setCurrentView('confirm');
}

onMounted(() => {
  createNewNumbers();
});
</script>

<template>
  <div class="w-full h-full flex-1 overflow-hidden flex flex-col">
    <h2 class="text-3xl sm:text-4xl text-center p-8">Find your pesel🕵</h2>
    <div class="relative w-full flex-1" v-for="(peselArr, index) in pesels" :key="index">
      <button
        class="text-2xl absolute will-change-transform"
        :class="index % 2 === 0 ? 'move-right' : 'move-left'"
        v-for="pesel in peselArr"
        :key="pesel.id"
        @click="onPeselClicked(pesel.pesel)"
      >
        {{ pesel.pesel }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.move-right {
  animation: moveRight 10s linear infinite;
}

@keyframes moveRight {
  from {
    left: -15vw;
  }
  to {
    left: 100vw;
  }
}

.move-left {
  animation: moveLeft 10s linear infinite;
}

@keyframes moveLeft {
  from {
    left: 100vw;
  }
  to {
    left: -15vw;
  }
}
</style>
