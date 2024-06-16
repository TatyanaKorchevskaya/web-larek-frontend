import { Page } from '../page';
import { EventEmitter } from '../base/events';
import { Basket } from '../basket';
import { settings } from '../../utils/constants';

export const events = new EventEmitter();
export const page = Page.mount<Page>('.page').configure(settings, events);
export const basket = new Basket('basket', document.querySelector('#basket') as HTMLTemplateElement, events)

