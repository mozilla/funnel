<script>
  import { fields } from "./config";
  import DetailGraph from "./components/DetailGraph.svelte";
  import Sankey from "./components/Sankey.svelte";
  import Sankey2 from "./components/Sankey2.svelte";
  import { fetchQueries } from "./state/queries";

  let data = undefined;
  fetchQueries().then(rs => {
    data = rs;
  });
</script>

<header>
  <h1 class="gafc">
    data.
    <span>mozilla</span>
  </h1>
</header>
<main>
  <div class="billboard">
    <h1>Numbers That Matter</h1>
    <div>
      Get acquainted with Mozilla's important product numbers. Selected by
      Product and vetted by Data Science, these numbers are insert copy here.
    </div>
  </div>
  {#if data}
    <div class="centered">
      <Sankey2 {data} />

    </div>
    <div class="centered">
      <DetailGraph {data} />
    </div>
  {:else}Waiting for datas...{/if}

</main>
<footer>Made by Mozilla Data.</footer>
