import { ViewElement } from './../components/base/view';

type CategoryType = string;

// TODO: возможно потребуется дописать тип
type Product = string[];

// TODO: дописать тип 
type FormErrors = any;
 
 
interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: CategoryType;
    price: number | null;
    selected: boolean;
}


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



interface IOrder {
    productsID: string[];
    payment: string;
    total: number;
    address: string;
    email: string;
    phone: string;
}



interface ICard {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number | null;
    selected: boolean;
}



interface IPage {
    counterProductInBasket: number;
    products: HTMLElement[];
}



interface IBasket {
    products: HTMLElement[];
    price: number;
}



interface IOrderModal {
    address: string;
    payment: string;
}



interface IContacts {
    phone: string;
    email: string;
}


interface IModal {
    header?: ViewElement;
    content: ViewElement;
    actions: ViewElement[];
}

