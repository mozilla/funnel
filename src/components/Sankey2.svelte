<script>
  import { autoType, csvParse } from "d3-dsv";
  import { format } from "d3-format";
  import {
    sankey as generateSankey,
    sankeyLinkHorizontal as embedding,
    sankeyLeft as nodeAlign,
  } from "d3-sankey";
  import { sum, sortBy, zipWith } from "lodash";
  import { fade, fly } from "svelte/transition";
  import { colorKey } from "./ColorKey";

  const count = format(",");

  export let data;
  export let dateFilter;
  export let width = 900;
  export let height = 400;
  export let left = 0;
  export let right = 0;
  export let top = 0;
  export let bottom = 0;

  function sumColumn(data, valColName, dateFilter) {
    let filteredData = dateFilter
      ? data.filter(
          (d) =>
            d.date.getUTCFullYear() === dateFilter.getUTCFullYear() &&
            d.date.getUTCMonth() === dateFilter.getUTCMonth() &&
            d.date.getUTCDate() === dateFilter.getUTCDate()
        )
      : data;
    // weird edge case where we're outside the range in the graph
    if (filteredData.length === 0) {
      filteredData = data;
    }
    return sum(filteredData.map((ni) => ni[valColName]));
  }

  let sankey = undefined;

  $: {
    const summary = {
      nonFirefoxSessions: sumColumn(data, "nonFxSessions", dateFilter),
      downloads: sumColumn(data, "nonFxDownloads", dateFilter),
      newInstalls: sumColumn(data, "successful_new_installs", dateFilter),
      paveovers: sumColumn(data, "successful_paveovers", dateFilter),
      newProfiles: sumColumn(data, "new_profiles", dateFilter),
      profileActivated: sumColumn(data, "num_activated", dateFilter),
    };
    summary.didntDownload = summary.nonFirefoxSessions - summary.downloads;
    summary.didntInstall =
      summary.downloads - summary.newInstalls - summary.paveovers;
    summary.noNewProfile = summary.newInstalls - summary.newProfiles;
    summary.notActivated = summary.newProfiles - summary.profileActivated;
    const nodes = [
      {
        id: "nonFirefoxSessions",
        fixedValue: summary.nonFirefoxSessions,
        name: "Web Sessions",
        color: colorKey.sessions,
      },
      { id: "downloads", name: "Firefox Downloads", color: colorKey.downloads },
      { id: "newInstalls", name: "New Installs", color: colorKey.installs },
      {
        id: "newProfiles",
        name: "New Profiles",
        color: colorKey.profiles,
        textColor: "#444",
      },
      {
        id: "profileActivated",
        name: "Activated Profiles",
        color: colorKey.activations,
        textColor: "#444",
      },
      { id: "paveovers", name: "Paveovers", bounce: true },
      { id: "didntDownload", name: "Didn't Download", bounce: true },
      { id: "didntInstall", name: "Didn't install", bounce: true },
      { id: "noNewProfile", name: "No new profile", bounce: true },
      { id: "notActivated", name: "Didn't activate", bounce: true },
    ];
    const links = [
      {
        source: "nonFirefoxSessions",
        target: "downloads",
        value: summary.downloads,
      },
      {
        source: "nonFirefoxSessions",
        target: "didntDownload",
        value: summary.didntDownload,
        bounced: true,
      },
      {
        source: "downloads",
        target: "newInstalls",
        value: summary.newInstalls,
      },
      {
        source: "downloads",
        target: "paveovers",
        value: summary.paveovers,
        bounced: true,
      },
      {
        source: "downloads",
        target: "didntInstall",
        value: summary.didntInstall,
        bounced: true,
      },
      {
        source: "newInstalls",
        target: "newProfiles",
        value: summary.newProfiles,
      },
      {
        source: "newInstalls",
        target: "noNewProfile",
        value: summary.noNewProfile,
        bounced: true,
      },
      {
        source: "newProfiles",
        target: "profileActivated",
        value: summary.profileActivated,
      },
      {
        source: "newProfiles",
        target: "notActivated",
        value: summary.notActivated,
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

<h4>Funnel Overview</h4>
{#if sankey}
  <svg in:fly={{ duration: 500, y: -10 }} width="900" height="400">
    {#each sankey.links as link}
      <path
        in:fade={{ duration: 500 }}
        d={embedding()(link)}
        stroke-width={link.width}
        opacity={link.bounced ? 0.1 : 0.5}
        style="mix-blend-mode: {link.bounced ? 'multiply' : 'normal'};"
        stroke={link.target.bounce ? 'gray' : '#88bbcc'} />
    {/each}
    {#each sankey.nodes as node, i}
      <rect
        in:fade={{ duration: 500 }}
        x={node.x0}
        y={node.y0}
        height={node.y1 - node.y0}
        width={node.x1 - node.x0}
        fill={node.color ? node.color : node.bounce ? 'hsla(217, 0%, 0%, .2)' : 'hsl(217, 50%, 30%)'} />
      <g
        in:fly={{ duration: 500, y: 5 * (i % 2 === 0 ? -1 : -2) }}
        fill={node.textColor ? node.textColor : node.bounce ? '#444' : '#ddd'}
        style="transform: translate({node.x0 + 4}px, {node.y0 + 10}px);">
        <text dy=".35em" font-weight="bold" color="#000" text-anchor={'start'}>
          {node.name}
        </text>
        <text
          dy=".35em"
          y={2 + 14}
          style="font-variant-numeric: tabular-nums;"
          text-anchor={'start'}>
          {format('.1%')(node.value / sankey.nodes[0].fixedValue)} ({format('.2s')(node.value)})
        </text>
      </g>
    {/each}
  </svg>
{/if}
