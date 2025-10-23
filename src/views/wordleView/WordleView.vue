<script setup lang="ts">
import {
  DigitState,
  getRegexFromStringArray,
  getWordleRegex,
  type WordleFieldNullable,
} from '@/helpers/wordle';
import { usePeselStore } from '@/stores/peselStore';
import { onMounted, ref } from 'vue';

const fields = ref<WordleFieldNullable[][]>(
  Array.from({ length: 6 }, () =>
    Array.from({ length: 11 }, () => {
      return {
        digit: null,
        state: null,
        changeable: true,
      };
    }),
  ),
);

let currentRow = -1;

const peselStore = usePeselStore();

function onNext() {
  let regexArr: string[] | undefined = undefined;

  if (currentRow != -1) regexArr = getWordleRegex(fields.value[currentRow]);
  console.log(regexArr);

  currentRow++;

  if (currentRow === fields.value.length) {
    endWordle();
    return;
  }

  let newPesel;

  if (regexArr) {
    const regex = getRegexFromStringArray(regexArr);
    newPesel = peselStore.getRandomPeselWithRegex(regex);
  } else {
    newPesel = peselStore.getRandomFormDataPesel();
  }

  for (const [index, field] of fields.value[currentRow].entries()) {
    field.digit = newPesel[index];

    let previous = undefined;
    if (currentRow - 1 >= 0) previous = fields.value[currentRow - 1][index];

    if (previous && previous.state === DigitState.Correct) {
      field.changeable = false;
      field.state = DigitState.Correct;
    } else {
      field.state = DigitState.NotPresent;
    }
  }
}

function endWordle() {}

function swapState(index: number) {
  const field = fields.value[currentRow][index];
  switch (field.state) {
    case DigitState.Correct:
      field.state = DigitState.NotPresent;
      break;
    case DigitState.Misplaced:
      field.state = DigitState.Correct;
      break;
    case DigitState.NotPresent:
      field.state = DigitState.Misplaced;
      break;
  }
}

onMounted(() => {
  peselStore.setFormData({
    date: new Date('2008-03-21'),
    gender: 'man',
  });
  onNext();
});
</script>

<template>
  <div class="flex flex-col justify-center items-center h-full gap-4">
    <h2 class="text-4xl sm:text-5xl">Wordle</h2>
    <ul class="flex flex-col gap-4">
      <ul v-for="(row, rowIndex) in fields" :key="rowIndex" class="flex gap-4">
        <li
          v-for="(field, fieldIndex) in row"
          :key="fieldIndex"
          class="w-16 h-16 flex justify-center items-center text-3xl text-gray-50 select-none"
          @click="rowIndex === currentRow && field.changeable ? swapState(fieldIndex) : null"
          :class="{
            'bg-gray-500': field.state === DigitState.NotPresent,
            'bg-yellow-500': field.state === DigitState.Misplaced,
            'bg-green-600': field.state === DigitState.Correct,
            'outline-gray-400 outline-solid outline-1': field.state === null,
          }"
        >
          {{ field.digit }}
        </li>
      </ul>
    </ul>
    <button class="rounded-lg bg-blue-600 p-4 text-white text-xl cursor-pointer" @click="onNext">
      Next
    </button>
  </div>
</template>
