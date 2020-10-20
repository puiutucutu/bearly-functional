/**
 * @param {string} x
 * @return {string}
 */
export function titleCase(x) {
  const xs = x.toLowerCase().split(" ");
  for (let i = 0; i < xs.length; i++) {
    xs[i] = xs[i].charAt(0).toUpperCase() + xs[i].slice(1);
  }
  return xs.join(" ");
}
