const { Either, liftA2 } = require("../utils");

const $ = selector => Either.of({ selector, height: 10 });

// const getScreenSize = (screen, head, foot) =>
//   screen - (head.height + foot.height);

// $("header").chain(head =>
//   $("footer").map(footer => getScreenSize(800, head, foot))
// );

const getScreenSize = screen => head => foot =>
  screen - (head.height + foot.height);

const firstResult = Either.of(getScreenSize(800))
  .ap($("header"))
  .ap($("footer"));

console.log(firstResult);

const secondResult = liftA2(getScreenSize(800), $("header"), $("footer"));

console.log(secondResult);
