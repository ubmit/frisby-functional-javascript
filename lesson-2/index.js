const { Box } = require("../utils");

const moneyToFloat = str =>
  Box(str)
    .chain(s => s.replace(/\$/g, ""))
    .chain(s => parseFloat(s));

const percentToFloat = str =>
  Box(str.replace(/\%/g, ""))
    .chain(s => parseFloat(s))
    .chain(n => n * 0.01);

// note: notice that is also possible to pass something different than the arg itself to the box

const applyDiscount = (price, discount) =>
  moneyToFloat(price).fold(cost =>
    percentToFloat(discount).fold(savings => cost - cost * savings)
  );

const finalPrice = applyDiscount("$5.00", "%20");
console.log(finalPrice); // 4
