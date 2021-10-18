/* eslint-disable prettier/prettier */
import {css, CSSResult, customElement, html, LitElement, state, TemplateResult} from 'lit-element';
import {getLovelace, HomeAssistant, LovelaceCard} from 'custom-card-helpers';
import './youtube-instance.component';
import {YoutubeCardConfig} from '../types';
import {ICON} from '../const';
import {localize} from '../localize/localize';
import {YoutubeInstance} from '../DataTypes/YoutubeInstance';
import {YoutubeControllerService} from '../Services/YoutubeController.service';
import {MediaPlayerServiceBuilder} from '../Services/MediaPlayerServiceBuilder';

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'youtube-card',
    name: 'Youtube Card',
    description: 'It can control youtube.',
});

@customElement('youtube-card')
export class YoutubeCard extends LitElement {
    @state() public config?: YoutubeCardConfig;
    @state() public youtubeInstances: Array<YoutubeInstance>;
    private youtubeControllerService?: YoutubeControllerService;
    private mediaPlayerServiceBuilder?: MediaPlayerServiceBuilder;
    private _hass?: HomeAssistant;

    public constructor() {
        super();
        this.youtubeInstances = [];
    }

    private set hass(hass: HomeAssistant) {
        this._hass = hass;
        this.mediaPlayerServiceBuilder = new MediaPlayerServiceBuilder(hass);
        this.updateState();
    }

    private get hass(): HomeAssistant {
        if (this._hass) {
            return this._hass;
        }
        throw new Error("hass is not set");
    }

    public setConfig(config: any): void {
        if (!this.isConfigValid(config)) {
            throw new Error(localize('common.invalid_configuration'));
        }

        if (config.test_gui) {
            getLovelace().setEditMode(true);
        }

        this.config = config;
        this.youtubeControllerService = new YoutubeControllerService(this.config.youtube_controller_base_url);
    }

    private isConfigValid(config: any): config is YoutubeCardConfig {
        if (config && typeof config === "object" && "entity_prefix" in config && "youtube_controller_base_url" in config && typeof config.entity_prefix === "string" && typeof config.youtube_controller_base_url === "string") {
            return true;
        }
        return false;
    }

    private updateState(): void {
        if (!this.config) return;
        try {
            const entityGroupName = this.config.entity_prefix;
            const entityNames = Object.keys(this.hass.states).filter((entityName) => entityName.startsWith(entityGroupName));
            this.youtubeInstances = entityNames
                .map((entityName) => this.hass.states[entityName])
                .map((state) => ({
                    entityId: state.entity_id,
                    instanceId: state.attributes.instance_id,
                    video: {
                        title: state.attributes.media_title,
                        isPlaying: (state.state === "playing"),
                        duration: state.attributes.media_duration,
                        currentPosition: state.attributes.media_position,
                        videoId: state.attributes.video_id
                    }
                }));
        } catch (error: any) {
            console.error(`Cannot parse entity state which is "${this.hass.states[this.config.entity_prefix].state}" because of ${error.message}`);
        }
    }

    protected render(): TemplateResult | void {
        if (!this._hass) {
            return this.showError('hass not set');
        }
        if (!this.config) {
            return this.showError('config not set');
        }
        if (this.config.show_warning) {
            return this.showWarning(localize('common.show_warning'));
        }

        return html`
            <ha-card id="yp__card" tabindex="0">
                <div style="padding: 10px">
                    <ha-icon style="color: red" .icon=${ICON.YOUTUBE}></ha-icon>
                </div>
                <div style="height: 3px;background-color: red;width:100%;"></div>
                ${this.youtubeInstances.map((youtubeInstance, index) =>
                this.renderYoutubeInstance(youtubeInstance, index),
                )}
            </ha-card>
        `;
    }

    private renderYoutubeInstance(youtubeInstance: YoutubeInstance, index: number): TemplateResult {
        return html`
            <youtube-instance-component .youtubeVideo="${youtubeInstance.video}" .config="${this.config}"
                .mediaPlayerService="${this.mediaPlayerServiceBuilder?.build(youtubeInstance.entityId)}"
                .youtubeControllerService="${this.youtubeControllerService}"
                class="yp__youtube-instance ${index % 2 === 0 ? 'yp__youtube-instance-even' : 'yp__youtube-instance-odd'}">
            </youtube-instance-component>
        `;
    }

    private showWarning(warning: string): TemplateResult {
        return html`
            <hui-warning>${warning}</hui-warning>
        `;
    }

    private showError(error: string): TemplateResult {
        console.error("Rendering Youtube card failed");
        const errorCard = document.createElement('hui-error-card') as LovelaceCard;
        errorCard.setConfig({
            type: 'error',
            error,
            origConfig: this.config,
        });

        return html`
    ${errorCard}
    `;
    }

    public static get styles(): CSSResult {
        return css`
            .yp__card {
            }
            .yp__youtube-instance {

            }
            .yp__youtube-instance-even {
                background-color: white;
            }
            .yp__youtube-instance-odd {
                background-color: red;
            }
        `;
    }
}
