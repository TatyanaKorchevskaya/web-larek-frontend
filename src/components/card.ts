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
export class Card extends View<HTMLElement, ICard, 'click', never> {
	
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

