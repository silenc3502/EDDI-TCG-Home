<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
</style>

<div class="flex flex-col items-center gap-2">
    <h1 class="text-[96px] leading-[134.4px] font-[Orbitron] font-extrabold text-[#FAF9F6]">
        EDDI TCG
    </h1>

    <p class="text-[24px] leading-[38.4px] font-[Noto Sans] text-[#D1D5DB] max-w-3xl">
        죽음이 쌓이고 순리가 왜곡된 세계.<br />
        언데드, 트랜트, 그리고 인간.<br />
        당신만의 진영으로 전쟁에서 승리하세요.
    </p>

    <div class="mt-6">
        <!-- Todo: 실제 행동이 생길 경우 구조 개선 필요(hooks) -->
        <a
        href="#"
        on:click|preventDefault={() => alert('준비중입니다.')}
        class="px-7 py-3 text-[18px] font-[Noto Sans]
                text-[#B084F5] border border-[#B084F5]
                bg-[#3A275A80] uppercase tracking-wide
                transition-colors hover:bg-[#B084F5] hover:text-[#FAF9F6]"
        >
        지금 플레이하기
        </a>
    </div>
</div>
