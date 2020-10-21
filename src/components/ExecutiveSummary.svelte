<script>
  import { sum, sortBy, zipWith } from "lodash";
  import { format } from "d3-format";
  import BigNumber from "./BigNumber.svelte";
  export let data;

  function sumColumn(data, valColName) {
    return sum(data.map((ni) => ni[valColName]));
  }

  const summary = {
    nonFirefoxSessions: sumColumn(data, "nonFxSessions"),
    downloads: sumColumn(data, "nonFxDownloads"),
    newInstalls: sumColumn(data, "successful_new_installs"),
    paveovers: sumColumn(data, "successful_paveovers"),
    newProfiles: sumColumn(data, "new_profiles"),
    profileActivated: sumColumn(data, "num_activated"),
  };
  summary.didntDownload = summary.nonFirefoxSessions - summary.downloads;
  summary.didntInstall =
    summary.downloads - summary.newInstalls - summary.paveovers;
  summary.noNewProfile = summary.newInstalls - summary.newProfiles;
  summary.notActivated = summary.newProfiles - summary.profileActivated;
</script>

<style>
  .foo {
    display: grid;
  }
</style>

<div class="topline-numbers">
  <BigNumber
    label={'Non-Firefox Web Views'}
    value={summary.nonFirefoxSessions} />
  <BigNumber label={'Non-Firefox Downloads'} value={summary.downloads} />
  <BigNumber label={'New Installs'} value={summary.newInstalls} />
  <BigNumber label={'New Profiles'} value={summary.newProfiles} />
  <BigNumber label={'Activated Profiles'} value={summary.profileActivated} />
</div>
