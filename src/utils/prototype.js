/**
 * @param {*} x
 * @return {String}
 * @example
 *
 * prototype({});        //=> "[object Object]"
 * prototype([]);        //=> "[object Array]"
 * prototype(7);         //=> "[object Number]"
 * prototype("");        //=> "[object String]"
 * prototype(true);      //=> "[object Boolean]"
 * prototype(false);     //=> "[object Boolean]"
 * prototype(null);      //=> "[object Null]"
 * prototype(undefined); //=> "[object Undefined]"
 * prototype(void 0);    //=> "[object Undefined]"
 * prototype();          //=> "[object Undefined]"
 *
 */
const prototype = x => Object.prototype.toString.call(x);

export { prototype };
