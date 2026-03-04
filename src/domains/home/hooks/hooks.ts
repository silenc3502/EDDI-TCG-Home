import { writable } from 'svelte/store';
import type { HomeState } from './state';
import { DEFAULT_HOME_MODEL } from '../model/defaultModel';
import type { HeroCtaType } from '../model/heroCtaType';

export function useHome() {
    const state = writable<HomeState>({
        status: 'LOADING',
        model: DEFAULT_HOME_MODEL,
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

    function resolveHeroCtaType(isLoggedIn: boolean): HeroCtaType {
        return isLoggedIn
            ? 'ENTER_GAME'
            : 'OPEN_LOGIN';
    }

    // Todo: HomeStatus와 로그인 상태에 따라 구분해야 함
    function onHeroPrimaryAction() {
        alert('현재 준비중인 페이지입니다.');
    }

    function onIntroPrimaryAction() {
        alert('현재 준비중인 페이지입니다.');
    }

    function onRacePrimaryAction(id: string) {
        alert(`현재 준비중인 페이지입니다. ${id} 버튼 클릭`);
    }

    return {
        state,
        initHome,
        onHeroPrimaryAction,
        onIntroPrimaryAction,
        onRacePrimaryAction,
    };
}
