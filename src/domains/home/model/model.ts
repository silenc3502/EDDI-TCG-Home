import { HeroBackgroundTone } from './backgroundToneType';
import { HeroCtaType } from './heroCtaType';

export interface HomeModel {
    hero: {
        title: string;
        description: string[];

        background: {
            tone: HeroBackgroundTone;
        };

        primaryAction: {
            label: string;
            type: HeroCtaType;
        };
    };

    intro: {
        headline: string[];
        description: string[];
        primaryAction: string;
    };

    race: {
        headline: string;
        buttons: {
            id: string;
            image: string;
        }[];
    };
}
