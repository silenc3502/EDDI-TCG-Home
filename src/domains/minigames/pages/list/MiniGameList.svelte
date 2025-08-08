<script lang="ts">
    import { goto } from '$app/navigation';

    type MiniGame = {
        id: string;
        title: string;
        description: string;
        thumbnail: string;
        route: string;
    };

    const games: MiniGame[] = [
        {
            id: 'tetris',
            title: '테트리스',
            description: '클래식 블록 쌓기 게임',
            thumbnail: '/games/tetris/thumb.png',
            route: '/tetris'
        },
        {
            id: '2048',
            title: '2048',
            description: '숫자를 합쳐 2048을 만들어보세요!',
            thumbnail: '/games/2048/thumb.png',
            route: '/games/2048'
        },
        {
            id: 'memory',
            title: '기억력 게임',
            description: '같은 그림을 맞춰보세요',
            thumbnail: '/games/memory/thumb.png',
            route: '/games/memory'
        },
        {
            id: 'tetris',
            title: '테트리스',
            description: '클래식 블록 쌓기 게임',
            thumbnail: '/games/tetris/thumb.png',
            route: '/games/tetris'
        },
        {
            id: '2048',
            title: '2048',
            description: '숫자를 합쳐 2048을 만들어보세요!',
            thumbnail: '/games/2048/thumb.png',
            route: '/games/2048'
        },
        {
            id: 'memory',
            title: '기억력 게임',
            description: '같은 그림을 맞춰보세요',
            thumbnail: '/games/memory/thumb.png',
            route: '/games/memory'
        },
    ];
</script>

<!-- 컨테이너 -->
<div class="max-w-7xl mx-auto px-4 py-10">
    <!-- 제목 -->
    <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">🎮 미니게임</h1>
        <p class="text-gray-500 text-sm mt-2">짧고 간단한 게임을 골라서 바로 시작하세요!</p>
    </div>

    <!-- 게임 리스트: 6열 -->
    <div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {#each games as game}
            <div
                    class="bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer flex flex-col items-center text-center p-2"
                    on:click={() => goto(game.route)}
            >
                <img
                        src={game.thumbnail}
                        alt={game.title}
                        class="w-16 h-16 object-cover rounded mb-1"
                />
                <h2 class="text-sm font-medium text-gray-700">{game.title}</h2>
                <p class="text-[10px] text-gray-400">{game.description}</p>
            </div>
        {/each}
    </div>
</div>
