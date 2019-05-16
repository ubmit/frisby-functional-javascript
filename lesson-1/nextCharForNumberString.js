// const nextCharForNumberString = str => {
//   const trimmed = str.trim();
//   const number = parseInt(trimmed);
//   const nextNumber = number + 1;
//   return String.fromCharCode(nextNumber);
// };

// const nextCharForNumberString = str =>
//   String.fromCharCode(parseInt(str.trim()) + 1);

// const nextCharForNumberString = str =>
//   [str]
//     .map(s => s.trim())
//     .map(trimmedString => parseInt(trimmedString))
//     .map(n => n + 1)
//     .map(nextNumber => String.fromCharCode(nextNumber));

const Box = x => ({
  chain: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const nextCharForNumberString = str =>
  Box(str)
    .chain(s => s.trim())
    .chain(s => parseInt(s))
    .chain(n => n + 1)
    .fold(n => String.fromCharCode(n));

const result = nextCharForNumberString(" 64 ");
console.log(result);
