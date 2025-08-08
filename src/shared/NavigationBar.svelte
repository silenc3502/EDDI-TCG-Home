<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import logoUrl from '../lib/assets/eddi.webp';

    const isLoggedIn = writable(false);
    const menuOpen = writable(false);

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
        alert('준비 중입니다.');
        return;

        if (loggedIn) {
            localStorage.removeItem('userToken');
            isLoggedIn.set(false);
            goto('/');
        } else {
            goto('/authentication');
        }
    }

    function handleGameClick() {
        alert('준비 중입니다.');
    }
</script>

<style>
    header {
        background-color: #1f2937;
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
        position: relative;
    }

    .brand-name {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        user-select: none;
    }

    .logo {
        height: 48px;
        cursor: pointer;
    }

    .nav-links {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    a,
    button {
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

    a:hover,
    button:hover {
        color: #60a5fa;
    }

    .menu-toggle {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 24px;
        height: 18px;
        cursor: pointer;
    }

    .menu-toggle span {
        display: block;
        height: 3px;
        background: white;
        border-radius: 2px;
    }

    .mobile-menu {
        display: none;
        position: absolute;
        top: 64px;
        right: 0;
        background: #1f2937;
        padding: 1rem;
        border-radius: 0 0 8px 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        flex-direction: column;
        gap: 0.75rem;
        z-index: 50;

        /* 모바일 메뉴 텍스트 중앙 정렬 */
        text-align: center;
    }

    .mobile-menu a,
    .mobile-menu button {
        display: block;
        width: 100%;
        text-align: center;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }

        .menu-toggle {
            display: flex;
        }

        .mobile-menu {
            display: flex;
        }
    }
</style>

<header>
    <nav>
        <!-- 로고 영역 -->
        <div style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;" on:click={() => goto('/')}>
            <img src={logoUrl} alt="EDDI Logo" class="logo" />
            <span class="brand-name">EDDI</span>
        </div>

        <!-- 햄버거 메뉴 (모바일 전용) -->
        <div class="menu-toggle" on:click={() => menuOpen.update(v => !v)}>
            <span></span>
            <span></span>
            <span></span>
        </div>

        <!-- PC용 메뉴 -->
        <div class="nav-links">
            <a href="/">Home</a>
            <a href="/business">사업 소개</a>
            <a href="/board">게시판</a>
            <a href="/team">Team</a>
            <a href="/minigames">미니 게임</a>
            {#if $isLoggedIn}
                <button on:click={() => handleAuthClick(true)}>로그아웃</button>
            {:else}
                <button on:click={() => handleAuthClick(false)}>로그인</button>
            {/if}
            <button on:click={handleGameClick}>Game Start</button>
        </div>

        <!-- 모바일 메뉴 드롭다운 -->
        {#if $menuOpen}
            <div class="mobile-menu">
                <a href="/">Home</a>
                <a href="/business">사업 소개</a>
                <a href="/board">게시판</a>
                <a href="/team">Team</a>
                <a href="/minigames">미니 게임</a>
                {#if $isLoggedIn}
                    <button on:click={() => handleAuthClick(true)}>로그아웃</button>
                {:else}
                    <button on:click={() => handleAuthClick(false)}>로그인</button>
                {/if}
                <button on:click={handleGameClick}>Game Start</button>
            </div>
        {/if}
    </nav>
</header>
