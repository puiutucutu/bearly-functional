const tailAlternate = ([x, ...xs]) => xs;

/**
 * tail :: [a] -> a
 *
 * @param {*[]} xs
 * @return {*[]}
 */
export const tail = (xs) => xs.slice(1);
