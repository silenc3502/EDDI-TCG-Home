<script lang="ts">
    export let headline: string[];
    export let description: string[];
    export let ctaLabel: string;
    export let onClickCTA: () => void;
</script>

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
        {#each headline as line}
            {line}<br />
        {/each}
    </h1>

    <div class="space-y-4 mb-6">
        {#each description as paragraph}
            <p class="story-text font-['Noto_Sans'] max-w-3xl">
                {#each paragraph as line}
                    {line}<br />
                {/each}
            </p>
        {/each}
    </div>

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
