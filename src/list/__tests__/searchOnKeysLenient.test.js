import { describe } from "riteway";
import { searchOnKeysLenient } from "../index";

describe("searchOnKeysLenient()", async (assert) => {
  const persons = [
    {
      name: "Sam",
      city: "Burlington",
      province: "Ontario",
    },
    {
      name: "Mike",
      city: "Hamilton",
      province: "Ontario",
    },
    {
      name: "John",
      city: "Burlington",
      province: "Ontario",
    },
    {
      name: "Mary",
      city: "Burlington",
      province: "Ontario",
    },
    {
      name: "Daniel",
      city: "Hamilton",
      province: "Alberta",
    },
    {
      name: "Burlington",
      city: "Burlington",
      province: "Alberta",
    },
  ];

  assert({
    given: "array of objects",
    should: "return array of objects matching keys",
    actual: searchOnKeysLenient("Burlington", persons, ["name", "city"]),
    expected: [
      { name: "Sam", city: "Burlington", province: "Ontario" },
      { name: "John", city: "Burlington", province: "Ontario" },
      { name: "Mary", city: "Burlington", province: "Ontario" },
      { name: "Burlington", city: "Burlington", province: "Alberta" },
    ],
  });
});
