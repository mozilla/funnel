<script>
  import DetailGraph from "./components/DetailGraph.svelte";
  import ExecutiveSummary from "./components/ExecutiveSummary.svelte";
  import Sankey2 from "./components/Sankey2.svelte";
  import SiteHeader from "./components/SiteHeader.svelte";
  import StickyHeader from "./components/StickyHeader.svelte";
  import SubSectionHeader from "./components/SubSectionHeader.svelte";
  import SiteFooter from "./components/SiteFooter.svelte";
  import { fetchQueries, queryData } from "./state/queries";
  import { fetchReleases } from "./state/releases";
  import { feedbackLink } from "./links";
  import { getSummaryDays } from "./state/summary";
  import { country, dateRange } from "./state/vars";

  let dateFilter;
  let summary;
  Promise.all([fetchReleases(), fetchQueries()]).then(() => {
    dateRange.subscribe((value) => {
      summary = getSummaryDays($queryData, $country, value);
    });
    country.subscribe((value) => {
      summary = getSummaryDays($queryData, value, $dateRange);
    });
  });

  function dateHover(date) {
    dateFilter = date;
  }

  function getCSV() {
    const keys = Object.keys($queryData[0]);
    const encodedCSV = encodeURI(
      [keys.join(",")]
        .concat(
          $queryData.map((d) =>
            keys
              .map((k) =>
                d[k] instanceof Date ? d[k].toISOString() : JSON.stringify(d[k])
              )
              .join(",")
          )
        )
        .join("\n")
    );

    return `data:application/octet-stream,${encodedCSV}`;
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

  .main-content-block {
    padding-left: var(--space-8x);
    padding-right: var(--space-8x);
    max-width: 1024px;
  }
</style>

<SiteHeader />
<main>
  <div class="surface surface--border-radius--1" style="height:100%">
    <div class="main-content-block content-block">
      {#if $queryData && summary}
        <StickyHeader {summary} />
        <p>
          This dashboard models the user journey of new Firefox (desktop) users
          acquired from mozilla.org. It is restricted to mozilla.org visits and
          downloads from a browser other than Firefox on Windows only (i.e., it
          excludes Mac and Linux), and also excludes new users coming from other
          sources (FTP, partners, etc.). Users can download Firefox from several
          different touchpoints on mozilla.org (e.g.,
          <a href="https://www.mozilla.org/en-US/firefox/new/">landing</a>
          <a href="https://www.mozilla.org/en-US/firefox/unfck/">pages</a>,
          navigation, banners), and this dashboard currently aggregates
          downloads across all these touchpoints.
        </p>
        <p>
          While the data in this visualization has undergone a preliminary
          validation, the presentation is still very much in flux.
          <a href={feedbackLink} target="blank_">Feedback</a>
          (and questions!) are welcome. You can
          <a download="numbers-that-matter.csv" href={getCSV()}>download a csv
            copy</a>
          of the data powering this dashboard.
        </p>
        <SubSectionHeader>mozilla.org Attributed Funnel</SubSectionHeader>
        <ExecutiveSummary {summary} />
        <SubSectionHeader>Details</SubSectionHeader>
        <div class="content-element">
          <Sankey2 {summary} data={$queryData} {dateFilter} />
        </div>
        <div class="content-element">
          <DetailGraph {dateHover} />
        </div>
      {/if}
    </div>
  </div>
  <SiteFooter />
</main>
