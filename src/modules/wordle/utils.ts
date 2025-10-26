export enum DigitState {
  Misplaced,
  Correct,
  NotPresent,
}

export interface WordleFieldNullable {
  digit: string | null;
  state: DigitState | null;
  changeable: boolean;
}

export function getWordleRegex(fields: WordleField[], regexArr: string[] = []): string[] {
  if (regexArr.length === 0)
    regexArr = Array.from({ length: 11 }, () => {
      return '[0123456789]';
    });

  regexArr = handleCorrectFields(fields, regexArr);

  console.log(fields);

  console.log(regexArr);

  regexArr = handleMisplacedFields(fields, regexArr);

  console.log(regexArr);

  regexArr = handleNotPresentFields(fields, regexArr);

  return regexArr;
}

function handleCorrectFields(fields: WordleField[], regexArr: string[]) {
  for (const [index, field] of fields.entries()) {
    if (field.state === DigitState.Correct) {
      regexArr[index] = `[${field.digit}]`;
    }
  }

  return regexArr;
}

interface WordleField {
  digit: string;
  state: DigitState;
}

function handleMisplacedFields(fields: WordleField[], regexArr: string[]) {
  for (const [index, field] of fields.entries()) {
    if (field.state === DigitState.Correct) continue;
    if (field.state === DigitState.NotPresent) continue;
    regexArr[index] = regexArr[index].replace(field.digit, '');
  }

  return regexArr;
}

function handleNotPresentFields(fields: WordleField[], regexArr: string[]): string[] {
  const counts: Record<
    string,
    {
      count: number;
      misplacedCount: number;
    }
  > = {};

  for (const field of fields) {
    if (!counts[field.digit]) {
      counts[field.digit] = { count: 0, misplacedCount: 0 };
    }

    if (field.state === DigitState.Correct) continue;
    counts[field.digit].count++;
    if (field.state === DigitState.Misplaced) {
      counts[field.digit].misplacedCount++;
    }
  }

  for (const [digit, digitCount] of Object.entries(counts)) {
    if (digitCount.count > digitCount.misplacedCount) {
      for (const [index, field] of fields.entries()) {
        if (
          (field.state == DigitState.Misplaced && field.digit == digit) ||
          field.state == DigitState.Correct
        )
          continue;
        regexArr[index] = regexArr[index].replace(digit, '');
      }
    }
  }

  return regexArr;
}

export function verifyFirstSix(pesel: string, regexArr: string[]): boolean {
  if (pesel.length < 6 || regexArr.length < 6) {
    throw new Error('PESEL i regexArr muszą mieć co najmniej 6 elementów');
  }

  for (let i = 0; i < 6; i++) {
    const digit = pesel[i];
    const regex = new RegExp(`^${regexArr[i]}$`);

    if (!regex.test(digit)) {
      return false;
    }
  }

  return true;
}

export function wordleFieldNullableToNotNullable(
  wordleFieldsNullable: WordleFieldNullable[],
): WordleField[] {
  const wordleFields = new Array<WordleField>();

  for (const field of wordleFieldsNullable) {
    if (field.digit === null || field.state === null) continue;
    wordleFields.push({
      digit: field.digit,
      state: field.state,
    });
  }

  return wordleFields;
}

export function getRegexFromStringArray(regexStringArr: string[]) {
  const regexString = regexStringArr.join('');

  const regex = new RegExp(`^${regexString}$`);

  return regex;
}

export function getMisplacedNumbersCounts(
  fields: WordleField[],
  previousCounts: Record<string, number> = {},
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const field of fields) {
    if (field.state === DigitState.NotPresent) continue;

    counts[field.digit] = (counts[field.digit] ?? 0) + 1;
  }

  const finalCounts: Record<string, number> = {};

  const allDigits = new Set([...Object.keys(previousCounts), ...Object.keys(counts)]);
  for (const digit of allDigits) {
    finalCounts[digit] = Math.max(previousCounts[digit] ?? 0, counts[digit] ?? 0);
  }

  return finalCounts;
}

export function getRandomPeselWithRegexAndCounts(
  getRandomPesel: () => string,
  regex: RegExp,
  counts: Record<string, number>,
): string {
  let pesel;

  do {
    pesel = getRandomPesel();
    console.log('skibidi');
  } while (!testPesel(pesel, regex, counts));

  return pesel;
}

export function testPesel(pesel: string, regex: RegExp, counts: Record<string, number>): boolean {
  if (!regex.test(pesel)) return false;

  // Liczymy cyfry w peselu
  const peselCounts: Record<string, number> = {};
  for (const digit of pesel) {
    peselCounts[digit] = (peselCounts[digit] ?? 0) + 1;
  }

  // Sprawdzamy, czy pesel ma co najmniej tyle cyfr, ile w counts
  for (const digit in counts) {
    if ((peselCounts[digit] ?? 0) < counts[digit]) {
      return false;
    }
  }

  console.log(pesel);
  console.log(counts);

  return true;
}
