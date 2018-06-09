import _ from "lodash";

/* tslint:disable */
const unigrams: { [key: string]: number } = {
  M: 1000,
  D: 500,
  C: 100,
  L: 50,
  X: 10,
  V: 5,
  I: 1
};
const bigrams: { [key: string]: number } = {
  CM: 900,
  CD: 400,
  XC: 90,
  XL: 40,
  IX: 9,
  IV: 4
};
/* tslint:enable */

export const ofRoman = (input: string): number => {
  let result = 0;
  let romanNumber = input;

  _.each(bigrams, (value, key) => {
    romanNumber = romanNumber.replace(key, () => {
      result += value;
      return "";
    });
  });

  Array.from(romanNumber).forEach(letter => {
    result += unigrams[letter];
  });

  return result;
};
