import { isDate, isNumber, max, sum } from "lodash";
import { dateDifference, getMinDate, getMaxDate, subtractDays } from "./etl";

function sumColumn(data, valColName) {
  return sum(data.map((ni) => ni[valColName]));
}

export function getSummary(data, countryGroup, dateFilter) {
  const filteredData = data
    .filter((d) => d.country_group === countryGroup)
    .filter((d) => {
      if (isDate(dateFilter)) {
        return (
          d.date.getUTCFullYear() === dateFilter.getUTCFullYear() &&
          d.date.getUTCMonth() === dateFilter.getUTCMonth() &&
          d.date.getUTCDate() === dateFilter.getUTCDate()
        );
      }
      if (dateFilter) {
        return d.date >= dateFilter.start && d.date <= dateFilter.end;
      }
      return true;
    });
  const summary = {
    nonFirefoxSessions: sumColumn(filteredData, "nonFxSessions"),
    downloads: sumColumn(filteredData, "nonFxDownloads"),
    newInstalls: sumColumn(filteredData, "successful_new_installs"),
    reinstalls: sumColumn(filteredData, "successful_paveovers"),
    newProfiles: sumColumn(filteredData, "new_profiles"),
    profileActivated: sumColumn(filteredData, "num_activated"),
  };
  summary.didntDownload = summary.nonFirefoxSessions - summary.downloads;
  summary.didntInstall =
    summary.downloads - summary.newInstalls - summary.reinstalls;
  summary.noNewProfile = summary.newInstalls - summary.newProfiles;
  summary.notActivated = summary.newProfiles - summary.profileActivated;

  return summary;
}

export function getSummaryDays(data, countryGroup, range) {
  let dateFilterLatest;
  let dateFilterPrevious;
  let daysInRange;

  if (isNumber(range)) {
    daysInRange = range;

    const latestDate = getMaxDate(data);
    dateFilterLatest = {
      start: subtractDays(latestDate, range),
      end: new Date(latestDate),
    };
    dateFilterPrevious = {
      start: subtractDays(latestDate, range * 2 - 1),
      end: subtractDays(latestDate, range - 1),
    };
  } else {
    dateFilterLatest = range;
    daysInRange = dateDifference(range.end, range.start);
    dateFilterPrevious = {
      start: subtractDays(range.start, daysInRange),
      end: subtractDays(range.start, 1),
    };
  }
  return {
    daysInRange,
    currentRange: dateFilterLatest,
    previousRange: dateFilterPrevious,
    current: getSummary(data, countryGroup, dateFilterLatest),
    previous:
      dateFilterPrevious.start >= getMinDate(data)
        ? getSummary(data, countryGroup, dateFilterPrevious)
        : undefined,
  };
}

export function getValueSeries(data, countryGroup, dateRange) {
  if (isNumber(dateRange)) {
    const latestDate = max(data.map((d) => d.date));
    const startDate = subtractDays(latestDate, dateRange);
    return data.filter(
      (d) => d.country_group === countryGroup && d.date >= startDate
    );
  }
  return data.filter(
    (d) =>
      d.country_group === countryGroup &&
      d.date >= dateRange.start &&
      d.date <= dateRange.end
  );
}

export function getRateSeries(
  data,
  countryGroup,
  dateRange,
  x1ColName,
  x2ColName
) {
  return getValueSeries(data, countryGroup, dateRange).map((d) => ({
    date: d.date,
    y: d[x2ColName] / d[x1ColName],
  }));
}
