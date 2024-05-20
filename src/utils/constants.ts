export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
    cardTemplate: 'card-catalog',
    modalTemplate: '',
    contentTemplate: 'card-preview',
};

export type CategoryMapping = {
    [Key in string]: string;
};

export const categoryMapping: CategoryMapping = {
    'другое': 'card__category_other',
    'софт-скил': 'card__category_soft',
    'дополнительное': 'card__category_additional',
    'кнопка': 'card__category_button',
    'хард-скил': 'card__category_hard',
};