import {YoutubeInstance} from '../DataTypes/YoutubeInstance';

export class MediaPlayerService {
    private readonly hass: any;
    private readonly youtubeInstance: YoutubeInstance;

    public constructor(hass: any, youtubeInstance: YoutubeInstance) {
        this.hass = hass;
        this.youtubeInstance = youtubeInstance;
    }

    public command(commandName: string, options: object = {}): void {
        console.log(commandName, options);

        this.hass.callService('media_player', commandName, {
            entity_id: this.youtubeInstance.entityId,
            ...options
        });
    }
}
