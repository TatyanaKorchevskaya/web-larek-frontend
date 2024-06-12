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
    protected _product: ICard;
    protected _card: Card;
    constructor(template: HTMLTemplateElement,  protected events: IEvents, card?: Card, name?: string) {
       
        this._cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
     
        this._cardElement.querySelector('.card__button')
        .addEventListener('click', () => { this.events.emit('card:addBasket', this._product) });

        this._card = card
        console.log(this._card.selected);
        
        // if (this._card.selected) {
        //     console.log(this._card, "productpreview render");
            
        //     (this._cardElement.querySelector('.card__button') as HTMLButtonElement).disabled = true
        // }
    }
    render(data?: ICard): HTMLElement {
       
        this._product = data
       
        
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
        if (data.price == null) {
            console.log(this._card, "productpreview render");
            
            (this._cardElement.querySelector('.card__button') as HTMLButtonElement).disabled = true
        }
        if (this._card.selected) {
            (this._cardElement.querySelector('.card__button') as HTMLButtonElement).disabled = true
        }
               
        return this._cardElement
    }

    // set selected(value: boolean) {
    //     console.log("set selected----------------");
        
	// 	if (!(this._cardElement.querySelector('.card__button') as HTMLButtonElement).disabled) {
    //         (this._cardElement.querySelector('.card__button') as HTMLButtonElement).disabled = value;
	// 	}
	//   }
}