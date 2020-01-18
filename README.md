# bearly-functional

a repo of functions, some functional, some bearly 🐻

* `riteway` for unit testing
* code coverage with `nyc`
* bundling with `rollup` and transpiling with `babel`
* builds `.cjs`, `.esm` and `.umd` files

## Docs

https://puiutucutu.github.io/bearly-functional/

## Install

```
npm install
```

### Browser 

Grab a `umd` build from → https://www.jsdelivr.com/package/npm/bearly-functional

Browser version uses the `bf` namespace as in:

```js
bf.first(["a","b","c"]); //=> "a"
```

## Package Scripts

### Build

```
npm run build
```

### Tests

```
npm run test
```

### Coverage

```
npm run coverage
```
