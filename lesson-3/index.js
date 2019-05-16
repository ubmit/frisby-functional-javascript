const { Left, Right, fromNullable } = require("../utils");

const leftResult = Left(2)
  .map(n => n * 2)
  .map(n => n + 1)
  .fold(() => "error", n => n);

console.log(leftResult); // error

const rightResult = Right(2)
  .map(n => n * 2)
  .map(n => n + 1)
  .fold(() => "error", n => n);

console.log(rightResult); // 5

const findColor = name =>
  fromNullable(
    {
      white: "#FFF",
      black: "#000",
      red: "#F00"
    }[name]
  );

const result = findColor("green")
  .map(c => c.slice(1))
  .fold(e => "no color", c => c.toLowerCase());

console.log(result); // no color
