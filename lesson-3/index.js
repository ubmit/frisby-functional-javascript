const { Left, Right, fromNullable } = require("../utils");

const leftResult = Left(2)
  .chain(n => n * 2)
  .chain(n => n + 1)
  .fold(() => "error", n => n);

console.log(leftResult); // error

const rightResult = Right(2)
  .chain(n => n * 2)
  .chain(n => n + 1)
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
  .chain(c => c.slice(1))
  .fold(e => "no color", c => c.toLowerCase());

console.log(result); // no color
