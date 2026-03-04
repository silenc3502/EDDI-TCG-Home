<script lang="ts">
    import { onMount } from 'svelte';
    import HeroFrame from './frames/hero/HeroFrame.svelte';
    import IntroFrame from './frames/intro/IntroFrame.svelte';
    import RaceFrame from './frames/race/RaceFrame.svelte';
    import { useHome } from '../hooks/hooks.ts';

    const home = useHome();
    const state = home.state;

    onMount(() => {
        home.initHome();
    });
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
    <HeroFrame
        hero={$state.model.hero}
        onPrimaryAction={home.onHeroPrimaryAction}
    />

    <IntroFrame
        intro={$state.model.intro}
        onPrimaryAction={home.onIntroPrimaryAction}
    />

    <RaceFrame
        race={$state.model.race}
        onPrimaryAction={home.onRacePrimaryAction}
    />

</div>
