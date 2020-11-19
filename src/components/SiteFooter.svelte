<script>
  import { feedbackLink } from "../links";
  import MozillaLogo from "./MozillaLogo.svelte";
</script>

<style>
  .site-footer {
    display: grid;
    grid-template-columns: auto max-content;
    align-items: center;
    height: 100%;
    padding-top: var(--space-2x);
    padding-bottom: var(--space-2x);
  }
</style>

<footer class="site-footer">
  <div
    style="
        padding-left: var(--space-2x);
        width: 1200px;
        height: 100%;
        display: grid;
        align-items: center;
        padding-right: var(--space-2x);
        grid-auto-flow: column;
        height: calc(var(--incrememt)*4);
        ">
    <MozillaLogo />
    <div
      style="justify-self: end; display: grid; grid-auto-flow: column; grid-column-gap: var(--space-4x);">
      <div>
        <b>Overall Inquiries</b>
        - @shong /
        <a href={feedbackLink}>#numbers-that-matter-feedback</a>
      </div>
      <div><b>Dataset</b> – @loines / @sghose / @shong / @wlach</div>
      <div><b>Frontend</b> – @wlach</div>
    </div>
  </div>
</footer>
