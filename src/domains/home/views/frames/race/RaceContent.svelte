<script lang="ts">
    import '../../overlay/frameOverlay.css';

    export let headline: string;
    export let buttons: {
        id: string;
        image: string;
    }[];
    export let onClickCTA: (id: string) => void;
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

    .race-button {
        @apply
            w-[400px] /* 너비 */
            cursor-pointer
            transition-all
            duration-300
            hover:opacity-60
            hover:scale-105;
    }
</style>

<div class="flex flex-col items-center">
    <h1 class="mb-8 text-[40px] leading-[62.40px] font-[Noto Sans] font-extrabold text-[#D1D5DB]">
        {headline}
    </h1>

    <div class="mt-6 flex gap-10">
        {#each buttons as button}
            <img
                class="race-button ease-out"
                src={button.image}
                on:click={() => onClickCTA(button.id)}
            />
        {/each}
    </div>
</div>
