<script>
    import { onMount } from "svelte";
    import animalData from "../assets/data/animaldata.js";
    import Card from "../components/Card.svelte";
    import CardStack from "../components/CardStack.svelte";
    import { fetchAnimalData } from "../assets/api/animalDataAPI.js";
    import { sendMessage, testApi } from "../assets/api/openAI.js";

    let showProperty = false;
    let allCards = [...animalData];

    let playerCards = [...animalData];
    let dropCards = []; // Initialize as empty
    let dropCardStackRef;
    let opponentCards = [];

    startGame();

    async function loadAnimalData() {
        try {
            playerCards = await fetchAnimalData("tiger");
        } catch (error) {
            console.error("Error loading animal data:", error);
        }

        console.log(playerCards);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startGame() {
        // Shuffle the allCards array
        allCards = shuffleArray([...animalData]);

        // Move four random cards from allCards to playerCards
        playerCards = allCards.splice(0, 4);

        // Move another four random cards from allCards to opponentCards
        opponentCards = allCards.splice(0, 4);
    }

    function handleCheck() {
        showProperty = !showProperty;
        dropCardStackRef.checkOrder("max_weight");
    }

    function onUpdateCards(type, items) {

        switch (type) {
            case "player":
                playerCards = items;

                break;
            case "drop":
                const newCard = items.find(item => !dropCards.some(card => card.id === item.id));
                const newCardIndex = items.indexOf(newCard);

                dropCards = items;
                handlePlayerPlacedCard(newCard.name, newCardIndex);
                break;
            case "opponent":
                opponentCards = items;
                break;
            default:
                console.warn(`Unknown type: ${type}`);
        }
    }

    function handleStart() {
        const userMessage = `The current stack has an [Elephant, Lion]. Your cards are [Cheetah, Giraffe]. Place your card.`;
        // sendMessage(userMessage);
        testApi();
        // sendMessage();
        // loadAnimalData();
    }

    async function handlePlayerPlacedCard(addedAnimal, addedCardIndex) {

        const minifiedDropcards = dropCards.map(card => ({
            id: card.id,
            name: card.animalName
        }));

        let aiResponse = JSON.parse(
            await sendMessage(`
        The player made made a move and added ${JSON.stringify(addedAnimal)} at index ${JSON.stringify(addedCardIndex)} Where should your next card go?
        - Is the order of the whole card array still correct? ${JSON.stringify(minifyCards(dropCards))}
        - The cards available to you to play with are ${JSON.stringify(minifyCards(opponentCards))}
        `),
        );

        // console.log(aiResponse);
        if(aiResponse.orderIsCorrect){
            // Move the card from the opponent's hand to the drop stack
            const cardIndex = opponentCards.findIndex(card => card.id === aiResponse.card.id);
            if (cardIndex !== -1) {
                const [card] = opponentCards.splice(cardIndex, 1);
                opponentCards = [...opponentCards];

                dropCards.splice(aiResponse.position, 0, card);
                dropCards = [...dropCards];
            }
        } else {
            console.log("the opponent wants to check the order");
            handleCheck();
        }
    }

    function minifyCards(cards) {
        return cards.map(card => ({
            id: card.id,
            name: card.name,
        }));
    }


</script>

<div class="wrapper">
    <button class="btn" id="btn-start" on:click={handlePlayerPlacedCard}
        >Play</button
    >
    <button class="btn" id="btn-check" on:click={handleCheck}>Check</button>
    <div id="game">
        <CardStack type={"player"} items={playerCards} {onUpdateCards} />
        <CardStack
            type={"drop"}
            bind:this={dropCardStackRef}
            items={dropCards}
            {onUpdateCards}
            {showProperty}
        />
        <CardStack type={"opponent"} items={opponentCards} {onUpdateCards} />
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
