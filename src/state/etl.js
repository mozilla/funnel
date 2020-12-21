import { min, max } from "lodash";

export function subtractDays(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - numDays);
  return newDate;
}

export function addDays(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + numDays);
  return newDate;
}

export function dateDifference(date1, date2) {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getMaxDate(data) {
  return max(data.map((d) => d.date));
}

export function getMinDate(data) {
  return min(data.map((d) => d.date));
}
