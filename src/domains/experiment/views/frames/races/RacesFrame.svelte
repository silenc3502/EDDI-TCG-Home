<script lang="ts">
    import RacesContent from './RacesContent.svelte';
    import '../../layout/baseFrame.css';
    import '../../overlay/frameOverlay.css';
    import '../../effects/introBackground.css';
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
        <RacesContent />
    </div>
</section>