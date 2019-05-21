const fs = require("fs");
const path = require("path");

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const LazyBox = g => ({
  fold: f => f(g()),
  map: f => LazyBox(() => f(g())),
  inspect: () => `LazyBox(${g})`
});

const Left = x => ({
  chain: f => Left(x),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
});

const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
});

const fromNullable = x => (x == null ? Left(null) : Right(x));

const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const readFileSync = filePath =>
  tryCatch(() => path.resolve(__dirname, filePath)).fold(
    e => e,
    p => fs.readFileSync(p)
  );

const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: () => `Sum(${x})`
});

const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
});

const First = x => ({
  x,
  concat: _ => First(x),
  inspect: () => `First(${x})`
});

module.exports = {
  Box,
  LazyBox,
  Left,
  Right,
  fromNullable,
  tryCatch,
  readFileSync,
  Sum,
  All,
  First
};
