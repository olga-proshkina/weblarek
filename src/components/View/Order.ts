import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Component } from "../base/Component";

interface IForm {
    formErrors: string | null;
}

class Form<T> extends Component<T & IForm> {

    errors: HTMLElement;
    submitButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.errors = ensureElement<HTMLElement>('.form__errors', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
    }

    set formErrors(error: string[] | string) {
        if (Array.isArray(error)) {
            this.errors.innerHTML = error.join('<br>');
        } else {
            this.errors.innerHTML = error;
        }

       
    }
    deactivateButton() {
        this.submitButton.disabled = true;
    }
    activateButton() {
        this.submitButton.disabled = false;
    }
    
}

export class OrderForm extends Form<IForm> {
    paymentCardButton: HTMLButtonElement;
    paymentsCashButton: HTMLButtonElement;
    inputAddressField: HTMLInputElement;
    

    constructor(protected events: IEvents, container: HTMLElement) {
        super(events, container);
        this.paymentCardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
        this.paymentsCashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
        this.inputAddressField = ensureElement<HTMLInputElement>('input[name=address]', this.container);

        this.inputAddressField.addEventListener('input', () => {
            this.events.emit('address: changed', {address: this.inputAddressField.value});
        })
        this.paymentCardButton.addEventListener('click', () => {
            this.events.emit('payment:card');
        })
        this.paymentsCashButton.addEventListener('click', () => {
            this.events.emit('payment:cash');
        })
        this.submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.events.emit('order:submit');
        })
    }
}

export class ContactsForm extends Form<IForm> {
    inputEmailField: HTMLInputElement;
    inputPhoneField: HTMLInputElement;

    constructor (protected events: IEvents, container: HTMLElement) {
        super(events, container);
        this.inputEmailField = ensureElement<HTMLInputElement>('input[name=email]', this.container);
        this.inputPhoneField = ensureElement<HTMLInputElement>('input[name=phone]', this.container);

        this.inputEmailField.addEventListener('input', () => {
            this.events.emit('email: changed', {email: this.inputEmailField.value});
        })
         this.inputPhoneField.addEventListener('input', () => {
            this.events.emit('phone: changed', {phone: this.inputPhoneField.value});
        })
        this.submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.events.emit('contacts:submit');
        })
    }
}
