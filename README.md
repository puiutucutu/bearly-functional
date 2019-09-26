# bearly-functional

a repo of functions, some functional, some bearly 🐻

- `tap` for unit testing
- code coverage with `nyc` via `tap`
- bundling with `rollup` and transpiling with `babel`
- builds `.cjs`, `.esm` and `.umd` files

## Install

```
npm install
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

## Todos

- look into using only `riteway` for testing
  - determine if generating coverage with `tap` but testing with `riteway` makes sense or if should download `nyc` as dev dep and manually setup
