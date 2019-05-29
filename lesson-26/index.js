const { Box, Either, Right, Left, fromNullable } = require("../utils");
const { task } = require("folktale/concurrency/task");
const { List, Map } = require("immutable-ext");

// isomorphism:
// from(to(x)) == x
// to(from(y)) == y

// example:
// String ~ [Char]

const Iso = (to, from) => ({
  to,
  from
});

const chars = Iso(s => s.split(""), c => c.join(""));

const firstResult = chars.to(chars.from(["h", "e", "j"]));
console.log(firstResult);

const secondResult = chars.from(chars.to("hej"));
console.log(secondResult);

const truncate = str => chars.from(chars.to(str).slice(0, 3)).concat("...");

const thirdResult = truncate("tack");
console.log(thirdResult);

// [a] ~ Either null a
const singleton = Iso(
  e => e.fold(() => [], x => [x]),
  ([x]) => (x ? Right(x) : Left())
);

const filterEither = (e, pred) => singleton.from(singleton.to(e).filter(pred));

const overNineThousand = x => x > 9000;
const inc = x => x + 1;

const fourthResult = filterEither(Right(3), overNineThousand).map(inc);
console.log(fourthResult);

const fifthResult = filterEither(Right(10000), overNineThousand).map(inc);
console.log(fifthResult);
