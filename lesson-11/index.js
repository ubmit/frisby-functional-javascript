const { LazyBox } = require("../utils");

const nextCharForNumberString = str =>
  LazyBox(str)
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(n => n + 1)
    .fold(n => String.fromCharCode(n));

const result = nextCharForNumberString(() => " 64 ");
console.log(result); // A
