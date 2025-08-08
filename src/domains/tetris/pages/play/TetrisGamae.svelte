<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    const COLS = 10;
    const ROWS = 20;
    const BLOCK_SIZE = 30;

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    // 테트로미노 정의
    const tetrominoes = {
        I: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        J: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        L: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0],
        ],
        O: [
            [1, 1],
            [1, 1],
        ],
        S: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ],
        T: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0],
        ],
        Z: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ],
    };

    // 각 테트로미노 색깔 인덱스 (0: 빈칸, 1~7: 색깔)
    const colors = [
        '#1e293b', // 빈칸 배경 (gray-800)
        '#f87171', // red-400
        '#60a5fa', // blue-400
        '#34d399', // green-400
        '#fbbf24', // yellow-400
        '#a78bfa', // purple-400
        '#f472b6', // pink-400
        '#f97316', // orange-500
    ];

    // 게임판 초기화
    let arena: number[][] = [];
    function createArena() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }
    arena = createArena();

    // 플레이어 상태
    let player = {
        pos: { x: 0, y: 0 },
        matrix: [] as number[][],
        colorIndex: 1,
    };

    // 점수
    let score = 0;

    // 게임 오버 플래그
    let gameOver = false;

    // 랜덤 테트로미노 생성
    function randomPiece(): keyof typeof tetrominoes {
        const keys = Object.keys(tetrominoes) as (keyof typeof tetrominoes)[];
        return keys[(keys.length * Math.random()) | 0];
    }

    // 테트로미노 복사 생성
    function createPiece(type: keyof typeof tetrominoes) {
        return tetrominoes[type].map(row => row.slice());
    }

    // 회전 함수 (시계방향 90도)
    function rotate(matrix: number[][]) {
        const N = matrix.length;
        return Array.from({ length: N }, (_, y) =>
            Array.from({ length: N }, (_, x) => matrix[N - 1 - x][y])
        );
    }

    // 충돌 체크
    function collide(arena: number[][], player: typeof player) {
        const { matrix, pos } = player;
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (
                    matrix[y][x] !== 0 &&
                    (arena[y + pos.y]?.[x + pos.x] ?? 1) !== 0
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    // 플레이어 위치 arena에 병합
    function merge(arena: number[][], player: typeof player) {
        const { matrix, pos, colorIndex } = player;
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena[y + pos.y][x + pos.x] = colorIndex;
                }
            });
        });
    }

    // 한 줄이 다 채워졌는지 체크 및 삭제
    function arenaSweep() {
        let rowCount = 0;
        for (let y = arena.length - 1; y >= 0; y--) {
            if (arena[y].every(cell => cell !== 0)) {
                arena.splice(y, 1);
                arena.unshift(new Array(COLS).fill(0));
                rowCount++;
                y++; // 다시 체크 위해 y 증가
            }
        }
        if (rowCount > 0) {
            score += rowCount * 10;
        }
    }

    // 플레이어 초기화 + 새로운 조각 생성
    function playerReset() {
        const type = randomPiece();
        player.matrix = createPiece(type);
        player.colorIndex = Object.keys(tetrominoes).indexOf(type) + 1;
        player.pos.y = 0;
        player.pos.x = Math.floor(COLS / 2) - Math.floor(player.matrix[0].length / 2);

        if (collide(arena, player)) {
            arena = createArena();
            gameOver = true;
        }
    }

    // 플레이어 아래로 한 칸 이동 (소프트 드롭)
    function playerDrop() {
        player.pos.y++;
        if (collide(arena, player)) {
            player.pos.y--;
            merge(arena, player);
            arenaSweep();
            playerReset();
        }
    }

    // 플레이어 좌우 이동
    function playerMove(dir: number) {
        player.pos.x += dir;
        if (collide(arena, player)) {
            player.pos.x -= dir;
        }
    }

    // 플레이어 회전
    function playerRotate() {
        const posX = player.pos.x;
        let offset = 1;
        player.matrix = rotate(player.matrix);

        while (collide(arena, player)) {
            player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > player.matrix[0].length) {
                player.matrix = rotate(rotate(rotate(player.matrix))); // 원상복구
                player.pos.x = posX;
                break;
            }
        }
    }

    // 하드 드롭
    function hardDrop() {
        while (!collide(arena, player)) {
            player.pos.y++;
        }
        player.pos.y--;
        merge(arena, player);
        arenaSweep();
        playerReset();
        dropCounter = 0;
    }

    // 그리기 함수
    function drawMatrix(matrix: number[][], offset: { x: number; y: number }) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillStyle = colors[value];
                    context.fillRect(
                        (x + offset.x) * BLOCK_SIZE,
                        (y + offset.y) * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE
                    );
                    context.strokeStyle = '#1e293b';
                    context.lineWidth = 2;
                    context.strokeRect(
                        (x + offset.x) * BLOCK_SIZE,
                        (y + offset.y) * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE
                    );
                }
            });
        });
    }

    function draw() {
        // 배경 클리어
        context.fillStyle = colors[0];
        context.fillRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);

        drawMatrix(arena, { x: 0, y: 0 });
        drawMatrix(player.matrix, player.pos);
    }

    // 게임 오버 화면 표시
    function drawGameOver() {
        context.fillStyle = 'rgba(0,0,0,0.7)';
        context.fillRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
        context.fillStyle = '#fff';
        context.font = 'bold 36px monospace';
        context.textAlign = 'center';
        context.fillText('GAME OVER', (COLS * BLOCK_SIZE) / 2, (ROWS * BLOCK_SIZE) / 2);
        context.font = 'bold 18px monospace';
        context.fillText('Refresh to Restart', (COLS * BLOCK_SIZE) / 2, (ROWS * BLOCK_SIZE) / 2 + 40);
    }

    // 드롭 타이밍 및 애니메이션
    let dropCounter = 0;
    const dropIntervalNormal = 1000;
    const dropIntervalFast = 50;
    let dropInterval = dropIntervalNormal;
    let lastTime = 0;
    let isSoftDropping = false;

    function update(time = 0) {
        const deltaTime = time - lastTime;
        lastTime = time;
        dropCounter += deltaTime;

        if (dropCounter > dropInterval) {
            playerDrop();
            dropCounter = 0;
        }

        draw();

        if (!gameOver) {
            requestAnimationFrame(update);
        } else {
            drawGameOver();
        }
    }

    // 키보드 이벤트 핸들러
    function handleKeyDown(e: KeyboardEvent) {
        if (gameOver) return;

        if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' ', 'Enter'].includes(e.key)) {
            e.preventDefault(); // 기본 스크롤 등 방지
        }

        switch (e.key) {
            case 'ArrowLeft':
                playerMove(-1);
                break;
            case 'ArrowRight':
                playerMove(1);
                break;
            case 'ArrowDown':
                isSoftDropping = true;
                dropInterval = dropIntervalFast;
                break;
            case 'ArrowUp':
                playerRotate();
                break;
            case ' ':
            case 'Enter':
                hardDrop();
                break;
        }
    }

    function handleKeyUp(e: KeyboardEvent) {
        if (e.key === 'ArrowDown') {
            isSoftDropping = false;
            dropInterval = dropIntervalNormal;
        }
    }

    onMount(() => {
        context = canvas.getContext('2d')!;
        canvas.width = COLS * BLOCK_SIZE;
        canvas.height = ROWS * BLOCK_SIZE;

        playerReset();
        update();

        window.addEventListener('keydown', handleKeyDown, { passive: false });
        window.addEventListener('keyup', handleKeyUp);
    });

    onDestroy(() => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    });
</script>

<style>
    canvas {
        display: block;
        margin: 0 auto;
        background: #1e293b;
        border: 3px solid #334155;
        border-radius: 10px;
    }
</style>

<h2 class="text-center text-xl font-bold my-4 text-gray-700">🎮 테트리스</h2>
<div class="text-center mb-4">
    <span class="text-gray-600 font-semibold">점수: {score}</span>
</div>
<canvas bind:this={canvas}></canvas>
