const { Map, List } = require("immutable-ext");
const { Sum } = require("../utils");

Sum.empty = () => Sum(0);

// const result = [Sum(1), Sum(2), Sum(3)].reduce(
//   (acc, x) => acc.concat(x),
//   Sum.empty()
// );

// const result = List.of(Sum(1), Sum(2), Sum(3)).fold(Sum.empty());

// const result = Map({ bran: Sum(1), arya: Sum(2), sansa: Sum(3) }).fold(
//   Sum.empty()
// );

// const result = Map({ bran: 1, arya: 2, sansa: 3 })
//   .map(Sum) // x => Sum(x) === Sum
//   .fold(Sum.empty());

// const result = Map({ bran: 1, arya: 2, sansa: 3 })
//   .map(Sum) // x => Sum(x) === Sum
//   .fold(Sum.empty());

/* since mapping then folding is a really common practice
   there is a specific function for this: foldMap() */

const result = Map({ bran: 1, arya: 2, sansa: 3 }).foldMap(Sum, Sum.empty());

console.log(result);
