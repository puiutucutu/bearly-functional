import { findKeyword } from "./findKeyword";
import { getSurroundingWords } from "./getSurroundingWords";

/**
 * @param {string} s
 * @param {string[]} keywords
 * @param {number} wordBuffer The amount of words around a keyword to return
 *   for all instances of keyword matches.
 * @return {Object<string, string[]>} For each keyword found in the source
 *   string, returns a text fragment with a word buffer starting from the
 *   keyword position.
 *
 * @example
 *
 * const source = "The quick brown fox jumps over the lazy dog but, why did the dog not bark at the fox.";
 * const textSurroundingKeywords = getSurroundingWordsAroundKeywords(source, ["dog","lazy"], 2);
 *
 * const output = {
 *   dog: [
 *     "the lazy dog but, why",
 *     "did the dog not bark"
 *   ],
 *   lazy: [
 *     "over the lazy dog but,"
 *   ]
 * };
 *
 */
export function getSurroundingWordsAroundKeywords(s, keywords, wordBuffer) {
  const bufferedKeywordsText = {};

  // create keyword placeholders
  for (let i = 0; i < keywords.length; i++) {
    bufferedKeywordsText[keywords[i]] = [];
  }

  // perform word buffering for each keyword
  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];
    const keywordMatches = findKeyword(s, keyword);
    for (let j = 0; j < keywordMatches.length; j++) {
      bufferedKeywordsText[keyword] = [
        ...bufferedKeywordsText[keyword],
        getSurroundingWords(s, keywordMatches[j], wordBuffer)
      ];
    }
  }

  return bufferedKeywordsText;
}
