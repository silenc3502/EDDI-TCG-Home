<script lang="ts">
    import env from '../../../../env';

    import kakaoIcon from '../../../../lib/assets/kakao_logo.webp';
    import googleIcon from '../../../../lib/assets/google_logo.webp';
    import naverIcon from '../../../../lib/assets/naver_logo.webp';
    import githubIcon from '../../../../lib/assets/github_logo.webp';
    import metaIcon from '../../../../lib/assets/meta_logo.webp';

    interface ProviderConfig {
        name: string;
        url: string | undefined;
        icon: string;
        label: string;
        baseBgColor: string;
        textColor: string;
        border: string;
        hoverBgColor: string;
    }

    let hoveredProvider: string | null = null;

    const providers: ProviderConfig[] = [
        {
            name: 'kakao',
            url: env.api.kakao,
            icon: kakaoIcon,
            label: '카카오 로그인',
            baseBgColor: '#FEE500',
            hoverBgColor: '#FFD600',
            textColor: 'text-black',
            border: 'border border-yellow-400'
        },
        {
            name: 'google',
            url: env.api.google,
            icon: googleIcon,
            label: 'Google 로그인',
            baseBgColor: '#FFFFFF',
            hoverBgColor: '#F5F5F5',
            textColor: 'text-gray-900',
            border: 'border border-gray-300'
        },
        {
            name: 'naver',
            url: env.api.naver,
            icon: naverIcon,
            label: '네이버 로그인',
            baseBgColor: '#03C75A',
            hoverBgColor: '#02B14B',
            textColor: 'text-white',
            border: 'border border-green-600'
        },
        {
            name: 'github',
            url: env.api.github,
            icon: githubIcon,
            label: 'GitHub 로그인',
            baseBgColor: '#6E40C9',
            hoverBgColor: '#5A2EB9',
            textColor: 'text-white',
            border: 'border border-purple-900'
        },
        {
            name: 'meta',
            url: env.api.meta,
            icon: metaIcon,
            label: 'Facebook 로그인',
            baseBgColor: '#2563EB',
            hoverBgColor: '#1E40AF',
            textColor: 'text-white',
            border: 'border border-blue-700'
        }
    ];

    function login(url: string | undefined) {
        if (url?.startsWith('http')) {
            window.location.href = url;
        } else {
            alert('URL이 올바르지 않습니다.');
        }
    }
</script>

<div class="flex justify-center items-center" style="min-height: calc(100vh - 64px);">
    <div class="flex flex-col w-full max-w-xs mx-auto py-12 gap-4">
        {#each providers as provider}
            <button
                    on:click={() => login(provider.url)}
                    on:mouseenter={() => (hoveredProvider = provider.name)}
                    on:mouseleave={() => (hoveredProvider = null)}
                    class={`flex items-center gap-3 w-full px-4 py-2 rounded-md transition shadow-sm ${provider.textColor} ${provider.border}`}
                    style="background-color: {hoveredProvider === provider.name ? provider.hoverBgColor : provider.baseBgColor};"
                    disabled={!provider.url?.startsWith('http')}
            >
                <img src={provider.icon} alt={provider.name} class="h-6 w-6 object-contain" />
                <span class="text-sm font-semibold">{provider.label}</span>
            </button>
        {/each}
    </div>
</div>


