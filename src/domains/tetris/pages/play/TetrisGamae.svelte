<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    const COLS = 10;
    const ROWS = 20;

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
        '#1e293b','#f87171','#60a5fa','#34d399',
        '#fbbf24','#a78bfa','#f472b6','#f97316'
    ];

    let arena: number[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    let player = { pos: { x:0, y:0 }, matrix: [] as number[][], colorIndex: 1 };

    let score = 0;
    let gameOver = false;
    let BLOCK_SIZE = 30;
    let dropCounter = 0;
    const dropIntervalNormal = 1000;
    const dropIntervalFast = 50;
    let dropInterval = dropIntervalNormal;
    let lastTime = 0;
    let isSoftDropping = false;

    function randomPiece() {
        const keys = Object.keys(tetrominoes);
        return keys[(keys.length * Math.random()) | 0];
    }

    function createPiece(type) {
        return tetrominoes[type].map(r => r.slice());
    }

    function rotate(matrix) {
        const N = matrix.length;
        return Array.from({ length: N }, (_, y) =>
            Array.from({ length: N }, (_, x) => matrix[N - 1 - x][y])
        );
    }

    function collide(arena, player) {
        const { matrix, pos } = player;
        for (let y = 0; y < matrix.length; y++)
            for (let x = 0; x < matrix[y].length; x++)
                if (matrix[y][x] !== 0 && (arena[y + pos.y]?.[x + pos.x] ?? 1) !== 0)
                    return true;
        return false;
    }

    function merge(arena, player) {
        player.matrix.forEach((row, y) => row.forEach((v, x) => {
            if (v !== 0) arena[y + player.pos.y][x + player.pos.x] = player.colorIndex;
        }));
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
            arena = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
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

    function playerMove(dir) {
        player.pos.x += dir;
        if (collide(arena, player)) player.pos.x -= dir;
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
        while (!collide(arena, player)) player.pos.y++;
        player.pos.y--;
        merge(arena, player);
        arenaSweep();
        playerReset();
        dropCounter = 0;
    }

    function drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect((x + offset.x) * BLOCK_SIZE, (y + offset.y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                context.strokeStyle = '#1e293b';
                context.lineWidth = 2;
                context.strokeRect((x + offset.x) * BLOCK_SIZE, (y + offset.y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }));
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

    function getSpeedByScore(score) {
        return Math.max(300, dropIntervalNormal - Math.floor(score / 100) * 50);
    }

    function updateDropSpeed() {
        if (!isSoftDropping) dropInterval = getSpeedByScore(score);
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
        if (!gameOver) requestAnimationFrame(update);
        else drawGameOver();
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (gameOver) return;
        if (['ArrowLeft','ArrowRight','ArrowDown','ArrowUp',' ','Enter'].includes(e.key)) e.preventDefault();
        switch (e.key) {
            case 'ArrowLeft': playerMove(-1); break;
            case 'ArrowRight': playerMove(1); break;
            case 'ArrowDown': isSoftDropping = true; dropInterval = dropIntervalFast; dropCounter = 0; break;
            case 'ArrowUp': playerRotate(); break;
            case ' ': case 'Enter': hardDrop(); break;
        }
    }

    function handleKeyUp(e: KeyboardEvent) {
        if (e.key === 'ArrowDown') { isSoftDropping = false; updateDropSpeed(); }
    }

    function resizeCanvas() {
        const headerHeight = 64; // 상단 네비바
        const wrapper = document.querySelector('.wrapper') as HTMLElement;
        const titleHeight = wrapper?.querySelector('h2')?.clientHeight ?? 0;
        const scoreHeight = wrapper?.querySelector('.score')?.clientHeight ?? 0;

        const mobileControls = document.querySelector('.mobile-controls') as HTMLElement;
        let mobileControlsHeight = 0;
        if (mobileControls) {
            const style = window.getComputedStyle(mobileControls);
            mobileControlsHeight = style.display !== 'none' ? mobileControls.offsetHeight : 0;
        }

        const padding = 20; // 상하좌우 최소 여백
        const gapBetweenCanvasAndButtons = 8; // 캔버스와 버튼 사이 여백

        const availableHeight = window.innerHeight
            - headerHeight
            - titleHeight
            - scoreHeight
            - mobileControlsHeight
            - padding
            - gapBetweenCanvasAndButtons;

        const availableWidth = window.innerWidth - padding;

        const blockWidth = Math.floor(availableWidth / COLS);
        const blockHeight = Math.floor(availableHeight / ROWS);

        BLOCK_SIZE = Math.max(10, Math.min(blockWidth, blockHeight));

        canvas.width = COLS * BLOCK_SIZE;
        canvas.height = ROWS * BLOCK_SIZE;

        document.documentElement.style.setProperty('--block-size', `${BLOCK_SIZE}px`);
        draw();
    }

    onMount(() => {
        context = canvas.getContext('2d')!;
        playerReset();
        resizeCanvas();
        update();

        window.addEventListener('keydown', handleKeyDown, { passive: false });
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('resize', resizeCanvas);
    });

    onDestroy(() => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        window.removeEventListener('resize', resizeCanvas);
    });
</script>

<style>
    html, body {
        margin:0;
        padding:0;
        height:100%;
        background:#f1f5f9;
        overflow:hidden;
    }

    .wrapper {
        display:flex;
        flex-direction:column;
        height:100%;
        align-items:center;
        justify-content:space-between;
        box-sizing:border-box;
    }

    .header {
        height:64px;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        flex-shrink:0;
    }

    .score {
        font-weight:bold;
        font-size:1.2rem;
        color:#374151;
        margin-top:4px;
    }

    .canvas-container {
        flex:1;
        display:flex;
        justify-content:center;
        align-items:center;
        width:100%;
        box-sizing:border-box;
        padding-bottom: 16px; /* ✅ 캔버스와 버튼 사이 여백 추가 */
    }

    canvas {
        display:block;
        border-radius:8px;
        background:#e2e8f0;
    }

    .mobile-controls {
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:10px;
        margin-bottom:8px;
        flex-shrink:0;
        padding-bottom: 8px; /* ✅ 모바일 환경에서 화면 끝과 버튼 사이 간격 */
    }

    .control-row {
        display:flex;
        gap:10px;
    }

    .mobile-controls button {
        font-size: calc(0.8 * var(--block-size));
        padding: calc(0.3 * var(--block-size)) calc(0.5 * var(--block-size));
        background:#334155;
        color:white;
        border:none;
        border-radius:8px;
        cursor:pointer;
        transition: transform 0.1s ease;
    }

    .mobile-controls button:active {
        background:#475569;
        transform: scale(0.95);
    }

    @media (min-width:768px) {
        .mobile-controls { display:none; }
    }
</style>

<div class="wrapper">
    <div class="header">
        <h2>🎮 테트리스</h2>
        <div class="score">점수: {score}</div>
    </div>

    <div class="canvas-container">
        <canvas bind:this={canvas}></canvas>
    </div>

    <div class="mobile-controls">
        <div class="control-row">
            <button on:click={() => playerMove(-1)}>⬅️</button>
            <button on:click={playerRotate}>🔄</button>
            <button on:click={() => playerMove(1)}>➡️</button>
        </div>
        <div class="control-row">
            <button
                    on:touchstart={() => { isSoftDropping=true; dropInterval=dropIntervalFast; dropCounter=0; }}
                    on:touchend={() => { isSoftDropping=false; updateDropSpeed(); }}
            >⬇️</button>
            <button on:click={hardDrop}>⏬</button>
        </div>
    </div>
</div>
