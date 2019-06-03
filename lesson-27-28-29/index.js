const { task, of } = require("folktale/concurrency/task");
const { findArtist, relatedArtists } = require("./spotify");
const { List } = require("immutable-ext");
const { Pair, Sum } = require("./monoid");

const argv = task(({ reject, resolve }) => resolve(process.argv));
const names = argv.map(args => args.slice(2));

const Intersection = xs => ({
  xs,
  concat: ({ xs: ys }) => Intersection(xs.filter(x => ys.some(y => x === y)))
});

const related = name =>
  findArtist(name)
    .map(artist => artist.id)
    .chain(relatedArtists)
    .map(artists => artists.map(artist => artist.name));

const artistsInterception = rels =>
  rels
    .foldMap(x => Pair(Intersection(x), Sum(x.length)))
    .bimap(x => x.xs, y => y.x)
    .toList();

const main = names =>
  List(names)
    .traverse(of, related)
    .map(artistsInterception);

names
  .chain(main)
  .run()
  .listen({
    onRejected: err => console.error("Error:", err),
    onResolved: res => console.log(res)
  });
