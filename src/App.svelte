<script>
  import { fields } from "./config";
  import Sankey from "./components/Sankey.svelte";

  const data = [
    {
      [fields.FROM]: "Mozilla.org Sessions",
      [fields.TO]: "Firefox Downloads",
      [fields.VALUE]: 60,
    }, // 100 here

    {
      [fields.FROM]: "Firefox Downloads",
      [fields.TO]: "Firefox Installs",
      [fields.VALUE]: 40,
    }, // 60 here

    {
      [fields.FROM]: "Firefox Installs",
      [fields.TO]: "First Runs",
      [fields.VALUE]: 20,
    },
    {
      [fields.FROM]: "First Runs",
      [fields.TO]: "Activations",
      [fields.VALUE]: 12,
    },
    // all bounced nodes should be at the end of the list.
    {
      [fields.FROM]: "First Runs",
      [fields.TO]: "BOUNCE",
      [fields.VALUE]: 8,
      [fields.BOUNCE]: true,
    },
    {
      [fields.FROM]: "Mozilla.org Sessions",
      [fields.TO]: "BOUNCE",
      [fields.VALUE]: 40,
      [fields.BOUNCE]: true,
    },
    {
      [fields.FROM]: "Firefox Installs",
      [fields.TO]: "BOUNCE",
      [fields.VALUE]: 20,
      [fields.BOUNCE]: true,
    },
    {
      [fields.FROM]: "Firefox Downloads",
      [fields.TO]: "BOUNCE",
      [fields.VALUE]: 20,
      [fields.BOUNCE]: true,
    },
  ];
</script>

<header>
  <h1 class="gafc">
    data.
    <span>mozilla</span>
  </h1>
</header>
<main>
  <div class="billboard">
    <h1>Numbers That Matter</h1>
    <div>
      Get acquainted with Mozilla's important product numbers. Selected by
      Product and vetted by Data Science, these numbers are insert copy here.
    </div>
  </div>
  <div class="centered">
    <h2>How do we acquire users?</h2>
    <Sankey {data} />
  </div>
</main>
<footer>Made by Mozilla Data.</footer>
