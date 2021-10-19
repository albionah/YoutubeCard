import {css, html, LitElement} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {YoutubeControllerService} from '../Services/YoutubeController.service';
import {dialogStyles} from './dialog-styles.css';
import {Song} from '../DataTypes/Song';
import '@material/mwc-linear-progress';

@customElement("youtube-video-selector-dialog")
export class YoutubeVideoSelectorDialog extends LitElement {
    @property() public youtubeControllerService?: YoutubeControllerService;
    @state() private isLoading: boolean;
    @state() private songs: Array<Song>;
    @state() private loadingError?: Error;
    @state() private isOpen: boolean;
    private searchQuery: string;
    private dialogResolver?: { resolve: (id: string) => void, reject: (error: Error) => void };

    public constructor() {
        super();
        this.isOpen = false;
        this.isLoading = true;
        this.songs = [];
        this.loadingError = undefined;
        this.searchQuery = "";

    }

    public async selectVideo(query: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.dialogResolver) {
                this.dialogResolver.reject(new Error("The previous dialog was not resolved"));
            }
            this.dialogResolver = { resolve, reject };
            this.loadingError = undefined;
            this.songs = [];
            this.openDialog();
            this.loadData(query);
        });
    }

    public render() {
        return html`
            <mwc-dialog title="Select a video" heading="Vyber video" scrimClickAction="undefined" escapeKeyAction="undefined"
                ?open="${this.isOpen}" @closed="${this.onClosed}">
                <div role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content">
                    <div class="mdc-dialog__content" id="my-dialog-content">
                        <mwc-linear-progress indeterminate ?closed="${!this.isLoading}">
                        </mwc-linear-progress>
                        <div class="loading-error ${this.loadingError ? "" : " hidden"}">
                            <p>
                                An error happened during fetching search results from youtube!
                            </p>
                            <p>
                                ${this.loadingError?.message}
                            </p>
                            <button @click="${() => this.loadData(this.searchQuery)}">Try again</button>
                        </div>
                        <ul class="mdc-list mdc-list--avatar-list">
                            ${this.renderVideoList()}
                        </ul>
                    </div>
                </div>
            </mwc-dialog>
        `
    }

    private renderVideoList() {
        return this.songs.map((song) => this.buildItem(song));
    }

    private buildItem(song: Song) {
        const thumbnail = song.thumbnails.sort((thumbnail1: any, thumbnail2: any) => thumbnail1.width > thumbnail2.width ? 1 : -1)[0]?.url;
        return html`
            <li class="mdc-list-item" tabindex="0" dialogAction="${song.id}">
                <span class="mdc-list-item__graphic">
                    <img src="${thumbnail}" />
                </span>
                <span class="mdc-list-item__text">${song.title}</span>
            </li>
        `;
    }

    private onClosed(event): void {
        if (event.detail.action === "undefined") {
            this.dialogResolver?.reject(new Error("Dialog was canceled"));
        }
        else {
            this.dialogResolver?.resolve(event.detail.action);
        }
        this.dialogResolver = undefined;
        this.isOpen = false;
    }

    private openDialog(): void {
        this.isOpen = true;
    }

    private async loadData(query: string): Promise<void> {
        this.searchQuery = query;
        try {
            this.loadingError = undefined;
            this.isLoading = true;
            const response = await this.youtubeControllerService?.getSearchResults(query);

            this.isLoading = false;

            this.songs = response?.results as Array<Song>;
        } catch (error: any) {
            console.error(`Could not fetch data for the dialog because of ${error.message}`);
            this.isLoading = false;
            this.loadingError = error;
        }
    }

    static get styles() {
        return [css`
            .hidden {
                display: none;
            }
            .loading-error {
                color: red;
            }
            mwc-linear-progress {
                --mdc-theme-primary: red;
            }
        `, dialogStyles];
    }
}
