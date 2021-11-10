import { describe, Try } from "riteway";
import { prototype } from "../prototype";
import { PROTOTYPES } from "../PROTOTYPES";

describe("prototype", async (assert) => {
  assert({
    given: "primitives",
    should: "returns proper prototypes",
    actual:
      prototype({}) === PROTOTYPES.OBJECT &&
      prototype([]) === PROTOTYPES.ARRAY &&
      prototype(new Map()) === PROTOTYPES.MAP &&
      prototype(7) === PROTOTYPES.NUMBER &&
      prototype("") === PROTOTYPES.STRING &&
      prototype(true) === PROTOTYPES.BOOLEAN &&
      prototype(false) === PROTOTYPES.BOOLEAN &&
      prototype(null) === PROTOTYPES.NULL &&
      prototype(undefined) === PROTOTYPES.UNDEFINED &&
      prototype(void 0) === PROTOTYPES.UNDEFINED,
    expected: true,
  });

  assert({
    given: "no args",
    should: 'returns "[object Undefined]"',
    actual: Try(prototype),
    expected: PROTOTYPES.UNDEFINED,
  });
});
