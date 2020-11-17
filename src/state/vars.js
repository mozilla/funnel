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
];

export const country = writable(countryOptions[0].key);
