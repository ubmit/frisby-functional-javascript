const { of, task } = require("folktale/concurrency/task");

const Db = {
  find: id =>
    task(({ reject, resolve }) =>
      setTimeout(() => resolve({ id, title: `Project ${id}` }), 100)
    )
};

const reportHeader = (p1, p2) => `Report: ${p1.title} compared to ${p2.title}`;

// const app = () =>
//   Db.find(20).chain(p1 => Db.find(8).map(p2 => reportHeader(p1, p2)));

// app()
//   .run()
//   .listen({
//     onRejected: e => console.log(e),
//     onResolved: res => console.log(res)
//   });

const app = of(p1 => p2 => reportHeader(p1, p2))
  .ap(Db.find(20))
  .ap(Db.find(8));

app.run().listen({
  onResolved: res => console.log(res)
});
