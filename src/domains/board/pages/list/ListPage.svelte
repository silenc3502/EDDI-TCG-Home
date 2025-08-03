<script lang="ts">
    import { boardList } from '$board/stores/boardStore';
    import type { Board } from '$board/types/board';
    import { onDestroy } from 'svelte';

    let boards: Board[] = [];

    const unsubscribe = boardList.subscribe(value => {
        boards = value;
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<style>
    .container {
        max-width: 960px;
        margin: 2rem auto;
        padding: 1rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
    }

    th, td {
        text-align: left;
        padding: 12px 16px;
        border-bottom: 1px solid #eee;
    }

    th {
        background-color: #f0f0f0;
    }

    tr:hover {
        background-color: #f9f9f9;
    }
</style>

<div class="container">
    <h2>게시판 목록</h2>
    <table>
        <thead>
        <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
        </tr>
        </thead>
        <tbody>
        {#each boards as board}
            <tr>
                <td>{board.title}</td>
                <td>{board.author}</td>
                <td>{new Date(board.createdAt).toLocaleDateString()}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
