import { Card, ICard } from "./card";
import { CDN_URL, categoryMapping } from '../utils/constants';
import { IEvents } from './base/events'
import { View } from "./base/view";


export class CardPreview extends View<HTMLElement, ICard, 'click', never> {
    protected _cardElement: HTMLElement;
    protected _cardElementButton: HTMLButtonElement;
    protected _product: ICard;
    protected _card: Card;
    constructor(template: HTMLTemplateElement, protected event?: IEvents, card?: Card, name?: string) {
        super(template)

        this._cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        this._cardElementButton = (this._cardElement.querySelector('.card__button') as HTMLButtonElement)

        this._cardElement.querySelector('.card__button')
            .addEventListener('click', () => { this.event.emit('card:addBasket', this._product) });

        this._card = card
    }
    render(data?: ICard): HTMLElement {

        this._product = data


        // this._cardElement.querySelector('.card__title').textContent = data.title
        this.setText(this._cardElement.querySelector('.card__title'), data.title)
        this._cardElement.querySelector('.card__image').setAttribute('src', `${CDN_URL}${data.image}`)
        // this._cardElement.querySelector('.card__text').textContent = data.description
        this.setText(this._cardElement.querySelector('.card__text'),  data.description)
        // this._cardElement.querySelector('.card__price').textContent = data.price !== null ? `${data.price.toString()} синапсов` : 'Бесценно'
        this.setText(this._cardElement.querySelector('.card__price'), data.price !== null ? `${data.price.toString()} синапсов` : 'Бесценно')

        let categoryItem: HTMLElement = this._cardElement.querySelector('.card__category')
      
        this.setText(categoryItem, data.category)
        if (data.category in categoryMapping) {
        
            this.toggleClass(categoryItem, 'card__category_other', false)
        
            this.toggleClass(categoryItem, categoryMapping[data.category], true)
        }
        if (data.price == null) {
                     
            this.toggleDisabled(this._cardElementButton, true)
        }
        if (this._card.selected) {
          
            this.toggleDisabled(this._cardElementButton, true)
        }

        return this._cardElement
    }

}