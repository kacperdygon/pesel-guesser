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

export function getWordleRegex(
  fieldsNullable: WordleFieldNullable[],
  regexArr: string[] = [],
): string[] {
  if (regexArr.length === 0)
    regexArr = Array.from({ length: 11 }, () => {
      return '[0123456789]';
    });

  const fields = wordleFieldNullableToNotNullable(fieldsNullable);

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

function wordleFieldNullableToNotNullable(
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
