import { type FormData } from '@/stores/appStore';

export function getPeselChecksum(pesel: string): number {
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;

  for (let i = 0; i < weights.length; i++) {
    sum += weights[i] * parseInt(pesel[i], 10);
  }

  return 10 - (sum % 10);
}

export function getPesel(formData: FormData): string {
  const specialMessage = checkForSpecialDateMessages(formData.date!);
  if (specialMessage) return specialMessage;

  let pesel = getPeselDatePart(formData.date!);

  pesel += getPeselRandomPart(formData.gender);

  pesel += getPeselChecksum(pesel).toString();

  return pesel;
}

function getPeselDatePart(birthDate: Date): string {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  let peselDatePart = '';

  peselDatePart += year.toString().slice(-2).padStart(2, '0');

  if (year >= 2000 && year < 2100) {
    peselDatePart += (month + 20).toString().padStart(2, '0');
  } else if (year >= 1900) {
    peselDatePart += month.toString().padStart(2, '0');
  } else if (year >= 1800) {
    peselDatePart += (month + 80).toString().padStart(2, '0');
  }

  peselDatePart += day.toString().padStart(2, '0');

  return peselDatePart;
}

function getPeselRandomPart(gender: 'man' | 'woman'): string {
  let randomPart = '';

  for (let i = 0; i < 3; i++) {
    randomPart += Math.floor(Math.random() * 10).toString();
  }

  if (gender === 'woman') {
    randomPart += (Math.floor(Math.random() * 5) * 2).toString();
  } else {
    randomPart += (Math.floor(Math.random() * 5) * 2 + 1).toString();
  }

  return randomPart;
}

function checkForSpecialDateMessages(date: Date): string | null {
  if (date.getFullYear() < 1800) return 'No way ur that old';

  return null;
}
