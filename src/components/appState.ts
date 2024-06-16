import { IOrder, IProduct, FormErrors, IOrderForm } from '../types/index';
import { Model } from './base/model';
import { IAppState } from '../types';
import { CardPreview } from './cardPreview';
import { Card, ICard } from './card';

export class Product extends Model<IProduct> {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
  selected: boolean;
}


export class AppState extends Model<IAppState> {

  basket: Product[] = [];


  store: Card[] = [];


  order: IOrder = {
    items: [],
    payment: '',
    total: null,
    address: '',
    email: '',
    phone: '',
  };


  formErrors: FormErrors = {};

  addToBasket(value: Product) {
    this.store.forEach(item => {

      if (item.id === value.id) {
        item.selected = true;
      }
    })
    this.basket.push(value);
  }

  deleteFromBasket(id: string) {
    this.basket = this.basket.filter(item => item.id !== id)
  }

  clearBasket() {
    this.basket.length = 0;
  }

  getBasketAmount() {
    return this.basket.length;
  }

  setItems() {
    this.order.items = this.basket.map(item => item.id)
  }

  setOrderField(field: keyof IOrderForm, value: string) {
    this.order[field] = value;

    if (this.validateContacts()) {
      this.events.emit('contacts:ready', this.order)
    }
    if (this.validateOrder()) {
      this.events.emit('order:ready', this.order);
    }
  }

  validateContacts() {
    const errors: typeof this.formErrors = {};
    if (!this.order.email) {
      errors.email = 'Необходимо указать email';
    }
    if (!this.order.phone) {
      errors.phone = 'Необходимо указать телефон';
    }
    this.formErrors = errors;
    this.events.emit('contactsFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  validateOrder() {
    const errors: typeof this.formErrors = {};
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес';
    }
    if (!this.order.payment) {
      errors.payment = 'Необходимо указать способ оплаты';
    }
    this.formErrors = errors;
    this.events.emit('orderFormErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  refreshOrder() {
    this.order = {
      items: [],
      total: null,
      address: '',
      email: '',
      phone: '',
      payment: ''
    };
  }

  getTotalBasketPrice() {
    return this.basket.reduce((sum, next) => sum + next.price, 0);
  }

  desabledProduct(product: Product) {
    this.store.forEach(item => {
      if (item.id === product.id) {
        item.selected = false;
      }
    })
  }



  setStore(item: Card) {
    this.store.push(item)
    this.emitChanges('items:changed', { store: this.store });
  }


  resetSelected() {
    this.store.forEach(item => item.selected = false)
  }
}