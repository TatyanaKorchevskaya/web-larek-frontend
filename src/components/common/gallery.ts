import { View, ViewEvent } from '../base/view';
import { HTMLCustomItem } from '../base/html';

export type GalleryItem =
	| View<HTMLElement, object, 'click', string>
	| HTMLCustomItem<HTMLElement, 'click'>;

export interface IGallery {
	items: GalleryItem[];
}

export class Gallery extends View<
	HTMLDivElement,
	IGallery,
	'item-click',
	never
> {
	protected _items: GalleryItem[] = [];

	init() {
		this.on('item-click', this.setActiveItem.bind(this));
	}

	setActiveItem({ element }: ViewEvent) {
	
		this._items.map((item) => console.log(item, '9999999999999999', typeof item, item.node)
		);
		
		this.addClass(element.node as unknown as HTMLElement, 'gallery__item_active')
	}

	set items(items: View<HTMLElement, object, 'click', string>[]) {
		this._items = items;
		this.clear();
		// this.append(
		// 	...items.map(function (item) {
		// 		item
		// 			// .addClass(this.bem('item').name)
		// 			.on('click', this.trigger('item-click'))
		// 	})
		// );
		let temp = [...items].map((item) => {
			item
				// .addClass(this.bem('item').name)
				.on('click', this.trigger('item-click'))
				this.addClass(item.node, this.bem('item').name)
			return item
		})
		this.append(...temp)
	}
}
