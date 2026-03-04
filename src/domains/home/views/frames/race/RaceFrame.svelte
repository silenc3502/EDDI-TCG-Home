<script lang="ts">
    import RaceContent from './RaceContent.svelte';
    import '../../layout/baseFrame.css';
    import '../../overlay/frameOverlay.css';

    export let race;
    export let onPrimaryAction: (id: string) => void;
</script>

<style>
    .frame-content {
        position: relative;
        z-index: 3;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

<section class="frame" style="--frame-height: 90vh;">
    <div
        class="frame-bg"
    />

    <div class="frame-content">
         <RaceContent
            headline={race.headline}
            buttons={race.buttons}
            onClickCTA={onPrimaryAction}
        />
    </div>
</section>