import { getPeselChecksum } from './calculatePesel';

export function isPeselValid(pesel: string): boolean {
  if (!/^\d{11}$/.test(pesel)) {
    return false;
  }

  if (!isChecksumValid(pesel)) return false;

  if (!isDateValid(pesel)) return false;

  return true;
}

function isChecksumValid(pesel: string): boolean {
  const first10 = pesel.slice(0, 10);

  const checksum = getPeselChecksum(first10);

  return checksum === Number(pesel[10]);
}

function isDateValid(pesel: string): boolean {
  if (Number(pesel.slice(4, 6)) > 31) return false;

  const month = Number(pesel.slice(2, 4));

  if ((month > 12 && month < 21) || (month > 32 && month < 81) || month > 92) return false;

  return true;
}
