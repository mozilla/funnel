import { autoType, csvParse } from "d3-dsv";
import { sortBy, zipWith } from "lodash";

const redashQueries = [
  {
    name: "numDownloads",
    url:
      "https://sql.telemetry.mozilla.org/api/queries/76276/results.csv?api_key=u03eA9ZbhRNnIzCSiAy13r6S3HEBj5wmv9WqVO8z",
  },
  {
    name: "numInstalls",
    url:
      "https://sql.telemetry.mozilla.org/api/queries/76247/results.csv?api_key=5H37v84oZ9DkVqwOla7ziKqtuwvOLrBw57Bf9jrJ",
  },
  {
    name: "numProfiles",
    url:
      "https://sql.telemetry.mozilla.org/api/queries/76277/results.csv?api_key=D9jSv7xp25O0FnwL6abLSzaiZZsh4XB491xNL9fA",
  },
];

export function fetchQueries() {
  return Promise.all(redashQueries.map((rq) => fetch(rq.url))).then(
    async (responses) => {
      const res = await Promise.all(
        responses.map(async (r) => {
          const csv = await r.text();
          return sortBy(csvParse(csv, autoType), (d) => d.date);
        })
      );
      console.log(res);
      return zipWith(res[0], res[1], res[2], (a, b, c) => {
        return { ...a, ...b, ...c };
      });
    }
  );
}
