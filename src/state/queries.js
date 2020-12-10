import { autoType, csvParse } from "d3-dsv";
import { sortBy, zipWith } from "lodash";
import queries from "../../queries.json";

export function fetchQueries() {
  return Promise.all(queries.map((rq) => fetch(rq))).then(async (responses) => {
    const res = await Promise.all(
      responses.map(async (r) => {
        const csv = await r.text();
        return sortBy(csvParse(csv, autoType), (d) => d.date);
      })
    );
    return zipWith(res[0], res[1], res[2], (a, b, c) => {
      return { ...a, ...b, ...c };
    });
  });
}
