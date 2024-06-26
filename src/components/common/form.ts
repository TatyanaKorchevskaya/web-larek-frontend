
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { HTMLCustomItem } from '../base/html';

interface IFormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> extends HTMLCustomItem<HTMLElement, 'click'>{
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container)
        this.container = container.content.firstElementChild.cloneNode(true) as HTMLFormElement;

        this._submit = ensureElement<HTMLButtonElement>(
            'button[type=submit]',
            this.container
        );
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.container.name}:submit`);
        });
    }

    protected onInputChange(field: keyof T, value: string) {
        console.log(this.container.name);
        
        this.events.emit(`${this.container.name}Input:change`, {
            field,
            value,
        })
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }
  
    set errors(value: string) {
        this.setText(value);
    
    }

    render(state: Partial<T> & IFormState): HTMLElement {
        super.render();
        const { valid, errors, ...inputs } = state;
        Object.assign(this, inputs);
        return this.container as HTMLElement;
    }
}


