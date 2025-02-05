<script>
  import Router from "svelte-spa-router";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import Game from "./routes/Game.svelte";

  const routes = {
    "/": Home,
    "/about": About,
    "/game": Game,
  };
</script>

<div>
  <header>
    <div id="title-menu">
      <h1 id="site-title">Anistack</h1>
      <!-- <button id="btn-mobile-menu" onclick="handleBtnMobileMenuPress()"><img src="images/icons/menu.svg" alt="M"></button> -->
    </div>

    <nav id="nav-menu">
      <ul id="nav-items">
        <li><a href="#/">Home</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#/game">Game</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <Router {routes}/>
  </main>
  <footer>
    <p>&copy; 2024 Timon Czarny</p>
    <a href="#imprint">Impressum</a>
  </footer>
</div>

<style>
  footer {
    margin-top: 1em;
  }
</style>
