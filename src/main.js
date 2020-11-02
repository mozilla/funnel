import App from "./App.svelte";
import "@graph-paper/core/style.css";
import "@graph-paper/button/style.css";
import "@graph-paper/optionmenu/style.css";

const app = new App({
  target: document.body,
  props: {
    title: "graph-paper app",
  },
});

export default app;
