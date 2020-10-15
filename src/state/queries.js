import { autoType, csvParse } from "d3-dsv";
import { sortBy, zipWith } from "lodash";

const redashQueries = [
  {
    name: "numDownloads",
    url:
      "https://sql.telemetry.mozilla.org/api/queries/74894/results.csv?api_key=mQ3aAImuXR177ShZlRfcHKj8Su66WtHvRdBf18ix",
  },
  {
    name: "numInstalls",
    url:
      "https://sql.telemetry.mozilla.org/api/queries/75568/results.csv?api_key=m7QuLZeJaX52D22YGEOVKnTf5CVNnhz4dJlcfC0B",
  },
  {
    name: "numProfiles",
    url:
      "https://sql.telemetry.mozilla.org/api/queries/75048/results.csv?api_key=YPJrvF2xEMzmx9exAl6XO6uWyD3XAHLt4QV75rhR",
  },
];

export function fetchQueries() {
  return Promise.all(redashQueries.map((rq) => fetch(rq.url))).then(
    async (responses) => {
      const res = await Promise.all(
        responses.map(async (r) => {
          const csv = await r.text();
          return sortBy(
            csvParse(csv, autoType).filter((d) => {
              // filter to July at present
              return d.date.getUTCMonth() === 6;
            }),
            (d) => d.date
          );
        })
      );
      return zipWith(res[0], res[1], res[2], (a, b, c) => {
        return { ...a, ...b, ...c };
      });
    }
  );
}
