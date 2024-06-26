import { Gallery, IGallery } from './common/gallery';
import { View, ViewElement } from './base/view';
import { Hero } from './common/hero';
import { ensureElement } from './../utils/utils';
import { Card, ICard } from './card';
import { EventHandler, IEvents } from './base/events';
import { CardPreview } from './cardPreview';
import { Modal } from './common/modal';
import { EventEmitter } from './base/events';
import { AppState } from './appState';


const eventsPage = new EventEmitter();
const modal = new Modal(ensureElement<HTMLDivElement>('#modal-container'), eventsPage);

interface IPage {
	counter: number;
	cover: string;
	gallery: IGallery;
}

interface PageConfiguration {
	modalTemplate: string;
	contentTemplate: string;
}

export class Page extends View<
	HTMLButtonElement,
	IPage,
	'buy-ticket' | 'open-basket',
	'locked'
> {
	protected _ProductView: Card;
	protected _eventsEmit: EventEmitter;
	protected init() {

		ensureElement<HTMLElement>('.header__basket').addEventListener('click', () => {
			this._eventsEmit.emit('basket:open', {})
		})

		this.select('gallery', '.gallery', Gallery);
	}

	set counter(value: number) {
		this.setText((this.select('counter', '.header__basket-counter') as Page).node as unknown as HTMLElement, String(value))
	}

	get selectProducts() {
		return this._selectProducts;
	}

	lockScroll(state: boolean) {
		this.element('wrapper').toggle('locked', state);
	}

	protected selectProduct =
		(product: ICard, events: IEvents, appData?: AppState, card?: Card): EventHandler =>
			() => {
				const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
				let ProductView = new CardPreview(cardPreviewTemplate, events, card)
				modal.content = ProductView.render(product)
				modal.render()
				modal.locked(true)
			};

	setProducts(products: ICard[], template: string, events: IEvents, appData?: AppState) {
		const items: Card[] = [];
		products.forEach(product => {
			const newCard: Card = Card.clone<Card>(template, appData, product)
			newCard.selected = false
			newCard.id = product.id
			newCard.on('click', this.selectProduct(product, events, appData, newCard))
			appData.setStore(newCard)
			items.push(newCard)
		})

		items.forEach((item) => {
			appData.setStore(item)
		})
		this.element<Gallery>('gallery').render({ items });
		this.element<Gallery>('gallery').setActiveItem({ element: items[0] });
	}

	configure({ contentTemplate }: PageConfiguration, events: EventEmitter) {
		this._ProductView = Card.clone<Card>(contentTemplate);
		this._eventsEmit = events;
		return this;
	}
}
