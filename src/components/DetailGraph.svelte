<script>
  import { format } from "d3-format";
  import { timeFormat } from "d3-time-format";
  import { DataGraphic } from "@graph-paper/datagraphic";
  import { Line } from "@graph-paper/elements";
  import { MarginText, LeftAxis, BottomAxis } from "@graph-paper/guides";
  import { Stack } from "@graph-paper/stack";
  import { Tiles } from "@graph-paper/tiles";
  import HorizontalWindow from "./HorizontalWindow.svelte";
  import MetricMouseover from "./MetricMouseover.svelte";
  import { colorKey } from "./ColorKey";
  import { getValueSeries, getRateSeries } from "../state/summary.js";

  export let dateHover;

  export let width = 500;
  export let height = 320;
  export let size = 1;
  export let curve = "curveMonotoneX";
  export let dashArray = "1,0";
  export let data;
  export let dateRange;
  let mousePosition2;

  $: {
    if (dateHover) {
      dateHover(mousePosition2 && mousePosition2.x);
    }
  }

  $: datasets = [
    {
      data: getValueSeries(data, dateRange),
      x: "date",
      y: "nonFxSessions",
      color: colorKey.sessions,
      label: "Web Sessions",
    },
    {
      data: getValueSeries(data, dateRange),
      x: "date",
      y: "nonFxDownloads",
      color: colorKey.downloads,
      label: "Downloads",
    },
    {
      data: getValueSeries(data, dateRange),
      x: "date",
      y: "successful_new_installs",
      color: colorKey.installs,
      label: "New Installs",
    },
    {
      data: getValueSeries(data, dateRange),
      x: "date",
      y: "new_profiles",
      color: colorKey.profiles,
      label: "New Profiles",
    },
    {
      data: getValueSeries(data, dateRange),
      x: "date",
      y: "num_activated",
      color: colorKey.activations,
      label: "Activated Profiles",
    },
  ];

  $: rateDatasets = [
    {
      x: "date",
      y: "y",
      data: getRateSeries(data, dateRange, "nonFxSessions", "nonFxDownloads"),
      label: "Download rate",
      color: colorKey.downloads,
    },
    {
      x: "date",
      y: "y",
      data: getRateSeries(
        data,
        dateRange,
        "nonFxSessions",
        "successful_new_installs"
      ),
      label: "Installation rate",
      color: colorKey.installs,
    },
    {
      x: "date",
      y: "y",
      data: getRateSeries(data, dateRange, "nonFxSessions", "new_profiles"),
      label: "New profile rate",
      color: colorKey.profiles,
    },
    {
      x: "date",
      y: "y",
      data: getRateSeries(data, dateRange, "nonFxSessions", "num_activated"),
      label: "Activation rate",
      color: colorKey.activations,
    },
  ];
</script>

<Tiles>
  <Stack>
    <h4>Numbers</h4>
    <DataGraphic
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
    <h4>Rates</h4>
    <DataGraphic
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
