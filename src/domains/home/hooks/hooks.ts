import { writable } from 'svelte/store';
import type { HomeState } from './state';
import type { HomeModel } from './model';

const DEFAULT_MODEL: HomeModel = {
    hero: {
        title: 'EDDI TCG',
        description: [
            '죽음이 쌓이고 순리가 왜곡된 세계.',
            '언데드, 트랜트, 그리고 인간.',
            '당신만의 진영으로 전쟁에서 승리하세요.',
        ],
        background: {
            tone: 'dark-fantasy',
        },
        primaryAction: {
            label: '지금 플레이하기',
            type: 'ENTER_GAME',
        },
    },

    intro: {
        headline: '세계관 소개',
        description: '…',
    },
};

export function useHome() {
    const state = writable<HomeState>({
        status: 'LOADING',
        model: DEFAULT_MODEL,
    });

    async function initHome() {
        // 서버 점검 여부/ WebGL 지원 여부 / 필수 리소스 로딩 완료 여부 / 네트워크 상태 등
        const canEnterGame = true; // Todo: 판단 로직 나중에 추가

        // Todo: 로그인 상태 확인(토큰, 세션 확인)

        state.update(currentState => ({
            ...currentState,
            status: canEnterGame ? 'READY' : 'LOCKED',
        }));
    }

    // Todo: HomeStatus와 로그인 상태에 따라 구분해야 함
    function onHeroPrimaryAction() {
        alert('현재 준비중인 페이지입니다.');
    }

    return {
        state,
        initHome,
        onHeroPrimaryAction,
    };
}
