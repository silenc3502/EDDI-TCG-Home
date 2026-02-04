<script lang="ts">
    export let title: string;
    export let description: string[];
    export let ctaLabel: string;
    export let onClickCTA: () => void;
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
</style>

<div class="flex flex-col items-center gap-2">
    <h1 class="text-[96px] leading-[134.4px] font-[Orbitron] font-extrabold text-[#FAF9F6]">
        {title}
    </h1>

    <p class="text-[24px] leading-[38.4px] font-[Noto Sans] text-[#D1D5DB] max-w-3xl">
        {#each description as line}
            {line}<br />
        {/each}
    </p>

    <div class="mt-6">
        <button
            on:click={onClickCTA}
            class="px-7 py-2.5
                   text-[18px] font-[Noto Sans] text-[#B084F5]
                   border border-[#B084F5]
                   bg-[#3A275A80]
                   tracking-wide
                   transition-colors
                   hover:bg-[#B084F5] hover:text-[#FAF9F6]
                   cursor-pointer"
        >
            {ctaLabel}
        </button>
    </div>
</div>
