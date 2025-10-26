import type { Payload } from '@/stores/appStore';
import { calculatePesel } from './calculatePesel';

export function getRandomValidPesel() {
  const randomData: Payload = {
    date: getRandomDate(),
    gender: Math.random() < 0.5 ? 'man' : 'woman',
  };

  return calculatePesel(randomData);
}

function getRandomDate(startYear = 1800, endYear = 2025): Date {
  const start = new Date(startYear, 0, 1).getTime(); // 1 stycznia startYear
  const end = new Date(endYear, 11, 31).getTime(); // 31 grudnia endYear

  const randomTime = start + Math.random() * (end - start);

  return new Date(randomTime);
}
