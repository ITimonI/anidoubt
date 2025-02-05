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
    export let yourTurn = false;

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
    id={type}
    class={yourTurn ? "stack stack-active" : "stack stack-inactive"}
    use:dndzone={{ items, flipDurationMs }}
    on:consider={handleSort}
    on:finalize={handleFinalize}
>
    {#each items as item (item.id)}
        <div class="card" animate:flip={{ duration: flipDurationMs }}>
            <Card animal={item} {showProperty}/>
        </div>
    {/each}
</section>

<style>

    #drop {
        border: 2px dashed #000000;
        outline: none;
    }

    .stack{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1em;
        padding-top: 1em;
        max-width: 80vw;
        overflow-x: scroll;
        scrollbar-color: #848484 rgb(0,0,0,0);
        
        height: 100%;
        border-radius: 1em;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
        padding-left: 1em;
    }

    .stack-inactive{
        border: 1px solid #787878;
        pointer-events: none;
        scrollbar-color: rgb(0,0,0,0) rgb(0,0,0,0);
    }

    .stack-active {
        border: 3px solid #ffffff;
    }

    @media (max-width: 860px) {
        .stack {
            padding: 1em;
            flex-direction: column;
            gap: 0.5em;
            padding-top: 0.5em;
            padding-left: 0.5em;
        }
    }
</style>
