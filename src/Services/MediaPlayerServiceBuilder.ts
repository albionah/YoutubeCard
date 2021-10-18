import {HomeAssistant} from 'custom-card-helpers';
import {EntityId} from '../DataTypes/EntityId';
import {MediaPlayerService} from './MediaPlayer.service';

export class MediaPlayerServiceBuilder {
    private readonly hass: HomeAssistant;

    public constructor(hass: HomeAssistant) {
        this.hass = hass;
    }

    public build(entityId: EntityId): MediaPlayerService {
        return new MediaPlayerService(this.hass, entityId);
    }
}
