const { Box } = require("../utils");

// first law

const join = m => m.chain(x => x);

const m = Box(Box(Box(3)));

// join(m.map(join)) == join(join(m))
const firstLawRes1 = join(m.map(join));
const firstLawRes2 = join(join(m));

console.log("first law:", firstLawRes1, firstLawRes2);

// second law

const n = Box("HELP");

// join(Box.of(m)) == join(m.map(Box.of))
const secondLawRes1 = join(Box(n));
const secondLawRes2 = join(n.map(Box));

console.log("second law:", secondLawRes1, secondLawRes2);
