import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Component } from "../base/Component";

interface ISuccess {
    totalPrice: number;
}
export class SuccessModal extends Component<ISuccess> {
    returnButton: HTMLButtonElement;
    orderTotal: HTMLElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.returnButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
        this.orderTotal = ensureElement<HTMLElement>('.order-success__description', this.container);

        this.returnButton.addEventListener('click', () => {
            this.events.emit('modal:close');
        })
    }

    set totalPrice(total: number) {
        this.orderTotal.textContent = `Списано ${total} синапсов`; 
    }
   
}