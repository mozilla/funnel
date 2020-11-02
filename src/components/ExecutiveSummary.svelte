<script>
  import { sortBy, zipWith } from "lodash";
  import { format } from "d3-format";
  import BigNumber from "./BigNumber.svelte";
  export let summary;

  const dateFormat = new Intl.DateTimeFormat([], {
    dateStyle: "medium",
  });
</script>

<style>
  .explanatory-paragraph {
    margin-top: 0px;
    margin-left: var(--space-2x);
    font-weight: 200;
    color: var(--cool-gray-650);
  }

  .topline-numbers {
    display: grid;
    grid-column-gap: var(--space-8x);
    grid-row-gap: var(--space-8x);
    grid-template-columns: repeat(3, auto);
    justify-items: end;
    justify-content: center;
    margin-left: var(--space-4x);
    margin-right: var(--space-4x);
  }
</style>

<p class="explanatory-paragraph">
  Comparison: {dateFormat.format(summary.previousRange.start)} to {dateFormat.format(summary.previousRange.end)}
</p>

<div class="topline-numbers">
  <BigNumber
    label={'Non-Firefox Web Sessions'}
    description={'The period of time a user is active on mozilla.org. By default, if a user is inactive for 30 minutes or more, any future activity is attributed to a new session. Users that leave mozilla.org and return within 30 minutes are counted as part of the original session.'}
    value={summary.current.nonFirefoxSessions}
    compare={summary.previous.nonFirefoxSessions} />
  <BigNumber
    label={'Non-Firefox Downloads'}
    description={'A click (capped at one click per session per button) on download button(s) on the website. If  a user clicks on different download buttons, they can have multiple downloads, but multiple clicks on the same button will count as one download. Both two click and one click download flows on the website will credit a single download.'}
    value={summary.current.downloads}
    compare={summary.previous.downloads} />
  <BigNumber
    label={'New Installs'}
    description={'A Firefox installer successfully completes installation on a machine where Firefox does not already exist on the target directory. Windows only (only windows sends this ping), attributed only (meaning installer was downloaded from Mozilla.org).'}
    value={summary.current.newInstalls}
    compare={summary.previous.newInstalls} />
  <BigNumber
    label={'Paveovers'}
    description={'A person who downloaded Firefox from the website using a non-Firefox browser installs over an existing installation of Firefox.'}
    value={summary.current.paveovers}
    compare={summary.previous.paveovers} />
  <BigNumber
    label={'New Profiles'}
    description={'Firefox is run for the first time on a new installation of Firefox (for installs downloaded from the website on a non-Firefox browser).'}
    value={summary.current.newProfiles}
    compare={summary.previous.newProfiles} />
  <BigNumber
    label={'Activated Profiles'}
    description={'A new profile is active at least 5 days out of 7 in the week after it’s first run. Note, this number is only available one week after a cohort date. '}
    value={summary.current.profileActivated}
    compare={summary.previous.profileActivated} />
</div>
