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
- src/styles/styles.scss — корневой файл стилей
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
-	Категории товара
```
type CategoryType = string
```
-	Тип, описывающий ошибки валидации форм
```
type FormErrors
```
- Интерфейс товара
```
interface IProduct {
id: string;
description: string;
image: string;
title: string;
category: CategoryType;
price: number | null;
 selected: boolean; // добавлен ли текущий товар уже в корзину
}
```

-	Интерфейс, описывающий внутреннее состояние приложения
    Используется для хранения карточек, корзины, заказа пользователя, ошибок в формах. Имеет следующие методы для работы с карточками и корзиной:
```
interface IAppState {
basket: Product[];
products: Product[];
order: IOrder;
formErrors: FormErrors;
addProductToBasket(product: Product): void;
deleteProductFromBasket(id: string): void;
clearBasket(): void;
getBasketCount(): number;
getTotalPrice(): number;
setOrderField(field: string, value: string): void;
validateContacts(): boolean;
validateOrder(): boolean;
clearBasket(): boolean;
setProduct(items: IProduct[]): void;
resetSelected(): void;
}
```
-	Интерфейс заказа товара
```
interface IOrder {
productsID: string[];
payment: string;  
total: number;
address: string;
email: string;
phone: string;
}
```
-	Интерфейс карточки товара
```
interface ICard {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  selected: boolean;
}
```
-	Интерфейс страницы
```
interface IPage {
 counterProductInBasket: number;
 products: HTMLElement[];
}
```
-	Интерфейс корзины товаров
```
interface IBasket {
products: HTMLElement[];
price: number;
}
```
-	Интерфейс модального окна заказа товара
```
interface IOrderModal {
 address: string;  
payment: string;
}
```
- Интерфейс модального окна контактов
```
interface IContacts {
 phone: string;
 email: string;
}
```
- Интерфейс работы модального окна
```
interface IModal {
	header?: ViewElement;
	content: ViewElement;
	actions: ViewElement[];
}
```
#### Базовый код
Класс EventEmitter 
Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков о наступлении события. 
Имеет методы on, off , emit  — для подписки на событие, отписки от события и уведомления подписчиков о наступлении события соответственно. 

#### Слой данных
##### Класс AppData
Класс AppData наследуется от Model, который принимает интерфейс IAppState и предоставляет функции для работы с данными.

#### Слой представления
Все классы представления отвечают за отображение внутри контейнера передаваемых в них данных. Главным родительским классом всех далее указанных классов является базовый компонент Component<T>, где <T> представляет используемый элементом интерфейс или тип. Все дочерние классы принимают в конструкторе container в качестве HTML-элемента и events для управления событиями.

##### Класс Modal
Класс на основе интерфейса IModal, который представляет собой универсальный инструмент реализации модального окна, в котором меняется основной контент через шаблоны (карточка, корзина, формы). Инициализирует элементы корзины, такие как кнопка закрытия и контент. Устанавливает обработчики событий для уже найденной кнопки закрытия, клика за пределами окна и предотвращение закрытия при клике внутри контента.

##### Класс Basket
-	Метод добавления товара в корзину.
-	Метод удаления товара из корзины.
-	Метод очистки корзины.
-	Геттер получения товаров.
-	Геттер получения общей суммы корзины. 

##### Класс Card
-	Сеттер изменения картинки
-	Сеттер изменения текстов – название, описание, цена

##### Класс Order 
Отвечает за работу с заказами и оплатой.

##### Класс Product
Отвечает за работу и отрисовку товара.

#####  Слой презентера
"Веб-ларек" - это небольшое приложение, и его пользовательский интерфейс будет фактически находиться в коде, который находится в файле src\index.ts в корне проекта. Здесь все компоненты и API соединяются через коллбэки или событийную систему. 
