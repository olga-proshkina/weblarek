import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Component } from "../base/Component";

interface ICart {
    totalPrice: number;
    products: HTMLElement[] | HTMLElement | null;
}

export class CartView extends Component<ICart> {
   
    cartTotal: HTMLElement;
    productsCart: HTMLElement;
    cartOrderButton: HTMLButtonElement;

    constructor(protected events: IEvents, container: HTMLElement) {
        super(container);
        this.cartTotal = ensureElement<HTMLElement>('.basket__price', this.container);
        this.productsCart = ensureElement<HTMLElement>('.basket__list', this.container);
        this.cartOrderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

        this.cartOrderButton.addEventListener('click', () => {
            this.events.emit('cart: order');
        })
    }

    set totalPrice(total: number) {
        this.cartTotal.textContent = `${total} синапсов`; 
    }
    set products(products: HTMLElement[] | HTMLElement | null) {
        this.productsCart.replaceChildren();
        if (products instanceof HTMLElement) {
            this.productsCart.replaceChildren(products);
        } else if (Array.isArray(products)) {
            products.forEach(item => {
                this.productsCart.appendChild(item);
            })
        }
    }
}