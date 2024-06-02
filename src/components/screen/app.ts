import { Page } from '../page';
import { EventEmitter } from '../base/events';
// import { Modal } from '../common/modal';
import { Basket } from '../basket';

import { settings } from '../../utils/constants';

// TODO: сделать импорт events, modal
export const events = new EventEmitter();

export const page = Page.mount<Page>('.page').configure(settings, events);

// export const modal = Modal.configure(settings);
// modal.on('open', () => page.lockScroll(true));
// modal.on('hide', () => page.lockScroll(false));

export const basket = new Basket('basket', document.querySelector('.basket'))

// function onChangeTickets() {
// 	page.counter = basket.tickets.size;
// 	basket.save();
// }

// basket.on('add-ticket', onChangeTickets);
// basket.on('remove-ticket', onChangeTickets);

// basket.load();

