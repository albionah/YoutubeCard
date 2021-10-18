export interface Song {
    id: string;
    title: string;
    thumbnails: Array<{ width: number, url: string }>;
}