import { isDate, max, sum } from "lodash";

function sumColumn(data, valColName, dateFilter) {
  let filteredData = data;

  if (isDate(dateFilter)) {
    filteredData = data.filter(
      (d) =>
        d.date.getUTCFullYear() === dateFilter.getUTCFullYear() &&
        d.date.getUTCMonth() === dateFilter.getUTCMonth() &&
        d.date.getUTCDate() === dateFilter.getUTCDate()
    );
  } else if (dateFilter) {
    filteredData = data.filter(
      (d) => d.date >= dateFilter.start && d.date <= dateFilter.end
    );
  }

  // weird edge case where we're outside the range in the graph
  if (filteredData.length === 0) {
    filteredData = data;
  }
  return sum(filteredData.map((ni) => ni[valColName]));
}

function subtractDays(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - numDays);
  return newDate;
}

export function getSummary(data, dateFilter) {
  const summary = {
    nonFirefoxSessions: sumColumn(data, "nonFxSessions", dateFilter),
    downloads: sumColumn(data, "nonFxDownloads", dateFilter),
    newInstalls: sumColumn(data, "successful_new_installs", dateFilter),
    reinstalls: sumColumn(data, "successful_paveovers", dateFilter),
    newProfiles: sumColumn(data, "new_profiles", dateFilter),
    profileActivated: sumColumn(data, "num_activated", dateFilter),
  };
  summary.didntDownload = summary.nonFirefoxSessions - summary.downloads;
  summary.didntInstall =
    summary.downloads - summary.newInstalls - summary.reinstalls;
  summary.noNewProfile = summary.newInstalls - summary.newProfiles;
  summary.notActivated = summary.newProfiles - summary.profileActivated;

  return summary;
}

export function getSummaryDays(data, range) {
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
    dateRange: range,
    currentRange: dateFilterLatest,
    previousRange: dateFilterPrevious,
    current: getSummary(data, dateFilterLatest),
    previous: getSummary(data, dateFilterPrevious),
  };
}

export function getValueSeries(data, dateRange) {
  const latestDate = max(data.map((d) => d.date));
  const startDate = subtractDays(latestDate, dateRange);
  return data.filter((d) => d.date >= startDate);
}

export function getRateSeries(data, dateRange, x1ColName, x2ColName) {
  return getValueSeries(data, dateRange).map((d) => ({
    date: d.date,
    y: d[x2ColName] / d[x1ColName],
  }));
}
