const Box = x => ({
  chain: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

module.exports = Box;
