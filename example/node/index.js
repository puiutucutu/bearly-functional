import { data, date } from "bearly-functional";

const persons = [
  { id: 1, name: "John" },
  { id: 2, name: "James" },
  { id: 3, name: "Jack" },
  { id: 4, name: "James" },
  { id: 5, name: "Jack" },
  { id: 6, name: "James" }
];

const result = data.dictByKey("name")(persons);
const datetime = date.getISO8601DateWithTimeOffsetFromUTC();
const datetimeWithMicroseconds = date.getISO8601DateWithTimeOffsetFromUTC(true);

console.log(result);
console.log(datetime);
console.log(datetimeWithMicroseconds);
