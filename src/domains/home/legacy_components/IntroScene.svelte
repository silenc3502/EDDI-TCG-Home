<script lang="ts">
    import undeadWave from '$lib/assets/undead_wave.webp';
</script>

<style>
    @keyframes pulseRed {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 0.6; }
    }

    @keyframes pulsePurple {
        0%, 100% { opacity: 0.15; }
        50% { opacity: 0.5; }
    }

    .aura-red {
        position: fixed;
        top: 0; bottom: 0;
        left: 0;
        width: 35vw;
        max-width: 420px;
        background: radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.6), transparent 80%);
        filter: blur(30px);
        animation: pulseRed 4s ease-in-out infinite;
        pointer-events: none;
        mix-blend-mode: screen;
        z-index: 15;
    }

    .aura-purple {
        position: fixed;
        top: 0; bottom: 0;
        right: 0;
        width: 35vw;
        max-width: 420px;
        background: radial-gradient(circle at 80% 50%, rgba(128, 0, 128, 0.5), transparent 85%);
        filter: blur(25px);
        animation: pulsePurple 6s ease-in-out infinite;
        pointer-events: none;
        mix-blend-mode: screen;
        z-index: 15;
    }
</style>

<section
        class="relative w-full bg-black overflow-hidden flex justify-center items-center"
        style="min-height: calc(100vh - 64px);"
>
    <!-- 좌우 여백 전체에 어둠 + 안개 효과 (이미지 영역 제외한 나머지 전체) -->
    <div
            class="pointer-events-none absolute top-0 left-0 w-full h-full z-0"
            style="
      background:
        linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(30,30,30,0.8) 10%, transparent 20%),
        linear-gradient(to left, rgba(0,0,0,0.95) 0%, rgba(30,30,30,0.8) 10%, transparent 20%);
      mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      mix-blend-mode: screen;
    "
    ></div>

    <!-- 검붉은 오오라 -->
    <div class="aura-red"></div>

    <!-- 보라빛 오오라 -->
    <div class="aura-purple"></div>

    <!-- 중앙 이미지 컨테이너 -->
    <div
            class="relative w-full max-w-[1200px] rounded-md overflow-hidden z-20 flex items-center justify-center"
            style={`background-image: url(${undeadWave}); background-size: cover; background-position: center center; min-height: 600px;`}
    >
        <!-- 어두운 오버레이 -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-[#1a0e07cc] to-black/80"></div>

        <!-- 텍스트 박스 -->
        <div class="relative z-30 flex flex-col items-center justify-center h-full px-6 text-center text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            <p class="text-lg text-white/80 max-w-3xl">
                죽음의 군세가 다시 깨어났다. 불타는 성채의 잿더미 속에서,
            </p>
            <h1 class="mt-4 text-4xl sm:text-5xl font-bold text-yellow-400 drop-shadow-md">
                언데드의 진격이 시작된다
            </h1>
            <p class="mt-2 text-base sm:text-lg text-white/70 max-w-3xl mx-auto">
                수천 년 전 멸망한 왕국의 망령들이 부활하여, 고대의 마법과 저주를 무기 삼아 다시 전장을 지배한다.
                당신은 이 전쟁에서 어떤 진영을 선택할 것인가?
            </p>

            <div class="mt-6">
                <a
                        href="#"
                        on:click|preventDefault={() => alert('준비중입니다.')}
                        class="inline-block border border-yellow-400 bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-200 px-6 py-2 text-sm font-semibold uppercase tracking-wide rounded-md"
                >
                    세계관 알아보기
                </a>
            </div>
        </div>
    </div>
</section>
