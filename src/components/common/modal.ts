// import { View } from '../base/view';

// export interface IModal {
// 	header?: HTMLElement;
// 	content: HTMLElement;
// 	actions: HTMLElement[];
// }

// export class Modal extends View<
// 	HTMLDivElement,
// 	IModal,
// 	'close' | 'open' | 'hide',
// 	'active'
// > {
// 	protected _actions: HTMLElement[] = [];

// 	init() {
// 		this.element('close').bindEvent('click', 'close');

// 		this.element('header').hide();
// 		this.element('message').hide();

// 		this.on('close', this.close.bind(this));
// 	}

// 	reset() {
// 		this.toggle('active', false);
// 		this.header = null;
// 		this.setContent = null;
// 		this.setMessage();
// 	}

// 	set header(content: HTMLElement | null) {
// 		this.setVisibleContent('header', content);
// 	}

// 	set content(content: HTMLElement | null) {
// 		this.element('content').setContent(content);
// 	}

// 	set actions(actions:HTMLElement[]) {
// 		this._actions.map((action) => action.remove());
// 		this._actions = actions;
// 		for (const action of actions.reverse()) {
// 			this.element('footer').prepend(action);
// 		}
// 	}

// 	setActive(state: boolean) {
// 		if (state) {
// 			this.emit('open', {});
// 			this.toggle('active', true);
// 		} else {
// 			this.emit('hide', {});
// 			this.toggle('active', false);
// 		}
// 		return this;
// 	}

// 	setMessage(message?: string, error?: boolean) {
// 		this.setVisibleContent('message', message);
// 		this.element('message').toggleClass(
// 			this.bem('message', 'error').name,
// 			!!error
// 		);
// 		return this;
// 	}

// 	static configure({ modalTemplate }: { modalTemplate: string }): Modal {
// 		return Modal.clone<Modal>(modalTemplate);
// 	}

// 	// render(modal: IModal) {
// 	// 	super.render(modal);
// 	// 	this.setMessage();
// 	// 	if (!this.node.isConnected) {
// 	// 		document.body.append(this.node);
// 	// 		this.setActive(true);
// 	// 	}
// 	// 	return this.node;
// 	// }

// 	render(): HTMLElement {
// 		this._content;
// 		this.open();
// 		return this.modalContainer
// 	  }

// 	close() {
// 		this.setActive(false);
// 		this.reset();
// 		this.remove();
// 	}
// }


import { IEvents } from "../base/events";

export interface IModal {
	open(): void;
	close(): void;
	render(): HTMLElement
}

export class Modal implements IModal {
	protected modalContainer: HTMLElement;
	protected closeButton: HTMLButtonElement;
	protected _content: HTMLElement;
	protected _pageWrapper: HTMLElement;

	constructor(modalContainer: HTMLElement, protected events: IEvents) {
		this.modalContainer = modalContainer;
		this.closeButton = modalContainer.querySelector('.modal__close');
		this._content = modalContainer.querySelector('.modal__content');
		this._pageWrapper = document.querySelector('.page__wrapper');

		this.closeButton.addEventListener('click', this.close.bind(this));
		this.modalContainer.addEventListener('click', this.close.bind(this));
		this.modalContainer.querySelector('.modal__container').addEventListener('click', event => event.stopPropagation());
	}

	// принимает элемент разметки которая будет отображаться в "modal__content" модального окна
	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	// открытие модального окна
	open() {
		this.modalContainer.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	// закрытие модального окна
	close() {
		this.modalContainer.classList.remove('modal_active');
		this.content = null; // очистка контента в модальном окне
		this.events.emit('modal:close');
	}

	// set locked(value: boolean) {
	// 	console.log(value, '8888888888999999999999--------------');
		
	// 	if (value) {
	// 		this._pageWrapper.classList.add('page__wrapper_locked');
	// 	} else {
	// 		this._pageWrapper.classList.remove('page__wrapper_locked');
	// 	}
	// }

	static locked(value: boolean) {
		console.log(value, '8888888888999999999999--------------');
		
		if (value) {
			document.querySelector('.page__wrapper').classList.add('page__wrapper_locked');
		} else {
			document.querySelector('.page__wrapper').classList.remove('page__wrapper_locked');
		}
	}

	render(): HTMLElement {
		this._content;
		this.open();

		return this.modalContainer
	}
}