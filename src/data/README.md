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
