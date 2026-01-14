<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

    .story-text {
        @apply text-[18px] leading-[25.2px] text-[#D1D5DB];
        word-break: keep-all;
    }
</style>

<div class="flex flex-col items-left">
    <h1 class="mb-9 text-[48px] leading-[62.40px] font-[Noto Sans] font-extrabold text-[#B084F5]">
        부서진 순리,<br />
        깨어난 전쟁
    </h1>

    <div class="space-y-4 mb-6">
        <p class="story-text font-['Noto_Sans'] max-w-3xl">
            끝없는 겨울이 내려오고 죽음이 쌓여가자, 인간은 생존을 위해 시체를 부활시켰다.
        </p>

        <p class="story-text font-['Noto_Sans'] max-w-3xl">
            되살아난 것은 생명이 아닌 죽음을 거부한 언데드였다.
            자연의 순리는 왜곡되었고 회복은 멈췄다.
            그 균열을 감지한 자연의 일부, 트랜트는 깨어났다.
        </p>

        <p class="story-text font-['Noto_Sans'] max-w-3xl">
            완전한 부활을 원하는 언데드, 질서를 지키려는 트랜트, 살아남고자 하는 인간<br />
            그들의 선택은 결국 전쟁으로 이어졌다.
        </p>
    </div>

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
        세계관 더 알아보기
        </a>
    </div>
</div>
