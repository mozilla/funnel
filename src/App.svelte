<script>
  import { fields } from "./config";
  import DetailGraph from "./components/DetailGraph.svelte";
  import ExecutiveSummary from "./components/ExecutiveSummary.svelte";
  import Sankey2 from "./components/Sankey2.svelte";
  import SiteHeader from "./components/SiteHeader.svelte";
  import SubSectionHeader from "./components/SubSectionHeader.svelte";
  import { fetchQueries } from "./state/queries";
  import { feedbackLink } from "./links.js";

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
    background-color: #fff3cd;
    border-color: #ffeeba;
    color: #856404;
    padding: 20px;
    border-radius: 0.25rem;
    border: 1px solid transparent;
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
        While the data in this visualization has undergone a preliminary
        validation, the presentation is still very much in flux.
        <a href={feedbackLink} target="blank_">Feedback</a>
        (and questions!) are welcome.
      </div>
      <SubSectionHeader>The Firefox Acquisition Journey</SubSectionHeader>
      {#if data}
        <p class="explanatory-paragraph">From July 1st to October 10th 2020</p>
        <ExecutiveSummary {data} />
        <SubSectionHeader>Details</SubSectionHeader>
        <div class="content-element">
          <Sankey2 {data} {dateFilter} />
        </div>
        <div class="content-element">
          <DetailGraph {data} {dateHover} />
        </div>
      {/if}
    </div>
  </div>
</main>
<footer>Made by Mozilla Data.</footer>
