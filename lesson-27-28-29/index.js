const { task, of } = require("folktale/concurrency/task");
const { findArtist, relatedArtists } = require("./spotify");

const argv = task(({ reject, resolve }) => resolve(process.argv));
const names = argv.map(args => args.slice(2));

const related = name =>
  findArtist(name).chain(artist => relatedArtists(artist.id));

const main = ([name1, name2]) =>
  of(rels1 => rels2 => [rels1, rels2])
    .ap(related(name1))
    .ap(related(name2));

names
  .map(main)
  .run()
  .listen({
    onRejected: console.error,
    onResolved: console.log
  });
