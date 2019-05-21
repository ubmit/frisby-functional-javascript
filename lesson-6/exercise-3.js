const { First } = require("../utils");

const thirdResult = First("ovo")
  .concat(First("galinha"))
  .concat(First("adão & eva")); // ovo
module.exports = thirdResult;
