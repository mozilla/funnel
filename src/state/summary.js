import { isDate, max, sum } from "lodash";

function sumColumn(data, valColName) {
  return sum(data.map((ni) => ni[valColName]));
}

function subtractDays(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - numDays);
  return newDate;
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
  console.log(filteredData);
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
  const latestDate = max(data.map((d) => d.date));
  const dateFilterLatest = {
    start: subtractDays(latestDate, range),
    end: new Date(latestDate),
  };
  const dateFilterPrevious = {
    start: subtractDays(latestDate, range * 2 - 1),
    end: subtractDays(latestDate, range - 1),
  };

  return {
    range,
    currentRange: dateFilterLatest,
    previousRange: dateFilterPrevious,
    current: getSummary(data, countryGroup, dateFilterLatest),
    previous: getSummary(data, countryGroup, dateFilterPrevious),
  };
}

export function getValueSeries(data, countryGroup, dateRange) {
  const latestDate = max(data.map((d) => d.date));
  const startDate = subtractDays(latestDate, dateRange);
  return data.filter(
    (d) => d.country_group === countryGroup && d.date >= startDate
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
