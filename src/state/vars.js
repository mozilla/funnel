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
  {
    key: 56,
    label: "Previous 56 Days",
  },
  {
    key: 84,
    label: "Previous 84 Days",
  },
];

export const dateRange = writable(dateRangeOptions[1].key);

export const countryOptions = [
  { key: "Overall", label: "All Countries" },
  {
    key: "tier-1",
    label: "Tier 1 Countries",
    description: "USA, France, Germany, UK, and Canada",
  },
  {
    key: "non-tier-1",
    label: "Rest of World",
    description: "all countries not in Tier 1",
  },
  { key: "DIVIDER" },
  { key: "US", label: "USA" },
  { key: "FR", label: "France" },
  { key: "DE", label: "Germany" },
  { key: "GB", label: "Great Britain" },
  { key: "CA", label: "Canada" },
  { key: "MX", label: "Mexico" },
  { key: "BR", label: "Brazil" },
  { key: "CN", label: "China" },
];

export const country = writable(countryOptions[0].key);
