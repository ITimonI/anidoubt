<script>
  import Router from "svelte-spa-router";
  import { onMount } from "svelte";
  import animalData from "./assets/data/animaldata.js";
  import Card from "./components/Card.svelte";
  import Sortable from "sortablejs";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";


  const routes = {
    "/": Home,
    "/about": About,
  };

  let playerStack;
  let dropStack;

  let playerCards = [...animalData]; // Initialize with all cards
  let dropCards = []; // Initialize as empty

  onMount(() => {
    new Sortable(playerStack, {
      group: "shared",
      animation: 150,
      onEnd: (evt) => {updateStacks(evt)},
    });

    new Sortable(dropStack, {
      group: "shared",
      animation: 150,
      onEnd: (evt) => {updateStacks(evt)},
    });
  });

  function updateStacks(evt) {
    // Update stacks after drag-and-drop
    if (evt.from === playerStack) {
      dropCards.push(...playerCards.splice(evt.oldIndex, 1));
    } else if (evt.from === dropStack) {
      playerCards.push(...dropCards.splice(evt.oldIndex, 1));
    }
  }
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
        <li><a href="#/about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <Router {routes}/>
    <div class="wrapper">
      <div id="game">
        <div id="player-stack" bind:this={playerStack}>
          {#each playerCards as animal}
            <Card {animal} />
          {/each}
        </div>
        <div id="drop-stack" bind:this={dropStack}>
          {#each dropCards as animal}
            <Card {animal} />
          {/each}
        </div>
      </div>
    </div>
  </main>
  <footer>
    <p>&copy; 2024 Timon Czarny</p>
    <a href="#imprint">Impressum</a>
  </footer>
</div>

<style>
  #game {
    display: flex;
    flex-direction: row;
    gap: 1em;
  }

  #drop-stack {
    min-width: 20em; /* Adjust this value to match the width of a card */
    min-height: 100%; /* Adjust this value to match the height of a card */
    border: 1px dashed #000000; /* Optional: Add a border to visualize the drop area */
  }
</style>
