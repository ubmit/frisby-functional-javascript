const request = require("request");
const { task, of, rejected } = require("folktale/concurrency/task");
const Maybe = require("folktale/maybe");
const Result = require("folktale/result");

const httpGet = url =>
  task(({ reject, resolve }) =>
    request(url, (err, res, body) => (err ? reject(err) : resolve(body)))
  );

// const first = xs => Maybe(xs[0]);
const first = xs => Result.fromNullable(xs[0], "deu ruim");

// const maybeToTask = m => m.fold(of, rejected)
const resultToTask = r => console.log("hey", r);

const parse = str =>
  Result.fromNullable(JSON.parse(str), "e agora jose?").getOrElse("not found");

const findArtist = name =>
  httpGet(`https://api.spotify.com/v1/search?1=${name}&type=artist`)
    .map(result => result.artists.items)
    .map(first)
    .chain(resultToTask);

const relatedArtists = artistId =>
  httpGet(
    `https://api.spotify.com/v1/artists/${artistId}/related-artists`
  ).chain(resultToTask);

const foo = httpGet("https://jsonplaceholder.typicode.com/users")
  .map(parse)
  .map(first)
  .map(resultToTask);

const boom = taskName =>
  taskName.run().listen({
    onRejected: console.error,
    onResolved: console.log
  });

boom(foo);

module.exports = { findArtist, relatedArtists };
