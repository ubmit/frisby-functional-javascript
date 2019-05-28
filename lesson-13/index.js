const { task } = require("folktale/concurrency/task");
const fs = require("fs");
const path = require("path");

const readFile = (filename, enc) =>
  task(({ reject, resolve }) => {
    fs.readFile(path.join(__dirname, filename), enc, (err, contents) =>
      err ? reject(err) : resolve(contents)
    );
  });

const writeFile = (filename, contents) =>
  task(({ reject, resolve }) => {
    fs.writeFile(filename, contents, (err, success) =>
      err ? reject(err) : resolve(success)
    );
  });

// const app = () =>
//   fs.readFile("config.json", "utf-8", (err, contents) => {
//     if (err) throw err;

//     const newContents = contents.replace(/8/g, "6");

//     fs.writeFile("config.json", newContents, (err, _) => {
//       if (err) throw err;
//       console.log("success!");
//     });
//   });

const app = () =>
  readFile("config.json", "utf-8")
    .map(contents => contents.replace(/8/g, "7"))
    .chain(contents => writeFile("config1.json", contents));

app()
  .run()
  .listen({
    onRejected: e => console.log(e),
    onResolved: x => console.log("success")
  });
