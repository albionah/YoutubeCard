export interface YoutubeVideo {
    title?: string;
    videoId?: string;
    duration?: number;
    currentPosition?: {position: number; timestamp: number};
    isPlaying?: boolean;
}
