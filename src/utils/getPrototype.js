/**
 * @param {*} x
 * @return {String}
 * @example
 *
 * getPrototype({});        //=> "[object Object]"
 * getPrototype([]);        //=> "[object Array]"
 * getPrototype(7);         //=> "[object Number]"
 * getPrototype("");        //=> "[object String]"
 * getPrototype(true);      //=> "[object Boolean]"
 * getPrototype(false);     //=> "[object Boolean]"
 * getPrototype(null);      //=> "[object Null]"
 * getPrototype(undefined); //=> "[object Undefined]"
 * getPrototype(void 0);    //=> "[object Undefined]"
 * getPrototype();          //=> "[object Undefined]"
 *
 */
const getPrototype = x => Object.prototype.toString.call(x);

export { getPrototype };
