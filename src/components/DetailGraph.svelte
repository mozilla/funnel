<script>
  import { format } from "d3-format";
  import { timeFormat } from "d3-time-format";
  import { DataGraphic } from "@graph-paper/datagraphic";
  import { Line } from "@graph-paper/elements";
  import { MarginText, LeftAxis, BottomAxis } from "@graph-paper/guides";
  import { Tiles } from "@graph-paper/tiles";
  import HorizontalWindow from "./HorizontalWindow.svelte";
  import MetricMouseover from "./MetricMouseover.svelte";

  export let dateHover;

  export let width = 600;
  export let height = 320;
  export let size = 1;
  export let curve = "curveMonotoneX";
  export let dashArray = "1,0";
  export let data;
  let mousePosition2;

  $: {
    if (dateHover) {
      dateHover(mousePosition2 && mousePosition2.x);
    }
  }

  function getRateSeries(data, x1ColName, x2ColName) {
    return data.map((d) => ({ date: d.date, y: d[x2ColName] / d[x1ColName] }));
  }

  $: datasets = [
    {
      data,
      x: "date",
      y: "nonFxSessions",
      color: "var(--digital-blue-500)",
      label: "Sessions",
    },
    {
      data,
      x: "date",
      y: "nonFxDownloads",
      color: "var(--pantone-red-500)",
      label: "Downloads",
    },
    {
      data,
      x: "date",
      y: "successful_new_installs",
      color: "var(--bright-yellow-500)",
      label: "New Installs",
    },
    {
      data,
      x: "date",
      y: "new_profiles",
      color: "var(--cool-gray-500)",
      label: "New Profiles",
    },
    {
      data,
      x: "date",
      y: "num_activated",
      color: "var(--pond-green-500)",
      label: "Activated Profiles",
    },
  ];

  $: rateDatasets = [
    {
      x: "date",
      y: "y",
      data: getRateSeries(data, "nonFxSessions", "nonFxDownloads"),
      label: "Sessions -> Downloads",
      color: "var(--digital-blue-500)",
    },
    {
      x: "date",
      y: "y",
      data: getRateSeries(data, "nonFxDownloads", "successful_new_installs"),
      label: "Downloads -> Installs",
      color: "var(--pantone-red-500)",
    },
    {
      x: "date",
      y: "y",
      data: getRateSeries(data, "successful_new_installs", "new_profiles"),
      label: "Installs -> New Profiles",
      color: "var(--bright-yellow-500)",
    },
    {
      x: "date",
      y: "y",
      data: getRateSeries(data, "new_profiles", "num_activated"),
      label: "New Profiles -> Activated",
      color: "var(--pond-green-500)",
    },
  ];
</script>

<Tiles>
  <DataGraphic
    yMin={0}
    xType="time"
    yType="linear"
    left={128}
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

  <DataGraphic
    yMin={0}
    yMax={1}
    xType="time"
    yType="linear"
    left={128}
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
</Tiles>
