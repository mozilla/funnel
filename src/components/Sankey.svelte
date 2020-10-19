<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import {
    sankey as generateSankey,
    sankeyLinkHorizontal as embedding,
    sankeyJustify as nodeAlign,
  } from "d3-sankey";
  import { format } from "d3-format";
  import { fields } from "../config";

  const count = format(",");

  export let data;
  export let width = 1000;
  export let height = 400;
  export let left = 0;
  export let right = 0;
  export let top = 20;
  export let bottom = 20;

  // get nodes
  $: nodes = Array.from(
    new Set(data.map((di) => [di[fields.FROM], di[fields.TO]]).flat())
  ).map((node) => ({ name: node }));

  $: links = data.map((di) => {
    const l = { ...di };
    l.source = nodes.findIndex((n) => n.name === di[fields.FROM]);
    l.target = nodes.findIndex((n) => n.name === di[fields.TO]);
    return l;
  });

  $: output = generateSankey()
    .extent([
      [left, top],
      [width - right, height - bottom],
    ])
    .nodeWidth(10)
    .nodeAlign(nodeAlign)
    .nodePadding(4)({
    nodes,
    links,
  });

  let mounted = false;
  onMount(() => {
    mounted = true;
  });
</script>

<style>
  svg {
    font-family: var(--font--viz);
  }
</style>

{#if mounted}
  <svg in:fly={{ duration: 500, y: -10 }} width="1000" height="800">
    {#each output.links as link}
      <path
        in:fade={{ duration: 500 }}
        d={embedding()(link)}
        stroke-width={link.width}
        opacity={link.bounced ? 0.1 : 0.5}
        style="mix-blend-mode: {link.bounced ? 'multiply' : 'normal'};"
        stroke={link.bounced ? 'gray' : 'cornflowerblue'} />
    {/each}
    {#each output.nodes as node, i}
      <rect
        in:fade={{ duration: 500 }}
        x={node.x0}
        y={node.y0}
        height={node.y1 - node.y0}
        width={node.x1 - node.x0}
        fill={node.name === 'BOUNCE' ? 'hsla(217, 0%, 0%, .2)' : 'hsl(217, 50%, 30%)'} />
      <g
        in:fly={{ duration: 500, y: 5 * (i % 2 === 0 ? -1 : -2) }}
        fill="#444"
        style="transform: translate({node.x0 < width / 2 ? node.x1 + 6 : node.x0 - 6}px,
        {node.y0 + 10}px);">
        <text
          dy=".35em"
          font-size={14}
          font-weight="bold"
          text-anchor={node.x0 < width / 2 ? 'start' : 'end'}>
          {node.name}
        </text>
        <text
          dy=".35em"
          y={2 + 14}
          font-size={14}
          style="font-variant-numeric: tabular-nums;"
          text-anchor={node.x0 < width / 2 ? 'start' : 'end'}>
          {node.value}% ({count(node.value * 1635)})
        </text>
      </g>
    {/each}
  </svg>
{/if}
