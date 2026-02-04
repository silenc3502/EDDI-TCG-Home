export type HomeStatus =
    | 'LOADING'   // 진입 직후, 판단 전
    | 'READY'     // 모든 주요 행동 가능
    | 'LOCKED';   // 핵심 행동 제한 (점검 등)

// export type HeroPrimaryActionType =
//     | 'ENTER_GAME'
//     | 'REQUIRE_LOGIN';

export interface HomeState {
    status: HomeStatus;
    model: HomeModel;
//     isLoggedIn: boolean;
}
