import { getSurroundingWordsAroundKeywords } from "./getSurroundingWordsAroundKeywords";
import { chunkStringByKeywords } from "./chunkStringByKeywords";

/**
 * @typedef {{segment: string[], keyword: Boolean}} TextFragment
 */

/**
 * @param {string} text
 * @param {string[]} keywords
 * @param {number} wordBuffer
 * @return {Object.<string, TextFragment[]>}
 *
 * @example
 *
 * const text = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?";
 * const actual = getBufferedTextFragmentsAroundKeywords(
 *   text,
 *   ["pleasure", "great", "responsible"],
 *   3
 * );
 *
 * const expected = {
 *   pleasure: [
 *     [
 *       { segment: ["idea", "of", "denouncing"], keyword: false },
 *       { segment: ["pleasure"], keyword: true },
 *       { segment: ["and", "praising", "pain"], keyword: false }
 *     ],
 *     [
 *       { segment: ["dislikes,", "or", "avoids"], keyword: false },
 *       { segment: ["pleasure"], keyword: true },
 *       { segment: ["itself,", "because", "it"], keyword: false }
 *     ],
 *     [
 *       { segment: ["because", "it", "is"], keyword: false },
 *       { segment: ["pleasure,"], keyword: true },
 *       { segment: ["but", "because", "those"], keyword: false }
 *     ],
 *     [
 *       { segment: ["how", "to", "pursue"], keyword: false },
 *       { segment: ["pleasure"], keyword: true },
 *       { segment: ["rationally", "encounter", "consequences"], keyword: false }
 *     ],
 *     [
 *       { segment: ["him", "some", "great"], keyword: false },
 *       { segment: ["pleasure."], keyword: true },
 *       { segment: ["To", "take", "a"], keyword: false }
 *     ],
 *     [
 *       { segment: ["to", "enjoy", "a"], keyword: false },
 *       { segment: ["pleasure"], keyword: true },
 *       { segment: ["that", "has", "no"], keyword: false }
 *     ],
 *     [
 *       { segment: ["produces", "no", "resultant"], keyword: false },
 *       { segment: ["pleasure?"], keyword: true },
 *       { segment: [], keyword: false }
 *     ]
 *   ],
 *   great: [
 *     [
 *       { segment: ["teachings", "of", "the"], keyword: false },
 *       { segment: ["great"], keyword: true },
 *       { segment: ["explorer", "of", "the"], keyword: false }
 *     ],
 *     [
 *       { segment: ["procure", "him", "some"], keyword: false },
 *       { segment: ["great"], keyword: true },
 *       { segment: ["pleasure.", "To", "take"], keyword: false }
 *     ]
 *   ],
 *   responsible: []
 * };
 *
 */
export function getBufferedTextFragmentsAroundKeywords(
  text,
  keywords,
  wordBuffer
) {
  const surroundingWords = getSurroundingWordsAroundKeywords(
    text,
    keywords,
    wordBuffer
  );

  return Object.entries(surroundingWords).reduce((acc, [k, v]) => {
    acc[k] = surroundingWords[k].map(fragment =>
      chunkStringByKeywords(fragment, [k])
    );

    return acc;
  }, {});
}
