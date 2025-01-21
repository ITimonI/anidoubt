<script>
    import { onMount } from "svelte";
    import animalData from "../assets/data/animaldata.js";
    import Sortable from "sortablejs";
    import Card from "../components/Card.svelte";

    let playerStack;
    let dropStack;

    let playerCards = [...animalData]; // Initialize with all cards
    let dropCards = []; // Initialize as empty

    onMount(() => {
        new Sortable(playerStack, {
            group: "shared",
            animation: 150,
            onEnd: (evt) => {
                updateStacks(evt);
            },
        });

        new Sortable(dropStack, {
            group: "shared",
            animation: 150,
            onEnd: (evt) => {
                updateStacks(evt);
            },
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
