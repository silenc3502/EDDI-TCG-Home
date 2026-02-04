export interface HomeModel {
    hero: {
        title: string;
        description: string[];

        background: {
            tone: 'dark-fantasy'; // 배경효과 변경 가능성
        };

        primaryAction: {
            label: string;
            type: 'ENTER_GAME'; // 로그인 여부에 따라서 타입이 달라짐
        };
    };

    intro: {
        headline: string;
        description: string;
    };
}
