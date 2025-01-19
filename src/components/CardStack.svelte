<script>
    import { onMount } from "svelte";
    import Sortable from "sortablejs";
    import Card from "./Card.svelte";

    export let cards = [];
    export let stackId;
    export let onEnd;

    let stack;

    onMount(() => {
        new Sortable(stack, {
            group: "shared",
            animation: 150,
            ghostClass: "sortable-ghost",
            onEnd: (evt) => {
                if (onEnd) onEnd(evt);
            },
        });
    });
</script>

<div id={stackId} bind:this={stack}>
    {#each cards as card}
        <Card {card} />
        
    {/each}
</div>

<style>
    #stackId {
        min-width: 20em;
        min-height: 20em;
        border: 1px dashed #ccc;
    }
</style>
