<script lang="ts">
    import testImage from '$lib/assets/test_intro_image.webp';
    import IntroContent from './IntroContent.svelte';
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
        align-items: center;
        justify-content: flex-start;
        padding-left: 120px;        /* 프레임 여백 책임 */
    }

    .content-left {
        max-width: 768px;
        text-align: left;
    }
</style>

<section class="frame" style="--frame-height: 70vh;">
    <div
        class="frame-bg"
    />


    <!-- 프레임 장식 이미지 -->
    <img
        class="frame-float-image is-bg-like"
        src={testImage}
    />

    <div class="intro-effect-layer" />

    <div class="frame-content content-left">
        <IntroContent />
    </div>
</section>