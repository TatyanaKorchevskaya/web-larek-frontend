import { IBasket, IProduct } from '../types/index';
import { IEvents } from "./base/events";
import { handlePrice } from '../utils/utils';
import { View } from './base/view';
import { Page } from './page';
import { Card, ICard } from "./card";

export class Basket implements IBasket {

    // Ссылки на внутренние элементы
    protected _list: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

    // Конструктор принимает имя блока, родительский элемент и обработчик событий
    constructor(
        protected blockName: string,
        container: HTMLElement,
        protected events?: IEvents
    ) {

        this._button = container.querySelector(`.${blockName}__button`);
        this._price = container.querySelector(`.${blockName}__price`);
        this._list = container.querySelector(`.${blockName}__list`);

        if (this._button) {
            this._button.addEventListener('click', () => this.events.emit('basket:order'))
        }

    }
    // Сеттер для общей цены
    set price(price: number) {
        this._price.textContent = handlePrice(price) + ' синапсов';
    }

    // Сеттер для списка товаров 
    set list(items: HTMLElement[]) {
        this._list.replaceChildren(...items);
        this._button.disabled = items.length ? false : true;
    }

    // Метод отключающий кнопку "Оформить"
    disableButton() {
        this._button.disabled = true
    }

    // Метод для обновления индексов таблички при удалении товара из корзины
    refreshIndices() {
        Array.from(this._list.children).forEach(
            (item, index) =>
            (item.querySelector(`.basket__item-index`)!.textContent = (
                index + 1
            ).toString())
        );
    }
    render(data?: IProduct[]): HTMLElement {
              data.forEach(element => {
                console.log(this._list);
                
                const li = document.createElement('li')
                this._list.appendChild(li)
                this._list.querySelector('.card__title').textContent = element.title
              });
        // this._list.querySelector('.card__title').textContent = data.title
        // this._cardElement.querySelector('.card__image').setAttribute('src', `${CDN_URL}${data.image}`)    
        // this._cardElement.querySelector('.card__text').textContent = data.description
        // this._cardElement.querySelector('.card__price').textContent = data.price !== null ? `${data.price.toString()} синапсов` : 'Бесценно'
        
        // let categoryItem: HTMLElement = this._cardElement.querySelector('.card__category')
		// categoryItem.textContent = data.category;
		// if (data.category in categoryMapping) {
        //     categoryItem.classList.remove('card__category_other')
		// 	categoryItem.classList.add(categoryMapping[data.category])
		// }
        return this._list
    }
}

export interface IProductBasket extends IProduct {
    id: string;
    index: number;
}


export interface IStoreItemBasketActions {
    onClick: (event: MouseEvent) => void;
}


export class StoreItemBasket {
    protected _container: HTMLElement;
    protected _index: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(
        protected blockName: string,
        container: HTMLElement,
        actions?: IStoreItemBasketActions
    ) {
        this._container = container
        console.log(`.${blockName}__title`, "+++++++++++++++++", this._container);
        this._title = container.querySelector(`.${blockName}__title`);
        this._index = container.querySelector(`.basket__item-index`);
        this._price = container.querySelector(`.${blockName}__price`);
        this._button = container.querySelector(`.${blockName}__button`);

        if (this._button) {
            this._button.addEventListener('click', (evt) => {
                this._container.remove();
                actions?.onClick(evt);
            });
        }
    }

    set title(value: string) {
       
        
        this._title.textContent = value;
    }

    set index(value: number) {
        this._index.textContent = value.toString();
    }

    set price(value: number) {
        this._price.textContent = handlePrice(value) + ' синапсов';
    }

    render(data?: Partial<IProductBasket>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this._container;
      }
}