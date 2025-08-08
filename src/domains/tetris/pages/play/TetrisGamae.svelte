<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    const COLS = 10;
    const ROWS = 20;
    const BLOCK_SIZE = 30;

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;

    const tetrominoes = {
        I: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
        J: [[1,0,0],[1,1,1],[0,0,0]],
        L: [[0,0,1],[1,1,1],[0,0,0]],
        O: [[1,1],[1,1]],
        S: [[0,1,1],[1,1,0],[0,0,0]],
        T: [[0,1,0],[1,1,1],[0,0,0]],
        Z: [[1,1,0],[0,1,1],[0,0,0]],
    };

    const colors = [
        '#1e293b', '#f87171', '#60a5fa', '#34d399',
        '#fbbf24', '#a78bfa', '#f472b6', '#f97316'
    ];

    let arena: number[][] = [];
    function createArena() {
        return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    }
    arena = createArena();

    let player = {
        pos: { x: 0, y: 0 },
        matrix: [] as number[][],
        colorIndex: 1,
    };

    let score = 0;
    let gameOver = false;

    function randomPiece(): keyof typeof tetrominoes {
        const keys = Object.keys(tetrominoes) as (keyof typeof tetrominoes)[];
        return keys[(keys.length * Math.random()) | 0];
    }

    function createPiece(type: keyof typeof tetrominoes) {
        return tetrominoes[type].map(row => row.slice());
    }

    function rotate(matrix: number[][]) {
        const N = matrix.length;
        return Array.from({ length: N }, (_, y) =>
            Array.from({ length: N }, (_, x) => matrix[N - 1 - x][y])
        );
    }

    function collide(arena: number[][], player: typeof player) {
        const { matrix, pos } = player;
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][x] !== 0 &&
                    (arena[y + pos.y]?.[x + pos.x] ?? 1) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

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

    function arenaSweep() {
        let rowCount = 0;
        for (let y = arena.length - 1; y >= 0; y--) {
            if (arena[y].every(cell => cell !== 0)) {
                arena.splice(y, 1);
                arena.unshift(new Array(COLS).fill(0));
                rowCount++;
                y++;
            }
        }
        if (rowCount > 0) {
            score += rowCount * 10;
            updateDropSpeed();
        }
    }

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

    function playerDrop() {
        player.pos.y++;
        if (collide(arena, player)) {
            player.pos.y--;
            merge(arena, player);
            arenaSweep();
            playerReset();
        }
    }

    function playerMove(dir: number) {
        player.pos.x += dir;
        if (collide(arena, player)) {
            player.pos.x -= dir;
        }
    }

    function playerRotate() {
        const posX = player.pos.x;
        let offset = 1;
        player.matrix = rotate(player.matrix);
        while (collide(arena, player)) {
            player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > player.matrix[0].length) {
                player.matrix = rotate(rotate(rotate(player.matrix)));
                player.pos.x = posX;
                break;
            }
        }
    }

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

    function drawMatrix(matrix: number[][], offset: { x: number; y: number }) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    context.fillStyle = colors[value];
                    context.fillRect(
                        (x + offset.x) * BLOCK_SIZE,
                        (y + offset.y) * BLOCK_SIZE,
                        BLOCK_SIZE, BLOCK_SIZE
                    );
                    context.strokeStyle = '#1e293b';
                    context.lineWidth = 2;
                    context.strokeRect(
                        (x + offset.x) * BLOCK_SIZE,
                        (y + offset.y) * BLOCK_SIZE,
                        BLOCK_SIZE, BLOCK_SIZE
                    );
                }
            });
        });
    }

    function draw() {
        context.fillStyle = colors[0];
        context.fillRect(0, 0, COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
        drawMatrix(arena, { x: 0, y: 0 });
        drawMatrix(player.matrix, player.pos);
    }

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

    let dropCounter = 0;
    const dropIntervalNormal = 1000;
    const dropIntervalFast = 50;
    let dropInterval = dropIntervalNormal;
    let lastTime = 0;
    let isSoftDropping = false;

    function getSpeedByScore(score: number) {
        return Math.max(300, dropIntervalNormal - Math.floor(score / 100) * 50);
    }

    function updateDropSpeed() {
        if (!isSoftDropping) {
            dropInterval = getSpeedByScore(score);
        }
    }

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

    function handleKeyDown(e: KeyboardEvent) {
        if (gameOver) return;

        if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' ', 'Enter'].includes(e.key)) {
            e.preventDefault();
        }

        switch (e.key) {
            case 'ArrowLeft': playerMove(-1); break;
            case 'ArrowRight': playerMove(1); break;
            case 'ArrowDown':
                isSoftDropping = true;
                dropInterval = dropIntervalFast;
                dropCounter = 0;
                break;
            case 'ArrowUp': playerRotate(); break;
            case ' ':
            case 'Enter': hardDrop(); break;
        }
    }

    function handleKeyUp(e: KeyboardEvent) {
        if (e.key === 'ArrowDown') {
            isSoftDropping = false;
            updateDropSpeed();
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
