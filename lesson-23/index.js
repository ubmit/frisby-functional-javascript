const fs = require("fs");
const { of } = require("folktale/concurrency/task");
const { List, Map } = require("immutable-ext");

const httpGet = (path, params) => of(`${path}: result`);

const routes = Map({ home: "/", about: "/about-us", blog: "blog" });

const firstResult = routes.map(route => httpGet(route, {}));
console.log(firstResult);

const secondResult = routes.traverse(of, route => httpGet(route, {}));
secondResult.run().listen({
  onResolved: res => console.log(res)
});
