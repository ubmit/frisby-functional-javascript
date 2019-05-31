const { task, of } = require("folktale/concurrency/task");
const { findArtist, relatedArtists } = require("./spotify");

const argv = task(({ reject, resolve }) => resolve(process.argv));
const names = argv.map(args => args.slice(2));

const related = name =>
  findArtist(name)
    .map(artist => artist.id)
    .chain(relatedArtists)
    .map(artists => artists.map(artist => artist.name));

const main = ([name1, name2]) =>
  of(rels1 => rels2 => [rels1, rels2])
    .ap(related(name1))
    .ap(related(name2));

names
  .chain(main)
  .run()
  .listen({
    onRejected: err => console.error("Error:", err),
    onResolved: res => console.log(res)
  });
