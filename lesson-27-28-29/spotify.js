const request = require("request");
const { task, of, rejected } = require("folktale/concurrency/task");
const Result = require("folktale/result");
const { authorizationHeader } = require("./keys.js");

const headers = {
  Authorization: authorizationHeader
};

const httpGet = url =>
  task(({ reject, resolve }) =>
    request({ url, headers }, (err, res, body) =>
      err ? reject(err) : resolve(body)
    )
  );

const parse = str =>
  Result.fromNullable(JSON.parse(str), `JSON.parse(str) returns a nullable`);

const resultToTask = r =>
  r.matchWith({
    Ok: ({ value }) => of(value),
    Error: ({ value }) => rejected(value)
  });

const getJSON = url =>
  httpGet(url)
    .map(parse)
    .chain(resultToTask);

const first = xs => Result.fromNullable(xs[0], "xs[0] returns a nullable");

const findArtist = name =>
  getJSON(`https://api.spotify.com/v1/search?q=${name}&type=artist`)
    .map(result => result.artists.items)
    .map(first)
    .chain(resultToTask);

const relatedArtists = artistId =>
  getJSON(`https://api.spotify.com/v1/artists/${artistId}/related-artists`).map(
    result => result.artists
  );

module.exports = { findArtist, relatedArtists };
