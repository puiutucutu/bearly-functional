/**
 * Takes a `key` and returns a function that expects an array of objects
 * (containing a property equal to `key`) that finally returns an Object<K,V>
 * where `K` is the key name used to group all elements of `xs` and `V` is an
 * array of elements from `xs` matching the `key` value.
 *
 * @param {String} key
 * @return {function(xs: T[]): Object<K,V>}
 *
 *   Where `K` is the key name used to group all the elements of `xs`.
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
 * dictGroupByKey ("name") (persons); //=> {John: Array[1], James: Array[3], Jack: Array[2]}
 *
 * //
 * // {
 * //   "John": [
 * //     { "id": 1, "name": "John" }
 * //   ],
 * //   "James": [
 * //     { "id": 2, "name": "James" },
 * //     { "id": 4, "name": "James" },
 * //     { "id": 6, "name": "James" }
 * //   ],
 * //   "Jack": [
 * //     { "id": 3, "name": "Jack" },
 * //     { "id": 5, "name": "Jack" }
 * //   ]
 * // }
 * //
 *
 */
const dictGroupByKey = key => S.reduce
  (acc => x => ({ ...acc, [x[key]]: acc[x[key]] ? [...acc[x[key]], x] : [x] }))
  ({})
;

export { dictGroupByKey };
