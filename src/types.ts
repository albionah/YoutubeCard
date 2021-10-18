import {LovelaceCardConfig} from 'custom-card-helpers';

export interface YoutubeCardConfig extends LovelaceCardConfig {
    type: string;
    entity: string;
    youtubeControllerBaseUrl: string;
}
