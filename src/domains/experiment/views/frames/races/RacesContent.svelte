<script lang="ts">
    import '../../overlay/frameOverlay.css';

    import testHumanImage from '$lib/assets/test_human_image.webp';
    import testUndeadImage from '$lib/assets/test_undead_image.webp';
    import testTrentImage from '$lib/assets/test_trent_image.webp';
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

    .race-button {
        @apply
            w-[400px] /* 너비 */
            cursor-pointer
            transition-all
            duration-300
            hover:opacity-60
            hover:scale-105;
    }
</style>

<div class="flex flex-col items-center">
    <h1 class="mb-8 text-[40px] leading-[62.40px] font-[Noto Sans] font-extrabold text-[#D1D5DB]">
        종족 미리보기
    </h1>

    <!-- Todo: 실제 행동이 생길 경우 구조 개선 필요(hooks) -->
    <div class="mt-6 flex gap-10">
        <img
            class="race-button ease-out"
            src={testUndeadImage}
            on:click|preventDefault={() => alert('준비중입니다.')}
        />
        <img
            class="race-button ease-out"
            src={testTrentImage}
            on:click|preventDefault={() => alert('준비중입니다.')}
        />
        <img
            class="race-button ease-out"
            src={testHumanImage}
            on:click|preventDefault={() => alert('준비중입니다.')}
        />
    </div>
</div>
