import type { HomeModel } from './model';

export const DEFAULT_HOME_MODEL: HomeModel = {
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
        headline: [
            '부서진 순리,',
            '깨어난 전쟁'
        ],
        description: [
            [
                '끝없는 겨울이 내려오고 죽음이 쌓여가자, 인간은 생존을 위해 시체를 부활시켰다.'
            ],
            [
                '되살아난 것은 생명이 아닌 죽음을 거부한 언데드였다.',
                '자연의 순리는 왜곡되었고 회복은 멈췄다.',
                '그 균열을 감지한 자연의 일부, 트랜트는 깨어났다.'
            ],
            [
                '완전한 부활을 원하는 언데드, 질서를 지키려는 트랜트, 살아남고자 하는 인간',
                '그들의 선택은 결국 전쟁으로 이어졌다.'
            ]
        ],
        primaryAction: '세계관 더 알아보기',
    },
};