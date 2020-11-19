<script>
  import { OptionMenu, Option, OptionDivider } from "@graph-paper/optionmenu";
  import HelpHoverable from "./HelpHoverable.svelte";
  import { fade } from "svelte/transition";
  import {
    country,
    countryOptions,
    dateRange,
    dateRangeOptions,
  } from "../state/vars.js";

  export let summary;

  let countrySelected;
  country.subscribe((value) => (countrySelected = value));
  function handleCountrySelection({ detail: { key } }) {
    country.set(key);
  }

  let dateSelected;
  dateRange.subscribe((value) => (dateSelected = value));
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
    grid-auto-flow: column;
    grid-column-gap: var(--space-4x);
  }
</style>

<div class="sticky-header">
  <h2>
    <div class="section-header">
      <div class="section-header__text">
        Numbers that Matter
        <span in:fade={{ duration: 1500 }} class="date-range">
          until
          {dateFormat.format(summary.currentRange.end)}
        </span>
        <HelpHoverable
          description="Results updated every Monday, a week behind so 7 day activation can be calculated." />
      </div>
      <div class="menus">
        <OptionMenu on:selection={handleDateRangeSelection}>
          {#each dateRangeOptions as { key, label }, i (key)}
            <Option {key} {label} selected={dateSelected === key} />
          {/each}
        </OptionMenu>
        <OptionMenu
          on:selection={handleCountrySelection}
          options={countryOptions}>
          {#each countryOptions as { key, label, description }, i (key)}
            {#if key === 'DIVIDER'}
              <OptionDivider />
            {:else}
              <Option
                {key}
                {label}
                {description}
                selected={countrySelected === key} />
            {/if}
          {/each}
        </OptionMenu>
      </div>
    </div>
  </h2>
</div>
