import './scss/styles.scss';

import { API_URL, CDN_URL, settings } from './utils/constants';
import { ensureElement } from './utils/utils';
import { LarekAPI } from './components/LarekAPI';
// import { basket, modal, page } from './components/screen/app';
import { page } from './components/screen/app';
import { Modal } from './components/common/modal';
import { EventEmitter } from './components/base/events';

// import { Product } from './types/index';
import { AppState, Product } from './components/appState';

const api = new LarekAPI(CDN_URL, API_URL);
// TODO: сделать импорт events, modal
const events = new EventEmitter();
const modal = new Modal(ensureElement<HTMLDivElement>('#modal-container'), events);
const appData = new AppState({}, events);

// console.log(settings.cardTemplate);

api
    .getProducts()
    .then((Products) => {
        page.setProducts(Products, settings.cardTemplate);
    })
    .catch((err: string) => console.log(`Error: `, err));


    events.on('card:addBasket', (item: Product) => {
        item.selected = true;
        appData.addToBasket(item);
        page.counter = appData.getBasketAmount();
        modal.close();
      })
      