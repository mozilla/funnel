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
</div>
