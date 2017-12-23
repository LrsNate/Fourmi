import each from "lodash/each";

const unigrams = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
const bigrams = { CM: 900, CD: 400, XC: 90, XL: 40, IX: 9, IV: 4 };

export const ofRoman = input => {
  let number = 0;
  let romanNumber = input;

  each(bigrams, (value, key) => {
    romanNumber = romanNumber.replace(key, () => {
      number += value;
      return "";
    });
  });

  Array.from(romanNumber).forEach(letter => {
    number += unigrams[letter];
  });

  return number;
};
