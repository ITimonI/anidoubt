<script>
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import Card from "./Card.svelte";
    const flipDurationMs = 200;

    export let items = [];
    // export let displayProp = false;

    export let showProperty = false;

    function handleSort(e) {
        items = e.detail.items;
    }
</script>

<section
    id="drop-stack"
    use:dndzone={{ items, flipDurationMs }}
    on:consider={handleSort}
    on:finalize={handleSort}
>
    {#each items as item (item.id)}
        <div animate:flip={{ duration: flipDurationMs }}>
            <Card animal={item} {showProperty}/>
        </div>
    {/each}
</section>

<style>
    #drop-stack {
        min-width: 20em; /* Adjust this value to match the width of a card */
        min-height: 100%; /* Adjust this value to match the height of a card */
        border: 1px dashed #000000; /* Optional: Add a border to visualize the drop area */
    }
</style>
