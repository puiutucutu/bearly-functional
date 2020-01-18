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

## `first`

First, some implementations:

Using function arg array destructuring - downside is the jsdoc block.

```js
/**
 * @param {T} x
 * @param {T[]} xs
 * @return {T|undefined}
 */
const first = ([x, ...xs]) => x;
```

Using a comma expression to return the last evaluated value. Avoids the jsdoc
 block issue of the first example.

```js
/**
 * @param {T[]} xs
 * @return {T|undefined}
 */
const first = xs => (([x] = xs), x);
```

The previous two examples are equivalent to this.

```js
const first = xs => {
  const [x] = xs;
  return x;
};
```

All implementations above return undefined for sparse arrays
 wherein the first array element at index 0 has been deleted.
 
```js
const first = ([x, ...xs]) => x;
const xs = ["a","b","c"];

first(xs); //=> "a"
first([]); //=> undefined

delete xs[0];
first(xs); //=> undefined
```

This next implementation handles this case.

```js
/**
 * @param {T[]} xs
 * @return {T|undefined}
 */
const first = xs => xs.find(x => typeof x !== "undefined");

const xs = [];
xs[1] = "b";
xs[2] = "c";

first([]); //=> undefined
first(xs); //=> "b"
```

This answer is thinking outside the box by taking the keys of the array.

* https://stackoverflow.com/a/42491188/1727232

```js
const xs = ["a", "b", "c"];
delete xs[0];

const keys = Object.keys(xs);
const x = xs[keys[0]];

console.log(keys);
console.log(x); //=> "b"
```
