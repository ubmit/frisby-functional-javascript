const { Either, Right, Left, fromNullable, Box } = require("../utils");
const { rejected, of } = require("folktale/concurrency/task");

// natural transformation:
// nt(x).map(f) == nt(x.map(f))

const first = xs => fromNullable(xs[0]);

const firstResult = first([1, 2, 3]).map(x => x + 1);
const secondResult = first([1, 2, 3].map(x => x + 1));
console.log(firstResult, secondResult);

const boxToEither = b => b.fold(x => Right(x));

const res1 = boxToEither(Box(7)).map(x => x * 2);
const res2 = boxToEither(Box(7).map(x => x * 2));
console.log(res1, res2);

const eitherToTask = e => e.fold(rejected, of);

eitherToTask(Right("dreams"))
  .run()
  .listen({
    onRejected: e => console.log("err", e),
    onResolved: r => console.log("res", r)
  });
