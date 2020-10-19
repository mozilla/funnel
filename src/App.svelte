<script>
  import { fields } from "./config";
  import DetailGraph from "./components/DetailGraph.svelte";
  import Sankey from "./components/Sankey.svelte";
  import Sankey2 from "./components/Sankey2.svelte";
  import { fetchQueries } from "./state/queries";

  let data = undefined;
  let dateFilter = undefined;
  fetchQueries().then((rs) => {
    data = rs;
  });

  function dateHover(date) {
    dateFilter = date;
  }
</script>

<style>
  .warning {
    background-color: red;
  }
</style>

<header>
  <h1 class="gafc">
    data.
    <span>mozilla</span>
  </h1>
</header>
<main>
  <div class="warning">
    This data and visualization is
    <b>NOT</b>
    validated. Please do not make any decisions based on it!!
  </div>
  <div class="billboard">
    <h1>Numbers That Matter</h1>
    <div>
      Get acquainted with Mozilla's important product numbers. Selected by
      Product and vetted by Data Science, these numbers are insert copy here.
    </div>
  </div>
  <div class="centered">
    <h2>Funnel Metrics</h2>
  </div>
  {#if data}
    <div class="centered content-element">
      <DetailGraph {data} {dateHover} />
    </div>
    <div class="centered content-element">
      <Sankey2 {data} {dateFilter} />
    </div>
  {:else}Waiting for datas...{/if}

</main>
<footer>Made by Mozilla Data.</footer>
