import {HomeAssistant} from 'custom-card-helpers';
import {EntityId} from '../DataTypes/EntityId';

export class MediaPlayerService {
    private readonly hass: HomeAssistant;
    private readonly entityId: EntityId;

    public constructor(hass: HomeAssistant, entityId: EntityId) {
        this.hass = hass;
        this.entityId = entityId;
    }

    public watchPrevious(): void {
        this.command("media_previous_track");
    }

    public watchNext(): void {
        this.command("media_next_track");
    }

    public play(): void {
        this.command("media_play");
    }

    public pause(): void {
        this.command("media_pause");
    }

    public watchVideo(videoId: string): void {
        this.command("play_media", { media_content_type: "video", media_content_id: videoId });
    }

    private command(commandName: string, options: object = {}): void {
        this.hass.callService('media_player', commandName, {
            entity_id: this.entityId,
            ...options
        });
    }
}
