<script>
  import { format } from "d3-format";
  import {
    sankey as generateSankey,
    sankeyLinkHorizontal as embedding,
    sankeyLeft as nodeAlign,
  } from "d3-sankey";
  import { fade, fly } from "svelte/transition";
  import { colorKey } from "./ColorKey";
  import ChartHeader from "./ChartHeader.svelte";
  import { getSummary } from "../state/summary";
  import { country } from "../state/vars";

  export let summary;
  export let data;
  export let dateFilter;
  export let width = 900;
  export let height = 320;
  export let left = 0;
  export let right = 0;
  export let top = 0;
  export let bottom = 0;

  let sankey;
  $: {
    const localSummary = dateFilter
      ? getSummary(data, $country, dateFilter)
      : summary.current;
    const nodes = [
      {
        id: "nonFirefoxSessions",
        fixedValue: localSummary.nonFirefoxSessions,
        name: "Visits",
        color: colorKey.sessions,
        textColor: "#ddd",
      },
      {
        id: "downloads",
        name: "Downloaded",
        color: colorKey.downloads,
        textColor: "#ddd",
      },
      {
        id: "newInstalls",
        name: "Newly installed",
        color: colorKey.installs,
        textColor: "#ddd",
      },
      {
        id: "newProfiles",
        name: "First run",
        color: colorKey.profiles,
        textColor: "#444",
      },
      {
        id: "profileActivated",
        name: "7 day activated",
        color: colorKey.activations,
        textColor: "#444",
      },
      {
        id: "reinstalls",
        name: "Re-installed",
        color: colorKey.bounce,
        textColor: "#444",
      },
      {
        id: "didntDownload",
        name: "Didn't download",
        color: colorKey.bounce,
        textColor: "#444",
      },
      {
        id: "didntInstall",
        name: "Didn't install",
        color: colorKey.bounce,
        textColor: "#444",
      },
      {
        id: "noNewProfile",
        name: "No first run",
        color: colorKey.bounce,
        textColor: "#444",
      },
      {
        id: "notActivated",
        name: "Didn't activate",
        color: colorKey.bounce,
        textColor: "#444",
      },
    ];
    const links = [
      {
        source: "nonFirefoxSessions",
        target: "downloads",
        value: localSummary.downloads,
      },
      {
        source: "nonFirefoxSessions",
        target: "didntDownload",
        value: localSummary.didntDownload,
        bounced: true,
      },
      {
        source: "downloads",
        target: "newInstalls",
        value: localSummary.newInstalls,
      },
      {
        source: "downloads",
        target: "reinstalls",
        value: localSummary.reinstalls,
        bounced: true,
      },
      {
        source: "downloads",
        target: "didntInstall",
        value: localSummary.didntInstall,
        bounced: true,
      },
      {
        source: "newInstalls",
        target: "newProfiles",
        value: localSummary.newProfiles,
      },
      {
        source: "newInstalls",
        target: "noNewProfile",
        value: localSummary.noNewProfile,
        bounced: true,
      },
      {
        source: "newProfiles",
        target: "profileActivated",
        value: localSummary.profileActivated,
      },
      {
        source: "newProfiles",
        target: "notActivated",
        value: localSummary.notActivated,
        bounced: true,
      },
    ];

    sankey = generateSankey()
      .nodeId((d) => d.id)
      .extent([
        [left, top],
        [width - right, height - bottom],
      ])
      .nodeWidth(120)
      .nodeAlign(nodeAlign)
      .nodePadding(4)({
      nodes,
      links,
    });
  }
</script>

<style>
  svg {
    font-family: var(--font--viz);
    font-size: 0.7em;
  }
</style>

<ChartHeader
  title="Funnel Overview"
  description="Outlines aggregate flow of users reaching the next milestone in the funnel. Percentages at each milestone is out of the total funnel population (Visitors), not of the previous stage in the funnel."
  dateGuide={dateFilter} />

{#if sankey}
  <svg in:fly={{ duration: 500, y: -10 }} width="900" height="320">
    {#each sankey.links as link}
      <path
        in:fade={{ duration: 500 }}
        d={embedding()(link)}
        stroke-width={link.width}
        opacity={link.bounced ? 0.1 : 0.5}
        style="mix-blend-mode: {link.bounced ? 'multiply' : 'normal'};"
        stroke={link.bounced ? 'gray' : '#88bbcc'} />
    {/each}
    {#each sankey.nodes as node, i}
      <rect
        in:fade={{ duration: 500 }}
        x={node.x0}
        y={node.y0}
        height={node.y1 - node.y0}
        width={node.x1 - node.x0}
        fill={node.color} />
      <g
        in:fly={{ duration: 500, y: 5 * (i % 2 === 0 ? -1 : -2) }}
        fill={node.textColor}
        style="transform: translate({node.x0 + 4}px, {node.y0 + 10}px);">
        <text dy=".35em" font-weight="bold" color="#000" text-anchor={'start'}>
          {node.name}
        </text>
        <text
          dy=".35em"
          y={2 + 14}
          style="font-variant-numeric: tabular-nums;"
          text-anchor={'start'}>
          {format('.1%')(node.value / sankey.nodes[0].fixedValue)}
          ({format('.2s')(node.value)})
        </text>
      </g>
    {/each}
  </svg>
{/if}
