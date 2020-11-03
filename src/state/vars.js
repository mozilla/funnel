import { writable } from "svelte/store";

export const dateRangeOptions = [
  {
    key: 7,
    label: "Previous 7 Days",
  },
  {
    key: 28,
    label: "Previous 28 Days",
  },
];

export const dateRange = writable(dateRangeOptions[1].key);
