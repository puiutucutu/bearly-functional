# src/data

Functions for working with data structures in arrays and objects.

## `dictByKey`

The current implementation using the object spread operator. This is not performant since the accumulator object is copied on every iteration.

```js
const dictByKey = key => S.reduce
  (acc => x => ({ ...acc, [x[key]]: true }))
  ({})
;
```

One optimized solution is to keep an internal object and assign to it, thus avoiding the need for a reduce. This comes at the expense of losing the conciseness and readability of the existing implementation.

```js
const dictByKey = key => xs => {
  const collect = {};
  xs.map(x => collect[x[key]] = true);
  return collect;
};
```

Another solution for brevity is to check the key each time.

```js
const dictByKey = key => S.reduce
  (acc => {
    return function(x) {
      if (!acc.hasOwnProperty(x[key])) {
        acc[x[key]] = true;
      }
      return acc;
    };
  })
  ({})
;
```

## `countOccurrences`

Two implementations - the second one uses the comma operator to evaluate the incrementing operation on each reduction iteration. In other words, for each iteration, it will evaluate `++acc[x] || 1` but only return `acc`. 

```js
/**
 * @param {string[]} xs 1d array of strings.
 * @return {Object} Where each key is a unique string and each key value is the
 *   occurrence frequency of string. Sorting by frequency is not performed.
 * @example
 *
 * const xs = ["apple", "orange", "banana", "apple", , "banana", "apple"];
 * console.log(countOccurrences(xs)); //=> {apple: 3, orange: 1, banana: 2}
 */
function countOccurrences(xs) {
  return xs.reduce((acc, x) => {
    acc[x] = x in acc ? ++acc[x] : 1;
    return acc;
  }, {});
}
```

```js
/**
 * @param {string[]} xs 1d array of strings.
 * @return {Object} Where each key is a unique string and each key value is the
 *   occurrence frequency of string. Sorting by frequency is not performed.
 * @see https://stackoverflow.com/a/56929965/1727232
 * @example
 *
 * const xs = ["apple", "orange", "banana", "apple", , "banana", "apple"];
 * console.log(countOccurrences(xs)); //=> {apple: 3, orange: 1, banana: 2}
 */
function countOccurrences(xs) {
  return xs.reduce((acc, x) => ((acc[x] = ++acc[x] || 1), acc), {});
}
```
