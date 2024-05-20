import { View, ViewElement } from './base/view';
import { CDN_URL, CategoryMapping, categoryMapping } from '../utils/constants';


export interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null | string;
	selected: boolean;
}

export class Card extends View<HTMLButtonElement, ICard, 'click', never> {
	protected init() {
		this.bindEvent('click');
		
	}

	set image(src: string) {
		this.element('image').setLink(`${CDN_URL}${src}`);
	}

	set title(value: string) {
		this.element('title').setText(value);
	}
	set category(value: string) {
		let categoryItem: ViewElement = this.element('category')
		categoryItem.setText(value);
		if (value in categoryMapping) {
			categoryItem.addClass(categoryMapping[value])
		}
	}

	set price(value: number | null) {
		if (value == null) {
			this.element('price').setText('Бесценно');

		} else {
			this.element('price').setText(`${value.toString()} синапсов`);
		}
	}
}

// interface ICardActions {
// 	onClick: (event: MouseEvent) => void;
//   }
  
// export class StoreItemPreview extends Card {
// 	protected _description: HTMLElement;
  
// 	constructor(container: HTMLElement, actions?: ICardActions) {
// 	  super('card', container, actions);
  
// 	  this._description = container.querySelector(`.${this.blockName}__text`);
// 	}
  
// 	set description(value: string) {
// 	  this._description.textContent = value;
// 	}
//   }
