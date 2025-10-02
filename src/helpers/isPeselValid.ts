import { getPeselChecksum } from './getPesel';

export function isPeselValid(pesel: string): boolean {
  if (!/^\d{11}$/.test(pesel)) {
    return false;
  }

  const first10 = pesel.slice(0, 10);

  const checksum = getPeselChecksum(first10);

  console.log(checksum);

  return checksum === Number(pesel[10]);
}
