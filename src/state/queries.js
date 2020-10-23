import { autoType, csvParse } from "d3-dsv";
import { sortBy, zipWith } from "lodash";

const redashQueries = [
  {
    name: "numDownloads",
    url:
      "https://sql.telemetry.mozilla.org/api/queries/75777/results.csv?api_key=oYtap5NZVQ0hgTkTgyrDtG33EkctfSGtG6iIE5wX",
  },
  {
    name: "numInstalls",
    url:
      "https://sql.telemetry.mozilla.org/api/queries/75782/results.csv?api_key=bE8GZUUYQk1yUlJRxNy7Tf5qKzSRS6peSY8CrWss",
  },
  {
    name: "numProfiles",
    url:
      "https://sql.telemetry.mozilla.org/api/queries/75780/results.csv?api_key=KenFZhAjEg0T28xZkaWyuv5DeCzQfj8gMaa3KgSU",
  },
];

export function fetchQueries() {
  return Promise.all(redashQueries.map((rq) => fetch(rq.url))).then(
    async (responses) => {
      const res = await Promise.all(
        responses.map(async (r) => {
          const csv = await r.text();
          return sortBy(
            csvParse(csv, autoType),
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
