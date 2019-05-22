const { Box } = require("../utils");

// functor: any type with a map method that obeys a few laws
// 1 - preserve function composition
// fx.map(f).map(g) == fx.map(x => g(f(x)))
// example:

const f = x => x + 1;
const g = x => x * 2;

const firstLawResult =
  Box(1)
    .map(f)
    .map(g)
    .fold(x => x) ===
  Box(1)
    .map(x => g(f(x)))
    .fold(x => x);

console.log(firstLawResult);

// 2 - fx.map(id) == id(fx)
// example:

const id = x => x;

const secondLawResult =
  Box("shiba")
    .map(id)
    .fold(res => res) === id(Box("shiba").fold(res => res));

console.log(secondLawResult);
