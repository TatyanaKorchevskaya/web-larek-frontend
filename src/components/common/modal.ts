import { IEvents } from "../base/events";
import { HTMLCustomItem } from "../base/html";
import { View } from "../base/view";


export interface IModal {
	open(): void;
	close(): void;
	render(): HTMLElement;
	toggleClass(className: string, state?: boolean): void;

}

export class Modal extends View<HTMLElement, IModal , 'click', never> {
	protected modalContainer: HTMLElement;
	protected closeButton: HTMLButtonElement;
	protected _content: HTMLElement;
	protected _pageWrapper: HTMLElement;

	constructor(modalContainer: HTMLElement, protected event: IEvents) {
		super(modalContainer)
		this.node = modalContainer;
		this.closeButton = modalContainer.querySelector('.modal__close');
		this._content = modalContainer.querySelector('.modal__content');
		this._pageWrapper = document.querySelector('.page__wrapper');

		this.closeButton.addEventListener('click', this.close.bind(this));
		this.node.addEventListener('click', this.close.bind(this));
		this.node.querySelector('.modal__container').addEventListener('click', event => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	// open() {
	// 	// this.node.classList.add('modal_active');
	// 	this.toggleClass('modal_active', true)
	// 	this.events.emit('modal:open');
	// }

	// close() {
	// 	// this.node.classList.remove('modal_active');
	// 	this.toggleClass('modal_active', false)
	// 	this.content = null;
	// 	this.events.emit('modal:close');
	// }

	// создаем метод для переключения модального окна, чтобы не передавать селектор и контейнер каждый раз
	// сразу по умолчанию указываем `true`, чтобы лишний раз не передавать при открытии
	_toggleModal(state: boolean = true) {
		this.toggleClass(this.node, 'modal_active', state);
	}
	// Обработчик в виде стрелочного метода, чтобы не терять контекст `this`
	_handleEscape = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			this.close();
		}
	};

	open() {
		this._toggleModal(); // открываем
		// навешиваем обработчик при открытии
		document.addEventListener('keydown', this._handleEscape);
		this.event.emit('modal:open');
	}

	close() {
		this._toggleModal(false); 
		document.removeEventListener('keydown', this._handleEscape);
		this.content = null;
		this.event.emit('modal:close');
	}


	locked(value: boolean) {
		this.toggleClass(document.querySelector('.page__wrapper'),'page__wrapper_locked', value)
		
	}

	render(): HTMLElement {
		this._content;
		this.open();

		return this.node
	}
}