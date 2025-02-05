<script>
    export let animal;
    export let showProperty = false;

    const animalTag = animal.group.toLowerCase() + animal.group_number;
    const groupClass = "group-" + animal.group.toLowerCase();
</script>

<div class="card">
    <div class="card-header">
        <div class="card-number {groupClass}">{animalTag}</div>
        <div class="card-title">
            <p class="card-title-text">{animal.name}</p>
        </div>
    </div>
    <img
        class="card-image"
        src="images/quartet-images/{animalTag}.jpg"
        alt=""
    />

    {#if showProperty}
        <p class="card-title-text">{animal.max_weight}</p>
    {:else}
        <!-- <div class="card-trivia">{animal.trivia_german}</div> -->
    {/if}
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        background-color: var(--secondary);
        width: 16em;
        height: 16em;
        border-radius: 1em;
        overflow: hidden;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 1em;
    }

    .card:hover {
        transform: scale(1.02);
        transition: transform 0.5s;
    }

    .card-header {
        display: grid;
        grid-template-columns: 1fr 3fr;
        min-height: 3em;
    }

    .card-image {
        width: 100%;
        height: 18em;
        object-fit: cover;
    }

    .card-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .card-stat {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 1em;
        align-items: center;
    }

    .card-stat div {
        display: flex;
        justify-content: center;
    }

    .card-trivia {
        display: flex;
        justify-content: center;
        padding: 1em;
        font-weight: lighter;
        padding-top: 2em;
        padding-bottom: 2em;
    }

    .card-number {
        display: flex;
        color: white;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    .card-title {
        display: flex;
        align-items: center;
        background-color: var(--secondary);
        color: var(--font-color);
    }

    .card-title-text {
        text-transform: uppercase;
        font-weight: 500;
        padding-left: 0.5rem;
        font-size: 1.2rem;
    }

    .group-a {
        background-color: rgb(128, 153, 94); /* HSL(87°, 30%, 48%) */
    }

    .group-b {
        background-color: rgb(94, 153, 150); /* HSL(177°, 30%, 48%) */
    }

    .group-c {
        background-color: rgb(101, 94, 153); /* HSL(245°, 30%, 48%) */
    }

    .group-d {
        background-color: rgb(153, 94, 128); /* HSL(327°, 30%, 48%) */
    }

    .group-e {
        background-color: rgb(
            94,
            109,
            153
        ); /* HSL(227°, 30%, 48%) */ /* Adjusted to avoid brownish tone */
    }

    .group-f {
        background-color: rgb(94, 128, 153); /* HSL(207°, 30%, 48%) */
    }

    .group-g {
        background-color: rgb(128, 94, 153); /* HSL(267°, 30%, 48%) */
    }

    .group-h {
        background-color: rgb(153, 94, 101); /* HSL(357°, 30%, 48%) */
    }
</style>
