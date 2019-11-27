# src/list

Functions for working with arrays.

## `shuffle`

Below are other possible implementations.

```js
/**
 * @param {array} xs
 * @return {array}
 * @see https://stackoverflow.com/a/12646864/1727232
 */
function shuffle(xs) {
  const cloned = [...xs];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }

  return cloned;
}
```

The following do not mutate the input.

```js
/**
 * @param {array} xs
 * @return {array}
 * @see https://stackoverflow.com/a/46545530/1727232
 * @see https://en.wikipedia.org/wiki/Schwartzian_transform
 */
function shuffle(xs) {
  return xs
    .map(x => ({ rand: Math.random(), value: x }))
    .sort((x, y) => x.rand - y.rand)
    .map(x => x.value);
}
```

```js
/**
 * @param {array} xs
 * @return {array}
 * @see https://stackoverflow.com/a/49306566/1727232
 */
function shuffle(xs) {
  return xs
    .map(x => [Math.random(), x])
    .sort(([a], [b]) => a - b)
    .map(([rand, x]) => x);
}
```
