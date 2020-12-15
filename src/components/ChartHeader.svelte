<script>
  import { timeFormat } from "d3-time-format";
  import HelpHoverable from "./HelpHoverable.svelte";

  export let title;
  export let description;
  export let dateGuide;
</script>

<style>
  .chart-header {
    display: grid;
    grid-template-columns: auto auto 1fr;
    height: 32px;
    gap: 4px;
    grid-auto-flow: column;
    justify-content: start;
    align-items: center;
    font-size: var(--text-04);
    color: var(--cool-gray-750);
  }
  .date-text {
    justify-self: end;
    font-size: var(--text-01);
    padding-right: var(--space-4x);
  }
</style>

<div class="chart-header">
  <div>{title}</div>
  <HelpHoverable {description} />
  <div class="date-text">
    {#if dateGuide}{timeFormat('%b %d %Y')(dateGuide)}{/if}
  </div>
</div>
