const { fromNullable } = require("../utils");

const arr = [4, 1, 3, 2];

// const concatUniq = (x, ys) => {
//   const found = ys.filter(y => y === x)[0];
//   return found ? ys : ys.concat(x);
// };

const concatUniq = (x, ys) =>
  fromNullable(ys.filter(y => y === x)[0]).fold(() => ys.concat(x), ys);

const fourthResult = concatUniq(5, arr).toString();
// '4,1,3,2,5'

module.exports = fourthResult;
