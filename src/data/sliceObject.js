/**
 * @param {number} start
 * @param {number} end
 * @return {function(obj: Object): Object}
 * @example
 *
 * const obj = {apple: 3, banana: 2, orange: 1};
 *
 * sliceObject({start: 0, end: 1})(obj); //=> {apple: 3}
 * sliceObject({start: 0, end: 2})(obj); //=> {apple: 3, banana: 2}
 * sliceObject({start: 0, end: 3})(obj); //=> {apple: 3, banana: 2, orange: 1}
 * sliceObject({start: 0, end: 9})(obj); //=> {apple: 3, banana: 2, orange: 1}
 */
const sliceObject = ({ start, end }) => obj =>
  Object.keys(obj)
    .slice(start, end)
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

export { sliceObject };
