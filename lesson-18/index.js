const { Box, liftA2 } = require("../utils");

const firstResult = Box(x => x + 1).ap(Box(2));
console.log(firstResult);

const add = x => y => x + y;
const secondResult = Box(add)
  .ap(Box(2))
  .ap(Box(3));
console.log(secondResult);

// F(x).map(f) == F(f).ap(F(x))

const thirdResult = liftA2(add, Box(2), Box(4));
console.log(thirdResult);
