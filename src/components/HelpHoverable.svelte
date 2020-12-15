<script>
  import Help from "./Help.svelte";
  import { tooltip } from "./tooltip";

  export let description;
</script>

<style>
  .hoverable-container {
    display: flex;
    align-items: center;
  }
</style>

<div
  class="hoverable-container"
  use:tooltip={{ text: description, location: 'top' }}>
  <Help size="16" />
</div>
