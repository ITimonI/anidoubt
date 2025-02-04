<script>
    import { onMount } from "svelte";
    import animalData from "../assets/data/animaldata.js";
    import Card from "../components/Card.svelte";
    import CardStack from "../components/CardStack.svelte";
    import { fetchAnimalData } from "../assets/api/animalDataAPI.js";
    import { sendMessage, testApi } from "../assets/api/openAI.js";

    let showProperty = false;
    let playerCards = [...animalData]; // Initialize with all cards
    // let playerCards = [];
    let dropCards = []; // Initialize as empty
    let dropCardStackRef;

    let aiCards = [
    { id: 3, animalName: "Monkey" },
    { id: 4, animalName: "Horse" },
    { id: 12, animalName: "Chicken" }
];

    async function loadAnimalData() {
        try {
            playerCards = await fetchAnimalData("tiger");
        } catch (error) {
            console.error('Error loading animal data:', error);
        }

        console.log(playerCards);
    }

    function handleCheck() {
        showProperty = !showProperty;
        dropCardStackRef.checkOrder("max_weight");
    }

    function handleStart() {
        const userMessage = `The current stack has an [Elephant, Lion]. Your cards are [Cheetah, Giraffe]. Place your card.`;
        // sendMessage(userMessage);
        testApi();
        // sendMessage();
        // loadAnimalData();
    }

    async function handlePlaceCard(){
        let aiResponse = JSON.parse(await sendMessage(`
        The player made made a move. Where should your next card go?
        - The order of the already dropped cards is ${JSON.stringify(dropCards)}
        - The cards available to you to play with are ${JSON.stringify(aiCards)}
        `));

        console.log(aiResponse);
    }


</script>

<div class="wrapper">
    <button class="btn" id="btn-start" on:click={handlePlaceCard}>Play</button>
    <button class="btn" id="btn-check" on:click={handleCheck}>Check</button>
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

    .btn {
        background-color: #000000;
        padding: 1em;
        border-radius: 10px;
    }
</style>
