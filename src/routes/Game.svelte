<script>
    import { onMount } from "svelte";
    import animalData from "../assets/data/animaldata.js";
    import Card from "../components/Card.svelte";
    import CardStack from "../components/CardStack.svelte";

    let showProperty = false;
    let playerCards = [...animalData]; // Initialize with all cards
    let dropCards = []; // Initialize as empty
    let dropCardStackRef;

    function handleCheck() {
        showProperty = !showProperty;
        dropCardStackRef.checkOrder("max_weight");
    }
</script>

<div class="wrapper">
    <button id="btn-check" on:click={handleCheck}>Check</button>
    <div id="game">
        <CardStack items={playerCards}/>
        <CardStack bind:this={dropCardStackRef} items={dropCards} showProperty={showProperty}/>
    </div>
</div>

<style>
    #game {
        display: flex;
        flex-direction: row;
        gap: 1em;
    }

    #btn-check {
        background-color: #000000;
        padding: 1em;
        border-radius: 10px;
    }
</style>
