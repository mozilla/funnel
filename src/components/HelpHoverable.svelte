<script>
  import Help from "./Help.svelte";
  import { tooltip } from "./tooltip";

  export let description;
</script>

<span use:tooltip={{ text: description, location: 'top' }}>
  <Help size="16" />
</span>
