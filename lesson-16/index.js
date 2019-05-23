const { Box } = require("../utils");

// first law

const join = m => m.chain(x => x);

const m = Box(Box(Box(3)));

const firstLawRes1 = join(m.map(join));
const firstLawRes2 = join(join(m));

console.log(firstLawRes1, firstLawRes2);

