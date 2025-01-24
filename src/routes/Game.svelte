<script>
    import { onMount } from "svelte";
    import animalData from "../assets/data/animaldata.js";
    import Sortable from "sortablejs";
    import Card from "../components/Card.svelte";
    import CardStack from "../components/CardStack.svelte";

    let showProperty = false;
    let playerCards = [...animalData]; // Initialize with all cards
    let dropCards = []; // Initialize as empty

    function checkOrder(property) {
        let orderIsCorrect = true;
        let sorted = dropCards.slice().sort((a, b) => b[property] - a[property]);
        for (let i = 0; i < dropCards.length; i++) {
            if (dropCards[i] !== sorted[i]) {
                orderIsCorrect = false;
            }
        }
        console.log(orderIsCorrect);
    }

    function handleCheck() {
        showProperty = !showProperty;
        checkOrder("max_weight"); // Replace "max_weight" with the actual property name
    }
</script>

<div class="wrapper">
    <button id="btn-check" on:click={handleCheck}>Check</button>
    <div id="game">
        <CardStack items={playerCards}/>
        <CardStack items={dropCards} showProperty={showProperty}/>
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
