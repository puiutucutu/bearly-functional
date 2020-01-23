import { data, date } from "bearly-functional";

const log = x => console.log(x);

const persons = [
  { id: 1, name: "John" },
  { id: 2, name: "James" },
  { id: 3, name: "Jack" },
  { id: 4, name: "James" },
  { id: 5, name: "Jack" },
  { id: 6, name: "James" }
];

const result = data.dictByKey("name")(persons);

log(result);

// using fn which relies on `date-fns` as peer dependency
log(date.getISO8601DateWithTimeOffsetFromUTC());
log(date.getISO8601DateWithTimeOffsetFromUTC(true));
