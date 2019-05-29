const { List } = require("immutable-ext");
const { fromNullable, Left, Right } = require("../utils");
const { task, of, rejected } = require("folktale/concurrency/task");

// first example

const firstResult = List(["hello", "world"]).chain(x => List(x.split("")));
console.log(firstResult);

// second example

const first = xs => fromNullable(xs[0]);
const largeNumbers = xs => xs.filter(x => x > 100);
const larger = x => x * 2;

const app = xs => first(largeNumbers(xs)).map(larger);
// note that:
// first(largeNumbers(xs)).map(larger) == first(largeNumbers(xs).map(larger))

console.log(app([2, 200, 4, 500]));

// third example

const fake = id => ({ id, name: "user1", best_friend_id: id + 1 });

const Db = {
  find: id =>
    task(({ reject, resolve }) => {
      resolve(id > 2 ? Right(fake(id)) : Left("not found"));
    })
};

const eitherToTask = e => e.fold(rejected, of);

Db.find(3)
  .chain(eitherToTask)
  .chain(user => Db.find(user.best_friend_id))
  .chain(eitherToTask)
  .run()
  .listen({
    onRejected: console.error,
    onResolved: console.log
  });
