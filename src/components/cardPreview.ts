import { Card, ICard } from "./card";
import { CDN_URL, categoryMapping } from '../utils/constants';
import { IEvents } from './base/events'


export class CardPreview {
    protected _cardElement: HTMLElement;
    protected _cardElementButton: HTMLButtonElement;
    protected _product: ICard;
    protected _card: Card;
    constructor(template: HTMLTemplateElement, protected events: IEvents, card?: Card, name?: string) {

        this._cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        this._cardElementButton = (this._cardElement.querySelector('.card__button') as HTMLButtonElement)

        this._cardElement.querySelector('.card__button')
            .addEventListener('click', () => { this.events.emit('card:addBasket', this._product) });

        this._card = card
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

            this._cardElementButton.disabled = true
        }
        if (this._card.selected) {
            this._cardElementButton.disabled = true
        }

        return this._cardElement
    }

}