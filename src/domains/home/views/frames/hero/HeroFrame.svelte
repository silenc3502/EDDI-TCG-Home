<script lang="ts">
    import testBackground from '$lib/assets/test_background.webp';
    import HeroContent from './HeroContent.svelte';
    import '../../effects/heroBackground.css';
    import '../../layout/baseFrame.css';

    export let hero;
    export let onPrimaryAction: () => void;
</script>

<style>
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
        style={`background-image: url(${testBackground});`}>
    </div>

    <!-- 배경 효과 -->
    <div
        class="hero-effect-layer"
        data-tone={hero.background.tone}>
    </div>

    <!-- 텍스트, 버튼 등 -->
    <div class="frame-content center">
        <HeroContent
            title={hero.title}
            description={hero.description}
            ctaLabel={hero.primaryAction.label}
            onClickCTA={onPrimaryAction}
        />
    </div>
</section>
