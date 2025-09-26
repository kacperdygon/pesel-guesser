<script setup lang="ts">
import { ref } from 'vue';

const formData = ref<{
  date: Date | null;
  isFemale: boolean;
}>({
  date: null,
  isFemale: true,
});

function handleSubmit() {
  if (formData.value.date)
    emit('submit', {
      date: formData.value.date,
      isFemale: formData.value.isFemale,
    });
}

const emit = defineEmits<{
  (e: 'submit', data: { date: Date; isFemale: boolean }): void;
}>();
</script>

<template>
  <h1 class="text-4xl sm:text-6xl">Pesel Guesser 😎</h1>
  <form
    class="flex flex-col gap-4 justify-center items-center text-xl"
    @submit.prevent="handleSubmit"
  >
    <label class="flex gap-2 items-center text-xl">
      Birth date
      <input
        type="date"
        class="p-2 rounded-lg outline-gray-400 outline-solid outline-1 focus:outline-blue-600"
        @input="(e) => (formData.date = new Date((e.target as HTMLInputElement).value))"
      />
    </label>
    <div class="flex gap-4 items-center">
      <h3>Gender</h3>
      <div class="flex gap-2 text-xl flex-col">
        <label>
          <input type="radio" name="gender" :value="true" v-model="formData.isFemale" checked />
          Woman
        </label>
        <label>
          <input type="radio" name="gender" :value="false" v-model="formData.isFemale" />
          Man
        </label>
      </div>
    </div>
    <input
      type="submit"
      value="Calculate pesel"
      class="rounded-lg bg-blue-600 p-4 text-white text-xl cursor-pointer"
    />
  </form>
</template>
