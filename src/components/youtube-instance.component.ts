import {css, CSSResult, customElement, html, LitElement, property, query, state, TemplateResult} from 'lit-element';
import {ICON} from '../const';
import {YoutubeVideo} from '../DataTypes/YoutubeVideo';
import {YoutubeCardConfig} from '../types';
import './youtube-video-selector-dialog.component';
import './auto-complete-dialog.component';
import './video-progress.component';
import {YoutubeControllerService} from '../Services/YoutubeController.service';
import {MediaPlayerService} from '../Services/MediaPlayer.service';
import {YoutubeVideoSelectorDialog} from './youtube-video-selector-dialog.component';
import {LovelaceCard} from 'custom-card-helpers';

@customElement("youtube-instance-component")
export class YoutubeInstanceComponent extends LitElement {
    private static overflow = true;

    @query("#browse_dialog") public dialog?: YoutubeVideoSelectorDialog;
    @property() public youtubeVideo?: YoutubeVideo;
    @property() public config?: YoutubeCardConfig;
    @property() public youtubeControllerService?: YoutubeControllerService;
    @property() public mediaPlayerService?: MediaPlayerService;
    @state() private searchQuery: string;

    public constructor() {
        super();
        this.searchQuery = "";
    }

    protected render(): TemplateResult {
        if (!this.youtubeVideo) {
            return this.showError("Youtube video not set to component!");
        } else if (!this.config) {
            return this.showError("Config not set to component!");
        }

        return html`
            <youtube-video-selector-dialog
                id="browse_dialog"
                .youtubeControllerService="${this.youtubeControllerService}"
            >
            </youtube-video-selector-dialog>
            <div>
                <div class="media_searching">
                    <auto-complete-dialog .youtubeControllerService="${this.youtubeControllerService}">
                        <input
                            type="text"
                            placeholder="Hledej video"
                            slot="inputContainer"
                            @keypress=${(event) => this.onSearchInputKeyPressed(event)}
                            @change="${(event) => (this.searchQuery = event.target.value)}"
                        />
                    </auto-complete-dialog>
                    <button @click=${() => this.browseVideos()}>Hledej</button>
                </div>
                <div class="media_info">
                    ${this.renderMediaInfo(this.youtubeVideo)}
                </div>
                <div class="media_controls">
                    ${this.renderMediaControls()}
                </div>
                <div style="margin-right: 2px">
                    <video-progress .youtubeVideo="${this.youtubeVideo}"></video-progress>
                </div>
            </div>
        `;
    }

    private renderMediaInfo(youtubeVideo: YoutubeVideo): TemplateResult {
        return html`
            <div
                class="entity__info__media"
                ?short=${this.config?.info === "short"}
                ?short-scroll=${this.config?.info === "scroll"}
                ?scroll=${YoutubeInstanceComponent.overflow}
                style="animation-duration: 1s;"
            >
                <div class="marquee">
                    <span class=${`attr__media_title`}>${youtubeVideo?.title ?? "<<nÃ¡zev neznÃ¡mÃ½>>"}</span>
                </div>
            </div>
        `;
    }

    private renderMediaControls(): TemplateResult {
        return html`
            <div class="flex mmp-media-controls__media">
                <ha-icon-button
                    @click=${event => this.watchPrevious(event)}
                    .icon=${ICON.PREV}
                    .disabled=${!this.youtubeVideo}
                >
                </ha-icon-button>

                ${this.renderPlayOrPauseButton()}

                <ha-icon-button
                    @click=${event => this.watchNext(event)}
                    .icon=${ICON.NEXT}
                    .disabled=${!this.youtubeVideo}
                >
                </ha-icon-button>
            </div>
        `;
    }

    private renderPlayOrPauseButton(): TemplateResult {
        return html`
            <ha-icon-button
                @click=${event => this.playOrPause(event)}
                .icon=${this.youtubeVideo?.isPlaying ? ICON.PAUSE : ICON.PLAY}
                .disabled=${!this.youtubeVideo}
            >
            </ha-icon-button>
        `;
    }

    private watchPrevious(event): void {
        event.stopPropagation();
        this.mediaPlayerService?.watchPrevious();
    }

    private watchNext(event): void {
        event.stopPropagation();
        this.mediaPlayerService?.watchNext();
    }

    private playOrPause(event): void {
        event.stopPropagation();
        if (this.youtubeVideo?.isPlaying === undefined) return;
        if (this.youtubeVideo.isPlaying) this.mediaPlayerService?.pause();
        else this.mediaPlayerService?.play();
    }

    private async onSearchInputKeyPressed(event: KeyboardEvent): Promise<void> {
        if (event.key === "Enter") {
            return this.browseVideos();
        }
    }

    private async browseVideos(): Promise<void> {
        if (this.searchQuery) {
            return this.openDialog();
        }
    }

    private async openDialog(): Promise<void> {
        try {
            const videoId = await this.dialog?.selectVideo(this.searchQuery);
            if (videoId) {
                console.debug(`Commands to play video with id "${videoId}"`);
                this.mediaPlayerService?.watchVideo(videoId);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    private showError(error: string): TemplateResult {
        const errorCard = document.createElement("hui-error-card") as LovelaceCard;
        errorCard.setConfig({
            type: "error",
            error,
            origConfig: this.config,
        });

        return html`
            ${errorCard}
        `;
    }

    public static get styles(): CSSResult {
        return css`
            * {
                box-sizing: border-box;
            }

            .media_info {
                padding: 10px;
            }

            .media_controls {
                padding: 0px 10px;
            }

            .media_searching {
                display: flex;
                padding: 10px 10px 0px 10px;
            }

            auto-complete-dialog {
                width: 100%;
            }

            input {
                border: 1px solid transparent;
                background-color: #f1f1f1;
                padding: 10px;
                font-size: 16px;
                width: 100%;
            }
        `;
    }
}
