export class YoutubeControllerService {
    private static requestTimeoutInMs = 10000;
    public youtubeControllerBaseUrl?: string;

    public getAutoCompleteSuggestions(query: string): Promise<{ query: string, results: Array<string> }> {
        return this.getJson(`${this.youtubeControllerBaseUrl}/auto-complete-suggestions?query=${query}`);
    }

    public getSearchResults(query: string): Promise<{ query: string, results: Array<{ id: string, title: string }> }> {
        return this.getJson(`${this.youtubeControllerBaseUrl}/search-results?query=${query}`);
    }

    private async getJson<RESPONSE = any>(url: string): Promise<RESPONSE> {
        try {
            return JSON.parse(await this.get(url));
        } catch (error) {
            console.error(`Cannot parse response to JSON because of ${error.message}`);
            throw error;
        }
    }

    private async get(url: string): Promise<string> {
        console.debug(`Requesting "${url}"`);
        return new Promise((resolve, reject) => {
            const xmlHttp = new XMLHttpRequest();
            const timeoutRejection = setTimeout(() => reject(new Error("Request timeout")), YoutubeControllerService.requestTimeoutInMs);
            xmlHttp.onreadystatechange = () => {
                console.debug(`onreadystatechange called for "${url}"`)
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    clearTimeout(timeoutRejection);
                    console.debug(`On url "${url} fetched "${xmlHttp.responseText}"`);
                    resolve(xmlHttp.responseText);
                }
            }
            xmlHttp.open("GET", url, true);
            xmlHttp.send(null);
        });
    }
}