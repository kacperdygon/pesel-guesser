<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';

let arrayLength = 8;
let parentArrayLength = 10;

const emit = defineEmits<{
  (e: 'numberClicked', value: string): void;
}>();

const props = defineProps<{
  randomString: () => string;
}>();

function randomArrayPair() {
  return {
    firstArray: Array.from({ length: arrayLength }, () => props.randomString()),
    secondArray: Array.from({ length: arrayLength }, () => props.randomString()),
  };
}

const arrays = ref<
  Array<{
    firstArray: Array<string>;
    secondArray: Array<string>;
  }>
>([]);

function handleShift(
  arrayPair: { firstArray: Array<string>; secondArray: Array<string> },
  eventTarget: EventTarget | null,
  movingLeft: boolean,
) {
  if (!eventTarget) return;

  const domElement = eventTarget as HTMLElement;

  const invert = domElement.classList.contains('flex-row-reverse');

  shiftArrays(arrayPair, invert, movingLeft);
  invertDivs(domElement, invert);
}

function shiftArrays(
  arrayPair: { firstArray: Array<string>; secondArray: Array<string> },
  invert: boolean,
  movingLeft: boolean,
) {
  const shouldInvert = movingLeft ? !invert : invert;

  if (shouldInvert)
    arrayPair.firstArray = Array.from({ length: arrayLength }, () => props.randomString());
  else arrayPair.secondArray = Array.from({ length: arrayLength }, () => props.randomString());
}

function invertDivs(target: HTMLElement, invert: boolean) {
  if (invert) {
    target.classList.remove('flex-row-reverse');
  } else {
    target.classList.add('flex-row-reverse');
  }
}

onMounted(() => {
  window.addEventListener('resize', reloadAnimations);
  reloadAnimations();
});

const containerRef = ref<HTMLElement | null>(null);

function reloadAnimations() {
  if (!containerRef.value) return;

  const containerWidth = containerRef.value.clientWidth;
  const charWidth = 16 * 0.6;
  const sequenceWidth = charWidth * 13;
  const count = Math.floor(containerWidth / sequenceWidth);

  const containerHeight = containerRef.value.clientHeight;
  const charHeight = 24;

  parentArrayLength = Math.floor(containerHeight / charHeight);

  arrayLength = count;

  const duration = containerWidth / 140;

  arrays.value = Array.from({ length: parentArrayLength }, randomArrayPair);

  nextTick(() => {
    const elements = document.querySelectorAll('.move');
    elements.forEach((element) => {
      const domElement = element as HTMLElement;
      domElement.style.animationDelay = Math.random() * -duration + 's';
      const randomDuration = duration + (Math.random() - 0.5) * (duration * 0.5) + 's';
      domElement.style.animationDuration = randomDuration;
    });
  });
}
</script>

<template>
  <div class="overflow-hidden" ref="containerRef">
    <div class="h-full w-[200%] flex flex-col justify-center">
      <div
        class="flex w-full justify-around move"
        @animationiteration="handleShift(arrayPair, $event.target, index % 2 !== 0)"
        v-for="(arrayPair, index) in arrays"
        :key="index"
        :class="{ moveRight: index % 2 === 0, 'moveLeft flex-row-reverse': index % 2 !== 0 }"
      >
        <div class="w-1/2 flex justify-around">
          <button
            v-for="(value, index) in arrayPair.firstArray"
            :key="index"
            @click="emit('numberClicked', value)"
          >
            {{ value }}
          </button>
        </div>

        <div class="w-1/2 flex justify-around">
          <button
            v-for="(value, index) in arrayPair.secondArray"
            :key="index"
            @click="emit('numberClicked', value)"
          >
            {{ value }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.move {
  animation: linear infinite;
}

.moveRight {
  animation-name: moveRight;
}

.moveLeft {
  animation-name: moveLeft;
}

@keyframes moveRight {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes moveLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
