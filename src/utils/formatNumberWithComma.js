import { PROTOTYPES } from "./PROTOTYPES";
import { prototype } from "./prototype";

/**
 * Note that decimal figures are dropped off.
 *
 * @param {number} num
 * @return {string}
 * @example formatNumberWithComma(100000); //=> "100,000"
 */
const formatNumberWithComma = (num) =>
  prototype(num) === PROTOTYPES.NUMBER
    ? num.toLocaleString("en", { useGrouping: true })
    : parseFloat(num).toLocaleString("en", { useGrouping: true })
  ;

export { formatNumberWithComma };
