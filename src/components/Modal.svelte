<script>
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { Close } from "@graph-paper/icons";

  export let isOpen = false;

  const dispatch = createEventDispatcher();

  const close = () => {
    dispatch("closed");
  };

  const keydown = (e) => {
    if (e.key === "Escape") {
      close();
    }
  };
</script>

<style>
  .gp-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .gp-modal__backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .gp-modal__wrapper {
    position: relative;
    z-index: 1000;
    width: 480px;
    border-radius: var(--space-1h);
    background-color: white;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .gp-modal__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: var(--space-base) var(--space-2x) 0;
    background-color: var(--cool-gray-150);
    color: var(--digital-blue-600);
    font-size: var(--text-04);
  }
  .gp-modal__header div {
    padding: var(--space-base) 0 0 0;
    margin: 0;
  }
  .gp-modal__header button {
    margin: 0;
    padding: var(--space-base);
    padding-right: 0;
    border: 0;
    background-color: transparent;
    color: var(--digital-blue-600);
    cursor: pointer;
  }
  .gp-modal__content {
    padding: var(--space-2x);
    font-size: var(--text-02);
    max-height: 50vh;
    overflow: auto;
  }
</style>

{#if isOpen}
  <!-- svelte-ignore a11y-autofocus -->
  <div
    class="gp-modal"
    on:keydown|stopPropagation={keydown}
    tabindex={0}
    autofocus
    transition:fade={{ duration: 250 }}>
    <div class="gp-modal__backdrop" on:click={close} />
    <div class="gp-modal__wrapper">
      <div class="gp-modal__header">
        <div>
          <slot name="title" />
        </div>
        <button on:click={close}>
          <Close />
        </button>
      </div>
      <div class="gp-modal__content">
        <slot />
      </div>
      <div class="gp-modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
{/if}
