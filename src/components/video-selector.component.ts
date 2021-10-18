import {css, customElement, html, LitElement, property, query, queryAssignedNodes} from 'lit-element';
import {YoutubeControllerService} from '../utils/YoutubeController.service'
import {MediaPlayerService} from '../utils/MediaPlayer.service';

@customElement('video-selector-dialog')
export class YoutubeSelectorDialog extends LitElement {
    @property() public youtubeControllerService?: YoutubeControllerService;
    @property() public mediaPlayerService?: MediaPlayerService;
    @query('#dialog') public dialog?: any;
    @queryAssignedNodes('songSlot') public songSlot?: NodeListOf<HTMLElement>;
    private songs;

    render() {
        return html`
        <mwc-dialog id="dialog" title="Are you sure ?" @closed=${this.onDialogClose}>
            <div class="mdc-dialog__content" id="my-dialog-content">
                <ul class="mdc-list mdc-list--avatar-list">
                    ${this.renderVideoList()}
                </ul>
            </div>
        </mwc-dialog>
        `
    }

    public renderVideoList() {
        return this.buildContent(this.songs || []);
    }

    buildContent(songs: Array<string>) {
        return songs.map((song) => this.buildItem(song));
    }

    buildItem(song: any) {
        const thumbnail = song.thumbnails.sort((thumbnail1, thumbnail2) => thumbnail1.width > thumbnail2.width)[0]?.url;
        return html`
        <li class="mdc-list-item" tabindex="0" data-mdc-dialog-action="${song.id}" dialogAction="${song.id}">
            <span class="mdc-list-item__graphic">
                <img src="${thumbnail}" />
            </span>
            <span class="mdc-list-item__text">${song.title}</span>
        </li>
        `;
    }

    onDialogClose(e) {
        this.mediaPlayerService?.command("play_media", { media_content_type: "video", media_content_id: e.detail.action });
    }

    open(songs: Array<{ id: string, title: string }>): void {
        console.log("opening");
        console.log(this.songSlot);

        this.songs = songs;
        this.dialog.show();
        this.requestUpdate();
    }

