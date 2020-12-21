<script>
  import { utcFormat } from "d3-time-format";
  import { createEventDispatcher } from "svelte";
  import Button from "@graph-paper/button/Button.svelte";
  import Modal from "./Modal.svelte";
  import { queryData } from "../state/queries";
  import { addDays, getMaxDate, getMinDate, subtractDays } from "../state/etl";
  import { dateRange } from "../state/vars";

  export let isOpen = false;
  const dispatch = createEventDispatcher();

  export let startDate = "2020-12-01";
  export let endDate = "2020-12-11";
  function applyDateRangeAndClose() {
    dateRange.set({ start: new Date(startDate), end: new Date(endDate) });
    dispatch("closed");
  }
</script>

<style>
  .form-group {
    padding-bottom: var(--space-1x);
  }

  .form-group label {
    padding-bottom: var(--space-base);
  }

  .button-list {
    display: grid;
    grid-auto-flow: column;
    justify-content: end;
    grid-column-gap: var(--space-base);
  }
</style>

<Modal {isOpen}>
  <div slot="title">Custom Date Range</div>
  <div class="form-group">
    <label for="startDate" class="">Start Date</label><input
      type="date"
      id="startDate"
      class="form-control"
      bind:value={startDate}
      min={utcFormat('%Y-%M-%D')(getMinDate($queryData))}
      max={subtractDays(getMaxDate($queryData), 1)}
      required />
  </div>
  <div class="form-group">
    <label for="endDate" class="">End Date</label><input
      type="date"
      id="endDate"
      class="form-control"
      bind:value={endDate}
      min={addDays(getMinDate($queryData), 1)}
      max={utcFormat('%Y-%M-%D')(getMaxDate($queryData))}
      required />
  </div>
  <div class="button-list">
    <Button
      on:click={() => {
        isOpen = false;
      }}
      level="low">
      Cancel
    </Button>
    <Button on:click={applyDateRangeAndClose}>Apply</Button>
  </div>
</Modal>
