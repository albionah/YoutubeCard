import {Song} from "../DataTypes/Song";

export class YoutubeControllerService {
    public youtubeControllerBaseUrl: string;

    public constructor(youtubeControllerBaseUrl: string) {
        this.youtubeControllerBaseUrl = youtubeControllerBaseUrl;
    }

    public async getAutoCompleteSuggestions(query: string): Promise<Array<string>> {
        return (await this.getJson(`${this.youtubeControllerBaseUrl}/auto-complete-suggestions?query=${query}`)).results;
    }

    public getSearchResults(query: string): Promise<{query: string; results: Array<Song>}> {
        return this.getJson(`${this.youtubeControllerBaseUrl}/search-results?query=${query}`);
    }

    private async getJson<RESPONSE = any>(url: string): Promise<RESPONSE> {
        try {
            return await (await window.fetch(url)).json();
        } catch (error: any) {
            console.error(`Cannot parse response to JSON because of ${error.message}`);
            throw error;
        }
    }
}
