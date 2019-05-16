const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
});

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
});

const fromNullable = x => (x != null ? Right(x) : Left(null));

module.exports = {
  Box,
  Left,
  Right,
  fromNullable
};
