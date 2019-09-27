import { describe, Try } from "riteway";
import { replaceCommaWithWhitespace } from "../replaceCommaWithWhitespace";

describe("replaceCommaWithWhitespace()", async assert => {
  const should = "return string";

  assert({
    given: "many adjacent commas",
    should: "collapses two or more adjacent spaces to a single space",
    actual: replaceCommaWithWhitespace("hello,,, world"),
    expected: "hello world"
  });

  assert({
    given: "a string with a comma as the first character",
    should: "return a string with space as its first character",
    actual: replaceCommaWithWhitespace(",hello, world"),
    expected: " hello world"
  });

  assert({
    given: "a string with a comma as the last character",
    should: "return a string with space as its last character",
    actual: replaceCommaWithWhitespace("hello, world,"),
    expected: "hello world "
  });

  assert({
    given: "a string with a comma as the first and last character",
    should: "return a string with space as the first and last character",
    actual: replaceCommaWithWhitespace(",hello world,"),
    expected: " hello world "
  });

  assert({
    given: "no args",
    should: "throw a TypeError",
    actual: Try(replaceCommaWithWhitespace) instanceof TypeError,
    expected: true
  });
});
