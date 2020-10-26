<script>
  import Button from "@graph-paper/button/Button.svelte";
  import Documentation from "@graph-paper/icons/Documentation.svelte";
  import Slack from "./Slack.svelte";
  import { feedbackLink, docsLink } from "../links";
</script>

<style>
  .site-header {
    display: grid;
    grid-template-columns: auto max-content;
    align-items: center;
  }
  .header-content {
    width: 1200px;
    margin: auto;
    display: grid;
    grid-auto-flow: column;
  }
  h1 {
    padding: var(--space-2x);
    padding-left: var(--space-4x);
    padding-right: var(--space-4x);
    font-size: var(--text-08);
  }
  nav {
    align-self: center;
    font-size: var(--text-03);
    font-weight: 300;
  }

  ul {
    margin: 0;
    padding: 0;

    display: grid;
    grid-auto-flow: column;
    list-style-type: none;
    align-items: center;
    justify-content: end;
    grid-column-gap: var(--space-2x);
    padding-right: var(--space-4x);
  }
</style>

<header class="site-header">
  <div class="header-content">
    <h1>Numbers That Matter</h1>
    <nav>
      <ul>
        <li>
          <Button
            on:click={() => {
              window.open(feedbackLink, '_blank');
            }}
            level="low">
            <span
              style="display: grid; grid-auto-flow: column; grid-column-gap:
              var(--space-base); align-items: center;">
              <Slack size={20} />
              Feedback
            </span>
          </Button>
        </li>

        <li>
          <Button
            on:click={() => {
              window.open(docsLink, '_blank');
            }}
            level="low">
            <span
              style="display: grid; grid-auto-flow: column; grid-column-gap:
              var(--space-base); align-items: center;">
              <Documentation size={20} />
              Documentation
            </span>
          </Button>
        </li>
      </ul>
    </nav>
  </div>
</header>
