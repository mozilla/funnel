<script>
  import { OptionMenu, Option, OptionDivider } from "@graph-paper/optionmenu";
  import { fade } from "svelte/transition";
  import { dateRange, dateRangeOptions } from "../state/vars.js";

  export let summary;

  let selected;
  dateRange.subscribe((value) => (selected = value));

  function handleDateRangeSelection({ detail: { key } }) {
    dateRange.set(key);
  }
  const dateFormat = new Intl.DateTimeFormat([], {
    dateStyle: "medium",
  });
</script>

<style>
  .sticky-header {
    display: grid; /* h2 + selectors */
    grid-template-columns: auto max-content;
    position: sticky;
    top: 0;
    margin: 0;
    margin: auto;
    background-color: white;
  }
  .header-content {
    width: 100%;
    margin: auto;
    display: grid;
    grid-auto-flow: column;
    padding-top: var(--space-2x);
    padding-bottom: var(--space-2x);
    padding-left: var(--space-4x);
    padding-right: var(--space-2x);
    border-bottom: 2px solid var(--cool-gray-150);
  }
  .date-range {
    font-weight: 200;
    color: var(--cool-gray-650);
    padding-left: var(--space-2x);
    font-size: 0.8em;
  }

  .section-header {
    display: grid;
    grid-template-columns: auto max-content;
    grid-auto-flow: column;
    grid-column-gap: var(--space-4x);
    justify-content: start;
    align-content: center;
    position: sticky;
    top: 0;
    margin: 0;
    z-index: 10;
  }
  .menus {
    display: grid;
    align-content: center;
  }
</style>

<div class="sticky-header">
  <h2>
    <div class="section-header">
      <div class="section-header__text">
        The Numbers
        <span in:fade={{ duration: 1500 }} class="date-range">
          until
          {dateFormat.format(summary.currentRange.end)}
        </span>
      </div>
      <div class="menus">
        <OptionMenu on:selection={handleDateRangeSelection}>
          {#each dateRangeOptions as { key, label }, i (key)}
            <Option {key} {label} selected={selected === key} />
          {/each}
        </OptionMenu>
      </div>
    </div>
  </h2>
</div>