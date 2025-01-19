<!-- filepath: /Users/timonczarny/0-strg-main/hfg/sem3/programmieren3/svelteAnimalWebsite/0anidoubt/src/components/DropStack.svelte -->
<script>
    import CardStack from "./CardStack.svelte";
    import { createEventDispatcher } from "svelte";

    export let cards = [];
    const dispatch = createEventDispatcher();

    function handleEnd(evt) {
        dispatch("update", evt);
    }
</script>

<CardStack {cards} stackId="drop-stack" onEnd={handleEnd} />
