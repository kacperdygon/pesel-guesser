import type { LoadingStep } from './useLoadingSteps';

const MINIMUM_STEPS = 5;
const MAXIMUM_STEPS = 7;

const MAX_PERCENTAGE = 90;

const MIN_DURATION = 400;
const MAX_DURATION = 1000;

const FINAL_STEP = {
  message: 'Finalizing...',
  duration: 500,
  percentage: 100,
};

export function shuffleLoadingSteps(stepMessages: string[]): LoadingStep[] {
  const steps: LoadingStep[] = [];

  let maxPossibleSteps: number;

  if (stepMessages.length < MINIMUM_STEPS) {
    maxPossibleSteps = stepMessages.length;
  } else {
    maxPossibleSteps = Math.min(stepMessages.length, MAXIMUM_STEPS);
  }

  const stepCount =
    Math.floor(Math.random() * (maxPossibleSteps - MINIMUM_STEPS + 1)) + MINIMUM_STEPS;

  const selectedMessages = shuffleArray(stepMessages).slice(0, stepCount);
  const percentages = getRandomPercentages(stepCount);
  const durations = getRandomDurations(stepCount);

  for (let i = 0; i < stepCount; i++) {
    steps.push({
      message: selectedMessages[i],
      duration: durations[i],
      percentage: percentages[i],
    });
  }

  steps.push(FINAL_STEP);
  return steps;
}

function getRandomPercentages(stepCount: number): number[] {
  let percentages = [];

  const randomPercentageChange = { min: -5, max: 5 };

  for (let i = 0; i < stepCount; i++) {
    percentages.push(Math.floor(MAX_PERCENTAGE / stepCount + 1) * i);
  }

  percentages = percentages.map((element) => {
    if (element === 0) return element;
    const randomChange = Math.floor(
      Math.random() * (randomPercentageChange.max - randomPercentageChange.min + 1) +
        randomPercentageChange.min,
    );
    return (element += randomChange);
  });

  const randomIndex = Math.floor(Math.random() * (percentages.length - 2)) + 1;

  [percentages[randomIndex], percentages[randomIndex + 1]] = [
    percentages[randomIndex + 1],
    percentages[randomIndex],
  ];

  return percentages;
}

function getRandomDurations(stepCount: number) {
  const durations = [];

  for (let i = 0; i < stepCount; i++) {
    durations.push(Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION + 1)) + MIN_DURATION);
  }

  return durations;
}

function shuffleArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
