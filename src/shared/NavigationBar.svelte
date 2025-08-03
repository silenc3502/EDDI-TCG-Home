<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import logoUrl from '../lib/assets/eddi.webp';

    const isLoggedIn = writable(false);

    onMount(() => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            isLoggedIn.set(false);
            return;
        }

        fetch('/authentication/validate', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            if (res.ok) {
                isLoggedIn.set(true);
            } else {
                localStorage.removeItem('userToken');
                isLoggedIn.set(false);
            }
        });
    });

    function handleAuthClick(loggedIn: boolean) {
        if (loggedIn) {
            localStorage.removeItem('userToken');
            isLoggedIn.set(false);
            goto('/');
        } else {
            goto('/authentication');
        }
    }
</script>

<style>
    header {
        background-color: #1f2937; /* Tailwind gray-800 */
        color: white;
        width: 100%;
        margin: 0;
        padding: 0;
    }
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 64px;
        padding: 0 1rem;
    }
    .brand-name {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        user-select: none;
    }
    .logo {
        height: 48px; /* 내비 높이보다 살짝 작게 */
        cursor: pointer;
    }
    .nav-links {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    a, button {
        color: white;
        font-size: 1rem;
        font-weight: 500;
        text-decoration: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
    }
    a:hover, button:hover {
        color: #60a5fa;
    }
</style>

<header>
    <nav>
        <div style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;" on:click={() => goto('/')}>
            <img src={logoUrl} alt="EDDI Logo" class="logo" />
            <span class="brand-name">EDDI</span>
        </div>
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/board">게시판</a>
            <a href="/team">Team</a>
            {#if $isLoggedIn}
                <button on:click={() => handleAuthClick(true)}>로그아웃</button>
            {:else}
                <button on:click={() => handleAuthClick(false)}>로그인</button>
            {/if}
            <a href="/game">Game Start</a>
        </div>
    </nav>
</header>
