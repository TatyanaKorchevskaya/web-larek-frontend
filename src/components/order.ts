import { IEvents } from './base/events';
import { Form } from './common/form';

export interface IOrder {
  address: string;
  payment: string;
}

export class Order extends Form<IOrder> {
  protected _card: HTMLButtonElement;
  protected _cash: HTMLButtonElement;

  constructor(
    protected blockName: string,
    container: HTMLFormElement,
    protected event: IEvents
  ) {
    super(container, event);

    this._card = this.container.elements.namedItem('card') as HTMLButtonElement;
    this._cash = this.container.elements.namedItem('cash') as HTMLButtonElement;

    if (this._cash) {
      this._cash.addEventListener('click', () => {
        // this._cash.classList.add('button_alt-active')
        this.toggleClass(this._cash, 'button_alt-active', true)
        // this._card.classList.remove('button_alt-active')
        this.toggleClass(this._card, 'button_alt-active', false)
        this.onInputChange('payment', 'cash')
      })
    }
    if (this._card) {
      this._card.addEventListener('click', () => {
        // this._card.classList.add('button_alt-active')
        this.toggleClass(this._card, 'button_alt-active', true)
        // this._cash.classList.remove('button_alt-active')
        this.toggleClass(this._cash, 'button_alt-active', false)
        this.onInputChange('payment', 'card')
      })
    }
  }

  disableButtons() {
    // this._cash.classList.remove('button_alt-active')
    this.toggleClass(this._cash, 'button_alt-active', false)
    // this._card.classList.remove('button_alt-active')
    this.toggleClass(this._card, 'button_alt-active', false)
  }
}