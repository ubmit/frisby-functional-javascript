const Box = x => ({
  chain: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

const Left = x => ({
  chain: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
});

const Right = x => ({
  chain: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
});

module.exports = {
  Box,
  Left,
  Right
};
