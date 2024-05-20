import { Card, ICard } from "./card";
import { CDN_URL, categoryMapping } from '../utils/constants';
import { IEvents } from './base/events'

// export class CardPreview <NodeType extends HTMLButtonElement> extends Card {
//     constructor(root: NodeType, name?: string) {
//         super(root, name)
//     }
//     render(data?: ICard): NodeType {
//         return
//     }
// }

export class CardPreview {
    protected _cardElement: HTMLElement;
    constructor(template: HTMLTemplateElement,  protected events: IEvents, name?: string) {
        this._cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        this._cardElement.querySelector('.card__button').addEventListener('click', () => { this.events.emit('card:addBasket') });
    }
    render(data?: ICard): HTMLElement {
        this._cardElement.querySelector('.card__title').textContent = data.title
        this._cardElement.querySelector('.card__image').setAttribute('src', `${CDN_URL}${data.image}`)    
        this._cardElement.querySelector('.card__text').textContent = data.description
        this._cardElement.querySelector('.card__price').textContent = data.price !== null ? `${data.price.toString()} синапсов` : 'Бесценно'
        
        let categoryItem: HTMLElement = this._cardElement.querySelector('.card__category')
		categoryItem.textContent = data.category;
		if (data.category in categoryMapping) {
            categoryItem.classList.remove('card__category_other')
			categoryItem.classList.add(categoryMapping[data.category])
		}
        return this._cardElement
    }
}