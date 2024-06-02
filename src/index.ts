import './scss/styles.scss';

import { API_URL, CDN_URL, settings } from './utils/constants';
import { ensureElement } from './utils/utils';
import { LarekAPI } from './components/LarekAPI';
import { basket } from './components/screen/app';
import { page, events } from './components/screen/app';
import { Modal } from './components/common/modal';

import { StoreItemBasket } from './components/basket';


// import { Product } from './types/index';
import { AppState, Product } from './components/appState';

const api = new LarekAPI(CDN_URL, API_URL);

const modal = new Modal(ensureElement<HTMLDivElement>('#modal-container'), events);
const appData = new AppState({}, events);


api
    .getProducts()
    .then((Products) => {
        page.setProducts(Products, settings.cardTemplate, events);
    })
    .catch((err: string) => console.log(`Error: `, err));


events.on('card:addBasket', (item: Product) => {
    console.log('addtobasket');
    console.log(item, '*********************');

    item.selected = true;
    appData.addToBasket(item);
    page.counter = appData.getBasketAmount();
    modal.close();
})

events.on('basket:open', () => {
    page.locked = true
    const basketItems = appData.basket.map((item, index) => {
        const template = document.querySelector('#basket') as HTMLTemplateElement;
        const templateElement = template.content.firstElementChild.cloneNode(true) as HTMLTemplateElement;
        const storeItem = new StoreItemBasket(
            'card',
            templateElement,
            {
                onClick: () => events.emit('basket:delete', item)
            }
        );
        return storeItem.render({
            title: item.title,
            price: item.price,
            index: index + 1,
        });
    });
    // modal.render({
    //     content: basket.render({
    //         list: basketItems,
    //         price: appData.getTotalBasketPrice(),
    //     }),
    // });
    // modal.render()
    modal.content = basket.render(appData.basket)
    modal.render()

});