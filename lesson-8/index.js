const { Sum, All } = require("../utils");
// monoid: semigroup with a neutral element that access an identity

Sum.empty = () => Sum(0);
// const result = Sum.empty().concat(Sum(1).concat(Sum(2))); // Sum(3)

All.empty = () => All(true);
const result = All(false)
  .concat(All(true))
  .concat(All(true).concat(All.empty())); // All(false)

console.log(result);
