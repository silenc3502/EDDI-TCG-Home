<script lang="ts">
    import card1 from '$lib/assets/8.webp';
    import card2 from '$lib/assets/17.webp';
    import card3 from '$lib/assets/25.webp';

    const cards = [
        {
            image: card1,
            name: '죽음의 낫',
            description: '가장 오래된 전쟁의 기록 속, 이 낫은 신화조차 피할 수 없는 심판의 형벌로 불렸다. 신화의 존재들마저 피를 흘리고, 그 아래에 선 자들은 흔적조차 남기지 못한 채 사라진다.',
        },
        {
            image: card2,
            name: '해골 군주 레오닉',
            description: '레오닉의 눈에 들면, 죽음조차 끝이 아니다. 그 앞에선 누구도 되돌아올 수 없고, 뼈마저 복종을 맹세한다. 잊힌 자들의 무덤 깊은 곳에서, 그는 다시 전장을 향해 걸어 나온다.',
        },
        {
            image: card3,
            name: '파멸의 계약',
            description: '고대 봉인의 서가 열리는 순간, 모든 생명은 피할 수 없는 균형의 붕괴를 맞이한다. 주문은 몸과 영혼을 가리지 않고 파괴를 명령하며, 그 대가는 무의식 속 가장 깊은 곳에 새겨진다.',
        },
    ];
</script>

<section class="py-20 px-4 bg-black text-white">
    <h2 class="text-3xl font-bold text-center mb-16 tracking-widest">👁 언데드 카드 미리보기</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {#each cards as card}
            <div class="bg-zinc-900 p-6 rounded-xl hover:scale-105 hover:shadow-xl transition-all duration-300">
                <img src={card.image} alt={card.name} class="rounded-md w-full h-auto mb-6" />
                <h3 class="text-xl font-semibold mb-3">{card.name}</h3>
                <p class="text-base leading-relaxed text-gray-400">{card.description}</p>
            </div>
        {/each}
    </div>
</section>
