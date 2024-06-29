import { IBasket, IProduct } from '../types/index';
import { IEvents } from "./base/events";
import { handlePrice } from '../utils/utils';
import { View, ViewElement } from './base/view';
import { Page } from './page';
import { Card, ICard } from "./card";

export class Basket extends View<HTMLElement, IBasket, 'click', never> {

    
    protected _container: HTMLElement;
    protected _list: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

   
    constructor(
        protected blockName: string,
        container: HTMLTemplateElement,
        event?: IEvents
    ) {
        super(container)
              
        this._container = container.content.firstElementChild.cloneNode(true) as HTMLElement;

        this._button = this._container.querySelector(`.${blockName}__button`);
        this._price = this._container.querySelector(`.${blockName}__price`);
        // this._price = ((this._container as unknown as ViewElement<HTMLElement>).element(`price`) as unknown as ViewElement<HTMLElement>);
        this._list = this._container.querySelector(`.${blockName}__list`);
        this.event = event;

        if (this._button) {
            this._button.addEventListener('click', () => (this.event as IEvents).emit('basket:order'))
        }

    }
  
    set price(price: number) {
              this.setText (this._price, handlePrice(price) + ' синапсов')
    }
   
    set list(items: HTMLElement[]) {
        this._list.replaceChildren(...items);

        this.toggleDisabled(this._button, items.length ? false : true)
    }

    disableButton() {
        
        this.toggleDisabled(this._button, true)
    }

        refreshIndices() {
        Array.from(this._list.children).forEach(
            (item, index) =>
                    (this.setText(item.querySelector(`.basket__item-index`)!, (index + 1).toString()))
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


export class StoreItemBasket extends View<HTMLElement, IBasket, 'click', never> {
    
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
        super(container)
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
        // this._title.textContent = value;
        this.setText(this._title, value);
    }

    set index(value: number) {
        // this._index.textContent = value.toString();
        this.setText(this._index, value.toString());
    }

    set price(value: number) {
        // this._price.textContent = handlePrice(value) + ' синапсов';
        this.setText(this._price, handlePrice(value) + ' синапсов');
    }

    render(data?: Partial<IProductBasket>): HTMLElement {

        Object.assign(this as object, data ?? {});
        return this._container;
    }
}