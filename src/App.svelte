<script>
  import { fields } from "./config";
  import DetailGraph from "./components/DetailGraph.svelte";
  import ExecutiveSummary from "./components/ExecutiveSummary.svelte";
  import Sankey2 from "./components/Sankey2.svelte";
  import SiteHeader from "./components/SiteHeader.svelte";
  import SubSectionHeader from "./components/SubSectionHeader.svelte";
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
    background-color: #d44;
    color: white;
    padding: 20px;
    text-align: center;
  }

  /* use h4 for chart titles */
  h4 {
    margin: 0;
  }

  .explanatory-paragraph {
    margin-top: 0px;
  }
</style>

<SiteHeader />
<main>
  <div class="surface surface--border-radius--1" style="height:100%">
    <div class="content-block--padding--8 content-block">
      <div class="warning">
        The data behind this visualization is
        <b>NOT</b>
        fully validated. Do
        <b>not</b>
        make any judgements or decisions based on it!!
      </div>
      <SubSectionHeader>The Firefox Acquisition Journey</SubSectionHeader>
      {#if data}
        <p class="explanatory-paragraph">From July 1st to October 10th 2020</p>
        <ExecutiveSummary {data} />
      {/if}
      <SubSectionHeader>Change over Time</SubSectionHeader>
      {#if data}
        <div class="centered content-element">
          <DetailGraph {data} {dateHover} />
        </div>
        <div class="centered content-element">
          <Sankey2 {data} {dateFilter} />
        </div>
      {/if}
    </div>
  </div>
</main>
<footer>Made by Mozilla Data.</footer>
