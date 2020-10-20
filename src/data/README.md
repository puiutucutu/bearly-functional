# src/data

Functions for working with data structures in arrays and objects.

## `dictByKey`

The current implementation uses the object spread operator. This is not performant since the accumulator object is copied on every iteration.

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

An example of the desired behaviour.

```js
const xs = ["apple", "orange", "banana", "apple", "banana", "apple"];
countOccurrences(xs); //=> { apple: 3, orange: 1, banana: 2 }
```

Two implementations - the second one uses the comma operator to evaluate the incrementing operation on each reduction iteration. In other words, for each iteration, `++acc[x] || 1` is evaluated but only `acc` is returned. 

```js
function countOccurrences(xs) {
  return xs.reduce((acc, x) => {
    acc[x] = x in acc ? ++acc[x] : 1;
    return acc;
  }, {});
}
```

```js
function countOccurrences(xs) {
  return xs.reduce((acc, x) => ((acc[x] = ++acc[x] || 1), acc), {});
}
```

Using the `reduce` from this library (copied below for reference) the behaviour can be expressed more tersely as follows.

```js
const uncurry = f => (a, b) => f (a) (b);
const reduce = reducer => initialValue => xs =>
  Array.prototype.reduce.call
  (
    xs,
    uncurry (reducer), //=> reducer (accumulator, currentValue)
    initialValue
  )
;
```

The first example below uses comma expresssion.

The second example builds up to a final object by merging the previous object with a new on each iteration, checking to see if the key name exists and incrementing by one if it does or otherwise inserting the key for the first time with an initial value of `1`.

```js
const countOccurrences = xs => reduce
  (acc => x => ((acc[x] = ++acc[x] || 1), acc))
  ({})
  (xs)
;
```

```js
const countOccurrences = xs => reduce
  (acc => x => ({ ...acc, [x]: acc[x] ? acc[x]++ : 1 }))  
  ({})
  (xs)
;
```

Alternatively, modifying the second example, notice `x in acc` instead of `acc[x]`.

```js
const countOccurrences = xs => reduce
  (acc => x => ({ ...acc, [x]: x in acc ? acc[x]++ : 1 }))  
  ({})
  (xs)
;
```
