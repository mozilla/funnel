<script>
  import { format } from "d3-format";
  import { timeFormat } from "d3-time-format";
  import { DataGraphic } from "@graph-paper/datagraphic";
  import { Line } from "@graph-paper/elements";
  import { MarginText, LeftAxis, BottomAxis } from "@graph-paper/guides";
  import { Stack } from "@graph-paper/stack";
  import { Tiles } from "@graph-paper/tiles";
  import HelpHoverable from "./HelpHoverable.svelte";
  import HorizontalWindow from "./HorizontalWindow.svelte";
  import MetricMouseover from "./MetricMouseover.svelte";
  import { colorKey } from "./ColorKey";
  import { getValueSeries, getRateSeries } from "../state/summary.js";
  import { country, dateRange } from "../state/vars.js";

  export let dateHover;

  export let width = 500;
  export let height = 320;
  export let size = 1;
  export let curve = "curveMonotoneX";
  export let dashArray = "1,0";
  export let data;
  let mousePosition2;

  let datasets = [];
  let rateDatasets = [];

  const recreateDatasets = () => {
    datasets = [
      {
        data: getValueSeries(data, $country, $dateRange),
        x: "date",
        y: "nonFxSessions",
        color: colorKey.sessions,
        label: "Visits",
      },
      {
        data: getValueSeries(data, $country, $dateRange),
        x: "date",
        y: "nonFxDownloads",
        color: colorKey.downloads,
        label: "Downloads",
      },
      {
        data: getValueSeries(data, $country, $dateRange),
        x: "date",
        y: "successful_new_installs",
        color: colorKey.installs,
        label: "New installs",
      },
      {
        data: getValueSeries(data, $country, $dateRange),
        x: "date",
        y: "new_profiles",
        color: colorKey.profiles,
        label: "First runs",
      },
      {
        data: getValueSeries(data, $country, $dateRange),
        x: "date",
        y: "num_activated",
        color: colorKey.activations,
        label: "Activated",
      },
    ];
    rateDatasets = [
      {
        x: "date",
        y: "y",
        data: getRateSeries(
          data,
          $country,
          $dateRange,
          "nonFxSessions",
          "nonFxDownloads"
        ),
        label: "Download rate",
        color: colorKey.downloads,
      },
      {
        x: "date",
        y: "y",
        data: getRateSeries(
          data,
          $country,
          $dateRange,
          "nonFxSessions",
          "successful_new_installs"
        ),
        label: "Installation rate",
        color: colorKey.installs,
      },
      {
        x: "date",
        y: "y",
        data: getRateSeries(
          data,
          $country,
          $dateRange,
          "nonFxSessions",
          "new_profiles"
        ),
        label: "New profile rate",
        color: colorKey.profiles,
      },
      {
        x: "date",
        y: "y",
        data: getRateSeries(
          data,
          $country,
          $dateRange,
          "nonFxSessions",
          "num_activated"
        ),
        label: "Activation rate",
        color: colorKey.activations,
      },
    ];

    console.log(datasets);
  };

  country.subscribe(recreateDatasets);
  dateRange.subscribe(recreateDatasets);

  $: {
    if (dateHover) {
      dateHover(mousePosition2 && mousePosition2.x);
    }
  }
</script>

<style>
  .chart-header {
    display: grid;
    gap: 4px;
    grid-auto-flow: column;
    justify-content: left;
    align-content: center;
    font-size: var(--text-04);
    color: var(--cool-gray-750);
  }
</style>

<Tiles>
  <Stack>
    <div class="chart-header">
      Numbers
      <HelpHoverable
        description={'Aggregate counts of each funnel milestone per day. This allows us to understand how the funnel is changing over time. Note: the number of users entering our funnel has high day-of-week seasonality, meaning the volume dips on weekends, and spikes on weekdays. This is normal and expected.'} />
    </div>
    <DataGraphic
      xMin={datasets[0].data[0].date}
      yMin={0}
      xType="time"
      yType="linear"
      left={54}
      top={16}
      bottom={48}
      {width}
      {height}
      bind:mousePosition={mousePosition2}>
      <LeftAxis tickFormatter={format(',.0r')} />
      <BottomAxis />
      {#each datasets as dataset}
        <Line
          {curve}
          data={dataset.data}
          x={dataset.x}
          y={dataset.y}
          color={dataset.color}
          {size}
          {dashArray} />
      {/each}
      <g slot="annotation" let:xScale let:top let:bottom>
        <HorizontalWindow {datasets} value={mousePosition2.x} let:output>
          {#if mousePosition2.x}
            <text
              x={xScale(output[0].match.date)}
              y={top - 4}
              font-size="12"
              fill="var(--cool-gray-600)"
              text-anchor="middle">
              {timeFormat('%b %d %Y')(output[0].match.date)}
            </text>
            <line
              x1={xScale(output[0].match.date)}
              x2={xScale(output[0].match.date)}
              y1={top}
              y2={bottom}
              stroke-dasharray="3,1"
              stroke="var(--cool-gray-300)" />
            <MetricMouseover point={output} formatValue={format(',')} />
          {/if}
        </HorizontalWindow>
      </g>
    </DataGraphic>
  </Stack>

  <Stack>
    <div class="chart-header">
      Rates
      <HelpHoverable
        description={'Percentages of each funnel milestone per day. “Of all the visitors for that day, how many reached <X> milestone for that day?”'} />
    </div>
    <DataGraphic
      xMin={datasets[0].data[0].date}
      yMin={0}
      yMax={1}
      xType="time"
      yType="linear"
      left={54}
      top={16}
      bottom={48}
      {width}
      {height}
      bind:mousePosition={mousePosition2}>
      <LeftAxis tickFormatter={format('.0%')} />
      <BottomAxis />
      {#each rateDatasets as dataset}
        <Line
          {curve}
          data={dataset.data}
          x={dataset.x}
          y={dataset.y}
          color={dataset.color}
          {size}
          {dashArray} />
      {/each}
      <g slot="annotation" let:xScale let:top let:bottom>
        <HorizontalWindow
          datasets={rateDatasets}
          value={mousePosition2.x}
          let:output>
          {#if mousePosition2.x}
            <text
              x={xScale(output[0].match.date)}
              y={top - 4}
              font-size="12"
              fill="var(--cool-gray-600)"
              text-anchor="middle">
              {timeFormat('%b %d %Y')(output[0].match.date)}
            </text>
            <line
              x1={xScale(output[0].match.date)}
              x2={xScale(output[0].match.date)}
              y1={top}
              y2={bottom}
              stroke-dasharray="3,1"
              stroke="var(--cool-gray-300)" />
            <MetricMouseover point={output} formatValue={format('.2%')} />
          {/if}
        </HorizontalWindow>
      </g>
    </DataGraphic>
  </Stack>
</Tiles>
