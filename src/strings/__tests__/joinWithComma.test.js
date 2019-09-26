import tap from "tap";
import { joinWithComma } from "../index";

tap.test("joinWithComma", function(t) {
  t.equal(joinWithComma(["hello", "world"]), "hello,world");
  t.equal(joinWithComma([]), "", "empty when empty");
  t.end();
});
