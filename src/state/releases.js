import { writable } from "svelte/store";

export const releaseData = writable(undefined);

export async function fetchReleases() {
  const rawData = await (
    await fetch("https://product-details.mozilla.org/1.0/firefox.json")
  ).json();
  releaseData.set(
    Object.values(rawData.releases)
      .filter((r) => r.category === "major")
      .map((r) => ({ ...r, date: new Date(r.date) }))
  );
}
