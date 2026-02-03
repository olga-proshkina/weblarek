import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Component } from "../base/Component";

interface IForm {
    formErrors: string | null;
}

class Form extends Component<IForm> {
    submitButton: HTMLButtonElement;
    errors: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.submitButton = ensureElement<HTMLButtonElement>('order__button', this.container);
        this.errors = ensureElement<HTMLElement>('form__errors', this.container);
        
        this.submitButton.addEventListener('click', () => {
            this.events.emit('form:submit');
        })
    }

    set formErrors(error: string) {
        this.errors.textContent = error;
    }
}

export class OrderForm extends Form {
    paymentCardButton: HTMLButtonElement;
    paymentsCashButton: HTMLButtonElement;

    constructor(events: IEvents, container: HTMLElement) {
        super(events, container);
        this.paymentCardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.paymentsCashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        
        this.paymentCardButton.addEventListener('click', () => {
            this.events.emit('payment:card');
        })
        this.paymentsCashButton.addEventListener('click', () => {
            this.events.emit('payment:cash');
        })
    }
}