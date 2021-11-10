# object

## renameObjectKeys

```js
const defMapObj = { CAN: "Canada", USA: "United States of America" };
const defined1 = renameObjectKeysWithObjectMap (defMapObj) ({ CAN: 1867, USA: 1776 }); //=> { "Canada": 1867, "United States of America": 1776 }
console.log(defined1);

const defMap = new Map();
defMap.set("CAN", "Canada");
defMap.set("USA", "United States of America");
const defined2 = renameObjectKeysWithMap (defMap) ({ CAN: 1867, USA: 1776 }); //=> { "Canada": 1867, "United States of America": 1776 }
console.log(defined2);
```
