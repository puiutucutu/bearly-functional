import { log } from "../../src/utils";
import { get, keys } from "../../src/object";
import { map, includes } from "../../src/list";

const lookup = ["GC", "SI", "ES", "NQ", "USD"];
const dict = {
  GC: "Gold",
  SI: "Silver",
  USD: "Usurious-fiat Dollars",
  UST: "Useless Treasuries",
};

const define = (dict) => (k) => includes (k) (keys (dict)) ? get (k) (dict) : k;
const definer = define (dict);
const defined = map (definer) (lookup);

log (defined); //=> ["Gold", "Silver", "ES", "NQ", "Usurious-fiat Dollars"]
