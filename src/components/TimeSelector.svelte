<script>
  import { min, max } from "lodash";
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

  function closed() {
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

<Modal {isOpen} on:closed={closed}>
  <div slot="title">Custom Date Range</div>
  <div class="form-group">
    <label for="startDate" class="">Start Date</label><input
      type="date"
      id="startDate"
      class="form-control"
      bind:value={startDate}
      min={utcFormat('%Y-%m-%d')(getMinDate($queryData))}
      max={min([
        utcFormat('%Y-%m-%d')(subtractDays(new Date(endDate), 1)),
        utcFormat('%Y-%m-%d')(subtractDays(getMaxDate($queryData), 1)),
      ])}
      required />
  </div>
  <div class="form-group">
    <label for="endDate" class="">End Date</label><input
      type="date"
      id="endDate"
      class="form-control"
      bind:value={endDate}
      min={max([
        startDate,
        utcFormat('%Y-%m-%d')(addDays(getMinDate($queryData), 1)),
      ])}
      max={utcFormat('%Y-%m-%d')(getMaxDate($queryData))}
      required />
  </div>
  <div class="button-list">
    <Button
      on:click={() => {
        dispatch('closed');
      }}
      level="low">
      Cancel
    </Button>
    <Button on:click={applyDateRangeAndClose}>Apply</Button>
  </div>
</Modal>
