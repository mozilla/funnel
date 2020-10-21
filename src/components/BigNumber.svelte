<script>
  import { format } from "d3-format";

  export let label;
  export let value;
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
</style>

<div class="big-number">
  <div class="big-number--label">{label}</div>
  <div class="big-number--number">{format(',')(value)}</div>
</div>
