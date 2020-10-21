<script>
  import { format } from "d3-format";

  export let label;
  export let value;
</script>

<div class="big-number">
  <div class="big-number--label">{label}</div>
  <div class="big-number--number">{format(',')(value)}</div>
</div>
