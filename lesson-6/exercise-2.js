const { All } = require("../utils");

const secondResult = All(true).concat(All(true)); // false
module.exports = secondResult;
