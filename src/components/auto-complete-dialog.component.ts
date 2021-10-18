import {css, customElement, html, LitElement, property, query, TemplateResult} from 'lit-element';
import {YoutubeControllerService} from '../Services/YoutubeController.service';

const UP_ARROW_CODE = "ArrowUp";
const DOWN_ARROW_CODE = "ArrowDown";
const ENTER_CODE = "Enter";
const ESCAPE_CODE = "Escape";

@customElement('auto-complete-dialog')
export class AutoCompleteDialog extends LitElement {
	@property() public youtubeControllerService?: YoutubeControllerService;
	@query('#autocomplete-list') public autoCompleteList?: HTMLElement;
	private input?: HTMLInputElement;
	private currentFocus: number;

	public constructor() {
		super();
		this.currentFocus = -1;
	}

	public handleSlotchange(e) {
		e.preventDefault();
		const childNodes = e.target.assignedNodes({ flatten: true });
		this.input = childNodes[0];
		if (this.input) {
			this.setEventListeners(this.input);
		}
		else {
			throw new Error(`${this.constructor.name} needs input element to be pass through`);
		}

	}

	protected render(): TemplateResult {
		return html`
			<div class="autocomplete">
				<slot name="inputContainer" @slotchange=${this.handleSlotchange}></slot>
				<div id="autocomplete-list"></div>
			</div>
    	`;
	}

	private async onInput(input: HTMLInputElement): Promise<void> {
		var autoCompleteListItem, i, val = input.value;
		const suggestions = await this.youtubeControllerService?.getAutoCompleteSuggestions(input.value) ?? [];
		this.closeAllLists();
		if (!val) {
			return;
		}
		this.currentFocus = -1;
		for (i = 0; i < suggestions.length; i++) {
			if (suggestions[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				const itemValue = suggestions[i];
				autoCompleteListItem = document.createElement("div");
				autoCompleteListItem.innerHTML = `<strong>${suggestions[i].substr(0, val.length)}</strong>${suggestions[i].substr(val.length)}`;
				autoCompleteListItem.addEventListener("click", () => {
					input.value = itemValue;
					this.closeAllLists();
				});
				this.autoCompleteList?.appendChild(autoCompleteListItem);
				this.autoCompleteList!.style.maxHeight = `${window.innerHeight - this.autoCompleteList!.getBoundingClientRect().y}px`;
			}
		}
	}

	private setEventListeners(input: HTMLInputElement): void {
		input.addEventListener("input", () => this.onInput(input));
		input.addEventListener("keydown", (event) => {
			const listItems = this.autoCompleteList?.getElementsByTagName("div");
			if (listItems?.length ?? 0 > 0) {
				if (event.key == DOWN_ARROW_CODE) {
					this.currentFocus++;
					this.addActive(listItems);
				}
				else if (event.key == UP_ARROW_CODE) {
					this.currentFocus--;
					this.addActive(listItems);
				}
				else if (event.key == ENTER_CODE) {
					if (this.currentFocus > -1) {
						event.preventDefault();
						listItems?.[this.currentFocus].click();
					}
				}
				else if (event.key == ESCAPE_CODE) {
					if (this.currentFocus > -1) {
						event.preventDefault();
						this.closeAllLists();
					}
				}
			}
		});

		document.addEventListener("click", () => {
			this.closeAllLists();
		});
	}

	private addActive(x): void {
		if (!x) return;
		this.removeActive(x);
		if (this.currentFocus >= x.length) this.currentFocus = 0;
		if (this.currentFocus < 0) this.currentFocus = (x.length - 1);
		x[this.currentFocus].classList.add("autocomplete-active");
	}

	private removeActive(x): void {
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}
	}

	private closeAllLists(element?): void {
		if (this.autoCompleteList && this.input !== element) {
			this.autoCompleteList.textContent = "";
		}
	}

	static get styles() {
		return css`
		body {
			font: 16px Arial;
		}

		.autocomplete {
			position: relative;
		}

		#autocomplete-list {
			position: absolute;
			border: 1px solid #d4d4d4;
			border-bottom: none;
			border-top: none;
			z-index: 99;
			top: 100%;
			left: 0;
			right: 0;
			margin: 0px -10px;
			overflow: auto;
		}

		#autocomplete-list div {
			padding: 10px;
			cursor: pointer;
			background-color: #fff;
			border-bottom: 1px solid #d4d4d4;
		}

		#autocomplete-list div:hover {
			background-color: #e9e9e9;
		}

		.autocomplete-active {
			background-color: DodgerBlue !important;
			color: #ffffff;
		}
    `;
	}
}
