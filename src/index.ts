import './scss/styles.scss';

import { API_URL, CDN_URL, settings } from './utils/constants';
import { ensureElement } from './utils/utils';
import { LarekAPI } from './components/LarekAPI';
import { basket } from './components/screen/app';
import { page, events } from './components/screen/app';
import { Modal } from './components/common/modal';
import { Order } from './components/order';
import { Contacts } from './components/contacts';
import { Success } from './components/success';
import { StoreItemBasket } from './components/basket';
import { ApiListResponse } from './components/base/api';


import { IOrderForm, IProduct } from './types/index';
import { AppState, Product } from './components/appState';

const api = new LarekAPI(CDN_URL, API_URL);

const modal = new Modal(ensureElement<HTMLDivElement>('#modal-container'), events);
const appData = new AppState({}, events);
const order = new Order('order', document.querySelector('#order') as HTMLFormElement, events)
const contacts = new Contacts(ensureElement<HTMLFormElement>('#contacts'), events);

const success = new Success('order-success', ensureElement<HTMLElement>('#success') as HTMLTemplateElement, {
    onClick: () => {
        events.emit('modal:close')
        modal.close()
    }
})

api
    .getProducts()
    .then((Products) => {
        page.setProducts(Products, settings.cardTemplate, events, appData);
        
    })
    .catch((err: string) => console.log(`Error: `, err));


events.on('card:addBasket', (item: Product) => {
 

    item.selected = true;
    appData.addToBasket(item);
    page.counter = appData.getBasketAmount();
    modal.close();
})

events.on('basket:open', () => {
    page.locked = true
    const basketItems = appData.basket.map((item, index) => {
        const template = document.querySelector('#card-basket') as HTMLTemplateElement;
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
   
    modal.content = basket.render({
        list: basketItems,
        price: appData.getTotalBasketPrice(),
    })
    modal.render()

});

events.on('basket:delete', (item: Product) => {
    appData.deleteFromBasket(item.id);
    item.selected = false;
    basket.price = appData.getTotalBasketPrice();
    page.counter = appData.getBasketAmount();
    basket.refreshIndices();
    if (!appData.basket.length) {
        basket.disableButton();
    }
})

events.on('basket:order', () => {
  
    modal.content = order.render(
        {
            address: '',
            valid: false,
            errors: []
        }
    )
    modal.render()
});


// Изменилось состояние валидации заказа
events.on('orderFormErrors:change', (errors: Partial<IOrderForm>) => {
    const { payment, address } = errors;
    order.valid = !payment && !address;
    order.errors = Object.values({ payment, address }).filter(i => !!i).join('; ');
});

// Изменилось состояние валидации контактов
events.on('contactsFormErrors:change', (errors: Partial<IOrderForm>) => {
    const { email, phone } = errors;
    contacts.valid = !email && !phone;
    contacts.errors = Object.values({ phone, email }).filter(i => !!i).join('; ');
});

// Изменились введенные данные
events.on('orderInput:change', (data: { field: keyof IOrderForm, value: string }) => {
    appData.setOrderField(data.field, data.value);
});

events.on('order:submit', () => {
    appData.order.total = appData.getTotalBasketPrice()
    appData.setItems();
  
    
    modal.content = contacts.render(
        {
            valid: false,
            errors: []
        }
    )
    modal.render()
})
// Покупка товаров
events.on('contacts:submit', () => {
   
    
    api.post('/order', appData.order)
      .then((res) => {
        events.emit('order:success', res);
        appData.clearBasket();
        appData.refreshOrder();
        order.disableButtons();
        page.counter = 0;
        appData.resetSelected();
      })
      .catch((err) => {
        console.log(err)
      })
  })

// Окно успешной покупки
events.on('order:success', (res: ApiListResponse<string>) => {
    modal.content = success.render({
        description: res.total
    })
    modal.render()
    // modal.render({
    //     content: success.render({
    //         description: res.total
    //     })
    // })
})

// Закрытие модального окна
events.on('modal:close', () => {
    page.locked = false;
    appData.refreshOrder();
});