/**
 * Takes a `key`, returns a function that expects an array of objects, finally
 * returns an object of unique keys.
 *
 * @param {String} key
 * @return {function(xs: T[]): Object<T<K>, Boolean<True>>}
 *
 *   Where `K` is the key value on some T and `Boolean<True>` is placeholder.
 *
 * @example
 *
 * const persons = [
 *   { id: 1, name: "John" },
 *   { id: 2, name: "James" },
 *   { id: 3, name: "Jack" },
 *   { id: 4, name: "James" },
 *   { id: 5, name: "Jack" },
 *   { id: 6, name: "James" },
 * ];
 *
 * dictByKey ("name") (persons); //=> {John: true, James: true, Jack: true}
 *
 */
const dictByKey = key => S.reduce
  (acc => x => ({ ...acc, [x[key]]: true }))
  ({})
;

export { dictByKey };
