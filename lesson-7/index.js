const { First, All, Sum } = require("../utils");
const { Map } = require("immutable-ext");

const acccountOne = Map({
  name: First("Arya"),
  isPaid: All(true),
  points: Sum(10),
  friends: ["Needle"]
});

const acccountTwo = Map({
  name: First("Arya"),
  isPaid: All(false),
  points: Sum(2),
  friends: ["Clagane"]
});

const result = acccountOne.concat(acccountTwo).toJS();
console.log(result);
