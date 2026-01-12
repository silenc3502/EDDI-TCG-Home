<script lang="ts">
    import testBackground from '$lib/assets/test_background.webp';
    import HeroContent from './HeroContent.svelte';
    import '../../effects/heroBackground.css';
</script>

<style>
    .frame {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .frame-bg {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        z-index: 0;
    }

    /* 콘텐츠 위치 Frame에서 책임 */
    .frame-content {
    position: relative;
    z-index: 3;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    }

    /* Hero 전용 중앙 정렬 */
    .center {
    flex-direction: column;
    text-align: center;
    }
</style>

<section class="frame">
    <!-- 배경 -->
    <div
        class="frame-bg"
        style={`background-image: url(${testBackground});`}
    />

    <!-- 배경 효과 -->
    <div class="hero-effect-layer" />

    <!-- 텍스트, 버튼 등 -->
    <div class="frame-content center">
        <HeroContent />
    </div>
</section>

