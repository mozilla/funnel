<script>
  import { format } from "d3-format";
  import Help from "./Help.svelte";
  import { tooltip } from "./tooltip";

  export let label;
  export let value;
  export let compare;
  export let description;

  $: comparePct = value / compare - 1;
  $: compareStr = `vs. ${format(",")(compare)} in previous (${
    comparePct > 0 ? "+" : ""
  }${format(".0%")(comparePct)})`;
</script>

<style>
  .big-number {
    font-size: var(--text-04);
    width: max-content;
    text-align: right;
  }

  .big-number--sublabel {
    font-size: var(--text-02);
    text-transform: uppercase;
    color: var(--cool-gray-600);
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
  <div class="big-number--label">
    {label}
    {#if description}
      <span use:tooltip={{ text: description, location: 'top' }}>
        <Help size="16" />
      </span>
    {/if}
  </div>
  <div class="big-number--number">{format(',')(value)}</div>
  <div class="big-number--compare">{compareStr}</div>

</div>
