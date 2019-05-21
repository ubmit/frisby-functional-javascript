const { of, rejected, task } = require("folktale/concurrency/task");

// const result = of(1)
//   .map(x => x + 1)
//   .run()
//   .listen({
//     onRejected: e => console.log("error", e),
//     onResolved: x => console.log("success", x)
//   });

// const result = rejected(1)
//   .map(x => x + 1)
//   .run()
//   .listen({
//     onRejected: e => console.log("error", e),
//     onResolved: x => console.log("success", x)
//   });

// const result = of(1)
//   .map(x => x + 1)
//   .chain(x => of(x + 1))
//   .run()
//   .listen({
//     onRejected: e => console.log("error", e),
//     onResolved: x => console.log("success", x)
//   });

// const result = rejected(1)
//   .map(x => x + 1)
//   .chain(x => of(x + 1))
//   .run()
//   .listen({
//     onRejected: e => console.log("error", e),
//     onResolved: x => console.log("success", x)
//   });

const launchMissiles = () =>
  task(resolver => {
    console.log("launch missiles!");
    resolver.resolve("missile");
  });

const app = launchMissiles().map(x => x + "!");

const result = app
  .map(x => x + "!")
  .run()
  .listen({
    onRejected: e => console.log("error", e),
    onResolved: x => console.log("success", x)
  });

console.log(result);
