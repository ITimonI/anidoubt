<script>
    import { onMount } from "svelte";
    import animalData from "../assets/data/animaldata.js";
    import Card from "../components/Card.svelte";
    import CardStack from "../components/CardStack.svelte";
    import { fetchAnimalData } from "../assets/api/animalDataAPI.js";
    import {
        sendMessage,
        testApi,
        clearMessageQueue,
    } from "../assets/api/openAI.js";

    let showProperty = false;
    let allCards = [...animalData];

    let playerCards = [...animalData];
    let dropCards = []; // Initialize as empty
    let dropCardStackRef;
    let opponentCards = [];
    let usedCards = [];
    let currentAiMessage = "";
    let gameWon = false;
    let opponentIsAI = false;
    let currentTurn = "player";

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

    function handleCheck(initiator) {
        showProperty = true;
        currentTurn = "incative";

        let otherPlayer;
        if (initiator === "player") {
            otherPlayer = "opponent";
        } else {
            otherPlayer = "player";
        }

        const orderIsCorrect = dropCardStackRef.checkOrder("max_weight");
        if (orderIsCorrect) {
            // add four cards to the initiators hand
            console.log(`Adding four cards to ${initiator}`);
            addCardsToHand(4, initiator);
        } else {
            // add two cards to the otherPlayers hand
            console.log(`Adding two cards to ${otherPlayer}`);
            addCardsToHand(2, otherPlayer);
        }
    }

    function nextRound() {
        currentTurn = "player";
        // move all cards from the dropStack to usedCards
        usedCards.push(...dropCards);
        dropCards.length = 0; // This clears the dropCards array
        dropCards = [...dropCards]; // Reassign to trigger reactivity

        // clear the message queue from the AI to use less tokens
        clearMessageQueue();

        // hide the property of the cards
        showProperty = false;
    }

    function addCardsToHand(amountOfCards, person) {
        const cards = allCards.splice(0, amountOfCards);
        if (person === "player") {
            playerCards.push(...cards);
            playerCards = [...playerCards]; // Reassign to trigger reactivity
        } else {
            opponentCards.push(...cards);
            opponentCards = [...opponentCards]; // Reassign to trigger reactivity
        }
    }

    function onUpdateCards(type, items) {
        switch (type) {
            case "player":
                if (items.length !== playerCards.length) {
                    currentTurn = "opponent";
                    playerCards = items;
                    checkWin(playerCards, "player");
                }
                break;
            case "drop":
                const newCard = items.find(
                    (item) => !dropCards.some((card) => card.id === item.id),
                );
                const newCardIndex = items.indexOf(newCard);

                dropCards = items;
                if (!gameWon && opponentIsAI)
                    handlePlayerPlacedCard(newCard.name, newCardIndex);
                break;
            case "opponent":
                if (items.length !== opponentCards.length) {
                    currentTurn = "player";
                    opponentCards = items;
                    checkWin(opponentCards, "opponent");
                }
                break;
            default:
                console.warn(`Unknown type: ${type}`);
        }
    }

    function checkWin(array, type) {
        if (array.length === 0) {
            console.log(`The ${type} has won!`);
            gameWon = true;
        }
    }

    function resetGame() {
        gameWon = false;
        clearMessageQueue();
        startGame();
    }

    function handleStart() {
        const userMessage = `The current stack has an [Elephant, Lion]. Your cards are [Cheetah, Giraffe]. Place your card.`;
        // sendMessage(userMessage);
        testApi();
        // sendMessage();
        // loadAnimalData();
    }

    async function handlePlayerPlacedCard(addedAnimal, addedCardIndex) {
        const minifiedDropcards = dropCards.map((card) => ({
            id: card.id,
            name: card.animalName,
        }));

        let aiResponse = JSON.parse(
            await sendMessage(`
        The player made a move and added ${JSON.stringify(addedAnimal)} at index ${JSON.stringify(addedCardIndex)}.
        - Current stack on the table that the player placed a card in and you should take a look at: ${JSON.stringify(minifyCards(dropCards))}
        - Your cards: ${JSON.stringify(minifyCards(opponentCards))}
        `),
        );
        // console.log(aiResponse);
        if (aiResponse.orderIsCorrect) {
            // Move the card from the opponent's hand to the drop stack
            const cardIndex = opponentCards.findIndex(
                (card) => card.id === aiResponse.card.id,
            );
            if (cardIndex !== -1) {
                const [card] = opponentCards.splice(cardIndex, 1);
                opponentCards = [...opponentCards];

                dropCards.splice(aiResponse.position, 0, card);
                dropCards = [...dropCards];
            }
        } else {
            console.log("the opponent wants to check the order");
            handleCheck("opponent");
        }

        currentAiMessage = aiResponse.message;
    }

    function minifyCards(cards) {
        return cards.map((card) => ({
            id: card.id,
            name: card.name,
        }));
    }
</script>

<div class="wrapper">
    <button class="btn" id="btn-start" on:click={handlePlayerPlacedCard}>
        Play
    </button>
    {#if !showProperty}
        <button
            class="btn"
            id="btn-check"
            on:click={() => handleCheck(currentTurn)}
        >
            Check
        </button>
    {/if}

    <div id="ai-messages">
        <p>{currentAiMessage}</p>
    </div>
    {#if showProperty}
        <button class="btn" id="btn-next" on:click={nextRound}
            >Next Round</button
        >
    {/if}
    {#if gameWon}
        <button class="btn" id="btn-reset" on:click={resetGame}
            >Reset Game</button
        >
    {/if}
    <div id="game">
        <CardStack
            type={"player"}
            items={playerCards}
            {onUpdateCards}
            yourTurn={currentTurn === "player"}
        />
        <CardStack
            type={"drop"}
            bind:this={dropCardStackRef}
            items={dropCards}
            {onUpdateCards}
            {showProperty}
        />
        <CardStack
            type={"opponent"}
            items={opponentCards}
            {onUpdateCards}
            yourTurn={currentTurn === "opponent"}
        />
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

    #ai-messages {
        background-color: black;
        padding: 1em;
        min-width: 50vw;
        max-width: 50vw;
        margin: 1em;
        border-radius: 1em;
        min-height: 3em;
    }
</style>
