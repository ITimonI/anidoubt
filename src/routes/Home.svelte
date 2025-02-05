<script>
    import Card from "../components/Card.svelte";
    import data from "../assets/data/animaldata";

</script>

<div class="home">
    <h1>Anistack</h1>
    <p>Here is an overview of all available cards</p>
    <div class="animal-grid">
        {#each data as animal}
            <Card {animal}/>
        {/each}
    </div>
</div>

<style>
    h1 {
        font-size: 2em;
        color: #000000;
        margin-bottom: 1em;
    }

    .home {
        text-align: center;
        padding: 2em;
        color: #000000;
    }

    .animal-grid {
        margin-top: 2em;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;
    }
</style>