<script>
    import { dndzone } from "svelte-dnd-action";
    import { flip } from "svelte/animate";
    import Card from "./Card.svelte";
    const flipDurationMs = 200;

    export let items = [];
    // export let displayProp = false;

    export let type = "";
    export let showProperty = false;
    export let onUpdateCards;

    function handleSort(e) {
        items = e.detail.items;
        
    }

    function handleFinalize(e){
        items = e.detail.items;
        onUpdateCards(type, items);
    }

    export function checkOrder(property) {
        let orderIsCorrect = true;
        let sorted = items.slice().sort((a, b) => b[property] - a[property]);
        for (let i = 0; i < items.length; i++) {
            if (items[i] !== sorted[i]) {
                orderIsCorrect = false;
            }
        }
        console.log(orderIsCorrect);
        return orderIsCorrect;
    }
</script>

<section
    id="drop-stack"
    use:dndzone={{ items, flipDurationMs }}
    on:consider={handleSort}
    on:finalize={handleFinalize}
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
