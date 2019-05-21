// a semigroup is a type with a concat method

const firstResult = require("./exercise-1");
const secondResult = require("./exercise-2");
const thirdResult = require("./exercise-3");

const results = [firstResult, secondResult, thirdResult];

console.table(results, ["x"]);
