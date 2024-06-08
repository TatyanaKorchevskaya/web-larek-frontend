import { ViewElement } from './../components/base/view';

type CategoryType = string;

// TODO: возможно потребуется дописать тип
export type Product = string[];

// TODO: дописать тип 
export type FormErrors = any;
 
 
export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: CategoryType;
    price: number | null | string;
    selected: boolean;
}


export interface IAppState {
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



export interface IOrder {
    items: string[];
    payment: string;
    total: number;
    address: string;
    email: string;
    phone: string;
  
}



export interface ICard {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number | null;
    selected: boolean;
}



export interface IPage {
    counterProductInBasket: number;
    products: HTMLElement[];
}



export interface IBasket {
    list: HTMLElement[];
    price: number;
}



export interface IOrderModal {
    address: string;
    payment: string;
}



export interface IContacts {
    phone: string;
    email: string;
}


export interface IModal {
    header?: ViewElement;
    content: ViewElement;
    actions: ViewElement[];
}

export interface ApiResponse {
    items: IProduct[];
  }


  export interface IOrderForm {
    payment: string;
    address: string;
    email: string;
    phone: string;
  }