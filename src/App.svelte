<script>
  import { onMount } from 'svelte';
  import animalData from "./assets/data/animaldata.js";
  import PlayerStack from "./components/PlayerStack.svelte";
  import DropStack from "./components/DropStack.svelte";

  let playerCards = [...animalData];
  let dropCards = [];

  function updateStacks(evt) {
    if (evt.from.id === 'player-stack') {
      dropCards.push(...playerCards.splice(evt.oldIndex, 1));
    } else if (evt.from.id === 'drop-stack') {
      playerCards.push(...dropCards.splice(evt.oldIndex, 1));
    }
  }
</script>

<main>
  <header>
    <div id="title-menu">
      <h1 id="site-title">Anistack</h1>
    </div>

    <nav id="nav-menu">
      <ul id="nav-items">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <div class="wrapper">
      <div id="game">
        <PlayerStack {playerCards} on:update={updateStacks} />
        <DropStack {dropCards} on:update={updateStacks} />
      </div>
    </div>
  </main>
  <footer>
    <p>&copy; 2024 Timon Czarny</p>
    <a href="#imprint">Impressum</a>
  </footer>
</main>

<style>
  #game {
    display: flex;
    flex-direction: row;
    gap: 1em;
  }
</style>
