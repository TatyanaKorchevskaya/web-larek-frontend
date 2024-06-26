import { IBasket, IProduct } from '../types/index';
import { IEvents } from "./base/events";
import { handlePrice } from '../utils/utils';
import { View } from './base/view';
import { Page } from './page';
import { Card, ICard } from "./card";

export class Basket implements IBasket {

    
    protected _container: HTMLElement;
    protected _list: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

   
    constructor(
        protected blockName: string,
        container: HTMLTemplateElement,
        protected events?: IEvents
    ) {
        this._container = container.content.firstElementChild.cloneNode(true) as HTMLElement;

        this._button = this._container.querySelector(`.${blockName}__button`);
        this._price = this._container.querySelector(`.${blockName}__price`);
        this._list = this._container.querySelector(`.${blockName}__list`);

        if (this._button) {
            this._button.addEventListener('click', () => this.events.emit('basket:order'))
        }

    }
  
    set price(price: number) {
        this._price.textContent = handlePrice(price) + ' синапсов';
    }
   
    set list(items: HTMLElement[]) {
        this._list.replaceChildren(...items);
        this._button.disabled = items.length ? false : true;
    }

    disableButton() {
        this._button.disabled = true
    }

        refreshIndices() {
        Array.from(this._list.children).forEach(
            (item, index) =>
            (item.querySelector(`.basket__item-index`)!.textContent = (
                index + 1
            ).toString())
        );
    }

    render(data?: Partial<IBasket>): HTMLElement {

        Object.assign(this as object, data ?? {});
        return this._container;
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