# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```



## Архитектура

#### Типы данных

Типы данных находятся в src/types/index.ts

#### Базовый код

Класс EventEmitter
Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события.
Имеет методы on, off , emit — для подписки на событие, отписки от события и уведомления подписчиков о наступлении события соответственно.

##### Класс View

Класс отвечает за взаимодействие со страницей и наследуется от класса HTMLCustomItem.
`constructor(root: NodeType, name?: string)`: root - элемент, name - имя элемента.
Имеет методы:

- render — отрисовка
- factory — создание нового экземпляра класса
- create — создание элемента 
- assign — заполнение данных
- element — поиск элемента с учетом БЭМ
- select — поиск элемента
- copy — копирование
- setVisibleContent — изменение видимости контента 
- bem — помогает учитывать БЭМ при поиске
- toggle — переключение
- on — включение 

##### Класс Api

Класс отвечает за обращение к базе данных.
`constructor(baseUrl: string, options: RequestInit = {})`- принимает базовый URL и глобальные опции для всех запросов(опционально).

##### Класс Page

Класс Page отвечает за управление страницей и наследуется от класса View.

Имеет методы: 
- init — инициализация класса
- counter — счетчик 
- selectProducts — выбор продуктов 
- lockScroll — блокировка скролла
- selectProduct — выбор продукта
- setProducts — отображение продуктов
- configure — создание карточек

#### Слой данных (Model)

##### Класс AppState

Класс AppState наследуется от Model, который принимает интерфейс IAppState и предоставляет функции для работы с данными.
Использует следующие методы:

- addProductToBasket(product: Product): void; — добавляет продукт в корзину
- deleteProductFromBasket(id: string): void; — удаляет продукт из корзины
- clearBasket(): void; — очищает корзину
- getBasketCount(): number; —считает количество товаров в корзине
- getTotalPrice(): number; —считает итоговую цену
- setOrderField(field: string, value: string): void; — получает поля корзины
- validateContacts(): boolean; — валидация контактов
- validateOrder(): boolean; — валидация заказа
- isClearBasket(): boolean; — проверка на пустоту корзины
- setProduct(items: IProduct[]): void; —изменение продуктов в корзине
- resetSelected(): void; — удаление избранности товара

Имеет свойства:

- basket: Product[]; - корзина
- products: Product[]; - все товары (список)
- order: IOrder; - заказ
- formErrors: FormErrors; - ошибки формы

##### Класс Basket

Класс Basket наследуется от класса View.
`constructor(
        protected blockName: string,
        container: HTMLTemplateElement,
        protected events?: IEvents
    )` : blockName - имя блока, container - корзина, events - ивенты.

Использует следующие методы:

- Метод добавления товара в корзину.
- Метод удаления товара из корзины.
- Метод очистки корзины.
- Геттер получения товаров.
- Геттер получения общей суммы корзины.

Имеет свойства:

- products: HTMLElement[]; — товары
- price: number; — цена

##### Класс StoreItemBasket

Класс StoreItemBasket отвечает за управление элментом корзины. 

`   constructor(
        protected blockName: string,
        container: HTMLElement,
        actions?: IStoreItemBasketActions
    )` : blockName - имя блока, container - корзина, actions - действия(ивенты).

Использует следующие методы:
- сеттеры для titile, index, price;
- render() - отображает элемент корзины. 

Имеет свойства:
- container: HTMLElement; — элемент товара в корзине, 
- index: HTMLElement; — индекс товара 
- title: HTMLElement; — название товара 
- price: HTMLElement; — цена товара
- button: HTMLButtonElement; — кнопка корзины

##### Класс Card

Класс Card наследуется от класса View и на основе интерфейса ICard. Использует следующие методы:

- Сеттер изменения картинки
- Сеттер изменения текстов – название, описание, цена

Имеет свойства:

- id: string; — уникальный id товара
- title: string; — заголовок товара
- category: string; — категория товара
- description: string; — описание товара
- image: string; — фото товара
- price: number | null; — цена товара
- selected: boolean; — является ли товар добавленным в корзину

##### Класс CardPreview

Класс CardPreview отвечает за отображение подробной информации о продукте. 
`constructor(template: HTMLTemplateElement, protected events: IEvents, card?: Card, name?: string)`: template — шаблон, events — ивенты, name — имя элемента.

Использует следующие методы:
- render() — отрисовывает карточку 

Имеет свойства:

- cardElement: HTMLElement; — элемент карточки
- cardElementButton: HTMLButtonElement; — кнопка
- product: ICard; — продукт(товар)
- card: Card; — карточка товара

##### Класс Order

Класс Order наследуется от класса View и на основе интерфейса IOrder.
Отвечает за работу с заказами и оплатой.
`constructor(
    protected blockName: string,
    container: HTMLFormElement,
    protected events: IEvents
  ) ` : blockName - имя блока, container - корзина, events - ивенты.

Имеет свойства:

- productsID: string[]; — список id товаров
- payment: string; — способ оплаты
- total: number; — цена заказа
- address: string; — адрес доставки
- email: string; — почта покупателя
- phone: string; —телефон покупателя

##### Класс Product

Класс Product наследуется от класса View и на основе интерфейса IProduct.
Отвечает за работу и отрисовку товара.
Имеет свойства:

- id: string; — уникальный id товара
- description: string; — описание товара
- image: string; — фото товара
- title: string; — заголовок товара
- category: CategoryType; — категория товара
- price: number | null; — цена товара
- selected: boolean; — добавлен ли текущий товар уже в корзину

#### Слой представления

Все классы представления отвечают за отображение внутри контейнера передаваемых в них данных. Главным родительским классом всех далее указанных классов является базовый компонент Component<T>, где <T> представляет используемый элементом интерфейс или тип. Все дочерние классы принимают в конструкторе container в качестве HTML-элемента и events для управления событиями.

##### Класс Modal

Класс на основе интерфейса IModal, который представляет собой универсальный инструмент реализации модального окна, в котором меняется основной контент через шаблоны (карточка, корзина, формы). Инициализирует элементы корзины, такие как кнопка закрытия и контент. Устанавливает обработчики событий для уже найденной кнопки закрытия, клика за пределами окна и предотвращение закрытия при клике внутри контента.
`constructor(modalContainer: HTMLElement, protected events: IEvents)`: modalContainer - элемент(модальное окно), events - ивенты.

##### Слой презентера

"Веб-ларек" - это небольшое приложение, и его пользовательский интерфейс будет фактически находиться в коде, который находится в файле src\index.ts в корне проекта. Здесь все компоненты и API соединяются через коллбэки или событийную систему.
