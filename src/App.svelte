<script>
  import { fields } from "./config";
  import DetailGraph from "./components/DetailGraph.svelte";
  import ExecutiveSummary from "./components/ExecutiveSummary.svelte";
  import Sankey2 from "./components/Sankey2.svelte";
  import SiteHeader from "./components/SiteHeader.svelte";
  import StickyHeader from "./components/StickyHeader.svelte";
  import SubSectionHeader from "./components/SubSectionHeader.svelte";
  import { fetchQueries } from "./state/queries";
  import { feedbackLink } from "./links.js";
  import { getSummaryDays } from "./state/summary.js";
  import { dateRange } from "./state/vars.js";

  let data;
  let dateFilter;
  let summary;

  fetchQueries().then((rs) => {
    data = rs;
    dateRange.subscribe((value) => {
      summary = getSummaryDays(data, value);
    });
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

  .main-content-block {
    padding-left: var(--space-8x);
    padding-right: var(--space-8x);
  }
</style>

<SiteHeader />
<main>
  <div class="surface surface--border-radius--1" style="height:100%">
    <div class="main-content-block content-block">
      {#if data}
        <StickyHeader {summary} />
        <div class="warning">
          While the data in this visualization has undergone a preliminary
          validation, the presentation is still very much in flux.
          <a href={feedbackLink} target="blank_">Feedback</a>
          (and questions!) are welcome.
        </div>
        <SubSectionHeader>The Firefox Acquisition Journey</SubSectionHeader>
        <ExecutiveSummary {summary} />
        <SubSectionHeader>Details</SubSectionHeader>
        <div class="content-element">
          <Sankey2 {summary} {data} {dateFilter} />
        </div>
        <div class="content-element">
          <DetailGraph {data} {dateHover} />
        </div>
      {/if}
    </div>
  </div>
</main>
<footer>Made by Mozilla Data.</footer>
