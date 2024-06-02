import { Gallery, IGallery } from './common/gallery';
import { View } from './base/view';
import { Hero } from './common/hero';
import { ensureElement } from './../utils/utils';
import { Card, ICard } from './card';
import { EventHandler, IEvents } from './base/events';
import { CardPreview } from './cardPreview';
import { Modal } from './common/modal';
import { EventEmitter } from './base/events';
// import { IProduct } from './../types/index'
//TODO: избавитьс от локального event 
const eventsT = new EventEmitter();

const modal = new Modal(ensureElement<HTMLDivElement>('#modal-container'), eventsT);

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
	// protected _selectProducts: IProduct[];
	protected _ProductView: Card;
	protected _eventsEmit: EventEmitter;
	// protected _tickets: ITicket[] = [];

	protected init() {
		

		// this.select('openBasket', '.header__basket').bindEvent(
		// 	'click',
		// 	'open-basket'
		// );
		// console.log('end');
		ensureElement<HTMLElement>('.header__basket').addEventListener('click', () => {
			this._eventsEmit.emit('basket:open',{})
		})

		// this.select('hero', '.hero', Hero).on('action', this.trigger('buy-ticket'));

		this.select('gallery', '.gallery', Gallery);
	}

	set counter(value: number) {
		this.select('counter', '.header__basket-counter').setText(String(value));
	}

	get selectProducts() {
		return this._selectProducts;
	}

	lockScroll(state: boolean) {
			this.element('wrapper').toggle('locked', state);
	}

	protected selectProduct =
		(product: ICard, events: IEvents): EventHandler =>
			() => {
				console.log('select');
				const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
				let ProductView = new CardPreview(cardPreviewTemplate, events)
				modal.content = ProductView.render(product)
				modal.render()


			};



	setProducts(products: ICard[], template: string, events: IEvents) {
		console.log('-gggggggggggggggggg', products);

		const items = products.map((product) =>
			Card.clone<Card>(template, product).on('click', this.selectProduct(product, events))
		);

		this.element<Gallery>('gallery').render({ items });
		// this.selectProduct(products[0])({ element: items[0] });
		this.element<Gallery>('gallery').setActiveItem({ element: items[0] });
	}

	configure({ contentTemplate }: PageConfiguration, events: EventEmitter) {
		this._ProductView = Card.clone<Card>(contentTemplate);
		this._eventsEmit = events;
		// this.element<Hero>('hero').content = this._ProductView;
		return this;
	}
}
