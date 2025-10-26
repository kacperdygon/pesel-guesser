<script setup lang="ts">
import {
  DigitState,
  getMisplacedNumbersCounts,
  getRandomPeselWithRegexAndCounts,
  getRegexFromStringArray,
  getWordleRegex,
  wordleFieldNullableToNotNullable,
  type WordleFieldNullable,
} from '@/modules/wordle/utils';
import { useAppStore } from '@/stores/appStore';
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

let regexArr: string[] | undefined = undefined;
let counts: Record<string, number> = {};

function onNext() {
  if (currentRow != -1) {
    if (checkForWinCondition()) {
      endWordle(true);
      return;
    }

    const notNullFields = wordleFieldNullableToNotNullable(fields.value[currentRow]);

    if (currentRow != -1) regexArr = getWordleRegex(notNullFields, regexArr);
    console.log(regexArr);

    counts = getMisplacedNumbersCounts(notNullFields, counts);
  }

  currentRow++;

  if (currentRow === fields.value.length) {
    endWordle(false);
    return;
  }

  let newPesel;

  if (regexArr) {
    const regex = getRegexFromStringArray(regexArr);
    newPesel = getRandomPeselWithRegexAndCounts(peselStore.getRandomFormDataPesel, regex, counts);
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

function endWordle(isWon: boolean) {
  const appStore = useAppStore();
  const peselStore = usePeselStore();

  let pesel = '';

  for (const field of fields.value[currentRow]) {
    pesel += field.digit;
  }

  if (isWon) {
    peselStore.pesel = pesel;
    appStore.setCurrentView('result');
  }
}

function checkForWinCondition(): boolean {
  for (const field of fields.value[currentRow]) {
    if (field.state !== DigitState.Correct) return false;
  }

  return true;
}

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
  usePeselStore().setFormData({ date: new Date('2008-03-21'), gender: 'man' });
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
