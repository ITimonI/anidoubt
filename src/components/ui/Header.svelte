<script>
    let navItemsVisible = true;

    function handleBtnMobileMenuPress() {
        navItemsVisible = !navItemsVisible;
    }
</script>

<header>
    <div id="title-menu">
        <h1 id="site-title">Anistack</h1>
        <button id="btn-mobile-menu" on:click={handleBtnMobileMenuPress}
            ><img src="images/icons/menu.svg" alt="M" /></button
        >
    </div>

    <nav id="nav-menu">
        <ul id="nav-items">
            <li><a href="#/">Home</a></li>
            <li><a href="#/about">Contact</a></li>
            <li><a href="#/game">Game</a></li>
        </ul>
        {#if navItemsVisible}
            <ul id="nav-items-mobile">
                <li><a href="#/">Home</a></li>
                <li><a href="#about">Contact</a></li>
                <li><a href="#/game">Game</a></li>
            </ul>
        {/if}
    </nav>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1em;
        background-color: var(--dark-color);
        color: white;
    }

    #btn-mobile-menu {
        display: none;
    }

    #site-title {
        margin: 0;
        font-size: 1.4em;
    }

    #nav-menu {
        display: flex;
        align-items: center;
    }

    #nav-items {
        list-style: none;
        display: flex;
        flex-direction: row;
        gap: 1em;
        margin: 0;
        padding: 0;
    }

    #nav-items li a {
        color: white;
        text-decoration: none;
    }

    #nav-items li a:hover {
        color: rgb(134, 219, 255);
    }

    #nav-items-mobile {
        display: none;
    }

    @media (max-width: 680px) {
        #nav-items-mobile {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 1em;
            margin: 0;
            padding: 0;
            margin-top: 1em;
            font-size: 20px;
        }

        #btn-mobile-menu {
            display: block;
        }

        header {
            display: flex;
            flex-direction: column;
        }

        #title-menu {
            display: flex;
            width: 90%;
            justify-content: space-between;
            align-items: center;
        }

        #nav-items {
            display: none;
        }
    }
</style>
