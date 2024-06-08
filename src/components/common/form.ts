
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface IFormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
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
        this.events.emit('orderInput:change', {
            field,
            value,
        })
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }
    setText(element: HTMLElement, value: string): void {
        element.textContent = String(value);
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }

    // render(data?: Partial<T>): HTMLElement {
    //     console.log("render", data);

    //     Object.assign(this as object, data ?? {});
    //     return this.container;
    //   }

    render(state: Partial<T> & IFormState) {
        const { valid, errors, ...inputs } = state;
        // super.render({ valid, errors });
        Object.assign(this, inputs);
        return this.container;
    }
}