    static get styles() {
        return css`
			.mdc-list {
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:1rem;
 line-height:1.75rem;
 font-weight:400;
 letter-spacing:.009375em;
 text-decoration:inherit;
 text-transform:inherit;
 line-height:1.5rem;
 margin:0;
 padding:8px 0;
 list-style-type:none;
 color:rgba(0,0,0,.87);
 color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))
}
.mdc-list:focus {
 outline:none
}
.mdc-list-item {
 height:48px
}
.mdc-list-item__secondary-text {
 color:rgba(0,0,0,.54);
 color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))
}
.mdc-list-item__graphic {
 background-color:transparent
}
.mdc-list-item__graphic {
 color:rgba(0,0,0,.38);
 color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))
}
.mdc-list-item__meta {
 color:rgba(0,0,0,.38);
 color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))
}
.mdc-list-group__subheader {
 color:rgba(0,0,0,.87);
 color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))
}
.mdc-list-item--disabled .mdc-list-item__text {
 opacity:.38
}
.mdc-list-item--disabled .mdc-list-item__text {
 color:#000;
 color:var(--mdc-theme-on-surface, #000)
}
.mdc-list--dense {
 padding-top:4px;
 padding-bottom:4px;
 font-size:.812rem
}
.mdc-list-item {
 display:flex;
 position:relative;
 align-items:center;
 justify-content:flex-start;
 padding:0 16px;
 overflow:hidden
}
.mdc-list-item:focus {
 outline:none
}
.mdc-list-item--selected,
.mdc-list-item--activated {
 color:#6200ee;
 color:var(--mdc-theme-primary, #6200ee)
}
.mdc-list-item--selected .mdc-list-item__graphic,
.mdc-list-item--activated .mdc-list-item__graphic {
 color:#6200ee;
 color:var(--mdc-theme-primary, #6200ee)
}
.mdc-list-item__graphic {
 margin-left:0;
 margin-right:32px;
 width:24px;
 height:24px;
 flex-shrink:0;
 align-items:center;
 justify-content:center;
 fill:currentColor
}
.mdc-list-item[dir=rtl] .mdc-list-item__graphic,
[dir=rtl] .mdc-list-item .mdc-list-item__graphic {
 margin-left:32px;
 margin-right:0
}
.mdc-list .mdc-list-item__graphic {
 display:inline-flex
}
.mdc-list-item__meta {
 margin-left:auto;
 margin-right:0
}
.mdc-list-item__meta:not(.material-icons) {
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:.75rem;
 line-height:1.25rem;
 font-weight:400;
 letter-spacing:.0333333333em;
 text-decoration:inherit;
 text-transform:inherit
}
.mdc-list-item[dir=rtl] .mdc-list-item__meta,
[dir=rtl] .mdc-list-item .mdc-list-item__meta {
 margin-left:0;
 margin-right:auto
}
.mdc-list-item__text {
 text-overflow:ellipsis;
 white-space:nowrap;
 overflow:hidden
}
.mdc-list-item__text[for] {
 pointer-events:none
}
.mdc-list-item__primary-text {
 text-overflow:ellipsis;
 white-space:nowrap;
 overflow:hidden;
 display:block;
 margin-top:0;
 line-height:normal;
 margin-bottom:-20px;
 display:block
}
.mdc-list-item__primary-text::before {
 display:inline-block;
 width:0;
 height:32px;
 content:"";
 vertical-align:0
}
.mdc-list-item__primary-text::after {
 display:inline-block;
 width:0;
 height:20px;
 content:"";
 vertical-align:-20px
}
.mdc-list--dense .mdc-list-item__primary-text {
 display:block;
 margin-top:0;
 line-height:normal;
 margin-bottom:-20px
}
.mdc-list--dense .mdc-list-item__primary-text::before {
 display:inline-block;
 width:0;
 height:24px;
 content:"";
 vertical-align:0
}
.mdc-list--dense .mdc-list-item__primary-text::after {
 display:inline-block;
 width:0;
 height:20px;
 content:"";
 vertical-align:-20px
}
.mdc-list-item__secondary-text {
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:.875rem;
 line-height:1.25rem;
 font-weight:400;
 letter-spacing:.0178571429em;
 text-decoration:inherit;
 text-transform:inherit;
 text-overflow:ellipsis;
 white-space:nowrap;
 overflow:hidden;
 display:block;
 margin-top:0;
 line-height:normal;
 display:block
}
.mdc-list-item__secondary-text::before {
 display:inline-block;
 width:0;
 height:20px;
 content:"";
 vertical-align:0
}
.mdc-list--dense .mdc-list-item__secondary-text {
 display:block;
 margin-top:0;
 line-height:normal;
 font-size:inherit
}
.mdc-list--dense .mdc-list-item__secondary-text::before {
 display:inline-block;
 width:0;
 height:20px;
 content:"";
 vertical-align:0
}
.mdc-list--dense .mdc-list-item {
 height:40px
}
.mdc-list--dense .mdc-list-item__graphic {
 margin-left:0;
 margin-right:36px;
 width:20px;
 height:20px
}
.mdc-list-item[dir=rtl] .mdc-list--dense .mdc-list-item__graphic,
[dir=rtl] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic {
 margin-left:36px;
 margin-right:0
}
.mdc-list--avatar-list .mdc-list-item {
 height:56px
}
.mdc-list--avatar-list .mdc-list-item__graphic {
 margin-left:0;
 margin-right:16px;
 width:40px;
 height:40px;
 border-radius:50%
}
.mdc-list-item[dir=rtl] .mdc-list--avatar-list .mdc-list-item__graphic,
[dir=rtl] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic {
 margin-left:16px;
 margin-right:0
}
.mdc-list--two-line .mdc-list-item__text {
 align-self:flex-start
}
.mdc-list--two-line .mdc-list-item {
 height:72px
}
.mdc-list--two-line.mdc-list--dense .mdc-list-item,
.mdc-list--avatar-list.mdc-list--dense .mdc-list-item {
 height:60px
}
.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {
 margin-left:0;
 margin-right:20px;
 width:36px;
 height:36px
}
.mdc-list-item[dir=rtl] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,
[dir=rtl] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic {
 margin-left:20px;
 margin-right:0
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item {
 cursor:pointer
}
a.mdc-list-item {
 color:inherit;
 text-decoration:none
}
.mdc-list-divider {
 height:0;
 margin:0;
 border:none;
 border-bottom-width:1px;
 border-bottom-style:solid
}
.mdc-list-divider {
 border-bottom-color:rgba(0,0,0,.12)
}
.mdc-list-divider--padded {
 margin:0 16px
}
.mdc-list-divider--inset {
 margin-left:72px;
 margin-right:0;
 width:calc(100% - 72px)
}
.mdc-list-group[dir=rtl] .mdc-list-divider--inset,
[dir=rtl] .mdc-list-group .mdc-list-divider--inset {
 margin-left:0;
 margin-right:72px
}
.mdc-list-divider--inset.mdc-list-divider--padded {
 width:calc(100% - 72px - 16px)
}
.mdc-list-group .mdc-list {
 padding:0
}
.mdc-list-group__subheader {
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:1rem;
 line-height:1.75rem;
 font-weight:400;
 letter-spacing:.009375em;
 text-decoration:inherit;
 text-transform:inherit;
 margin:.75rem 16px
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item {
 --mdc-ripple-fg-size: 0;
 --mdc-ripple-left: 0;
 --mdc-ripple-top: 0;
 --mdc-ripple-fg-scale: 1;
 --mdc-ripple-fg-translate-end: 0;
 --mdc-ripple-fg-translate-start: 0;
 -webkit-tap-highlight-color:rgba(0,0,0,0);
 will-change:transform,opacity
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item::before,
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item::after {
 position:absolute;
 border-radius:50%;
 opacity:0;
 pointer-events:none;
 content:""
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item::before {
 transition:opacity 15ms linear,background-color 15ms linear;
 z-index:1
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::before {
 transform:scale(var(--mdc-ripple-fg-scale, 1))
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::after {
 top:0;
 left:0;
 transform:scale(0);
 transform-origin:center center
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--unbounded::after {
 top:var(--mdc-ripple-top, 0);
 left:var(--mdc-ripple-left, 0)
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-activation::after {
 animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--foreground-deactivation::after {
 animation:mdc-ripple-fg-opacity-out 150ms;
 transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item::before,
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item::after {
 top:calc(50% - 100%);
 left:calc(50% - 100%);
 width:200%;
 height:200%
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded::after {
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item::before,
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item::after {
 background-color:#000
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:hover::before {
 opacity:.04
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded--background-focused::before,
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):focus::before {
 transition-duration:75ms;
 opacity:.12
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded)::after {
 transition:opacity 150ms linear
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item:not(.mdc-ripple-upgraded):active::after {
 transition-duration:75ms;
 opacity:.12
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated::before {
 opacity:.12
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated::before,
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated::after {
 background-color:#6200ee
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated::before,
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated::after {
 background-color:var(--mdc-theme-primary, #6200ee)
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:hover::before {
 opacity:.16
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded--background-focused::before,
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):focus::before {
 transition-duration:75ms;
 opacity:.24
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded)::after {
 transition:opacity 150ms linear
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated:not(.mdc-ripple-upgraded):active::after {
 transition-duration:75ms;
 opacity:.24
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--activated.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.24
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected::before {
 opacity:.08
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected::before,
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected::after {
 background-color:#6200ee
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected::before,
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected::after {
 background-color:var(--mdc-theme-primary, #6200ee)
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:hover::before {
 opacity:.12
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded--background-focused::before,
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):focus::before {
 transition-duration:75ms;
 opacity:.2
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded)::after {
 transition:opacity 150ms linear
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected:not(.mdc-ripple-upgraded):active::after {
 transition-duration:75ms;
 opacity:.2
}
:not(.mdc-list--non-interactive)>:not(.mdc-list-item--disabled).mdc-list-item--selected.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.2
}
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled {
 --mdc-ripple-fg-size: 0;
 --mdc-ripple-left: 0;
 --mdc-ripple-top: 0;
 --mdc-ripple-fg-scale: 1;
 --mdc-ripple-fg-translate-end: 0;
 --mdc-ripple-fg-translate-start: 0;
 -webkit-tap-highlight-color:rgba(0,0,0,0);
 will-change:transform,opacity
}
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled::before,
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled::after {
 position:absolute;
 border-radius:50%;
 opacity:0;
 pointer-events:none;
 content:""
}
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled::before {
 transition:opacity 15ms linear,background-color 15ms linear;
 z-index:1
}
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded::before {
 transform:scale(var(--mdc-ripple-fg-scale, 1))
}
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded::after {
 top:0;
 left:0;
 transform:scale(0);
 transform-origin:center center
}
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--unbounded::after {
 top:var(--mdc-ripple-top, 0);
 left:var(--mdc-ripple-left, 0)
}
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-activation::after {
 animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards
}
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--foreground-deactivation::after {
 animation:mdc-ripple-fg-opacity-out 150ms;
 transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))
}
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled::before,
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled::after {
 top:calc(50% - 100%);
 left:calc(50% - 100%);
 width:200%;
 height:200%
}
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded::after {
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled::before,
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled::after {
 background-color:#000
}
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled.mdc-ripple-upgraded--background-focused::before,
:not(.mdc-list--non-interactive)>.mdc-list-item--disabled:not(.mdc-ripple-upgraded):focus::before {
 transition-duration:75ms;
 opacity:.12
}
.mdc-button {
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:.875rem;
 line-height:2.25rem;
 font-weight:500;
 letter-spacing:.0892857143em;
 text-decoration:none;
 text-transform:uppercase;
 padding:0 8px 0 8px;
 display:inline-flex;
 position:relative;
 align-items:center;
 justify-content:center;
 box-sizing:border-box;
 min-width:64px;
 border:none;
 outline:none;
 line-height:inherit;
 -webkit-user-select:none;
 -moz-user-select:none;
 -ms-user-select:none;
 user-select:none;
 -webkit-appearance:none;
 overflow:visible;
 vertical-align:middle;
 border-radius:4px
}
.mdc-button::-moz-focus-inner {
 padding:0;
 border:0
}
.mdc-button:active {
 outline:none
}
.mdc-button:hover {
 cursor:pointer
}
.mdc-button:disabled {
 background-color:transparent;
 color:rgba(0,0,0,.37);
 cursor:default;
 pointer-events:none
}
.mdc-button .mdc-button__ripple {
 border-radius:4px
}
.mdc-button:not(:disabled) {
 background-color:transparent
}
.mdc-button .mdc-button__icon {
 margin-left:0;
 margin-right:8px;
 display:inline-block;
 width:18px;
 height:18px;
 font-size:18px;
 vertical-align:top
}
[dir=rtl] .mdc-button .mdc-button__icon,
.mdc-button .mdc-button__icon[dir=rtl] {
 margin-left:8px;
 margin-right:0
}
.mdc-button .mdc-button__touch {
 position:absolute;
 top:50%;
 right:0;
 left:0;
 height:48px;
 transform:translateY(-50%)
}
.mdc-button:not(:disabled) {
 color:#6200ee;
 color:var(--mdc-theme-primary, #6200ee)
}
.mdc-button__label+.mdc-button__icon {
 margin-left:8px;
 margin-right:0
}
[dir=rtl] .mdc-button__label+.mdc-button__icon,
.mdc-button__label+.mdc-button__icon[dir=rtl] {
 margin-left:0;
 margin-right:8px
}
svg.mdc-button__icon {
 fill:currentColor
}
.mdc-button--raised .mdc-button__icon,
.mdc-button--unelevated .mdc-button__icon,
.mdc-button--outlined .mdc-button__icon {
 margin-left:-4px;
 margin-right:8px
}
[dir=rtl] .mdc-button--raised .mdc-button__icon,
.mdc-button--raised .mdc-button__icon[dir=rtl],
[dir=rtl] .mdc-button--unelevated .mdc-button__icon,
.mdc-button--unelevated .mdc-button__icon[dir=rtl],
[dir=rtl] .mdc-button--outlined .mdc-button__icon,
.mdc-button--outlined .mdc-button__icon[dir=rtl] {
 margin-left:8px;
 margin-right:-4px
}
.mdc-button--raised .mdc-button__label+.mdc-button__icon,
.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,
.mdc-button--outlined .mdc-button__label+.mdc-button__icon {
 margin-left:8px;
 margin-right:-4px
}
[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,
.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],
[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,
.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],
[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,
.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl] {
 margin-left:-4px;
 margin-right:8px
}
.mdc-button--raised,
.mdc-button--unelevated {
 padding:0 16px 0 16px
}
.mdc-button--raised:disabled,
.mdc-button--unelevated:disabled {
 background-color:rgba(0,0,0,.12);
 color:rgba(0,0,0,.37)
}
.mdc-button--raised:not(:disabled),
.mdc-button--unelevated:not(:disabled) {
 background-color:#6200ee
}
.mdc-button--raised:not(:disabled),
.mdc-button--unelevated:not(:disabled) {
 background-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-button--raised:not(:disabled),
.mdc-button--unelevated:not(:disabled) {
 color:#fff;
 color:var(--mdc-theme-on-primary, #fff)
}
.mdc-button--raised {
 box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);
 transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)
}
.mdc-button--raised:hover,
.mdc-button--raised:focus {
 box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)
}
.mdc-button--raised:active {
 box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)
}
.mdc-button--raised:disabled {
 box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)
}
.mdc-button--outlined {
 border-style:solid;
 padding:0 15px 0 15px;
 border-width:1px
}
.mdc-button--outlined:disabled {
 border-color:rgba(0,0,0,.37)
}
.mdc-button--outlined .mdc-button__ripple {
 top:-1px;
 left:-1px;
 border:1px solid transparent
}
.mdc-button--outlined:not(:disabled) {
 border-color:#6200ee;
 border-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-button--touch {
 margin-top:6px;
 margin-bottom:6px
}
.mdc-button {
 --mdc-ripple-fg-size: 0;
 --mdc-ripple-left: 0;
 --mdc-ripple-top: 0;
 --mdc-ripple-fg-scale: 1;
 --mdc-ripple-fg-translate-end: 0;
 --mdc-ripple-fg-translate-start: 0;
 -webkit-tap-highlight-color:rgba(0,0,0,0);
 will-change:transform,opacity
}
.mdc-button .mdc-button__ripple::before,
.mdc-button .mdc-button__ripple::after {
 position:absolute;
 border-radius:50%;
 opacity:0;
 pointer-events:none;
 content:""
}
.mdc-button .mdc-button__ripple::before {
 transition:opacity 15ms linear,background-color 15ms linear;
 z-index:1
}
.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::before {
 transform:scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::after {
 top:0;
 left:0;
 transform:scale(0);
 transform-origin:center center
}
.mdc-button.mdc-ripple-upgraded--unbounded .mdc-button__ripple::after {
 top:var(--mdc-ripple-top, 0);
 left:var(--mdc-ripple-left, 0)
}
.mdc-button.mdc-ripple-upgraded--foreground-activation .mdc-button__ripple::after {
 animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards
}
.mdc-button.mdc-ripple-upgraded--foreground-deactivation .mdc-button__ripple::after {
 animation:mdc-ripple-fg-opacity-out 150ms;
 transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-button .mdc-button__ripple::before,
.mdc-button .mdc-button__ripple::after {
 top:calc(50% - 100%);
 left:calc(50% - 100%);
 width:200%;
 height:200%
}
.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::after {
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
.mdc-button .mdc-button__ripple::before,
.mdc-button .mdc-button__ripple::after {
 background-color:#6200ee
}
.mdc-button .mdc-button__ripple::before,
.mdc-button .mdc-button__ripple::after {
 background-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-button:hover .mdc-button__ripple::before {
 opacity:.04
}
.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,
.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before {
 transition-duration:75ms;
 opacity:.12
}
.mdc-button:not(.mdc-ripple-upgraded) .mdc-button__ripple::after {
 transition:opacity 150ms linear
}
.mdc-button:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after {
 transition-duration:75ms;
 opacity:.12
}
.mdc-button.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
.mdc-button .mdc-button__ripple {
 position:absolute;
 width:100%;
 height:100%;
 overflow:hidden
}
.mdc-button:not(.mdc-button--outlined) .mdc-button__ripple {
 top:0;
 left:0
}
.mdc-button--raised .mdc-button__ripple::before,
.mdc-button--raised .mdc-button__ripple::after,
.mdc-button--unelevated .mdc-button__ripple::before,
.mdc-button--unelevated .mdc-button__ripple::after {
 background-color:#fff
}
.mdc-button--raised .mdc-button__ripple::before,
.mdc-button--raised .mdc-button__ripple::after,
.mdc-button--unelevated .mdc-button__ripple::before,
.mdc-button--unelevated .mdc-button__ripple::after {
 background-color:var(--mdc-theme-on-primary, #fff)
}
.mdc-button--raised:hover .mdc-button__ripple::before,
.mdc-button--unelevated:hover .mdc-button__ripple::before {
 opacity:.08
}
.mdc-button--raised.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,
.mdc-button--raised:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before,
.mdc-button--unelevated.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,
.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before {
 transition-duration:75ms;
 opacity:.24
}
.mdc-button--raised:not(.mdc-ripple-upgraded) .mdc-button__ripple::after,
.mdc-button--unelevated:not(.mdc-ripple-upgraded) .mdc-button__ripple::after {
 transition:opacity 150ms linear
}
.mdc-button--raised:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after,
.mdc-button--unelevated:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after {
 transition-duration:75ms;
 opacity:.24
}
.mdc-button--raised.mdc-ripple-upgraded,
.mdc-button--unelevated.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.24
}
.mdc-button {
 height:36px
}
.mdc-button__ripple {
 box-sizing:content-box
}
@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
 0%,
 50% {
  stroke-dashoffset:29.7833385
 }
 50% {
  animation-timing-function:cubic-bezier(0, 0, 0.2, 1)
 }
 100% {
  stroke-dashoffset:0
 }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
 0%,
 68.2% {
  transform:scaleX(0)
 }
 68.2% {
  animation-timing-function:cubic-bezier(0, 0, 0, 1)
 }
 100% {
  transform:scaleX(1)
 }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
 from {
  animation-timing-function:cubic-bezier(0.4, 0, 1, 1);
  opacity:1;
  stroke-dashoffset:0
 }
 to {
  opacity:0;
  stroke-dashoffset:-29.7833385
 }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
 from {
  animation-timing-function:cubic-bezier(0, 0, 0.2, 1);
  transform:rotate(0deg);
  opacity:1
 }
 to {
  transform:rotate(45deg);
  opacity:0
 }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
 from {
  animation-timing-function:cubic-bezier(0.14, 0, 0, 1);
  transform:rotate(45deg);
  opacity:0
 }
 to {
  transform:rotate(360deg);
  opacity:1
 }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
 from {
  animation-timing-function:mdc-animation-deceleration-curve-timing-function;
  transform:rotate(-45deg);
  opacity:0
 }
 to {
  transform:rotate(0deg);
  opacity:1
 }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
 from {
  animation-timing-function:cubic-bezier(0.14, 0, 0, 1);
  transform:rotate(0deg);
  opacity:1
 }
 to {
  transform:rotate(315deg);
  opacity:0
 }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
 0% {
  animation-timing-function:linear;
  transform:scaleX(1);
  opacity:1
 }
 32.8%,
 100% {
  transform:scaleX(0);
  opacity:0
 }
}
.mdc-checkbox {
 display:inline-block;
 position:relative;
 flex:0 0 18px;
 box-sizing:content-box;
 width:18px;
 height:18px;
 line-height:0;
 white-space:nowrap;
 cursor:pointer;
 vertical-align:bottom;
 padding:11px
}
.mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,
.mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before {
 background-color:#018786
}
.mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,
.mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before {
 background-color:var(--mdc-theme-secondary, #018786)
}
.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::before,
.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::after {
 background-color:#018786
}
.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::before,
.mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::after {
 background-color:var(--mdc-theme-secondary, #018786)
}
.mdc-checkbox.mdc-checkbox--selected:hover .mdc-checkbox__ripple::before {
 opacity:.04
}
.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,
.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before {
 transition-duration:75ms;
 opacity:.12
}
.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after {
 transition:opacity 150ms linear
}
.mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after {
 transition-duration:75ms;
 opacity:.12
}
.mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::before,
.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::after {
 background-color:#018786
}
.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::before,
.mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::after {
 background-color:var(--mdc-theme-secondary, #018786)
}
.mdc-checkbox .mdc-checkbox__background {
 left:11px;
 right:initial;
 top:11px
}
.mdc-checkbox[dir=rtl] .mdc-checkbox .mdc-checkbox__background,
[dir=rtl] .mdc-checkbox .mdc-checkbox .mdc-checkbox__background {
 left:initial;
 right:11px
}
.mdc-checkbox .mdc-checkbox__background::before {
 top:-13px;
 left:-13px;
 width:40px;
 height:40px
}
.mdc-checkbox .mdc-checkbox__native-control {
 top:0px;
 right:0px;
 left:0px;
 width:40px;
 height:40px
}
.mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)~.mdc-checkbox__background {
 border-color:rgba(0,0,0,.54);
 background-color:transparent
}
.mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background {
 border-color:#018786;
 border-color:var(--mdc-theme-secondary, #018786);
 background-color:#018786;
 background-color:var(--mdc-theme-secondary, #018786)
}
@keyframes mdc-checkbox-fade-in-background-u613db9 {
 0% {
  border-color:rgba(0,0,0,.54);
  background-color:transparent
 }
 50% {
  border-color:#018786;
  border-color:var(--mdc-theme-secondary, #018786);
  background-color:#018786;
  background-color:var(--mdc-theme-secondary, #018786)
 }
}
@keyframes mdc-checkbox-fade-out-background-u613db9 {
 0%,
 80% {
  border-color:#018786;
  border-color:var(--mdc-theme-secondary, #018786);
  background-color:#018786;
  background-color:var(--mdc-theme-secondary, #018786)
 }
 100% {
  border-color:rgba(0,0,0,.54);
  background-color:transparent
 }
}
.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background {
 animation-name:mdc-checkbox-fade-in-background-u613db9
}
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background {
 animation-name:mdc-checkbox-fade-out-background-u613db9
}
.mdc-checkbox__checkmark {
 color:#fff
}
.mdc-checkbox__mixedmark {
 border-color:#fff
}
.mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate)~.mdc-checkbox__background {
 border-color:rgba(0,0,0,.26)
}
.mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,
.mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background {
 border-color:transparent;
 background-color:rgba(0,0,0,.26)
}
@media screen and (-ms-high-contrast: active) {
 .mdc-checkbox__mixedmark {
  margin:0 1px
 }
}
.mdc-checkbox--disabled {
 cursor:default;
 pointer-events:none
}
.mdc-checkbox__background {
 display:inline-flex;
 position:absolute;
 align-items:center;
 justify-content:center;
 box-sizing:border-box;
 width:18px;
 height:18px;
 border:2px solid currentColor;
 border-radius:2px;
 background-color:transparent;
 pointer-events:none;
 will-change:background-color,border-color;
 transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)
}
.mdc-checkbox__background .mdc-checkbox__background::before {
 background-color:#000
}
.mdc-checkbox__background .mdc-checkbox__background::before {
 background-color:var(--mdc-theme-on-surface, #000)
}
.mdc-checkbox__checkmark {
 position:absolute;
 top:0;
 right:0;
 bottom:0;
 left:0;
 width:100%;
 opacity:0;
 transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)
}
.mdc-checkbox--upgraded .mdc-checkbox__checkmark {
 opacity:1
}
.mdc-checkbox__checkmark-path {
 transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
 stroke:currentColor;
 stroke-width:3.12px;
 stroke-dashoffset:29.7833385;
 stroke-dasharray:29.7833385
}
.mdc-checkbox__mixedmark {
 width:100%;
 height:0;
 transform:scaleX(0) rotate(0deg);
 border-width:1px;
 border-style:solid;
 opacity:0;
 transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)
}
.mdc-checkbox--upgraded .mdc-checkbox__background,
.mdc-checkbox--upgraded .mdc-checkbox__checkmark,
.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,
.mdc-checkbox--upgraded .mdc-checkbox__mixedmark {
 transition:none !important
}
.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
 animation-duration:180ms;
 animation-timing-function:linear
}
.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
 animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;
 transition:none
}
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
 animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;
 transition:none
}
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
 animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;
 transition:none
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
 animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;
 transition:none
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
 animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;
 transition:none
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
 animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;
 transition:none
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
 animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;
 transition:none
}
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
 animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;
 transition:none
}
.mdc-checkbox__native-control:checked~.mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background {
 transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)
}
.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path {
 stroke-dashoffset:0
}
.mdc-checkbox__background::before {
 position:absolute;
 transform:scale(0, 0);
 border-radius:50%;
 opacity:0;
 pointer-events:none;
 content:"";
 will-change:opacity,transform;
 transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)
}
.mdc-checkbox__native-control:focus~.mdc-checkbox__background::before {
 transform:scale(1);
 opacity:.12;
 transition:opacity 80ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 80ms 0ms cubic-bezier(0, 0, 0.2, 1)
}
.mdc-checkbox__native-control {
 position:absolute;
 margin:0;
 padding:0;
 opacity:0;
 cursor:inherit
}
.mdc-checkbox__native-control:disabled {
 cursor:default;
 pointer-events:none
}
.mdc-checkbox--touch {
 margin-top:4px;
 margin-bottom:4px;
 margin-right:4px;
 margin-left:4px
}
.mdc-checkbox--touch .mdc-checkbox__native-control {
 top:-4px;
 right:-4px;
 left:-4px;
 width:48px;
 height:48px
}
.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark {
 transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);
 opacity:1
}
.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark {
 transform:scaleX(1) rotate(-45deg)
}
.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark {
 transform:rotate(45deg);
 opacity:0;
 transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)
}
.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark {
 transform:scaleX(1) rotate(0deg);
 opacity:1
}
.mdc-checkbox {
 --mdc-ripple-fg-size: 0;
 --mdc-ripple-left: 0;
 --mdc-ripple-top: 0;
 --mdc-ripple-fg-scale: 1;
 --mdc-ripple-fg-translate-end: 0;
 --mdc-ripple-fg-translate-start: 0;
 -webkit-tap-highlight-color:rgba(0,0,0,0);
 will-change:transform,opacity
}
.mdc-checkbox .mdc-checkbox__ripple::before,
.mdc-checkbox .mdc-checkbox__ripple::after {
 position:absolute;
 border-radius:50%;
 opacity:0;
 pointer-events:none;
 content:""
}
.mdc-checkbox .mdc-checkbox__ripple::before {
 transition:opacity 15ms linear,background-color 15ms linear;
 z-index:1
}
.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::before {
 transform:scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::after {
 top:0;
 left:0;
 transform:scale(0);
 transform-origin:center center
}
.mdc-checkbox.mdc-ripple-upgraded--unbounded .mdc-checkbox__ripple::after {
 top:var(--mdc-ripple-top, 0);
 left:var(--mdc-ripple-left, 0)
}
.mdc-checkbox.mdc-ripple-upgraded--foreground-activation .mdc-checkbox__ripple::after {
 animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards
}
.mdc-checkbox.mdc-ripple-upgraded--foreground-deactivation .mdc-checkbox__ripple::after {
 animation:mdc-ripple-fg-opacity-out 150ms;
 transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-checkbox .mdc-checkbox__ripple::before,
.mdc-checkbox .mdc-checkbox__ripple::after {
 background-color:#000
}
.mdc-checkbox .mdc-checkbox__ripple::before,
.mdc-checkbox .mdc-checkbox__ripple::after {
 background-color:var(--mdc-theme-on-surface, #000)
}
.mdc-checkbox:hover .mdc-checkbox__ripple::before {
 opacity:.04
}
.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,
.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before {
 transition-duration:75ms;
 opacity:.12
}
.mdc-checkbox:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after {
 transition:opacity 150ms linear
}
.mdc-checkbox:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after {
 transition-duration:75ms;
 opacity:.12
}
.mdc-checkbox.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
.mdc-checkbox .mdc-checkbox__ripple::before,
.mdc-checkbox .mdc-checkbox__ripple::after {
 top:calc(50% - 50%);
 left:calc(50% - 50%);
 width:100%;
 height:100%
}
.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::before,
.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::after {
 top:var(--mdc-ripple-top, calc(50% - 50%));
 left:var(--mdc-ripple-left, calc(50% - 50%));
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
.mdc-checkbox.mdc-ripple-upgraded .mdc-checkbox__ripple::after {
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
.mdc-checkbox__ripple {
 position:absolute;
 top:0;
 left:0;
 width:100%;
 height:100%;
 pointer-events:none
}
.mdc-ripple-upgraded--background-focused .mdc-checkbox__background::before {
 content:none
}
.mdc-form-field {
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:.875rem;
 line-height:1.25rem;
 font-weight:400;
 letter-spacing:.0178571429em;
 text-decoration:inherit;
 text-transform:inherit;
 color:rgba(0,0,0,.87);
 color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));
 display:inline-flex;
 align-items:center;
 vertical-align:middle
}
.mdc-form-field>label {
 order:0;
 margin-right:auto;
 padding-left:4px
}
[dir=rtl] .mdc-form-field>label,
.mdc-form-field[dir=rtl]>label {
 margin-left:auto;
 padding-right:4px
}
.mdc-form-field--align-end>label {
 order:-1;
 margin-left:auto;
 padding-right:4px
}
[dir=rtl] .mdc-form-field--align-end>label,
.mdc-form-field--align-end[dir=rtl]>label {
 margin-right:auto;
 padding-left:4px
}
.mdc-button {
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:.875rem;
 line-height:2.25rem;
 font-weight:500;
 letter-spacing:.0892857143em;
 text-decoration:none;
 text-transform:uppercase;
 padding:0 8px 0 8px;
 display:inline-flex;
 position:relative;
 align-items:center;
 justify-content:center;
 box-sizing:border-box;
 min-width:64px;
 border:none;
 outline:none;
 line-height:inherit;
 -webkit-user-select:none;
 -moz-user-select:none;
 -ms-user-select:none;
 user-select:none;
 -webkit-appearance:none;
 overflow:visible;
 vertical-align:middle;
 border-radius:4px
}
.mdc-button::-moz-focus-inner {
 padding:0;
 border:0
}
.mdc-button:active {
 outline:none
}
.mdc-button:hover {
 cursor:pointer
}
.mdc-button:disabled {
 background-color:transparent;
 color:rgba(0,0,0,.37);
 cursor:default;
 pointer-events:none
}
.mdc-button .mdc-button__ripple {
 border-radius:4px
}
.mdc-button:not(:disabled) {
 background-color:transparent
}
.mdc-button .mdc-button__icon {
 margin-left:0;
 margin-right:8px;
 display:inline-block;
 width:18px;
 height:18px;
 font-size:18px;
 vertical-align:top
}
[dir=rtl] .mdc-button .mdc-button__icon,
.mdc-button .mdc-button__icon[dir=rtl] {
 margin-left:8px;
 margin-right:0
}
.mdc-button .mdc-button__touch {
 position:absolute;
 top:50%;
 right:0;
 left:0;
 height:48px;
 transform:translateY(-50%)
}
.mdc-button:not(:disabled) {
 color:#6200ee;
 color:var(--mdc-theme-primary, #6200ee)
}
.mdc-button__label+.mdc-button__icon {
 margin-left:8px;
 margin-right:0
}
[dir=rtl] .mdc-button__label+.mdc-button__icon,
.mdc-button__label+.mdc-button__icon[dir=rtl] {
 margin-left:0;
 margin-right:8px
}
svg.mdc-button__icon {
 fill:currentColor
}
.mdc-button--raised .mdc-button__icon,
.mdc-button--unelevated .mdc-button__icon,
.mdc-button--outlined .mdc-button__icon {
 margin-left:-4px;
 margin-right:8px
}
[dir=rtl] .mdc-button--raised .mdc-button__icon,
.mdc-button--raised .mdc-button__icon[dir=rtl],
[dir=rtl] .mdc-button--unelevated .mdc-button__icon,
.mdc-button--unelevated .mdc-button__icon[dir=rtl],
[dir=rtl] .mdc-button--outlined .mdc-button__icon,
.mdc-button--outlined .mdc-button__icon[dir=rtl] {
 margin-left:8px;
 margin-right:-4px
}
.mdc-button--raised .mdc-button__label+.mdc-button__icon,
.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,
.mdc-button--outlined .mdc-button__label+.mdc-button__icon {
 margin-left:8px;
 margin-right:-4px
}
[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,
.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],
[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon,
.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],
[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,
.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl] {
 margin-left:-4px;
 margin-right:8px
}
.mdc-button--raised,
.mdc-button--unelevated {
 padding:0 16px 0 16px
}
.mdc-button--raised:disabled,
.mdc-button--unelevated:disabled {
 background-color:rgba(0,0,0,.12);
 color:rgba(0,0,0,.37)
}
.mdc-button--raised:not(:disabled),
.mdc-button--unelevated:not(:disabled) {
 background-color:#6200ee
}
.mdc-button--raised:not(:disabled),
.mdc-button--unelevated:not(:disabled) {
 background-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-button--raised:not(:disabled),
.mdc-button--unelevated:not(:disabled) {
 color:#fff;
 color:var(--mdc-theme-on-primary, #fff)
}
.mdc-button--raised {
 box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);
 transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)
}
.mdc-button--raised:hover,
.mdc-button--raised:focus {
 box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12)
}
.mdc-button--raised:active {
 box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12)
}
.mdc-button--raised:disabled {
 box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2),0px 0px 0px 0px rgba(0, 0, 0, 0.14),0px 0px 0px 0px rgba(0,0,0,.12)
}
.mdc-button--outlined {
 border-style:solid;
 padding:0 15px 0 15px;
 border-width:1px
}
.mdc-button--outlined:disabled {
 border-color:rgba(0,0,0,.37)
}
.mdc-button--outlined .mdc-button__ripple {
 top:-1px;
 left:-1px;
 border:1px solid transparent
}
.mdc-button--outlined:not(:disabled) {
 border-color:#6200ee;
 border-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-button--touch {
 margin-top:6px;
 margin-bottom:6px
}
.mdc-button {
 --mdc-ripple-fg-size: 0;
 --mdc-ripple-left: 0;
 --mdc-ripple-top: 0;
 --mdc-ripple-fg-scale: 1;
 --mdc-ripple-fg-translate-end: 0;
 --mdc-ripple-fg-translate-start: 0;
 -webkit-tap-highlight-color:rgba(0,0,0,0);
 will-change:transform,opacity
}
.mdc-button .mdc-button__ripple::before,
.mdc-button .mdc-button__ripple::after {
 position:absolute;
 border-radius:50%;
 opacity:0;
 pointer-events:none;
 content:""
}
.mdc-button .mdc-button__ripple::before {
 transition:opacity 15ms linear,background-color 15ms linear;
 z-index:1
}
.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::before {
 transform:scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::after {
 top:0;
 left:0;
 transform:scale(0);
 transform-origin:center center
}
.mdc-button.mdc-ripple-upgraded--unbounded .mdc-button__ripple::after {
 top:var(--mdc-ripple-top, 0);
 left:var(--mdc-ripple-left, 0)
}
.mdc-button.mdc-ripple-upgraded--foreground-activation .mdc-button__ripple::after {
 animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards
}
.mdc-button.mdc-ripple-upgraded--foreground-deactivation .mdc-button__ripple::after {
 animation:mdc-ripple-fg-opacity-out 150ms;
 transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-button .mdc-button__ripple::before,
.mdc-button .mdc-button__ripple::after {
 top:calc(50% - 100%);
 left:calc(50% - 100%);
 width:200%;
 height:200%
}
.mdc-button.mdc-ripple-upgraded .mdc-button__ripple::after {
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
.mdc-button .mdc-button__ripple::before,
.mdc-button .mdc-button__ripple::after {
 background-color:#6200ee
}
.mdc-button .mdc-button__ripple::before,
.mdc-button .mdc-button__ripple::after {
 background-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-button:hover .mdc-button__ripple::before {
 opacity:.04
}
.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,
.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before {
 transition-duration:75ms;
 opacity:.12
}
.mdc-button:not(.mdc-ripple-upgraded) .mdc-button__ripple::after {
 transition:opacity 150ms linear
}
.mdc-button:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after {
 transition-duration:75ms;
 opacity:.12
}
.mdc-button.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
.mdc-button .mdc-button__ripple {
 position:absolute;
 width:100%;
 height:100%;
 overflow:hidden
}
.mdc-button:not(.mdc-button--outlined) .mdc-button__ripple {
 top:0;
 left:0
}
.mdc-button--raised .mdc-button__ripple::before,
.mdc-button--raised .mdc-button__ripple::after,
.mdc-button--unelevated .mdc-button__ripple::before,
.mdc-button--unelevated .mdc-button__ripple::after {
 background-color:#fff
}
.mdc-button--raised .mdc-button__ripple::before,
.mdc-button--raised .mdc-button__ripple::after,
.mdc-button--unelevated .mdc-button__ripple::before,
.mdc-button--unelevated .mdc-button__ripple::after {
 background-color:var(--mdc-theme-on-primary, #fff)
}
.mdc-button--raised:hover .mdc-button__ripple::before,
.mdc-button--unelevated:hover .mdc-button__ripple::before {
 opacity:.08
}
.mdc-button--raised.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,
.mdc-button--raised:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before,
.mdc-button--unelevated.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,
.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before {
 transition-duration:75ms;
 opacity:.24
}
.mdc-button--raised:not(.mdc-ripple-upgraded) .mdc-button__ripple::after,
.mdc-button--unelevated:not(.mdc-ripple-upgraded) .mdc-button__ripple::after {
 transition:opacity 150ms linear
}
.mdc-button--raised:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after,
.mdc-button--unelevated:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after {
 transition-duration:75ms;
 opacity:.24
}
.mdc-button--raised.mdc-ripple-upgraded,
.mdc-button--unelevated.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.24
}
.mdc-button {
 height:36px
}
.mdc-dialog,
.mdc-dialog__scrim {
 position:fixed;
 top:0;
 left:0;
 align-items:center;
 justify-content:center;
 box-sizing:border-box;
 width:100%;
 height:100%
}
.mdc-dialog {
 display:none;
 z-index:7
}
.mdc-dialog .mdc-dialog__surface {
 background-color:#fff;
 background-color:var(--mdc-theme-surface, #fff)
}
.mdc-dialog .mdc-dialog__scrim {
 background-color:rgba(0,0,0,.32)
}
.mdc-dialog .mdc-dialog__title {
 color:rgba(0,0,0,.87)
}
.mdc-dialog .mdc-dialog__content {
 color:rgba(0,0,0,.6)
}
.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__title,
.mdc-dialog.mdc-dialog--scrollable .mdc-dialog__actions {
 border-color:rgba(0,0,0,.12)
}
.mdc-dialog .mdc-dialog__surface {
 min-width:280px
}
@media(max-width: 592px) {
 .mdc-dialog .mdc-dialog__surface {
  max-width:calc(100vw - 32px)
 }
}
@media(min-width: 592px) {
 .mdc-dialog .mdc-dialog__surface {
  max-width:560px
 }
}
.mdc-dialog .mdc-dialog__surface {
 max-height:calc(100% - 32px)
}
.mdc-dialog .mdc-dialog__surface {
 border-radius:4px
}
.mdc-dialog__scrim {
 opacity:0;
 z-index:-1
}
.mdc-dialog__container {
 display:flex;
 flex-direction:row;
 align-items:center;
 justify-content:space-around;
 box-sizing:border-box;
 height:100%;
 transform:scale(0.8);
 opacity:0;
 pointer-events:none
}
.mdc-dialog__surface {
 box-shadow:0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0,0,0,.12);
 display:flex;
 flex-direction:column;
 flex-grow:0;
 flex-shrink:0;
 box-sizing:border-box;
 max-width:100%;
 max-height:100%;
 pointer-events:auto;
 overflow-y:auto
}
.mdc-dialog[dir=rtl] .mdc-dialog__surface,
[dir=rtl] .mdc-dialog .mdc-dialog__surface {
 text-align:right
}
.mdc-dialog__title {
 display:block;
 margin-top:0;
 line-height:normal;
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:1.25rem;
 line-height:2rem;
 font-weight:500;
 letter-spacing:.0125em;
 text-decoration:inherit;
 text-transform:inherit;
 display:block;
 position:relative;
 flex-shrink:0;
 box-sizing:border-box;
 margin:0;
 padding:0 24px 9px;
 border-bottom:1px solid transparent
}
.mdc-dialog__title::before {
 display:inline-block;
 width:0;
 height:40px;
 content:"";
 vertical-align:0
}
.mdc-dialog[dir=rtl] .mdc-dialog__title,
[dir=rtl] .mdc-dialog .mdc-dialog__title {
 text-align:right
}
.mdc-dialog--scrollable .mdc-dialog__title {
 padding-bottom:15px
}
.mdc-dialog__content {
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:1rem;
 line-height:1.5rem;
 font-weight:400;
 letter-spacing:.03125em;
 text-decoration:inherit;
 text-transform:inherit;
 flex-grow:1;
 box-sizing:border-box;
 margin:0;
 padding:20px 24px;
 overflow:auto;
 -webkit-overflow-scrolling:touch
}
.mdc-dialog__content>:first-child {
 margin-top:0
}
.mdc-dialog__content>:last-child {
 margin-bottom:0
}
.mdc-dialog__title+.mdc-dialog__content {
 padding-top:0
}
.mdc-dialog--scrollable .mdc-dialog__content {
 padding-top:8px;
 padding-bottom:8px
}
.mdc-dialog__content .mdc-list:first-child:last-child {
 padding:6px 0 0
}
.mdc-dialog--scrollable .mdc-dialog__content .mdc-list:first-child:last-child {
 padding:0
}
.mdc-dialog__actions {
 display:flex;
 position:relative;
 flex-shrink:0;
 flex-wrap:wrap;
 align-items:center;
 justify-content:flex-end;
 box-sizing:border-box;
 min-height:52px;
 margin:0;
 padding:8px;
 border-top:1px solid transparent
}
.mdc-dialog--stacked .mdc-dialog__actions {
 flex-direction:column;
 align-items:flex-end
}
.mdc-dialog__button {
 margin-left:8px;
 margin-right:0;
 max-width:100%;
 text-align:right
}
[dir=rtl] .mdc-dialog__button,
.mdc-dialog__button[dir=rtl] {
 margin-left:0;
 margin-right:8px
}
.mdc-dialog__button:first-child {
 margin-left:0;
 margin-right:0
}
[dir=rtl] .mdc-dialog__button:first-child,
.mdc-dialog__button:first-child[dir=rtl] {
 margin-left:0;
 margin-right:0
}
.mdc-dialog[dir=rtl] .mdc-dialog__button,
[dir=rtl] .mdc-dialog .mdc-dialog__button {
 text-align:left
}
.mdc-dialog--stacked .mdc-dialog__button:not(:first-child) {
 margin-top:12px
}
.mdc-dialog--open,
.mdc-dialog--opening,
.mdc-dialog--closing {
 display:flex
}
.mdc-dialog--opening .mdc-dialog__scrim {
 transition:opacity 150ms linear
}
.mdc-dialog--opening .mdc-dialog__container {
 transition:opacity 75ms linear,transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1)
}
.mdc-dialog--closing .mdc-dialog__scrim,
.mdc-dialog--closing .mdc-dialog__container {
 transition:opacity 75ms linear
}
.mdc-dialog--closing .mdc-dialog__container {
 transform:scale(1)
}
.mdc-dialog--open .mdc-dialog__scrim {
 opacity:1
}
.mdc-dialog--open .mdc-dialog__container {
 transform:scale(1);
 opacity:1
}
.mdc-dialog-scroll-lock {
 overflow:hidden
}
.mdc-form-field {
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:.875rem;
 line-height:1.25rem;
 font-weight:400;
 letter-spacing:.0178571429em;
 text-decoration:inherit;
 text-transform:inherit;
 color:rgba(0,0,0,.87);
 color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));
 display:inline-flex;
 align-items:center;
 vertical-align:middle
}
.mdc-form-field>label {
 order:0;
 margin-right:auto;
 padding-left:4px
}
[dir=rtl] .mdc-form-field>label,
.mdc-form-field[dir=rtl]>label {
 margin-left:auto;
 padding-right:4px
}
.mdc-form-field--align-end>label {
 order:-1;
 margin-left:auto;
 padding-right:4px
}
[dir=rtl] .mdc-form-field--align-end>label,
.mdc-form-field--align-end[dir=rtl]>label {
 margin-right:auto;
 padding-left:4px
}
.mdc-radio__native-control {
 top:0px;
 right:0px;
 left:0px;
 width:40px;
 height:40px
}
.mdc-radio {
 display:inline-block;
 position:relative;
 flex:0 0 auto;
 box-sizing:border-box;
 width:40px;
 height:40px;
 padding:10px;
 cursor:pointer;
 will-change:opacity,transform,border-color,color
}
.mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle {
 border-color:rgba(0,0,0,.54)
}
.mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle {
 border-color:#6200ee;
 border-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle {
 border-color:#6200ee;
 border-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-radio .mdc-radio__background::before {
 background-color:#6200ee
}
.mdc-radio .mdc-radio__background::before {
 background-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-radio__background {
 display:inline-block;
 position:absolute;
 left:10px;
 box-sizing:border-box;
 width:50%;
 height:50%
}
.mdc-radio__background::before {
 position:absolute;
 top:0;
 left:0;
 width:100%;
 height:100%;
 transform:scale(0, 0);
 border-radius:50%;
 opacity:0;
 pointer-events:none;
 content:"";
 transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)
}
.mdc-radio__outer-circle {
 position:absolute;
 top:0;
 left:0;
 box-sizing:border-box;
 width:100%;
 height:100%;
 border-width:2px;
 border-style:solid;
 border-radius:50%;
 transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)
}
.mdc-radio__inner-circle {
 position:absolute;
 top:0;
 left:0;
 box-sizing:border-box;
 width:100%;
 height:100%;
 transform:scale(0, 0);
 border-width:10px;
 border-style:solid;
 border-radius:50%;
 transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)
}
.mdc-radio__native-control {
 position:absolute;
 width:100%;
 height:100%;
 margin:0;
 padding:0;
 opacity:0;
 cursor:inherit;
 z-index:1
}
.mdc-radio--touch {
 margin-top:4px;
 margin-bottom:4px;
 margin-right:4px;
 margin-left:4px
}
.mdc-radio--touch .mdc-radio__native-control {
 top:-4px;
 right:-4px;
 left:-4px;
 width:48px;
 height:48px
}
.mdc-radio__native-control:checked+.mdc-radio__background,
.mdc-radio__native-control:disabled+.mdc-radio__background {
 transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)
}
.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,
.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle {
 transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)
}
.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,
.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle {
 transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)
}
.mdc-radio--disabled {
 cursor:default;
 pointer-events:none
}
.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle {
 transform:scale(0.5);
 transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)
}
.mdc-radio__native-control:disabled+.mdc-radio__background,
[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background {
 cursor:default
}
.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle,
[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__outer-circle {
 border-color:rgba(0,0,0,.26)
}
.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle,
[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle {
 border-color:rgba(0,0,0,.26)
}
.mdc-radio__native-control:focus+.mdc-radio__background::before {
 transform:scale(2, 2);
 opacity:.12;
 transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)
}
.mdc-radio {
 --mdc-ripple-fg-size: 0;
 --mdc-ripple-left: 0;
 --mdc-ripple-top: 0;
 --mdc-ripple-fg-scale: 1;
 --mdc-ripple-fg-translate-end: 0;
 --mdc-ripple-fg-translate-start: 0;
 -webkit-tap-highlight-color:rgba(0,0,0,0);
 will-change:transform,opacity
}
.mdc-radio .mdc-radio__ripple::before,
.mdc-radio .mdc-radio__ripple::after {
 position:absolute;
 border-radius:50%;
 opacity:0;
 pointer-events:none;
 content:""
}
.mdc-radio .mdc-radio__ripple::before {
 transition:opacity 15ms linear,background-color 15ms linear;
 z-index:1
}
.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::before {
 transform:scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::after {
 top:0;
 left:0;
 transform:scale(0);
 transform-origin:center center
}
.mdc-radio.mdc-ripple-upgraded--unbounded .mdc-radio__ripple::after {
 top:var(--mdc-ripple-top, 0);
 left:var(--mdc-ripple-left, 0)
}
.mdc-radio.mdc-ripple-upgraded--foreground-activation .mdc-radio__ripple::after {
 animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards
}
.mdc-radio.mdc-ripple-upgraded--foreground-deactivation .mdc-radio__ripple::after {
 animation:mdc-ripple-fg-opacity-out 150ms;
 transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-radio .mdc-radio__ripple::before,
.mdc-radio .mdc-radio__ripple::after {
 top:calc(50% - 50%);
 left:calc(50% - 50%);
 width:100%;
 height:100%
}
.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::before,
.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::after {
 top:var(--mdc-ripple-top, calc(50% - 50%));
 left:var(--mdc-ripple-left, calc(50% - 50%));
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
.mdc-radio.mdc-ripple-upgraded .mdc-radio__ripple::after {
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
.mdc-radio .mdc-radio__ripple::before,
.mdc-radio .mdc-radio__ripple::after {
 background-color:#6200ee
}
.mdc-radio .mdc-radio__ripple::before,
.mdc-radio .mdc-radio__ripple::after {
 background-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-radio:hover .mdc-radio__ripple::before {
 opacity:.04
}
.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__ripple::before,
.mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__ripple::before {
 transition-duration:75ms;
 opacity:.12
}
.mdc-radio:not(.mdc-ripple-upgraded) .mdc-radio__ripple::after {
 transition:opacity 150ms linear
}
.mdc-radio:not(.mdc-ripple-upgraded):active .mdc-radio__ripple::after {
 transition-duration:75ms;
 opacity:.12
}
.mdc-radio.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
.mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__background::before {
 content:none
}
.mdc-radio__ripple {
 position:absolute;
 top:0;
 left:0;
 width:100%;
 height:100%;
 pointer-events:none
}
@keyframes mdc-ripple-fg-radius-in {
 from {
  animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);
  transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)
 }
 to {
  transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))
 }
}
@keyframes mdc-ripple-fg-opacity-in {
 from {
  animation-timing-function:linear;
  opacity:0
 }
 to {
  opacity:var(--mdc-ripple-fg-opacity, 0)
 }
}
@keyframes mdc-ripple-fg-opacity-out {
 from {
  animation-timing-function:linear;
  opacity:var(--mdc-ripple-fg-opacity, 0)
 }
 to {
  opacity:0
 }
}
.mdc-ripple-surface--test-edge-var-bug {
 --mdc-ripple-surface-test-edge-var: 1px solid #000;
 visibility:hidden
}
.mdc-ripple-surface--test-edge-var-bug::before {
 border:var(--mdc-ripple-surface-test-edge-var)
}
.mdc-ripple-surface {
 --mdc-ripple-fg-size: 0;
 --mdc-ripple-left: 0;
 --mdc-ripple-top: 0;
 --mdc-ripple-fg-scale: 1;
 --mdc-ripple-fg-translate-end: 0;
 --mdc-ripple-fg-translate-start: 0;
 -webkit-tap-highlight-color:rgba(0,0,0,0);
 will-change:transform,opacity;
 position:relative;
 outline:none;
 overflow:hidden
}
.mdc-ripple-surface::before,
.mdc-ripple-surface::after {
 position:absolute;
 border-radius:50%;
 opacity:0;
 pointer-events:none;
 content:""
}
.mdc-ripple-surface::before {
 transition:opacity 15ms linear,background-color 15ms linear;
 z-index:1
}
.mdc-ripple-surface.mdc-ripple-upgraded::before {
 transform:scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-ripple-surface.mdc-ripple-upgraded::after {
 top:0;
 left:0;
 transform:scale(0);
 transform-origin:center center
}
.mdc-ripple-surface.mdc-ripple-upgraded--unbounded::after {
 top:var(--mdc-ripple-top, 0);
 left:var(--mdc-ripple-left, 0)
}
.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation::after {
 animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards
}
.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation::after {
 animation:mdc-ripple-fg-opacity-out 150ms;
 transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-ripple-surface::before,
.mdc-ripple-surface::after {
 background-color:#000
}
.mdc-ripple-surface:hover::before {
 opacity:.04
}
.mdc-ripple-surface.mdc-ripple-upgraded--background-focused::before,
.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus::before {
 transition-duration:75ms;
 opacity:.12
}
.mdc-ripple-surface:not(.mdc-ripple-upgraded)::after {
 transition:opacity 150ms linear
}
.mdc-ripple-surface:not(.mdc-ripple-upgraded):active::after {
 transition-duration:75ms;
 opacity:.12
}
.mdc-ripple-surface.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
.mdc-ripple-surface::before,
.mdc-ripple-surface::after {
 top:calc(50% - 100%);
 left:calc(50% - 100%);
 width:200%;
 height:200%
}
.mdc-ripple-surface.mdc-ripple-upgraded::after {
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
.mdc-ripple-surface[data-mdc-ripple-is-unbounded] {
 overflow:visible
}
.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::before,
.mdc-ripple-surface[data-mdc-ripple-is-unbounded]::after {
 top:calc(50% - 50%);
 left:calc(50% - 50%);
 width:100%;
 height:100%
}
.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::before,
.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after {
 top:var(--mdc-ripple-top, calc(50% - 50%));
 left:var(--mdc-ripple-left, calc(50% - 50%));
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded::after {
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
.mdc-ripple-surface--primary::before,
.mdc-ripple-surface--primary::after {
 background-color:#6200ee
}
.mdc-ripple-surface--primary::before,
.mdc-ripple-surface--primary::after {
 background-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-ripple-surface--primary:hover::before {
 opacity:.04
}
.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused::before,
.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus::before {
 transition-duration:75ms;
 opacity:.12
}
.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded)::after {
 transition:opacity 150ms linear
}
.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active::after {
 transition-duration:75ms;
 opacity:.12
}
.mdc-ripple-surface--primary.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
.mdc-ripple-surface--accent::before,
.mdc-ripple-surface--accent::after {
 background-color:#018786
}
.mdc-ripple-surface--accent::before,
.mdc-ripple-surface--accent::after {
 background-color:var(--mdc-theme-secondary, #018786)
}
.mdc-ripple-surface--accent:hover::before {
 opacity:.04
}
.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused::before,
.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus::before {
 transition-duration:75ms;
 opacity:.12
}
.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded)::after {
 transition:opacity 150ms linear
}
.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active::after {
 transition-duration:75ms;
 opacity:.12
}
.mdc-ripple-surface--accent.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
.mdc-icon-button {
 width:48px;
 height:48px;
 padding:12px;
 font-size:24px;
 display:inline-block;
 position:relative;
 box-sizing:border-box;
 border:none;
 outline:none;
 background-color:transparent;
 fill:currentColor;
 color:inherit;
 text-decoration:none;
 cursor:pointer;
 -webkit-user-select:none;
 -moz-user-select:none;
 -ms-user-select:none;
 user-select:none
}
.mdc-icon-button svg,
.mdc-icon-button img {
 width:24px;
 height:24px
}
.mdc-icon-button:disabled {
 color:rgba(0,0,0,.38);
 color:var(--mdc-theme-text-disabled-on-light, rgba(0, 0, 0, 0.38));
 cursor:default;
 pointer-events:none
}
.mdc-icon-button__icon {
 display:inline-block
}
.mdc-icon-button__icon.mdc-icon-button__icon--on {
 display:none
}
.mdc-icon-button--on .mdc-icon-button__icon {
 display:none
}
.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on {
 display:inline-block
}
.mdc-icon-button {
 --mdc-ripple-fg-size: 0;
 --mdc-ripple-left: 0;
 --mdc-ripple-top: 0;
 --mdc-ripple-fg-scale: 1;
 --mdc-ripple-fg-translate-end: 0;
 --mdc-ripple-fg-translate-start: 0;
 -webkit-tap-highlight-color:rgba(0,0,0,0);
 will-change:transform,opacity
}
.mdc-icon-button::before,
.mdc-icon-button::after {
 position:absolute;
 border-radius:50%;
 opacity:0;
 pointer-events:none;
 content:""
}
.mdc-icon-button::before {
 transition:opacity 15ms linear,background-color 15ms linear;
 z-index:1
}
.mdc-icon-button.mdc-ripple-upgraded::before {
 transform:scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-icon-button.mdc-ripple-upgraded::after {
 top:0;
 left:0;
 transform:scale(0);
 transform-origin:center center
}
.mdc-icon-button.mdc-ripple-upgraded--unbounded::after {
 top:var(--mdc-ripple-top, 0);
 left:var(--mdc-ripple-left, 0)
}
.mdc-icon-button.mdc-ripple-upgraded--foreground-activation::after {
 animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards
}
.mdc-icon-button.mdc-ripple-upgraded--foreground-deactivation::after {
 animation:mdc-ripple-fg-opacity-out 150ms;
 transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-icon-button::before,
.mdc-icon-button::after {
 top:calc(50% - 50%);
 left:calc(50% - 50%);
 width:100%;
 height:100%
}
.mdc-icon-button.mdc-ripple-upgraded::before,
.mdc-icon-button.mdc-ripple-upgraded::after {
 top:var(--mdc-ripple-top, calc(50% - 50%));
 left:var(--mdc-ripple-left, calc(50% - 50%));
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
.mdc-icon-button.mdc-ripple-upgraded::after {
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
.mdc-icon-button::before,
.mdc-icon-button::after {
 background-color:#000
}
.mdc-icon-button:hover::before {
 opacity:.04
}
.mdc-icon-button.mdc-ripple-upgraded--background-focused::before,
.mdc-icon-button:not(.mdc-ripple-upgraded):focus::before {
 transition-duration:75ms;
 opacity:.12
}
.mdc-icon-button:not(.mdc-ripple-upgraded)::after {
 transition:opacity 150ms linear
}
.mdc-icon-button:not(.mdc-ripple-upgraded):active::after {
 transition-duration:75ms;
 opacity:.12
}
.mdc-icon-button.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
.mdc-tab-bar {
 width:100%
}
.mdc-tab {
 height:48px
}
.mdc-tab--stacked {
 height:72px
}
.mdc-tab-scroller {
 overflow-y:hidden
}
.mdc-tab-scroller__test {
 position:absolute;
 top:-9999px;
 width:100px;
 height:100px;
 overflow-x:scroll
}
.mdc-tab-scroller__scroll-area {
 -webkit-overflow-scrolling:touch;
 display:flex;
 overflow-x:hidden
}
.mdc-tab-scroller__scroll-area::-webkit-scrollbar,
.mdc-tab-scroller__test::-webkit-scrollbar {
 display:none
}
.mdc-tab-scroller__scroll-area--scroll {
 overflow-x:scroll
}
.mdc-tab-scroller__scroll-content {
 position:relative;
 display:flex;
 flex:1 0 auto;
 transform:none;
 will-change:transform
}
.mdc-tab-scroller--align-start .mdc-tab-scroller__scroll-content {
 justify-content:flex-start
}
.mdc-tab-scroller--align-end .mdc-tab-scroller__scroll-content {
 justify-content:flex-end
}
.mdc-tab-scroller--align-center .mdc-tab-scroller__scroll-content {
 justify-content:center
}
.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-area {
 -webkit-overflow-scrolling:auto
}
.mdc-tab-scroller--animating .mdc-tab-scroller__scroll-content {
 transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)
}
.mdc-tab-indicator {
 display:flex;
 position:absolute;
 top:0;
 left:0;
 justify-content:center;
 width:100%;
 height:100%;
 pointer-events:none;
 z-index:1
}
.mdc-tab-indicator .mdc-tab-indicator__content--underline {
 border-color:#6200ee;
 border-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-tab-indicator .mdc-tab-indicator__content--icon {
 color:#018786;
 color:var(--mdc-theme-secondary, #018786)
}
.mdc-tab-indicator .mdc-tab-indicator__content--underline {
 border-top-width:2px
}
.mdc-tab-indicator .mdc-tab-indicator__content--icon {
 height:34px;
 font-size:34px
}
.mdc-tab-indicator__content {
 transform-origin:left;
 opacity:0
}
.mdc-tab-indicator__content--underline {
 align-self:flex-end;
 box-sizing:border-box;
 width:100%;
 border-top-style:solid
}
.mdc-tab-indicator__content--icon {
 align-self:center;
 margin:0 auto
}
.mdc-tab-indicator--active .mdc-tab-indicator__content {
 opacity:1
}
.mdc-tab-indicator .mdc-tab-indicator__content {
 transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)
}
.mdc-tab-indicator--no-transition .mdc-tab-indicator__content {
 transition:none
}
.mdc-tab-indicator--fade .mdc-tab-indicator__content {
 transition:150ms opacity linear
}
.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content {
 transition-delay:100ms
}
.mdc-tab {
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:.875rem;
 line-height:2.25rem;
 font-weight:500;
 letter-spacing:.0892857143em;
 text-decoration:none;
 text-transform:uppercase;
 padding-right:24px;
 padding-left:24px;
 position:relative;
 display:flex;
 flex:1 0 auto;
 justify-content:center;
 box-sizing:border-box;
 margin:0;
 padding-top:0;
 padding-bottom:0;
 border:none;
 outline:none;
 background:none;
 text-align:center;
 white-space:nowrap;
 cursor:pointer;
 -webkit-appearance:none;
 z-index:1
}
.mdc-tab .mdc-tab__text-label {
 color:rgba(0,0,0,.6)
}
.mdc-tab .mdc-tab__icon {
 color:rgba(0,0,0,.54);
 fill:currentColor
}
.mdc-tab::-moz-focus-inner {
 padding:0;
 border:0
}
.mdc-tab--min-width {
 flex:0 1 auto
}
.mdc-tab__content {
 position:relative;
 display:flex;
 align-items:center;
 justify-content:center;
 height:inherit;
 pointer-events:none
}
.mdc-tab__text-label {
 transition:150ms color linear;
 display:inline-block;
 line-height:1;
 z-index:2
}
.mdc-tab__icon {
 transition:150ms color linear;
 width:24px;
 height:24px;
 font-size:24px;
 z-index:2
}
.mdc-tab--stacked .mdc-tab__content {
 flex-direction:column;
 align-items:center;
 justify-content:center
}
.mdc-tab--stacked .mdc-tab__text-label {
 padding-top:6px;
 padding-bottom:4px
}
.mdc-tab--active .mdc-tab__text-label {
 color:#6200ee;
 color:var(--mdc-theme-primary, #6200ee)
}
.mdc-tab--active .mdc-tab__icon {
 color:#6200ee;
 color:var(--mdc-theme-primary, #6200ee);
 fill:currentColor
}
.mdc-tab--active .mdc-tab__text-label,
.mdc-tab--active .mdc-tab__icon {
 transition-delay:100ms
}
.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label {
 padding-left:8px;
 padding-right:0
}
[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,
.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl] {
 padding-left:0;
 padding-right:8px
}
.mdc-tab__ripple {
 --mdc-ripple-fg-size: 0;
 --mdc-ripple-left: 0;
 --mdc-ripple-top: 0;
 --mdc-ripple-fg-scale: 1;
 --mdc-ripple-fg-translate-end: 0;
 --mdc-ripple-fg-translate-start: 0;
 -webkit-tap-highlight-color:rgba(0,0,0,0);
 will-change:transform,opacity;
 position:absolute;
 top:0;
 left:0;
 width:100%;
 height:100%;
 overflow:hidden
}
.mdc-tab__ripple::before,
.mdc-tab__ripple::after {
 position:absolute;
 border-radius:50%;
 opacity:0;
 pointer-events:none;
 content:""
}
.mdc-tab__ripple::before {
 transition:opacity 15ms linear,background-color 15ms linear;
 z-index:1
}
.mdc-tab__ripple.mdc-ripple-upgraded::before {
 transform:scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-tab__ripple.mdc-ripple-upgraded::after {
 top:0;
 left:0;
 transform:scale(0);
 transform-origin:center center
}
.mdc-tab__ripple.mdc-ripple-upgraded--unbounded::after {
 top:var(--mdc-ripple-top, 0);
 left:var(--mdc-ripple-left, 0)
}
.mdc-tab__ripple.mdc-ripple-upgraded--foreground-activation::after {
 animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards
}
.mdc-tab__ripple.mdc-ripple-upgraded--foreground-deactivation::after {
 animation:mdc-ripple-fg-opacity-out 150ms;
 transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))
}
.mdc-tab__ripple::before,
.mdc-tab__ripple::after {
 top:calc(50% - 100%);
 left:calc(50% - 100%);
 width:200%;
 height:200%
}
.mdc-tab__ripple.mdc-ripple-upgraded::after {
 width:var(--mdc-ripple-fg-size, 100%);
 height:var(--mdc-ripple-fg-size, 100%)
}
.mdc-tab__ripple::before,
.mdc-tab__ripple::after {
 background-color:#6200ee
}
.mdc-tab__ripple::before,
.mdc-tab__ripple::after {
 background-color:var(--mdc-theme-primary, #6200ee)
}
.mdc-tab__ripple:hover::before {
 opacity:.04
}
.mdc-tab__ripple.mdc-ripple-upgraded--background-focused::before,
.mdc-tab__ripple:not(.mdc-ripple-upgraded):focus::before {
 transition-duration:75ms;
 opacity:.12
}
.mdc-tab__ripple:not(.mdc-ripple-upgraded)::after {
 transition:opacity 150ms linear
}
.mdc-tab__ripple:not(.mdc-ripple-upgraded):active::after {
 transition-duration:75ms;
 opacity:.12
}
.mdc-tab__ripple.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
*,
*::before,
*::after {
 box-sizing:border-box
}
html,
body,
#root-container {
 height:100%;
 margin:0;
 padding:0
}
.component-demo {
 height:100%;
 display:flex;
 flex-direction:row
}
.component-demo .component-demo__content {
 flex-direction:column;
 display:flex;
 height:100%;
 width:100%;
 transition:width;
 transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);
 transition-duration:250ms
}
.component-demo .component-demo__config-panel {
 background-color:#fff;
 border-left:1px solid rgba(0,0,0,.1);
 position:fixed;
 right:-200px;
 z-index:10;
 height:100%;
 width:200px;
 transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);
 transition-duration:250ms;
 transition-property:right
}
.component-demo .component-demo__panel-header {
 height:48px;
 padding-left:16px;
 padding-right:4px;
 border-bottom:1px solid #eee;
 display:flex;
 justify-content:space-between
}
.component-demo .component-demo__panel-header-label {
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:.875rem;
 line-height:1.375rem;
 font-weight:500;
 letter-spacing:.0071428571em;
 text-decoration:inherit;
 text-transform:inherit;
 display:flex;
 align-items:center;
 flex:1 1 auto;
 line-height:1.25rem;
 font-weight:400;
 opacity:.87
}
.component-demo .component-demo__config-panel-scrim {
 display:none
}
.component-demo--open .component-demo__content {
 width:calc(100% - 200px)
}
.component-demo--open .component-demo__config-panel {
 right:0
}
.component-demo--open .component-demo__config-button {
 visibility:hidden;
 transition-delay:0ms
}
.component-demo__stage-content {
 background:#fafafa;
 flex:1 1 auto;
 min-height:250px;
 position:relative
}
.component-demo__app-bar {
 background-color:#fff;
 flex-shrink:0;
 height:48px;
 padding-left:16px;
 padding-right:4px;
 border-bottom:1px solid #eee;
 display:flex;
 position:relative
}
.component-demo__tab-section {
 display:flex;
 flex:1 1 auto;
 justify-content:flex-start
}
.component-demo__tab-section .mdc-tab-bar {
 width:auto
}
.component-demo__tab {
 padding-right:12px;
 padding-left:12px
}
.component-demo__tab .mdc-tab__text-label {
 color:rgba(0,0,0,.6)
}
.component-demo__tab.mdc-tab--active .mdc-tab__text-label {
 color:rgba(0,0,0,.87)
}
.component-demo__tab .mdc-tab-indicator__content--underline {
 border-color:#424242
}
.component-demo__tab .mdc-tab__ripple::before,
.component-demo__tab .mdc-tab__ripple::after {
 background-color:#616161
}
.component-demo__tab .mdc-tab__ripple:hover::before {
 opacity:.04
}
.component-demo__tab .mdc-tab__ripple.mdc-ripple-upgraded--background-focused::before,
.component-demo__tab .mdc-tab__ripple:not(.mdc-ripple-upgraded):focus::before {
 transition-duration:75ms;
 opacity:.12
}
.component-demo__tab .mdc-tab__ripple:not(.mdc-ripple-upgraded)::after {
 transition:opacity 150ms linear
}
.component-demo__tab .mdc-tab__ripple:not(.mdc-ripple-upgraded):active::after {
 transition-duration:75ms;
 opacity:.12
}
.component-demo__tab .mdc-tab__ripple.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
.component-demo__tab .mdc-tab-indicator {
 bottom:1px;
 height:auto
}
.component-demo__config-button {
 color:#757575;
 opacity:1
}
.component-demo__panel-header-close {
 color:#000;
 opacity:.54
}
.component-demo__config-button,
.component-demo__panel-header-close {
 border-radius:0;
 height:100%;
 transition:visibility 0s linear 225ms
}
.stage-transition-container-variant {
 position:absolute;
 padding:40px;
 bottom:0;
 left:0;
 right:0;
 top:0;
 align-items:center;
 display:flex;
 justify-content:center;
 opacity:0;
 transition-duration:250ms;
 transition-property:opacity,visibility;
 transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);
 visibility:hidden;
 z-index:0
}
.stage-transition-container-variant--show {
 opacity:1;
 visibility:visible
}
@media(max-width: 520px) {
 .component-demo__tab-section {
  max-width:100%;
  justify-content:center;
  width:calc(100% - 47px);
  flex:initial
 }
 .component-demo__tab-section .mdc-tab-bar {
  width:100%
 }
 .component-demo__tab-section .mdc-tab-scroller__scroll-content {
  padding-left:16px;
  padding-right:16px
 }
 .component-demo__app-bar {
  padding-left:0px;
  padding-right:0px
 }
 .component-demo__config-button {
  visibility:visible;
  position:absolute;
  right:0;
  box-shadow:-10px 0px 10px #fff;
  background-color:#fff
 }
 .component-demo--open .component-demo__config-panel-scrim {
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.32);
  opacity:1;
  transition:opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  display:block;
  position:absolute
 }
 .component-demo__config-panel-scrim {
  opacity:0;
  transition:opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)
 }
 .component-demo .component-demo__content {
  position:relative
 }
 .component-demo--open .component-demo__content {
  width:100%
 }
 .stage-transition-container-variant {
  padding:40px 20px
 }
}
.dialog-options {
 padding:4px 4px 16px
}
.dialog-options__label {
 font-family:Roboto, sans-serif;
 -moz-osx-font-smoothing:grayscale;
 -webkit-font-smoothing:antialiased;
 font-size:.875rem;
 line-height:1.375rem;
 font-weight:500;
 letter-spacing:.0071428571em;
 text-decoration:inherit;
 text-transform:inherit;
 display:block;
 margin:16px 0 8px;
 padding:0 12px;
 line-height:1.25rem;
 font-weight:400;
 opacity:.87
}
.dialog-options__checkbox {
 padding:0 0 0 8px
}
.dialog-options__checkbox .mdc-checkbox {
 padding:5px
}
.dialog-options__checkbox .mdc-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate)~.mdc-checkbox__background {
 border-color:rgba(0,0,0,.54);
 background-color:transparent
}
.dialog-options__checkbox .mdc-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,
.dialog-options__checkbox .mdc-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background {
 border-color:rgba(0,0,0,.87);
 background-color:rgba(0,0,0,.87)
}
@keyframes mdc-checkbox-fade-in-background-u613dbl {
 0% {
  border-color:rgba(0,0,0,.54);
  background-color:transparent
 }
 50% {
  border-color:rgba(0,0,0,.87);
  background-color:rgba(0,0,0,.87)
 }
}
@keyframes mdc-checkbox-fade-out-background-u613dbl {
 0%,
 80% {
  border-color:rgba(0,0,0,.87);
  background-color:rgba(0,0,0,.87)
 }
 100% {
  border-color:rgba(0,0,0,.54);
  background-color:transparent
 }
}
.dialog-options__checkbox .mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,
.dialog-options__checkbox .mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background {
 animation-name:mdc-checkbox-fade-in-background-u613dbl
}
.dialog-options__checkbox .mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,
.dialog-options__checkbox .mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background {
 animation-name:mdc-checkbox-fade-out-background-u613dbl
}
.dialog-options__checkbox .mdc-checkbox .mdc-checkbox__native-control:checked~.mdc-checkbox__background::before,
.dialog-options__checkbox .mdc-checkbox .mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background::before {
 background-color:#000
}
.dialog-options__checkbox .mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::before,
.dialog-options__checkbox .mdc-checkbox.mdc-checkbox--selected .mdc-checkbox__ripple::after {
 background-color:#000
}
.dialog-options__checkbox .mdc-checkbox.mdc-checkbox--selected:hover .mdc-checkbox__ripple::before {
 opacity:.04
}
.dialog-options__checkbox .mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded--background-focused .mdc-checkbox__ripple::before,
.dialog-options__checkbox .mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):focus .mdc-checkbox__ripple::before {
 transition-duration:75ms;
 opacity:.12
}
.dialog-options__checkbox .mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded) .mdc-checkbox__ripple::after {
 transition:opacity 150ms linear
}
.dialog-options__checkbox .mdc-checkbox.mdc-checkbox--selected:not(.mdc-ripple-upgraded):active .mdc-checkbox__ripple::after {
 transition-duration:75ms;
 opacity:.12
}
.dialog-options__checkbox .mdc-checkbox.mdc-checkbox--selected.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
.dialog-options__checkbox .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::before,
.dialog-options__checkbox .mdc-checkbox.mdc-ripple-upgraded--background-focused.mdc-checkbox--selected .mdc-checkbox__ripple::after {
 background-color:#000
}
.dialog-options__checkbox .mdc-checkbox__background {
 width:16px;
 height:16px;
 left:6px;
 top:6px
}
.dialog-options__checkbox .mdc-checkbox~label {
 color:rgba(0,0,0,.6);
 cursor:pointer
}
.dialog-options__checkbox .mdc-checkbox[data-checked]~label {
 color:rgba(0,0,0,.87)
}
.dialog-options__checkbox .mdc-checkbox[data-disabled]~label {
 color:rgba(0,0,0,.38)
}
.dialog-options__radio-group {
 padding:0 0 0 8px
}
.dialog-options__radio-group .mdc-form-field {
 display:flex
}
.dialog-options__radio-group .mdc-radio {
 width:28px;
 height:28px;
 padding:4px
}
.dialog-options__radio-group .mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle {
 border-color:rgba(0,0,0,.54)
}
.dialog-options__radio-group .mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle {
 border-color:rgba(0,0,0,.87)
}
.dialog-options__radio-group .mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle {
 border-color:rgba(0,0,0,.87)
}
.dialog-options__radio-group .mdc-radio .mdc-radio__ripple::before,
.dialog-options__radio-group .mdc-radio .mdc-radio__ripple::after {
 background-color:#000
}
.dialog-options__radio-group .mdc-radio:hover .mdc-radio__ripple::before {
 opacity:.04
}
.dialog-options__radio-group .mdc-radio.mdc-ripple-upgraded--background-focused .mdc-radio__ripple::before,
.dialog-options__radio-group .mdc-radio:not(.mdc-ripple-upgraded):focus .mdc-radio__ripple::before {
 transition-duration:75ms;
 opacity:.12
}
.dialog-options__radio-group .mdc-radio:not(.mdc-ripple-upgraded) .mdc-radio__ripple::after {
 transition:opacity 150ms linear
}
.dialog-options__radio-group .mdc-radio:not(.mdc-ripple-upgraded):active .mdc-radio__ripple::after {
 transition-duration:75ms;
 opacity:.12
}
.dialog-options__radio-group .mdc-radio.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.12
}
.dialog-options__radio-group .mdc-radio__background {
 width:18px;
 height:18px;
 left:5px;
 top:5px
}
.dialog-options__radio-group .mdc-radio__inner-circle {
 border-width:9px
}
.dialog-options__radio-group .mdc-radio~label {
 color:rgba(0,0,0,.6);
 cursor:pointer
}
.dialog-options__radio-group .mdc-radio[data-checked]~label {
 color:rgba(0,0,0,.87)
}
.dialog-options__radio-group .mdc-radio[data-disabled]~label {
 color:rgba(0,0,0,.38)
}
.mdc-dialog,
.mdc-dialog__scrim {
 position:absolute
}
.inline-demo-button:not(:disabled) {
 border-color:#bdbdbd
}
.inline-demo-button .mdc-button__ripple::before,
.inline-demo-button .mdc-button__ripple::after {
 background-color:#bdbdbd
}
.inline-demo-button:hover .mdc-button__ripple::before {
 opacity:.08
}
.inline-demo-button.mdc-ripple-upgraded--background-focused .mdc-button__ripple::before,
.inline-demo-button:not(.mdc-ripple-upgraded):focus .mdc-button__ripple::before {
 transition-duration:75ms;
 opacity:.24
}
.inline-demo-button:not(.mdc-ripple-upgraded) .mdc-button__ripple::after {
 transition:opacity 150ms linear
}
.inline-demo-button:not(.mdc-ripple-upgraded):active .mdc-button__ripple::after {
 transition-duration:75ms;
 opacity:.24
}
.inline-demo-button.mdc-ripple-upgraded {
 --mdc-ripple-fg-opacity: 0.24
}
.inline-demo-button:not(:disabled) {
 color:rgba(0,0,0,.87)
}
.mdc-dialog .mdc-dialog__surface {
 max-height:360px;
 min-width:240px;
 max-width:240px
}
.demo-simple-dialog .mdc-dialog__content {
 padding-bottom:11px
}
.demo-simple-dialog .mdc-dialog__content+.mdc-dialog__content {
 padding-top:0
}
.demo-simple-dialog .mdc-dialog__content:last-child {
 padding-left:8px;
 padding-right:8px;
 padding-bottom:12px
}
.demo-confirmation-dialog .mdc-dialog__surface {
 max-height:268px
}
.demo-confirmation-dialog .mdc-dialog__content {
 padding-left:16px;
 padding-right:16px
}
.demo-confirmation-dialog .demo-dialog-list-container .mdc-form-field {
 display:flex
}

               `;
    }
}
