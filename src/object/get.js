/**
 *
 * @param {string} propName
 * @return {function(x: Object): *|undefined} v of <k,v> or undefined
 */
const get = (propName) => (x) => x[propName];

export { get };
