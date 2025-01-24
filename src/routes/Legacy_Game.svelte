<script>
    import { onMount } from "svelte";
    import animalData from "../assets/data/animaldata.js";
    import Sortable from "sortablejs";
    import Card from "../components/Card.svelte";

    let playerStack;
    let dropStack;
    let showProperties = false;
    let playerCards = [...animalData]; // Initialize with all cards
    let dropCards = []; // Initialize as empty

    function updateStacks(evt) {
        if (evt.from === playerStack && evt.to === dropStack) {
            const [movedCard] = playerCards.splice(evt.oldIndex, 1);
            dropCards.splice(evt.newIndex, 0, movedCard);
        } else if (evt.from === dropStack && evt.to === playerStack) {
            const [movedCard] = dropCards.splice(evt.oldIndex, 1);
            playerCards.splice(evt.newIndex, 0, movedCard);
        } else if (evt.from === dropStack && evt.to === dropStack) {
            const [movedCard] = dropCards.splice(evt.oldIndex, 1);
            dropCards.splice(evt.newIndex, 0, movedCard);
        } else if (evt.from === playerStack && evt.to === playerStack) {
            const [movedCard] = playerCards.splice(evt.oldIndex, 1);
            playerCards.splice(evt.newIndex, 0, movedCard);
        }
    }

    function checkOrder(property) {
        showProperties = true;
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
        checkOrder("max_weight"); // Replace "max_weight" with the actual property name
    }

    onMount(() => {
        new Sortable(playerStack, {
            group: "shared",
            animation: 150,
            ghostClass: "sortable-ghost",
            onEnd: updateStacks,
        });

        new Sortable(dropStack, {
            group: "shared",
            animation: 150,
            ghostClass: "sortable-ghost",
            onEnd: updateStacks,
        });
    });
</script>

<div class="wrapper">
    <button id="btn-check" on:click={handleCheck}>Check</button>
    <div id="game">
        <div id="player-stack" bind:this={playerStack}>
            {#each playerCards as animal}
                <Card {animal} context="player" showProperty={showProperties} />
            {/each}
        </div>
        <div id="drop-stack" bind:this={dropStack}>
            {#each dropCards as animal}
                <Card {animal} context="drop" showProperty={showProperties} />
            {/each}
        </div>
    </div>
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

    #btn-check{
        background-color: #000000;
        padding: 1em;
        border-radius: 10px;
    }
</style>
