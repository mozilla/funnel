<script>
  import { format } from "d3-format";
  import HelpHoverable from "./HelpHoverable.svelte";

  export let label;
  export let value;
  export let compare;
  export let description;
  export let range;

  $: comparePct = value / compare - 1;
  $: compareStr = `${comparePct > 0 ? "+" : ""}${format(".1%")(
    comparePct
  )} from previous ${range} days (${format(",")(compare)})`;
</script>

<style>
  .big-number {
    font-size: var(--text-04);
    width: max-content;
    text-align: right;
  }

  .big-number--title {
    display: grid;
    grid-template-columns: auto auto;
    gap: 4px;
    justify-content: end;
  }

  .big-number--label {
    font-weight: 600;
    color: var(--cool-gray-750);
  }
  .big-number--number {
    text-align: right;
    font-size: var(--text-08);
    font-weight: 300;
    color: var(--cool-gray-600);
    font-family: var(--main-mono-font);
  }

  .big-number--compare {
    font-size: var(--text-02);
    color: var(--cool-gray-700);
  }
</style>

<div class="big-number">
  <div class="big-number--title">
    <div class="big-number--label">{label}</div>
    {#if description}
      <HelpHoverable {description} />
    {/if}
  </div>
  <div class="big-number--number">{format(',')(value)}</div>
  <div class="big-number--compare">
    {compare ? compareStr : 'Insufficient data for comparison'}
  </div>
</div>
