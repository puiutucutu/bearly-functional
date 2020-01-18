import { joinWithSpace } from "./joinWithSpace.js";
import { splitSpace } from "./splitSpace.js";

/**
 * Retrieves a string fragment padded with words around some word positioned at
 * index.
 *
 * @param {string} s The targeted string.
 * @param {number} index The array position identifying the desired word once
 *   the string has been split on whitespace.
 * @param {number} numOfWords The buffer of words before and after the word as
 *   identified by `index`.
 * @return {string}
 *
 * @example
 *
 * const words = "hello world how are you doing today";
 *
 * getSurroundingWords(words, 0, 0); //=> "hello"
 * getSurroundingWords(words, 0, 1); //=> "hello world"
 * getSurroundingWords(words, 2, 1); //=> "world how are"
 * getSurroundingWords(words, 2, 2); //=> "hello world how are you"
 * getSurroundingWords(words, 2, 3); //=> "hello world how are you doing"
 * getSurroundingWords(words, 2, 4); //=> "hello world how are you doing today"
 */
export function getSurroundingWords(s, index, numOfWords) {
  if (index < 0) {
    throw Error("`index` cannot be less than zero");
  }

  if (numOfWords < 0) {
    throw Error("`numOfWords` cannot be less than zero");
  }

  const words = splitSpace(s);
  const wordsBefore =
    index - numOfWords <= 0
      ? words.slice(0, index)
      : words.slice(index - numOfWords, index);

  const startPos = index + 1;
  const wordsAfter = words.slice(startPos, startPos + numOfWords);

  return joinWithSpace([...wordsBefore, words[index], ...wordsAfter]);
}
