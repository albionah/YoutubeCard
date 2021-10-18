import {YoutubeVideo} from './YoutubeVideo';
import {InstanceId} from './InstanceId';
import {EntityId} from './EntityId';

export interface YoutubeInstance {
    entityId: EntityId;
    instanceId: InstanceId;
    video?: YoutubeVideo;
}
