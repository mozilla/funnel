<script>
  import Button from "@graph-paper/button/Button.svelte";
  import Documentation from "@graph-paper/icons/Documentation.svelte";
  export let docs;
</script>

<style>
  .subsection-header {
    display: grid;
    grid-template-columns: auto max-content;
    align-items: center;
  }
  h3 {
    font-size: var(--text-06);
    color: var(--cool-gray-650);
    font-weight: normal;
    text-transform: uppercase;
  }
</style>

<div class="subsection-header">
  <h3>
    <slot />
  </h3>
  {#if docs}
    <div>
      <Button
        on:click={() => {
          window.open(docs, '_blank');
        }}>
        <Documentation size={16} />
        About this section
      </Button>
    </div>
  {/if}
</div>
