import {css, customElement, html, LitElement, property, state, TemplateResult} from 'lit-element';
import {YoutubeVideo} from '../DataTypes/YoutubeVideo';

@customElement('video-progress')
export class VideoProgress extends LitElement {
    @property() public youtubeVideo?: YoutubeVideo;
    @state() public currentPosition: number;
    private refreshingInterval?: NodeJS.Timer;

    public constructor() {
        super();
        this.currentPosition = 0;
    }

    protected render(): TemplateResult {
        console.log("progress", this.youtubeVideo);

        return html`
            <progress max="${(this.youtubeVideo?.duration ?? 1) * 1000}" value="${this.currentPosition}"></progress>
        `;
    }

    public updated(changedProperties: Map<keyof VideoProgress, unknown>): void {
        super.updated(changedProperties);
        if (changedProperties.has('youtubeVideo')) {
            this.recountCurrentPosition();
        }
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        this.stopIncreasingProgress();
    }

    private recountCurrentPosition(): void {
        if (this.youtubeVideo?.isPlaying) {
            this.ensureNoIncreaseIsActive();
            this.startIncreasingProgress();
            this.currentPosition = this.getCurrentPosition() + this.getCurrentPositionOffset();
        }
        else {
            this.stopIncreasingProgress();
            this.currentPosition = this.getCurrentPosition();
        }
    }

    private getCurrentPosition(): number {
        return (this.youtubeVideo?.currentPosition?.position ?? 0) * 1000;
    }

    private getCurrentPositionOffset(): number {
        if (this.youtubeVideo?.currentPosition?.timestamp) {
            const currentTimestamp = new Date().getTime();
            const originalPositionTimeStamp = new Date(this.youtubeVideo?.currentPosition?.timestamp!).getTime();
            return currentTimestamp - originalPositionTimeStamp;
        }
        return 0;
    }

    private startIncreasingProgress(): void {
        this.refreshingInterval = setInterval(() => this.recountCurrentPosition(), 1000);
    }

    private stopIncreasingProgress(): void {
        if (this.refreshingInterval) {
            clearInterval(this.refreshingInterval);
            this.refreshingInterval = undefined;
        }
    }

    private ensureNoIncreaseIsActive(): void {
        this.stopIncreasingProgress();
    }

    static get styles() {
        return css`
            progress {
                                width: 100%;
                                height: 5px;
                                background-color: white;
                        }
                        progress::-webkit-progress-value {
                                background-color: red;
                        }
                        progress::-moz-progress-bar {
                                background-color: red;
                        }
        `;
    }
}

