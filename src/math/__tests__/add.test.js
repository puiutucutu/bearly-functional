import tap from "tap";
import { add } from "../index";

tap.test("add", function(t) {
  t.equal(add(1, 2), 3, "Returns expected value when adding 1 + 2");
  t.equal(add(2, 3), 5, "Returns expected value when adding 2 + 3");

  // manually test the parts of the error
  try {
    add("2", "3");
  } catch (err) {
    t.equal(
      err instanceof TypeError,
      true,
      "Error must be instance of TypeError"
    );

    t.equal(
      err.message,
      "Supplied arg `x` or `y` is not a valid number",
      "Expected error message"
    );
  }

  // use tap to test the error object's type and message
  t.throws(
    function() {
      return add("2", "3");
    },
    {
      name: "TypeError",
      message: "Supplied arg `x` or `y` is not a valid number"
    },
    "Throws TypeError with expected error message when args are not numbers"
  );

  t.end();
});
