export const map = f => xs => Array.prototype.map.call
(
  xs,
  (currentValue, index, array) => f (currentValue)
);
