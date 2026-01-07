<script lang="ts">
  import testBackground from '$lib/assets/test_background.webp';
</script>

<style>
  .scene {
    width: 100%;
  }

  /* 프레임 = 화면 한 장 */
  .frame {
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #030303;
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
  </section>

  <!-- Frame 2 -->
  <section class="frame">
    <div class="frame-content"></div>
  </section>
</div>
