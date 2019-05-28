const fs = require("fs");
const path = require("path");

const Box = x => ({
  ap: b2 => b2.map(x),
  chain: f => f(x),
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const LazyBox = g => ({
  fold: f => f(g()),
  map: f => LazyBox(() => f(g())),
  inspect: () => `LazyBox(${g})`
});

const Right = x => ({
  chain: f => f(x),
  ap: other => other.map(x),
  traverse: (of, f) => f(x).map(Right),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
});

const Left = x => ({
  chain: f => Left(x),
  ap: other => Left(x),
  traverse: (of, f) => of(Left(x)),
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
});

const fromNullable = x => (x == null ? Left(null) : Right(x));

const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};

const Either = {
  of: Right,
  tryCatch,
  fromNullable
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

const liftA2 = (f, fx, fy) => fx.map(f).ap(fy);

module.exports = {
  Box,
  LazyBox,
  Left,
  Right,
  fromNullable,
  Either,
  tryCatch,
  readFileSync,
  Sum,
  All,
  First,
  liftA2
};
