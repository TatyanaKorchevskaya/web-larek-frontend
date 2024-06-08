import { handlePrice } from '../utils/utils';

interface ISuccessActions {
  onClick: (event: MouseEvent) => void;
}

export interface ISuccess {
  description: number;
}

export class Success {
  protected _button: HTMLButtonElement;
  protected _description: HTMLElement;
    container: HTMLElement;

  constructor(
    protected blockName: string,
    container: HTMLTemplateElement,
    actions?: ISuccessActions
  ) {
    
    this.container = container.content.firstElementChild.cloneNode(true) as HTMLElement;


    this._button = this.container.querySelector(`.${blockName}__close`);
    this._description = this.container.querySelector(`.${blockName}__description`);

    if (actions?.onClick) {
      if (this._button) {
        this._button.addEventListener('click', actions.onClick)
      }
    }
  }

  set description(value: number) {
    this._description.textContent = 'Списано ' + handlePrice(value) + ' синапсов'
  }
  render(data?: Partial<ISuccess>): HTMLElement {
      
    Object.assign(this as object, data ?? {});
    return this.container;
  }
}