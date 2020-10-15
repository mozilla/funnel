<script>
  import { format } from "d3-format";
  import { timeFormat } from "d3-time-format";
  import { DataGraphic } from "@graph-paper/datagraphic";
  import { Line } from "@graph-paper/elements";
  import { MarginText, LeftAxis, BottomAxis } from "@graph-paper/guides";

  import HorizontalWindow from "./HorizontalWindow.svelte";
  import MetricMouseover from "./MetricMouseover.svelte";

  export let width = 600;
  export let height = 400;
  //export let points = 100;
  export let size = 1;
  export let curve = "curveMonotoneX";
  export let dashArray = "1,0";
  export let data;
  let mousePosition2 = {};

  function getSeries(data, xColName) {
    return data.map(d => ({ x: d.date, y: d[xColName] }));
  }

  $: datasets = [
    {
      data,
      x: "date",
      y: "nonFxSessions",
      color: "var(--digital-blue-500)",
      label: "Sessions"
    },
    {
      data,
      x: "date",
      y: "nonFxDownloads",
      color: "var(--pantone-red-500)",
      label: "Downloads"
    }
  ];
</script>

{mousePosition2.x}
<DataGraphic
  yMin={0}
  xType="time"
  yType="linear"
  left={64}
  right={128}
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
  xType="time"
  yType="linear"
  left={64}
  right={128}
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
