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

export { shuffle };
