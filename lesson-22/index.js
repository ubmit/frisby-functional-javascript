const fs = require("fs");
const path = require("path");
const { of } = require("folktale/concurrency/task");
const futurize = require("futurize").futurize(of);
const { List } = require("immutable-ext");

const readFile = futurize(fs.readFile);

const files = ["foo.js", "bar.json"];

const firstResult = files.map(fn =>
  readFile(path.join(__dirname, fn), "utf-8")
);
console.log(firstResult);

// [Task] => Task([])

const filesList = List(files);

const app = filesList.traverse(of, fn =>
  readFile(path.join(__dirname, fn), "utf-8")
);

app.run().listen({
  onResolved: res => console.log(res)
});
