<script>
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import Game from "./routes/Game.svelte";
  import Header from "./components/ui/Header.svelte";


  const routes = {
    "/": Home,
    "/about": About,
    "/game": Game,
  };

</script>

<div class="app">
  <Header/>
  <main>
    <Router {routes} />
  </main>
  <footer>
    <p>Anistack</p>
    <a href="#imprint">Impressum</a>
  </footer>
</div>

<style>
</style>
