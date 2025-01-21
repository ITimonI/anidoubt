<script>
    let animals = ['Lion', 'Tiger', 'Elephant', 'Giraffe', 'Zebra'];
</script>

<style>
    .container {
        text-align: center;
        padding: 2rem;
    }
    .animal-list {
        list-style-type: none;
        padding: 0;
    }
    .animal-item {
        margin: 0.5rem 0;
        font-size: 1.5rem;
    }
</style>

<div class="container">
    <h1>Welcome to the Animal Website</h1>
    <ul class="animal-list">
        {#each animals as animal}
            <li class="animal-item">{animal}</li>
        {/each}
    </ul>
</div>