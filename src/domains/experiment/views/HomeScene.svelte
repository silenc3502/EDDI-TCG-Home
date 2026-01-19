<script lang="ts">
    import HeroFrame from './frames/hero/HeroFrame.svelte';
    import IntroFrame from './frames/intro/IntroFrame.svelte';
    import RacesFrame from './frames/races/RacesFrame.svelte';

    const frames = [HeroFrame, IntroFrame, RacesFrame];
</script>

<style>
    .scene {
        width: 100%;
        background-color: #030303;
        display: flex;
        flex-direction: column;
        gap: 120px;
    }
</style>

<div class="scene">
    {#each frames as Frame}
        <Frame />
    {/each}
</div>
