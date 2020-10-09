<script>
  import { DataGraphic } from "@graph-paper/datagraphic";
  import { Line } from "@graph-paper/elements";
  import { MarginText, LeftAxis, BottomAxis } from "@graph-paper/guides";
  export let points = 100;
  export let size = 1;
  export let curve = "curveMonotoneX";
  export let dashArray = "1,0";

  let y = 100;

  const data = Array.from({ length: points }).map((_, x) => {
    y += (Math.random() - 0.5) * 80;
    return { x, y };
  });
  console.log(Line);
</script>

<DataGraphic>
  <LeftAxis />
  <BottomAxis />
  <Line {curve} {data} {size} {dashArray} />
</DataGraphic>
