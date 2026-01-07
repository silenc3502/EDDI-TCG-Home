<script lang="ts">
  import testBackground from '$lib/assets/test_background.webp';
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

    .scene {
        width: 100%;
        background-color: #030303; /* 홈페이지 기본 배경 색상*/

        /* 프레임 간의 간격*/
        display: flex;
        flex-direction: column;
        gap: 120px;
    }

    /* 프레임 = 화면 한 장 */
    .frame {
        position: relative;
        width: 100%;
        height: var(--frame-height, 100vh);
        overflow: hidden;
    }

    /* 배경 이미지 */
    .frame-bg {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        z-index: 0;
    }

    /* 첫 프레임 전용 효과 레이어 */
    .frame-effect-layer {
        pointer-events: none;
        position: absolute;
        inset: 0;
        z-index: 2;

        background:
            /* 좌우 어둡게 */
            linear-gradient(
                to right,
                rgba(0, 0, 0, 0.85) 0%,
                rgba(30, 30, 30, 0.7) 12%,
                transparent 25%
            ),
            linear-gradient(
                to left,
                rgba(0, 0, 0, 0.85) 0%,
                rgba(30, 30, 30, 0.7) 12%,
                transparent 25%
            ),

            /* 하단 어둡게 */
            linear-gradient(
                180deg,
                rgba(0, 0, 0, 0) 60%,
                rgba(0, 0, 0, 0.8) 100%
            ),

            /* 보라 톤 */
            linear-gradient(
                180deg,
                rgba(34, 2, 51, 0.15) 0%,
                rgba(34, 2, 51, 0.3) 100%
            );
    }

    /* 프레임 안 콘텐츠 */
    .frame-content {
        position: relative;
        z-index: 3;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 8vw;
        color: white;
    }
</style>

<div class="scene">
    <!-- Frame 1 -->
    <section class="frame">
        <div
            class="frame-bg"
            style={`background-image: url(${testBackground});`}
        ></div>

        <div class="frame-effect-layer"></div>
        <div class="absolute top-[300px] left-1/2 -translate-x-1/2 w-full text-center z-[3] flex flex-col items-center gap-2">
          <h1 class="text-[96px] leading-[134.4px] font-[Orbitron] font-extrabold text-[#FAF9F6]">
            EDDI TCG
          </h1>
          <p class="text-[24px] leading-[38.4px] font-sans font-normal text-[#D1D5DB] break-words max-w-3xl">
            죽음이 쌓이고 순리가 왜곡된 세계.<br/>
            언데드, 트랜트, 그리고 인간.<br/>
            당신만의 진영으로 전쟁에서 승리하세요.
          </p>
        </div>
    </section>

    <!-- Frame 2 -->
    <section class="frame" style="--frame-height: 50vh;">
        <div class="frame-content"></div>
    </section>
</div>
